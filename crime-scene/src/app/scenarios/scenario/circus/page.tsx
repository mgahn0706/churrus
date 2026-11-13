import { createClueScenario } from "@/fixtures";
import { circusAdditionalQuestions, circusClues } from "@/fixtures/circus/clues";
import { circusMoveButtons } from "@/fixtures/circus/movePlace";
import { CircusPrologue } from "@/fixtures/circus/prologue";
import CircusGame from "./CircusGame";

const circusScenario = createClueScenario("circus", {
  clues: circusClues,
  movePlaceButtons: circusMoveButtons,
  prologue: <CircusPrologue />,
  additionalQuestions: circusAdditionalQuestions,
});

export default function CircusScenario() {
  return <CircusGame scenario={circusScenario} />;
}
