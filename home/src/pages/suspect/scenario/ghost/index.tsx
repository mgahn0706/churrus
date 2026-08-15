import InGameLayout from "@/features/suspect/components/InGame/InGameLayout";
import { createScenarioTheme } from "@/features/suspect/components/createScenarioTheme";
import { scenarios } from "@/features/suspect/fixtures";
import { ghostAdditionalQuestions } from "@/features/suspect/fixtures/ghost/clues";
import { ghostMoveButton } from "@/features/suspect/fixtures/ghost/movePlace";
import { GhostPrologue } from "@/features/suspect/fixtures/ghost/prologue";
import { ClueScenarioType } from "@/features/suspect/types";
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
