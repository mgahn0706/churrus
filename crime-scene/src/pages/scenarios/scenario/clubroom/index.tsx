import InGameLayout from "@/components/InGame/InGameLayout";
import { createScenarioTheme } from "@/components/createScenarioTheme";
import { createClueScenario } from "@/fixtures";
import {
  clubroomAdditionalQuestions,
  clubroomClues,
} from "@/fixtures/clubroom/clues";
import { clubroomMoveButton } from "@/fixtures/clubroom/movePlace";
import { ClubroomPrologue } from "@/fixtures/clubroom/prologue";
import { ThemeProvider } from "@mui/material";

const clubroomScenario = createClueScenario("clubroom", {
  clues: clubroomClues,
  movePlaceButtons: clubroomMoveButton,
  prologue: <ClubroomPrologue />,
  additionalQuestions: clubroomAdditionalQuestions,
});

export default function Clubroom() {
  return (
    <ThemeProvider theme={createScenarioTheme(clubroomScenario.color)}>
      <InGameLayout scenario={clubroomScenario} />
    </ThemeProvider>
  );
}
