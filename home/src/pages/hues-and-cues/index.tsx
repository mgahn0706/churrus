import HomeButton from "@/components/HomeButton";
import ColorSelectSection from "@/features/hues-and-cues/components/ColorSelectSection";
import PlayerScoreSection from "@/features/hues-and-cues/components/PlayerScoreSection";
import { PlayerType } from "@/features/hues-and-cues/types";
import { Box } from "@mui/material";
import Head from "next/head";
import { useState } from "react";

export default function HuesAndCues() {
  const [phase, setPhase] = useState("PLAYER_SETTING");
  const [currentCluerId, setCurrentCluerId] = useState(0);

  return (
    <>
      <Head>
        <title>추러스 : HUES AND CUES</title>
      </Head>
      <Box
        sx={{
          height: "100vh",
          px: 8,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#121212",
        }}
      >
        <HomeButton color="white" />
        <ColorSelectSection onSelect={() => {}} />
        <PlayerScoreSection currentCluerId={currentCluerId} />
      </Box>
    </>
  );
}
