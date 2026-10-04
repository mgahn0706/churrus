import InTextGame from "@/components/InTextGame";
import { scenarios } from "@/fixtures";
import { TextScenarioType } from "@/types";

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
