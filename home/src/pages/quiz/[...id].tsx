import { QuizData } from "@/features/quiz/fixtures/quizzes";
import {
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  ChevronLeftRounded,
  ChevronRightRounded,
  CloseRounded,
} from "@mui/icons-material";
import { useState } from "react";
import Head from "next/head";
import { MEETINGS } from "@/features/quiz/fixtures/meetings";
import { QuizType } from "@/features/quiz/types";
import QuizCard from "@/features/quiz/components/QuizCard";

const BACKGROUND_COLOR = "#F5F6FA";

const uppercaseRegex = /^[A-Z\s]+$/;
const lowercaseRegex = /^[a-z\s]+$/;
const numericRegex = /^[0-9.\s]+$/;
const koreanRegex = /^[가-힣\s]+$/;

export default function QuizPage() {
  const router = useRouter();

  const [inputAnswer, setInputAnswer] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isQuizListDrawerOpen, setIsQuizListDrawerOpen] = useState(false);

  const { id } = router.query;

  if (!id) {
    return <div>loading...</div>;
  }

  const quiz = Object.values(QuizData)
    .flatMap((quizzes) => quizzes)
    .find((quiz) => quiz.id === id[0]);

  const isAnswerPage = id[1] === "answer";

  if (!quiz) {
    router.back();
    return;
  }

  const handleSolvedQuiz = () => {
    const solvedQuiz = JSON.parse(localStorage.getItem("quiz") ?? "[]");
    localStorage.setItem("quiz", JSON.stringify([...solvedQuiz, quiz.id]));
    return;
  };

  const handleAnswerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputAnswer === quiz.answer) {
      window.alert("정답입니다!");
      handleSolvedQuiz();
      router.push(`/quiz/${quiz.id}/answer`);
      return;
    }
    window.alert("오답입니다.");
  };

  const answerFomat = () => {
    if (!quiz.answer) {
      return "입력할 수 없음. 충분히 고민한 후 정답을 확인해주세요.";
    }
    if (uppercaseRegex.test(quiz.answer)) {
      return "영어 대문자";
    }
    if (lowercaseRegex.test(quiz.answer)) {
      return "영어 소문자";
    }
    if (numericRegex.test(quiz.answer)) {
      return "숫자";
    }
    if (koreanRegex.test(quiz.answer)) {
      return "한글";
    }
    return "입력할 수 없음. 충분히 고민한 후 정답을 확인해주세요.";
  };

  return (
    <>
      <Head>
        <title>문제적 추러스 : {quiz.title}</title>
      </Head>
      <Box
        alignItems="center"
        display="flex"
        minHeight="100dvh"
        flexDirection="column"
        bgcolor={BACKGROUND_COLOR}
      >
        <Box
          display="flex"
          alignItems="center"
          height={60}
          width="100%"
          justifyContent="center"
          position="fixed"
          sx={{
            backdropFilter: "blur(2px)",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            maxWidth="1200px"
            width={1}
          >
            <Box display="flex" alignItems="center" ml={2}>
              <ChurrusLogoButton onClick={() => router.push("/")} />

              <Box display="flex" alignItems="center" ml={2}>
                <HeaderButton onClick={() => setIsQuizListDrawerOpen(true)}>
                  {MEETINGS[quiz.meetingId].title}
                </HeaderButton>
                <IconButton
                  disabled={quiz.quizNumber === 1}
                  onClick={() => {
                    router.push(
                      `/quiz/${
                        MEETINGS[quiz.meetingId].quizIds[quiz.quizNumber - 2]
                      }`
                    );
                  }}
                >
                  <ChevronLeftRounded />
                </IconButton>
                <IconButton
                  disabled={
                    quiz.quizNumber === MEETINGS[quiz.meetingId].quizIds.length
                  }
                  onClick={() =>
                    router.push(
                      `/quiz/${
                        MEETINGS[quiz.meetingId].quizIds[quiz.quizNumber]
                      }`
                    )
                  }
                >
                  <ChevronRightRounded />
                </IconButton>
              </Box>
            </Box>
            {!isAnswerPage && (
              <Button
                sx={{
                  color: "#202837",
                  fontWeight: 700,
                  fontSize: 14,
                  mr: 2,
                }}
                variant="text"
                onClick={() => {
                  handleSolvedQuiz();
                  router.push(`/quiz/${quiz.id}/answer`);
                }}
              >
                정답 보기
              </Button>
            )}
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          maxWidth={1200}
          width={1}
          ml={2}
          textAlign={["left", "left", "center"]}
        >
          <Typography
            fontSize={24}
            fontWeight={700}
            mt={12}
            color="#202837"
            width="fit-content"
          >
            {quiz.title}
            {isAnswerPage && " 정답"}
          </Typography>
          {isAnswerPage && (
            <Typography
              fontSize={24}
              fontWeight={700}
              color="#318AE1"
              width="fit-content"
            >
              {quiz.answer}
            </Typography>
          )}

          <Typography fontSize={12} color="#606B80" width="fit-content">
            {quiz.creator}
          </Typography>
        </Box>

        <Box
          width="100%"
          minHeight="170px"
          sx={{
            aspectRatio: 16 / 9,
          }}
          maxWidth={isImageLoading ? 0 : "1200px"}
          maxHeight={isImageLoading ? 0 : "900px"}
          display="flex"
          justifyContent="center"
          mt={2}
          position="relative"
        >
          <Image
            src={
              isAnswerPage
                ? `/image/quiz/${quiz.id}-answer.png`
                : quiz.quizImageSource
            }
            alt={quiz.title}
            style={{
              borderRadius: "12px",
            }}
            fill
            priority
            onLoadingComplete={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)}
          />
        </Box>
        {isImageLoading && (
          <Skeleton
            variant="rectangular"
            width="50vw"
            height="30vw"
            sx={{
              minWidth: "350px",
              minHeight: "210px",
              bgcolor: "rgba(255, 255, 255, 0.7)",
            }}
          />
        )}
        {!isAnswerPage && (
          <form onSubmit={handleAnswerSubmit}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              mt={4}
              minWidth={300}
              maxWidth={1200}
              width="70vw"
              mx="auto"
            >
              <Typography
                color="#212837"
                fontSize={12}
                fontWeight={400}
                sx={{
                  ml: 2,
                  width: "100%",
                }}
              >
                정답 형식: {answerFomat()}
              </Typography>
              {quiz.answer && (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap={3}
                  flexDirection={["column", "column", "row"]}
                >
                  <TextField
                    variant="outlined"
                    value={inputAnswer}
                    onChange={(e) => {
                      setInputAnswer(e.target.value);
                    }}
                    InputProps={{
                      sx: {
                        maxWidth: 950,
                        borderRadius: "20px",
                        py: "2px",
                        height: "40px",
                      },
                    }}
                    sx={{
                      width: "100%",
                    }}
                    placeholder={
                      quiz.answer
                        ? "정답을 입력해주세요."
                        : "정답을 입력할 수 없는 문제입니다."
                    }
                  />
                  <Button
                    fullWidth
                    sx={{
                      display: ["block", "block", "none"],
                      color: "white",
                      bgcolor: "#318AE1",
                      height: "40px",
                      borderRadius: "20px",
                      "&:hover": {
                        bgcolor: "#1B4B7B",
                      },
                    }}
                    type="submit"
                  >
                    제출
                  </Button>
                  <Button
                    sx={{
                      minWidth: "220px",
                      display: ["none", "none", "block"],
                      color: "white",
                      bgcolor: "#318AE1",
                      height: "40px",
                      borderRadius: "20px",
                      "&:hover": {
                        bgcolor: "#1B4B7B",
                      },
                    }}
                    type="submit"
                  >
                    제출
                  </Button>
                </Box>
              )}
            </Box>
          </form>
        )}
      </Box>
      <QuizListDrawer
        currentQuizId={quiz.id}
        isOpen={isQuizListDrawerOpen}
        onClose={() => setIsQuizListDrawerOpen(false)}
        quizList={QuizData[quiz.meetingId]}
        onClickMeeting={() => {
          router.push(`/meetings/${quiz.meetingId}`);
        }}
      />
    </>
  );
}

