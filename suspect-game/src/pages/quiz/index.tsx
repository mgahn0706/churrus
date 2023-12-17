import GlobalHeader from "@/components/Navigation/GlobalHeader";
import QuizCard from "@/features/quiz/components/QuizCard";
import { MEETINGS, QuizData } from "@/features/quiz/fixtures";
import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import { Box, Divider, Grid, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const BACKGROUND_COLOR = "#fffef8";

export default function Quiz() {
  const [solvedQuiz, setSolvedQuiz] = useState<string[]>([]);

  const router = useRouter();

  useEffect(() => {
    const solvedQuizzes = JSON.parse(localStorage.getItem("quiz") ?? "[]");
    setSolvedQuiz(solvedQuizzes);
  }, []);

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
        <Box height="100vh" overflow="scroll" maxWidth={1200} px={4}>
          <Box width="100%" textAlign="center" color="#212837" mt="100px">
            <Typography
              variant="h3"
              fontWeight={600}
              fontFamily="NanumSquareEB"
            >
              문제적 추러스
            </Typography>
            <Typography
              variant="h6"
              fontFamily={"NanumSquareEB"}
              sx={{
                wordBreak: "keep-all",
              }}
            >
              역대 정기모임에 있었던 문제들을 풀어볼 수 있어요.
            </Typography>
          </Box>

          {MEETINGS.map((meeting) => (
            <Box mb="100px">
              <Divider
                textAlign="left"
                light
                sx={{
                  color: "white",
                  mb: 3,
                  mt: 10,
                  fontSize: "1.2rem",
                  "&::before, &::after": {
                    borderColor: "white",
                  },
                }}
              >
                {meeting}
              </Divider>
              <Grid container spacing={3}>
                {QuizData[meeting].map((quiz) => (
                  <QuizCard
                    isSolved={solvedQuiz.includes(quiz.id)}
                    key={quiz.id}
                    quiz={quiz}
                    month={meeting.split(" ")[1]}
                  />
                ))}
              </Grid>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
