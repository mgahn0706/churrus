import InGameLayout from "@/features/suspect/components/InGame/InGameLayout";
import { createScenarioTheme } from "@/features/suspect/components/createScenarioTheme";
import { scenarios } from "@/features/suspect/fixtures";
import { boxAdditionalQuestions } from "@/features/suspect/fixtures/box/clues";
import { boxMoveButton } from "@/features/suspect/fixtures/box/movePlace";
import { BoxPrologue } from "@/features/suspect/fixtures/box/prologue";
import { ClueScenarioType } from "@/features/suspect/types";
import { ThemeProvider } from "@mui/material";

export default function BoxScenario() {
  const boxScenario = scenarios.find(
    (scenario): scenario is ClueScenarioType =>
      scenario.id === "box" && scenario.gameType === "CLUE"
  );

  if (!boxScenario) {
    throw new Error("Scenario not found");
  }

  return (
    <ThemeProvider theme={createScenarioTheme(boxScenario.color)}>
      <InGameLayout
        movePlaceButton={boxMoveButton}
        prologue={<BoxPrologue />}
        scenario={boxScenario}
        additionalQuestions={boxAdditionalQuestions}
      />
    </ThemeProvider>
  );
}
