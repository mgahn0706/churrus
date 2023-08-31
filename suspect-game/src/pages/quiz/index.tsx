import QuizCard from "@/features/quiz/components/QuizCard";
import { QuizData } from "@/features/quiz/fixtures";
import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import { Search } from "@mui/icons-material";
import { Box, Divider, Grid, Typography, keyframes } from "@mui/material";

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
      height="100vh"
      sx={{
        background: `linear-gradient(50deg, rgba(0,0,0,1) 0%, rgba(31,31,31,1) 36%, rgba(21,21,21,1) 38%, rgba(0,0,0,1) 100%)`,
      }}
      px={`
      ${responsivePX}px
      `}
    >
      <Box
        color="white"
        display="flex"
        justifyContent="flex-start"
        alignItems={"center"}
        position="fixed"
        top={0}
        left={0}
        width="100%"
        px="24px"
        height="60px"
        zIndex={100}
        bgcolor={"rgba(0, 0, 0, 0)"}
        sx={{
          backdropFilter: "blur(60px)",
        }}
      >
        <Typography variant="h4" fontWeight={600}>
          문제적 추러스
          <Search
            sx={{
              ml: 2,
            }}
          />
        </Typography>
      </Box>

      <Box height="100vh" overflow="scroll" px="12px">
        {Meetings.map((meeting) => (
          <Box mb="100px">
            <Divider
              textAlign="left"
              light
              sx={{
                color: "white",
                mb: 3,
                mt: 10,
                fontSize: "1.2rem",
                "&::before, &::after": {
                  borderColor: "white",
                },
              }}
            >
              {meeting}
            </Divider>
            <Grid container spacing={3}>
              {QuizData[meeting].map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                  month={meeting.split(" ")[1]}
                />
              ))}
            </Grid>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
