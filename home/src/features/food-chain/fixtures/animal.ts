import { Animal, AnimalId } from "../types";

export const ANIMALS: Record<AnimalId, Animal> = {
  LION: {
    id: "LION",
    icon: "/image/icon/foodChain/LION.png",
    type: "PREDATOR",
    name: "사자",
    mainHabitat: "FIELD",
    maximumStarvingCount: 0,
    peekingCount: 1,
    rank: 1,
    unacceptableBiomes: ["SKY"],
    onSurviveCheck: (player, round) => {
      if (round % 2 === 0) {
        player.hasEaten[round] = true;
      }
    },
    onVictoryCheck: (player) => player.hasEaten.every((eaten) => eaten),
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
    onSurviveCheck: (player, round) => {
      if (round % 2 === 0) {
        player.hasEaten[round] = true;
      }
    },
    onVictoryCheck: (player) => player.hasEaten.every((eaten) => eaten),
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
    onSurviveCheck: (player, round) => {
      if (round % 2 === 0) {
        player.hasEaten[round] = true;
      }
    },
    onVictoryCheck: (player) => player.hasEaten.every((eaten) => eaten),
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
    onSurviveCheck: (player, round) => {
      if (round % 2 === 0) {
        player.hasEaten[round] = true;
      }
    },
    onVictoryCheck: (player) => player.hasEaten.every((eaten) => eaten),
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
    onSurviveCheck: (player, round) => {
      if (round % 2 === 0) {
        player.hasEaten[round] = true;
      }
    },
    onVictoryCheck: (player) => player.hasEaten.every((eaten) => eaten),
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
    onSurviveCheck: (player, round) => {
      if (round % 2 === 0) {
        player.hasEaten[round] = true;
      }
    },
    onVictoryCheck: (player) => player.hasEaten.every((eaten) => eaten),
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
    onSurviveCheck: (player, round) => {
      if (round % 2 === 0) {
        player.hasEaten[round] = true;
      }
    },
    onVictoryCheck: (player) => player.hasEaten.every((eaten) => eaten),
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
    onSurviveCheck: (player, round) => {
      if (round % 2 === 0) {
        player.hasEaten[round] = true;
      }
    },
    onVictoryCheck: (player) => player.hasEaten.every((eaten) => eaten),
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
    onSurviveCheck: (player, round) => {
      if (round % 2 === 0) {
        player.hasEaten[round] = true;
      }
    },
    onVictoryCheck: (player) => player.hasEaten.every((eaten) => eaten),
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
    onSurviveCheck: (player, round) => {
      if (round % 2 === 0) {
        player.hasEaten[round] = true;
      }
    },
    onVictoryCheck: (player) => player.hasEaten.every((eaten) => eaten),
  },
  CHARMELEON: {
    id: "CHARMELEON",
    type: "PREY",
    name: "카멜레온",
    mainHabitat: "FOREST",
    maximumStarvingCount: 4,
    peekingCount: 1,
    rank: 5,
    unacceptableBiomes: ["SKY"],
    onSurviveCheck: (player, round) => {
      if (round % 2 === 0) {
        player.hasEaten[round] = true;
      }
    },
    onVictoryCheck: (player) => player.hasEaten.every((eaten) => eaten),
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
    onSurviveCheck: (player, round) => {
      if (round % 2 === 0) {
        player.hasEaten[round] = true;
      }
    },
    onVictoryCheck: (player) => player.hasEaten.every((eaten) => eaten),
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
    onSurviveCheck: (player, round) => {
      if (round % 2 === 0) {
        player.hasEaten[round] = true;
      }
    },
    onVictoryCheck: (player) => player.hasEaten.every((eaten) => eaten),
  },
};
