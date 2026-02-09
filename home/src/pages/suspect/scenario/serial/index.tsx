import InGameLayout from "@/features/suspect/components/InGame/InGameLayout";
import { scenarios } from "@/features/suspect/fixtures";
import {
  jahayeonClues,
  jahayeonAdditionalQuestions,
} from "@/features/suspect/fixtures/jahayeon/clues";
import { jahayeonMoveButton } from "@/features/suspect/fixtures/jahayeon/movePlace";
import { JahayeonPrologue } from "@/features/suspect/fixtures/jahayeon/prologue";
import {
  jahayeonSuspects,
  jahayeonVictim,
} from "@/features/suspect/fixtures/jahayeon/suspects";
import {
  serialAdditionalQuestions,
  serialClues,
} from "@/features/suspect/fixtures/serial/clues";
import { serialMoveButton } from "@/features/suspect/fixtures/serial/movePlace";
import { SerialPrologue } from "@/features/suspect/fixtures/serial/prologue";
import {
  serialSuspects,
  serialVictims,
} from "@/features/suspect/fixtures/serial/suspects";
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
  const serialScenario = scenarios.find((scenario) => scenario.id === "serial");

  if (!serialScenario) {
    throw new Error("Scenario not found");
  }
  return (
    <ThemeProvider theme={theme}>
      <InGameLayout
        suspects={serialSuspects}
        clues={serialClues}
        movePlaceButton={serialMoveButton}
        victims={serialVictims}
        prologue={<SerialPrologue />}
        scenario={serialScenario}
        additionalQuestions={serialAdditionalQuestions}
      />
    </ThemeProvider>
  );
}
