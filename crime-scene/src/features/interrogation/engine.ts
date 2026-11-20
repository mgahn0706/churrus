import type { InterrogationEvidence, InterrogationPhase, InterrogationQuestion, InterrogationScript } from "@/types";

export interface InterrogationProgress {
  started: boolean;
  storyIndex: number;
  seenPhaseIds: string[];
  collectedEvidenceIds: string[];
  solvedCombinationIds: string[];
  askedQuestionIds: string[];
  resolvedQuestionIds: string[];
  completedPhaseIds: string[];
  energySpentByPhase: Record<string, number>;
}

export const initialInterrogationProgress: InterrogationProgress = {
  started: false,
  storyIndex: 0,
  seenPhaseIds: [],
  collectedEvidenceIds: [],
  solvedCombinationIds: [],
  askedQuestionIds: [],
  resolvedQuestionIds: [],
  completedPhaseIds: [],
  energySpentByPhase: {},
};

export const evidenceInstanceId = (phaseId: string, evidenceId: string) =>
  `${phaseId}::${evidenceId}`;

export const evidenceLogicalId = (id: string) =>
  id.includes("::") ? id.slice(id.indexOf("::") + 2) : id;

export const sourceEvidenceInstanceId = (phaseId: string, source: { versionPhaseId?: string; evidence: { id: string } }) =>
  evidenceInstanceId(source.versionPhaseId ?? phaseId, source.evidence.id);

export const interrogationStorageKey = (scenarioId: string) =>
  `interrogation-${scenarioId}-v3`;

export function readInterrogationProgress(
  raw: string | null,
): InterrogationProgress {
  if (!raw) return initialInterrogationProgress;

  try {
    const saved: unknown = JSON.parse(raw);
    if (!saved || typeof saved !== "object")
      return initialInterrogationProgress;
    const value = saved as Record<string, unknown>;
    const ids = (key: string) =>
      Array.isArray(value[key])
        ? value[key].filter((id): id is string => typeof id === "string")
        : [];

    return {
      started: value.started === true,
      storyIndex:
        typeof value.storyIndex === "number" &&
        Number.isInteger(value.storyIndex) &&
        value.storyIndex >= 0
          ? value.storyIndex
          : 0,
      seenPhaseIds: ids("seenPhaseIds"),
      collectedEvidenceIds: ids("collectedEvidenceIds"),
      solvedCombinationIds: ids("solvedCombinationIds"),
      askedQuestionIds: ids("askedQuestionIds"),
      resolvedQuestionIds: [...new Set([...ids("resolvedQuestionIds"), ...ids("askedQuestionIds")])],
      completedPhaseIds: ids("completedPhaseIds"),
      energySpentByPhase:
        value.energySpentByPhase && typeof value.energySpentByPhase === "object"
          ? Object.fromEntries(
              Object.entries(value.energySpentByPhase).filter(
                ([, spent]) =>
                  typeof spent === "number" &&
                  Number.isInteger(spent) &&
                  spent >= 0,
              ),
            )
          : {},
    };
  } catch {
    return initialInterrogationProgress;
  }
}

export function findCombination(
  phase: InterrogationPhase,
  firstEvidenceId: string,
  secondEvidenceId: string,
) {
  if (firstEvidenceId === secondEvidenceId) return undefined;

  return phase.combinations.find(
    ({ evidenceIds: [first, second] }) =>
      (first === firstEvidenceId && second === secondEvidenceId) ||
      (first === secondEvidenceId && second === firstEvidenceId),
  );
}

const questionEvidenceIds = (question: InterrogationQuestion) =>
  question.evidenceIds ?? (question.evidenceId ? [question.evidenceId] : []);
export const MAX_INTERROGATION_CLUES = 3;

export function interrogationFallbackAnswers(
  phase: InterrogationPhase,
  suspectName: string,
  scenarioAnswers: InterrogationScript[] = [],
): InterrogationScript[] {
  const personal = phase.interrogations.find((item) => item.suspectName === suspectName)?.fallbackAnswers;
  return personal?.length ? personal : phase.fallbackAnswers?.length ? phase.fallbackAnswers : scenarioAnswers;
}

