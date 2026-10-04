import InGameLayout from "@/components/InGame/InGameLayout";
import { createScenarioTheme } from "@/components/createScenarioTheme";
import { scenarios } from "@/fixtures";
import { museumAdditionalQuestions } from "@/fixtures/museum/clues";
import { museumMoveButton } from "@/fixtures/museum/movePlace";
import { MuseumPrologue } from "@/fixtures/museum/prologue";
import { ClueScenarioType } from "@/types";
import { ThemeProvider } from "@mui/material";

export default function Museum() {
  const museumScenario = scenarios.find(
    (scenario): scenario is ClueScenarioType =>
      scenario.id === "museum" && scenario.gameType === "CLUE"
  );

  if (!museumScenario) {
    throw new Error("Scenario not found");
  }
  return (
    <ThemeProvider theme={createScenarioTheme(museumScenario.color)}>
      <InGameLayout
        movePlaceButton={museumMoveButton}
        prologue={<MuseumPrologue />}
        scenario={museumScenario}
        additionalQuestions={museumAdditionalQuestions}
      />
    </ThemeProvider>
  );
}