interface DesktopTopMenuProps {
  disabled?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

const HeaderButton = ({ disabled, children, onClick }: DesktopTopMenuProps) => {
  return (
    <Button
      sx={{
        color: "#232937",
        fontWeight: 500,
        fontSize: 14,
      }}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

const ChurrusLogoButton = ({ onClick }: { onClick?: () => void }) => (
  <Image
    onClick={onClick}
    style={{
      cursor: "pointer",
    }}
    alt="churrus-logo"
    width={30}
    height={25}
    src="/image/churrus-icon.svg"
  />
);

interface QuizListDrawerProps {
  isOpen: boolean;
  currentQuizId: string;
  quizList: QuizType[];
  onClose: () => void;
  onClickMeeting: () => void;
}

const QuizListDrawer = ({
  isOpen,
  currentQuizId,
  onClose,
  quizList,
  onClickMeeting,
}: QuizListDrawerProps) => {
  return (
    <Drawer anchor="bottom" open={isOpen} onClose={onClose}>
      <Box
        display="flex"
        alignItems="center"
        p={2}
        justifyContent="space-between"
      >
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          onClick={onClickMeeting}
          sx={{
            cursor: "pointer",
            "&:hover": {
              "& .go-to-quiz-list": {
                transform: "translateX(4px)",
                transition: "all 0.3s",
              },
            },
          }}
        >
          <Box display="flex" flexDirection="column">
            <Typography fontSize={18} fontWeight={700} px={2}>
              {MEETINGS[quizList[0].meetingId].title}
            </Typography>
            <Typography fontSize={14} fontWeight={400} px={2}>
              {MEETINGS[quizList[0].meetingId].subtitle}
            </Typography>
          </Box>
          <ChevronRightRounded
            className="go-to-quiz-list"
            sx={{
              marginLeft: "12px",
            }}
          />
        </Box>
        <IconButton onClick={onClose}>
          <CloseRounded />
        </IconButton>
      </Box>
      <Grid container spacing={1} py={2}>
        {quizList.map((quiz) => (
          <Grid item xs={12} key={quiz.id} ml={4}>
            <QuizCard
              quiz={quiz}
              isSolved={false}
              isSelected={quiz.id === currentQuizId}
              onClick={() => {
                onClose();
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Drawer>
  );
};
