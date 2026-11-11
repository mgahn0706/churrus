"use client";

import InGameLayout from "@/components/InGame/InGameLayout";
import { createScenarioTheme } from "@/components/createScenarioTheme";
import { createClueScenario } from "@/fixtures";
import { circusAdditionalQuestions, circusClues } from "@/fixtures/circus/clues";
import { circusMoveButtons } from "@/fixtures/circus/movePlace";
import { CircusPrologue } from "@/fixtures/circus/prologue";
import { ThemeProvider } from "@mui/material";

const circusScenario = createClueScenario("circus", {
  clues: circusClues,
  movePlaceButtons: circusMoveButtons,
  prologue: <CircusPrologue />,
  additionalQuestions: circusAdditionalQuestions,
});

export default function CircusScenario() {
  return (
    <ThemeProvider theme={createScenarioTheme(circusScenario.color)}>
      <InGameLayout scenario={circusScenario} />
    </ThemeProvider>
  );
}
