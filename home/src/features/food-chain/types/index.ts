export interface Player {
  id: number;
  name: string;
  role: AnimalId | null;
  biomeHistory: Array<BiomeId | null>;
  status: "ALIVE" | "DEAD";
  hasEaten: Array<boolean | null>;
  camouflagedTo?: AnimalId;
  predictedWinner?: AnimalId;
  protectedRound?: number | null;
  contactedAnimalCount?: number;
  result: "WIN" | "LOSE" | null;
}

export type BiomeId = "RIVER" | "FIELD" | "FOREST" | "SKY";

export interface Biome {
  id: BiomeId;
  name: string;
  color: string;
}

export interface Animal {
  id: AnimalId;
  icon?: string;
  type: "PREDATOR" | "PREY";
  name: string;
  mainHabitat: BiomeId;
  maximumStarvingCount: number;
  peekingCount: 1 | 2;
  rank: number;
  unacceptableBiomes: BiomeId[];
  onVictoryCheck: (players: Player[]) => boolean;
}

export type AnimalId =
  | "LION"
  | "CROCODILE"
  | "EAGLE"
  | "HYENA"
  | "DEER"
  | "HARE"
  | "OTTER"
  | "MALLARD"
  | "EGYPTEAN_PLOVER"
  | "RAT"
  | "CHAMELEON"
  | "SNAKE"
  | "CROW"
  | "CHEETAH"
  | "WOLF"
  | "FOX"
  | "FLYING_SQUIRREL"
  | "ARMADILLO"
  | "TURTLE"
  | "SHEEP"
  | "CAPYBARA"
  | "PLATYPUS"
  | "BAT"
  | "COCK_PHEASANT"
  | "HEN_PHEASANT"
  | "HAWK"
  | "CAT"
  | "LIZARD"
  | "RATTLESNAKE";
