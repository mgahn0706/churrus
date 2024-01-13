import HomeButton from "@/components/HomeButton";
import ColorSelectSection from "@/features/hues-and-cues/components/ColorSelectSection";
import GameProgressSection from "@/features/hues-and-cues/components/GameProgressSection";
import PlayerAddForm from "@/features/hues-and-cues/components/PlayerAddForm";
import PlayerScoreSection from "@/features/hues-and-cues/components/PlayerScoreSection";
import { PlayerType } from "@/features/hues-and-cues/types";
import { Box } from "@mui/material";
import Head from "next/head";
import { useState } from "react";

const RECOMMENDED_PLAYER_COUNT = 10;

export default function HuesAndCues() {
  const [phase, setPhase] = useState("PLAYER_SETTING");
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [currentOrder, setCurrentOrder] = useState(0);
  const [answerColor, setAnswerColor] = useState<string | null>(null);

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
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <GameProgressSection
            currentCluerName={
              players.length > 0 ? players[currentOrder].name : ""
            }
            onGameStart={() => {}}
          />

          <PlayerScoreSection currentOrder={currentOrder} players={players} />
          <PlayerAddForm
            isExceededRecommendedPlayerCount={
              players.length >= RECOMMENDED_PLAYER_COUNT
            }
            onAddPlayer={(name) => {
              setPlayers([
                ...players,
                {
                  id: players.length,
                  name,
                  score: 0,
                  selectedColors: [],
                },
              ]);
            }}
          />
        </Box>
      </Box>
    </>
  );
}
