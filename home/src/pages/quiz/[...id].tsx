import { MeetingData, QuizData } from "@/features/quiz/fixtures";
import {
  Alert,
  Box,
  Button,
  IconButton,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import { ArrowBack } from "@mui/icons-material";
import { useState } from "react";
import Head from "next/head";

const BACKGROUND_COLOR = "#f2f3f6";

const uppercaseRegex = /^[A-Z\s]+$/;
const lowercaseRegex = /^[a-z\s]+$/;
const numericRegex = /^[0-9.\s]+$/;
const koreanRegex = /^[가-힣\s]+$/;

export default function QuizPage() {
  const router = useRouter();

  const [inputAnswer, setInputAnswer] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(true);

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
        height="100dvh"
        flexDirection="column"
        bgcolor={BACKGROUND_COLOR}
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
              ml: [2, 3, 5],
              color: "#212837",
            }}
            onClick={() => {
              if (isAnswerPage) {
                router.push(`/quiz?meeting=${quiz.meetingId}`);
                return;
              }
              router.back();
            }}
          >
            <ArrowBack />
          </IconButton>
          {!isAnswerPage && (
            <Button
              sx={{
                color: "#202837",
                fontWeight: 700,
                fontSize: 14,
                mr: [2, 3, 5],
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
        <Box
          display="flex"
          flexDirection="column"
          width={1}
          textAlign={["left", "left", "center"]}
        >
          <Typography
            fontSize={12}
            fontWeight={700}
            color="#606B80"
            width="fit-content"
            mt="60px"
            ml={4}
          >
            {MeetingData[quiz.meetingId].title} - {quiz.quizNumber}
          </Typography>

          <Typography
            fontSize={24}
            fontWeight={700}
            color="#202837"
            width="fit-content"
            ml={4}
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
              ml={4}
            >
              {quiz.answer}
            </Typography>
          )}

          <Typography
            fontSize={12}
            color="#606B80"
            mt={1}
            width="fit-content"
            ml={4}
          >
            {quiz.madeBy}
          </Typography>
        </Box>

        {quiz.shouldWarn && !isAnswerPage && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            이 문제는 당시 정기모임에 참석해야만 풀 수 있는 요소를 포함하고
            있어요.
          </Alert>
        )}

        <Box
          width="100%"
          minHeight="170px"
          sx={{
            aspectRatio: 16 / 9,
          }}
          maxWidth={isImageLoading ? 0 : "856px"}
          maxHeight={isImageLoading ? 0 : "474px"}
          display="flex"
          justifyContent="center"
          mt={4}
          position="relative"
        >
          <Image
            src={
              isAnswerPage
                ? `/image/quiz/${quiz.id}-answer.png`
                : quiz.quizImgSrc
            }
            alt={quiz.title}
            style={{
              borderRadius: "20px",
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
              maxWidth={856}
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
              {quiz.isAnswerable && (
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
                        maxWidth: 700,
                        borderRadius: "20px",
                        py: "2px",
                        height: "40px",
                      },
                    }}
                    sx={{
                      width: "100%",
                    }}
                    placeholder={
                      quiz.isAnswerable
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
    </>
  );
}
