import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { QuizType } from "../types";

export default function QuizCard({ quiz }: { quiz: QuizType }) {
  return (
    <Grid item xs={2}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            #{quiz.quizNumber}
          </Typography>
          <Typography
            variant="h5"
            component="div"
            sx={{
              minHeight: 100,
            }}
          >
            {quiz.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {quiz.madeBy && `BY ${quiz.madeBy}`}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button size="medium">풀어보기</Button>
          <Button size="small">정답</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
