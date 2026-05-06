import InGameLayout from "@/features/suspect/components/InGame/InGameLayout";
import { createScenarioTheme } from "@/features/suspect/components/createScenarioTheme";
import { scenarios } from "@/features/suspect/fixtures";
import { mountainAdditionalQuestions } from "@/features/suspect/fixtures/mountain/clues";
import { mountainMoveButton } from "@/features/suspect/fixtures/mountain/movePlace";
import { MountainPrologue } from "@/features/suspect/fixtures/mountain/prologue";
import { ClueScenarioType } from "@/features/suspect/types";
import { ThemeProvider } from "@mui/material";

export default function Mountain() {
  const mountainScenario = scenarios.find(
    (scenario): scenario is ClueScenarioType =>
      scenario.id === "mountain" && scenario.gameType === "CLUE"
  );

  if (!mountainScenario) {
    throw new Error("Scenario not found");
  }

  return (
    <ThemeProvider theme={createScenarioTheme(mountainScenario.color)}>
      <InGameLayout
        movePlaceButton={mountainMoveButton}
        prologue={<MountainPrologue />}
        scenario={mountainScenario}
        additionalQuestions={mountainAdditionalQuestions}
      />
    </ThemeProvider>
  );
}
