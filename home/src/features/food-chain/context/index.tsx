import { ReactNode, createContext, useContext, useState } from "react";
import usePlayerStatus from "../hooks/usePlayerStatus";
import { AnimalId, Player } from "../types";

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
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};