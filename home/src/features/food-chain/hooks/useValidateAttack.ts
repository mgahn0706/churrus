import useFoodChainPlayerContext from "../context";

export default function useValidateAttack({
  attackerId,
  defenderId,
  round,
}: {
  attackerId: number | null;
  defenderId: number | null;
  round: number;
}) {
  const { playerStatus } = useFoodChainPlayerContext();

  if (!attackerId || !defenderId) {
    return {
      canAttack: false,
      errorMessage: null,
    };
  }

  if (attackerId === defenderId) {
    return {
      canAttack: false,
      errorMessage: "자기 자신을 공격할 수 없습니다.",
    };
  }

  const attacker = playerStatus.find((player) => player.id === attackerId);
  const defender = playerStatus.find((player) => player.id === defenderId);

  if (attacker?.biomeHistory[round - 1] !== defender?.biomeHistory[round - 1]) {
    return {
      canAttack: false,
      errorMessage: "같은 지역에 있어야 공격할 수 있습니다.",
    };
  }

  if (attacker?.role === "SNAKE" || attacker?.role === "RATTLESNAKE") {
    return {
      canAttack: false,
      errorMessage: "뱀은 공격할 수 없습니다.",
    };
  }

  return {
    canAttack: true,
    errorMessage: null,
  };
}
