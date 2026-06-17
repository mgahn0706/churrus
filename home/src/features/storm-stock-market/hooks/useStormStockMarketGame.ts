import useLocalStorage from "@/hooks/useLocalStorage";
import { useEffect, useMemo, useState } from "react";
import {
  COMPANIES,
  DEFAULT_PLAYER_COUNT,
  DEFAULT_ROUND_REAL_SECONDS,
  ROUND_GAME_MINUTES,
  TICK_MINUTES,
} from "../fixtures";
import {
  CompanyId,
  ExchangeInventoryItem,
  ExchangeTrade,
  GamePhase,
  MarketEvent,
  PlayerState,
  RoundNumber,
  TradeType,
} from "../types";
import {
  calculateStandings,
  canDistributeEvents,
  clampRoundMinute,
  createDefaultInventory,
  createDefaultPlayers,
  createSchedules,
  getCurrentPrices,
  getInventoryQuantity,
  getPlayerInformation,
  getUpcomingEvents,
  validateTrade,
} from "../utils";

interface StormStockMarketGameState {
  phase: GamePhase;
  currentRound: RoundNumber;
  currentMinute: number;
  roundRealSeconds: number;
  players: PlayerState[];
  inventory: ExchangeInventoryItem[];
  trades: ExchangeTrade[];
  events: MarketEvent[];
  roundStartedAt: number | null;
  exchangeStartedAt: number | null;
}

interface SubmitTradeParams {
  playerId: number;
  companyId: CompanyId;
  type: TradeType;
  quantity: number;
}

const createInitialState = (): StormStockMarketGameState => {
  const players = createDefaultPlayers(DEFAULT_PLAYER_COUNT);

  return {
    phase: "SETUP",
    currentRound: 1,
    currentMinute: 0,
    roundRealSeconds: DEFAULT_ROUND_REAL_SECONDS,
    players,
    inventory: createDefaultInventory(),
    trades: [],
    events: createSchedules(players.length),
    roundStartedAt: null,
    exchangeStartedAt: null,
  };
};

const STORAGE_KEY = "storm-stock-market-state";

