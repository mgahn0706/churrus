import InGameLayout from "@/components/InGame/InGameLayout";
import { scenarios } from "@/fixtures";
import {
  startUpClues,
  startupAdditionalQuestions,
} from "@/fixtures/startup/clues";
import { startUpMoveButton } from "@/fixtures/startup/movePlace";
import { StartUpPrologue } from "@/fixtures/startup/prologue";
import { startUpSuspects, startUpVictim } from "@/fixtures/startup/suspects";

export default function Startup() {
  const startUpScenario = scenarios.find(
    (scenario) => scenario.keyword === "startup"
  );

  if (!startUpScenario) {
    throw new Error("Scenario not found");
  }
  return (
    <InGameLayout
      suspects={startUpSuspects}
      clues={startUpClues}
      movePlaceButton={startUpMoveButton}
      victim={startUpVictim}
      prologue={<StartUpPrologue />}
      scenario={startUpScenario}
      additionalQuestions={startupAdditionalQuestions}
    />
  );
}
