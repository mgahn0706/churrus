import type { InterrogationPhase, InterrogationSource } from "@/types";

export type SharedSourceState = Pick<InterrogationSource, "x" | "y" | "title" | "description" | "evidence">;

export interface SharedSource {
  id: string;
  visiblePhaseIds: string[];
  changes: Record<string, SharedSourceState>;
  base: SharedSourceState;
  sourceIds: Record<string, string>;
  order: Record<string, number>;
}

const sourceState = (source: InterrogationSource): SharedSourceState => ({
  x: source.x ?? 50,
  y: source.y ?? 50,
  title: source.title,
  description: source.description,
  evidence: structuredClone(source.evidence),
});

export function sharedSourceAtPhase(source: SharedSource, phases: InterrogationPhase[], phaseId: string): SharedSourceState {
  let state = source.base;
  for (const phase of phases) {
    if (phase.id === phaseId) {
      return source.changes[phase.id] ?? state;
    }
    if (source.changes[phase.id]) state = source.changes[phase.id];
  }
  return state;
}

export function sharedSourceVersionPhase(source: SharedSource, phases: InterrogationPhase[], phaseId: string): string {
  let versionPhaseId = phaseId;
  let started = false;
  for (const phase of phases) {
    if (!source.visiblePhaseIds.includes(phase.id)) continue;
    if (!started || source.changes[phase.id]) versionPhaseId = phase.id;
    started = true;
    if (phase.id === phaseId) break;
  }
  return versionPhaseId;
}

export function deriveSharedSources(phases: InterrogationPhase[]): SharedSource[] {
  const shared: SharedSource[] = [];
  const byId = new Map<string, SharedSource>();
  for (const phase of phases) {
    phase.sources.forEach((source, index) => {
      const id = source.evidence.id;
      const state = sourceState(source);
      let item = byId.get(id);
      if (!item) {
        item = { id, base: state, visiblePhaseIds: [], changes: {}, sourceIds: {}, order: {} };
        shared.push(item);
        byId.set(id, item);
      } else if (JSON.stringify(sharedSourceAtPhase(item, phases, phase.id)) !== JSON.stringify(state)) {
        item.changes[phase.id] = state;
      }
      item.visiblePhaseIds.push(phase.id);
      item.sourceIds[phase.id] = source.id;
      item.order[phase.id] = index;
    });
  }
  return shared;
}

export function materializeSharedSources(phases: InterrogationPhase[], shared: SharedSource[]): InterrogationPhase[] {
  const expanded = phases.map((phase) => ({
    ...phase,
    sources: phase.finalInterrogation ? [] : shared
      .filter((source) => source.visiblePhaseIds.includes(phase.id))
      .map((source, index) => {
        const state = structuredClone(sharedSourceAtPhase(source, phases, phase.id));
        return {
          ...state,
          evidence: { ...state.evidence, id: source.id },
          id: source.sourceIds[phase.id] ?? `${phase.id}-source-${source.id}`,
          versionPhaseId: sharedSourceVersionPhase(source, phases, phase.id),
          order: source.order[phase.id] ?? 10000 + index,
        };
      })
      .sort((left, right) => left.order - right.order)
      .map(({ order: _order, ...source }) => source),
  }));
  const sourceVersions = new Map<string, string>();
  for (const phase of expanded) {
    for (const source of phase.sources) {
      sourceVersions.set(`${phase.id}::${source.evidence.id}`, `${source.versionPhaseId}::${source.evidence.id}`);
    }
  }
  const versionOf = (id: string) => sourceVersions.get(id) ?? id;
  return expanded.map((phase) => ({
    ...phase,
    combinations: phase.combinations.map((combination) => ({
      ...combination,
      evidenceIds: combination.evidenceIds.map(versionOf) as [string, string],
    })),
    interrogations: phase.interrogations.map((interrogation) => ({
      ...interrogation,
      questions: interrogation.questions.map((question) => ({
        ...question,
        evidenceId: question.evidenceId ? versionOf(question.evidenceId) : undefined,
        evidenceIds: question.evidenceIds?.map(versionOf),
      })),
    })),
  }));
}
