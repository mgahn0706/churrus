import { Box, Button, Card, CardActionArea, Typography } from "@mui/material";
import GlobalHeader from "@/components/Navigation/GlobalHeader";

import dayjs from "dayjs";
import { useRouter } from "next/router";
import { ArrowForward, ArrowForwardIos, Search } from "@mui/icons-material";
import MobilePuzzleCard from "@/features/home/components/MobilePuzzleCard";
import useLocalStorage from "@/hooks/useLocalStorage";
import HomeQuizCard from "@/features/home/components/HomeQuizCard";
import PuzzleButton from "@/features/home/components/PuzzleButton";
import useRecommendedQuiz from "@/features/home/hooks/useRecommendedQuiz";
import weekOfYear from "dayjs/plugin/weekOfYear";
import Image from "next/image";
import DesktopPuzzleCard from "@/features/home/components/DesktopPuzzleCard";
import { CROSSWORDS } from "@/features/crosswords/fixtures";
import Head from "next/head";

const WORD_PUZZLE_CONTENTS = [
  {
    title: "스펠링 비",
    src: "/image/logo/spellingbee-logo.png",
    color: "#f6cf6a",
    url: "/spelling-bee",
  },
  {
    title: "추러스 커넥션",
    src: "/image/logo/connections-logo.png",
    color: "#bda9b0",
    url: "/connections",
  },
  {
    title: "추로스워드",
    src: "/image/logo/crossword-logo.png",
    color: "#4b89da",
    url: "/crosswords",
  },
];

dayjs.extend(weekOfYear);

const BACKGROUND_COLOR = "#F5F6FA";

const MoreGamesButton = ({ onClick }: { onClick: () => void }) => {
  <CardActionArea
    sx={{
      borderRadius: "20px",
    }}
    onClick={onClick}
  >
    <Card
      sx={{
        border: "2px solid #9798a1",
        bgcolor: "#f2f4f5",
        minHeight: 60,
        color: "#121212",
        alignItems: "center",
        borderRadius: "20px",
        verticalAlign: "middle",
        display: "flex",
        px: 2,
      }}
    >
      <Typography
        color="#202836"
        textAlign="center"
        fontSize="18px"
        sx={{
          width: "100%",
          wordBreak: "keep-all",
        }}
      >
        더보기
      </Typography>
      <ArrowForwardIos
        sx={{
          fontSize: "0.8rem",
        }}
      />
    </Card>
  </CardActionArea>;
};

const spellingBeeDate = dayjs().diff("2024-02-09", "day") + 1;

