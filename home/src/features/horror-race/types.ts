export type HorrorRacePhase =
  | "PLAYER_SETTING"
  | "SUPPORTER_SELECTION"
  | "RACE"
  | "RESULT";

export interface HorrorRacePlayer {
  id: number;
  name: string;
  supporterCharacterIds: string[];
  position: number;
  garnets: number;
}

export type HorrorRaceCoinZoneValue = 1 | 2 | 4;

export interface HorrorRaceCoin {
  id: string;
  characterId: string;
}

export interface HorrorRaceCharacterRank {
  characterId: string;
  rank: 1 | 2 | 3;
  position: number;
}

export interface HorrorRacePlayerResult {
  playerId: number;
  gainedGarnets: number;
  totalGarnets: number;
}

export interface HorrorRaceGameState {
  phase: HorrorRacePhase;
  players: HorrorRacePlayer[];
  coinPool: HorrorRaceCoin[];
  currentDrawnCoins: HorrorRaceCoin[];
  currentTurnDrawCount: number;
  coinZones: Record<HorrorRaceCoinZoneValue, HorrorRaceCoin[]>;
  pendingCoinZones: Record<HorrorRaceCoinZoneValue, HorrorRaceCoin[]>;
  characterPositions: Record<string, number>;
  currentRound: number;
  currentPlayerId: number | null;
  coinGiveUpPlayerId: number | null;
  activeResolutionZone: HorrorRaceCoinZoneValue | null;
  roundOrderPlayerIds: number[];
  characterRanks: HorrorRaceCharacterRank[];
  playerResults: HorrorRacePlayerResult[];
  winnerPlayerIds: number[];
  eliminationCandidatePlayerIds: number[];
  canMoveToPreviousPhase: boolean;
  canMoveToNextPhase: boolean;
  canDrawCoin: boolean;
  canConfirmCoinPlacement: boolean;
  canGiveUpCoin: boolean;
}

export interface HorrorRaceGameActions {
  moveToPreviousPhase: () => void;
  moveToNextPhase: () => void;
  updatePlayerName: (playerId: number, name: string) => void;
  addPlayer: () => void;
  removePlayer: (playerId: number) => void;
  randomizePlayerOrder: () => void;
  movePlayer: (fromIndex: number, toIndex: number) => void;
  setSupporterCharacters: (playerId: number, characterIds: string[]) => void;
  drawCoin: () => void;
  placeDrawnCoin: (zoneValue: HorrorRaceCoinZoneValue, coinId: string) => void;
  confirmCoinPlacement: () => void;
  resolveRoundZone: (zoneValue: HorrorRaceCoinZoneValue) => void;
  giveUpCoin: () => void;
}

export interface HorrorRaceGame
  extends HorrorRaceGameState,
    HorrorRaceGameActions {}
