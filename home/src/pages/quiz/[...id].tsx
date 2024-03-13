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

  const [year, month, _] = quiz.id.split("-");

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
        px={3}
        bgcolor={BACKGROUND_COLOR}
      >
        <Box
          display="flex"
          alignItems="center"
          height={60}
          width="100%"
          position="fixed"
          sx={{
            backdropFilter: "blur(2px)",
          }}
        >
          <IconButton
            size="large"
            sx={{
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
        </Box>
        <Box display="flex" flexDirection="column" mt="60px" width="100%">
          <Typography fontSize={12} fontWeight={700} color="#606B80">
            {MeetingData[quiz.meetingId].title} - {quiz.quizNumber}
          </Typography>
          <Typography fontSize={24} fontWeight={700} color="#202837">
            {quiz.title}
          </Typography>
          <Typography fontSize={12} color="#606B80" mt={1}>
            {quiz.madeBy}
          </Typography>
        </Box>

        {quiz.shouldWarn && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            이 문제는 당시 정기모임에 참석해야만 풀 수 있는 요소를 포함하고
            있어요.
          </Alert>
        )}

        <Box
          minWidth={isImageLoading ? 0 : "350px"}
          minHeight={isImageLoading ? 0 : "210px"}
          width={isImageLoading ? 0 : "50vw"}
          height={isImageLoading ? 0 : "30vw"}
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
            <Typography
              variant="body1"
              color="#212837"
              fontWeight={400}
              sx={{
                mt: 2,
              }}
            >
              정답 형식: {answerFomat()}
            </Typography>
            {quiz.isAnswerable && (
              <Box mt="20px" display="flex" alignContent="center">
                <TextField
                  variant="outlined"
                  value={inputAnswer}
                  onChange={(e) => {
                    setInputAnswer(e.target.value);
                  }}
                  sx={{
                    width: "40vw",
                    mr: 2,
                    borderRadius: "24px",
                    minWidth: "200px",
                  }}
                  placeholder={
                    quiz.isAnswerable
                      ? "정답을 입력해주세요."
                      : "정답을 입력할 수 없는 문제입니다."
                  }
                />
                <Button
                  sx={{
                    color: "white",
                    bgcolor: "#0c57d1",
                    borderRadius: "8px",
                    "&:hover": {
                      bgcolor: "#083989",
                    },
                  }}
                  type="submit"
                >
                  제출
                </Button>
              </Box>
            )}
            <Button
              variant="outlined"
              sx={{
                border: "1px solid #ea4335",
                color: "#ea4335",
                "&:hover": {
                  bgcolor: "#fa978d",
                  borderColor: "#ea4335",
                  color: "#ea4335",
                },
                mt: "10px",
              }}
              size="small"
              onClick={() => {
                handleSolvedQuiz();
                router.push(`/quiz/${quiz.id}/answer`);
              }}
            >
              정답 확인
            </Button>
          </form>
        )}
      </Box>
    </>
  );
}
