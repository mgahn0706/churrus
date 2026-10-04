import InGameLayout from "@/components/InGame/InGameLayout";
import { createScenarioTheme } from "@/components/createScenarioTheme";
import { scenarios } from "@/fixtures";
import { subwayAdditionalQuestions } from "@/fixtures/subway/clues";
import { subwayMoveButton } from "@/fixtures/subway/movePlace";
import { SubwayPrologue } from "@/fixtures/subway/prologue";
import { ClueScenarioType } from "@/types";
import { ThemeProvider } from "@mui/material";

export default function Subway() {
  const subwayScenario = scenarios.find(
    (scenario): scenario is ClueScenarioType =>
      scenario.id === "subway" && scenario.gameType === "CLUE"
  );

  if (!subwayScenario) {
    throw new Error("Scenario not found");
  }

  return (
    <ThemeProvider theme={createScenarioTheme(subwayScenario.color)}>
      <InGameLayout
        movePlaceButton={subwayMoveButton}
        prologue={<SubwayPrologue />}
        scenario={subwayScenario}
        additionalQuestions={subwayAdditionalQuestions}
      />
    </ThemeProvider>
  );
}
