import InTextGame from "@/components/InTextGame";
import { scenarios } from "@/fixtures";
import { TextScenarioType } from "@/types";

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
