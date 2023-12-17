import HomeButton from "@/components/HomeButton";
import PlayerScoreSection from "@/features/hues-and-cues/components/PlayerScoreSection";
import { PlayerType } from "@/features/hues-and-cues/types";
import { Box } from "@mui/material";
import Head from "next/head";
import { useState } from "react";

export default function HuesAndCues() {
  const [phase, setPhase] = useState("PLAYER_SETTING");
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [currentCluer, setCurrentCluer] = useState(0);

  return (
    <>
      <Head>
        <title>추러스 : HUES AND CUES</title>
      </Head>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#232937",
        }}
      >
        <HomeButton color="white" />
        <PlayerScoreSection players={players} />
      </Box>
    </>
  );
}
