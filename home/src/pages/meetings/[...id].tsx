import { QuizData } from "@/features/quiz/fixtures/quizzes";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { CloseRounded } from "@mui/icons-material";

import Head from "next/head";
import { MEETINGS } from "@/features/quiz/fixtures/meetings";

import QuizCard from "@/features/quiz/components/QuizCard";
import useLocalStorage from "@/hooks/useLocalStorage";

const BACKGROUND_COLOR = "#F9FAFC";

export default function MeetingPage() {
  const [solvedQuizzes] = useLocalStorage<string[]>("quiz", []);

  const router = useRouter();

  const { id } = router.query;

  if (!id) {
    return (
      <Box display="flex" justifyContent="center" bgcolor={BACKGROUND_COLOR}>
        loading...
      </Box>
    );
  }
  const meeting = MEETINGS[id[0]];

  const creators = Array.from(
    new Set(
      QuizData[meeting.id]
        .filter((quiz) => !!quiz.creator)
        .map((quiz) => quiz.creator)
    )
  );

  return (
    <>
      <Head>
        <title>문제적 추러스 : {meeting.title}</title>
      </Head>
      <Box
        height={1}
        bgcolor={BACKGROUND_COLOR}
        display="flex"
        minHeight="100vh"
        justifyContent="center"
      >
        <Box
          mx={[4, 6, 8]}
          width={1}
          mb={6}
          bgcolor={BACKGROUND_COLOR}
          maxWidth="1200px"
        >
          <Box
            display="flex"
            alignItems="center"
            height={60}
            width="100%"
            justifyContent="space-between"
            position="fixed"
            sx={{
              backdropFilter: "blur(2px)",
            }}
          >
            <IconButton
              size="large"
              sx={{
                px: 0,
                color: "#212837",
              }}
              onClick={() => {
                router.push(`/quiz`);
              }}
            >
              <CloseRounded />
            </IconButton>
          </Box>

          <Box
            height="170px"
            display="flex"
            flexDirection="column"
            alignItems="start"
            justifyContent="flex-end"
          >
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
          <Box
            display="flex"
            flexDirection="column"
            mt={2}
            width="calc(100% - 48px)"
            maxWidth="1200px"
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
                {QuizData[meeting.id].map((quiz) => (
                  <Grid item xs={12}>
                    <QuizCard
                      quiz={quiz}
                      isSolved={solvedQuizzes.includes(quiz.id)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
