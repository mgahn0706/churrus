import GlobalHeader from "@/components/Navigation/GlobalHeader";
import { QuizData } from "@/features/quiz/fixtures/quizzes";
import { TaskAltRounded } from "@mui/icons-material";
import { Box, Grid, Tooltip, Typography } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import { MEETING_IDS } from "@/features/quiz/fixtures/meetings";
import MeetingCard from "@/features/quiz/components/MeetingCard";
import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import useLocalStorage from "@/hooks/useLocalStorage";

const BACKGROUND_COLOR = "#F5F6FA";

export default function Quiz() {
  const cardXs = useResponsiveValue([12, 12, 6]);

  const [solvedQuizzes] = useLocalStorage<string[]>("quiz", []);

  return (
    <>
      <Head>
        <title>문제적 추러스 : 서울대 추리 동아리</title>
      </Head>
      <GlobalHeader />
      <Box
        height={1}
        bgcolor={BACKGROUND_COLOR}
        display="flex"
        justifyContent="center"
      >
        <Box
          mx={[4, 6, 8]}
          width={1}
          mb={6}
          bgcolor={BACKGROUND_COLOR}
          maxWidth="938px"
        >
          <Box
            width="100%"
            textAlign="left"
            color="#212837"
            mt={[3, 8, "80px"]}
            mb={[1, 2, 3]}
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
                    {solvedQuizzes.length} /{" "}
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
            mb={7}
          >
            <Grid
              container
              rowSpacing={1}
              columnSpacing={[0, 0, 3]}
              width="100%"
            >
              {MEETING_IDS.map((meetingId) => (
                <Grid item xs={12}>
                  <MeetingCard meetingId={meetingId} key={meetingId} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}
