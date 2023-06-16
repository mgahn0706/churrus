import { ClueButton } from "@/components/InGame/ClueButton";
import { ClueDetailView } from "@/components/InGame/ClueDetailView";
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import Image from "next/image";
import LightBulbIcon from "@mui/icons-material/Lightbulb";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import InfoIcon from "@mui/icons-material/Info";
import { useEffect, useState } from "react";
import MovePlaceButton from "@/components/InGame/MovePlaceButton";
import ClueDashboardModal from "@/components/InGame/ClueDashboardModal";
import PrologueModal from "@/components/InGame/PrologueModal";
import { useMobileWidth } from "@/hooks/useMobileWIdth";
import PasswordInputModal from "@/components/InGame/PasswordInputModal";
import SuspectsInfoCard from "@/components/InGame/SuspectsInfoCard";
import MobileWidthAlertModal from "@/components/MobileWidthAlertModal";
import {
  AdditionalQuestionType,
  ClueType,
  MovePlaceButtonType,
  ScenarioType,
  SuspectType,
  VictimType,
} from "@/types";
import MemoButton from "./MemoButton";
import MemoModal from "./MemoModal";

interface InGameLayoutProps {
  clues: ClueType[];
  prologue: React.ReactNode;
  suspects: SuspectType[];
  victim: VictimType;
  movePlaceButton: MovePlaceButtonType[];
  scenario: ScenarioType;
  additionalQuestions: AdditionalQuestionType[];
}

export default function InGameLayout({
  clues,
  prologue,
  suspects,
  victim,
  movePlaceButton,
  scenario,
  additionalQuestions,
}: InGameLayoutProps) {
  const [openedClueId, setOpenedClueId] = useState<number | null>(null);
  const [currentPlace, setCurrentPlace] = useState("");
  const [checkedClueList, setCheckedClueList] = useState<number[]>([]);
  const [openedModal, setOpenedModal] = useState<
    "prologue" | "suspects" | "dashboard" | "password" | "memo" | null
  >("prologue");
  const [unlockingClue, setUnlockingClue] = useState<ClueType | null>(null);

  const handleCloseModal = () => {
    setOpenedModal(null);
  };

  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = ""; // Chrome에서 동작하도록;
  };

  useEffect(() => {
    if (!currentPlace) {
      setCurrentPlace(scenario.places[0]);
    }
  }, [scenario]);

  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();

    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);

  const openedClue: ClueType | null =
    clues.find((clue) => clue.id === openedClueId) ?? null;

  const { isMobileWidth } = useMobileWidth();
  if (isMobileWidth) {
    return <MobileWidthAlertModal />;
  }

  return (
    <Box>
      {scenario && (
        <Image
          priority
          src={`/image/map/${scenario.keyword}-${currentPlace}.png`}
          alt="맵 이미지"
          fill
          style={{
            zIndex: -1,
          }}
          onClick={() => {
            if (
              !process.env.NODE_ENV ||
              process.env.NODE_ENV === "development"
            ) {
              document.onclick = (e) => {
                navigator.clipboard.writeText(
                  `x: ${((100 * e.pageX) / screen.availWidth).toFixed(
                    3
                  )}, y: ${((100 * e.pageY) / screen.availHeight).toFixed(3)},`
                );
              };
            }
          }}
        />
      )}

      <MemoButton onClick={() => setOpenedModal("memo")} />
      {openedModal === "memo" && (
        <MemoModal
          scenarioKeyword={scenario.keyword}
          isOpen={openedModal === "memo"}
          onClose={() => setOpenedModal(null)}
          suspects={suspects}
          questions={additionalQuestions}
          isAllClueSearched={checkedClueList.length === clues.length}
        />
      )}

      {openedClue !== null && (
        <ClueDetailView
          scenarioKeyword={scenario.keyword}
          suspects={suspects}
          clueData={openedClue}
          id={openedClueId}
          onClose={() => {
            if (
              openedClue.type === "additional" &&
              typeof openedClue.place !== "string"
            ) {
              setOpenedClueId(openedClue.place);
              return;
            }
            setOpenedClueId(null);
          }}
        />
      )}
      {clues.map((clue) => {
        return (
          (clue.place === currentPlace ||
            (clue.place === openedClueId && clue.type === "additional")) && (
            <ClueButton
              key={clue.id}
              clue={clue}
              onClick={() => {
                if (clue.type === "locked") {
                  setOpenedModal("password");
                  setUnlockingClue(clue);
                  return;
                }

                setOpenedClueId(clue.id);
                if (!checkedClueList.includes(clue.id)) {
                  setCheckedClueList([...checkedClueList, clue.id]);
                }
              }}
            />
          )
        );
      })}

      <PasswordInputModal
        targetClue={unlockingClue}
        isOpen={openedModal === "password"}
        onClose={() => {
          handleCloseModal();
          setUnlockingClue(null);
        }}
        onSuccess={() => {
          setOpenedClueId(unlockingClue?.id ?? null);
          if (!checkedClueList.includes(unlockingClue?.id ?? -1)) {
            setCheckedClueList([...checkedClueList, unlockingClue?.id ?? -1]);
          }
          setUnlockingClue(null);
        }}
      />

      {movePlaceButton.map((button) => {
        return (
          button.from === currentPlace && (
            <MovePlaceButton
              key={`${button.from}-${button.to}}`}
              direction={button.direction}
              x={button.x}
              y={button.y}
              onClick={() => {
                setCurrentPlace(button.to);
              }}
            />
          )
        );
      })}
      <ClueDashboardModal
        clues={clues}
        isOpen={openedModal === "dashboard"}
        checkedClueList={checkedClueList}
        onClose={handleCloseModal}
      />
      <SuspectsInfoCard
        isOpen={openedModal === "suspects"}
        victim={victim}
        suspects={suspects}
        onClose={handleCloseModal}
      />
      <PrologueModal
        prolougeContent={prologue}
        isOpen={openedModal === "prologue"}
        onClose={handleCloseModal}
        onClickSuspects={() => setOpenedModal("suspects")}
      />
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 18, right: 18 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          icon={<LightBulbIcon />}
          tooltipTitle={"단서 현황"}
          onClick={() => setOpenedModal("dashboard")}
        />
        <SpeedDialAction
          icon={<PersonSearchIcon />}
          tooltipTitle={"용의자/피해자 정보"}
          onClick={() => setOpenedModal("suspects")}
        />
        <SpeedDialAction
          icon={<InfoIcon />}
          tooltipTitle={"공개된 정보"}
          onClick={() => setOpenedModal("prologue")}
        />
      </SpeedDial>
    </Box>
  );
}
