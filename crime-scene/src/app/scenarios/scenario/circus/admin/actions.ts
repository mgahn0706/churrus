"use server";

import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { circusClues } from "@/fixtures/circus/clues";
import {
  applyCircusClueEdits,
  serializeCircusClues,
  validateCircusClueEdits,
  type CircusClueEdit,
} from "@/fixtures/circus/clueEditor";

export async function saveCircusClues(edits: CircusClueEdit[]) {
  if (process.env.NODE_ENV !== "development") {
    return { ok: false, error: "파일 저장은 로컬 개발 환경에서만 가능합니다." };
  }

  const error = validateCircusClueEdits(circusClues, edits);
  if (error) return { ok: false, error };

  const file = join(process.cwd(), "src/fixtures/circus/clues.ts");
  await writeFile(file, serializeCircusClues(applyCircusClueEdits(circusClues, edits)));
  return { ok: true };
}
