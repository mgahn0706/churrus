import InGameLayout from "@/components/InGame/InGameLayout";
import { createScenarioTheme } from "@/components/createScenarioTheme";
import { createClueScenario } from "@/fixtures";
import {
  museumAdditionalQuestions,
  museumClues,
} from "@/fixtures/museum/clues";
import { museumMoveButton } from "@/fixtures/museum/movePlace";
import { MuseumPrologue } from "@/fixtures/museum/prologue";
import { ThemeProvider } from "@mui/material";

const museumScenario = createClueScenario("museum", {
  clues: museumClues,
  movePlaceButtons: museumMoveButton,
  prologue: <MuseumPrologue />,
  additionalQuestions: museumAdditionalQuestions,
});

export default function Museum() {
  return (
    <ThemeProvider theme={createScenarioTheme(museumScenario.color)}>
      <InGameLayout scenario={museumScenario} />
    </ThemeProvider>
  );
}
