import Floor from "@/features/underground-prison/components/Floor";
import { PlayerInput } from "@/features/underground-prison/components/PlayerInput";
import Result from "@/features/underground-prison/components/Result";
import UndergroundPrisonHeader from "@/features/underground-prison/components/UndergroundPrisonHeader";
import UndergroundPrisonPlayerSection from "@/features/underground-prison/components/UndergroundPrisonPlayerSection";
import useUndergroundPrisonScore from "@/features/underground-prison/hooks";
import usePreventUnload from "@/hooks/usePreventUnload";
import { ThemeProvider } from "@emotion/react";
import { Box } from "@mui/material";
import Head from "next/head";

const BACKGROUND_COLOR = "#18171C";

export default function UndergroundPrison() {
  usePreventUnload();

  const {
    hasGameEnded,
    round,
    players,
    visibleFloors,
    addPlayer,
    startGame,
    submitCards,
  } = useUndergroundPrisonScore();

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
            round={round}
            hasGameEnded={hasGameEnded}
            players={players}
            onGameStart={startGame}
            onCardSubmit={submitCards}
          />
          {hasGameEnded && (
            <Box
              display="flex"
              justifyContent="center"
              mt={4}
              alignItems="center"
              height="calc(100vh - 120px)"
            >
              <Result players={players} />
            </Box>
          )}
          {!hasGameEnded &&
            (round === 0 ? (
              <Box
                display="flex"
                justifyContent="center"
                mt={4}
                alignItems="center"
                height="calc(100vh - 120px)"
              >
                <PlayerInput onAddPlayer={addPlayer} />
              </Box>
            ) : (
              <Box
                display="flex"
                flexDirection="column"
                overflow="scroll"
                height="calc(100vh - 120px)"
                my="52px"
              >
                {visibleFloors.map((floor) => (
                  <Floor key={floor} floor={floor} players={players} />
                ))}
              </Box>
            ))}

          <UndergroundPrisonPlayerSection players={players} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
