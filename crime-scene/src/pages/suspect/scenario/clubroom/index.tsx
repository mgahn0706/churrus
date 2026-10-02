import InGameLayout from "@/features/suspect/components/InGame/InGameLayout";
import { createScenarioTheme } from "@/features/suspect/components/createScenarioTheme";
import { scenarios } from "@/features/suspect/fixtures";
import { clubroomAdditionalQuestions } from "@/features/suspect/fixtures/clubroom/clues";
import { clubroomMoveButton } from "@/features/suspect/fixtures/clubroom/movePlace";
import { ClubroomPrologue } from "@/features/suspect/fixtures/clubroom/prologue";
import { ClueScenarioType } from "@/features/suspect/types";
import { ThemeProvider } from "@mui/material";

export default function Clubroom() {
  const clubroomScenario = scenarios.find(
    (scenario): scenario is ClueScenarioType =>
      scenario.id === "clubroom" && scenario.gameType === "CLUE"
  );

  if (!clubroomScenario) {
    throw new Error("Scenario not found");
  }

  return (
    <ThemeProvider theme={createScenarioTheme(clubroomScenario.color)}>
      <InGameLayout
        movePlaceButton={clubroomMoveButton}
        prologue={<ClubroomPrologue />}
        scenario={clubroomScenario}
        additionalQuestions={clubroomAdditionalQuestions}
      />
    </ThemeProvider>
  );
}
