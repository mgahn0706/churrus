import GlobalHeader from "@/components/Navigation/GlobalHeader";
import QuizCard from "@/features/quiz/components/QuizCard";
import { MEETINGS, MeetingData, QuizData } from "@/features/quiz/fixtures";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

const BACKGROUND_COLOR = "#ffffff";

type MeetingType = (typeof MEETINGS)[number];

export default function Quiz() {
  const [solvedQuiz, setSolvedQuiz] = useState<string[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedMeeting =
    (searchParams.get("meeting") as MeetingType) ?? MEETINGS[0];

  useEffect(() => {
    const solvedQuizzes = JSON.parse(localStorage.getItem("quiz") ?? "[]");
    setSolvedQuiz(solvedQuizzes);
  }, []);

  useEffect(() => {
    if (!MeetingData[selectedMeeting]) {
      router.push(`/quiz?meeting=${MEETINGS[0]}`);
    }
  }, [selectedMeeting]);

  return (
    <>
      <Head>
        <title>문제적 추러스 : 서울대 추리 동아리</title>
      </Head>
      <GlobalHeader />
      <Box
        height="100dvh"
        bgcolor={BACKGROUND_COLOR}
        display="flex"
        justifyContent="center"
      >
        <Box
          height="100vh"
          overflow="scroll"
          px={[3, 4, 12]}
          width="100%"
          pb={6}
          bgcolor={BACKGROUND_COLOR}
        >
          <Box
            width="100%"
            textAlign="left"
            color="#212837"
            mt="80px"
            mb={[2, 3, 4]}
          >
            <Typography
              fontSize={["1.5rem", "2rem", "2rem"]}
              fontWeight={600}
              fontFamily="NanumSquareEB"
            >
              문제적 추러스
            </Typography>
            <Typography
              color="gray"
              fontFamily={"NanumSquareEB"}
              sx={{
                wordBreak: "keep-all",
              }}
            >
              역대 정기모임에 있었던 문제들을 풀어볼 수 있어요.
            </Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={3}
          >
            <IconButton
              disabled={
                MEETINGS.indexOf(selectedMeeting) === MEETINGS.length - 1
              }
              onClick={() => {
                const index = MEETINGS.indexOf(selectedMeeting);
                if (index === MEETINGS.length - 1) return;
                router.push(`/quiz?meeting=${MEETINGS[index + 1]}`);
              }}
            >
              <ArrowBackIos />
            </IconButton>
            <Box
              minHeight="58px"
              minWidth="250px"
              justifyContent="center"
              alignItems="center"
              lineHeight="58px"
              display="flex"
              flexDirection="column"
            >
              <Typography
                variant="h5"
                fontWeight={600}
                fontFamily="NanumSquareEB"
                sx={{
                  wordBreak: "keep-all",
                }}
              >
                {MeetingData[selectedMeeting]?.title}
              </Typography>
              {MeetingData[selectedMeeting]?.subtitle && (
                <Typography
                  textAlign="center"
                  variant="body1"
                  fontFamily={"NanumSquareEB"}
                  sx={{
                    wordBreak: "keep-all",
                  }}
                >
                  {MeetingData[selectedMeeting].subtitle}
                </Typography>
              )}
            </Box>
            <IconButton
              disabled={MEETINGS.indexOf(selectedMeeting) === 0}
              onClick={() => {
                const index = MEETINGS.indexOf(selectedMeeting);
                if (index === 0) return;
                router.push(`/quiz?meeting=${MEETINGS[index - 1]}`);
              }}
            >
              <ArrowForwardIos />
            </IconButton>
          </Box>

          <Grid container spacing={3} width="100%">
            {QuizData[selectedMeeting]?.map((quiz) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                isSolved={solvedQuiz.includes(quiz.id)}
                bgColor={MeetingData[selectedMeeting]?.color ?? "#fffef8"}
              />
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
