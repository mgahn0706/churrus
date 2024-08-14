import useFoodChainPlayerContext from "../context";
import { ANIMALS } from "../fixtures/animal";

export default function useExecuteAttack({
  attackerId,
  defenderId,
}: {
  attackerId: number | null;
  defenderId: number | null;
}) {
  const { playerStatus, killPlayer } = useFoodChainPlayerContext();

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

    if (ANIMALS[attacker.role].rank === ANIMALS[defender.role].rank) {
      return {
        message: "아무 일도 일어나지 않았습니다.",
      };
    }

    const killedPlayer =
      ANIMALS[attacker.role].rank < ANIMALS[defender.role].rank
        ? defender
        : attacker;

    killPlayer(killedPlayer.id);
    return {
      message: `${killedPlayer.name}님 사망`,
    };
  };

  return { executeAttack };
}
