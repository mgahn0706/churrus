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
import { PlayCircleFilled } from "@mui/icons-material";
import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import { useRouter } from "next/router";

export default function QuizCard({ quiz }: { quiz: QuizType }) {
  const responsiveXS = useResponsiveValue([6, 4, 2]);
  const router = useRouter();

  return (
    <Grid item xs={responsiveXS}>
      <Card
        variant="outlined"
        sx={{
          boxShadow: "0 7px 30px -10px rgba(150,170,180,0.5)",
          "&:hover": {
            boxShadow: "0 7px 30px -10px rgb(57, 188, 253)",
            border: "1px solid #4bc1fc",
          },
        }}
      >
        <CardContent
          sx={{
            minHeight: "200px",
          }}
        >
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            #{quiz.quizNumber}
          </Typography>
          <Typography
            variant="h5"
            component="div"
            sx={{
              wordBreak: "keep-all",
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
            <IconButton
              size="large"
              onClick={() => {
                router.push(`/quiz/${quiz.id}`);
              }}
            >
              <PlayCircleFilled fontSize="large" />
            </IconButton>
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
