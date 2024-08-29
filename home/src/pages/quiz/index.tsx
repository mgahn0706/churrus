import GlobalHeader from "@/components/Navigation/GlobalHeader";
import QuizCard from "@/features/quiz/components/QuizCard";
import { QuizData } from "@/features/quiz/fixtures/quizzes";
import {
  NavigateBeforeRounded,
  NavigateNextRounded,
  TaskAltRounded,
} from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { MEETINGS, MEETING_IDS } from "@/features/quiz/fixtures/meetings";

const BACKGROUND_COLOR = "#F5F6FA";

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
        <Box
          height="100vh"
          overflow="scroll"
          px={[2, 6, 8]}
          width="100%"
          pb={6}
          bgcolor={BACKGROUND_COLOR}
        >
          <Box
            width="100%"
            textAlign="left"
            color="#212837"
            mt={[3, 4, "100px"]}
            mb={[2, 3, 4]}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                fontSize={24}
                fontWeight={700}
                fontFamily="NanumSquareEB"
              >
                문제적 추러스
              </Typography>
              <Tooltip title="푼 문제 수">
                <Box
                  width="100px"
                  height="40px"
                  px="20px"
                  borderRadius="20px"
                  display="flex"
                  bgcolor="#d6e7f8"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <TaskAltRounded
                    sx={{
                      color: "#318AE1",
                    }}
                  />
                  <Typography fontSize={14} color="#121212" fontWeight={700}>
                    {solvedQuiz.length} /{" "}
                    {Object.values(QuizData).flat().length}
                  </Typography>
                </Box>
              </Tooltip>
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={3}
          >
            <Grid container spacing={[3, 4, 6]} width="100%">
              {MEETING_IDS.map((meetingId) => MEETINGS[meetingId].title)}
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}
