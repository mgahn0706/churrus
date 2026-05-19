import { MEETING_IDS, MEETINGS } from "../fixtures/meetings";
import {
  QUIZ_TAG_META,
  QUIZ_TAG_EMOJI,
  QUIZ_TAG_IMAGE_SOURCE,
  QUIZ_TAG_KOREAN_NAME,
  QUIZ_TAG_SLUG,
  QUIZ_TAGS,
} from "../fixtures/tagName";
import { QuizData } from "../fixtures/quizzes";
import { MeetingType, QuizType, Tags } from "../types";

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

export const MEETING_YEAR_GROUPS = Object.entries(MEETING_IDS_BY_YEAR)
  .sort((a, b) => Number(b[0]) - Number(a[0]))
  .map(([year, meetingIds]) => ({
    year,
    meetingIds: [...meetingIds].sort(
      (a, b) => MEETINGS[b].date.month - MEETINGS[a].date.month
    ),
  }));

export const getQuizById = (quizId: string) => QUIZ_BY_ID[quizId];

export const getMeetingById = (meetingId: string): MeetingType | undefined =>
  MEETINGS[meetingId];

export const getMeetingQuizzes = (meetingId: string): QuizType[] =>
  QuizData[meetingId] ?? [];

export const getQuizCreators = (quiz: QuizType): string[] => quiz.creators;

export const getQuizCreatorsLabel = (quiz: QuizType): string =>
  getQuizCreators(quiz).join(", ");

export const getMeetingCreators = (meetingId: string): string[] =>
  Array.from(new Set(getMeetingQuizzes(meetingId).flatMap((quiz) => quiz.creators)));

const getMeetingSortValue = (meetingId: string) => {
  const meeting = getMeetingById(meetingId);

  if (!meeting) {
    return -1;
  }

  return meeting.date.year * 100 + meeting.date.month;
};

const MEETING_ORDER_BY_ID = MEETING_IDS.reduce<Record<string, number>>(
  (acc, meetingId, index) => {
    acc[meetingId] = index;
    return acc;
  },
  {}
);

export const compareQuizzesByChronology = (
  leftQuiz: QuizType,
  rightQuiz: QuizType
) => {
  const meetingOrderDifference =
    (MEETING_ORDER_BY_ID[leftQuiz.meetingId] ?? Number.MAX_SAFE_INTEGER) -
    (MEETING_ORDER_BY_ID[rightQuiz.meetingId] ?? Number.MAX_SAFE_INTEGER);

  if (meetingOrderDifference !== 0) {
    return meetingOrderDifference;
  }

  if (leftQuiz.quizNumber !== rightQuiz.quizNumber) {
    return leftQuiz.quizNumber - rightQuiz.quizNumber;
  }

  return leftQuiz.id.localeCompare(rightQuiz.id, "ko");
};

export const compareQuizzesByRecentFirst = (
  leftQuiz: QuizType,
  rightQuiz: QuizType
) => {
  const chronologyDifference = compareQuizzesByChronology(rightQuiz, leftQuiz);

  if (chronologyDifference !== 0 && leftQuiz.meetingId !== rightQuiz.meetingId) {
    return chronologyDifference;
  }

  if (leftQuiz.meetingId === rightQuiz.meetingId) {
    if (rightQuiz.quizNumber !== leftQuiz.quizNumber) {
      return rightQuiz.quizNumber - leftQuiz.quizNumber;
    }
  }

  return chronologyDifference;
};

export interface QuizCreatorStat {
  creator: string;
  quizCount: number;
  meetingCount: number;
  latestMeetingId: string;
}

export interface QuizYearStat {
  year: number;
  quizCount: number;
  meetingCount: number;
  creatorCount: number;
}

export interface QuizTagStat {
  tag: string;
  quizCount: number;
}

export interface QuizTagGroup {
  tag: Tags;
  label: string;
  emoji: string;
  slug: string;
  imageSource: string;
  shortDescription: string;
  longDescription: string;
  quizCount: number;
}

