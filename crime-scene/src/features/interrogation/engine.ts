import type { InterrogationEvidence, InterrogationPhase } from "@/types";

export interface InterrogationProgress {
  started: boolean;
  storyIndex: number;
  seenPhaseIds: string[];
  collectedEvidenceIds: string[];
  solvedCombinationIds: string[];
  askedQuestionIds: string[];
  resolvedQuestionIds: string[];
  completedPhaseIds: string[];
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
};

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
      resolvedQuestionIds: ids("resolvedQuestionIds"),
      completedPhaseIds: ids("completedPhaseIds"),
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
): InterrogationEvidence[] {
  const collected = new Set(collectedEvidenceIds);
  const evidence: InterrogationEvidence[] = [];

  for (const phase of phases) {
    for (const source of phase.sources) evidence.push(source.evidence);
    for (const combination of phase.combinations)
      evidence.push(combination.result);
    for (const interrogation of phase.interrogations) {
      for (const question of interrogation.questions) {
        if (question.challenge?.revealedEvidence) {
          evidence.push(question.challenge.revealedEvidence);
        }
      }
    }
  }

  return evidence.filter((item) => collected.has(item.id));
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

    for (const source of phase.sources) {
      addUnique(sourceIds, source.id, "source");
      if (!locationIds.has(source.locationId)) {
        throw new Error(
          `Unknown source location in ${scenarioId}: ${source.locationId}`,
        );
      }
      addUnique(evidenceIds, source.evidence.id, "evidence");
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
      addUnique(evidenceIds, combination.result.id, "evidence");
    }

    const phaseEvidenceIds = new Set(evidenceIds);
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
      for (const question of interrogation.questions) {
        addUnique(questionIds, question.id, "question");
        phaseQuestionIds.add(question.id);
        if (question.challenge?.revealedEvidence) {
          addUnique(
            evidenceIds,
            question.challenge.revealedEvidence.id,
            "evidence",
          );
          phaseEvidenceIds.add(question.challenge.revealedEvidence.id);
        }
      }
    }

    for (const interrogation of phase.interrogations) {
      for (const question of interrogation.questions) {
        if (
          question.challenge &&
          !phaseEvidenceIds.has(question.challenge.evidenceId)
        ) {
          throw new Error(
            `Unknown challenge evidence in ${scenarioId}: ${question.challenge.evidenceId}`,
          );
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
