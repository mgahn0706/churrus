"use client";

import InTextGame from "@/components/InTextGame";
import { createTextScenario } from "@/fixtures";
import { psychicClues, psychicKeywordIds } from "@/fixtures/psychic/clues";
import { psychicPrologue } from "@/fixtures/psychic/prologue";

const psychicScenario = createTextScenario("psychic", {
  clues: psychicClues,
  keywordIds: psychicKeywordIds,
  prologue: psychicPrologue,
});

export default function PsychicScenario() {
  return <InTextGame scenario={psychicScenario} />;
}
