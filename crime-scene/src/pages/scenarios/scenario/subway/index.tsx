import InGameLayout from "@/features/suspect/components/InGame/InGameLayout";
import { createScenarioTheme } from "@/features/suspect/components/createScenarioTheme";
import { scenarios } from "@/features/suspect/fixtures";
import { subwayAdditionalQuestions } from "@/features/suspect/fixtures/subway/clues";
import { subwayMoveButton } from "@/features/suspect/fixtures/subway/movePlace";
import { SubwayPrologue } from "@/features/suspect/fixtures/subway/prologue";
import { ClueScenarioType } from "@/features/suspect/types";
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
