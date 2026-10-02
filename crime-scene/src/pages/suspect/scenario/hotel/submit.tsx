import { DetectiveNoteType } from "@/features/suspect/types";
import { hotelAdditionalQuestions } from "@/features/suspect/fixtures/hotel/additionalQuestions";
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

const hotelQuestions: {
  id: number;
  question: string;
  variant: "dropdown" | "input";
  required?: boolean;
  options?: string[];
}[] = [
  {
    id: 1,
    question: "유교수를 살해한 범인은 누구인가요?",
    variant: "dropdown",
    required: true,
    options: ["임원생", "양연구", "민청소", "문실장"],
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
  ...hotelAdditionalQuestions.map((item, index) => ({
    id: index + 4,
    question: item.question,
    variant: "input" as const,
  })),
];

export default function HotelSubmit() {
  const [questionStep, setQuestionStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(
    new Array(hotelQuestions.length).fill("")
  );
  const currentQuestion = hotelQuestions[questionStep];
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
            {currentQuestion.id} / {hotelQuestions.length}
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
                return (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                );
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
                hotelQuestions.some(
                  (question, index) =>
                    question.required && answers[index].trim() === ""
                ) &&
                questionStep === hotelQuestions.length - 1
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
                if (questionStep === hotelQuestions.length - 1) {
                  const note: DetectiveNoteType = {
                    accusedSuspect: answers[0],
                    howDunnit: answers[1],
                    whyDunnit: answers[2],
                    additionalQuestionAnswers: answers.slice(3),
                    memo: "",
                  };
                  localStorage.setItem("hotel", JSON.stringify(note));
                  router.push(`/suspect/scenario/hotel/answer`);
                } else {
                  setQuestionStep(questionStep + 1);
                }
              }}
            >
              {questionStep === hotelQuestions.length - 1 ? "제출" : "다음"}
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
