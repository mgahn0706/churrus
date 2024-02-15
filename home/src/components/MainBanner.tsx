import { MeetingData, QuizData } from "@/features/quiz/fixtures";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
  ArrowCircleLeft,
  ArrowCircleRight,
  ArrowLeft,
  ArrowRight,
  PlayArrowSharp,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  IconButton,
} from "@mui/material";
import dayjs from "dayjs";
import router from "next/router";
import { useEffect, useState } from "react";
import ImageWithPlaceHolder from "./ImageWithPlaceholder";

const BANNER_COLOR = "#4b89da";

const today = dayjs().diff(dayjs("2024-01-01"), "day");

export default function MainBanner() {
  const [solvedQuizzes] = useLocalStorage<string[]>("quiz", []);

  const [selectedQuizIndex, setSelectedQuizIndex] = useState(0);

  const unsolvedQuizzes = Object.values(QuizData)
    .flatMap((quiz) => quiz)
    .filter((quiz) => {
      return !solvedQuizzes.includes(quiz.id) && !quiz.shouldWarn;
    })
    .reverse();

  const todayQuiz =
    unsolvedQuizzes[(today + selectedQuizIndex) % unsolvedQuizzes.length];

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt="64px">
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        height="450px"
        alignItems="center"
        sx={{
          bgcolor: BANNER_COLOR,
        }}
      >
        <Card
          elevation={4}
          sx={{
            width: "470px",
            p: 2,
            minHeight: "290px",
          }}
        >
          <CardHeader
            sx={{
              pb: 0,
            }}
            titleTypographyProps={{
              sx: {
                fontSize: "1.5rem",
                fontWeight: "bold",
              },
            }}
            title="오늘의 추천 퀴즈"
            subheader="아직 풀지 않은 문제에서 골랐어요."
          />
          <CardContent>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="row"
              color="#c7c7c7"
              textAlign="center"
            >
              <IconButton
                color="inherit"
                onClick={() => setSelectedQuizIndex(selectedQuizIndex + 1)}
              >
                <ArrowCircleLeft />
              </IconButton>

              <CardActionArea
                onClick={() => {
                  router.push(`/quiz/${todayQuiz.id}`);
                }}
                sx={{
                  borderRadius: "0.5rem",
                }}
              >
                <ImageWithPlaceHolder
                  src={todayQuiz.quizImgSrc}
                  alt={todayQuiz.title}
                  width={360}
                  height={180}
                  style={{
                    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)",
                    borderRadius: "0.5rem",
                    margin: "8px",
                  }}
                />
              </CardActionArea>

              <IconButton
                color="inherit"
                onClick={() => {
                  setSelectedQuizIndex(
                    selectedQuizIndex - 1 < 0
                      ? unsolvedQuizzes.length - 1
                      : selectedQuizIndex - 1
                  );
                }}
              >
                <ArrowCircleRight />
              </IconButton>
            </Box>

            <Typography
              color="black"
              fontSize={24}
              fontWeight="bold"
              textAlign="center"
            >
              {todayQuiz.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              {
                MeetingData[
                  Object.keys(QuizData).find((meeting) =>
                    QuizData[meeting].includes(todayQuiz)
                  ) || ""
                ].title
              }
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
