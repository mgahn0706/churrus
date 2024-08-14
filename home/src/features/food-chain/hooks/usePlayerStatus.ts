import { useState } from "react";
import { AnimalId, BiomeId, Player } from "../types";

const DUMMY: Array<Player> = [
  {
    id: 1,
    role: null,
    name: "안민규",
    biomeHistory: [],
    status: "ALIVE",
    hasEaten: [null, null, null, null],
  },
  {
    id: 2,
    role: null,
    name: "이연호",
    biomeHistory: [],
    status: "ALIVE",
    hasEaten: [null, null, null, null],
  },
  {
    id: 3,
    role: null,
    name: "김태연",
    biomeHistory: [],
    status: "ALIVE",
    hasEaten: [null, null, null, null],
  },
  {
    id: 4,
    role: null,
    name: "홍경아",
    biomeHistory: [],
    status: "ALIVE",
    hasEaten: [null, null, null, null],
  },
  {
    id: 5,
    role: null,
    name: "김민석",
    biomeHistory: [],
    status: "ALIVE",
    hasEaten: [null, null, null, null],
  },
  {
    id: 6,
    role: null,
    name: "김현준",
    biomeHistory: [],
    status: "ALIVE",
    hasEaten: [null, null, null, null],
  },
  {
    id: 7,
    role: null,
    name: "강재호",
    biomeHistory: [],
    status: "ALIVE",
    hasEaten: [null, null, null, null],
  },
  {
    id: 8,
    role: null,
    name: "최유섭",
    biomeHistory: [],
    status: "ALIVE",
    hasEaten: [null, null, null, null],
  },
  {
    id: 9,
    role: null,
    name: "송가현",
    biomeHistory: [],
    status: "ALIVE",
    hasEaten: [null, null, null, null],
  },
  {
    id: 10,
    role: null,
    name: "고재준",
    biomeHistory: [],
    status: "ALIVE",
    hasEaten: [null, null, null, null],
  },
  {
    id: 11,
    role: null,
    name: "김수인",
    biomeHistory: [],
    status: "ALIVE",
    hasEaten: [null, null, null, null],
  },
  {
    id: 12,
    role: null,
    name: "김진하",
    biomeHistory: [],
    status: "ALIVE",
    hasEaten: [null, null, null, null],
  },
  {
    id: 13,
    role: null,
    name: "우진백",
    biomeHistory: [],
    status: "ALIVE",
    hasEaten: [null, null, null, null],
  },
];

export default function usePlayerStatus() {
  const [playerStatus, setPlayerStatus] = useState<Player[]>(DUMMY);

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
    biomeId: BiomeId | null;
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

  const killPlayer = (id: number) => {
    setPlayerStatus((prev) =>
      prev.map((player) =>
        player.id === id ? { ...player, status: "DEAD" } : player
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
    killPlayer,
  };
}
