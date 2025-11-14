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

const dureQuestions: {
  id: number;
  question: string;
  variant: "dropdown" | "input";
  required?: boolean;
  options?: string[];
}[] = [
  {
    id: 1,
    question: "이예진을 살해한 범인은 누구인가요?",
    variant: "dropdown",
    required: true,
    options: ["백장훈", "고제준", "박선재", "송가연"],
  },
  {
    id: 2,
    question: "살해 방법은 무엇인가요?",
    required: true,
    variant: "input",
  },
  {
    id: 3,
    question: "살해 동기는 무엇인가요?",
    required: true,
    variant: "input",
  },
  {
    id: 4,
    question: "박선재의 주머니 속 목걸이의 구입 자금 출처는 어디인가요?",
    variant: "input",
  },
  {
    id: 5,
    question: "송가연은 박선재를 어떻게 생각하고 있었나요?",
    variant: "input",
  },

  {
    id: 6,
    question: "고제준이 연구실 자료 사진을 찍은 이유는 무엇인가요?",
    variant: "input",
  },

  {
    id: 7,
    question: "1년 전 강제호 사건의 진범은 누구인가요?",
    variant: "input",
  },
];

export default function DureSubmit() {
  const [questionStep, setQuestionStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(
    new Array(dureQuestions.length).fill("")
  );
  const currentQuestion = dureQuestions[questionStep];
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
            {currentQuestion.id} / {dureQuestions.length}
          </Typography>
          <Typography
            variant="h4"
            fontWeight="bold"
            mb={3}
            sx={{
              wordBreak: "keep-all",
            }}
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
                [answers.slice(0, 3)].some((answerGroup, index) =>
                  answerGroup.some(
                    (answer) =>
                      dureQuestions[index].required && answer.trim() === ""
                  )
                ) && questionStep === dureQuestions.length - 1
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
                if (questionStep === dureQuestions.length - 1) {
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
                  localStorage.setItem("dure", JSON.stringify(note));
                  router.push(`/suspect/scenario/dure/answer`);
                } else {
                  setQuestionStep(questionStep + 1);
                }
              }}
            >
              {questionStep === dureQuestions.length - 1 ? "제출" : "다음"}
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
