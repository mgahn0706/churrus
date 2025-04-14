import useFoodChainPlayerContext from "../context";
import { ANIMALS } from "../fixtures/animal";
import { AnimalId } from "../types";

const MAYBE_INVINCIBLE_PREYS: AnimalId[] = ["MALLARD", "HARE", "DEER", "OTTER"];

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

    if (defender.role === "SNAKE") {
      killPlayer(attacker.id);
      return {
        message: `${attacker.name}님 사망`,
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
    if (ANIMALS[attacker.role].rank === ANIMALS[defender.role].rank) {
      return {
        message: "아무 일도 일어나지 않았습니다.",
      };
    }

    if (ANIMALS[attacker.role].rank < ANIMALS[defender.role].rank) {
      eatPlayer(attacker.id, defender.id, round);
      return {
        message: `${defender.name}님 사망`,
      };
    }

    eatPlayer(defender.id, attacker.id, round);
    return {
      message: `${attacker.name}님 사망`,
    };
  };

  return { executeAttack };
}
