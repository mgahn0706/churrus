import InGameLayout from "@/components/InGame/InGameLayout";
import { createScenarioTheme } from "@/components/createScenarioTheme";
import { createClueScenario } from "@/fixtures";
import { ghostAdditionalQuestions, ghostClues } from "@/fixtures/ghost/clues";
import { ghostMoveButton } from "@/fixtures/ghost/movePlace";
import { GhostPrologue } from "@/fixtures/ghost/prologue";
import { ThemeProvider } from "@mui/material";

const ghostScenario = createClueScenario("ghost", {
  clues: ghostClues,
  movePlaceButtons: ghostMoveButton,
  prologue: <GhostPrologue />,
  additionalQuestions: ghostAdditionalQuestions,
});

export default function GhostScenario() {
  return (
    <ThemeProvider theme={createScenarioTheme(ghostScenario.color)}>
      <InGameLayout scenario={ghostScenario} />
    </ThemeProvider>
  );
}
