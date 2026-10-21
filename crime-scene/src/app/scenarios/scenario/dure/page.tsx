'use client';

import InTextGame from "@/components/InTextGame";
import { createTextScenario } from "@/fixtures";
import { dureClues, dureKeywordIds } from "@/fixtures/dure/clues";
import { durePrologue } from "@/fixtures/dure/prologue";

const dureScenario = createTextScenario("dure", {
  clues: dureClues,
  keywordIds: dureKeywordIds,
  prologue: durePrologue,
});

export default function Dure() {
  return <InTextGame scenario={dureScenario} />;
}
