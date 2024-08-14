import { useState } from "react";
import { AnimalId, BiomeId, Player } from "../types";

export default function usePlayerStatus() {
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

  const randomizePlayerRole = (selectedAnimals: AnimalId[]) => {
    const randomizedAnimalIds = selectedAnimals.sort(() => Math.random() - 0.5);

    setPlayerStatus((prev) =>
      prev.map((player, index) => ({
        ...player,
        role: randomizedAnimalIds[index],
      }))
    );
  };

  const predictWinner = ({
    playerId,
    animalId,
  }: {
    playerId: number;
    animalId: AnimalId;
  }) => {
    const targetPlayer = playerStatus.find((player) => player.id === playerId);
    if (!targetPlayer) return;
    if (targetPlayer.role !== "CROW") {
      console.error("Only CROW can predict winner");
      return;
    }
    setPlayerStatus((prev) =>
      prev.map((player) =>
        player.id === playerId
          ? { ...player, predictedWinner: animalId }
          : player
      )
    );
  };

  const camouflage = ({
    playerId,
    animalId,
  }: {
    playerId: number;
    animalId: AnimalId;
  }) => {
    const targetPlayer = playerStatus.find((player) => player.id === playerId);
    if (!targetPlayer) return;
    if (targetPlayer.role !== "CHAMELEON") {
      console.error("Only CHAMELEON can camouflage");
      return;
    }
    setPlayerStatus((prev) =>
      prev.map((player) =>
        player.id === playerId ? { ...player, camouflagedTo: animalId } : player
      )
    );
  };

  const moveBiome = ({
    playerId,
    round,
    biomeId,
  }: {
    playerId: number;
    round: number;
    biomeId: BiomeId;
  }) => {
    setPlayerStatus((prev) =>
      prev.map((player) =>
        player.id === playerId
          ? {
              ...player,
              biomeHistory: [
                ...player.biomeHistory.slice(0, round - 1),
                biomeId,
              ],
            }
          : player
      )
    );
  };

  return {
    playerStatus,
    addPlayer,
    deletePlayer,
    randomizePlayerRole,
    predictWinner,
    camouflage,
    moveBiome,
  };
}
