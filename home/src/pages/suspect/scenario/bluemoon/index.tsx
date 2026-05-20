import InTextGame from "@/features/suspect/components/InTextGame";
import { scenarios } from "@/features/suspect/fixtures";
import { TextScenarioType } from "@/features/suspect/types";

export default function Bluemoon() {
  const bluemoonScenario = scenarios.find(
    (scenario): scenario is TextScenarioType =>
      scenario.id === "bluemoon" && scenario.gameType === "TEXT"
  );

  if (!bluemoonScenario) {
    throw new Error("Scenario not found");
  }

  return <InTextGame scenario={bluemoonScenario} />;
}
