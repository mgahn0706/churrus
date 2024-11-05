import { QuizData } from "@/features/quiz/fixtures/quizzes";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { CloseRounded } from "@mui/icons-material";

import Head from "next/head";
import { MEETINGS, MEETING_IDS } from "@/features/quiz/fixtures/meetings";

import QuizCard from "@/features/quiz/components/QuizCard";
import useLocalStorage from "@/hooks/useLocalStorage";
import Image from "next/image";
import MeetingCard from "@/features/quiz/components/MeetingCard";

const BACKGROUND_COLOR = "#F9FAFC";

export default function MeetingPage() {
  const [solvedQuizzes] = useLocalStorage<string[]>("quiz", []);

  const router = useRouter();

  const { id } = router.query;

  if (!id) {
    return (
      <Box display="flex" justifyContent="center" bgcolor={BACKGROUND_COLOR}>
        loading...
      </Box>
    );
  }
  const meeting = MEETINGS[id[0]];

  const creators = Array.from(
    new Set(
      QuizData[meeting.id]
        .filter((quiz) => !!quiz.creator)
        .map((quiz) => quiz.creator)
    )
  );

  return (
    <>
      <Head>
        <title>문제적 추러스 : {meeting.title}</title>
      </Head>
      <Box
        height={1}
        bgcolor={BACKGROUND_COLOR}
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        alignItems="center"
      >
        <Box
          display="flex"
          alignItems="center"
          height={60}
          width="100%"
          left={0}
          zIndex={3}
          justifyContent="center"
          position="fixed"
          sx={{
            backdropFilter: "blur(2px)",
          }}
        >
          <Box width="800px">
            <IconButton
              size="large"
              sx={{
                color: "#212837",
              }}
              onClick={() => {
                router.push(`/quiz`);
              }}
            >
              <CloseRounded />
            </IconButton>
          </Box>
        </Box>
        <Box
          height={["190px", "270px", "300px"]}
          maxWidth="800px"
          width={1}
          position="relative"
          mb={2}
        >
          <Image
            alt="meeting"
            style={{
              borderRadius: "0 0 12px 12px",
            }}
            src={meeting.imageSource ?? QuizData[meeting.id][0].quizImageSource}
            fill
          />
          <Box
            zIndex={2}
            flexDirection="column"
            justifyContent={["center", "center", "flex-end"]}
            alignItems={["center", "center", "start"]}
            display="flex"
            position="absolute"
            width={1}
            height={1}
            pt={1}
            borderRadius="0 0 12px 12px"
            sx={{
              backdropFilter: "blur(12px)",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0) 7%, rgba(255,255,255,1) 90%, rgba(255,255,255,1) 100%)",
            }}
          >
            <Box display="flex" flexDirection="column" px={[0, 0, 3]}>
              <Typography color="#606B80" fontSize="12px" mb={1}>
                {meeting.subtitle}
              </Typography>
              <Typography fontWeight="bold" fontSize="24px">
                {meeting.title}
              </Typography>
              <Typography color="#606B80" fontSize="16px" mb={2}>
                {creators.join(", ")}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          mx={[4, 6, 12]}
          width={1}
          mb={6}
          bgcolor={BACKGROUND_COLOR}
          maxWidth="800px"
        >
          <Box display="flex" mt={3} justifyContent="space-between">
            <Box
              display="flex"
              flexDirection="column"
              maxWidth="530px"
              px={3}
              alignItems="center"
            >
              <Box
                display="flex"
                justifyContent="flex-start"
                width="100%"
                alignItems="center"
              >
                <Typography color="#121212" fontSize="14px">
                  문제 {`(${meeting.quizIds.length})`}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb={7}
              >
                <Grid
                  container
                  rowSpacing="4px"
                  columnSpacing={[0, 0, 3]}
                  width="100%"
                >
                  {QuizData[meeting.id].map((quiz) => (
                    <Grid item xs={12}>
                      <QuizCard
                        quiz={quiz}
                        isSolved={solvedQuizzes.includes(quiz.id)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>

            <Box
              display={["none", "none", "flex"]}
              flexDirection="column"
              width="270px"
              pl={2}
            >
              <Box display="flex" flexDirection="column">
                <Typography color="#121212" fontSize="12px">
                  설명
                </Typography>
                <Typography
                  color="#606B80"
                  fontSize="14px"
                  sx={{
                    wordBreak: "keep-all",
                  }}
                >
                  {meeting.date.year}년 {meeting.date.month}월에 열린{" "}
                  {meeting.subtitle ?? meeting.title}에서 진행됨
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column" mt={4}>
                <Typography color="#121212" fontSize="14px" mb={1}>
                  다른 모임들
                </Typography>

                {MEETING_IDS.filter((id) => id !== meeting.id)
                  .sort(() => 0.5 - Math.random())
                  .slice(0, 4)
                  .map((id) => (
                    <Box key={id} mb="4px">
                      <MeetingCard size="small" meetingId={id} />
                    </Box>
                  ))}
                <Button
                  variant="text"
                  size="small"
                  sx={{
                    width: "100px",
                    color: "#606B80",
                    justifyContent: "flex-start",
                  }}
                  onClick={() => router.push("/quiz")}
                >
                  더보기
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
