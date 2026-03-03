import useLocalStorage from "@/hooks/useLocalStorage";
import { useMemo } from "react";

export default function useSolvedQuizzes() {
  const [solvedQuizIds, setSolvedQuizIds] = useLocalStorage<string[]>("quiz", []);

  const solvedQuizSet = useMemo(() => new Set(solvedQuizIds), [solvedQuizIds]);

  const isSolved = (quizId: string) => solvedQuizSet.has(quizId);

  const markSolved = (quizId: string) => {
    setSolvedQuizIds((prev) => {
      if (prev.includes(quizId)) {
        return prev;
      }
      return [...prev, quizId];
    });
  };

  return {
    solvedQuizIds,
    isSolved,
    markSolved,
  };
}
