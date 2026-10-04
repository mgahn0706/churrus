import InGameLayout from "@/components/InGame/InGameLayout";
import { createScenarioTheme } from "@/components/createScenarioTheme";
import { scenarios } from "@/fixtures";
import { serialAdditionalQuestions } from "@/fixtures/serial/clues";
import { serialMoveButton } from "@/fixtures/serial/movePlace";
import { SerialPrologue } from "@/fixtures/serial/prologue";
import { ClueScenarioType } from "@/types";
import { ThemeProvider } from "@mui/material";

export default function Serial() {
  const serialScenario = scenarios.find(
    (scenario): scenario is ClueScenarioType =>
      scenario.id === "serial" && scenario.gameType === "CLUE"
  );

  if (!serialScenario) {
    throw new Error("Scenario not found");
  }
  return (
    <ThemeProvider theme={createScenarioTheme(serialScenario.color)}>
      <InGameLayout
        movePlaceButton={serialMoveButton}
        prologue={<SerialPrologue />}
        scenario={serialScenario}
        additionalQuestions={serialAdditionalQuestions}
      />
    </ThemeProvider>
  );
}
