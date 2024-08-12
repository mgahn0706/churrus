export interface Player {
  id: number;
  name: string;
  role: AnimalId | null;
  biomeHistory: Array<BiomeId | null>;
  status: "ALIVE" | "DEAD";
  hasEaten: Array<boolean | null>;
  camouflagedTo?: AnimalId;
  predictedWinner?: AnimalId;
}

export type BiomeId = "RIVER" | "FIELD" | "FOREST" | "SKY";

export interface Biome {
  id: BiomeId;
  name: string;
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
  onSurviveCheck: (player: Player, round: number) => void;
  onVictoryCheck: (player: Player) => boolean;
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
  | "CROW";
