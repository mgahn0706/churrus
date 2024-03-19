import { MEETINGS, QuizData } from "@/features/quiz/fixtures";
import useLocalStorage from "@/hooks/useLocalStorage";

const ALL_QUIZZES = MEETINGS.flatMap((meeting) => QuizData[meeting]);

export default function useRecommendedQuiz({
  recommendCount = 5,
}: {
  recommendCount?: number;
}) {
  const [solvedQuizzes] = useLocalStorage<string[]>("quiz", []);

  const unsolvedQuizzes = ALL_QUIZZES.filter(
    (quiz) => !solvedQuizzes.includes(quiz.id)
  );

  return unsolvedQuizzes.length >= recommendCount
    ? unsolvedQuizzes.slice(0, recommendCount)
    : ALL_QUIZZES.slice(0, recommendCount);
}
