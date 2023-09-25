import InGameLayout from "@/features/suspect/components/InGame/InGameLayout";
import { scenarios } from "@/features/suspect/fixtures";
import {
  schoolAdditionalQuestions,
  schoolClues,
} from "@/features/suspect/fixtures/school/clues";
import { schoolMoveButton } from "@/features/suspect/fixtures/school/movePlace";
import { SchoolPrologue } from "@/features/suspect/fixtures/school/prologue";
import {
  schoolSuspects,
  schoolVictim,
} from "@/features/suspect/fixtures/school/suspects";

export default function School() {
  const schoolScenario = scenarios.find(
    (scenario) => scenario.keyword === "school"
  );

  if (!schoolScenario) {
    throw new Error("Scenario not found");
  }
  return (
    <InGameLayout
      suspects={schoolSuspects}
      clues={schoolClues}
      movePlaceButton={schoolMoveButton}
      victim={schoolVictim}
      prologue={<SchoolPrologue />}
      scenario={schoolScenario}
      additionalQuestions={schoolAdditionalQuestions}
    />
  );
}
