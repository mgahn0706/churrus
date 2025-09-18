import InGameLayout from "@/features/suspect/components/InGame/InGameLayout";
import { scenarios } from "@/features/suspect/fixtures";
import {
  jahayeonClues,
  jahayeonAdditionalQuestions,
} from "@/features/suspect/fixtures/jahayeon/clues";
import { jahayeonMoveButton } from "@/features/suspect/fixtures/jahayeon/movePlace";
import { JahayeonPrologue } from "@/features/suspect/fixtures/jahayeon/prologue";
import {
  jahayeonSuspects,
  jahayeonVictim,
} from "@/features/suspect/fixtures/jahayeon/suspects";

export default function Jahayeon() {
  const jahayeonScenario = scenarios.find(
    (scenario) => scenario.keyword === "jahayeon"
  );

  if (!jahayeonScenario) {
    throw new Error("Scenario not found");
  }
  return (
    <InGameLayout
      suspects={jahayeonSuspects}
      clues={jahayeonClues}
      movePlaceButton={jahayeonMoveButton}
      victim={jahayeonVictim}
      prologue={<JahayeonPrologue />}
      scenario={jahayeonScenario}
      additionalQuestions={jahayeonAdditionalQuestions}
    />
  );
}
