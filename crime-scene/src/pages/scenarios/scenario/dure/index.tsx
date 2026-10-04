import InTextGame from "@/components/InTextGame";
import { scenarios } from "@/fixtures";
import { TextScenarioType } from "@/types";

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
