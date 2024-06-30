export interface Player {
  id: number;
  name: string;
  biomeHistory: Array<Biome | null>;
  status: "ALIVE" | "DEAD";
  hasEaten: Array<boolean | null>;
}

export type Biome = "RIVER" | "FIELD" | "FOREST" | "SKY";

export interface Animal {
  id: AnimalId;
  type: "PREDATOR" | "PREY";
  name: string;
  mainHabitat: Biome;
  maximumStarvingCount: number;
  peekingCount: 1 | 2;
  rank: number;
  unacceptableBiomes: Biome[];
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
  | "CHARMELEON"
  | "SNAKE"
  | "CROW";
