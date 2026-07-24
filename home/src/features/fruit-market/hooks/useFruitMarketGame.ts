import { FRUITS, uniqueFruits } from "@/features/fruit-market/constants";
import {
  Fruit,
  FruitMarketBids,
  FruitMarketPhase,
  FruitMarketPlayer,
  FruitMarketRoundResult,
  FruitMarketSpecial,
} from "@/features/fruit-market/types";
import { useMemo, useState } from "react";

const createEmptyFruitCounts = () =>
  Object.fromEntries(FRUITS.map((fruit) => [fruit, 0])) as Record<
    Fruit,
    number
  >;

const shuffle = <T,>(items: T[]) => {
  const nextItems = [...items];
  for (let index = nextItems.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1));
    [nextItems[index], nextItems[other]] = [nextItems[other], nextItems[index]];
  }
  return nextItems;
};

const createFruitPairs = (counts: Record<Fruit, number>) => {
  const remaining = shuffle(
    FRUITS.map((fruit) => ({
      fruit,
      count: counts[fruit],
    })).filter(({ count }) => count > 0),
  );
  const pairs: [Fruit, Fruit][] = [];

  while (remaining.length > 0) {
    remaining.sort((a, b) => b.count - a.count);
    const first = remaining[0];
    const second = remaining[1];

    if (!second) break;

    pairs.push([first.fruit, second.fruit]);
    first.count -= 1;
    second.count -= 1;

    for (let index = remaining.length - 1; index >= 0; index -= 1) {
      if (remaining[index].count === 0) {
        remaining.splice(index, 1);
      }
    }
  }

  return shuffle(pairs);
};

