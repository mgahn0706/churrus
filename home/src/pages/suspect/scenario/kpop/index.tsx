import InGameLayout from "@/features/suspect/components/InGame/InGameLayout";
import { createScenarioTheme } from "@/features/suspect/components/createScenarioTheme";
import { scenarios } from "@/features/suspect/fixtures";
import { kpopAdditionalQuestions } from "@/features/suspect/fixtures/kpop/clues";
import { kpopMoveButton } from "@/features/suspect/fixtures/kpop/movePlace";
import { KpopPrologue } from "@/features/suspect/fixtures/kpop/prologue";
import { ClueScenarioType } from "@/features/suspect/types";
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
