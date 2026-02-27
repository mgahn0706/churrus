import InGameLayout from "@/features/suspect/components/InGame/InGameLayout";
import { scenarios } from "@/features/suspect/fixtures";
import {
  bluemoonAdditionalQuestions,
  bluemoonClues,
} from "@/features/suspect/fixtures/bluemoon/clues";
import { bluemoonMoveButton } from "@/features/suspect/fixtures/bluemoon/movePlace";
import { BluemoonPrologue } from "@/features/suspect/fixtures/bluemoon/prologue";
import {
  bluemoonSuspects,
  bluemoonVictim,
} from "@/features/suspect/fixtures/bluemoon/suspects";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1e6df4",
      contrastText: "#fafafa",
    },
  },
});

export default function Bluemoon() {
  const bluemoonScenario = scenarios.find(
    (scenario) => scenario.id === "bluemoon"
  );

  if (!bluemoonScenario) {
    throw new Error("Scenario not found");
  }

  return (
    <ThemeProvider theme={theme}>
      <InGameLayout
        suspects={bluemoonSuspects}
        clues={bluemoonClues}
        movePlaceButton={bluemoonMoveButton}
        victims={[bluemoonVictim]}
        prologue={<BluemoonPrologue />}
        scenario={bluemoonScenario}
        additionalQuestions={bluemoonAdditionalQuestions}
      />
    </ThemeProvider>
  );
}
