import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { QuizType } from "../types";
import { PlayCircleFilled } from "@mui/icons-material";
import { useResponsiveValue } from "@/hooks/useResponsiveValue";

export default function QuizCard({ quiz }: { quiz: QuizType }) {
  const responsiveXS = useResponsiveValue([6, 4, 2]);

  return (
    <Grid item xs={responsiveXS}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            #{quiz.quizNumber}
          </Typography>
          <Typography
            variant="h5"
            component="div"
            sx={{
              minHeight: 60,
            }}
          >
            {quiz.title}
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {quiz.madeBy && `by ${quiz.madeBy}`}
            </Typography>
          </Typography>

          <Box display="flex" justifyContent="center">
            <IconButton>
              <PlayCircleFilled fontSize="large" />
            </IconButton>
          </Box>
        </CardContent>

        <CardActions>
          <Button size="small">정답</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
