import GlobalHeader from "@/components/Navigation/GlobalHeader";
import QuizCard from "@/features/quiz/components/QuizCard";
import { MEETINGS, MeetingData, QuizData } from "@/features/quiz/fixtures";
import {
  Lightbulb,
  NavigateBefore,
  NavigateBeforeRounded,
  NavigateNext,
  NavigateNextRounded,
  TaskAltRounded,
} from "@mui/icons-material";
import {
  Box,
  Grid,
  Icon,
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

const BACKGROUND_COLOR = "#F5F6FA";

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
            justifyContent="space-between"
            alignItems="center"
            mt={[3, 4, 5]}
            mb={3}
          >
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              minWidth="300px"
            >
              <IconButton
                sx={{
                  backgroundColor: "white",
                }}
                disabled={
                  MEETINGS.indexOf(selectedMeeting) === MEETINGS.length - 1
                }
                onClick={() => {
                  const index = MEETINGS.indexOf(selectedMeeting);
                  if (index === MEETINGS.length - 1) return;
                  router.push(`/quiz?meeting=${MEETINGS[index + 1]}`);
                }}
              >
                <NavigateBeforeRounded
                  sx={{
                    fontSize: "2rem",
                  }}
                />
              </IconButton>
              <Box
                minHeight="58px"
                minWidth="220px"
                justifyContent="center"
                alignItems="center"
                lineHeight="58px"
                display="flex"
                flexDirection="column"
              >
                <Select
                  variant="standard"
                  sx={{
                    fontSize: "1.2rem",
                  }}
                  inputProps={{
                    fontSize: 18,
                  }}
                  value={selectedMeeting}
                  onChange={(e) => {
                    router.push(`/quiz?meeting=${e.target.value}`);
                  }}
                >
                  {MEETINGS.map((meeting) => (
                    <MenuItem key={meeting} value={meeting}>
                      {MeetingData[meeting]?.title}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <IconButton
                sx={{
                  backgroundColor: "white",
                }}
                disabled={MEETINGS.indexOf(selectedMeeting) === 0}
                onClick={() => {
                  const index = MEETINGS.indexOf(selectedMeeting);
                  if (index === 0) return;
                  router.push(`/quiz?meeting=${MEETINGS[index - 1]}`);
                }}
              >
                <NavigateNextRounded
                  sx={{
                    fontSize: "2rem",
                  }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={3}
          >
            <Grid container spacing={[3, 4, 6]} width="100%">
              {QuizData[selectedMeeting]?.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                  isSolved={solvedQuiz.includes(quiz.id)}
                />
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}
