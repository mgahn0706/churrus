import {
  HorrorRaceCharacterRank,
  HorrorRaceCoin,
  HorrorRaceCoinZoneValue,
  HorrorRaceGame,
  HorrorRacePlayer,
  HorrorRacePlayerResult,
  HorrorRacePhase,
} from "@/features/horror-race/types";
import {
  HORROR_RACE_MAX_PLAYERS,
  HORROR_RACE_MIN_PLAYERS,
} from "@/features/horror-race/constants";
import { useState } from "react";

const PHASE_ORDER: HorrorRacePhase[] = [
  "PLAYER_SETTING",
  "SUPPORTER_SELECTION",
  "RACE",
  "RESULT",
];

const START_POSITION = 0;
const HORROR_RACE_CHARACTER_IDS = [
  "vampire",
  "kumiho",
  "jiangshi",
  "mummy",
  "zombie",
];
const COINS_PER_TURN = 3;
const COIN_ZONE_VALUES: HorrorRaceCoinZoneValue[] = [1, 2, 4];
const GOAL_POSITION = 13;

const DEFAULT_PLAYERS: HorrorRacePlayer[] = [
  {
    id: 1,
    name: "플레이어 1",
    supporterCharacterIds: [],
    position: START_POSITION,
    garnets: 0,
  },
  {
    id: 2,
    name: "플레이어 2",
    supporterCharacterIds: [],
    position: START_POSITION,
    garnets: 0,
  },
  {
    id: 3,
    name: "플레이어 3",
    supporterCharacterIds: [],
    position: START_POSITION,
    garnets: 0,
  },
  {
    id: 4,
    name: "플레이어 4",
    supporterCharacterIds: [],
    position: START_POSITION,
    garnets: 0,
  },
];

const createDefaultPlayer = (id: number): HorrorRacePlayer => ({
  id,
  name: `플레이어 ${id}`,
  supporterCharacterIds: [],
  position: START_POSITION,
  garnets: 0,
});

const shufflePlayers = (players: HorrorRacePlayer[]) => {
  const nextPlayers = [...players];

  for (let index = nextPlayers.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [nextPlayers[index], nextPlayers[swapIndex]] = [
      nextPlayers[swapIndex],
      nextPlayers[index],
    ];
  }

  return nextPlayers;
};

const movePlayer = (
  players: HorrorRacePlayer[],
  fromIndex: number,
  toIndex: number
) => {
  if (
    fromIndex === toIndex ||
    fromIndex < 0 ||
    toIndex < 0 ||
    fromIndex >= players.length ||
    toIndex >= players.length
  ) {
    return players;
  }

  const nextPlayers = [...players];
  const [movedPlayer] = nextPlayers.splice(fromIndex, 1);
  nextPlayers.splice(toIndex, 0, movedPlayer);
  return nextPlayers;
};

const createCoinZones = (): Record<HorrorRaceCoinZoneValue, HorrorRaceCoin[]> =>
  ({
    1: [],
    2: [],
    4: [],
  } as Record<HorrorRaceCoinZoneValue, HorrorRaceCoin[]>);

const countZoneCoins = (
  zones: Record<HorrorRaceCoinZoneValue, HorrorRaceCoin[]>
) => COIN_ZONE_VALUES.reduce((count, value) => count + zones[value].length, 0);

const getZoneCoins = (
  zones: Record<HorrorRaceCoinZoneValue, HorrorRaceCoin[]>
) => COIN_ZONE_VALUES.flatMap((value) => zones[value]);

const createCharacterPositions = () =>
  HORROR_RACE_CHARACTER_IDS.reduce<Record<string, number>>(
    (positions, characterId) => ({
      ...positions,
      [characterId]: START_POSITION,
    }),
    {}
  );

const createCoinPool = (players: HorrorRacePlayer[]) =>
  players.flatMap((player) => {
    const selectedCharacterIds = new Set(player.supporterCharacterIds);

    return HORROR_RACE_CHARACTER_IDS.filter(
      (characterId) => !selectedCharacterIds.has(characterId)
    ).map((characterId) => ({
      id: `${player.id}-${characterId}`,
      characterId,
    }));
  });

const rotateIdsAfter = (playerIds: number[], playerId: number) => {
  const playerIndex = playerIds.indexOf(playerId);

  if (playerIndex < 0) {
    return playerIds;
  }

  return [
    ...playerIds.slice(playerIndex + 1),
    ...playerIds.slice(0, playerIndex),
    playerId,
  ];
};

