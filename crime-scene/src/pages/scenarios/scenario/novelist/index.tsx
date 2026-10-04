import InGameLayout from "@/components/InGame/InGameLayout";
import { createScenarioTheme } from "@/components/createScenarioTheme";
import { createClueScenario } from "@/fixtures";
import {
  novelistAdditionalQuestions,
  novelistClues,
} from "@/fixtures/novelist/clues";
import { novelistMoveButton } from "@/fixtures/novelist/movePlace";
import { NovelistPrologue } from "@/fixtures/novelist/prologue";
import { ThemeProvider } from "@mui/material";

const novelistScenario = createClueScenario("novelist", {
  clues: novelistClues,
  movePlaceButtons: novelistMoveButton,
  prologue: <NovelistPrologue />,
  additionalQuestions: novelistAdditionalQuestions,
});

export default function Novelist() {
  return (
    <ThemeProvider theme={createScenarioTheme(novelistScenario.color)}>
      <InGameLayout scenario={novelistScenario} />
    </ThemeProvider>
  );
}
