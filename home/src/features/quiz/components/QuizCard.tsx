import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import { QuizType } from "../types";
import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import { useRouter } from "next/router";
import {
  CheckCircleOutline,
  HelpOutline,
  RadioButtonUnchecked,
} from "@mui/icons-material";
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
  bgColor,
}: {
  quiz: QuizType;
  isSolved: boolean;
  bgColor?: string;
}) {
  const responsiveXS = useResponsiveValue([6, 4, 2]);
  const router = useRouter();

  const cardHeight = useResponsiveValue([100, 150, 200]) as number;

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
              pt: 1,

              px: 2,
              borderTop: "1px solid rgba(0,0,0,0.1)",
            }}
          >
            <Box
              display="flex"
              fontSize="12px"
              justifyContent="space-between"
              mb="6px"
              width={1}
              whiteSpace="nowrap"
            >
              <Typography
                fontSize="18px"
                color="#212837"
                fontWeight={500}
                textOverflow={"ellipsis"}
                overflow={"hidden"}
              >
                {quiz.title}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              ></Box>
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
                    color: "rgba(0,0,0,0.7)",
                    py: 0,
                    height: "18px",
                    backgroundColor: difficultyLabel[quiz.difficulty].color,
                    fontSize: "12px",
                  }}
                />
              )}
              <Chip
                label={isSolved ? "✅ 풀었음" : "❓ 풀지 않음"}
                sx={{
                  py: 0,
                  height: "18px",
                  backgroundColor: isSolved ? "#e1fae2" : "#f9cdca",
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
