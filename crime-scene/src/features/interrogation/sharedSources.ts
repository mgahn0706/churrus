import type { InterrogationPhase, InterrogationSource } from "@/types";

export type SharedSourceState = Pick<InterrogationSource, "x" | "y" | "title" | "description" | "password" | "evidence">;

export interface SharedSource {
  id: string;
  number?: number;
  visiblePhaseIds: string[];
  changes: Record<string, SharedSourceState>;
  base: SharedSourceState;
  sourceIds: Record<string, string>;
  order: Record<string, number>;
}

export function ensureSharedSourceNumbers(shared: SharedSource[]): SharedSource[] {
  const used = new Set<number>();
  const numbered = shared.map((source) => {
    if (Number.isInteger(source.number) && source.number! > 0 && !used.has(source.number!)) {
      used.add(source.number!);
      return source;
    }
    return { ...source, number: undefined };
  });
  let next = 1;
  return numbered.map((source) => {
    if (source.number !== undefined) return source;
    while (used.has(next)) next += 1;
    used.add(next);
    return { ...source, number: next++ };
  });
}

const clampPosition = (value: number, minimum: number, maximum: number) => Math.max(minimum, Math.min(maximum, value));
const positionsOverlap = (left: { x: number; y: number }, right: { x: number; y: number }) =>
  Math.abs(left.x - right.x) < 14 && Math.abs(left.y - right.y) < 10;
const visibleTogether = (left: string[], right: string[]) => left.some((id) => right.includes(id));

export function spreadSharedSourcePositions(shared: SharedSource[], preferredId?: string): SharedSource[] {
  const placed: { x: number; y: number; visiblePhaseIds: string[] }[] = [];
  const positions = new Map<string, { x: number; y: number }>();
  const ordered = [...shared].sort((left, right) =>
    left.id === preferredId ? -1 : right.id === preferredId ? 1 : (left.number ?? 0) - (right.number ?? 0));
  for (const source of ordered) {
    const target = { x: clampPosition(source.base.x ?? 50, 12, 88), y: clampPosition(source.base.y ?? 50, 10, 90) };
    const conflicts = (position: { x: number; y: number }) => placed.some((item) =>
      visibleTogether(source.visiblePhaseIds, item.visiblePhaseIds) && positionsOverlap(item, position));
    let position = target;
    if (conflicts(target)) {
      const candidates = [target];
      for (let y = 10; y <= 90; y += 2.5) {
        for (let x = 12; x <= 88; x += 2.5) candidates.push({ x, y });
      }
      candidates.sort((left, right) =>
        ((left.x - target.x) * 1.78) ** 2 + (left.y - target.y) ** 2 -
        (((right.x - target.x) * 1.78) ** 2 + (right.y - target.y) ** 2));
      position = candidates.find((candidate) => !conflicts(candidate)) ?? target;
    }
    placed.push({ ...position, visiblePhaseIds: source.visiblePhaseIds });
    positions.set(source.id, position);
  }
  return shared.map((source) => ({ ...source, base: { ...source.base, ...positions.get(source.id) } }));
}

const sourceState = (source: InterrogationSource): SharedSourceState => ({
  x: source.x ?? 50,
  y: source.y ?? 50,
  title: source.title,
  description: source.description,
  password: source.password,
  evidence: structuredClone(source.evidence),
});
const sourceContent = ({ x: _x, y: _y, ...content }: SharedSourceState) => content;

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
      } else if (JSON.stringify(sourceContent(sharedSourceAtPhase(item, phases, phase.id))) !== JSON.stringify(sourceContent(state))) {
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
          x: source.base.x,
          y: source.base.y,
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
