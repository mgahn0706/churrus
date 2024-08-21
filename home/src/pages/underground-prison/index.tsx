import UndergroundPrisonHeader from "@/features/underground-prison/components/UndergroundPrisonHeader";
import UndergroundPrisonPlayerSection from "@/features/underground-prison/components/UndergroundPrisonPlayerSection";
import { Player } from "@/features/underground-prison/types/player";
import usePreventUnload from "@/hooks/usePreventUnload";
import { Box } from "@mui/material";
import Head from "next/head";
import { useState } from "react";

const BACKGROUND_COLOR = "#18171C";

export default function UndergroundPrison() {
  usePreventUnload();

  const [round, setRound] = useState(0);
  const [player, setPlayer] = useState<Player[]>([
    {
      id: 1,
      name: "김철수",
      scoreHistory: [0, 0, 0, 0, 0],
      floor: 0,
    },
    {
      id: 1,
      name: "김철수",
      scoreHistory: [0, 0, 0, 0, 0],
      floor: 0,
    },
    {
      id: 1,
      name: "김철수",
      scoreHistory: [0, 0, 0, 0, 0],
      floor: 0,
    },
    {
      id: 1,
      name: "김철수",
      scoreHistory: [0, 0, 0, 0, 0],
      floor: 0,
    },
    {
      id: 1,
      name: "김철수",
      scoreHistory: [0, 0, 0, 0, 0],
      floor: 0,
    },
    {
      id: 1,
      name: "김철수",
      scoreHistory: [0, 0, 0, 0, 0],
      floor: 0,
    },
    {
      id: 1,
      name: "김철수",
      scoreHistory: [0, 0, 0, 0, 0],
      floor: 0,
    },
    {
      id: 1,
      name: "김철수",
      scoreHistory: [0, 0, 0, 0, 0],
      floor: 0,
    },
    {
      id: 1,
      name: "김철수",
      scoreHistory: [0, 0, 0, 0, 0],
      floor: 0,
    },
    {
      id: 1,
      name: "김철수",
      scoreHistory: [0, 0, 0, 0, 0],
      floor: 0,
    },
    {
      id: 1,
      name: "김철수",
      scoreHistory: [0, 0, 0, 0, 0],
      floor: 0,
    },
    {
      id: 1,
      name: "김철수",
      scoreHistory: [0, 0, 0, 0, 0],
      floor: 0,
    },
  ]);

  return (
    <>
      <Head>
        <title>지하감옥</title>
      </Head>
      <Box
        minHeight="100dvh"
        bgcolor={BACKGROUND_COLOR}
        display="flex"
        justifyContent="center"
        width="100%"
      >
        <Box width="100%" position="relative">
          <UndergroundPrisonHeader
            round={round}
            onNextRoundClick={() => setRound(round + 1)}
          />
          <UndergroundPrisonPlayerSection players={player} round={round} />
        </Box>
      </Box>
    </>
  );
}
