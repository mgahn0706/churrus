import { ALL_QUIZZES } from "@/features/quiz/domain";
import useSolvedQuizzes from "@/features/quiz/hooks/useSolvedQuizzes";
export default function useRecommendedQuiz({
  recommendCount = 5,
}: {
  recommendCount?: number;
}) {
  const { solvedQuizIds } = useSolvedQuizzes();

  const unsolvedQuizzes = ALL_QUIZZES.filter(
    (quiz) => !solvedQuizIds.includes(quiz.id)
  );

  return unsolvedQuizzes.length >= recommendCount
    ? unsolvedQuizzes.slice(0, recommendCount)
    : ALL_QUIZZES.slice(0, recommendCount);
}
