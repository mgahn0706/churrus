import { Box, Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";

import Head from "next/head";
import { MEETINGS } from "@/features/quiz/fixtures/meetings";

import QuizCard from "@/features/quiz/components/QuizCard";
import Image from "next/image";
import MeetingCard from "@/features/quiz/components/MeetingCard";
import GlobalHeader from "@/components/Navigation/GlobalHeader";
import useSolvedQuizzes from "@/features/quiz/hooks/useSolvedQuizzes";
import {
  getMeetingCreators,
  getMeetingQuizzes,
  getRandomOtherMeetingIds,
} from "@/features/quiz/domain";

const BACKGROUND_COLOR = "#F9FAFC";

export default function MeetingPage() {
  const { isSolved } = useSolvedQuizzes();

  const router = useRouter();

  const { id } = router.query;

  if (!id) {
    return (
      <Box display="flex" justifyContent="center" bgcolor={BACKGROUND_COLOR}>
        loading...
      </Box>
    );
  }
  const meetingId = Array.isArray(id) ? id[0] : id;
  const meeting = meetingId ? MEETINGS[meetingId] : undefined;

  if (!meeting) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor={BACKGROUND_COLOR}
        minHeight="100vh"
        flexDirection="column"
        gap={2}
      >
        <Typography>존재하지 않는 모임입니다.</Typography>
        <Button onClick={() => router.push("/quiz")}>문제 목록으로 이동</Button>
      </Box>
    );
  }

  const meetingQuizzes = getMeetingQuizzes(meeting.id);
  const creators = getMeetingCreators(meeting.id);
  const otherMeetingIds = getRandomOtherMeetingIds(meeting.id, 4);

  return (
    <>
      <Head>
        <title>{meeting.title} : 문제적 추러스 </title>
      </Head>
      <GlobalHeader />
      <Box
        height={1}
        mt={[0, 0, 6]}
        bgcolor={BACKGROUND_COLOR}
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        alignItems="center"
      >
        <Box
          height={["190px", "270px", "300px"]}
          maxWidth="800px"
          width={1}
          position="relative"
          mb={2}
        >
          <Image
            alt="meeting"
            style={{
              borderRadius: "0 0 12px 12px",
            }}
            src={
              meeting.imageSource ??
              meetingQuizzes[0]?.quizImageSource ??
              "/image/quiz/meeting/default.png"
            }
            fill
          />
          <Box
            zIndex={2}
            flexDirection="column"
            justifyContent={["center", "center", "flex-end"]}
            alignItems={["center", "center", "start"]}
            display="flex"
            position="absolute"
            width={1}
            height={1}
            pt={1}
            borderRadius="0 0 12px 12px"
            sx={{
              backdropFilter: "blur(12px)",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0) 7%, rgba(255,255,255,1) 90%, rgba(255,255,255,1) 100%)",
            }}
          >
            <Box display="flex" flexDirection="column" px={3} mt={2}>
              <Typography color="#606B80" fontSize="12px" mb={1}>
                {meeting.subtitle}
              </Typography>
              <Typography fontWeight="bold" fontSize="24px">
                {meeting.title}
              </Typography>
              <Typography color="#606B80" fontSize="16px" mb={2}>
                {creators.join(", ")}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          mx={[4, 6, 12]}
          width={1}
          mb={6}
          bgcolor={BACKGROUND_COLOR}
          maxWidth="800px"
        >
          <Box display="flex" mt={3} justifyContent="space-between">
            <Box
              display="flex"
              flexDirection="column"
              maxWidth="530px"
              px={3}
              alignItems="center"
            >
              <Box
                display="flex"
                justifyContent="flex-start"
                width="100%"
                alignItems="center"
              >
                <Typography color="#121212" fontSize="14px">
                  문제 {`(${meeting.quizIds.length})`}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb={7}
              >
                <Grid
                  container
                  rowSpacing="4px"
                  columnSpacing={[0, 0, 3]}
                  width="100%"
                >
                  {meetingQuizzes.map((quiz) => (
                    <Grid item xs={12} key={quiz.id}>
                      <QuizCard quiz={quiz} isSolved={isSolved(quiz.id)} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>

            <Box
              display={["none", "none", "flex"]}
              flexDirection="column"
              width="270px"
              pl={2}
            >
              <Box display="flex" flexDirection="column">
                <Typography color="#121212" fontSize="12px">
                  설명
                </Typography>
                <Typography
                  color="#606B80"
                  fontSize="14px"
                  sx={{
                    wordBreak: "keep-all",
                  }}
                >
                  {meeting.date.year}년 {meeting.date.month}월에 열린{" "}
                  {meeting.subtitle ?? meeting.title}에서 진행됨
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column" mt={4}>
                <Typography color="#121212" fontSize="14px" mb={1}>
                  다른 모임들
                </Typography>

                {otherMeetingIds.map((otherMeetingId) => (
                  <Box key={otherMeetingId} mb="4px">
                    <MeetingCard size="small" meetingId={otherMeetingId} />
                  </Box>
                ))}
                <Button
                  variant="text"
                  size="small"
                  sx={{
                    width: "100px",
                    color: "#606B80",
                    justifyContent: "flex-start",
                  }}
                  onClick={() => router.push("/quiz")}
                >
                  더보기
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
