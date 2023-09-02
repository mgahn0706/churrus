import { QuizData } from "@/features/quiz/fixtures";
import {
  Box,
  Button,
  IconButton,
  Input,
  Skeleton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import { ArrowBack } from "@mui/icons-material";
import { useState } from "react";

const uppercaseRegex = /^[A-Z]+$/;
const lowercaseRegex = /^[a-z]+$/;
const numericRegex = /^[0-9]+$/;
const koreanRegex = /^[가-힣]+$/;

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
    return <div>loading...</div>;
  }

  const [year, month, _] = quiz.id.split("-");

  const handleSolvedQuiz = () => {
    const solvedQuiz = JSON.parse(localStorage.getItem("quiz") ?? "[]");
    localStorage.setItem("quiz", JSON.stringify([...solvedQuiz, quiz.id]));
  };

  const handleAnswerSubmit = () => {
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
      <Box
        height="100vh"
        alignItems="center"
        display="flex"
        flexDirection="column"
        py={10}
        px={7}
        textAlign="center"
        sx={{
          background: `linear-gradient(50deg, rgba(0,0,0,1) 0%, rgba(31,31,31,1) 36%, rgba(21,21,21,1) 38%, rgba(0,0,0,1) 100%)`,
          backgroundImage: `url("https://i.pinimg.com/564x/d3/b9/24/d3b9245271777a8004a26f529fed7cfc.jpg")`,
          backgroundSize: "cover",
        }}
      >
        <IconButton
          size="large"
          sx={{
            position: "fixed",
            top: 20,
            left: 20,
            zIndex: 100,
            color: "white",
          }}
          onClick={() => {
            router.push("/quiz");
          }}
        >
          <ArrowBack />
        </IconButton>
        <Typography
          variant="body1"
          color="lightgray"
          fontWeight={600}
          sx={{
            mb: 1,
            textShadow:
              "2px 7px 5px rgba(255,255,255,0.3), 0px -4px 10px rgba(0,0,0,0.3)",
          }}
        >
          {year}년 {month}월 정기모임 #{quiz.quizNumber}
        </Typography>

        <Typography
          variant="h4"
          color="white"
          fontWeight={600}
          sx={{
            textShadow:
              "2px 7px 5px rgba(255,255,255,0.3), 0px -4px 10px rgba(0,0,0,0.3)",
          }}
        >
          {quiz.title}
          {isAnswerPage && (quiz.answer ? ` 정답 : ${quiz.answer}` : ` 정답`)}
        </Typography>
        <Typography
          variant="body2"
          color="gray"
          fontWeight={600}
          sx={{
            mb: 1,
            textShadow:
              "2px 7px 5px rgba(255,255,255,0.3), 0px -4px 10px rgba(0,0,0,0.3)",
          }}
        >
          {quiz.madeBy && `by ${quiz.madeBy}`}
        </Typography>

        <Box
          minWidth="350px"
          minHeight="210px"
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
            width="50vw"
            height="30vw"
            sx={{
              minWidth: "350px",
              minHeight: "210px",
            }}
          />
        )}
        {!isAnswerPage && (
          <>
            <Typography
              variant="body1"
              color="white"
              fontWeight={400}
              sx={{
                mt: 2,
                textShadow:
                  "2px 7px 5px rgba(255,255,255,0.3), 0px -4px 10px rgba(0,0,0,0.3)",
              }}
            >
              정답 형식: {answerFomat()}
            </Typography>
            {quiz.isAnswerable && (
              <Box mt="20px" display="flex" alignContent="center">
                <TextField
                  variant="outlined"
                  disabled={!quiz.isAnswerable}
                  value={inputAnswer}
                  onChange={(e) => {
                    setInputAnswer(e.target.value);
                  }}
                  sx={{
                    border: "gray 1px solid",
                    width: "40vw",
                    mr: 2,
                    minWidth: "200px",
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    borderRadius: "16px",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
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

                    borderRadius: "16px",
                    backdropFilter: "blur(10px)",
                  }}
                  onClick={handleAnswerSubmit}
                  variant="outlined"
                >
                  제출
                </Button>
              </Box>
            )}
            <Button
              variant="outlined"
              color="error"
              sx={{
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
          </>
        )}
      </Box>
    </>
  );
}
