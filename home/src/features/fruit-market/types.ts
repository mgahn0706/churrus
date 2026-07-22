export type Fruit =
  "사과" | "딸기" | "수박" | "멜론" | "감귤" | "레몬" | "포도" | "블루베리";

export type FruitMarketPhase =
  "setup" | "distribution" | "bid" | "result" | "final";

export type FruitMarketSpecial = "none" | "secret" | "replace";

export interface FruitMarketPlayer {
  id: number;
  name: string;
  fruits: Fruit[];
  income: number;
  usedSpecial: boolean;
}

export type FruitMarketBids = Record<number, Partial<Record<Fruit, number>>>;

export interface FruitMarketRoundResult {
  fruit: Fruit;
  price: number;
  revenue: number;
  hidden: boolean;
}
