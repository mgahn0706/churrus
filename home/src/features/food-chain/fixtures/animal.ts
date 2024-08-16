import { Animal, AnimalId } from "../types";

export const ANIMALS: Record<AnimalId, Animal> = {
  LION: {
    id: "LION",
    type: "PREDATOR",
    name: "사자",
    mainHabitat: "FIELD",
    maximumStarvingCount: 0,
    peekingCount: 1,
    rank: 1,
    unacceptableBiomes: ["SKY"],
    onVictoryCheck: (players) => {
      const lion = players.find((player) => player.role === "LION");
      return lion?.status === "ALIVE";
    },
  },
  CROCODILE: {
    id: "CROCODILE",
    type: "PREDATOR",
    name: "악어",
    mainHabitat: "RIVER",
    maximumStarvingCount: 1,
    peekingCount: 1,
    rank: 2,
    unacceptableBiomes: ["SKY"],
    onVictoryCheck: (players) => {
      const crocodile = players.find((player) => player.role === "CROCODILE");
      return crocodile?.status === "ALIVE";
    },
  },
  EAGLE: {
    id: "EAGLE",
    type: "PREDATOR",
    name: "독수리",
    mainHabitat: "SKY",
    maximumStarvingCount: 1,
    peekingCount: 1,
    rank: 3,
    unacceptableBiomes: [],
    onVictoryCheck: (players) => {
      const eagle = players.find((player) => player.role === "EAGLE");
      return eagle?.status === "ALIVE";
    },
  },
  HYENA: {
    id: "HYENA",
    type: "PREDATOR",
    name: "하이에나",
    mainHabitat: "FIELD",
    maximumStarvingCount: 2,
    peekingCount: 1,
    rank: 4,
    unacceptableBiomes: ["SKY"],
    onVictoryCheck: (players) => {
      return !ANIMALS.LION.onVictoryCheck(players);
    },
  },
  DEER: {
    id: "DEER",
    type: "PREY",
    name: "사슴",
    mainHabitat: "FIELD",
    maximumStarvingCount: 4,
    peekingCount: 1,
    rank: 5,
    unacceptableBiomes: ["SKY"],
    onVictoryCheck: (players) => {
      const deer = players.find((player) => player.role === "DEER");
      return deer?.status === "ALIVE";
    },
  },
  HARE: {
    id: "HARE",
    type: "PREY",
    name: "토끼",
    mainHabitat: "FOREST",
    maximumStarvingCount: 4,
    peekingCount: 1,
    rank: 5,
    unacceptableBiomes: ["SKY"],
    onVictoryCheck: (players) => {
      const hare = players.find((player) => player.role === "HARE");
      return hare?.status === "ALIVE";
    },
  },
  OTTER: {
    id: "OTTER",
    type: "PREY",
    name: "수달",
    mainHabitat: "RIVER",
    maximumStarvingCount: 4,
    peekingCount: 1,
    rank: 5,
    unacceptableBiomes: ["SKY"],
    onVictoryCheck: (players) => {
      const otter = players.find((player) => player.role === "OTTER");
      return otter?.status === "ALIVE";
    },
  },
  MALLARD: {
    id: "MALLARD",
    type: "PREY",
    name: "청둥오리",
    mainHabitat: "SKY",
    maximumStarvingCount: 4,
    peekingCount: 1,
    rank: 5,
    unacceptableBiomes: [],
    onVictoryCheck: (players) => {
      const mallard = players.find((player) => player.role === "MALLARD");
      return mallard?.status === "ALIVE";
    },
  },
  EGYPTEAN_PLOVER: {
    id: "EGYPTEAN_PLOVER",
    type: "PREY",
    name: "악어새",
    mainHabitat: "RIVER",
    maximumStarvingCount: 4,
    peekingCount: 2,
    rank: 5,
    unacceptableBiomes: [],
    onVictoryCheck: (players) => {
      return ANIMALS.CROCODILE.onVictoryCheck(players);
    },
  },
  RAT: {
    id: "RAT",
    type: "PREY",
    name: "쥐",
    mainHabitat: "FOREST",
    maximumStarvingCount: 4,
    peekingCount: 2,
    rank: 5,
    unacceptableBiomes: ["SKY"],
    onVictoryCheck: (players) => {
      return ANIMALS.LION.onVictoryCheck(players);
    },
  },
  CHAMELEON: {
    id: "CHAMELEON",
    type: "PREY",
    name: "카멜레온",
    mainHabitat: "FOREST",
    maximumStarvingCount: 4,
    peekingCount: 1,
    rank: 5,
    unacceptableBiomes: ["SKY"],
    onVictoryCheck: (players) => {
      const chameleon = players.find((player) => player.role === "CHAMELEON");
      return chameleon?.status === "ALIVE";
    },
  },
  SNAKE: {
    id: "SNAKE",
    type: "PREY",
    name: "뱀",
    mainHabitat: "FOREST",
    maximumStarvingCount: 4,
    peekingCount: 1,
    rank: 5,
    unacceptableBiomes: ["SKY"],
    onVictoryCheck: (players) => {
      const deadPlayerCount = players.filter(
        (player) => player.status === "DEAD"
      ).length;
      return deadPlayerCount >= 9;
    },
  },
  CROW: {
    id: "CROW",
    type: "PREY",
    name: "까마귀",
    mainHabitat: "SKY",
    maximumStarvingCount: 4,
    peekingCount: 2,
    rank: 5,
    unacceptableBiomes: [],
    onVictoryCheck: (players) => {
      const crow = players.find((player) => player.role === "CROW");
      return (
        !!crow?.predictedWinner &&
        ANIMALS[crow.predictedWinner].onVictoryCheck(players)
      );
    },
  },
};