export function findInterrogationQuestion(
  interrogation: InterrogationPhase["interrogations"][number],
  selectedEvidenceIds: string[],
  allowEarlierVersions = false,
) {
  if (
    selectedEvidenceIds.length === 0 ||
    selectedEvidenceIds.length > MAX_INTERROGATION_CLUES ||
    new Set(selectedEvidenceIds.map(evidenceLogicalId)).size !== selectedEvidenceIds.length
  ) return undefined;
  const selectedKey = [...selectedEvidenceIds].sort().join("\u0000");
  const exact = interrogation.questions.find((question) => {
    const required = questionEvidenceIds(question);
    return required.length === selectedEvidenceIds.length &&
      [...required].sort().join("\u0000") === selectedKey;
  });
  if (exact || !allowEarlierVersions) return exact;
  const logicalIds = selectedEvidenceIds.map(evidenceLogicalId);
  const logicalKey = [...logicalIds].sort().join("\u0000");
  return interrogation.questions.find((question) => {
    const required = questionEvidenceIds(question);
    return required.length === selectedEvidenceIds.length &&
      required.map(evidenceLogicalId).sort().join("\u0000") === logicalKey;
  });
}

export function isPhaseReady(
  phase: InterrogationPhase,
  progress: InterrogationProgress,
) {
  if (
    phase.requiredCombinationIds.length === 0 &&
    phase.requiredQuestionIds.length === 0
  ) {
    return false;
  }

  return (
    phase.requiredCombinationIds.every((id) =>
      progress.solvedCombinationIds.includes(id),
    ) &&
    phase.requiredQuestionIds.every((id) =>
      progress.resolvedQuestionIds.includes(id),
    )
  );
}

export function getCollectedEvidence(
  phases: InterrogationPhase[],
  collectedEvidenceIds: string[],
): (InterrogationEvidence & { instanceId: string })[] {
  const collected = new Set(collectedEvidenceIds);
  const evidence: (InterrogationEvidence & { instanceId: string })[] = [];
  const seen = new Set<string>();

  for (const phase of phases) {
    for (const source of phase.sources) {
      const instanceId = sourceEvidenceInstanceId(phase.id, source);
      if (!seen.has(instanceId)) evidence.push({ ...source.evidence, instanceId });
      seen.add(instanceId);
    }
    for (const combination of phase.combinations)
      evidence.push({ ...combination.result, instanceId: evidenceInstanceId(phase.id, combination.result.id) });
    for (const interrogation of phase.interrogations) {
      for (const question of interrogation.questions) {
        if (question.revealedEvidence) {
          evidence.push({ ...question.revealedEvidence, instanceId: evidenceInstanceId(phase.id, question.revealedEvidence.id) });
        }
      }
    }
  }

  return evidence.filter((item) => collected.has(item.instanceId));
}

