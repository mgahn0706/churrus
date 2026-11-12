"use client";

import InTextGame from "@/components/InTextGame";
import { createTextScenario } from "@/fixtures";
import { psychicClues, psychicKeywordIds } from "@/fixtures/jjajang/clues";
import { psychicPrologue } from "@/fixtures/jjajang/prologue";

const psychicScenario = createTextScenario("jjajang", {
  clues: psychicClues,
  keywordIds: psychicKeywordIds,
  prologue: psychicPrologue,
});

export default function PsychicScenario() {
  return <InTextGame scenario={psychicScenario} />;
}
