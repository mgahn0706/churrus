import { useEffect } from "react";
import useFoodChainPlayerContext from "../context";
import { ANIMALS } from "../fixtures/animal";
import { AnimalId } from "../types";

export default function useCheckVictory() {
  const { playerStatus, setVictory } = useFoodChainPlayerContext();

  const checkVictory = () => {
    playerStatus
      .filter((player) => player.role)
      .forEach((player) => {
        if (!player.role) {
          return;
        }
        const hasWon = ANIMALS[player.role].onVictoryCheck(playerStatus);
        setVictory(player.id, hasWon ? "WIN" : "LOSE");
      });
  };

  useEffect(() => {
    checkVictory();
  }, []);
}
