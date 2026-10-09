import InGameLayout from "@/components/InGame/InGameLayout";
import { createScenarioTheme } from "@/components/createScenarioTheme";
import { createClueScenario } from "@/fixtures";
import {
  startUpClues,
  startupAdditionalQuestions,
} from "@/fixtures/startup/clues";
import { startUpMoveButton } from "@/fixtures/startup/movePlace";
import { StartUpPrologue } from "@/fixtures/startup/prologue";
import { ThemeProvider } from "@mui/material";

const startupScenario = createClueScenario("startup", {
  clues: startUpClues,
  movePlaceButtons: startUpMoveButton,
  prologue: <StartUpPrologue />,
  additionalQuestions: startupAdditionalQuestions,
});

export default function Startup() {
  return (
    <ThemeProvider theme={createScenarioTheme(startupScenario.color)}>
      <InGameLayout scenario={startupScenario} />
    </ThemeProvider>
  );
}
