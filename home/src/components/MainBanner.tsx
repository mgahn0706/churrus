import { MeetingData, QuizData } from "@/features/quiz/fixtures";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
  ArrowCircleLeft,
  ArrowCircleRight,
  ArrowForward,
  ArrowForwardIos,
  Mail,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  CardMedia,
  CardActionArea,
  Icon,
} from "@mui/material";
import dayjs from "dayjs";

import { useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";
import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import TodayQuizCard from "./MainBanner/TodayQuizCard";

const BANNER_COLOR = "#318AE1";

const BANNER_TEXT = {
  title: "추러스 24-1기 모집 종료",
  subtitle: "결과 안내: 3/24(일)",
};

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
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          p={4}
          borderRadius="20px"
          minHeight="100px"
          sx={{
            background: `linear-gradient(180deg, rgba(49,138,225,1) 0%, rgba(27,75,123,1) 100%)`,
          }}
          justifyContent="flex-end"
        >
          <Typography color="white" fontSize={24} fontWeight="bold" zIndex={2}>
            {BANNER_TEXT.title}
          </Typography>
          <Typography
            color="white"
            fontSize={18}
            fontWeight="medium"
            zIndex={2}
          >
            {BANNER_TEXT.subtitle}
          </Typography>
          <Box
            position="absolute"
            color="#11283D"
            sx={{
              width: 100,
              filter: "blur(3px)",
              transform: "rotate(-12deg)",
              right: 0,
            }}
          >
            <Mail
              sx={{
                fontSize: 100,
              }}
            />
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
