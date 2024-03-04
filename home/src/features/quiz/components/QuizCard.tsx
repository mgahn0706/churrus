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
  const responsiveXS = useResponsiveValue([12, 4, 3]);
  const router = useRouter();

  const cardHeight = useResponsiveValue([170, 150, 200]) as number;

  return (
    <Grid item xs={responsiveXS}>
      <Card
        elevation={3}
        sx={{
          backgroundColor: "#ffffff",
          minWidth: "150px",
          borderRadius: "20px",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          border: "1px solid rgba(0,0,0,0.1)",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0px 8px 8px rgba(0, 0, 0, 0.25)",
            transition: "all 0.3s",
          },
        }}
      >
        <CardActionArea
          onClick={() => {
            router.push(`/quiz/${quiz.id}`);
          }}
        >
          <CardMedia sx={{ height: cardHeight }}>
            <ImageWithPlaceHolder
              src={quiz.quizImgSrc}
              alt={quiz.title}
              width={cardHeight * 1.8}
              height={cardHeight}
            />
          </CardMedia>

          <CardContent
            sx={{
              px: 2,
              borderTop: "1px solid rgba(0,0,0,0.1)",
            }}
          >
            <Box
              display="flex"
              fontSize="12px"
              justifyContent="space-between"
              width={1}
              mb="4px"
              whiteSpace="nowrap"
            >
              <Typography
                fontSize="20px"
                color="#212837"
                fontWeight={700}
                textOverflow={"ellipsis"}
                overflow={"hidden"}
              >
                {quiz.title}
              </Typography>
              <Typography
                fontSize="12px"
                color="#808080"
                fontWeight={400}
                sx={{
                  mt: "-2px",
                }}
              >
                {quiz.madeBy}
              </Typography>
            </Box>
            <Box
              display="flex"
              gap={1}
              overflow="hidden"
              flexWrap="nowrap"
              width={1}
            >
              {quiz.difficulty && (
                <Chip
                  label={difficultyLabel[quiz.difficulty].label}
                  sx={{
                    bgcolor: difficultyLabel[quiz.difficulty].color,
                    color: "rgba(0,0,0,0.7)",
                    py: 0,
                    height: "18px",
                    fontSize: "12px",
                  }}
                />
              )}
              <Chip
                label={isSolved ? "✅ 풀었음" : "❓ 풀지 않음"}
                sx={{
                  bgcolor: isSolved ? "#e1fae2" : "#f9cdca",
                  py: 0,
                  height: "18px",
                  fontSize: "12px",
                }}
              />
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
