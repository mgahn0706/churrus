import { Box, Button, Card, CardActionArea, Typography } from "@mui/material";
import GlobalHeader from "@/components/Navigation/GlobalHeader";

import MainBanner from "@/features/home/components/MainBanner";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { ArrowForward, ArrowForwardIos } from "@mui/icons-material";
import MobilePuzzleCard from "@/features/home/components/MobilePuzzleCard";
import useLocalStorage from "@/hooks/useLocalStorage";
import HomeQuizCard from "@/features/home/components/HomeQuizCard";
import PuzzleButton from "@/features/home/components/PuzzleButton";
import useRecommendedQuiz from "@/features/home/components/hooks/useRecommendedQuiz";

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
    url: "/crossword",
    disabled: true,
  },
  {
    title: "추로스워드 미니",
    src: "/image/logo/crosswordmini-logo.png",
    color: "#73b1f4",
    url: "/crossword-mini",
    disabled: true,
  },
];

const BACKGROUND_COLOR = "#f2f3f6";

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

  return (
    <>
      <GlobalHeader />

      <Box
        bgcolor={BACKGROUND_COLOR}
        minWidth="100vw"
        minHeight="100vh"
        py={[4, 4, 0]}
      >
        <Box
          mx={[2, 2, 0]}
          mt={[0, 0, "60px"]}
          display="flex"
          justifyContent="center"
          flexDirection="column"
        >
          <Typography
            color="#121212"
            fontWeight="700"
            fontSize={36}
            mb={2}
            display={["block", "block", "none"]}
          >
            추러스
          </Typography>
          <MainBanner />
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
          <Box mx="auto" mt="52px" width="100%">
            <Box width="100%" mb={5}>
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
                    fontSize: "18px",
                  }}
                >
                  전체 보기
                  <ArrowForward />
                </Button>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                overflow="auto"
                py={1}
              >
                {recommendedQuiz.map((quiz) => (
                  <HomeQuizCard key={quiz.id} quiz={quiz} />
                ))}
              </Box>
            </Box>
          </Box>
          <Box width="100%" mb={5}>
            <Box
              display="flex"
              width={1}
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Typography color="#121212" fontWeight="700" fontSize={18}>
                정기 퍼즐
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              width="100%"
              gap="24px"
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
      </Box>
    </>
  );
}
