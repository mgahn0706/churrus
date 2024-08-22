import Floor from "@/features/underground-prison/components/Floor";
import UndergroundPrisonHeader from "@/features/underground-prison/components/UndergroundPrisonHeader";
import UndergroundPrisonPlayerSection from "@/features/underground-prison/components/UndergroundPrisonPlayerSection";
import { Player } from "@/features/underground-prison/types/player";
import usePreventUnload from "@/hooks/usePreventUnload";
import { Box } from "@mui/material";
import Head from "next/head";
import { useMemo, useState } from "react";

const BACKGROUND_COLOR = "#18171C";

const minimumVisibleFloors = 10;

export default function UndergroundPrison() {
  usePreventUnload();

  const [round, setRound] = useState(0);
  const [player, setPlayer] = useState<Player[]>([
    {
      id: 2,
      name: "이영희",
      scoreHistory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      floor: 40,
    },

    {
      id: 1,
      name: "김철수",
      scoreHistory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      floor: 40,
    },
    {
      id: 2,
      name: "이영희",
      scoreHistory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      floor: 40,
    },
    {
      id: 1,
      name: "김철수",
      scoreHistory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      floor: 40,
    },
    {
      id: 2,
      name: "이영희",
      scoreHistory: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      floor: 40,
    },
  ]);

  const visibleFloors = useMemo(() => {
    const { deepestFloor, shallowestFloor } = player.reduce(
      (acc, cur) => {
        return {
          deepestFloor: Math.max(acc.deepestFloor, cur.floor),
          shallowestFloor: Math.min(acc.shallowestFloor, cur.floor),
        };
      },
      { deepestFloor: 0, shallowestFloor: 40 }
    );

    console.log(deepestFloor, shallowestFloor);

    if (deepestFloor - shallowestFloor < minimumVisibleFloors) {
      return Array(minimumVisibleFloors)
        .fill(0)
        .map((_, index) => deepestFloor - minimumVisibleFloors + index + 1);
    }
    return Array(deepestFloor - shallowestFloor + 2)
      .fill(0)
      .map((_, index) => shallowestFloor + index);
  }, [player]);

  console.log(visibleFloors);

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
          <Box
            display="flex"
            flexDirection="column"
            overflow="scroll"
            height="calc(100vh - 120px)"
          >
            {visibleFloors.map((floor) => (
              <Floor key={floor} floor={floor} players={player} />
            ))}
          </Box>

          <UndergroundPrisonPlayerSection players={player} round={round} />
        </Box>
      </Box>
    </>
  );
}
