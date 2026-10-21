'use client';

import InTextGame from "@/components/InTextGame";
import { createTextScenario } from "@/fixtures";
import { bluemoonClues, bluemoonKeywordIds } from "@/fixtures/bluemoon/clues";
import { bluemoonPrologue } from "@/fixtures/bluemoon/prologue";

const bluemoonScenario = createTextScenario("bluemoon", {
  clues: bluemoonClues,
  keywordIds: bluemoonKeywordIds,
  prologue: bluemoonPrologue,
});

export default function Bluemoon() {
  return <InTextGame scenario={bluemoonScenario} />;
}
