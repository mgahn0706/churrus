export type Phase = "PLAYER_SETTING" | "CHARACTER_DRAFT" | "RACE" | "RESULT";
export type Direction = 1 | -1;

export interface RacePlayerState {
  name: string;
  draftOrder: number;
  characterId: string | null;
  position: number;
  hand: number[];
  discard: number[];
  finishedRank: number | null;
  abilityDisabled: boolean;
  copiedAbilityId: string | null;
  lastAbilityTargetName: string | null;
  quickForwardUsed: number;
}

export type Effect =
  | { type: "reset"; source: string }
  | { type: "delete"; source: string }
  | { type: "mirror"; source: string; delta: number }
  | { type: "one"; source: string; trigger: string }
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
      type: "one";
      source: string;
      trigger: string;
    }
  | {
      type: "push";
      source: string;
      target: string;
    }
  | {
      type: "delete";
      source: string;
    }
  | {
      type: "reset";
      source: string;
    }
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
  canMoveToNextPhase: boolean;
  canUseSelectedMoveCard: boolean;
  selectedMoveCardDisabledReason: string;
  canUseCurrentAbility: boolean;
  isResolvingAbility: boolean;
  activePendingAbility: PendingAbility | null;
  pendingAbilityQueue: PendingAbility[];
  currentAbilityId: string | null;
  currentAbilityRequiresSelectedCard: boolean;
  currentAbilityRequiresTarget: boolean;
  currentAbilityTargetNames: string[];
  canAddPlayer: boolean;
  canRemovePlayer: boolean;
}

export interface MiddleRaceGameActions {
  selectPlayer: (playerName: string) => void;
  selectCard: (card: number) => void;
  clearSelectedCard: () => void;
  useSelectedMoveCard: (options?: { useDefaultMove?: boolean }) => void;
  useCurrentAbility: (options?: {
    card?: number | null;
    targetPlayerName?: string;
  }) => void;
  resolvePendingAbility: (direction: Direction) => void;
  resolveDeletePendingAbility: (targetPlayerName: string, cardToKeep: number) => void;
  resolveResetPendingAbility: (targetPlayerName: string) => void;
  resolveUnionPendingAbility: (shouldPull: boolean) => void;
  cyclePhase: () => void;
  moveToPreviousPhase: () => void;
  updatePlayerName: (draftOrder: number, name: string) => void;
  addPlayer: () => void;
  removeLastPlayer: () => void;
  assignCharacter: (draftOrder: number, characterId: string) => void;
  clearCharacter: (draftOrder: number) => void;
  randomizeCharacters: () => void;
}

export interface MiddleRaceGame extends MiddleRaceGameState, MiddleRaceGameActions {}
