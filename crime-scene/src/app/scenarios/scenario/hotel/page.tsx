'use client';

import InTextGame from "@/components/InTextGame";
import { createTextScenario } from "@/fixtures";
import { hotelClues, hotelKeywordIds } from "@/fixtures/hotel/clues";
import { hotelPrologue } from "@/fixtures/hotel/prologue";

const hotelScenario = createTextScenario("hotel", {
  clues: hotelClues,
  keywordIds: hotelKeywordIds,
  prologue: hotelPrologue,
});

export default function Hotel() {
  return <InTextGame scenario={hotelScenario} />;
}
