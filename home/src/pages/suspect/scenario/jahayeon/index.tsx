import InGameLayout from "@/features/suspect/components/InGame/InGameLayout";
import { scenarios } from "@/features/suspect/fixtures";
import { jahayeonAdditionalQuestions } from "@/features/suspect/fixtures/jahayeon/clues";
import { jahayeonMoveButton } from "@/features/suspect/fixtures/jahayeon/movePlace";
import { JahayeonPrologue } from "@/features/suspect/fixtures/jahayeon/prologue";
import { ClueScenarioType } from "@/features/suspect/types";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0891b2",
      contrastText: "#fafafa",
    },
  },
});

export default function Jahayeon() {
  const jahayeonScenario = scenarios.find(
    (scenario): scenario is ClueScenarioType =>
      scenario.id === "jahayeon" && scenario.gameType === "CLUE"
  );

  if (!jahayeonScenario) {
    throw new Error("Scenario not found");
  }
  return (
    <ThemeProvider theme={theme}>
      <InGameLayout
        movePlaceButton={jahayeonMoveButton}
        prologue={<JahayeonPrologue />}
        scenario={jahayeonScenario}
        additionalQuestions={jahayeonAdditionalQuestions}
      />
    </ThemeProvider>
  );
}
