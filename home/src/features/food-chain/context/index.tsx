import { ReactNode, createContext, useContext, useState } from "react";
import usePlayerStatus from "../hooks/usePlayerStatus";
import { AnimalId, BiomeId, Player } from "../types";

interface PlayerContextValue {
  playerStatus: Player[];
  addPlayer: (name: string) => void;
  deletePlayer: (id: number) => void;
  submitSelectedAnimals: (animals: AnimalId[]) => void;
  predictWinner: ({
    playerId,
    animalId,
  }: {
    playerId: number;
    animalId: AnimalId;
  }) => void;
  camouflage: ({
    playerId,
    animalId,
  }: {
    playerId: number;
    animalId: AnimalId;
  }) => void;
  moveBiome: ({
    playerId,
    biomeId,
    round,
  }: {
    playerId: number;
    biomeId: BiomeId | null;
    round: number;
  }) => void;
  killPlayer: (id: number) => void;
  eatPlayer: (predatorId: number, preyId: number, round: number) => void;
  resetPlayers: () => void;
  setVictory: (playerId: number, result: "WIN" | "LOSE") => void;
}
const PlayerContext = createContext({} as PlayerContextValue);

export default function useFoodChainPlayerContext() {
  const usePlayerContext = () => {
    const context = useContext<PlayerContextValue>(PlayerContext);
    if (context === undefined) {
      throw new Error("usePlayerContext must be used within a PlayerContext");
    }
    return context;
  };

  return usePlayerContext();
}

export const PlayerContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const {
    playerStatus,
    addPlayer,
    deletePlayer,
    randomizePlayerRole,
    predictWinner,
    camouflage,
    moveBiome,
    killPlayer,
    eatPlayer,
    setVictory,
    resetPlayers,
  } = usePlayerStatus();

  const submitSelectedAnimals = (animals: AnimalId[]) => {
    randomizePlayerRole(animals);
  };

  return (
    <PlayerContext.Provider
      value={{
        playerStatus,
        addPlayer,
        deletePlayer,
        submitSelectedAnimals,
        predictWinner,
        camouflage,
        moveBiome,
        killPlayer,
        eatPlayer,
        setVictory,
        resetPlayers,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
