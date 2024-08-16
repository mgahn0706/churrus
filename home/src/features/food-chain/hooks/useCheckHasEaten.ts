import useFoodChainPlayerContext from "../context";
import { ANIMALS } from "../fixtures/animal";
import { AnimalId } from "../types";

export default function useCheckHasEaten({ round }: { round: number }) {
  const { playerStatus, killPlayer } = useFoodChainPlayerContext();

  const checkHasEaten = () => {
    const predators = playerStatus.filter(
      (player) =>
        player.role &&
        player.status === "ALIVE" &&
        ANIMALS[player.role].type === "PREDATOR"
    );

    const starvedPredator = predators.filter((predator) => {
      if (!predator.role) {
        return false;
      }
      const starvedCount = predator.hasEaten
        .slice(0, round)
        .filter((eaten) => !eaten).length;

      return starvedCount > ANIMALS[predator.role].maximumStarvingCount;
    });

    starvedPredator.forEach((predator) => {
      killPlayer(predator.id);
    });
    if (starvedPredator.length === 0) {
      return "아무도 굶어죽지 않았습니다.";
    }

    return {
      message: `${starvedPredator
        .map((predator) => `${predator.name}님`)
        .join(", ")} 사망`,
    };
  };

  return { checkHasEaten };
}
