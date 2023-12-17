import { useState } from "react";
import useInterval from "./useInterval";

export default function useTimer({ initialRemainingTime = 60 }) {
  const [remainingTime, setRemainingTime] = useState(0);

  useInterval(
    () => {
      setRemainingTime(remainingTime - 1);
    },
    remainingTime > 0 ? 1000 : null
  );

  const resetTimer = () => setRemainingTime(initialRemainingTime);

  return { remainingTime, resetTimer };
}
