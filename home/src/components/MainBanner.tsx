import { MeetingData, QuizData } from "@/features/quiz/fixtures";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ArrowCircleLeft, ArrowCircleRight } from "@mui/icons-material";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import dayjs from "dayjs";

import { useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

const BANNER_COLOR = "#ffffff";

const today = dayjs().diff(dayjs("2024-01-01"), "day");
const spellingBeeDate = dayjs().diff("2024-02-09", "day");

export default function MainBanner() {
  const router = useRouter();

  const [solvedQuizzes] = useLocalStorage<string[]>("quiz", []);
  const [foundWords] = useLocalStorage<{
    day: number;
    answers: string[];
  }>("spelling-bee-answers", {
    day: 0,
    answers: [],
  });

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
    <Box display="flex" justifyContent="center" alignItems="center" my="64px">
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        p={4}
        sx={{
          bgcolor: BANNER_COLOR,
        }}
      >
        <Typography color="black" fontSize={32} fontWeight="bold">
          오늘의 콘텐츠
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          width="100%"
          height="450px"
          alignItems="center"
        >
          <CardActionArea
            sx={{
              width: "280px",
              minHeight: "100px",
              mr: 10,
              borderRadius: "20px",
            }}
            onClick={() => {
              router.push("/spelling-bee");
            }}
          >
            <Card
              elevation={3}
              sx={{
                p: 2,
                borderRadius: "20px",
              }}
            >
              <CardContent>
                <Box
                  mb={2}
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box display="flex" flexDirection="column">
                    <Typography color="black" fontSize={18} fontWeight="bold">
                      {spellingBeeDate + 1}일째
                    </Typography>
                    <Typography color="black" fontSize={18} fontWeight="bold">
                      스펠링비
                    </Typography>
                  </Box>
                  <Image
                    src="/image/logo/spellingbee-logo.png"
                    width={40}
                    height={40}
                    alt="spellingbee-logo"
                  />
                </Box>

                <Typography variant="body2" color="text.secondary">
                  {foundWords.answers.length > 0
                    ? `${foundWords.answers.length}개의 단어를 찾았어요.`
                    : "아직 시작하지 않았어요."}
                </Typography>
              </CardContent>
            </Card>
          </CardActionArea>

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
              width: "400px",
              minHeight: "290px",
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
                height="194"
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
          <CardActionArea
            sx={{
              width: "280px",
              minHeight: "100px",
              ml: 10,
              borderRadius: "20px",
            }}
            onClick={() => {
              router.push("/connections");
            }}
          >
            <Card
              elevation={3}
              sx={{
                p: 2,
                borderRadius: "20px",
              }}
            >
              <CardContent>
                <Box
                  mb={2}
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box display="flex" flexDirection="column">
                    <Typography color="black" fontSize={18} fontWeight="bold">
                      Week {dayjs().diff("2024-01-01", "week") + 1}
                    </Typography>
                    <Typography color="black" fontSize={18} fontWeight="bold">
                      추러스 커넥션
                    </Typography>
                  </Box>
                  <Image
                    src="/image/logo/connections-logo.png"
                    width={40}
                    height={40}
                    alt="spellingbee-logo"
                  />
                </Box>

                <Typography variant="body2" color="text.secondary">
                  네 개씩 네 묶음으로.
                </Typography>
              </CardContent>
            </Card>
          </CardActionArea>
        </Box>
      </Box>
    </Box>
  );
}
