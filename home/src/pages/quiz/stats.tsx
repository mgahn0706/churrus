import GlobalHeader from "@/components/Navigation/GlobalHeader";
import { QUIZ_TAG_KOREAN_NAME } from "@/features/quiz/fixtures/tagName";
import {
  ALL_QUIZZES,
  QUIZ_CREATOR_STATS,
  QUIZ_YEAR_STATS,
  getMeetingById,
} from "@/features/quiz/domain";
import { QuizType, Tags } from "@/features/quiz/types";
import {
  ArrowBackRounded,
  BarChartRounded,
  EmojiEventsRounded,
  FilterAltRounded,
  GroupsRounded,
  LocalOfferRounded,
  QuizRounded,
  RestartAltRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  Grid,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const BACKGROUND_COLOR = "#F5F6FA";
const CARD_BACKGROUND = "#FFFFFF";
const CARD_BORDER = "#E6EAF2";
const ALL_FILTER_VALUE = "ALL";

interface CreatorStat {
  creator: string;
  quizCount: number;
  meetingCount: number;
  latestMeetingId: string;
}

interface YearStat {
  year: number;
  quizCount: number;
  meetingCount: number;
  creatorCount: number;
}

interface TagStat {
  tag: Tags;
  quizCount: number;
}

interface InsightChipData {
  color: string;
  backgroundColor: string;
  icon: JSX.Element;
  text: string;
}

const StatCard = ({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) => (
  <Box
    bgcolor={CARD_BACKGROUND}
    border={`1px solid ${CARD_BORDER}`}
    borderRadius="14px"
    py={1.25}
    px={1.5}
    minHeight={88}
    boxShadow="0 8px 18px rgba(20, 20, 20, 0.03)"
    display="flex"
    flexDirection="column"
    justifyContent="center"
  >
    <Typography color="#667085" fontSize={12} fontWeight={600}>
      {label}
    </Typography>
    <Typography mt={0.75} color="#111827" fontSize={26} fontWeight={700}>
      {value}
    </Typography>
    <Typography mt={0.25} color="#667085" fontSize={12} lineHeight={1.35}>
      {helper}
    </Typography>
  </Box>
);

const SectionCard = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <Box
    bgcolor={CARD_BACKGROUND}
    border={`1px solid ${CARD_BORDER}`}
    borderRadius="24px"
    p={[2.5, 3, 4]}
    boxShadow="0 18px 34px rgba(20, 20, 20, 0.04)"
  >
    <Typography color="#111827" fontSize={24} fontWeight={700}>
      {title}
    </Typography>
    <Typography color="#667085" fontSize={14} mt={0.75} mb={3}>
      {description}
    </Typography>
    {children}
  </Box>
);

const getMeetingSortValue = (meetingId: string) => {
  const meeting = getMeetingById(meetingId);

  if (!meeting) {
    return -1;
  }

  return meeting.date.year * 100 + meeting.date.month;
};

const getCreatorStats = (quizzes: QuizType[]): CreatorStat[] =>
  Object.entries(
    quizzes.reduce<
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

const getYearStats = (quizzes: QuizType[]): YearStat[] =>
  Object.entries(
    quizzes.reduce<
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

const getTagStats = (quizzes: QuizType[]): TagStat[] =>
  Object.entries(
    quizzes.reduce<Record<string, number>>((acc, quiz) => {
      quiz.tags.forEach((tag) => {
        acc[tag] = (acc[tag] ?? 0) + 1;
      });

      return acc;
    }, {})
  )
    .map(([tag, quizCount]) => ({
      tag: tag as Tags,
      quizCount,
    }))
    .sort((a, b) => {
      if (b.quizCount !== a.quizCount) {
        return b.quizCount - a.quizCount;
      }

      return a.tag.localeCompare(b.tag);
    });

const getTagRatioInsight = ({
  focusQuizzes,
  comparisonQuizzes,
  subject,
}: {
  focusQuizzes: QuizType[];
  comparisonQuizzes: QuizType[];
  subject: string;
}): string | null => {
  if (focusQuizzes.length === 0 || comparisonQuizzes.length === 0) {
    return null;
  }

  const focusTagCounts = focusQuizzes.reduce<Record<string, number>>(
    (acc, quiz) => {
      quiz.tags.forEach((tag) => {
        acc[tag] = (acc[tag] ?? 0) + 1;
      });

      return acc;
    },
    {}
  );

  const comparisonTagCounts = comparisonQuizzes.reduce<Record<string, number>>(
    (acc, quiz) => {
      quiz.tags.forEach((tag) => {
        acc[tag] = (acc[tag] ?? 0) + 1;
      });

      return acc;
    },
    {}
  );

  const focusTagInsight = Object.entries(focusTagCounts)
    .map(([tag, count]) => {
      const focusRatio = count / focusQuizzes.length;
      const comparisonRatio =
        (comparisonTagCounts[tag] ?? 0) / comparisonQuizzes.length;
      const lift = focusRatio / Math.max(comparisonRatio, 0.01);

      return {
        tag: tag as Tags,
        count,
        ratioGap: focusRatio - comparisonRatio,
        focusRatio,
        comparisonRatio,
        lift,
      };
    })
    .filter(
      (tagInsight) =>
        tagInsight.count >= 3 &&
        tagInsight.focusRatio >= 0.12 &&
        tagInsight.ratioGap >= 0.08
    )
    .sort((a, b) => {
      if (b.lift !== a.lift) {
        return b.lift - a.lift;
      }

      return b.ratioGap - a.ratioGap;
    })[0];

  if (!focusTagInsight) {
    return null;
  }

  return `${subject} 다른 출제자보다 ${
    QUIZ_TAG_KOREAN_NAME[focusTagInsight.tag]
  } 유형 비율이 높아요. ${Math.round(
    focusTagInsight.focusRatio * 100
  )}% vs ${Math.round(focusTagInsight.comparisonRatio * 100)}%`;
};

const getMeetingConcentrationInsight = ({
  quizzes,
  subject,
}: {
  quizzes: QuizType[];
  subject: string;
}): string | null => {
  if (quizzes.length === 0) {
    return null;
  }

  const byMeeting = quizzes.reduce<Record<string, number>>((acc, quiz) => {
    acc[quiz.meetingId] = (acc[quiz.meetingId] ?? 0) + 1;
    return acc;
  }, {});

  const topMeetingEntry = Object.entries(byMeeting).sort((a, b) => {
    if (b[1] !== a[1]) {
      return b[1] - a[1];
    }

    return getMeetingSortValue(b[0]) - getMeetingSortValue(a[0]);
  })[0];

  if (!topMeetingEntry) {
    return null;
  }

  const [meetingId, quizCount] = topMeetingEntry;
  const meeting = getMeetingById(meetingId);
  const share = quizCount / quizzes.length;

  if (share < 0.4) {
    return null;
  }

  return `${subject} 문제의 ${Math.round(share * 100)}%가 ${
    meeting?.subtitle ?? meeting?.title ?? meetingId
  }에 몰려 있어요.`;
};

const getYearTagInsight = ({
  year,
  focusQuizzes,
  comparisonQuizzes,
}: {
  year: string;
  focusQuizzes: QuizType[];
  comparisonQuizzes: QuizType[];
}): string | null => {
  const insight = getTagRatioInsight({
    focusQuizzes,
    comparisonQuizzes,
    subject: `${year}년은`,
  });

  if (!insight) {
    return null;
  }

  return insight.replace("다른 출제자보다", "다른 연도보다");
};

const getBusiestMeeting = (quizzes: QuizType[]) => {
  const byMeeting = quizzes.reduce<Record<string, number>>((acc, quiz) => {
    acc[quiz.meetingId] = (acc[quiz.meetingId] ?? 0) + 1;
    return acc;
  }, {});

  const busiestMeetingId = Object.entries(byMeeting).sort((a, b) => {
    if (b[1] !== a[1]) {
      return b[1] - a[1];
    }

    return getMeetingSortValue(b[0]) - getMeetingSortValue(a[0]);
  })[0]?.[0];

  return busiestMeetingId ? getMeetingById(busiestMeetingId) : undefined;
};

export default function QuizStatsPage() {
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState<string>(ALL_FILTER_VALUE);
  const [selectedCreator, setSelectedCreator] =
    useState<string>(ALL_FILTER_VALUE);

  const yearOptions = QUIZ_YEAR_STATS.map((stat) => String(stat.year));
  const creatorOptions = QUIZ_CREATOR_STATS.map((stat) => stat.creator);

  const filteredQuizzes = ALL_QUIZZES.filter((quiz) => {
    const meeting = getMeetingById(quiz.meetingId);
    const matchesYear =
      selectedYear === ALL_FILTER_VALUE ||
      String(meeting?.date.year) === selectedYear;
    const matchesCreator =
      selectedCreator === ALL_FILTER_VALUE ||
      quiz.creators.includes(selectedCreator);

    return matchesYear && matchesCreator;
  });

  const filteredCreatorStats = getCreatorStats(filteredQuizzes);
  const filteredYearStats = getYearStats(filteredQuizzes);
  const filteredTagStats = getTagStats(filteredQuizzes);
  const topCreator = filteredCreatorStats[0];
  const busiestMeeting = getBusiestMeeting(filteredQuizzes);
  const meetingCount = new Set(filteredQuizzes.map((quiz) => quiz.meetingId))
    .size;
  const creatorCount = new Set(filteredQuizzes.flatMap((quiz) => quiz.creators))
    .size;
  const averageQuizCountPerMeeting = Number(
    (filteredQuizzes.length / Math.max(meetingCount, 1)).toFixed(1)
  );
  const maxCreatorQuizCount = filteredCreatorStats[0]?.quizCount ?? 1;
  const maxTagQuizCount = filteredTagStats[0]?.quizCount ?? 1;
  const hasActiveFilter =
    selectedYear !== ALL_FILTER_VALUE || selectedCreator !== ALL_FILTER_VALUE;
  const isCreatorFiltered = selectedCreator !== ALL_FILTER_VALUE;
  const isYearFiltered = selectedYear !== ALL_FILTER_VALUE;
  const leftColumnMd = isCreatorFiltered && !isYearFiltered ? 4 : 7;
  const rightColumnMd = isCreatorFiltered && !isYearFiltered ? 8 : 5;
  const resolvedLeftColumnMd =
    !isCreatorFiltered && isYearFiltered ? 8 : leftColumnMd;
  const resolvedRightColumnMd =
    !isCreatorFiltered && isYearFiltered ? 4 : rightColumnMd;
  const busiestMeetingQuizCount = busiestMeeting
    ? filteredQuizzes.filter((quiz) => quiz.meetingId === busiestMeeting.id)
        .length
    : 0;
  const selectedCreatorQuizzes = isCreatorFiltered
    ? filteredQuizzes.filter((quiz) => quiz.creators.includes(selectedCreator))
    : [];
  const otherCreatorQuizzes = isCreatorFiltered
    ? ALL_QUIZZES.filter((quiz) => !quiz.creators.includes(selectedCreator))
    : [];
  const selectedYearQuizzes = isYearFiltered ? filteredQuizzes : [];
  const otherYearQuizzes = isYearFiltered
    ? ALL_QUIZZES.filter((quiz) => {
        const meeting = getMeetingById(quiz.meetingId);
        return String(meeting?.date.year) !== selectedYear;
      })
    : [];
  const topCreatorQuizzes = topCreator
    ? filteredQuizzes.filter((quiz) =>
        quiz.creators.includes(topCreator.creator)
      )
    : [];
  const nonTopCreatorQuizzes = topCreator
    ? filteredQuizzes.filter(
        (quiz) => !quiz.creators.includes(topCreator.creator)
      )
    : [];
  const creatorTagInsight = isCreatorFiltered
    ? getTagRatioInsight({
        focusQuizzes: selectedCreatorQuizzes,
        comparisonQuizzes: otherCreatorQuizzes,
        subject: `${selectedCreator}은(는)`,
      })
    : topCreator
    ? getTagRatioInsight({
        focusQuizzes: topCreatorQuizzes,
        comparisonQuizzes: nonTopCreatorQuizzes,
        subject: `${topCreator.creator}은(는)`,
      })
    : null;
  const creatorMeetingInsight = isCreatorFiltered
    ? getMeetingConcentrationInsight({
        quizzes: selectedCreatorQuizzes,
        subject: `${selectedCreator}`,
      })
    : topCreator
    ? getMeetingConcentrationInsight({
        quizzes: topCreatorQuizzes,
        subject: `${topCreator.creator}`,
      })
    : null;
  const yearTagInsight = isYearFiltered
    ? getYearTagInsight({
        year: selectedYear,
        focusQuizzes: selectedYearQuizzes,
        comparisonQuizzes: otherYearQuizzes,
      })
    : null;
  const yearMeetingInsight = isYearFiltered
    ? getMeetingConcentrationInsight({
        quizzes: selectedYearQuizzes,
        subject: `${selectedYear}년`,
      })
    : null;
  const highlightInsights: InsightChipData[] = [];

  if (isCreatorFiltered) {
    highlightInsights.push({
      icon: <EmojiEventsRounded />,
      text: `${selectedCreator} 출제 문제 ${filteredQuizzes.length}개가 현재 조건에 포함됩니다.`,
      backgroundColor: "#FFF7E8",
      color: "#9A6700",
    });
  } else if (isYearFiltered) {
    highlightInsights.push({
      icon: <EmojiEventsRounded />,
      text: `${selectedYear}년 문제 ${filteredQuizzes.length}개가 현재 조건에 포함됩니다.`,
      backgroundColor: "#FFF7E8",
      color: "#9A6700",
    });
  } else if (topCreator) {
    highlightInsights.push({
      icon: <EmojiEventsRounded />,
      text: `${topCreator.creator}이(가) 현재 조건에서 가장 많은 ${topCreator.quizCount}문제를 출제했습니다.`,
      backgroundColor: "#FFF7E8",
      color: "#9A6700",
    });
  }

  if (isCreatorFiltered && creatorTagInsight) {
    highlightInsights.push({
      icon: <LocalOfferRounded />,
      text: creatorTagInsight,
      backgroundColor: "#EEF4FF",
      color: "#235DA8",
    });
  }

  if (isCreatorFiltered && creatorMeetingInsight) {
    highlightInsights.push({
      icon: <GroupsRounded />,
      text: creatorMeetingInsight,
      backgroundColor: "#F3F4F6",
      color: "#344054",
    });
  }

  if (!isCreatorFiltered && isYearFiltered && yearTagInsight) {
    highlightInsights.push({
      icon: <LocalOfferRounded />,
      text: yearTagInsight,
      backgroundColor: "#EEF4FF",
      color: "#235DA8",
    });
  }

  if (!isCreatorFiltered && isYearFiltered && yearMeetingInsight) {
    highlightInsights.push({
      icon: <GroupsRounded />,
      text: yearMeetingInsight,
      backgroundColor: "#F3F4F6",
      color: "#344054",
    });
  }

  if (!isCreatorFiltered && !isYearFiltered && creatorTagInsight) {
    highlightInsights.push({
      icon: <LocalOfferRounded />,
      text: creatorTagInsight,
      backgroundColor: "#EEF4FF",
      color: "#235DA8",
    });
  }

  if (!isCreatorFiltered && !isYearFiltered && creatorMeetingInsight) {
    highlightInsights.push({
      icon: <GroupsRounded />,
      text: creatorMeetingInsight,
      backgroundColor: "#F3F4F6",
      color: "#344054",
    });
  }

  return (
    <>
      <Head>
        <title>문제적 추러스 통계</title>
      </Head>
      <GlobalHeader />
      <Box
        minHeight="100dvh"
        bgcolor={BACKGROUND_COLOR}
        display="flex"
        justifyContent="center"
        sx={{
          backgroundImage:
            "radial-gradient(1000px 500px at 0% 0%, #EEF4FF 0%, transparent 60%), radial-gradient(900px 420px at 100% 0%, #F8EEE5 0%, transparent 50%)",
        }}
      >
        <Box width="100%" maxWidth="1100px" px={[2, 3, 4]} pb={8}>
          <Box pt={[3, 7, "88px"]} pb={4}>
            <Button
              startIcon={<ArrowBackRounded />}
              sx={{ color: "#475467", mb: 2 }}
              onClick={() => router.push("/quiz")}
            >
              문제 목록으로 돌아가기
            </Button>
            <Box>
              <Chip
                icon={<BarChartRounded />}
                label="Quiz Dashboard"
                sx={{
                  bgcolor: "#E8F1FF",
                  color: "#235DA8",
                  fontWeight: 700,
                  mb: 2,
                }}
              />
              <Typography
                color="#111827"
                fontSize={[28, 34, 40]}
                fontWeight={700}
              >
                문제적 추러스 통계
              </Typography>
              <Typography color="#667085" fontSize={15} mt={1}>
                필터 조건에 맞는 세부 통계를 깔끔하게 볼 수 있습니다.
              </Typography>
            </Box>
          </Box>

          <Stack
            direction={["column", "column", "row"]}
            alignItems={["stretch", "stretch", "center"]}
            justifyContent="space-between"
            gap={1.5}
            bgcolor="rgba(255,255,255,0.75)"
            border={`1px solid ${CARD_BORDER}`}
            borderRadius="18px"
            p={[1.5, 2]}
            mb={3}
            boxShadow="0 10px 24px rgba(20, 20, 20, 0.04)"
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              flexWrap="wrap"
              useFlexGap
            >
              <Chip
                icon={<FilterAltRounded />}
                label="Filter"
                size="small"
                sx={{
                  bgcolor: "#F3F6FB",
                  color: "#344054",
                  fontWeight: 700,
                }}
              />
              <Typography color="#667085" fontSize={13}>
                {selectedYear === ALL_FILTER_VALUE ? "전체 연도" : selectedYear}
              </Typography>
              <Typography color="#D0D5DD" fontSize={13}>
                /
              </Typography>
              <Typography color="#667085" fontSize={13}>
                {selectedCreator === ALL_FILTER_VALUE
                  ? "전체 출제자"
                  : selectedCreator}
              </Typography>
              <Typography color="#98A2B3" fontSize={13}>
                · {filteredQuizzes.length}문제
              </Typography>
            </Stack>

            <Stack
              direction={["column", "row"]}
              spacing={1}
              width={["100%", "auto"]}
            >
              <FormControl size="small" sx={{ minWidth: [1, 130] }}>
                <Select
                  value={selectedYear}
                  onChange={(event) => setSelectedYear(event.target.value)}
                  sx={{
                    bgcolor: "#FFFFFF",
                    borderRadius: "12px",
                    height: 38,
                    fontSize: 14,
                  }}
                >
                  <MenuItem value={ALL_FILTER_VALUE}>전체 연도</MenuItem>
                  {yearOptions.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: [1, 150] }}>
                <Select
                  value={selectedCreator}
                  onChange={(event) => setSelectedCreator(event.target.value)}
                  sx={{
                    bgcolor: "#FFFFFF",
                    borderRadius: "12px",
                    height: 38,
                    fontSize: 14,
                  }}
                >
                  <MenuItem value={ALL_FILTER_VALUE}>전체 출제자</MenuItem>
                  {creatorOptions.map((creator) => (
                    <MenuItem key={creator} value={creator}>
                      {creator}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant="text"
                startIcon={<RestartAltRounded />}
                sx={{
                  minHeight: 38,
                  borderRadius: "12px",
                  color: "#667085",
                  px: 1.25,
                }}
                onClick={() => {
                  setSelectedYear(ALL_FILTER_VALUE);
                  setSelectedCreator(ALL_FILTER_VALUE);
                }}
                disabled={!hasActiveFilter}
              >
                초기화
              </Button>
            </Stack>
          </Stack>

          <Grid container spacing={2} mb={3}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                label="현재 문제 수"
                value={`${filteredQuizzes.length}`}
                helper="필터 적용 후 기준"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                label="현재 모임 수"
                value={`${meetingCount}`}
                helper={`모임당 평균 ${averageQuizCountPerMeeting}문제`}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                label="현재 출제자 수"
                value={`${creatorCount}`}
                helper="creators 배열 기준"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                label="가장 큰 모임"
                value={`${busiestMeetingQuizCount}`}
                helper={
                  busiestMeeting
                    ? busiestMeeting.subtitle ?? busiestMeeting.title
                    : "일치하는 모임 없음"
                }
              />
            </Grid>
          </Grid>

          {filteredQuizzes.length === 0 ? (
            <Box
              bgcolor={CARD_BACKGROUND}
              border={`1px solid ${CARD_BORDER}`}
              borderRadius="24px"
              p={[4, 5]}
              textAlign="center"
              boxShadow="0 18px 34px rgba(20, 20, 20, 0.04)"
            >
              <Typography color="#111827" fontSize={24} fontWeight={700}>
                조건에 맞는 문제가 없습니다
              </Typography>
              <Typography color="#667085" fontSize={14} mt={1}>
                다른 연도나 출제자를 선택하거나 필터를 초기화해 보세요.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {hasActiveFilter && highlightInsights.length > 0 && (
                <Grid item xs={12}>
                  <SectionCard
                    title="하이라이트"
                    description="현재 필터를 기준으로 비교가 되는 해석형 인사이트를 보여줍니다."
                  >
                    <Stack spacing={1.5}>
                      {highlightInsights.map((insight) => (
                        <Chip
                          key={insight.text}
                          icon={insight.icon}
                          label={insight.text}
                          sx={{
                            justifyContent: "flex-start",
                            height: "auto",
                            py: 1,
                            px: 1,
                            bgcolor: insight.backgroundColor,
                            color: insight.color,
                            "& .MuiChip-label": {
                              whiteSpace: "normal",
                            },
                          }}
                        />
                      ))}
                    </Stack>
                  </SectionCard>
                </Grid>
              )}

              <Grid item xs={12} md={resolvedLeftColumnMd}>
                <Stack spacing={3}>
                  {!isCreatorFiltered && (
                    <SectionCard
                      title="출제자 랭킹"
                      description="현재 필터에 포함된 문제 기준으로 누가 가장 많이 출제했는지 보여줍니다."
                    >
                      <Box position="relative">
                        <Stack
                          spacing={2}
                          sx={{
                            maxHeight: 420,
                            overflowY: "auto",
                            pr: 0.5,
                            pb: filteredCreatorStats.length > 5 ? 6 : 0,
                          }}
                        >
                          {filteredCreatorStats.map((stat, index) => {
                            const meeting = getMeetingById(
                              stat.latestMeetingId
                            );
                            const progressValue =
                              (stat.quizCount / maxCreatorQuizCount) * 100;

                            return (
                              <Box key={stat.creator}>
                                <Box
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems="center"
                                  gap={2}
                                  mb={1}
                                >
                                  <Box minWidth={0}>
                                    <Typography
                                      color="#111827"
                                      fontSize={16}
                                      fontWeight={700}
                                    >
                                      {index + 1}. {stat.creator}
                                    </Typography>
                                    <Typography color="#667085" fontSize={13}>
                                      {stat.meetingCount}개 모임 참여
                                      {meeting
                                        ? ` · 최근 ${
                                            meeting.subtitle ?? meeting.title
                                          }`
                                        : ""}
                                    </Typography>
                                  </Box>
                                  <Typography
                                    color="#235DA8"
                                    fontSize={15}
                                    fontWeight={700}
                                    whiteSpace="nowrap"
                                  >
                                    {stat.quizCount}문제
                                  </Typography>
                                </Box>
                                <LinearProgress
                                  variant="determinate"
                                  value={progressValue}
                                  sx={{
                                    height: 10,
                                    borderRadius: 999,
                                    bgcolor: "#EDF2F7",
                                    "& .MuiLinearProgress-bar": {
                                      borderRadius: 999,
                                      bgcolor:
                                        index === 0 ? "#318AE1" : "#7BB0EA",
                                    },
                                  }}
                                />
                              </Box>
                            );
                          })}
                        </Stack>

                        {filteredCreatorStats.length > 5 && (
                          <Box
                            position="absolute"
                            left={0}
                            right={0}
                            bottom={0}
                            height={88}
                            display="flex"
                            alignItems="flex-end"
                            justifyContent="center"
                            pb={1}
                            sx={{
                              pointerEvents: "none",
                              background:
                                "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.92) 58%, rgba(255,255,255,1) 100%)",
                            }}
                          />
                        )}
                      </Box>
                    </SectionCard>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} md={resolvedRightColumnMd}>
                <Stack spacing={3}>
                  {!isYearFiltered && (
                    <SectionCard
                      title="연도별 추이"
                      description="연도 필터가 없을 때 전체 연도 분포를 비교할 수 있습니다."
                    >
                      <Box position="relative">
                        <Stack
                          divider={<Divider flexItem />}
                          spacing={1}
                          sx={{
                            maxHeight: 420,
                            overflowY: "auto",
                            pr: 0.5,
                            pb: filteredYearStats.length > 5 ? 6 : 0,
                          }}
                        >
                          {filteredYearStats.map((stat) => (
                            <Box
                              key={stat.year}
                              display="flex"
                              alignItems="center"
                              justifyContent="space-between"
                              py={1}
                              gap={2}
                            >
                              <Box>
                                <Typography
                                  color="#111827"
                                  fontSize={17}
                                  fontWeight={700}
                                >
                                  {stat.year}
                                </Typography>
                                <Typography color="#667085" fontSize={13}>
                                  {stat.meetingCount}개 모임 · 출제자{" "}
                                  {stat.creatorCount}명
                                </Typography>
                              </Box>
                              <Chip
                                icon={<QuizRounded />}
                                label={`${stat.quizCount}문제`}
                                sx={{
                                  bgcolor: "#EEF4FF",
                                  color: "#235DA8",
                                  fontWeight: 700,
                                }}
                              />
                            </Box>
                          ))}
                        </Stack>

                        {filteredYearStats.length > 5 && (
                          <Box
                            position="absolute"
                            left={0}
                            right={0}
                            bottom={0}
                            height={88}
                            display="flex"
                            alignItems="flex-end"
                            justifyContent="center"
                            pb={1}
                            sx={{
                              pointerEvents: "none",
                              background:
                                "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.92) 58%, rgba(255,255,255,1) 100%)",
                            }}
                          />
                        )}
                      </Box>
                    </SectionCard>
                  )}

                  <SectionCard
                    title="문제 유형 분포"
                    description="현재 조건에서 등장한 모든 유형을 확인할 수 있습니다."
                  >
                    <Box position="relative">
                      <Stack
                        spacing={1.5}
                        sx={{
                          maxHeight: 420,
                          overflowY: "auto",
                          pr: 0.5,
                          pb: filteredTagStats.length > 5 ? 6 : 0,
                        }}
                      >
                        {filteredTagStats.map((stat) => (
                          <Box key={stat.tag}>
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                              mb={0.75}
                            >
                              <Chip
                                icon={<LocalOfferRounded />}
                                label={QUIZ_TAG_KOREAN_NAME[stat.tag]}
                                sx={{
                                  bgcolor: "#F3F4F6",
                                  color: "#344054",
                                  fontWeight: 700,
                                }}
                              />
                              <Typography
                                color="#344054"
                                fontSize={14}
                                fontWeight={700}
                              >
                                {stat.quizCount}
                              </Typography>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={(stat.quizCount / maxTagQuizCount) * 100}
                              sx={{
                                height: 8,
                                borderRadius: 999,
                                bgcolor: "#F0F2F5",
                                "& .MuiLinearProgress-bar": {
                                  borderRadius: 999,
                                  bgcolor: "#F59E0B",
                                },
                              }}
                            />
                          </Box>
                        ))}
                      </Stack>

                      {filteredTagStats.length > 5 && (
                        <Box
                          position="absolute"
                          left={0}
                          right={0}
                          bottom={0}
                          height={88}
                          display="flex"
                          alignItems="flex-end"
                          justifyContent="center"
                          pb={1}
                          sx={{
                            pointerEvents: "none",
                            background:
                              "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.92) 58%, rgba(255,255,255,1) 100%)",
                          }}
                        />
                      )}
                    </Box>
                  </SectionCard>

                  <SectionCard
                    title="기준 정보"
                    description="전체 데이터셋과 현재 필터 범위를 함께 확인합니다."
                  >
                    <Stack spacing={1.5}>
                      <Chip
                        label={`전체 데이터 ${ALL_QUIZZES.length}문제 · ${QUIZ_CREATOR_STATS.length}명`}
                        sx={{
                          justifyContent: "flex-start",
                          bgcolor: "#F3F4F6",
                          color: "#344054",
                          fontWeight: 700,
                        }}
                      />
                      <Chip
                        label={`현재 필터 ${filteredQuizzes.length}문제 · ${creatorCount}명`}
                        sx={{
                          justifyContent: "flex-start",
                          bgcolor: "#EEF4FF",
                          color: "#235DA8",
                          fontWeight: 700,
                        }}
                      />
                      <Chip
                        label={
                          isYearFiltered
                            ? `${selectedYear}년 데이터만 표시 중`
                            : "연도 제한 없음"
                        }
                        sx={{
                          justifyContent: "flex-start",
                          bgcolor: "#FFF4E8",
                          color: "#B54708",
                          fontWeight: 700,
                        }}
                      />
                    </Stack>
                  </SectionCard>
                </Stack>
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
    </>
  );
}
