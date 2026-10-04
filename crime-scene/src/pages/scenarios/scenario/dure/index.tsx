import InTextGame from "@/components/InTextGame";
import { createTextScenario } from "@/fixtures";
import { dureClues } from "@/fixtures/dure/clues";
import { durePrologue } from "@/fixtures/dure/prologue";

const dureScenario = createTextScenario("dure", dureClues, durePrologue);

export default function Dure() {
  return <InTextGame scenario={dureScenario} />;
}
