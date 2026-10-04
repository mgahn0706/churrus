import InGameLayout from "@/components/InGame/InGameLayout";
import { createScenarioTheme } from "@/components/createScenarioTheme";
import { createClueScenario } from "@/fixtures";
import {
  paradeAdditionalQuestions,
  paradeClues,
} from "@/fixtures/parade/clues";
import { paradeMoveButton } from "@/fixtures/parade/movePlace";
import { ParadePrologue } from "@/fixtures/parade/prologue";
import { ThemeProvider } from "@mui/material";

const paradeScenario = createClueScenario("parade", {
  clues: paradeClues,
  movePlaceButtons: paradeMoveButton,
  prologue: <ParadePrologue />,
  additionalQuestions: paradeAdditionalQuestions,
});

export default function ParadeScenario() {
  return (
    <ThemeProvider theme={createScenarioTheme(paradeScenario.color)}>
      <InGameLayout scenario={paradeScenario} />
    </ThemeProvider>
  );
}