export const QUIZ_CREATOR_STATS: QuizCreatorStat[] = Object.entries(
  ALL_QUIZZES.reduce<
    Record<
      string,
      {
        quizCount: number;
        meetingIds: Set<string>;
        latestMeetingId: string;
      }
    >
  >((acc, quiz) => {
    quiz.creators.forEach((creator) => {
      if (!acc[creator]) {
        acc[creator] = {
          quizCount: 0,
          meetingIds: new Set<string>(),
          latestMeetingId: quiz.meetingId,
        };
      }

      acc[creator].quizCount += 1;
      acc[creator].meetingIds.add(quiz.meetingId);

      if (
        getMeetingSortValue(quiz.meetingId) >
        getMeetingSortValue(acc[creator].latestMeetingId)
      ) {
        acc[creator].latestMeetingId = quiz.meetingId;
      }
    });

    return acc;
  }, {})
)
  .map(([creator, stats]) => ({
    creator,
    quizCount: stats.quizCount,
    meetingCount: stats.meetingIds.size,
    latestMeetingId: stats.latestMeetingId,
  }))
  .sort((a, b) => {
    if (b.quizCount !== a.quizCount) {
      return b.quizCount - a.quizCount;
    }

    if (b.meetingCount !== a.meetingCount) {
      return b.meetingCount - a.meetingCount;
    }

    if (
      getMeetingSortValue(b.latestMeetingId) !==
      getMeetingSortValue(a.latestMeetingId)
    ) {
      return (
        getMeetingSortValue(b.latestMeetingId) -
        getMeetingSortValue(a.latestMeetingId)
      );
    }

    return a.creator.localeCompare(b.creator, "ko");
  });

export const QUIZ_YEAR_STATS: QuizYearStat[] = Object.entries(
  ALL_QUIZZES.reduce<
    Record<
      number,
      {
        quizCount: number;
        meetingIds: Set<string>;
        creators: Set<string>;
      }
    >
  >((acc, quiz) => {
    const meeting = getMeetingById(quiz.meetingId);

    if (!meeting) {
      return acc;
    }

    if (!acc[meeting.date.year]) {
      acc[meeting.date.year] = {
        quizCount: 0,
        meetingIds: new Set<string>(),
        creators: new Set<string>(),
      };
    }

    acc[meeting.date.year].quizCount += 1;
    acc[meeting.date.year].meetingIds.add(quiz.meetingId);

    quiz.creators.forEach((creator) => {
      acc[meeting.date.year].creators.add(creator);
    });

    return acc;
  }, {})
)
  .map(([year, stats]) => ({
    year: Number(year),
    quizCount: stats.quizCount,
    meetingCount: stats.meetingIds.size,
    creatorCount: stats.creators.size,
  }))
  .sort((a, b) => b.year - a.year);

export const QUIZ_TAG_STATS: QuizTagStat[] = Object.entries(
  ALL_QUIZZES.reduce<Record<string, number>>((acc, quiz) => {
    quiz.tags.forEach((tag) => {
      acc[tag] = (acc[tag] ?? 0) + 1;
    });

    return acc;
  }, {})
)
  .map(([tag, quizCount]) => ({
    tag,
    quizCount,
  }))
  .sort((a, b) => {
    if (b.quizCount !== a.quizCount) {
      return b.quizCount - a.quizCount;
    }

    return a.tag.localeCompare(b.tag);
  });

export const QUIZ_TAG_GROUPS: QuizTagGroup[] = QUIZ_TAGS.map((tag) => ({
  tag,
  label: QUIZ_TAG_KOREAN_NAME[tag],
  emoji: QUIZ_TAG_EMOJI[tag],
  slug: QUIZ_TAG_SLUG[tag],
  imageSource: QUIZ_TAG_IMAGE_SOURCE[tag],
  shortDescription: QUIZ_TAG_META[tag].shortDescription,
  longDescription: QUIZ_TAG_META[tag].longDescription,
  quizCount: ALL_QUIZZES.filter((quiz) => quiz.tags.includes(tag)).length,
})).filter(({ quizCount }) => quizCount > 0);

export const getQuizzesByTag = (tag: Tags): QuizType[] =>
  ALL_QUIZZES.filter((quiz) => quiz.tags.includes(tag)).sort(
    compareQuizzesByRecentFirst
  );

export const getQuizTagGroup = (tag: Tags): QuizTagGroup | undefined =>
  QUIZ_TAG_GROUPS.find((tagGroup) => tagGroup.tag === tag);

export const getTagBySlug = (slug: string): Tags | undefined =>
  QUIZ_TAGS.find((tag) => QUIZ_TAG_SLUG[tag] === slug);

const sortedMeetingsByQuizCount = [...MEETING_IDS].sort((a, b) => {
  const quizCountDifference = getMeetingQuizzes(b).length - getMeetingQuizzes(a).length;

  if (quizCountDifference !== 0) {
    return quizCountDifference;
  }

  return getMeetingSortValue(b) - getMeetingSortValue(a);
});

export const QUIZ_STATS_SUMMARY = {
  totalQuizCount: ALL_QUIZZES.length,
  totalMeetingCount: MEETING_IDS.length,
  totalCreatorCount: QUIZ_CREATOR_STATS.length,
  topCreator: QUIZ_CREATOR_STATS[0],
  busiestMeetingId: sortedMeetingsByQuizCount[0],
  averageQuizCountPerMeeting: Number(
    (ALL_QUIZZES.length / Math.max(MEETING_IDS.length, 1)).toFixed(1)
  ),
};

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