export function useFruitMarketGame() {
  const [phase, setPhase] = useState<FruitMarketPhase>("setup");
  const [participantNames, setParticipantNames] = useState("");
  const [counts, setCounts] = useState(createEmptyFruitCounts);
  const [players, setPlayers] = useState<FruitMarketPlayer[]>([]);
  const [round, setRound] = useState(1);
  const [activePlayerId, setActivePlayerId] = useState<number | null>(null);
  const [bidPlayerIds, setBidPlayerIds] = useState<number[]>([]);
  const [roomOpen, setRoomOpen] = useState(false);
  const [bids, setBids] = useState<FruitMarketBids>({});
  const [secretFruits, setSecretFruits] = useState<Fruit[]>([]);
  const [results, setResults] = useState<FruitMarketRoundResult[]>([]);
  const [special, setSpecial] = useState<FruitMarketSpecial>("none");
  const [targetFruit, setTargetFruit] = useState<Fruit>("사과");
  const [replacementFruit, setReplacementFruit] = useState<Fruit>("딸기");
  const [replacementNotices, setReplacementNotices] = useState<string[]>([]);

  const participants = participantNames
    .split(/[\n,]+/)
    .map((name) => name.trim())
    .filter(Boolean);
  const requiredCount = participants.length * 2;
  const totalCount = Object.values(counts).reduce(
    (sum, count) => sum + count,
    0,
  );
  const maxFruitCount = Math.max(0, ...Object.values(counts));
  const marketFruits = FRUITS.filter((fruit) => counts[fruit] > 0);
  const currentPlayer = players.find((player) => player.id === activePlayerId);
  const currentPlayerFruits = useMemo(
    () => (currentPlayer ? uniqueFruits(currentPlayer.fruits) : []),
    [currentPlayer],
  );
  const replacementFruitOptions = useMemo(
    () =>
      marketFruits.filter((fruit) => !currentPlayerFruits.includes(fruit)),
    [currentPlayerFruits, marketFruits],
  );
  const bidFruits = useMemo(() => {
    if (special !== "replace" || !currentPlayer) return currentPlayerFruits;
    const nextFruits = [...currentPlayer.fruits];
    nextFruits[nextFruits.indexOf(targetFruit)] = replacementFruit;
    return uniqueFruits(nextFruits);
  }, [
    currentPlayer,
    currentPlayerFruits,
    replacementFruit,
    special,
    targetFruit,
  ]);
  const setupReady =
    participants.length >= 2 &&
    totalCount === requiredCount &&
    marketFruits.length >= 2 &&
    maxFruitCount <= participants.length;
  const replacementReady =
    special !== "replace" || replacementFruitOptions.includes(replacementFruit);
  const bidComplete = currentPlayer
    ? replacementReady &&
      bidFruits.every((fruit) => bids[currentPlayer.id]?.[fruit])
    : false;

  const changeCount = (fruit: Fruit, amount: number) => {
    setCounts((previous) => ({
      ...previous,
      [fruit]: Math.max(0, previous[fruit] + amount),
    }));
  };

  const startGame = () => {
    if (!setupReady) return;

    const fruitPairs = createFruitPairs(counts);
    setPlayers(
      participants.map((name, id) => ({
        id,
        name,
        fruits: fruitPairs[id],
        income: 0,
        usedSpecial: false,
      })),
    );
    setPhase("distribution");
  };

  const closePrivateRoom = () => {
    setRoomOpen(false);
    setActivePlayerId(null);
  };

  const startRounds = () => {
    setActivePlayerId(null);
    setBidPlayerIds([]);
    setRoomOpen(false);
    setPhase("bid");
  };

  const selectPlayer = (playerId: number) => {
    setActivePlayerId(playerId);
    setRoomOpen(false);
    setSpecial("none");
  };

  const leaveDealerRoomWithoutSubmitting = () => {
    if (activePlayerId !== null) {
      setBids((previous) => {
        const nextBids = { ...previous };
        delete nextBids[activePlayerId];
        return nextBids;
      });
    }
    setSpecial("none");
    closePrivateRoom();
  };

  const selectSpecial = (nextSpecial: FruitMarketSpecial) => {
    setSpecial(nextSpecial);
    const nextTargetFruit =
      nextSpecial === "replace" ? currentPlayerFruits[0] : marketFruits[0];
    setTargetFruit(nextTargetFruit);
    if (nextSpecial === "replace") {
      setReplacementFruit(replacementFruitOptions[0] ?? nextTargetFruit);
    }
  };

  const setPlayerBid = (fruit: Fruit, price: number) => {
    if (!currentPlayer) return;
    setBids((previous) => ({
      ...previous,
      [currentPlayer.id]: {
        ...previous[currentPlayer.id],
        [fruit]: price,
      },
    }));
  };

  const submitBids = () => {
    if (!currentPlayer || !bidComplete) return;
    let nextPlayers = players;
    let nextSecretFruits = secretFruits;

    if (special === "secret") {
      nextSecretFruits = [...secretFruits, targetFruit];
      nextPlayers = players.map((player) =>
        player.id === currentPlayer.id
          ? { ...player, usedSpecial: true }
          : player,
      );
    }

    if (special === "replace") {
      nextPlayers = players.map((player) => {
        if (player.id !== currentPlayer.id) return player;
        const fruits = [...player.fruits];
        fruits[fruits.indexOf(targetFruit)] = replacementFruit;
        return { ...player, fruits, usedSpecial: true };
      });
      setReplacementNotices((previous) => [
        ...previous,
        `${currentPlayer.name}: ${targetFruit} → ${replacementFruit}`,
      ]);
    }

    setPlayers(nextPlayers);
    setSecretFruits(nextSecretFruits);
    setSpecial("none");
    const nextBidPlayerIds = [...bidPlayerIds, currentPlayer.id];
    setBidPlayerIds(nextBidPlayerIds);
    if (nextBidPlayerIds.length < players.length) {
      closePrivateRoom();
      return;
    }

    const incomeByPlayer: Record<number, number> = {};
    const roundResults: FruitMarketRoundResult[] = [];
    const sellingFruits = uniqueFruits(
      nextPlayers.flatMap((player) => player.fruits),
    );

    sellingFruits.forEach((fruit) => {
      const sellers = nextPlayers.filter((player) =>
        player.fruits.includes(fruit),
      );
      const price = Math.min(
        ...sellers.map((player) => bids[player.id]?.[fruit] as number),
      );
      const winners = sellers.filter(
        (player) => bids[player.id]?.[fruit] === price,
      );
      const revenue = price * sellers.length;
      const share = Math.floor(revenue / winners.length);
      winners.forEach((winner) => {
        incomeByPlayer[winner.id] = (incomeByPlayer[winner.id] ?? 0) + share;
      });
      roundResults.push({
        fruit,
        price,
        revenue,
        hidden: nextSecretFruits.includes(fruit),
      });
    });

    setPlayers(
      nextPlayers.map((player) => ({
        ...player,
        income: player.income + (incomeByPlayer[player.id] ?? 0),
      })),
    );
    setResults(roundResults);
    setPhase("result");
    closePrivateRoom();
  };

  const nextRound = () => {
    if (round === 4) {
      setPhase("final");
      return;
    }
    setRound((previous) => previous + 1);
    setActivePlayerId(null);
    setBidPlayerIds([]);
    setBids({});
    setSecretFruits([]);
    setReplacementNotices([]);
    setPhase("bid");
  };

  return {
    phase,
    participantNames,
    setParticipantNames,
    counts,
    players,
    round,
    bidPlayerIds,
    roomOpen,
    setRoomOpen,
    bids,
    results,
    special,
    targetFruit,
    setTargetFruit,
    replacementFruit,
    setReplacementFruit,
    replacementNotices,
    participants,
    requiredCount,
    totalCount,
    maxFruitCount,
    marketFruits,
    currentPlayer,
    currentPlayerFruits,
    replacementFruitOptions,
    bidFruits,
    setupReady,
    bidComplete,
    changeCount,
    startGame,
    startRounds,
    selectPlayer,
    selectSpecial,
    setPlayerBid,
    submitBids,
    closePrivateRoom,
    leaveDealerRoomWithoutSubmitting,
    nextRound,
  };
}

export type FruitMarketGame = ReturnType<typeof useFruitMarketGame>;
