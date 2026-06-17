import {
  COMPANY_IDS,
  COMPANIES,
  INITIAL_CASH,
  INITIAL_STOCK_PRICE,
  INITIAL_STOCK_QUANTITY,
  MARKET_EVENTS_PER_ROUND,
  MAX_HOLDING_PER_COMPANY,
  ROUND_GAME_MINUTES,
  ROUND_ONE_EVENTS,
  TICK_MINUTES,
  createEmptyHoldings,
} from "./fixtures";
import {
  CompanyId,
  ExchangeInventoryItem,
  InfoPair,
  MarketEvent,
  PlayerStanding,
  PlayerState,
  RoundNumber,
  TradeType,
} from "./types";

export const formatMoney = (value: number) =>
  `${value.toLocaleString("ko-KR")}원`;

export const formatGameTime = (round: RoundNumber, minute: number) => {
  const hour = round + Math.floor(minute / 60);
  const minutes = minute % 60;

  return `${hour}:${String(minutes).padStart(2, "0")}`;
};

export const getCompany = (companyId: CompanyId) =>
  COMPANIES.find((company) => company.id === companyId) ?? COMPANIES[0];

export const createDefaultPlayers = (playerCount: number): PlayerState[] =>
  Array.from({ length: playerCount }, (_, index) => ({
    id: index + 1,
    name: `플레이어 ${index + 1}`,
    cash: INITIAL_CASH,
    holdings: createEmptyHoldings(),
  }));

export const createDefaultInventory = (): ExchangeInventoryItem[] =>
  COMPANY_IDS.map((companyId) => ({
    companyId,
    quantity: INITIAL_STOCK_QUANTITY,
  }));

export const canDistributeEvents = (playerCount: number) =>
  playerCount >= 2 && MARKET_EVENTS_PER_ROUND % playerCount === 0;

export const getPairForEventIndex = (
  eventIndex: number,
  playerCount: number
): InfoPair => ({
  firstPlayerNumber: (eventIndex % playerCount) + 1,
  secondPlayerNumber: ((eventIndex + 1) % playerCount) + 1,
});

export const normalizeSchedulePairs = (
  events: MarketEvent[],
  playerCount: number
) =>
  playerCount === 8
    ? events
    : events.map((event, index) => ({
        ...event,
        pair: getPairForEventIndex(index, playerCount),
      }));

const getLastPricesForRound = (
  round: RoundNumber,
  events: MarketEvent[],
  fallbackPrices: Record<CompanyId, number>
) =>
  COMPANY_IDS.reduce((prices, companyId) => {
    const companyEvents = events
      .filter((event) => event.round === round && event.companyId === companyId)
      .sort((first, second) => first.minute - second.minute);
    const lastEvent = companyEvents[companyEvents.length - 1];

    return {
      ...prices,
      [companyId]: lastEvent?.priceAfter ?? fallbackPrices[companyId],
    };
  }, {} as Record<CompanyId, number>);

export const createInitialPrices = (): Record<CompanyId, number> =>
  COMPANY_IDS.reduce(
    (prices, companyId) => ({
      ...prices,
      [companyId]: INITIAL_STOCK_PRICE,
    }),
    {} as Record<CompanyId, number>
  );

export const createRoundTwoEvents = (
  roundOneEvents: MarketEvent[],
  playerCount: number
): MarketEvent[] => {
  const roundOneFinalPrices = getLastPricesForRound(
    1,
    roundOneEvents,
    createInitialPrices()
  );
  const currentPrices = { ...roundOneFinalPrices };
  const changePattern = [
    500, -400, 700, -600, 400, -500, 800, -700, 600, -500, 400, -800,
    700, -400, 500, -600, 900, -700, 400, -500, 600, -400, 500, -600,
  ];

  return Array.from({ length: MARKET_EVENTS_PER_ROUND }, (_, index) => {
    const companyId = COMPANY_IDS[(index * 2 + Math.floor(index / 5)) % COMPANY_IDS.length];
    const minute = (Math.floor(index / 2) + 1) * TICK_MINUTES;
    const rawChange = changePattern[index] ?? 500;
    const nextPrice = Math.max(100, currentPrices[companyId] + rawChange);
    const change = nextPrice - currentPrices[companyId];
    currentPrices[companyId] = nextPrice;

    return {
      id: `r2-${String(minute).padStart(3, "0")}-${companyId}-${index}`,
      round: 2,
      minute,
      companyId,
      change,
      priceAfter: nextPrice,
      pair: getPairForEventIndex(index, playerCount),
    };
  });
};

