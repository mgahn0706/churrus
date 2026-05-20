import InTextGame from "@/features/suspect/components/InTextGame";
import { scenarios } from "@/features/suspect/fixtures";
import { TextScenarioType } from "@/features/suspect/types";

export default function School() {
  const schoolScenario = scenarios.find(
    (scenario): scenario is TextScenarioType =>
      scenario.id === "school" && scenario.gameType === "TEXT"
  );

  if (!schoolScenario) {
    throw new Error("Scenario not found");
  }
  return <InTextGame scenario={schoolScenario} />;
}
