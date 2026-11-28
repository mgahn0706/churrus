import type { ClueType } from "@/types";

export const circusPlaces = ["auditorium", "indoor", "outdoor"] as const;

export type CircusClueEdit = Pick<ClueType, "id" | "title" | "description" | "x" | "y" | "type" | "place" | "location">;

export function validateCircusClueEdits(clues: ClueType[], edits: CircusClueEdit[]): string | null {
  const knownIds = new Set(clues.map((clue) => clue.id));
  const edited = new Map(edits.map((edit) => [edit.id, edit]));
  if (edited.size !== knownIds.size || edits.length !== knownIds.size || [...edited.keys()].some((id) => !knownIds.has(id))) {
    return "단서 목록이 현재 파일과 일치하지 않습니다.";
  }

  for (const edit of edits) {
    if (typeof edit.title !== "string" || !edit.title.trim() || edit.title.length > 120) {
      return `${edit.id}번 단서의 이름이 올바르지 않습니다.`;
    }
    if (typeof edit.description !== "string" || !edit.description.trim() || edit.description.length > 20000) {
      return `${edit.id}번 단서의 설명이 올바르지 않습니다.`;
    }
    if (
      !Number.isFinite(edit.x) || !Number.isFinite(edit.y) ||
      edit.x < 0 || edit.x > 100 || edit.y < 0 || edit.y > 100 ||
      (edit.location !== undefined && (typeof edit.location !== "string" || edit.location.length > 200))
    ) return `${edit.id}번 단서의 위치 값이 올바르지 않습니다.`;

    if (edit.type === "basic") {
      if (typeof edit.place !== "string" || !circusPlaces.some((place) => place === edit.place)) {
        return `${edit.id}번 단서의 지도가 올바르지 않습니다.`;
      }
    } else if (edit.type === "additional") {
      if (typeof edit.place !== "number" || !knownIds.has(edit.place) || edit.place === edit.id) {
        return `${edit.id}번 단서의 상위 단서가 올바르지 않습니다.`;
      }
    } else {
      return `${edit.id}번 단서의 종류가 올바르지 않습니다.`;
    }
  }

  for (const edit of edits) {
    const visited = new Set<number>([edit.id]);
    let parent = edit.type === "additional" ? edit.place as number : null;
    while (parent !== null) {
      if (visited.has(parent)) return `${edit.id}번 단서의 상위 단서가 순환합니다.`;
      visited.add(parent);
      const parentEdit = edited.get(parent);
      parent = parentEdit?.type === "additional" ? parentEdit.place as number : null;
    }
  }
  return null;
}

export function applyCircusClueEdits(clues: ClueType[], edits: CircusClueEdit[]): ClueType[] {
  const edited = new Map(edits.map((edit) => [edit.id, edit]));
  return clues.map((clue) => ({ ...clue, ...edited.get(clue.id) }));
}

export function serializeCircusClues(clues: ClueType[]): string {
  return [
    'import type { ClueType } from "@/types";',
    'import { createAdditionalQuestions } from "../utils";',
    "",
    "export const circusAdditionalQuestions = createAdditionalQuestions([]);",
    "",
    "export const circusClues: ClueType[] = [",
    ...clues.map((clue) => [
      "  {",
      ...Object.entries(clue)
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => `    ${key}: ${JSON.stringify(value)},`),
      "  },",
    ].join("\n")),
    "];",
    "",
  ].join("\n");
}
