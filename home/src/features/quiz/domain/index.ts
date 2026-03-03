import { MEETING_IDS, MEETINGS } from "../fixtures/meetings";
import { QuizData } from "../fixtures/quizzes";
import { MeetingType, QuizType } from "../types";

export const ALL_QUIZZES = MEETING_IDS.flatMap((meetingId) => QuizData[meetingId]);

export const QUIZ_BY_ID = ALL_QUIZZES.reduce<Record<string, QuizType>>(
  (acc, quiz) => {
    acc[quiz.id] = quiz;
    return acc;
  },
  {}
);

export const MEETING_IDS_BY_YEAR = Object.entries(MEETINGS).reduce<
  Record<number, string[]>
>((acc, [meetingId, meeting]) => {
  const year = meeting.date.year;
  if (!acc[year]) {
    acc[year] = [];
  }
  acc[year].push(meetingId);
  return acc;
}, {});

export const getQuizById = (quizId: string) => QUIZ_BY_ID[quizId];

export const getMeetingById = (meetingId: string): MeetingType | undefined =>
  MEETINGS[meetingId];

export const getMeetingQuizzes = (meetingId: string): QuizType[] =>
  QuizData[meetingId] ?? [];

export const getMeetingCreators = (meetingId: string): string[] =>
  Array.from(
    new Set(
      getMeetingQuizzes(meetingId)
        .map((quiz) => quiz.creator)
        .filter((creator): creator is string => !!creator)
    )
  );

export const getPrevNextQuizIds = (quiz: QuizType) => {
  const meeting = getMeetingById(quiz.meetingId);
  if (!meeting) {
    return { prevQuizId: undefined, nextQuizId: undefined };
  }

  const currentIndex = meeting.quizIds.indexOf(quiz.id);
  if (currentIndex === -1) {
    return { prevQuizId: undefined, nextQuizId: undefined };
  }

  return {
    prevQuizId: meeting.quizIds[currentIndex - 1],
    nextQuizId: meeting.quizIds[currentIndex + 1],
  };
};

const shuffle = <T,>(list: T[]): T[] => {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[randomIndex]] = [copy[randomIndex], copy[i]];
  }
  return copy;
};

export const getRandomQuizId = (): string | undefined => {
  const meetingId = MEETING_IDS[Math.floor(Math.random() * MEETING_IDS.length)];
  const quizzes = getMeetingQuizzes(meetingId);

  if (quizzes.length === 0) {
    return undefined;
  }

  return quizzes[Math.floor(Math.random() * quizzes.length)].id;
};

export const getRandomOtherMeetingIds = (
  currentMeetingId: string,
  count: number
): string[] => {
  return shuffle(MEETING_IDS.filter((id) => id !== currentMeetingId)).slice(
    0,
    count
  );
};
