import InGameLayout from "@/components/InGame/InGameLayout";
import { createScenarioTheme } from "@/components/createScenarioTheme";
import { createClueScenario } from "@/fixtures";
import { kpopAdditionalQuestions, kpopClues } from "@/fixtures/kpop/clues";
import { kpopMoveButton } from "@/fixtures/kpop/movePlace";
import { KpopPrologue } from "@/fixtures/kpop/prologue";
import { ThemeProvider } from "@mui/material";

const kpopScenario = createClueScenario("kpop", {
  clues: kpopClues,
  movePlaceButtons: kpopMoveButton,
  prologue: <KpopPrologue />,
  additionalQuestions: kpopAdditionalQuestions,
});

export default function Kpop() {
  return (
    <ThemeProvider theme={createScenarioTheme(kpopScenario.color)}>
      <InGameLayout scenario={kpopScenario} />
    </ThemeProvider>
  );
}
