import { createDefaultHand } from "@/features/middle-race/lib/utils";
import { MiddleRaceGame, RacePlayerState } from "@/features/middle-race/types";
import { useMemo, useState } from "react";

const DUMMY_PLAYERS: RacePlayerState[] = [
  {
    name: "민지",
    draftOrder: 1,
    characterId: "gravity",
    position: 3,
    hand: createDefaultHand("gravity"),
    discard: [2],
    finishedRank: null,
    quickForwardUsed: 0,
  },
  {
    name: "서준",
    draftOrder: 2,
    characterId: "quick",
    position: 11,
    hand: [2, 4],
    discard: [1, 3],
    finishedRank: null,
    quickForwardUsed: 1,
  },
  {
    name: "하린",
    draftOrder: 3,
    characterId: "union",
    position: 17,
    hand: [1, 4],
    discard: [2, 3],
    finishedRank: null,
    quickForwardUsed: 0,
  },
  {
    name: "도윤",
    draftOrder: 4,
    characterId: "silence",
    position: 24,
    hand: [1, 2, 4],
    discard: [3],
    finishedRank: null,
    quickForwardUsed: 0,
  },
];

export const useMiddleRaceGame = (): MiddleRaceGame => {
  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const [selectedPlayerName, setSelectedPlayerName] = useState(
    DUMMY_PLAYERS[0]?.name ?? ""
  );
  const [selectedCard, setSelectedCard] = useState<number | null>(
    DUMMY_PLAYERS[0]?.hand[0] ?? null
  );

  const players = useMemo(() => DUMMY_PLAYERS, []);
  const selectedPlayer =
    players.find((player) => player.name === selectedPlayerName) ?? players[0];

  return {
    phase,
    lap: 3,
    finishLine: 30,
    currentPlayerName: "서준",
    selectedPlayerName: selectedPlayer?.name ?? "",
    selectedCard,
    silencedPlayerName: "하린",
    players,
    selectPlayer: (playerName) => {
      const nextPlayer =
        players.find((player) => player.name === playerName) ?? players[0];
      setSelectedPlayerName(nextPlayer?.name ?? "");
      setSelectedCard(nextPlayer?.hand[0] ?? null);
    },
    selectCard: (card) => {
      setSelectedCard(card);
    },
    clearSelectedCard: () => {
      setSelectedCard(null);
    },
    cyclePhase: () => {
      setPhase((prev) => ((prev % 3) + 1) as 1 | 2 | 3);
    },
  };
};
