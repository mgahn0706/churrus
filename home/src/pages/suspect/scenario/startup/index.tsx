import InGameLayout from "@/features/suspect/components/InGame/InGameLayout";
import { scenarios } from "@/features/suspect/fixtures";
import { startupAdditionalQuestions } from "@/features/suspect/fixtures/startup/clues";
import { startUpMoveButton } from "@/features/suspect/fixtures/startup/movePlace";
import { StartUpPrologue } from "@/features/suspect/fixtures/startup/prologue";
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
    (scenario) => scenario.id === "startup"
  );

  if (!startUpScenario) {
    throw new Error("Scenario not found");
  }
  return (
    <ThemeProvider theme={theme}>
      <InGameLayout
        movePlaceButton={startUpMoveButton}
        prologue={<StartUpPrologue />}
        scenario={startUpScenario}
        additionalQuestions={startupAdditionalQuestions}
      />
    </ThemeProvider>
  );
}
