import { GamePhaseType } from "../types";

export const NEXT_PHASE: Record<GamePhaseType, GamePhaseType> = {
  PLAYER_SETTING: "FIRST_CLUE",
  FIRST_CLUE: "FIRST_GUESS",
  FIRST_GUESS: "SECOND_CLUE",
  SECOND_CLUE: "SECOND_GUESS",
  SECOND_GUESS: "RESULT",
  RESULT: "FIRST_CLUE",
};
