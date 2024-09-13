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
      const wolf = players.find((player) => player.role === "WOLF");
      if (!wolf) {
        return !ANIMALS.LION.onVictoryCheck(players);
      }
      return !ANIMALS.LION.onVictoryCheck(players) && wolf.status === "DEAD";
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
      const minimumDeadPlayerCount = Math.max(9, players.length * 0.7);
      return deadPlayerCount >= minimumDeadPlayerCount;
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
  ARMADILLO: {
    id: "ARMADILLO",
    type: "PREY",
    name: "아르마딜로",
    mainHabitat: "FIELD",
    maximumStarvingCount: 4,
    peekingCount: 1,
    rank: 5,
    unacceptableBiomes: ["SKY"],
    onVictoryCheck: (players) => {
      const armadillo = players.find((player) => player.role === "ARMADILLO");
      return armadillo?.status === "ALIVE";
    },
  },
  TURTLE: {
    id: "TURTLE",
    type: "PREY",
    name: "거북이",
    mainHabitat: "RIVER",
    maximumStarvingCount: 4,
    peekingCount: 1,
    rank: 5,
    unacceptableBiomes: ["SKY"],
    onVictoryCheck: (players) => {
      const turtle = players.find((player) => player.role === "TURTLE");
      return turtle?.status === "ALIVE";
    },
  },
  WOLF: {
    id: "WOLF",
    type: "PREDATOR",
    name: "늑대",
    mainHabitat: "FOREST",
    maximumStarvingCount: 3,
    peekingCount: 1,
    rank: 4,
    unacceptableBiomes: ["SKY"],
    onVictoryCheck: (players) => {
      const hyena = players.find((player) => player.role === "HYENA");
      if (!hyena) {
        return !ANIMALS.LION.onVictoryCheck(players);
      }
      return !ANIMALS.LION.onVictoryCheck(players) && hyena.status === "DEAD";
    },
  },
  RATTLESNAKE: {
    id: "RATTLESNAKE",
    type: "PREY",
    name: "방울뱀",
    mainHabitat: "FIELD",
    maximumStarvingCount: 4,
    peekingCount: 1,
    rank: 5,
    unacceptableBiomes: ["SKY"],
    onVictoryCheck: (players) => {
      const alivePlayers = players.filter(
        (player) => player.status === "ALIVE"
      );
      const minimumAlivePlayerCount = Math.max(7, players.length * 0.5);
      return alivePlayers.length >= minimumAlivePlayerCount;
    },
  },
  FLYING_SQUIRREL: {
    id: "FLYING_SQUIRREL",
    type: "PREY",
    name: "날다람쥐",
    mainHabitat: "FOREST",
    maximumStarvingCount: 4,
    peekingCount: 1,
    rank: 5,
    unacceptableBiomes: [],
    onVictoryCheck: (players) => {
      const flyingSquirrel = players.find(
        (player) => player.role === "FLYING_SQUIRREL"
      );
      return flyingSquirrel?.status === "ALIVE";
    },
  },
  SHEEP: {
    id: "SHEEP",
    type: "PREY",
    name: "양",
    mainHabitat: "FIELD",
    maximumStarvingCount: 4,
    peekingCount: 1,
    rank: 5,
    unacceptableBiomes: ["SKY"],
    onVictoryCheck: (players) => {
      const sheep = players.find((player) => player.role === "SHEEP");
      return sheep?.status === "ALIVE";
    },
  },
  PLATYPUS: {
    id: "PLATYPUS",
    type: "PREY",
    name: "오리너구리",
    mainHabitat: "RIVER",
    maximumStarvingCount: 4,
    peekingCount: 1,
    rank: 5,
    unacceptableBiomes: ["SKY"],
    onVictoryCheck: (players) => {
      const platypus = players.find((player) => player.role === "PLATYPUS");
      return platypus?.status === "ALIVE";
    },
  },
  BAT: {
    id: "BAT",
    type: "PREY",
    name: "박쥐",
    mainHabitat: "SKY",
    maximumStarvingCount: 4,
    peekingCount: 1,
    rank: 5,
    unacceptableBiomes: [],
    onVictoryCheck: (players) => {
      const hasLionWon = ANIMALS.LION.onVictoryCheck(players);
      const hasCrocodileWon = ANIMALS.CROCODILE.onVictoryCheck(players);

      return (
        (hasCrocodileWon && !hasLionWon) || (!hasCrocodileWon && hasLionWon)
      );
    },
  },
  COCK_PHEASANT: {
    id: "COCK_PHEASANT",
    type: "PREY",
    name: "장끼",
    mainHabitat: "SKY",
    maximumStarvingCount: 4,
    peekingCount: 1,
    rank: 5,
    unacceptableBiomes: [],
    onVictoryCheck: (players) => {
      const cock_pheasant = players.find(
        (player) => player.role === "COCK_PHEASANT"
      );
      return cock_pheasant?.status === "ALIVE";
    },
  },
  HEN_PHEASANT: {
    id: "HEN_PHEASANT",
    type: "PREY",
    name: "까투리",
    mainHabitat: "SKY",
    maximumStarvingCount: 4,
    peekingCount: 1,
    rank: 5,
    unacceptableBiomes: [],
    onVictoryCheck: (players) => {
      const hen_pheasant = players.find(
        (player) => player.role === "HEN_PHEASANT"
      );
      return hen_pheasant?.status === "ALIVE";
    },
  },
  HAWK: {
    id: "HAWK",
    type: "PREDATOR",
    name: "매",
    mainHabitat: "SKY",
    maximumStarvingCount: 2,
    peekingCount: 1,
    rank: 3,
    unacceptableBiomes: [],
    onVictoryCheck: (players) => {
      const eagle = players.find((player) => player.role === "EAGLE");
      const hawk = players.find((player) => player.role === "HAWK");
      if (!eagle) {
        return hawk?.status === "ALIVE";
      }
      return eagle.status === "DEAD" && hawk?.status === "ALIVE";
    },
  },
  FOX: {
    id: "FOX",
    type: "PREY",
    name: "여우",
    mainHabitat: "FOREST",
    maximumStarvingCount: 4,
    peekingCount: 2,
    rank: 5,
    unacceptableBiomes: ["SKY"],
    onVictoryCheck: (players) => {
      const predictedWinner = players.find(
        (player) => player.role === "FOX"
      )?.predictedWinner;

      return (
        !!predictedWinner && ANIMALS[predictedWinner].onVictoryCheck(players)
      );
    },
  },
  LIZARD: {
    id: "LIZARD",
    type: "PREY",
    name: "도마뱀",
    mainHabitat: "FOREST",
    maximumStarvingCount: 4,
    peekingCount: 1,
    rank: 5,
    unacceptableBiomes: ["SKY"],
    onVictoryCheck: (players) => {
      const lizard = players.find((player) => player.role === "LIZARD");
      return lizard?.status === "ALIVE";
    },
  },
  CAT: {
    id: "CAT",
    type: "PREY",
    name: "고양이",
    mainHabitat: "FOREST",
    maximumStarvingCount: 4,
    peekingCount: 2,
    rank: 5,
    unacceptableBiomes: ["SKY"],
    onVictoryCheck: (players) => {
      const predictedLoser = players.find(
        (player) => player.role === "CAT"
      )?.predictedWinner;

      return (
        !!predictedLoser && !ANIMALS[predictedLoser].onVictoryCheck(players)
      );
    },
  },
  CHEETAH: {
    id: "CHEETAH",
    type: "PREDATOR",
    name: "치타",
    mainHabitat: "FIELD",
    maximumStarvingCount: 3,
    peekingCount: 1,
    rank: 4,
    unacceptableBiomes: ["SKY"],
    onVictoryCheck: (players) => {
      const cheetah = players.find((player) => player.role === "CHEETAH");
      const predators = players.filter(
        (player) => player.role && ANIMALS[player.role].type === "PREDATOR"
      );
      return (
        cheetah?.status === "DEAD" &&
        predators.filter((predator) => predator.status === "DEAD").length >= 5
      );
    },
  },
  CAPYBARA: {
    id: "CAPYBARA",
    type: "PREY",
    name: "카피바라",
    mainHabitat: "RIVER",
    maximumStarvingCount: 4,
    peekingCount: 1,
    rank: 5,
    unacceptableBiomes: ["SKY"],
    onVictoryCheck: (players) => {
      const capybara = players.find((player) => player.role === "CAPYBARA");
      return (capybara?.contactedAnimalCount ?? 0) >= players.length / 2;
    },
  },
};
