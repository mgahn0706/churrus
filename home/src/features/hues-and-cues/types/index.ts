export interface PlayerType {
  id: number;
  name: string;
  score: number;
  selectedColors: [number, number][];
}

export type GamePhaseType =
  | "PLAYER_SETTING"
  | "FIRST_CLUE"
  | "FIRST_GUESS"
  | "SECOND_CLUE"
  | "SECOND_GUESS"
  | "RESULT";
