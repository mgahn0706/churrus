import InTextGame from "@/features/suspect/components/InTextGame";
import { scenarios } from "@/features/suspect/fixtures";

export default function Dure() {
  const dureScenario = scenarios.find((scenario) => scenario.id === "dure");

  if (!dureScenario) {
    throw new Error("Scenario not found");
  }
  return <InTextGame scenario={dureScenario} />;
}
