import InGameLayout from "@/components/InGame/InGameLayout";
import { scenarios } from "@/fixtures";
import { startUpClues } from "@/fixtures/startup/clues";
import { startUpMoveButton } from "@/fixtures/startup/movePlace";
import { StartUpPrologue } from "@/fixtures/startup/prologue";
import { startUpSuspects, startUpVictim } from "@/fixtures/startup/suspects";

export default function Startup() {
  return (
    <InGameLayout
      suspects={startUpSuspects}
      clues={startUpClues}
      movePlaceButton={startUpMoveButton}
      victim={startUpVictim}
      prologue={<StartUpPrologue />}
      scenarioKeyword={"startUp"}
    />
  );
}
