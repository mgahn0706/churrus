export type Phase = 1 | 2 | 3;
export type Direction = 1 | -1;

export interface RacePlayerState {
  name: string;
  draftOrder: number;
  characterId: string | null;
  position: number;
  hand: number[];
  discard: number[];
  finishedRank: number | null;
  quickForwardUsed: number;
}

export type Effect =
  | { type: "reset"; source: string }
  | { type: "delete"; source: string }
  | { type: "mirror"; source: string; delta: number }
  | { type: "one"; source: string }
  | { type: "abilityMove"; source: string; target: string; delta: number }
  | {
      type: "delayedMove";
      source: string;
      delta: number;
      target: string;
      isLastCard: boolean;
    };

export type PendingAbility =
  | {
      type: "gravity";
      source: string;
      card: number;
      delta: number;
      isLastCard: boolean;
    }
  | {
      type: "silence";
      source: string;
      card: number;
      delta: number;
      isLastCard: boolean;
    }
  | {
      type: "union";
      source: string;
      isLastCard: boolean;
      targets: string[];
    }
  | {
      type: "with";
      source: string;
      card: number;
      delta: number;
      isLastCard: boolean;
    };

export interface MiddleRaceGameState {
  phase: Phase;
  lap: number;
  finishLine: number;
  currentPlayerName: string;
  selectedPlayerName: string;
  selectedCard: number | null;
  silencedPlayerName: string | null;
  players: RacePlayerState[];
}

export interface MiddleRaceGameActions {
  selectPlayer: (playerName: string) => void;
  selectCard: (card: number) => void;
  clearSelectedCard: () => void;
  cyclePhase: () => void;
}

export interface MiddleRaceGame extends MiddleRaceGameState, MiddleRaceGameActions {}
