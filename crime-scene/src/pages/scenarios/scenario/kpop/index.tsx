import InGameLayout from "@/components/InGame/InGameLayout";
import { createScenarioTheme } from "@/components/createScenarioTheme";
import { scenarios } from "@/fixtures";
import { kpopAdditionalQuestions } from "@/fixtures/kpop/clues";
import { kpopMoveButton } from "@/fixtures/kpop/movePlace";
import { KpopPrologue } from "@/fixtures/kpop/prologue";
import { ClueScenarioType } from "@/types";
import { ThemeProvider } from "@mui/material";

export default function Kpop() {
  const kpopScenario = scenarios.find(
    (scenario): scenario is ClueScenarioType =>
      scenario.id === "kpop" && scenario.gameType === "CLUE"
  );

  if (!kpopScenario) {
    throw new Error("Scenario not found");
  }

  return (
    <ThemeProvider theme={createScenarioTheme(kpopScenario.color)}>
      <InGameLayout
        movePlaceButton={kpopMoveButton}
        prologue={<KpopPrologue />}
        scenario={kpopScenario}
        additionalQuestions={kpopAdditionalQuestions}
      />
    </ThemeProvider>
  );
}
