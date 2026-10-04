import InGameLayout from "@/components/InGame/InGameLayout";
import { createScenarioTheme } from "@/components/createScenarioTheme";
import { scenarios } from "@/fixtures";
import { startupAdditionalQuestions } from "@/fixtures/startup/clues";
import { startUpMoveButton } from "@/fixtures/startup/movePlace";
import { StartUpPrologue } from "@/fixtures/startup/prologue";
import { ClueScenarioType } from "@/types";
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
