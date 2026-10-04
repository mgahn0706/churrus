import InGameLayout from "@/components/InGame/InGameLayout";
import { createScenarioTheme } from "@/components/createScenarioTheme";
import { scenarios } from "@/fixtures";
import { jahayeonAdditionalQuestions } from "@/fixtures/jahayeon/clues";
import { jahayeonMoveButton } from "@/fixtures/jahayeon/movePlace";
import { JahayeonPrologue } from "@/fixtures/jahayeon/prologue";
import { ClueScenarioType } from "@/types";
import { ThemeProvider } from "@mui/material";

export default function Jahayeon() {
  const jahayeonScenario = scenarios.find(
    (scenario): scenario is ClueScenarioType =>
      scenario.id === "jahayeon" && scenario.gameType === "CLUE"
  );

  if (!jahayeonScenario) {
    throw new Error("Scenario not found");
  }
  return (
    <ThemeProvider theme={createScenarioTheme(jahayeonScenario.color)}>
      <InGameLayout
        movePlaceButton={jahayeonMoveButton}
        prologue={<JahayeonPrologue />}
        scenario={jahayeonScenario}
        additionalQuestions={jahayeonAdditionalQuestions}
      />
    </ThemeProvider>
  );
}
