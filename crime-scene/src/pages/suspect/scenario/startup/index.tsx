import InGameLayout from "@/features/suspect/components/InGame/InGameLayout";
import { createScenarioTheme } from "@/features/suspect/components/createScenarioTheme";
import { scenarios } from "@/features/suspect/fixtures";
import { startupAdditionalQuestions } from "@/features/suspect/fixtures/startup/clues";
import { startUpMoveButton } from "@/features/suspect/fixtures/startup/movePlace";
import { StartUpPrologue } from "@/features/suspect/fixtures/startup/prologue";
import { ClueScenarioType } from "@/features/suspect/types";
import { ThemeProvider } from "@mui/material";

export default function Startup() {
  const startUpScenario = scenarios.find(
    (scenario): scenario is ClueScenarioType =>
      scenario.id === "startup" && scenario.gameType === "CLUE"
  );

  if (!startUpScenario) {
    throw new Error("Scenario not found");
  }

  return (
    <ThemeProvider theme={createScenarioTheme(startUpScenario.color)}>
      <InGameLayout
        movePlaceButton={startUpMoveButton}
        prologue={<StartUpPrologue />}
        scenario={startUpScenario}
        additionalQuestions={startupAdditionalQuestions}
      />
    </ThemeProvider>
  );
}
