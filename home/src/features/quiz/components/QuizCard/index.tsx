import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { QuizType } from "../../types";
import { CheckCircleRounded } from "@mui/icons-material";

interface QuizCardProps {
  quiz: QuizType;
  isSolved: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function QuizCard({
  quiz,
  isSolved,
  isSelected,
  onClick,
}: QuizCardProps) {
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
      bgcolor={isSelected ? "#F5F6FA" : "none"}
      onClick={() => {
        router.push(`/quiz/${quiz.id}`);
        onClick && onClick();
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
          mr={1}
          width={80}
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
            style={{ objectFit: "cover" }}
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
            <Typography
              color={isSelected ? "#318AE1" : "#121212"}
              fontSize="18px"
              fontWeight={500}
            >
              {quiz.title}
            </Typography>
            <Typography
              color={isSelected ? "#318AE1" : "#606880"}
              fontSize="12px"
            >
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
