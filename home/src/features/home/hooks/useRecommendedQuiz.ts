import { MEETING_IDS } from "@/features/quiz/fixtures/meetings";
import { QuizData } from "@/features/quiz/fixtures/quizzes";
import useLocalStorage from "@/hooks/useLocalStorage";

const ALL_QUIZZES = MEETING_IDS.flatMap((meetingId) => QuizData[meetingId]);
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
