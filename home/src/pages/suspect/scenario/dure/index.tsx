import InTextGame from "@/features/suspect/components/InTextGame";
import { scenarios } from "@/features/suspect/fixtures";
import { TextScenarioType } from "@/features/suspect/types";

export default function Dure() {
  const dureScenario = scenarios.find(
    (scenario): scenario is TextScenarioType =>
      scenario.id === "dure" && scenario.gameType === "TEXT"
  );

  if (!dureScenario) {
    throw new Error("Scenario not found");
  }
  return <InTextGame scenario={dureScenario} />;
}
