import InGameLayout from "@/components/InGame/InGameLayout";
import { createScenarioTheme } from "@/components/createScenarioTheme";
import { createClueScenario } from "@/fixtures";
import {
  serialAdditionalQuestions,
  serialClues,
} from "@/fixtures/serial/clues";
import { serialMoveButton } from "@/fixtures/serial/movePlace";
import { SerialPrologue } from "@/fixtures/serial/prologue";
import { ThemeProvider } from "@mui/material";

const serialScenario = createClueScenario("serial", {
  clues: serialClues,
  movePlaceButtons: serialMoveButton,
  prologue: <SerialPrologue />,
  additionalQuestions: serialAdditionalQuestions,
});

export default function Serial() {
  return (
    <ThemeProvider theme={createScenarioTheme(serialScenario.color)}>
      <InGameLayout scenario={serialScenario} />
    </ThemeProvider>
  );
}
