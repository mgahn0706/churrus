import InGameLayout from "@/components/InGame/InGameLayout";
import { createScenarioTheme } from "@/components/createScenarioTheme";
import { scenarios } from "@/fixtures";
import { paradeAdditionalQuestions } from "@/fixtures/parade/clues";
import { paradeMoveButton } from "@/fixtures/parade/movePlace";
import { ParadePrologue } from "@/fixtures/parade/prologue";
import { ClueScenarioType } from "@/types";
import { ThemeProvider } from "@mui/material";

export default function ParadeScenario() {
  const paradeScenario = scenarios.find(
    (scenario): scenario is ClueScenarioType =>
      scenario.id === "parade" && scenario.gameType === "CLUE"
  );

  if (!paradeScenario) {
    throw new Error("Scenario not found");
  }

  return (
    <ThemeProvider theme={createScenarioTheme(paradeScenario.color)}>
      <InGameLayout
        movePlaceButton={paradeMoveButton}
        prologue={<ParadePrologue />}
        scenario={paradeScenario}
        additionalQuestions={paradeAdditionalQuestions}
      />
    </ThemeProvider>
  );
}