export function validateInterrogationPhases(
  scenarioId: string,
  phases: InterrogationPhase[],
  suspectNames: string[],
) {
  const phaseIds = new Set<string>();
  const sourceIds = new Set<string>();
  const evidenceIds = new Set<string>();
  const combinationIds = new Set<string>();
  const questionIds = new Set<string>();

  const addUnique = (ids: Set<string>, id: string, kind: string) => {
    if (!id || ids.has(id)) {
      throw new Error(
        `Invalid or duplicate ${kind} ID in ${scenarioId}: ${id}`,
      );
    }
    ids.add(id);
  };

  for (const phase of phases) {
    addUnique(phaseIds, phase.id, "phase");
    const locationIds = new Set<string>();
    for (const location of phase.locations) {
      addUnique(locationIds, location.id, "location");
      if (
        !Number.isFinite(location.x) ||
        !Number.isFinite(location.y) ||
        location.x < 0 ||
        location.x > 100 ||
        location.y < 0 ||
        location.y > 100
      ) {
        throw new Error(
          `Invalid map position in ${scenarioId}: ${location.id}`,
        );
      }
    }
    const phaseCombinationIds = new Set<string>();
    const combinationPairs = new Set<string>();
    const phaseQuestionIds = new Set<string>();
    const phaseSuspectNames = new Set<string>();
    const phaseEvidenceIds = new Set<string>();

    if (phase.people) {
      const visibleNames = new Set<string>();
      for (const person of phase.people) {
        if (!person.name || !suspectNames.includes(person.name) || visibleNames.has(person.name)) {
          throw new Error(`Invalid phase person in ${scenarioId}: ${person.name}`);
        }
        if (!Number.isFinite(person.x) || !Number.isFinite(person.y) || person.x < 0 || person.x > 100 || person.y < 0 || person.y > 100) {
          throw new Error(`Invalid person position in ${scenarioId}: ${person.name}`);
        }
        visibleNames.add(person.name);
        if (!phase.interrogations.some((item) => item.suspectName === person.name)) {
          throw new Error(`Missing person dialogue in ${scenarioId}: ${person.name}`);
        }
      }
    }

    if (phase.energyLimit !== undefined && (!Number.isInteger(phase.energyLimit) || phase.energyLimit < 1)) {
      throw new Error(`Invalid energy limit in ${scenarioId}: ${phase.id}`);
    }
    if (phase.finalInterrogation && phase.sources.length) {
      throw new Error(`Final interrogation cannot have sources in ${scenarioId}: ${phase.id}`);
    }

    for (const source of phase.sources) {
      addUnique(sourceIds, source.id, "source");
      if (source.password !== undefined && !source.password.trim()) {
        throw new Error(`Empty source password in ${scenarioId}: ${source.id}`);
      }
      if ((source.x === undefined || source.y === undefined) && !locationIds.has(source.locationId ?? "")) {
        throw new Error(
          `Source needs a map position or valid location in ${scenarioId}: ${source.id}`,
        );
      }
      if (
        (source.x !== undefined && (!Number.isFinite(source.x) || source.x < 0 || source.x > 100)) ||
        (source.y !== undefined && (!Number.isFinite(source.y) || source.y < 0 || source.y > 100))
      ) {
        throw new Error(`Invalid source position in ${scenarioId}: ${source.id}`);
      }
      addUnique(phaseEvidenceIds, source.evidence.id, "evidence");
      evidenceIds.add(sourceEvidenceInstanceId(phase.id, source));
    }

    for (const combination of phase.combinations) {
      addUnique(combinationIds, combination.id, "combination");
      phaseCombinationIds.add(combination.id);
      for (const inputId of combination.evidenceIds) {
        if (!evidenceIds.has(inputId)) {
          throw new Error(
            `Unknown combination input in ${scenarioId}: ${inputId}`,
          );
        }
      }
      if (combination.evidenceIds[0] === combination.evidenceIds[1]) {
        throw new Error(
          `Combination needs two clues in ${scenarioId}: ${combination.id}`,
        );
      }
      const pair = [...combination.evidenceIds].sort().join("::");
      if (combinationPairs.has(pair)) {
        throw new Error(`Duplicate combination pair in ${scenarioId}: ${pair}`);
      }
      combinationPairs.add(pair);
      addUnique(phaseEvidenceIds, combination.result.id, "evidence");
      evidenceIds.add(evidenceInstanceId(phase.id, combination.result.id));
    }

    for (const interrogation of phase.interrogations) {
      if (!suspectNames.includes(interrogation.suspectName)) {
        throw new Error(
          `Unknown interrogation suspect in ${scenarioId}: ${interrogation.suspectName}`,
        );
      }
      if (phaseSuspectNames.has(interrogation.suspectName)) {
        throw new Error(
          `Duplicate interrogation suspect in ${scenarioId}: ${interrogation.suspectName}`,
        );
      }
      phaseSuspectNames.add(interrogation.suspectName);
      if (phase.people && !phase.people.some((person) => person.name === interrogation.suspectName)) continue;
      const questionPairs = new Set<string>();
      for (const question of interrogation.questions) {
        addUnique(questionIds, question.id, "question");
        phaseQuestionIds.add(question.id);
        if (question.evidenceId && question.evidenceIds) {
          throw new Error(`Ambiguous question evidence in ${scenarioId}: ${question.id}`);
        }
        const inputs = questionEvidenceIds(question);
        if (inputs.length > MAX_INTERROGATION_CLUES) {
          throw new Error(`Too many question clues in ${scenarioId}: ${question.id}`);
        }
        if (question.evidenceIds && inputs.length === 0) {
          throw new Error(`Question needs evidence in ${scenarioId}: ${question.id}`);
        }
        if (new Set(inputs).size !== inputs.length) {
          throw new Error(`Duplicate question evidence in ${scenarioId}: ${question.id}`);
        }
        for (const inputId of inputs) {
          if (!evidenceIds.has(inputId)) {
            throw new Error(`Unknown question evidence in ${scenarioId}: ${inputId}`);
          }
        }
        if (inputs.length) {
          const key = [...inputs].sort().join("\u0000");
          if (questionPairs.has(key)) {
            throw new Error(`Duplicate interrogation combination in ${scenarioId}: ${question.id}`);
          }
          questionPairs.add(key);
        }
        if (question.revealedEvidence) {
          addUnique(phaseEvidenceIds, question.revealedEvidence.id, "evidence");
          evidenceIds.add(evidenceInstanceId(phase.id, question.revealedEvidence.id));
        }
      }
    }

    for (const id of phase.requiredCombinationIds) {
      if (!phaseCombinationIds.has(id)) {
        throw new Error(`Unknown required combination in ${scenarioId}: ${id}`);
      }
    }
    for (const id of phase.requiredQuestionIds) {
      if (!phaseQuestionIds.has(id)) {
        throw new Error(`Unknown required question in ${scenarioId}: ${id}`);
      }
    }
  }
}
