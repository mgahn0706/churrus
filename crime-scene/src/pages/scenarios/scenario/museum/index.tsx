import InGameLayout from "@/features/suspect/components/InGame/InGameLayout";
import { createScenarioTheme } from "@/features/suspect/components/createScenarioTheme";
import { scenarios } from "@/features/suspect/fixtures";
import { museumAdditionalQuestions } from "@/features/suspect/fixtures/museum/clues";
import { museumMoveButton } from "@/features/suspect/fixtures/museum/movePlace";
import { MuseumPrologue } from "@/features/suspect/fixtures/museum/prologue";
import { ClueScenarioType } from "@/features/suspect/types";
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