export const createSchedules = (playerCount: number) => {
  const roundOneEvents = normalizeSchedulePairs(ROUND_ONE_EVENTS, playerCount);

  return [
    ...roundOneEvents,
    ...createRoundTwoEvents(roundOneEvents, playerCount),
  ];
};

export const getCurrentPrices = (
  events: MarketEvent[],
  round: RoundNumber,
  minute: number
) => {
  const startingPrices =
    round === 1
      ? createInitialPrices()
      : getLastPricesForRound(1, events, createInitialPrices());
  const appliedEvents = events.filter(
    (event) => event.round === round && event.minute <= minute
  );

  return appliedEvents.reduce(
    (prices, event) => ({
      ...prices,
      [event.companyId]: event.priceAfter,
    }),
    startingPrices
  );
};

export const getUpcomingEvents = (
  events: MarketEvent[],
  round: RoundNumber,
  minute: number
) =>
  events
    .filter((event) => event.round === round && event.minute > minute)
    .sort((first, second) => first.minute - second.minute)
    .slice(0, 6);

export const getPlayerInformation = (
  events: MarketEvent[],
  playerId: number
) =>
  events
    .filter(
      (event) =>
        event.pair.firstPlayerNumber === playerId ||
        event.pair.secondPlayerNumber === playerId
    )
    .sort((first, second) =>
      first.round === second.round
        ? first.minute - second.minute
        : first.round - second.round
    );

export const getPairLabel = (pair: InfoPair) =>
  `${pair.firstPlayerNumber}&${pair.secondPlayerNumber}`;

export const validateTrade = ({
  player,
  type,
  companyId,
  quantity,
  price,
  inventoryQuantity,
}: {
  player: PlayerState;
  type: TradeType;
  companyId: CompanyId;
  quantity: number;
  price: number;
  inventoryQuantity: number;
}) => {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    return "수량은 1 이상의 정수여야 합니다.";
  }

  if (type === "BUY") {
    if (quantity > inventoryQuantity) {
      return "거래소 재고가 부족합니다.";
    }

    if (player.holdings[companyId] + quantity > MAX_HOLDING_PER_COMPANY) {
      return `한 회사 주식은 최대 ${MAX_HOLDING_PER_COMPANY}개까지만 보유할 수 있습니다.`;
    }

    if (player.cash < price * quantity) {
      return "플레이어 현금이 부족합니다.";
    }
  }

  if (type === "SELL" && player.holdings[companyId] < quantity) {
    return "플레이어 보유 주식이 부족합니다.";
  }

  return null;
};

export const calculateStandings = (
  players: PlayerState[],
  prices: Record<CompanyId, number>
): PlayerStanding[] =>
  players
    .map((player) => {
      const stockValue = COMPANY_IDS.reduce(
        (sum, companyId) => sum + player.holdings[companyId] * prices[companyId],
        0
      );

      return {
        player,
        stockValue,
        totalCash: player.cash + stockValue,
      };
    })
    .sort((first, second) => second.totalCash - first.totalCash);

export const getInventoryQuantity = (
  inventory: ExchangeInventoryItem[],
  companyId: CompanyId
) =>
  inventory.find((item) => item.companyId === companyId)?.quantity ??
  INITIAL_STOCK_QUANTITY;

export const clampRoundMinute = (minute: number) =>
  Math.min(ROUND_GAME_MINUTES, Math.max(0, minute));
