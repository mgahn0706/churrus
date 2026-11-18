import type { InterrogationMapPerson, InterrogationPhase } from "@/types";

const defaultPositions: Record<string, { x: number; y: number }> = {
  "실험체 A": { x: 9, y: 77 },
  "실험체 B": { x: 23, y: 77 },
  "실험체 C": { x: 37, y: 77 },
  "김짜장": { x: 63, y: 29 },
};

export function defaultPersonPosition(name: string, index: number): { x: number; y: number } {
  return defaultPositions[name] ?? [
    { x: 34, y: 36 },
    { x: 52, y: 62 },
    { x: 68, y: 36 },
    { x: 43, y: 22 },
  ][index % 4];
}

export function phasePeople(phase: InterrogationPhase): InterrogationMapPerson[] {
  return phase.people ?? phase.interrogations.map((person, index) => ({
    name: person.suspectName,
    ...defaultPersonPosition(person.suspectName, index),
  }));
}
