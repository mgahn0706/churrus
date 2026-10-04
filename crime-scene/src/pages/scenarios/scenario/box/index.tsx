import InGameLayout from "@/components/InGame/InGameLayout";
import { createScenarioTheme } from "@/components/createScenarioTheme";
import { createClueScenario } from "@/fixtures";
import { boxAdditionalQuestions, boxClues } from "@/fixtures/box/clues";
import { boxMoveButton } from "@/fixtures/box/movePlace";
import { BoxPrologue } from "@/fixtures/box/prologue";
import { ThemeProvider } from "@mui/material";

const boxScenario = createClueScenario("box", {
  clues: boxClues,
  movePlaceButtons: boxMoveButton,
  prologue: <BoxPrologue />,
  additionalQuestions: boxAdditionalQuestions,
});

export default function BoxScenario() {
  return (
    <ThemeProvider theme={createScenarioTheme(boxScenario.color)}>
      <InGameLayout scenario={boxScenario} />
    </ThemeProvider>
  );
}
