import InGameLayout from "@/features/suspect/components/InGame/InGameLayout";
import { createScenarioTheme } from "@/features/suspect/components/createScenarioTheme";
import { scenarios } from "@/features/suspect/fixtures";
import { novelistAdditionalQuestions } from "@/features/suspect/fixtures/novelist/clues";
import { novelistMoveButton } from "@/features/suspect/fixtures/novelist/movePlace";
import { NovelistPrologue } from "@/features/suspect/fixtures/novelist/prologue";
import { ClueScenarioType } from "@/features/suspect/types";
import { ThemeProvider } from "@mui/material";

export default function Novelist() {
  const novelistScenario = scenarios.find(
    (scenario): scenario is ClueScenarioType =>
      scenario.id === "novelist" && scenario.gameType === "CLUE"
  );

  if (!novelistScenario) {
    throw new Error("Scenario not found");
  }

  return (
    <ThemeProvider theme={createScenarioTheme(novelistScenario.color)}>
      <InGameLayout
        movePlaceButton={novelistMoveButton}
        prologue={<NovelistPrologue />}
        scenario={novelistScenario}
        additionalQuestions={novelistAdditionalQuestions}
      />
    </ThemeProvider>
  );
}
