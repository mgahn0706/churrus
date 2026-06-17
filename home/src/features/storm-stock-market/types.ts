export type CompanyId =
  | "disconnectedTelecom"
  | "deathLife"
  | "stoneAgeElectronics"
  | "earthquakeConstruction"
  | "bankruptBank";

export type RoundNumber = 1 | 2;

export type GamePhase =
  | "SETUP"
  | "ROUND_READY"
  | "RUNNING"
  | "ROUND_BREAK"
  | "ENDED";

export type TradeType = "BUY" | "SELL";

export interface Company {
  id: CompanyId;
  name: string;
  shortName: string;
  color: string;
}

export interface InfoPair {
  firstPlayerNumber: number;
  secondPlayerNumber: number;
}

export interface MarketEvent {
  id: string;
  round: RoundNumber;
  minute: number;
  companyId: CompanyId;
  change: number;
  priceAfter: number;
  pair: InfoPair;
}

export type Holdings = Record<CompanyId, number>;

export interface PlayerState {
  id: number;
  name: string;
  cash: number;
  holdings: Holdings;
}

export interface ExchangeInventoryItem {
  companyId: CompanyId;
  quantity: number;
}

export interface ExchangeTrade {
  id: string;
  playerId: number;
  companyId: CompanyId;
  type: TradeType;
  quantity: number;
  price: number;
  total: number;
  round: RoundNumber;
  minute: number;
  createdAt: string;
}

export interface PlayerStanding {
  player: PlayerState;
  stockValue: number;
  totalCash: number;
}
