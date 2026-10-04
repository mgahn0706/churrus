import InGameLayout from "@/components/InGame/InGameLayout";
import { createScenarioTheme } from "@/components/createScenarioTheme";
import { scenarios } from "@/fixtures";
import { ghostAdditionalQuestions } from "@/fixtures/ghost/clues";
import { ghostMoveButton } from "@/fixtures/ghost/movePlace";
import { GhostPrologue } from "@/fixtures/ghost/prologue";
import { ClueScenarioType } from "@/types";
import { ThemeProvider } from "@mui/material";

export default function GhostScenario() {
  const ghostScenario = scenarios.find(
    (scenario): scenario is ClueScenarioType =>
      scenario.id === "ghost" && scenario.gameType === "CLUE"
  );

  if (!ghostScenario) {
    throw new Error("Scenario not found");
  }

  return (
    <ThemeProvider theme={createScenarioTheme(ghostScenario.color)}>
      <InGameLayout
        movePlaceButton={ghostMoveButton}
        prologue={<GhostPrologue />}
        scenario={ghostScenario}
        additionalQuestions={ghostAdditionalQuestions}
      />
    </ThemeProvider>
  );
}
