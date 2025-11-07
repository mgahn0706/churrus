import InTextGame from "@/features/suspect/components/InTextGame";
import { scenarios } from "@/features/suspect/fixtures";

export default function School() {
  const schoolScenario = scenarios.find((scenario) => scenario.id === "school");

  if (!schoolScenario) {
    throw new Error("Scenario not found");
  }
  return <InTextGame scenario={schoolScenario} />;
}
