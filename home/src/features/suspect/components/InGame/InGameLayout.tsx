import { Box, Button, Grow, IconButton, Paper, Tooltip } from "@mui/material";
import Image from "next/image";
import LightBulbIcon from "@mui/icons-material/Lightbulb";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import InfoIcon from "@mui/icons-material/Info";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";

import {
  AdditionalQuestionType,
  ClueType,
  MovePlaceButtonType,
  ScenarioType,
  SuspectType,
  VictimType,
} from "@/features/suspect/types";
import MemoModal from "./MemoModal";
import { useMobileWidth } from "@/hooks/useMobileWIdth";
import MobileWidthAlertModal from "../MobileWidthAlertModal";
import { ClueDetailView } from "./ClueDetailView";
import { ClueButton } from "./ClueButton";
import ClueDashboardModal from "./ClueDashboardModal";
import MovePlaceButton from "./MovePlaceButton";
import PasswordInputModal from "./PasswordInputModal";
import PrologueModal from "./PrologueModal";
import SuspectsInfoCard from "./SuspectsInfoCard";
import usePreventUnload from "@/hooks/usePreventUnload";
import Head from "next/head";

interface InGameLayoutProps {
  clues: ClueType[];
  prologue: React.ReactNode;
  suspects: SuspectType[];
  victims: VictimType[];
  movePlaceButton: MovePlaceButtonType[];
  scenario: ScenarioType;
  additionalQuestions: AdditionalQuestionType[];
}

export default function InGameLayout({
  clues,
  prologue,
  suspects,
  victims,
  movePlaceButton,
  scenario,
  additionalQuestions,
}: InGameLayoutProps) {
  const [openedClueId, setOpenedClueId] = useState<number | null>(null);
  const [currentPlace, setCurrentPlace] = useState(scenario.places[0] ?? "");
  const [checkedClueList, setCheckedClueList] = useState<number[]>([]);
  const [openedModal, setOpenedModal] = useState<
    "prologue" | "suspects" | "dashboard" | "password" | "memo" | null
  >("prologue");
  const [unlockingClue, setUnlockingClue] = useState<ClueType | null>(null);
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false);

  const handleCloseModal = () => {
    setOpenedModal(null);
  };

  useEffect(() => {
    setCurrentPlace(scenario.places[0] ?? "");
  }, [scenario.id]);

  usePreventUnload();

  const openedClue: ClueType | null =
    clues.find((clue) => clue.id === openedClueId) ?? null;

  const markClueAsChecked = (clueId: number) => {
    setCheckedClueList((prev) => {
      if (prev.includes(clueId)) {
        return prev;
      }
      return [...prev, clueId];
    });
  };

  const handleMapClick = (
    event: React.MouseEvent<HTMLImageElement | HTMLDivElement>
  ) => {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    const x = ((100 * event.pageX) / window.innerWidth).toFixed(3);
    const y = ((100 * event.pageY) / window.innerHeight).toFixed(3);
    navigator.clipboard?.writeText(`x: ${x}, y: ${y},`);
  };

  const visibleClues = clues.filter((clue) => {
    return (
      clue.place === currentPlace ||
      (clue.place === openedClueId && clue.type === "additional")
    );
  });

  const { isMobileWidth } = useMobileWidth();
  if (isMobileWidth) {
    return <MobileWidthAlertModal open />;
  }

  return (
    <>
      <Head>
        <title>{`협동 크라임씬: ${scenario.title}`}</title>
      </Head>
      <Box>
        <Image
          priority
          src={`/image/suspect/scenario/${scenario.id}/map/${scenario.id}-${currentPlace}.png`}
          alt="맵 이미지"
          fill
          style={{
            zIndex: -1,
          }}
          onClick={handleMapClick}
        />

        {openedModal === "memo" && (
          <MemoModal
            scenarioKeyword={scenario.id}
            isOpen={openedModal === "memo"}
            onClose={() => setOpenedModal(null)}
            suspects={suspects}
            questions={additionalQuestions}
            isAllClueSearched={checkedClueList.length === clues.length}
          />
        )}

        {openedClue !== null && (
          <ClueDetailView
            clueData={openedClue}
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
        {visibleClues.map((clue) => {
          return (
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
                markClueAsChecked(clue.id);
              }}
            />
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
            if (unlockingClue?.id) {
              markClueAsChecked(unlockingClue.id);
            }
            setUnlockingClue(null);
          }}
        />

        {movePlaceButton.map((button) => {
          return (
            button.from === currentPlace && (
              <MovePlaceButton
                key={`${button.from}-${button.to}`}
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
          victims={victims}
          suspects={suspects}
          onClose={handleCloseModal}
        />
        <PrologueModal
          prolougeContent={prologue}
          isOpen={openedModal === "prologue"}
          onClose={handleCloseModal}
          onClickSuspects={() => setOpenedModal("suspects")}
        />
        <Box
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            zIndex: 1000,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={isQuickMenuOpen ? <MenuOpenIcon /> : <MenuIcon />}
            onClick={() => setIsQuickMenuOpen((prev) => !prev)}
            sx={{
              minWidth: 92,
              borderRadius: 2,
              textTransform: "none",
              boxShadow: 2,
            }}
          >
            도구
          </Button>

          <Grow in={isQuickMenuOpen} timeout={180} unmountOnExit>
            <Paper
              elevation={3}
              sx={{
                position: "absolute",
                top: 44,
                right: 0,
                p: 0.6,
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
                gap: 0.4,
                backgroundColor: "rgba(255,255,255,0.82)",
                backdropFilter: "blur(6px)",
              }}
            >
              <Tooltip title="추리 노트" placement="left">
                <IconButton
                  color="primary"
                  onClick={() => setOpenedModal("memo")}
                  size="small"
                >
                  <LibraryBooksIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="단서 현황" placement="left">
                <IconButton
                  color="primary"
                  onClick={() => setOpenedModal("dashboard")}
                  size="small"
                >
                  <LightBulbIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="용의자/피해자 정보" placement="left">
                <IconButton
                  color="primary"
                  onClick={() => setOpenedModal("suspects")}
                  size="small"
                >
                  <PersonSearchIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="공개된 정보" placement="left">
                <IconButton
                  color="primary"
                  onClick={() => setOpenedModal("prologue")}
                  size="small"
                >
                  <InfoIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Paper>
          </Grow>
        </Box>
      </Box>
    </>
  );
}
