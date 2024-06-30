import { ReactNode, createContext, useContext, useState } from "react";
import usePlayerStatus from "../hooks/usePlayerStatus";
import { AnimalId, Player } from "../types";

interface PlayerContextValue {
  playerStatus: Player[];
  addPlayer: (name: string) => void;
  deletePlayer: (id: number) => void;
  randomizePlayerRole: () => void;
  setSelectedAnimals: (animals: AnimalId[]) => void;
  selectedAnimals: AnimalId[];
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
  const [selectedAnimals, setSelectedAnimals] = useState<AnimalId[]>([]);
  const { playerStatus, addPlayer, deletePlayer, randomizePlayerRole } =
    usePlayerStatus({ selectedAnimals });

  return (
    <PlayerContext.Provider
      value={{
        playerStatus,
        addPlayer,
        deletePlayer,
        randomizePlayerRole,
        selectedAnimals,
        setSelectedAnimals,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
