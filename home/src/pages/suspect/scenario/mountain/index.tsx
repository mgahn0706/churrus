import InGameLayout from "@/features/suspect/components/InGame/InGameLayout";
import { scenarios } from "@/features/suspect/fixtures";
import {
  mountainAdditionalQuestions,
  mountainClues,
} from "@/features/suspect/fixtures/mountain/clues";
import { mountainMoveButton } from "@/features/suspect/fixtures/mountain/movePlace";
import { MountainPrologue } from "@/features/suspect/fixtures/mountain/prologue";
import {
  mountainSuspects,
  mountainVictim,
} from "@/features/suspect/fixtures/mountain/suspects";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4caf50",
      contrastText: "#fafafa",
    },
  },
});

export default function Mountain() {
  const mountainScenario = scenarios.find(
    (scenario) => scenario.id === "mountain"
  );

  if (!mountainScenario) {
    throw new Error("Scenario not found");
  }

  return (
    <ThemeProvider theme={theme}>
      <InGameLayout
        suspects={mountainSuspects}
        clues={mountainClues}
        movePlaceButton={mountainMoveButton}
        victims={[mountainVictim]}
        prologue={<MountainPrologue />}
        scenario={mountainScenario}
        additionalQuestions={mountainAdditionalQuestions}
      />
    </ThemeProvider>
  );
}
