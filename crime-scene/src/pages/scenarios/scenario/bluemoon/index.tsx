import InTextGame from "@/components/InTextGame";
import { createTextScenario } from "@/fixtures";
import { bluemoonClues } from "@/fixtures/bluemoon/clues";
import { bluemoonPrologue } from "@/fixtures/bluemoon/prologue";

const bluemoonScenario = createTextScenario(
  "bluemoon",
  bluemoonClues,
  bluemoonPrologue
);

export default function Bluemoon() {
  return <InTextGame scenario={bluemoonScenario} />;
}