export default function Churrus() {
  const router = useRouter();

  const [foundWords] = useLocalStorage<{
    day: number;
    answers: string[];
  }>("spelling-bee-answers", {
    day: 0,
    answers: [],
  });

  const recommendedQuiz = useRecommendedQuiz({
    recommendCount: 8,
  });

  const recentCrosswordDate = CROSSWORDS[CROSSWORDS.length - 1].date;

  return (
    <>
      <Head>
        <title>추러스 : 서울대학교 중앙 추리동아리</title>
      </Head>
      <GlobalHeader />
      <Box
        bgcolor={BACKGROUND_COLOR}
        minWidth="100vw"
        minHeight="100vh"
        py={[4, 4, 0]}
      >
        <Box
          mx={[2, 2, 0]}
          mt={[0, 0, "48px"]}
          display="flex"
          justifyContent="center"
          flexDirection="column"
        >
          <Box display={["flex", "flex", "none"]} mb={3} alignItems="center">
            <Image
              alt="churrus-logo"
              width={36}
              height={30}
              src="/image/churrus-icon.svg"
            />
            <Box display="flex" flexDirection="column" ml="8px">
              <Typography color="#6B6B6B" fontSize={12}>
                서울대학교 중앙 추리동아리
              </Typography>
              <Typography fontWeight={700} color="#121212" fontSize={18}>
                추러스
              </Typography>
            </Box>
          </Box>
          <Box
            display={["none", "none", "flex"]}
            bgcolor="#ffffff"
            justifyContent="center"
            width="100%"
            py={6}
          >
            <Box
              display="flex"
              width={["100%", "100%", "60%"]}
              flexDirection="column"
            >
              <Typography
                color="#121212"
                fontWeight="700"
                fontSize={18}
                sx={{
                  mb: 1,
                }}
              >
                정기 퍼즐
              </Typography>
              <Box display="flex" justifyContent="space-between">
                <DesktopPuzzleCard
                  src="/image/logo/spellingbee-logo.png"
                  title={`${spellingBeeDate}일째 스펠링비`}
                  subtitle={
                    foundWords.answers.length > 0 &&
                    foundWords.day === spellingBeeDate
                      ? `${foundWords.answers.length}개의 단어를 찾았어요.`
                      : "아직 시작하지 않았어요."
                  }
                  onClick={() => router.push("/spelling-bee")}
                />
                <DesktopPuzzleCard
                  src="/image/logo/connections-logo.png"
                  title={`Week ${dayjs().week()} 추러스 커넥션`}
                  subtitle="네 단어씩 네 묶음으로."
                  onClick={() => router.push("/connections")}
                />
                <DesktopPuzzleCard
                  src="/image/logo/crossword-logo.png"
                  title={`
                    ${recentCrosswordDate.year}년 ${recentCrosswordDate.month}월 추로스워드`}
                  subtitle="창의적인 십자말풀이."
                  onClick={() => router.push("/crosswords")}
                />
              </Box>
            </Box>
          </Box>
          <Box display={["block", "block", "none"]} mt="24px">
            <MobilePuzzleCard
              src="/image/logo/spellingbee-logo.png"
              title={`${spellingBeeDate}일째 스펠링비`}
              subtitle={
                foundWords.answers.length > 0 &&
                foundWords.day === spellingBeeDate
                  ? `${foundWords.answers.length}개의 단어를 찾았어요.`
                  : "아직 시작하지 않았어요."
              }
              sx={{ mb: 1 }}
              onClick={() => router.push("/spelling-bee")}
            />
            <MobilePuzzleCard
              src="/image/logo/connections-logo.png"
              title={`Week ${dayjs().week()} 추러스 커넥션`}
              subtitle="네 단어씩 네 묶음으로."
              onClick={() => router.push("/connections")}
            />
          </Box>
          <Box
            mx="auto"
            mt="52px"
            width="100%"
            display="flex"
            justifyContent="center"
          >
            <Box width={["100%", "100%", "60%"]} mb={5}>
              <Box
                display="flex"
                width={1}
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                <Typography color="#121212" fontWeight="700" fontSize={18}>
                  문제적 추러스
                </Typography>
                <Button
                  variant="text"
                  onClick={() => router.push("/quiz")}
                  sx={{
                    color: "#318AE1",
                    fontSize: "16px",
                  }}
                >
                  전체 보기
                  <ArrowForward
                    sx={{
                      fontSize: "16px",
                    }}
                  />
                </Button>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                overflow="auto"
                py={1}
                position="relative"
              >
                {recommendedQuiz.map((quiz) => (
                  <HomeQuizCard key={quiz.id} quiz={quiz} />
                ))}
              </Box>
            </Box>
          </Box>
          <Box
            width="100%"
            mb={5}
            alignItems="center"
            display={["flex", "flex", "none"]}
            justifyContent="center"
            flexDirection="column"
          >
            <Box
              width={["100%", "100%", "60%"]}
              display="flex"
              flexDirection="column"
              mb={1}
            >
              <Typography color="#121212" fontWeight="700" fontSize={18}>
                정기 퍼즐
              </Typography>

              <Box
                display="flex"
                flexDirection="row"
                justifyContent={["flex-start", "flex-start", "space-evenly"]}
                width="100%"
                gap="32px"
                overflow="auto"
                py={1}
              >
                {WORD_PUZZLE_CONTENTS.map((content, idx) => (
                  <PuzzleButton
                    key={idx}
                    label={content.title}
                    src={content.src}
                    onClick={() => router.push(content.url)}
                  />
                ))}
              </Box>
            </Box>
          </Box>
          <Box
            my={8}
            width={1}
            display={["none", "none", "flex"]}
            justifyContent="center"
          >
            <Box
              width="60%"
              display="flex"
              justifyContent="space-between"
              color="white"
              height="140px"
              alignItems="center"
              position="relative"
              borderRadius="12px"
              sx={{
                background: `linear-gradient(90deg, #161C26 0%, #51658C 100%)`,
              }}
            >
              <Box display="flex" flexDirection="column" ml={5}>
                <Typography fontWeight={600} fontSize={32} mb={1}>
                  협동 크라임씬
                </Typography>
                <Typography fontSize={18} fontWeight={400}>
                  살인사건의 진범을 찾아라!
                </Typography>
              </Box>
              <Box display="flex" justifyContent="center" mr={5}>
                <Search
                  sx={{
                    fontSize: 100,
                  }}
                />
              </Box>
              <Button
                sx={{
                  borderColor: "white",
                  border: "1px solid",
                  position: "absolute",
                  backdropFilter: "blur(8px)",
                  right: "5%",
                  bottom: "15%",
                  color: "white",
                  ":hover": {
                    borderColor: "white",
                    color: "white",
                    backdropFilter: "blur(12px)",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
                onClick={() => router.push("/suspect")}
              >
                진범 찾으러 가기
                <ArrowForwardIos
                  sx={{
                    fontSize: "1rem",
                  }}
                />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
