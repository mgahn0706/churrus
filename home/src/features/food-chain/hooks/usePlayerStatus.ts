import { useState } from "react";
import { AnimalId, Player } from "../types";

interface UsePlayerStatusProps {
  selectedAnimals: AnimalId[];
}

export default function usePlayerStatus({
  selectedAnimals,
}: UsePlayerStatusProps) {
  const [playerStatus, setPlayerStatus] = useState<Player[]>([]);

  const addPlayer = (name: string) => {
    setPlayerStatus((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        role: null,
        name,
        biomeHistory: [],
        status: "ALIVE",
        hasEaten: [null, null, null, null],
      },
    ]);
  };

  const deletePlayer = (id: number) => {
    setPlayerStatus((prev) =>
      prev
        .filter((player) => player.id !== id)
        .map((player, index) => ({ ...player, id: index + 1 }))
    );
  };

  const randomizePlayerRole = () => {
    const randomizedAnimalIds = selectedAnimals.sort(() => Math.random() - 0.5);
    setPlayerStatus((prev) =>
      prev.map((player, index) => ({
        ...player,
        role: randomizedAnimalIds[index],
      }))
    );
  };

  return { playerStatus, addPlayer, deletePlayer, randomizePlayerRole };
}
