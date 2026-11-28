"use server";

import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { circusClues } from "@/fixtures/circus/clues";

export type CluePosition = { id: number; x: number; y: number };

export async function saveCircusCluePositions(positions: CluePosition[]) {
  if (process.env.NODE_ENV !== "development") {
    return { ok: false, error: "위치 저장은 로컬 개발 환경에서만 가능합니다." };
  }

  const basicIds = new Set(circusClues.filter((clue) => clue.type === "basic").map((clue) => clue.id));
  if (
    positions.length !== basicIds.size ||
    new Set(positions.map((position) => position.id)).size !== basicIds.size ||
    positions.some(({ id, x, y }) =>
      !basicIds.has(id) || !Number.isFinite(x) || !Number.isFinite(y) ||
      x < 0 || x > 100 || y < 0 || y > 100)
  ) {
    return { ok: false, error: "단서 위치 데이터가 올바르지 않습니다." };
  }

  const file = join(process.cwd(), "src/fixtures/circus/clues.ts");
  const source = await readFile(file, "utf8");
  const updates = new Map(positions.map(({ id, x, y }) => [id, { x, y }]));
  const saved = new Set<number>();
  const next = source.replace(/^  \{\n(?:    .*\n)*?  \},/gm, (entry) => {
    const idMatch = entry.match(/^    id: (\d+),$/m);
    const id = idMatch ? Number(idMatch[1]) : NaN;
    const position = updates.get(id);
    if (!position) return entry;
    if (saved.has(id) || !/^    x: -?\d+(?:\.\d+)?,?$/m.test(entry) || !/^    y: -?\d+(?:\.\d+)?,?$/m.test(entry)) {
      throw new Error(`Cannot update clue ${id}`);
    }
    saved.add(id);
    return entry
      .replace(/^    x: -?\d+(?:\.\d+)?,?$/m, `    x: ${Number(position.x.toFixed(3))},`)
      .replace(/^    y: -?\d+(?:\.\d+)?,?$/m, `    y: ${Number(position.y.toFixed(3))},`);
  });

  if (saved.size !== basicIds.size) {
    return { ok: false, error: "현재 단서 파일 형식에서 모든 위치를 찾지 못했습니다." };
  }

  await writeFile(file, next);
  return { ok: true };
}
