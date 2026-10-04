import InGameLayout from "@/components/InGame/InGameLayout";
import { createScenarioTheme } from "@/components/createScenarioTheme";
import { scenarios } from "@/fixtures";
import { boxAdditionalQuestions } from "@/fixtures/box/clues";
import { boxMoveButton } from "@/fixtures/box/movePlace";
import { BoxPrologue } from "@/fixtures/box/prologue";
import { ClueScenarioType } from "@/types";
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
