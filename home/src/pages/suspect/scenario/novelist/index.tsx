import InGameLayout from "@/features/suspect/components/InGame/InGameLayout";
import { scenarios } from "@/features/suspect/fixtures";
import {
  novelistAdditionalQuestions,
  novelistClues,
} from "@/features/suspect/fixtures/novelist/clues";
import { novelistMoveButton } from "@/features/suspect/fixtures/novelist/movePlace";
import { NovelistPrologue } from "@/features/suspect/fixtures/novelist/prologue";
import {
  novelistSuspects,
  novelistVictim,
} from "@/features/suspect/fixtures/novelist/suspects";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ac7f5e",
    },
  },
});

export default function Novelist() {
  const novelistScenario = scenarios.find(
    (scenario) => scenario.id === "novelist"
  );

  if (!novelistScenario) {
    throw new Error("Scenario not found");
  }

  return (
    <ThemeProvider theme={theme}>
      <InGameLayout
        suspects={novelistSuspects}
        clues={novelistClues}
        movePlaceButton={novelistMoveButton}
        victims={[novelistVictim]}
        prologue={<NovelistPrologue />}
        scenario={novelistScenario}
        additionalQuestions={novelistAdditionalQuestions}
      />
    </ThemeProvider>
  );
}
