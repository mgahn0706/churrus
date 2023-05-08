import { ClueButton } from "@/components/ClueButton";
import { ClueDetailView } from "@/components/ClueDetailView";
import { ClueType, startUpClues } from "@/fixtures/startup/clues/clues";
import { suspects } from "@/fixtures/startup/interrogations/interrogations";
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import Image from "next/image";
import LightBulbIcon from "@mui/icons-material/Lightbulb";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useState } from "react";

export default function Startup() {
  const [openedClueId, setOpenedClueId] = useState<number | null>(null);

  const openedClue: ClueType | null =
    startUpClues.find((clue) => clue.id === openedClueId) ?? null;

  return (
    <Box>
      <Image
        src="/startup-lounge.png"
        alt="스타트업 라운지 이미지"
        fill
        style={{
          zIndex: -1,
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
          <ClueButton
            key={clue.id}
            label={clue.title}
            index={clue.id}
            x={clue.x}
            y={clue.y}
            onClick={() => {
              setOpenedClueId(clue.id);
            }}
          />
        );
      })}
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction icon={<LightBulbIcon />} tooltipTitle={"단서 현황"} />
        <SpeedDialAction
          icon={<PersonSearchIcon />}
          tooltipTitle={"용의자 정보"}
        />
        <SpeedDialAction icon={<MenuBookIcon />} tooltipTitle={"규칙"} />
      </SpeedDial>
    </Box>
  );
}
