import HomeButton from "@/components/HomeButton";
import QuizCard from "@/features/quiz/components/QuizCard";
import { QuizData } from "@/features/quiz/fixtures";
import { Box, Divider, Grid, Typography } from "@mui/material";

const Meetings: string[] = ["2022년 7월 정기모임", "2022년 6월 정기모임"];

export default function Quiz() {
  return (
    <Box pt="24px" px="120px">
      <HomeButton />
      <Typography
        sx={{
          mb: 2,
        }}
        variant="h3"
      >
        문제적 추러스
      </Typography>

      <Box mt="12px">
        {Meetings.map((meeting) => (
          <Box>
            <Divider
              textAlign="left"
              sx={{
                color: "gray",
                my: 2,
              }}
            >
              {meeting}
            </Divider>
            <Grid container spacing={3}>
              {QuizData[meeting].map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
            </Grid>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
