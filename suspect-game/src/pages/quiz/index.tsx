import HomeButton from "@/components/HomeButton";
import QuizCard from "@/features/quiz/components/QuizCard";
import { QuizData } from "@/features/quiz/fixtures";
import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import { Box, Divider, Grid, Typography } from "@mui/material";

const Meetings: string[] = [
  "2022년 9월 정기모임",
  "2022년 7월 정기모임",
  "2022년 6월 정기모임",
  "2019년 11월 정기모임",
];

export default function Quiz() {
  const responsivePX = useResponsiveValue([12, 60, 120]);
  return (
    <Box
      pt="24px"
      px={`
      ${responsivePX}px
      `}
    >
      <HomeButton />
      <Typography
        sx={{
          mb: 2,
        }}
        variant="h3"
      >
        문제적 추러스
      </Typography>

      <Box mt="12px" height="80vh" overflow="scroll">
        {Meetings.map((meeting) => (
          <Box>
            <Divider
              textAlign="left"
              sx={{
                color: "gray",
                mb: 3,
                mt: 10,
                fontSize: "1.2rem",
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