export const useStormStockMarketGame = () => {
  const [game, setGame] =
    useLocalStorage<StormStockMarketGameState>(STORAGE_KEY, createInitialState());
  const [tradeError, setTradeError] = useState<string | null>(null);
  const [lastTradeId, setLastTradeId] = useState<string | null>(null);

  useEffect(() => {
    if (game.phase !== "RUNNING" || game.roundStartedAt === null) {
      return;
    }

    const interval = window.setInterval(() => {
      setGame((previousGame) => {
        if (
          previousGame.phase !== "RUNNING" ||
          previousGame.roundStartedAt === null
        ) {
          return previousGame;
        }

        const realElapsedSeconds =
          (Date.now() - previousGame.roundStartedAt) / 1000;
        const gameMinute = clampRoundMinute(
          Math.floor(
            (realElapsedSeconds / previousGame.roundRealSeconds) *
              ROUND_GAME_MINUTES
          )
        );

        if (gameMinute < ROUND_GAME_MINUTES) {
          return {
            ...previousGame,
            currentMinute: gameMinute,
          };
        }

        return {
          ...previousGame,
          phase: previousGame.currentRound === 1 ? "ROUND_BREAK" : "ENDED",
          currentMinute: ROUND_GAME_MINUTES,
          roundStartedAt: null,
          exchangeStartedAt: null,
        };
      });
    }, 500);

    return () => {
      window.clearInterval(interval);
    };
  }, [game.phase, game.roundStartedAt, setGame]);

  const currentPrices = useMemo(
    () => getCurrentPrices(game.events, game.currentRound, game.currentMinute),
    [game.currentMinute, game.currentRound, game.events]
  );

  const standings = useMemo(
    () => calculateStandings(game.players, currentPrices),
    [currentPrices, game.players]
  );

  const upcomingEvents = useMemo(
    () =>
      getUpcomingEvents(game.events, game.currentRound, game.currentMinute),
    [game.currentMinute, game.currentRound, game.events]
  );

  const visibleEvents = useMemo(
    () =>
      game.events.filter(
        (event) =>
          event.round === game.currentRound &&
          event.minute <= game.currentMinute
      ),
    [game.currentMinute, game.currentRound, game.events]
  );

  const nextTickMinute =
    Math.floor(game.currentMinute / TICK_MINUTES) * TICK_MINUTES + TICK_MINUTES;

  const updatePlayerCount = (playerCount: number) => {
    setTradeError(null);

    if (!canDistributeEvents(playerCount)) {
      setTradeError("24개 정보를 인접 페어에 균등 배분할 수 있는 인원만 가능합니다.");
      return;
    }

    setGame((previousGame) => ({
      ...previousGame,
      players: createDefaultPlayers(playerCount),
      inventory: createDefaultInventory(),
      events: createSchedules(playerCount),
      trades: [],
      currentRound: 1,
      currentMinute: 0,
      phase: "SETUP",
      roundStartedAt: null,
      exchangeStartedAt: null,
    }));
  };

  const updatePlayerName = (playerId: number, name: string) => {
    setGame((previousGame) => ({
      ...previousGame,
      players: previousGame.players.map((player) =>
        player.id === playerId ? { ...player, name } : player
      ),
    }));
  };

  const updateRoundRealSeconds = (roundRealSeconds: number) => {
    setGame((previousGame) => ({
      ...previousGame,
      roundRealSeconds: Math.max(30, Math.round(roundRealSeconds)),
    }));
  };

  const prepareGame = () => {
    setTradeError(null);
    setGame((previousGame) => ({
      ...previousGame,
      phase: "ROUND_READY",
      currentRound: 1,
      currentMinute: 0,
      inventory: createDefaultInventory(),
      trades: [],
      events: createSchedules(previousGame.players.length),
      roundStartedAt: null,
      exchangeStartedAt: null,
    }));
  };

  const startRound = () => {
    setTradeError(null);
    setGame((previousGame) => ({
      ...previousGame,
      phase: "RUNNING",
      roundStartedAt:
        Date.now() -
        (previousGame.currentMinute / ROUND_GAME_MINUTES) *
          previousGame.roundRealSeconds *
          1000,
      exchangeStartedAt: null,
    }));
  };

  const pauseRound = () => {
    setGame((previousGame) => ({
      ...previousGame,
      phase: previousGame.currentRound === 1 ? "ROUND_READY" : "ROUND_BREAK",
      roundStartedAt: null,
      exchangeStartedAt: null,
    }));
  };

  const jumpToMinute = (minute: number) => {
    setGame((previousGame) => ({
      ...previousGame,
      currentMinute: clampRoundMinute(minute),
      roundStartedAt:
        previousGame.phase === "RUNNING"
          ? Date.now() -
            (clampRoundMinute(minute) / ROUND_GAME_MINUTES) *
              previousGame.roundRealSeconds *
              1000
          : previousGame.roundStartedAt,
    }));
  };

  const proceedToRoundTwo = () => {
    setTradeError(null);
    setGame((previousGame) => ({
      ...previousGame,
      phase: "ROUND_BREAK",
      currentRound: 2,
      currentMinute: 0,
      roundStartedAt: null,
      exchangeStartedAt: null,
    }));
  };

  const startExchangeSession = () => {
    setGame((previousGame) => ({
      ...previousGame,
      exchangeStartedAt: Date.now(),
    }));
  };

  const clearExchangeSession = () => {
    setGame((previousGame) => ({
      ...previousGame,
      exchangeStartedAt: null,
    }));
  };

  const submitTrade = ({
    playerId,
    companyId,
    type,
    quantity,
  }: SubmitTradeParams) => {
    setTradeError(null);
    setLastTradeId(null);

    const player = game.players.find((item) => item.id === playerId);
    const price = currentPrices[companyId];
    const inventoryQuantity = getInventoryQuantity(game.inventory, companyId);

    if (!player) {
      setTradeError("플레이어를 선택해주세요.");
      return false;
    }

    const validationError = validateTrade({
      player,
      type,
      companyId,
      quantity,
      price,
      inventoryQuantity,
    });

    if (validationError) {
      setTradeError(validationError);
      return false;
    }

    const trade: ExchangeTrade = {
      id: `trade-${Date.now()}`,
      playerId,
      companyId,
      type,
      quantity,
      price,
      total: price * quantity,
      round: game.currentRound,
      minute: game.currentMinute,
      createdAt: new Date().toISOString(),
    };

    setGame((previousGame) => ({
      ...previousGame,
      players: previousGame.players.map((item) => {
        if (item.id !== playerId) {
          return item;
        }

        return {
          ...item,
          cash:
            type === "BUY"
              ? item.cash - trade.total
              : item.cash + trade.total,
          holdings: {
            ...item.holdings,
            [companyId]:
              type === "BUY"
                ? item.holdings[companyId] + quantity
                : item.holdings[companyId] - quantity,
          },
        };
      }),
      inventory: previousGame.inventory.map((item) =>
        item.companyId === companyId
          ? {
              ...item,
              quantity:
                type === "BUY"
                  ? item.quantity - quantity
                  : item.quantity + quantity,
            }
          : item
      ),
      trades: [trade, ...previousGame.trades],
    }));
    setLastTradeId(trade.id);
    return true;
  };

  const resetGame = () => {
    setTradeError(null);
    setLastTradeId(null);
    setGame(createInitialState());
  };

  return {
    ...game,
    companies: COMPANIES,
    currentPrices,
    standings,
    upcomingEvents,
    visibleEvents,
    nextTickMinute: Math.min(nextTickMinute, ROUND_GAME_MINUTES),
    tradeError,
    lastTradeId,
    updatePlayerCount,
    updatePlayerName,
    updateRoundRealSeconds,
    prepareGame,
    startRound,
    pauseRound,
    jumpToMinute,
    proceedToRoundTwo,
    startExchangeSession,
    clearExchangeSession,
    submitTrade,
    resetGame,
    getPlayerInformation: (playerId: number) =>
      getPlayerInformation(game.events, playerId),
  };
};
