import InGameLayout from "@/components/InGame/InGameLayout";
import { scenarios } from "@/fixtures";
import {
  jahayeonAdditionalQuestions,
  jahayeonClues,
} from "@/fixtures/jahayeon/clues";
import { jahayeonMoveButton } from "@/fixtures/jahayeon/movePlace";
import { JahayeonPrologue } from "@/fixtures/jahayeon/prologue";
import { jahayeonSuspects, jahayeonVictim } from "@/fixtures/jahayeon/suspects";

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
