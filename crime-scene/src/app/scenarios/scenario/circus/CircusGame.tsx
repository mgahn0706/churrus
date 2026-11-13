"use client";

import InGameLayout from "@/components/InGame/InGameLayout";
import { createScenarioTheme } from "@/components/createScenarioTheme";
import type { ClueScenarioType } from "@/types";
import { ThemeProvider } from "@mui/material";

export default function CircusGame({ scenario }: { scenario: ClueScenarioType }) {
  return (
    <ThemeProvider theme={createScenarioTheme(scenario.color)}>
      <InGameLayout scenario={scenario} />
    </ThemeProvider>
  );
}
