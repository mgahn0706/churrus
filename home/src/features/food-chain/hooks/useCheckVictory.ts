import useFoodChainPlayerContext from "../context";
import { ANIMALS } from "../fixtures/animal";
import { AnimalId } from "../types";

const DEPENDENT_ROLES: AnimalId[] = ["RAT", "EGYPTEAN_PLOVER", "CROW"];

export default function useCheckVictory() {
  const { playerStatus, setVictory } = useFoodChainPlayerContext();

  playerStatus
    .filter((player) => player.role && !DEPENDENT_ROLES.includes(player.role))
    .forEach((player) => {
      if (!player.role) {
        return;
      }
      const hasWon = ANIMALS[player.role].onVictoryCheck(playerStatus);
      setVictory(player.id, hasWon ? "WIN" : "LOSE");
    });

  playerStatus
    .filter((player) => player.role && DEPENDENT_ROLES.includes(player.role))
    .forEach((player) => {
      if (!player.role) {
        return;
      }
      const hasWon = ANIMALS[player.role].onVictoryCheck(playerStatus);
      setVictory(player.id, hasWon ? "WIN" : "LOSE");
    });
}
