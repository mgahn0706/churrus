import InGameLayout from "@/features/suspect/components/InGame/InGameLayout";
import { scenarios } from "@/features/suspect/fixtures";
import { serialAdditionalQuestions } from "@/features/suspect/fixtures/serial/clues";
import { serialMoveButton } from "@/features/suspect/fixtures/serial/movePlace";
import { SerialPrologue } from "@/features/suspect/fixtures/serial/prologue";
import { ClueScenarioType } from "@/features/suspect/types";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9333ea",
      contrastText: "#fafafa",
    },
  },
});

export default function Serial() {
  const serialScenario = scenarios.find(
    (scenario): scenario is ClueScenarioType =>
      scenario.id === "serial" && scenario.gameType === "CLUE"
  );

  if (!serialScenario) {
    throw new Error("Scenario not found");
  }
  return (
    <ThemeProvider theme={theme}>
      <InGameLayout
        movePlaceButton={serialMoveButton}
        prologue={<SerialPrologue />}
        scenario={serialScenario}
        additionalQuestions={serialAdditionalQuestions}
      />
    </ThemeProvider>
  );
}
