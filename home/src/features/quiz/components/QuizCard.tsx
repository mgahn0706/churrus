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

  const cardWidth = useResponsiveValue([178, 178, 200]) as number;

  return (
    <Grid item xs={responsiveXS}>
      <CardActionArea
        sx={{
          borderRadius: "20px",
        }}
        onClick={() => {
          router.push(`/quiz/${quiz.id}`);
        }}
      >
        <Card
          elevation={0}
          sx={{
            backgroundColor: "#ffffff",
            minWidth: "150px",
            borderRadius: "20px",
            border: "2px solid #e0e0e0",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0px 8px 8px rgba(0, 0, 0, 0.25)",
              transition: "all 0.3s",
            },
          }}
        >
          <CardMedia sx={{ width: cardWidth }}>
            <ImageWithPlaceHolder
              src={quiz.quizImgSrc}
              alt={quiz.title}
              width={cardWidth}
              height={cardWidth}
            />
          </CardMedia>
        </Card>
        <Box
          display="flex"
          justifyContent="space-between"
          p={1}
          alignItems="center"
          width="100%"
        >
          <Box display="flex" flexDirection="column">
            <Typography fontSize={10} color="#606B80">
              {quiz.madeBy}
            </Typography>
            <Box display="flex" justifyContent="space-between" width="100%">
              <Box>
                <Typography
                  color="#202837"
                  fontWeight={700}
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {quiz.title}
                </Typography>
              </Box>
              <Box>
                <Lightbulb
                  sx={{
                    width: "20px",
                    height: "20px",
                    color: isSolved ? "#318AE1" : "#6B6B6B",
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </CardActionArea>
    </Grid>
  );
}
