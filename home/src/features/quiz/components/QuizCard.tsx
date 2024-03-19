import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import { QuizType } from "../types";
import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import { useRouter } from "next/router";

import ImageWithPlaceHolder from "@/components/ImageWithPlaceholder";
import { MeetingData } from "../fixtures";
import { Lightbulb } from "@mui/icons-material";
import Image from "next/image";

const difficultyLabel = {
  easy: {
    label: "쉬움",
    color: "#e1fae2",
  },
  normal: {
    label: "보통",
    color: "#ffefd8",
  },
  hard: {
    label: "어려움",
    color: "#f9cdca",
  },
};

export default function QuizCard({
  quiz,
  isSolved,
}: {
  quiz: QuizType;
  isSolved: boolean;
}) {
  const responsiveXS = useResponsiveValue([6, 4, 3]);
  const router = useRouter();

  return (
    <Grid item xs={responsiveXS}>
      <Box
        sx={{
          width: "100%",
          borderRadius: "20px",
          cursor: "pointer",
          ":hover": {
            ".quiz-card": {
              transform: "translateY(-1px)",
              boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.25)",
              transition: "all 0.3s",
            },
          },
        }}
        onClick={() => {
          router.push(`/quiz/${quiz.id}`);
        }}
      >
        <Card
          className="quiz-card"
          elevation={0}
          sx={{
            backgroundColor: "#ffffff",
            minWidth: "150px",
            borderRadius: "20px",
          }}
        >
          <CardMedia
            title={quiz.title}
            sx={{
              height: 178,
            }}
          >
            <Box width={1} height={1} position="relative" overflow="hidden">
              <Image
                alt={quiz.title}
                fill
                src={quiz.quizImgSrc}
                style={{
                  objectFit: "cover",
                }}
              />
            </Box>
          </CardMedia>
        </Card>
        <Box display="flex" justifyContent="space-between" py={1} width="100%">
          <Box
            display="flex"
            flexDirection="column"
            width="100%"
            overflow="hidden"
          >
            <Typography fontSize={10} color="#606B80">
              {quiz.madeBy}
            </Typography>

            <Typography
              color="#202837"
              fontWeight={700}
              width="100%"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {quiz.title}
            </Typography>
            <Typography fontSize={10} color="#606B80">
              #{difficultyLabel[quiz.difficulty ?? "easy"].label}
            </Typography>
          </Box>
          <Box
            width="20px"
            height="20px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={2}
          >
            <Lightbulb
              sx={{
                width: "20px",
                height: "20px",
                color: isSolved ? "#318AE1" : "#ababab",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}
