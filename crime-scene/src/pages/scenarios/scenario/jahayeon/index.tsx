import InGameLayout from "@/components/InGame/InGameLayout";
import { createScenarioTheme } from "@/components/createScenarioTheme";
import { createClueScenario } from "@/fixtures";
import {
  jahayeonAdditionalQuestions,
  jahayeonClues,
} from "@/fixtures/jahayeon/clues";
import { jahayeonMoveButton } from "@/fixtures/jahayeon/movePlace";
import { JahayeonPrologue } from "@/fixtures/jahayeon/prologue";
import { ThemeProvider } from "@mui/material";

const jahayeonScenario = createClueScenario("jahayeon", {
  clues: jahayeonClues,
  movePlaceButtons: jahayeonMoveButton,
  prologue: <JahayeonPrologue />,
  additionalQuestions: jahayeonAdditionalQuestions,
});

export default function Jahayeon() {
  return (
    <ThemeProvider theme={createScenarioTheme(jahayeonScenario.color)}>
      <InGameLayout scenario={jahayeonScenario} />
    </ThemeProvider>
  );
}
