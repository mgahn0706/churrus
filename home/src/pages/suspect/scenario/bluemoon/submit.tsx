import { DetectiveNoteType } from "@/features/suspect/types";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const bluemoonQuestions: {
  id: number;
  question: string;
  variant: "dropdown" | "input";
  required?: boolean;
  options?: string[];
}[] = [
  {
    id: 1,
    question: "김관우를 죽인 범인은 누구인가요?",
    variant: "dropdown",
    required: true,
    options: ["김선민", "가영", "임연화", "량타오췬", "허순", "연부농"],
  },
  {
    id: 2,
    question: "살해 방법은 무엇이라고 생각하나요?",
    required: true,
    variant: "input",
  },
  {
    id: 3,
    question: "살해 동기는 무엇이라고 생각하나요?",
    required: true,
    variant: "input",
  },
  {
    id: 4,
    question: "시신의 입 주변에 남아 있던 특징은 무엇인가요?",
    variant: "input",
  },
  {
    id: 5,
    question: "깨진 술병에서는 어떤 냄새가 확인되었나요?",
    variant: "input",
  },
  {
    id: 6,
    question: "세금 장부에는 어떤 이상한 정황이 있었나요?",
    variant: "input",
  },
  {
    id: 7,
    question: "밀서는 무엇을 암시하나요?",
    variant: "input",
  },
];

export default function BluemoonSubmit() {
  const [questionStep, setQuestionStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(
    new Array(bluemoonQuestions.length).fill("")
  );
  const currentQuestion = bluemoonQuestions[questionStep];
  const router = useRouter();

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100vw"
        height="100vh"
        sx={{
          backgroundColor: "black",
          color: "white",
        }}
      >
        <Box
          display="flex"
          justifyContent="flex-start"
          flexDirection="column"
          width="50vw"
        >
          <Typography variant="body1">
            {currentQuestion.id} / {bluemoonQuestions.length}
          </Typography>
          <Typography
            variant="h4"
            fontWeight="bold"
            mb={3}
            sx={{ wordBreak: "keep-all" }}
          >
            {currentQuestion.question} {currentQuestion.required && "*"}
          </Typography>

          {currentQuestion.variant === "input" && (
            <TextField
              required={currentQuestion.required}
              placeholder="답변을 입력하세요."
              value={answers[questionStep]}
              onChange={(e) => {
                const newAnswers = [...answers];
                newAnswers[questionStep] = e.target.value as string;
                setAnswers(newAnswers);
              }}
              sx={{
                color: "white",
              }}
            />
          )}
          {currentQuestion.variant === "dropdown" && (
            <Select
              placeholder="범인 지목"
              value={answers[questionStep]}
              required={currentQuestion.required}
              sx={{
                color: "white",
              }}
              onChange={(e) => {
                const newAnswers = [...answers];
                newAnswers[questionStep] = e.target.value as string;
                setAnswers(newAnswers);
              }}
            >
              {currentQuestion.options?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          )}

          <Box display="flex" gap={1}>
            {currentQuestion.id !== 1 && (
              <Button
                sx={{
                  mt: 2,
                  width: "50px",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "gray",
                    color: "white",
                  },
                }}
                onClick={() => {
                  if (questionStep === 0) return;
                  setQuestionStep(questionStep - 1);
                }}
              >
                이전
              </Button>
            )}

            <Button
              disabled={
                [answers.slice(0, 3)].some((answerGroup, index) =>
                  answerGroup.some(
                    (answer) =>
                      bluemoonQuestions[index].required && answer.trim() === ""
                  )
                ) && questionStep === bluemoonQuestions.length - 1
              }
              variant="contained"
              sx={{
                mt: 2,
                width: "50px",
                fontWeight: "bold",
                fontSize: "1rem",
                backgroundColor: "white",
                color: "black",
                "&:hover": {
                  backgroundColor: "lightgray",
                  color: "black",
                },
              }}
              onClick={() => {
                if (questionStep === bluemoonQuestions.length - 1) {
                  const note: DetectiveNoteType = {
                    accusedSuspect: answers[0],
                    howDunnit: answers[1],
                    whyDunnit: answers[2],
                    additionalQuestionAnswers: [
                      answers[3],
                      answers[4],
                      answers[5],
                      answers[6],
                    ],
                    memo: "",
                  };
                  localStorage.setItem("bluemoon", JSON.stringify(note));
                  router.push(`/suspect/scenario/bluemoon/answer`);
                } else {
                  setQuestionStep(questionStep + 1);
                }
              }}
            >
              {questionStep === bluemoonQuestions.length - 1 ? "제출" : "다음"}
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
