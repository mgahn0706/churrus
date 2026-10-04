import InGameLayout from "@/components/InGame/InGameLayout";
import { createScenarioTheme } from "@/components/createScenarioTheme";
import { scenarios } from "@/fixtures";
import { clubroomAdditionalQuestions } from "@/fixtures/clubroom/clues";
import { clubroomMoveButton } from "@/fixtures/clubroom/movePlace";
import { ClubroomPrologue } from "@/fixtures/clubroom/prologue";
import { ClueScenarioType } from "@/types";
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
