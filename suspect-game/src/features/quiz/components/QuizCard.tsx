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

export default function QuizCard({ quiz }: { quiz: QuizType }) {
  const responsiveXS = useResponsiveValue([6, 4, 2]);
  const router = useRouter();

  return (
    <Grid item xs={responsiveXS}>
      <Card
        variant="outlined"
        sx={{
          background: "rgba(255, 255, 255, 0.2)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          "&:hover": {
            boxShadow: "0 7px 30px -10px rgb(57, 188, 253)",
            border: "1px solid #4bc1fc",
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
          <Typography sx={{ fontSize: 14 }} color="lightgray" gutterBottom>
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
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
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
        <Divider />
        <CardActions>
          <Button
            size="small"
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
