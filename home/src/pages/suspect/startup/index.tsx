import InGameLayout from "@/features/suspect/components/InGame/InGameLayout";
import { scenarios } from "@/features/suspect/fixtures";
import {
  startUpClues,
  startupAdditionalQuestions,
} from "@/features/suspect/fixtures/startup/clues";
import { startUpMoveButton } from "@/features/suspect/fixtures/startup/movePlace";
import { StartUpPrologue } from "@/features/suspect/fixtures/startup/prologue";
import {
  startUpSuspects,
  startUpVictim,
} from "@/features/suspect/fixtures/startup/suspects";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3B4CCA",
      contrastText: "#fafafa",
    },
  },
});

export default function Startup() {
  const startUpScenario = scenarios.find(
    (scenario) => scenario.keyword === "startup"
  );

  if (!startUpScenario) {
    throw new Error("Scenario not found");
  }
  return (
    <ThemeProvider theme={theme}>
      <InGameLayout
        suspects={startUpSuspects}
        clues={startUpClues}
        movePlaceButton={startUpMoveButton}
        victim={startUpVictim}
        prologue={<StartUpPrologue />}
        scenario={startUpScenario}
        additionalQuestions={startupAdditionalQuestions}
      />
    </ThemeProvider>
  );
}
