import { QuizData } from "@/features/quiz/fixtures";
import {
  Box,
  Button,
  IconButton,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import { ArrowBack } from "@mui/icons-material";
import { useResponsiveValue } from "@/hooks/useResponsiveValue";

export default function QuizPage() {
  const router = useRouter();

  const { id } = router.query;

  if (!id) {
    return <div>loading...</div>;
  }

  const quiz = Object.values(QuizData)
    .flatMap((quizzes) => quizzes)
    .find((quiz) => quiz.id === id[0]);

  if (!quiz) {
    return <div>loading...</div>;
  }

  const [year, month, _] = quiz.id.split("-");

  return (
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
        width="50vw"
        minWidth="350px"
        minHeight="210px"
        height="30vw"
        display="flex"
        justifyContent="center"
        mt={4}
        position="relative"
      >
        <Image src={quiz.quizImgSrc} alt={quiz.title} fill />
      </Box>
      <Box mt="20px" display="flex" alignContent="center">
        <TextField
          variant="outlined"
          sx={{
            width: "40vw",
            mr: 2,
            minWidth: "300px",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderRadius: "16px",
            backdropFilter: "blur(10px)",
          }}
          placeholder="정답을 입력해주세요"
        />
        <Button
          sx={{
            color: "white",
          }}
        >
          정답 제출
        </Button>
      </Box>
    </Box>
  );
}
