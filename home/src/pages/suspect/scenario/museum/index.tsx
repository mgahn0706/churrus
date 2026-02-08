import InGameLayout from "@/features/suspect/components/InGame/InGameLayout";
import { scenarios } from "@/features/suspect/fixtures";
import {
  museumAdditionalQuestions,
  museumClues,
} from "@/features/suspect/fixtures/museum/clues";
import { museumMoveButton } from "@/features/suspect/fixtures/museum/movePlace";
import { MuseumPrologue } from "@/features/suspect/fixtures/museum/prologue";
import {
  museumSuspects,
  museumVictim,
} from "@/features/suspect/fixtures/museum/suspects";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#d97706",
      contrastText: "#fafafa",
    },
  },
});

export default function Museum() {
  const museumScenario = scenarios.find((scenario) => scenario.id === "museum");

  if (!museumScenario) {
    throw new Error("Scenario not found");
  }
  return (
    <ThemeProvider theme={theme}>
      <InGameLayout
        suspects={museumSuspects}
        clues={museumClues}
        movePlaceButton={museumMoveButton}
        victims={[museumVictim]}
        prologue={<MuseumPrologue />}
        scenario={museumScenario}
        additionalQuestions={museumAdditionalQuestions}
      />
    </ThemeProvider>
  );
}