const drawRandomCoins = (coinPool: HorrorRaceCoin[], drawCount: number) => {
  const remainingCoins = [...coinPool];
  const drawnCoins: HorrorRaceCoin[] = [];

  for (let index = 0; index < drawCount; index += 1) {
    const coinIndex = Math.floor(Math.random() * remainingCoins.length);
    const [coin] = remainingCoins.splice(coinIndex, 1);
    drawnCoins.push(coin);
  }

  return { drawnCoins, remainingCoins };
};

const getZoneWinnerCharacterId = (coins: HorrorRaceCoin[]) => {
  const counts = coins.reduce<Record<string, number>>((acc, coin) => {
    acc[coin.characterId] = (acc[coin.characterId] ?? 0) + 1;
    return acc;
  }, {});
  const orderedCounts = Array.from(new Set(Object.values(counts))).sort(
    (left, right) => right - left
  );

  for (const count of orderedCounts) {
    const characterIds = Object.entries(counts)
      .filter(([, characterCount]) => characterCount === count)
      .map(([characterId]) => characterId);

    if (characterIds.length === 1) {
      return characterIds[0];
    }
  }

  return null;
};

const createCharacterRanks = (
  characterPositions: Record<string, number>,
  firstPlaceCharacterId: string
): HorrorRaceCharacterRank[] => {
  const ranks: HorrorRaceCharacterRank[] = [
    {
      characterId: firstPlaceCharacterId,
      rank: 1,
      position: characterPositions[firstPlaceCharacterId] ?? START_POSITION,
    },
  ];
  const remainingCharacters = HORROR_RACE_CHARACTER_IDS.filter(
    (characterId) => characterId !== firstPlaceCharacterId
  ).sort(
    (left, right) =>
      (characterPositions[right] ?? START_POSITION) -
      (characterPositions[left] ?? START_POSITION)
  );
  const secondPosition =
    characterPositions[remainingCharacters[0]] ?? START_POSITION;
  const secondPlaceCharacterIds = remainingCharacters.filter(
    (characterId) =>
      (characterPositions[characterId] ?? START_POSITION) === secondPosition
  );

  secondPlaceCharacterIds.forEach((characterId) => {
    ranks.push({
      characterId,
      rank: 2,
      position: characterPositions[characterId] ?? START_POSITION,
    });
  });

  if (secondPlaceCharacterIds.length > 1) {
    return ranks;
  }

  const thirdCandidates = remainingCharacters.filter(
    (characterId) => !secondPlaceCharacterIds.includes(characterId)
  );
  const thirdPosition =
    characterPositions[thirdCandidates[0]] ?? START_POSITION;

  thirdCandidates
    .filter(
      (characterId) =>
        (characterPositions[characterId] ?? START_POSITION) === thirdPosition
    )
    .forEach((characterId) => {
      ranks.push({
        characterId,
        rank: 3,
        position: characterPositions[characterId] ?? START_POSITION,
      });
    });

  return ranks;
};

const createPlayerResults = (
  players: HorrorRacePlayer[],
  characterRanks: HorrorRaceCharacterRank[]
) => {
  const hasJointSecondPlace =
    characterRanks.filter((characterRank) => characterRank.rank === 2).length >
    1;
  const characterGarnetMap = characterRanks.reduce<Record<string, number>>(
    (acc, characterRank) => {
      if (characterRank.rank === 1) {
        acc[characterRank.characterId] = 3;
      }

      if (characterRank.rank === 2) {
        acc[characterRank.characterId] = hasJointSecondPlace ? 1 : 2;
      }

      if (characterRank.rank === 3) {
        acc[characterRank.characterId] = 1;
      }

      return acc;
    },
    {}
  );
  const playerResults: HorrorRacePlayerResult[] = players.map((player) => {
    const gainedGarnets = player.supporterCharacterIds.reduce(
      (garnetCount, characterId) =>
        garnetCount + (characterGarnetMap[characterId] ?? 0),
      0
    );

    return {
      playerId: player.id,
      gainedGarnets,
      totalGarnets: player.garnets + gainedGarnets,
    };
  });
  const totalGarnets = playerResults.map((result) => result.totalGarnets);
  const maxGarnets = Math.max(...totalGarnets);
  const minGarnets = Math.min(...totalGarnets);

  return {
    playerResults,
    winnerPlayerIds: playerResults
      .filter((result) => result.totalGarnets === maxGarnets)
      .map((result) => result.playerId),
    eliminationCandidatePlayerIds: playerResults
      .filter((result) => result.totalGarnets === minGarnets)
      .map((result) => result.playerId),
  };
};

