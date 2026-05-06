import InGameLayout from "@/features/suspect/components/InGame/InGameLayout";
import { scenarios } from "@/features/suspect/fixtures";
import { clubroomAdditionalQuestions } from "@/features/suspect/fixtures/clubroom/clues";
import { clubroomMoveButton } from "@/features/suspect/fixtures/clubroom/movePlace";
import { ClubroomPrologue } from "@/features/suspect/fixtures/clubroom/prologue";
import { ClueScenarioType } from "@/features/suspect/types";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6d4aff",
      contrastText: "#fafafa",
    },
  },
});

export default function Clubroom() {
  const clubroomScenario = scenarios.find(
    (scenario): scenario is ClueScenarioType =>
      scenario.id === "clubroom" && scenario.gameType === "CLUE"
  );

  if (!clubroomScenario) {
    throw new Error("Scenario not found");
  }

  return (
    <ThemeProvider theme={theme}>
      <InGameLayout
        movePlaceButton={clubroomMoveButton}
        prologue={<ClubroomPrologue />}
        scenario={clubroomScenario}
        additionalQuestions={clubroomAdditionalQuestions}
      />
    </ThemeProvider>
  );
}
