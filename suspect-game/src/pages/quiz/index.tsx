import QuizCard from "@/features/quiz/components/QuizCard";
import { MEETINGS, QuizData } from "@/features/quiz/fixtures";
import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import { Search } from "@mui/icons-material";
import { Box, Divider, Grid, Typography, keyframes } from "@mui/material";

export default function Quiz() {
  const responsivePX = useResponsiveValue([24, 60, 220]);
  return (
    <Box
      height="100vh"
      sx={{
        background: `linear-gradient(50deg, rgba(0,0,0,1) 0%, rgba(31,31,31,1) 36%, rgba(21,21,21,1) 38%, rgba(0,0,0,1) 100%)`,
        backgroundImage: `url("https://i.pinimg.com/564x/d3/b9/24/d3b9245271777a8004a26f529fed7cfc.jpg")`,
        backgroundSize: "cover",
      }}
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

      <Box
        height="100vh"
        overflow="scroll"
        px={`
      ${responsivePX}px
      `}
      >
        {MEETINGS.map((meeting) => (
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
