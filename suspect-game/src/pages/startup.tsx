import { ClueButton } from "@/components/ClueButton";
import { ClueDetailView } from "@/components/ClueDetailView";
import { ClueType, startUpClues } from "@/fixtures/startup/clues";
import { suspects } from "@/fixtures/startup/interrogations";
import {
  Box,
  Button,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import LightBulbIcon from "@mui/icons-material/Lightbulb";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useState } from "react";
import { startUpMoveButton } from "@/fixtures/startup/movePlace";
import MovePlaceButton from "@/components/MovePlaceButton";
import Modal from "react-modal";
import ClueDashboardModal from "@/components/ClueDashboardModal";

type PlaceType = "lounge" | "office" | "house" | "suspects";

export default function Startup() {
  const [openedClueId, setOpenedClueId] = useState<number | null>(null);
  const [currentPlace, setCurrentPlace] = useState("lounge");
  const [checkedClueList, setCheckedClueList] = useState<number[]>([]);
  const [isClueDashboardOpen, setIsClueDashboardOpen] = useState(false);

  const openedClue: ClueType | null =
    startUpClues.find((clue) => clue.id === openedClueId) ?? null;

  return (
    <Box>
      <Image
        src={`/mapImage/startup-${currentPlace}.png`}
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
          suspects={suspects}
          clueData={openedClue}
          id={openedClueId}
          onClose={() => {
            setOpenedClueId(null);
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
                setOpenedClueId(clue.id);
                if (!checkedClueList.includes(clue.id)) {
                  setCheckedClueList([...checkedClueList, clue.id]);
                }
              }}
            />
          )
        );
      })}

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
        isOpen={isClueDashboardOpen}
        checkedClueList={checkedClueList}
        onClose={() => setIsClueDashboardOpen(false)}
      />
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 18, right: 18 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          icon={<LightBulbIcon />}
          tooltipTitle={"단서 현황"}
          onClick={() => setIsClueDashboardOpen(true)}
        />
        <SpeedDialAction
          icon={<PersonSearchIcon />}
          tooltipTitle={"용의자 정보"}
        />
        <SpeedDialAction icon={<MenuBookIcon />} tooltipTitle={"규칙"} />
      </SpeedDial>
    </Box>
  );
}
