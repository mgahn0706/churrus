"use client";

import InTextGame from "@/components/InTextGame";
import { createTextScenario } from "@/fixtures";
import { jjajangClues, jjajangKeywordIds } from "@/fixtures/jjajang/clues";
import { jjajangPrologue } from "@/fixtures/jjajang/prologue";

const jjajangScenario = createTextScenario("jjajang", {
  clues: jjajangClues,
  keywordIds: jjajangKeywordIds,
  prologue: jjajangPrologue,
});

export default function Jjajang() {
  return <InTextGame scenario={jjajangScenario} />;
}
