import Floor from "@/features/underground-prison/components/Floor";
import { PlayerInput } from "@/features/underground-prison/components/PlayerInput";
import UndergroundPrisonHeader from "@/features/underground-prison/components/UndergroundPrisonHeader";
import UndergroundPrisonPlayerSection from "@/features/underground-prison/components/UndergroundPrisonPlayerSection";
import { Player } from "@/features/underground-prison/types/player";
import usePreventUnload from "@/hooks/usePreventUnload";
import { ThemeProvider } from "@emotion/react";
import { Box } from "@mui/material";
import Head from "next/head";
import { useMemo, useState } from "react";

const BACKGROUND_COLOR = "#18171C";

const minimumVisibleFloors = 11;

export default function UndergroundPrison() {
  usePreventUnload();

  const [round, setRound] = useState(0);
  const [player, setPlayer] = useState<Player[]>([]);

  console.log(player);

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

    if (deepestFloor - shallowestFloor < minimumVisibleFloors) {
      return Array(minimumVisibleFloors)
        .fill(0)
        .map((_, index) => deepestFloor - minimumVisibleFloors + index + 1);
    }
    return Array(deepestFloor - shallowestFloor + 2)
      .fill(0)
      .map((_, index) => shallowestFloor + index);
  }, [player]);

  return (
    <ThemeProvider theme={{}}>
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
            players={player}
            onCardSubmit={() => {}}
            round={round}
            onNextRoundClick={() => setRound(round + 1)}
          />
          {round === 0 ? (
            <Box
              display="flex"
              justifyContent="center"
              mt={4}
              alignItems="center"
              height="calc(100vh - 120px)"
            >
              <PlayerInput
                onAddPlayer={(playerName) =>
                  setPlayer([
                    ...player,
                    {
                      id: player.length + 1,
                      name: playerName,
                      scoreHistory: [],
                      floor: 40,
                    },
                  ])
                }
              />
            </Box>
          ) : (
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
          )}

          <UndergroundPrisonPlayerSection players={player} round={round} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
