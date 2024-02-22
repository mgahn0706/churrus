import { MeetingData, QuizData } from "@/features/quiz/fixtures";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
  ArrowCircleLeft,
  ArrowCircleRight,
  ArrowForward,
  ArrowForwardIos,
} from "@mui/icons-material";
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
import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import TodayQuizCard from "./MainBanner/TodayQuizCard";

const BANNER_COLOR = "#ffffff";

const spellingBeeDate = dayjs().diff("2024-02-09", "day");

export default function MainBanner() {
  const router = useRouter();
  const isMobileWidth = useResponsiveValue([true, true, false]);

  const [foundWords] = useLocalStorage<{
    day: number;
    answers: string[];
  }>("spelling-bee-answers", {
    day: 0,
    answers: [],
  });

  if (isMobileWidth) {
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
          justifyContent="center"
        >
          <Typography
            color="black"
            fontSize={32}
            fontWeight="bold"
            sx={{
              mb: 4,
            }}
          >
            오늘의 콘텐츠
          </Typography>
          <TodayQuizCard />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={3}
            sx={{
              "&:hover": {
                cursor: "pointer",
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                transition: "0.1s",
              },
            }}
            mt={4}
            onClick={() => {
              router.push("/spelling-bee");
            }}
          >
            <Box display="flex" flexDirection="row" alignItems="center" gap={3}>
              <Image
                src="/image/logo/spellingbee-logo.png"
                width={40}
                height={40}
                alt="spellingbee-logo"
              />
              <Box display="flex" flexDirection="column">
                <Typography color="black" fontSize={18} fontWeight="bold">
                  {spellingBeeDate + 1}일째 스펠링 비
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {foundWords.answers.length > 0 &&
                  foundWords.day === spellingBeeDate
                    ? `${foundWords.answers.length}개의 단어를 찾았어요.`
                    : "아직 시작하지 않았어요."}
                </Typography>
              </Box>
            </Box>
            <ArrowForwardIos color="action" />
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={3}
            mt={4}
            sx={{
              "&:hover": {
                cursor: "pointer",
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                transition: "0.1s",
              },
            }}
            onClick={() => {
              router.push("/connections");
            }}
          >
            <Box display="flex" flexDirection="row" alignItems="center" gap={3}>
              <Image
                src="/image/logo/connections-logo.png"
                width={40}
                height={40}
                alt="spellingbee-logo"
              />
              <Box display="flex" flexDirection="column">
                <Typography color="black" fontSize={18} fontWeight="bold">
                  Week {dayjs().diff("2024-01-01", "week") + 1} 추러스 커넥션
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  네 개씩 네 묶음으로.
                </Typography>
              </Box>
            </Box>
            <ArrowForwardIos color="action" />
          </Box>
        </Box>
      </Box>
    );
  }

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
                  {foundWords.answers.length > 0 &&
                  foundWords.day === spellingBeeDate
                    ? `${foundWords.answers.length}개의 단어를 찾았어요.`
                    : "아직 시작하지 않았어요."}
                </Typography>
              </CardContent>
            </Card>
          </CardActionArea>

          <TodayQuizCard />

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
