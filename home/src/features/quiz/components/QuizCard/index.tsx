import { Box, Typography } from "@mui/material";
import { QuizData } from "../../fixtures/quizzes";
import Image from "next/image";
import { MEETINGS } from "../../fixtures/meetings";
import { useRouter } from "next/router";
import { QuizType } from "../../types";
import { CheckCircleRounded } from "@mui/icons-material";

interface QuizCardProps {
  quiz: QuizType;
  isSolved: boolean;
}

export default function QuizCard({ quiz, isSolved }: QuizCardProps) {
  const router = useRouter();

  return (
    <Box
      display="flex"
      height={70}
      width={1}
      justifyContent="space-between"
      alignItems="center"
      gap={2}
      py={1}
      borderRadius="12px"
      onClick={() => {
        router.push(`/quiz/${quiz.id}`);
      }}
      sx={{
        cursor: "pointer",
        ":hover": {
          "& .meeting-card-image": {
            transform: "scale(1.2)",
            transition: "all 0.3s",
          },
        },
      }}
    >
      <Box display="flex" alignItems="center">
        <Box
          width={124}
          height={70}
          overflow="hidden"
          borderRadius="12px"
          display="flex"
          justifyContent="center"
        >
          <Image
            className="meeting-card-image"
            width={124}
            height={70}
            src={quiz.quizImageSource}
            alt={quiz.title}
            style={{
              paddingRight: "12px",
              borderRadius: "12px",
            }}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height={1}
        >
          <Box
            display="flex"
            flexDirection="column"
            sx={{
              wordBreak: "keep-all",
            }}
            py={1}
          >
            <Typography color="#121212" fontSize="18px" fontWeight={500}>
              {quiz.title}
            </Typography>
            <Typography color="#606B80" fontSize="12px">
              {quiz.creator}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        width="28px"
        justifyContent="center"
      >
        {isSolved && <CheckCircleRounded sx={{ color: "#318AE1" }} />}
      </Box>
    </Box>
  );
}
