import HomeButton from "@/components/HomeButton";
import AnswerColorCard from "@/features/hues-and-cues/components/AnswerColorCard";
import ClueForm from "@/features/hues-and-cues/components/ClueForm";
import ColorForm from "@/features/hues-and-cues/components/ColorForm";
import ColorSelectSection from "@/features/hues-and-cues/components/ColorSelectSection";
import GameProgressSection from "@/features/hues-and-cues/components/GameProgressSection";
import NextRoundButton from "@/features/hues-and-cues/components/NextRoundButton";
import PlayerAddForm from "@/features/hues-and-cues/components/PlayerAddForm";
import PlayerScoreSection from "@/features/hues-and-cues/components/PlayerScoreSection";
import { NEXT_PHASE } from "@/features/hues-and-cues/fixtures";
import { getScore } from "@/features/hues-and-cues/libs";
import { GamePhaseType, PlayerType } from "@/features/hues-and-cues/types";
import { Box, Slide, ThemeProvider, createTheme } from "@mui/material";
import Head from "next/head";
import { useState } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const RECOMMENDED_PLAYER_COUNT = 10;

export default function HuesAndCues() {
  const [phase, setPhase] = useState<GamePhaseType>("PLAYER_SETTING");
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [currentOrder, setCurrentOrder] = useState(0);
  const [answerColor, setAnswerColor] = useState<[number, number]>([
    Math.floor(Math.random() * 16),
    Math.floor(Math.random() * 30),
  ]);
  const [hints, setHints] = useState<[string, string]>(["", ""]);
  const [selectedColor, setSelectedColor] = useState<[number, number] | null>(
    null
  );
  const [currentGuessingPlayer, setCurrentGuessingPlayer] = useState<
    number | null
  >(null);

  const handleNextRound = () => {
    const playerCountWithinFrame = players.reduce((acc, cur) => {
      const withinFrameCount = cur.selectedColors.filter(
        (color) => getScore(color, answerColor) > 1
      ).length;
      return acc + withinFrameCount;
    }, 0);
    setPlayers(
      players.map((player, idx) => ({
        ...player,
        score:
          idx === currentOrder
            ? player.score + playerCountWithinFrame * 2
            : player.score +
              player.selectedColors.reduce((acc, cur) => {
                return acc + getScore(cur, answerColor);
              }, 0),
        selectedColors: [],
      }))
    );
    setPhase("FIRST_CLUE");
    setCurrentOrder((currentOrder + 1) % players.length);
    setAnswerColor([
      Math.floor(Math.random() * 16),
      Math.floor(Math.random() * 30),
    ]);
    setHints(["", ""]);
    setSelectedColor(null);
    setCurrentGuessingPlayer(null);
  };

  return (
    <>
      <Head>
        <title>추러스 : HUES AND CUES</title>
      </Head>
      <ThemeProvider theme={darkTheme}>
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
          {(phase === "FIRST_CLUE" || phase === "SECOND_CLUE") && (
            <AnswerColorCard color={answerColor} />
          )}

          <ColorSelectSection
            onSelect={(color) => {
              setSelectedColor(color);
            }}
          />
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            <GameProgressSection
              answerColor={answerColor}
              hints={hints}
              disabled={phase === "PLAYER_SETTING" && players.length < 2}
              phase={phase}
              playerName={
                phase === "FIRST_CLUE" || phase === "SECOND_CLUE"
                  ? players[currentOrder].name
                  : players[currentGuessingPlayer ?? 0]?.name
              }
              onNextPhase={() => {
                setPhase(NEXT_PHASE[phase]);
              }}
            />

            <PlayerScoreSection
              currentGuessingPlayer={currentGuessingPlayer}
              currentOrder={currentOrder}
              players={players}
              showResult={phase === "RESULT"}
              answerColor={answerColor}
            />

            {phase === "PLAYER_SETTING" && (
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
            )}
            {phase === "FIRST_CLUE" && (
              <ClueForm
                clueWordCount={1}
                onSubmit={(clue) => {
                  setCurrentGuessingPlayer(currentOrder === 0 ? 1 : 0);
                  setHints([clue, ""]);
                  setPhase("FIRST_GUESS");
                }}
              />
            )}
            {["FIRST_GUESS", "SECOND_GUESS"].includes(phase) && (
              <ColorForm
                disabled={!selectedColor}
                onClick={() => {
                  if (!selectedColor) {
                    return;
                  }
                  setPlayers(
                    players.map((player, idx) => {
                      if (idx === currentGuessingPlayer) {
                        return {
                          ...player,
                          selectedColors: [
                            ...player.selectedColors,
                            selectedColor,
                          ],
                        };
                      }
                      return player;
                    })
                  );
                  if (currentGuessingPlayer === null) {
                    return;
                  }
                  const nextGuesser =
                    currentGuessingPlayer + 1 === currentOrder
                      ? currentGuessingPlayer + 2
                      : currentGuessingPlayer + 1;
                  if (nextGuesser >= players.length) {
                    setCurrentGuessingPlayer(null);
                    setPhase(NEXT_PHASE[phase]);
                  }
                  setCurrentGuessingPlayer(nextGuesser);
                }}
              />
            )}
            {phase === "SECOND_CLUE" && (
              <ClueForm
                clueWordCount={2}
                onSubmit={(clue) => {
                  setCurrentGuessingPlayer(currentOrder === 0 ? 1 : 0);
                  setHints([hints[0], clue]);
                  setPhase("SECOND_GUESS");
                }}
              />
            )}
            {phase === "RESULT" && (
              <NextRoundButton onClick={handleNextRound} />
            )}
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
