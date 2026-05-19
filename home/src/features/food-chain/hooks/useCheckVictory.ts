import { useEffect } from "react";
import useFoodChainPlayerContext from "../context";
import { ANIMALS } from "../fixtures/animal";

export default function useCheckVictory() {
  const { playerStatus, setVictory } = useFoodChainPlayerContext();

  useEffect(() => {
    playerStatus
      .filter((player) => player.role)
      .forEach((player) => {
        if (!player.role) {
          return;
        }
        const hasWon = ANIMALS[player.role].onVictoryCheck(playerStatus);
        setVictory(player.id, hasWon ? "WIN" : "LOSE");
      });
  }, [playerStatus, setVictory]);
}