export const useHorrorRaceGame = (): HorrorRaceGame => {
  const [phase, setPhase] = useState<HorrorRacePhase>("PLAYER_SETTING");
  const [players, setPlayers] = useState<HorrorRacePlayer[]>(DEFAULT_PLAYERS);
  const [coinPool, setCoinPool] = useState<HorrorRaceCoin[]>([]);
  const [currentDrawnCoins, setCurrentDrawnCoins] = useState<HorrorRaceCoin[]>(
    []
  );
  const [currentTurnDrawCount, setCurrentTurnDrawCount] = useState(0);
  const [coinZones, setCoinZones] = useState(createCoinZones);
  const [pendingCoinZones, setPendingCoinZones] = useState(createCoinZones);
  const [characterPositions, setCharacterPositions] = useState(
    createCharacterPositions
  );
  const [currentRound, setCurrentRound] = useState(1);
  const [currentPlayerId, setCurrentPlayerId] = useState<number | null>(null);
  const [coinGiveUpPlayerId, setCoinGiveUpPlayerId] = useState<number | null>(
    null
  );
  const [activeResolutionZone, setActiveResolutionZone] =
    useState<HorrorRaceCoinZoneValue | null>(null);
  const [roundOrderPlayerIds, setRoundOrderPlayerIds] = useState<number[]>(
    DEFAULT_PLAYERS.map((player) => player.id)
  );
  const [roundCompletedPlayerIds, setRoundCompletedPlayerIds] = useState<
    number[]
  >([]);
  const [characterRanks, setCharacterRanks] = useState<
    HorrorRaceCharacterRank[]
  >([]);
  const [playerResults, setPlayerResults] = useState<
    HorrorRacePlayerResult[]
  >([]);
  const [winnerPlayerIds, setWinnerPlayerIds] = useState<number[]>([]);
  const [
    eliminationCandidatePlayerIds,
    setEliminationCandidatePlayerIds,
  ] = useState<number[]>([]);
  const currentPhaseIndex = PHASE_ORDER.indexOf(phase);
  const canCompletePlayerSetting =
    players.length >= HORROR_RACE_MIN_PLAYERS &&
    players.length <= HORROR_RACE_MAX_PLAYERS &&
    players.every((player) => player.name.trim());
  const canCompleteSupporterSelection = players.every(
    (player) => player.supporterCharacterIds.length === 2
  );
  const canMoveToNextPhase =
    currentPhaseIndex < PHASE_ORDER.length - 1 &&
    (phase === "PLAYER_SETTING"
      ? canCompletePlayerSetting
      : phase === "SUPPORTER_SELECTION"
      ? canCompleteSupporterSelection
      : phase === "RACE"
      ? characterRanks.length > 0
      : true);
  const canDrawCoin =
    phase === "RACE" &&
    currentPlayerId !== null &&
    activeResolutionZone === null &&
    currentTurnDrawCount < COINS_PER_TURN &&
    coinPool.length > 0;
  const canConfirmCoinPlacement =
    phase === "RACE" &&
    activeResolutionZone === null &&
    currentTurnDrawCount > 0 &&
    currentDrawnCoins.length === 0 &&
    countZoneCoins(pendingCoinZones) === currentTurnDrawCount;
  const canGiveUpCoin =
    phase === "RACE" &&
    currentPlayerId !== null &&
    activeResolutionZone === null &&
    coinGiveUpPlayerId === null &&
    currentTurnDrawCount === 0 &&
    currentDrawnCoins.length === 0;

  const completeCurrentTurn = (nextGiveUpPlayerId = coinGiveUpPlayerId) => {
    if (currentPlayerId === null) {
      return;
    }

    const nextCompletedPlayerIds = [
      ...roundCompletedPlayerIds,
      currentPlayerId,
    ];
    const allPlayersCompleted =
      nextCompletedPlayerIds.length >= roundOrderPlayerIds.length;

    setCurrentDrawnCoins([]);
    setCurrentTurnDrawCount(0);
    setPendingCoinZones(createCoinZones());

    if (allPlayersCompleted) {
      const nextRoundOrderPlayerIds = nextGiveUpPlayerId
        ? rotateIdsAfter(roundOrderPlayerIds, nextGiveUpPlayerId)
        : roundOrderPlayerIds;

      setRoundOrderPlayerIds(nextRoundOrderPlayerIds);
      setRoundCompletedPlayerIds([]);
      setCurrentPlayerId(null);
      setActiveResolutionZone(1);
      return;
    }

    const nextCurrentPlayerId = roundOrderPlayerIds.find(
      (playerId) => !nextCompletedPlayerIds.includes(playerId)
    );

    setRoundCompletedPlayerIds(nextCompletedPlayerIds);
    setCurrentPlayerId(nextCurrentPlayerId ?? null);
  };

  return {
    phase,
    players,
    coinPool,
    currentDrawnCoins,
    currentTurnDrawCount,
    coinZones,
    pendingCoinZones,
    characterPositions,
    currentRound,
    currentPlayerId,
    coinGiveUpPlayerId,
    activeResolutionZone,
    roundOrderPlayerIds,
    characterRanks,
    playerResults,
    winnerPlayerIds,
    eliminationCandidatePlayerIds,
    canMoveToPreviousPhase: currentPhaseIndex > 0,
    canMoveToNextPhase,
    canDrawCoin,
    canConfirmCoinPlacement,
    canGiveUpCoin,
    moveToPreviousPhase: () => {
      setPhase(PHASE_ORDER[Math.max(currentPhaseIndex - 1, 0)]);
    },
    moveToNextPhase: () => {
      if (!canMoveToNextPhase) {
        return;
      }

      const nextPhase =
        PHASE_ORDER[Math.min(currentPhaseIndex + 1, PHASE_ORDER.length - 1)];

      if (nextPhase === "RACE") {
        const nextRoundOrderPlayerIds = players.map((player) => player.id);
        setPlayers((prev) =>
          prev.map((player) => ({ ...player, position: START_POSITION }))
        );
        setCoinPool(createCoinPool(players));
        setCurrentDrawnCoins([]);
        setCurrentTurnDrawCount(0);
        setCoinZones(createCoinZones());
        setPendingCoinZones(createCoinZones());
        setCharacterPositions(createCharacterPositions());
        setCurrentRound(1);
        setRoundOrderPlayerIds(nextRoundOrderPlayerIds);
        setRoundCompletedPlayerIds([]);
        setCurrentPlayerId(nextRoundOrderPlayerIds[0] ?? null);
        setCoinGiveUpPlayerId(null);
        setActiveResolutionZone(null);
        setCharacterRanks([]);
        setPlayerResults([]);
        setWinnerPlayerIds([]);
        setEliminationCandidatePlayerIds([]);
      }

      setPhase(nextPhase);
    },
    updatePlayerName: (playerId, name) => {
      setPlayers((prev) =>
        prev.map((player) =>
          player.id === playerId ? { ...player, name } : player
        )
      );
    },
    addPlayer: () => {
      setPlayers((prev) => {
        if (prev.length >= HORROR_RACE_MAX_PLAYERS) {
          return prev;
        }

        const nextId = Math.max(0, ...prev.map((player) => player.id)) + 1;
        return [...prev, createDefaultPlayer(nextId)];
      });
    },
    removePlayer: (playerId) => {
      if (coinGiveUpPlayerId === playerId) {
        setCoinGiveUpPlayerId(null);
      }

      setPlayers((prev) => {
        if (prev.length <= HORROR_RACE_MIN_PLAYERS) {
          return prev;
        }

        const nextPlayers = prev.filter((player) => player.id !== playerId);
        setRoundOrderPlayerIds(nextPlayers.map((player) => player.id));
        setCurrentPlayerId((prevCurrentPlayerId) =>
          prevCurrentPlayerId === playerId
            ? nextPlayers[0]?.id ?? null
            : prevCurrentPlayerId
        );
        setRoundCompletedPlayerIds((completedPlayerIds) =>
          completedPlayerIds.filter(
            (completedPlayerId) => completedPlayerId !== playerId
          )
        );
        return nextPlayers;
      });
    },
    randomizePlayerOrder: () => {
      setPlayers((prev) => shufflePlayers(prev));
    },
    movePlayer: (fromIndex, toIndex) => {
      setPlayers((prev) => movePlayer(prev, fromIndex, toIndex));
    },
    setSupporterCharacters: (playerId, characterIds) => {
      setPlayers((prev) =>
        prev.map((player) =>
          player.id === playerId
            ? { ...player, supporterCharacterIds: characterIds.slice(0, 2) }
            : player
        )
      );
    },
    drawCoin: () => {
      if (!canDrawCoin) {
        return;
      }

      const drawCount = Math.min(
        COINS_PER_TURN - currentTurnDrawCount,
        coinPool.length
      );
      const { drawnCoins, remainingCoins } = drawRandomCoins(
        coinPool,
        drawCount
      );

      setCoinPool(remainingCoins);
      setCurrentDrawnCoins((prev) => [...prev, ...drawnCoins]);
      setCurrentTurnDrawCount((prev) => prev + drawCount);
    },
    placeDrawnCoin: (zoneValue, coinId) => {
      if (activeResolutionZone !== null) {
        return;
      }

      const pendingCoin = getZoneCoins(pendingCoinZones).find(
        (zoneCoin) => zoneCoin.id === coinId
      );
      const coin =
        currentDrawnCoins.find((drawnCoin) => drawnCoin.id === coinId) ??
        pendingCoin;
      const nextDrawnCoins = currentDrawnCoins.filter(
        (drawnCoin) => drawnCoin.id !== coinId
      );

      if (!coin || !COIN_ZONE_VALUES.includes(zoneValue)) {
        return;
      }

      setCurrentDrawnCoins(nextDrawnCoins);
      setPendingCoinZones((prev) => ({
        1: prev[1].filter((zoneCoin) => zoneCoin.id !== coinId),
        2: prev[2].filter((zoneCoin) => zoneCoin.id !== coinId),
        4: prev[4].filter((zoneCoin) => zoneCoin.id !== coinId),
        [zoneValue]: [
          ...prev[zoneValue].filter((zoneCoin) => zoneCoin.id !== coinId),
          coin,
        ],
      }));
    },
    confirmCoinPlacement: () => {
      if (!canConfirmCoinPlacement) {
        return;
      }

      setCoinZones((prev) => ({
        1: [...prev[1], ...pendingCoinZones[1]],
        2: [...prev[2], ...pendingCoinZones[2]],
        4: [...prev[4], ...pendingCoinZones[4]],
      }));
      setPendingCoinZones(createCoinZones());
      completeCurrentTurn();
    },
    resolveRoundZone: (zoneValue) => {
      if (activeResolutionZone !== zoneValue) {
        return;
      }

      const winnerCharacterId = getZoneWinnerCharacterId(coinZones[zoneValue]);

      let nextCharacterPositions = characterPositions;
      let raceFinished = false;

      if (winnerCharacterId) {
        const nextPosition =
          (characterPositions[winnerCharacterId] ?? START_POSITION) +
          zoneValue;

        nextCharacterPositions = {
          ...characterPositions,
          [winnerCharacterId]: Math.min(GOAL_POSITION, nextPosition),
        };
        raceFinished = nextPosition >= GOAL_POSITION;
        setCharacterPositions(nextCharacterPositions);
      }

      if (winnerCharacterId && raceFinished) {
        const nextCharacterRanks = createCharacterRanks(
          nextCharacterPositions,
          winnerCharacterId
        );
        const nextRaceResults = createPlayerResults(
          players,
          nextCharacterRanks
        );

        setCharacterRanks(nextCharacterRanks);
        setPlayerResults(nextRaceResults.playerResults);
        setWinnerPlayerIds(nextRaceResults.winnerPlayerIds);
        setEliminationCandidatePlayerIds(
          nextRaceResults.eliminationCandidatePlayerIds
        );
        setActiveResolutionZone(null);
        setCurrentPlayerId(null);
        return;
      }

      if (zoneValue === 1) {
        setActiveResolutionZone(2);
        return;
      }

      if (zoneValue === 2) {
        setActiveResolutionZone(4);
        return;
      }

      setActiveResolutionZone(null);
      setCoinZones(createCoinZones());
      setCoinPool(createCoinPool(players));
      setCoinGiveUpPlayerId(null);
      setRoundCompletedPlayerIds([]);
      setCurrentPlayerId(roundOrderPlayerIds[0] ?? null);
      setCurrentRound((prev) => prev + 1);
    },
    giveUpCoin: () => {
      if (!canGiveUpCoin) {
        return;
      }

      const currentPlayer = players.find(
        (player) => player.id === currentPlayerId
      );

      if (!currentPlayer) {
        return;
      }

      setCoinGiveUpPlayerId(currentPlayer.id);
      completeCurrentTurn(currentPlayer.id);
    },
  };
};
