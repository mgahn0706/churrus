import type { InterrogationPhase, InterrogationQuestion } from "@/types";

export type SharedQuestionState = Pick<InterrogationQuestion, "prompt" | "answer" | "revealedEvidence">;

export interface SharedQuestion {
  id: string;
  suspectName: string;
  clueIds: string[];
  visiblePhaseIds: string[];
  base: SharedQuestionState;
  changes: Record<string, SharedQuestionState>;
  questionIds: Record<string, string>;
  evidenceRefs: Record<string, string[]>;
  order: Record<string, number>;
}

const logicalClueId = (id: string) => id.includes("::") ? id.slice(id.indexOf("::") + 2) : id;
const questionRefs = (question: InterrogationQuestion) => question.evidenceIds ?? (question.evidenceId ? [question.evidenceId] : []);
const questionState = (question: InterrogationQuestion): SharedQuestionState => ({
  prompt: question.prompt,
  answer: structuredClone(question.answer),
  revealedEvidence: question.revealedEvidence ? structuredClone(question.revealedEvidence) : undefined,
});

export function sharedQuestionAtPhase(question: SharedQuestion, phases: InterrogationPhase[], phaseId: string): SharedQuestionState {
  let state = question.base;
  for (const phase of phases) {
    if (phase.id === phaseId) return question.changes[phase.id] ?? state;
    if (question.changes[phase.id]) state = question.changes[phase.id];
  }
  return state;
}

export function deriveSharedQuestions(phases: InterrogationPhase[]): SharedQuestion[] {
  const shared: SharedQuestion[] = [];
  const byKey = new Map<string, SharedQuestion>();
  for (const phase of phases) {
    for (const interrogation of phase.interrogations) {
      interrogation.questions.forEach((question, index) => {
        const refs = questionRefs(question);
        const clueIds = refs.map(logicalClueId);
        const key = `${interrogation.suspectName}\u0000${clueIds.length ? [...clueIds].sort().join("\u0000") : question.id}`;
        const state = questionState(question);
        let item = byKey.get(key);
        if (!item) {
          item = { id: question.id, suspectName: interrogation.suspectName, clueIds, visiblePhaseIds: [], base: state, changes: {}, questionIds: {}, evidenceRefs: {}, order: {} };
          byKey.set(key, item);
          shared.push(item);
        } else if (JSON.stringify(sharedQuestionAtPhase(item, phases, phase.id)) !== JSON.stringify(state)) {
          item.changes[phase.id] = state;
        }
        item.visiblePhaseIds.push(phase.id);
        item.questionIds[phase.id] = question.id;
        item.evidenceRefs[phase.id] = item.clueIds.map((clueId) => refs.find((ref) => logicalClueId(ref) === clueId) ?? "");
        item.order[phase.id] = index;
      });
    }
  }
  return shared;
}

export function materializeSharedQuestions(phases: InterrogationPhase[], shared: SharedQuestion[]): InterrogationPhase[] {
  const knownEvidence = new Map<string, string>();
  return phases.map((phase) => {
    for (const source of phase.sources) knownEvidence.set(source.evidence.id, `${source.versionPhaseId ?? phase.id}::${source.evidence.id}`);
    for (const combination of phase.combinations) knownEvidence.set(combination.result.id, `${phase.id}::${combination.result.id}`);
    const existingRefs = new Set<string>(knownEvidence.values());
    for (const interrogation of phase.interrogations) {
      for (const question of interrogation.questions) {
        if (question.revealedEvidence) existingRefs.add(`${phase.id}::${question.revealedEvidence.id}`);
      }
    }
    const interrogations = phase.interrogations.map((interrogation) => ({
      ...interrogation,
      questions: shared
        .filter((question) => question.suspectName === interrogation.suspectName && question.visiblePhaseIds.includes(phase.id))
        .map((question, index) => {
          const state = structuredClone(sharedQuestionAtPhase(question, phases, phase.id));
          const refs = question.clueIds.map((clueId, clueIndex) => {
            const original = question.evidenceRefs[phase.id]?.[clueIndex];
            return original && existingRefs.has(original)
              ? original
              : knownEvidence.get(clueId) ?? original ?? `${phase.id}::${clueId}`;
          });
          return {
            id: question.questionIds[phase.id] ?? `${phase.id}-question-${question.id}`,
            evidenceIds: refs,
            ...state,
            revealedEvidence: phase.finalInterrogation ? undefined : state.revealedEvidence,
            order: question.order[phase.id] ?? 10000 + index,
          };
        })
        .sort((left, right) => left.order - right.order)
        .map(({ order: _order, ...question }) => question),
    }));
    for (const interrogation of interrogations) {
      for (const question of interrogation.questions) {
        if (question.revealedEvidence) knownEvidence.set(question.revealedEvidence.id, `${phase.id}::${question.revealedEvidence.id}`);
      }
    }
    return { ...phase, interrogations };
  });
}
