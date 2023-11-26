import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { QuizType } from "../types";
import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import { useRouter } from "next/router";
import Image from "next/image";
import { CardStyle } from "../fixtures";
import { Star } from "@mui/icons-material";

export default function QuizCard({
  quiz,
  month,
  isSolved,
}: {
  quiz: QuizType;
  month: string;
  isSolved: boolean;
}) {
  const responsiveXS = useResponsiveValue([6, 4, 2]);
  const router = useRouter();

  const { baseColor, lightColor } = CardStyle[month] ?? {
    baseColor: "rgba(255, 255, 255, 0.2)",
    lightColor: "rgba(255, 255, 255, 0.3)",
  };

  return (
    <Grid item xs={responsiveXS}>
      <Card
        variant="outlined"
        sx={{
          minWidth: "150px",
          maxWidth: "300px",
          background: lightColor,
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: `0 10px 30px -10px ${baseColor}`,
            border: `1px solid ${baseColor}`,
            transform: "scale(1.1)",
          },
        }}
      >
        <CardContent
          onClick={() => {
            router.push(`/quiz/${quiz.id}`);
          }}
          sx={{
            cursor: "pointer",
            minHeight: "200px",
            mb: 5,
          }}
        >
          <Typography
            sx={{ fontSize: 14 }}
            color={baseColor}
            gutterBottom
            position="relative"
          >
            #{quiz.quizNumber}
            {isSolved && (
              <Star
                sx={{
                  verticalAlign: "middle",
                  position: "absolute",
                  right: 0,
                  fontSize: "1rem",
                }}
              />
            )}
          </Typography>
          <Typography
            color="white"
            variant="h5"
            component="div"
            sx={{
              wordBreak: "keep-all",
              minHeight: 100,
              verticalAlign: "middle",
            }}
            fontWeight={700}
            fontFamily={"NanumSquareEB"}
          >
            {quiz.title}
            <Typography sx={{ mb: 1.5 }} color="lightgray">
              {quiz.madeBy && `by ${quiz.madeBy}`}
            </Typography>
          </Typography>

          <Box display="flex" justifyContent="center">
            <Image
              alt="quiz icon"
              src="/image/quiz/icon/default.png"
              width={100}
              height={120}
            />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
