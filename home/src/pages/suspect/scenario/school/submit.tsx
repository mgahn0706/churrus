import { DetectiveNoteType } from "@/features/suspect/types";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  Tooltip,
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

const schoolQuestions: {
  id: number;
  question: string;
  variant: "dropdown" | "input";
  required?: boolean;
  options?: string[];
}[] = [
  {
    id: 1,
    question: "박현성을 살해한 범인은 누구인가요?",
    variant: "dropdown",
    required: true,
    options: ["손민혜", "현태민", "유지현", "자살"],
  },
  {
    id: 2,
    question: "자살 또는 살해 방법은 무엇인가요?",
    required: true,
    variant: "input",
  },
  {
    id: 3,
    question: "자살 또는 살해 동기는 무엇인가요?",
    required: true,
    variant: "input",
  },
  {
    id: 4,
    question: "9월 2일자 위클리 와부 십자말 풀이의 가로 3번 정답은 무엇인가요?",
    variant: "input",
  },
  {
    id: 5,
    question: "손민혜가 최근 피로감과 불안 증세를 보인 이유는 무엇인가요?",
    variant: "input",
  },

  {
    id: 6,
    question: "유가람과 유지현은 어떤 관계인가요?",
    variant: "input",
  },

  {
    id: 7,
    question: "인스타그램의 gusty_d2 계정 주인은 누구인가요?",
    variant: "input",
  },
];

export default function SchoolSubmit() {
  const [questionStep, setQuestionStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(
    new Array(schoolQuestions.length).fill("")
  );
  const currentQuestion = schoolQuestions[questionStep];
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
            {currentQuestion.id} / {schoolQuestions.length}
          </Typography>
          <Typography variant="h4" fontWeight="bold" mb={3}>
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
              {currentQuestion.options?.map((option) => {
                return <MenuItem value={option}>{option}</MenuItem>;
              })}
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
                answers.includes("") &&
                questionStep === schoolQuestions.length - 1
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
                if (questionStep === schoolQuestions.length - 1) {
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
                  localStorage.setItem("school", JSON.stringify(note));
                  router.push(`/suspect/scenario/school/answer`);
                } else {
                  setQuestionStep(questionStep + 1);
                }
              }}
            >
              {questionStep === schoolQuestions.length - 1 ? "제출" : "다음"}
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
