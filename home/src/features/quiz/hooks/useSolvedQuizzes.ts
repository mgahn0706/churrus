import useLocalStorage from "@/hooks/useLocalStorage";
import { useMemo } from "react";
import { resolveQuizId } from "../domain/adventureIds";

export default function useSolvedQuizzes() {
  const [solvedQuizIds, setSolvedQuizIds] = useLocalStorage<string[]>("quiz", []);

  const canonicalSolvedQuizIds = useMemo(
    () => Array.from(new Set(solvedQuizIds.map(resolveQuizId))),
    [solvedQuizIds]
  );
  const solvedQuizSet = useMemo(
    () => new Set(canonicalSolvedQuizIds),
    [canonicalSolvedQuizIds]
  );

  const isSolved = (quizId: string) => solvedQuizSet.has(resolveQuizId(quizId));

  const markSolved = (quizId: string) => {
    setSolvedQuizIds((prev) => {
      if (prev.some((savedId) => resolveQuizId(savedId) === resolveQuizId(quizId))) {
        return prev;
      }
      return [...prev, resolveQuizId(quizId)];
    });
  };

  return {
    solvedQuizIds: canonicalSolvedQuizIds,
    isSolved,
    markSolved,
  };
}
