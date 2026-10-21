'use client';

import InTextGame from "@/components/InTextGame";
import { createTextScenario } from "@/fixtures";
import { schoolClues, schoolKeywordIds } from "@/fixtures/school/clues";
import { schoolPrologue } from "@/fixtures/school/prologue";

const schoolScenario = createTextScenario("school", {
  clues: schoolClues,
  keywordIds: schoolKeywordIds,
  prologue: schoolPrologue,
});

export default function School() {
  return <InTextGame scenario={schoolScenario} />;
}
