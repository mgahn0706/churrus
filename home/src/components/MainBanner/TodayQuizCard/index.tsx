import { MeetingData, QuizData } from "@/features/quiz/fixtures";
import { QuizType } from "@/features/quiz/types";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import { ArrowCircleLeft, ArrowCircleRight } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import router from "next/router";
import { useState } from "react";

const today = dayjs().diff(dayjs("2024-01-01"), "day");

export default function TodayQuizCard() {
  const isMobileWidth = useResponsiveValue([true, true, false]);

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
    <Box display="flex" justifyContent="center" mb={3}>
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
      </Box>

      <Card
        elevation={6}
        sx={{
          borderRadius: "20px",
          width: isMobileWidth ? "225px" : "400px",
          minHeight: isMobileWidth ? "150px" : "290px",
        }}
      >
        <CardActionArea
          sx={{
            p: 2,
          }}
          onClick={() => {
            router.push(`/quiz/${todayQuiz.id}`);
          }}
        >
          <CardMedia
            component="img"
            height="194px"
            image={todayQuiz.quizImgSrc}
            alt={todayQuiz.title}
            sx={{
              borderRadius: "4px",
            }}
          />
          <CardContent>
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
        </CardActionArea>
      </Card>

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
    </Box>
  );
}
