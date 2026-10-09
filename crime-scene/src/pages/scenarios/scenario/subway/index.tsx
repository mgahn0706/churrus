import InGameLayout from "@/components/InGame/InGameLayout";
import { createScenarioTheme } from "@/components/createScenarioTheme";
import { createClueScenario } from "@/fixtures";
import {
  subwayAdditionalQuestions,
  subwayClues,
} from "@/fixtures/subway/clues";
import { subwayMoveButton } from "@/fixtures/subway/movePlace";
import { SubwayPrologue } from "@/fixtures/subway/prologue";
import { ThemeProvider } from "@mui/material";

const subwayScenario = createClueScenario("subway", {
  clues: subwayClues,
  movePlaceButtons: subwayMoveButton,
  prologue: <SubwayPrologue />,
  additionalQuestions: subwayAdditionalQuestions,
});

export default function Subway() {
  return (
    <ThemeProvider theme={createScenarioTheme(subwayScenario.color)}>
      <InGameLayout scenario={subwayScenario} />
    </ThemeProvider>
  );
}
