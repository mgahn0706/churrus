import InGameLayout from "@/components/InGame/InGameLayout";
import { createScenarioTheme } from "@/components/createScenarioTheme";
import { createClueScenario } from "@/fixtures";
import {
  mountainAdditionalQuestions,
  mountainClues,
} from "@/fixtures/mountain/clues";
import { mountainMoveButton } from "@/fixtures/mountain/movePlace";
import { MountainPrologue } from "@/fixtures/mountain/prologue";
import { ThemeProvider } from "@mui/material";

const mountainScenario = createClueScenario("mountain", {
  clues: mountainClues,
  movePlaceButtons: mountainMoveButton,
  prologue: <MountainPrologue />,
  additionalQuestions: mountainAdditionalQuestions,
});

export default function Mountain() {
  return (
    <ThemeProvider theme={createScenarioTheme(mountainScenario.color)}>
      <InGameLayout scenario={mountainScenario} />
    </ThemeProvider>
  );
}
