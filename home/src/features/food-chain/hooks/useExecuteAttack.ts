import useFoodChainPlayerContext from "../context";
import { ANIMALS } from "../fixtures/animal";
import { AnimalId } from "../types";

const MAYBE_INVINCIBLE_PREYS: AnimalId[] = ["MALLARD", "HARE", "DEER", "OTTER"];

const MAYBE_INVINCIBLE_PREYS_EXPANDED: AnimalId[] = [
  "SHEEP",
  "PLATYPUS",
  "FLYING_SQUIRREL",
];

const PROTECTING_PREYS: AnimalId[] = ["ARMADILLO", "TURTLE", "LIZARD"];

export default function useExecuteAttack({
  attackerId,
  defenderId,
  round,
}: {
  attackerId: number | null;
  defenderId: number | null;
  round: number;
}) {
  const { playerStatus, killPlayer, eatPlayer } = useFoodChainPlayerContext();

  const executeAttack = () => {
    if (!attackerId || !defenderId) {
      return {
        message: "공격자와 방어자를 선택해주세요.",
      };
    }

    const attacker = playerStatus.find((player) => player.id === attackerId);
    const defender = playerStatus.find((player) => player.id === defenderId);

    if (!attacker || !defender) {
      return {
        message: "공격자와 방어자를 찾지 못했습니다.",
      };
    }

    if (!attacker.role || !defender.role) {
      return {
        message: "공격자와 방어자의 역할을 찾지 못했습니다.",
      };
    }

    if (defender.role === "SNAKE" || defender.role === "RATTLESNAKE") {
      killPlayer(attacker.id);
      return {
        message: `${attacker.name}님 사망`,
      };
    }

    if (defender.protectedRound === round) {
      return {
        message: "아무 일도 일어나지 않았습니다. (보호)",
      };
    }

    if (MAYBE_INVINCIBLE_PREYS.includes(defender.role)) {
      const invinciblePlayers = playerStatus.filter(
        (player) =>
          player.role &&
          MAYBE_INVINCIBLE_PREYS.includes(player.role) &&
          player.status === "ALIVE"
      );
      const isInAllSameBiome = invinciblePlayers.every(
        (player) =>
          player.biomeHistory[round - 1] === attacker.biomeHistory[round - 1]
      );

      if (isInAllSameBiome) {
        return {
          message: "아무 일도 일어나지 않았습니다. (무적)",
        };
      }
    }

    if (MAYBE_INVINCIBLE_PREYS_EXPANDED.includes(defender.role)) {
      const invinciblePlayers = playerStatus.filter(
        (player) =>
          player.role &&
          MAYBE_INVINCIBLE_PREYS_EXPANDED.includes(player.role) &&
          player.status === "ALIVE"
      );
      const isInAllSameBiome = invinciblePlayers.every(
        (player) =>
          player.biomeHistory[round - 1] === attacker.biomeHistory[round - 1]
      );

      if (isInAllSameBiome) {
        return {
          message: "아무 일도 일어나지 않았습니다. (무적)",
        };
      }
    }

    if (ANIMALS[attacker.role].rank === ANIMALS[defender.role].rank) {
      return {
        message: "아무 일도 일어나지 않았습니다.",
      };
    }

    if (ANIMALS[attacker.role].rank < ANIMALS[defender.role].rank) {
      if (
        PROTECTING_PREYS.includes(defender.role) &&
        !defender.protectedRound
      ) {
        return {
          message: "아무 일도 일어나지 않았습니다. (보호)",
        };
      }

      const getEatenPlayerId = () => {
        if (defender.role === "HEN_PHEASANT") {
          const cock = playerStatus.find(
            (player) => player.role === "COCK_PHEASANT"
          );
          return cock?.status === "ALIVE" ? cock.id : defender.id;
        }
        if (defender.role === "COCK_PHEASANT") {
          const hen = playerStatus.find(
            (player) => player.role === "HEN_PHEASANT"
          );
          return hen?.status === "ALIVE" ? hen.id : defender.id;
        }
        return defender.id;
      };

      eatPlayer(attacker.id, getEatenPlayerId(), round);
      return {
        message: `${defender.name}님 사망`,
      };
    }

    killPlayer(attacker.id);
    return {
      message: `${attacker.name}님 사망`,
    };
  };

  return { executeAttack };
}
