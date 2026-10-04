import InGameLayout from "@/components/InGame/InGameLayout";
import { createScenarioTheme } from "@/components/createScenarioTheme";
import { scenarios } from "@/fixtures";
import { novelistAdditionalQuestions } from "@/fixtures/novelist/clues";
import { novelistMoveButton } from "@/fixtures/novelist/movePlace";
import { NovelistPrologue } from "@/fixtures/novelist/prologue";
import { ClueScenarioType } from "@/types";
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
