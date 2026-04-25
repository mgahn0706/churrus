import InGameLayout from "@/features/suspect/components/InGame/InGameLayout";
import { scenarios } from "@/features/suspect/fixtures";
import { subwayAdditionalQuestions } from "@/features/suspect/fixtures/subway/clues";
import { subwayMoveButton } from "@/features/suspect/fixtures/subway/movePlace";
import { SubwayPrologue } from "@/features/suspect/fixtures/subway/prologue";
import { ClueScenarioType } from "@/features/suspect/types";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00A84D",
      contrastText: "#fafafa",
    },
  },
});

export default function Subway() {
  const subwayScenario = scenarios.find(
    (scenario): scenario is ClueScenarioType =>
      scenario.id === "subway" && scenario.gameType === "CLUE"
  );

  if (!subwayScenario) {
    throw new Error("Scenario not found");
  }

  return (
    <ThemeProvider theme={theme}>
      <InGameLayout
        movePlaceButton={subwayMoveButton}
        prologue={<SubwayPrologue />}
        scenario={subwayScenario}
        additionalQuestions={subwayAdditionalQuestions}
      />
    </ThemeProvider>
  );
}
