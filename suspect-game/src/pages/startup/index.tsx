import { ClueButton } from "@/components/ClueButton";
import { ClueDetailView } from "@/components/ClueDetailView";
import { ClueType, startUpClues } from "@/fixtures/startup/clues";
import { startUpSuspects, startUpVictim } from "@/fixtures/startup/suspects";
import {
  Box,
  Modal,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Typography,
} from "@mui/material";
import Image from "next/image";
import LightBulbIcon from "@mui/icons-material/Lightbulb";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import InfoIcon from "@mui/icons-material/Info";
import { useEffect, useState } from "react";
import { startUpMoveButton } from "@/fixtures/startup/movePlace";
import MovePlaceButton from "@/components/MovePlaceButton";
import ClueDashboardModal from "@/components/ClueDashboardModal";
import PrologueModal from "@/components/PrologueModal";
import { StartUpPrologue } from "@/fixtures/startup/prologue";
import RuleModal from "@/components/RuleModal";
import { useMobileWidth } from "@/hooks/useMobileWIdth";
import PasswordInputModal from "@/components/PasswordInputModal";
import SuspectsInfoCard from "@/components/SuspectsInfoCard";

export default function Startup() {
  const [openedClueId, setOpenedClueId] = useState<number | null>(null);
  const [currentPlace, setCurrentPlace] = useState("lounge");
  const [checkedClueList, setCheckedClueList] = useState<number[]>([]);
  const [openedModal, setOpenedModal] = useState<
    "rule" | "prologue" | "suspects" | "dashboard" | "password" | null
  >("rule");
  const [unlockingClue, setUnlockingClue] = useState<ClueType | null>(null);
  const [isImageLoading, setImageLoading] = useState(false);

  const handleCloseModal = () => {
    setOpenedModal(null);
  };

  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = ""; // Chrome에서 동작하도록;
  };

  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();

    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);

  const openedClue: ClueType | null =
    startUpClues.find((clue) => clue.id === openedClueId) ?? null;
  const { isMobileWidth } = useMobileWidth();
  if (isMobileWidth) {
    return (
      <Box>
        <Modal
          open
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 300,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              이용 안내
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              화면 크기가 작아 게임을 진행할 수 없습니다. 더 큰 화면의 PC에서
              진행하시길 권장합니다.
            </Typography>
          </Box>
        </Modal>
      </Box>
    );
  }

  return (
    <Box>
      <Image
        loading={isImageLoading}
        onLoadingComplete={()=>setImageLoading(false)}
        onLoadStart={()=>setImageLoading(true)}
        src={`/image/map/startup-${currentPlace}.png`}
        alt="스타트업 맵 이미지"
        fill
        style={{
          zIndex: -1,
        }}
        onClick={() => {
          document.onclick = (e) => {
            navigator.clipboard.writeText(
              `x: ${((100 * e.pageX) / screen.availWidth).toFixed(3)}, y: ${(
                (100 * e.pageY) /
                screen.availHeight
              ).toFixed(3)},`
            );
          };
        }}
      />

      {openedClue !== null && (
        <ClueDetailView
          suspects={startUpSuspects}
          clueData={openedClue}
          id={openedClueId}
          onClose={() => {
            setOpenedClueId(null);
            handleCloseModal;
          }}
        />
      )}
      {startUpClues.map((clue) => {
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

      {startUpMoveButton.map((button) => {
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
        isOpen={openedModal === "dashboard"}
        checkedClueList={checkedClueList}
        onClose={handleCloseModal}
      />
      <SuspectsInfoCard
        isAllClueSearched={checkedClueList.length === startUpClues.length}
        isOpen={openedModal === "suspects"}
        victim={startUpVictim}
        suspects={startUpSuspects}
        onClose={handleCloseModal}
      />
      <PrologueModal
        prolougeContent={<StartUpPrologue />}
        isOpen={openedModal === "prologue"}
        onClose={handleCloseModal}
      />
      <RuleModal isOpen={openedModal === "rule"} onClose={handleCloseModal} />
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
        <SpeedDialAction
          icon={<MenuBookIcon />}
          tooltipTitle={"규칙"}
          onClick={() => setOpenedModal("rule")}
        />
      </SpeedDial>
    </Box>
  );
}
