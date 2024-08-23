import { useMemo, useState } from "react";
import { CardSubmission, Player } from "../types/player";

const minimumVisibleFloors = 10;

const penaltyWhenDifferenceGreaterThanOne = -2;

export default function useUndergroundPrisonScore() {
  const [round, setRound] = useState(0);
  const [players, setPlayers] = useState<Player[]>([]);

  const [hasExceededBorder, setHasExceededBorder] = useState({
    30: false,
    20: false,
    10: false,
  });

  const visibleFloors = useMemo(() => {
    const { deepestFloor, shallowestFloor } = players.reduce(
      (acc, cur) => {
        return {
          deepestFloor: Math.max(acc.deepestFloor, cur.floor),
          shallowestFloor: Math.min(acc.shallowestFloor, cur.floor),
        };
      },
      { deepestFloor: 0, shallowestFloor: 40 }
    );

    if (deepestFloor - shallowestFloor < minimumVisibleFloors) {
      return Array(minimumVisibleFloors)
        .fill(0)
        .map((_, index) => deepestFloor - minimumVisibleFloors + index + 1)
        .filter((floor) => floor >= 0);
    }
    return Array(deepestFloor - shallowestFloor + 2)
      .fill(0)
      .map((_, index) => shallowestFloor + index)
      .filter((floor) => floor >= 0);
  }, [players]);

  const addPlayer = (playerName: string) => {
    setPlayers([
      ...players,
      {
        id: players.length + 1,
        name: playerName,
        score: {
          current: 0,
          changed: 0,
        },
        floor: 40,
      },
    ]);
  };

  const submitCards = (submission: CardSubmission[]) => {
    setRound(round + 1);
    const updatedPlayers = players.map((player) => {
      const submittedCard = submission.find((sub) => sub.id === player.id);

      return {
        ...player,
        score: {
          current: player.score.current,
          changed: 0,
        },
        floor: player.floor - (submittedCard?.card ?? 0),
      };
    });
    if (updatedPlayers.some((player) => player.floor <= 0)) {
      setPlayers(updatedPlayers);
      return;
    }
    const processedPlayers = processRound(updatedPlayers);
    setPlayers(processedPlayers);
  };

  const checkBorderBreaker = (players: Player[]) => {
    const shallowestFloor = players.reduce(
      (acc, cur) => Math.min(acc, cur.floor),
      40
    );
    const brokenBorder = Object.entries(hasExceededBorder).reduce(
      (acc, [key, value]) => {
        if (value) {
          return acc;
        }
        return shallowestFloor <= Number(key) ? Number(key) : acc;
      },
      0
    );
    const updatedPlayers = players.map((player) => {
      if (player.floor <= brokenBorder) {
        setHasExceededBorder({
          ...hasExceededBorder,
          [brokenBorder]: true,
        });
        return {
          ...player,
          score: {
            current: player.score.current - 8,
            changed: player.score.changed - 8,
          },
        };
      }
      return player;
    });
    return updatedPlayers;
  };

  const closeFloor = (players: Player[]) => {
    const isRoundMultipleOfSix = round % 6 === 0;
    if (isRoundMultipleOfSix) {
      const closingFloorTarget = 40 - (round / 6) * 10;
      const updatedPlayers = players.map((player) => {
        if (player.floor > closingFloorTarget) {
          return {
            ...player,
            floor: closingFloorTarget,
            score: {
              current: player.score.current - 2,
              changed: player.score.changed - 2,
            },
          };
        }
        return player;
      });

      return updatedPlayers;
    }
    return players;
  };

  const checkDifference = (players: Player[]) => {
    const updatedPlayers = players.map((player, index) => {
      const isDiffernceGreaterThanOneFormer =
        Math.abs(player.floor - players[(index + 1) % players.length].floor) >
        1;
      const isDiffernceGreaterThanOneLatter =
        Math.abs(
          player.floor -
            players[(index - 1 + players.length) % players.length].floor
        ) > 1;
      const minusPoint =
        (isDiffernceGreaterThanOneFormer
          ? penaltyWhenDifferenceGreaterThanOne
          : 0) +
        (isDiffernceGreaterThanOneLatter
          ? penaltyWhenDifferenceGreaterThanOne
          : 0);
      return {
        ...player,
        score: {
          current: player.score.current + minusPoint,
          changed: player.score.changed + minusPoint,
        },
      };
    });
    return updatedPlayers;
  };

  const processScoreByCellSize = (players: Player[]) => {
    const cellPoplulationMapper = players.reduce((acc, cur) => {
      return {
        ...acc,
        [cur.floor]: (acc[cur.floor] ?? 0) + 1,
      };
    }, {} as Record<number, number>);
    const updatedPlayers = players.map((player) => {
      const cellScore =
        (player.floor % 10) - cellPoplulationMapper[player.floor];
      return {
        ...player,
        score: {
          current: player.score.current + cellScore,
          changed: player.score.changed + cellScore,
        },
      };
    });
    return updatedPlayers;
  };

  const processRound = (players: Player[]) => {
    const closedPlayers = closeFloor(players);
    const checkedBorderBreakerPlayers = checkBorderBreaker(closedPlayers);
    const checkedDifferencePlayers = checkDifference(
      checkedBorderBreakerPlayers
    );
    const processedPlayers = processScoreByCellSize(checkedDifferencePlayers);

    return processedPlayers;
  };

  return {
    round,
    players,
    visibleFloors,
    addPlayer,
    submitCards,
    hasGameEnded: players.some((player) => player.floor <= 0),
    startGame: () => {
      setRound(1);
    },
  };
}
