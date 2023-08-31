import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { QuizType } from "../types";
import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import { useRouter } from "next/router";
import Image from "next/image";
import { CardStyle } from "../fixtures";

export default function QuizCard({
  quiz,
  month,
}: {
  quiz: QuizType;
  month: string;
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
          background: lightColor,
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          "&:hover": {
            boxShadow: `0 10px 30px -10px ${baseColor}`,
            border: `1px solid ${baseColor}`,
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
          }}
        >
          <Typography sx={{ fontSize: 14 }} color={baseColor} gutterBottom>
            #{quiz.quizNumber}
          </Typography>
          <Typography
            color="white"
            variant="h5"
            component="div"
            sx={{
              wordBreak: "keep-all",
              minHeight: 70,
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

          <Box
            display="flex"
            justifyContent="center"
            sx={{
              "&:hover": {
                transform: "scale(1.1)",
                transition: "all 0.3s ease-in-out",
              },
            }}
          >
            <Image
              alt="quiz icon"
              src="/image/quiz/icon/default.png"
              width={100}
              height={120}
            />
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            size="small"
            sx={{
              color: "white",
            }}
            onClick={() => {
              router.push(`/quiz/${quiz.id}/answer`);
            }}
          >
            정답
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
