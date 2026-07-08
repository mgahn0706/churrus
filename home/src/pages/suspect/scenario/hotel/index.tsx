import InTextGame from "@/features/suspect/components/InTextGame";
import { scenarios } from "@/features/suspect/fixtures";
import { TextScenarioType } from "@/features/suspect/types";

export default function Hotel() {
  const hotelScenario = scenarios.find(
    (scenario): scenario is TextScenarioType =>
      scenario.id === "hotel" && scenario.gameType === "TEXT"
  );

  if (!hotelScenario) {
    throw new Error("Scenario not found");
  }

  return <InTextGame scenario={hotelScenario} />;
}
