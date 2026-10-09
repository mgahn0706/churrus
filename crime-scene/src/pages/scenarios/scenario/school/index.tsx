import InTextGame from "@/components/InTextGame";
import { createTextScenario } from "@/fixtures";
import { schoolClues } from "@/fixtures/school/clues";
import { schoolPrologue } from "@/fixtures/school/prologue";

const schoolScenario = createTextScenario(
  "school",
  schoolClues,
  schoolPrologue
);

export default function School() {
  return <InTextGame scenario={schoolScenario} />;
}
