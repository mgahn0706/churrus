import { MeetingData, QuizData } from "@/features/quiz/fixtures/quizzes";
import {
  Alert,
  Box,
  Button,
  IconButton,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import { ArrowBack } from "@mui/icons-material";
import Head from "next/head";
import {
  CROSSWORDS,
  MINI_CROSSWORDS,
  monthFormatter,
} from "@/features/crosswords/fixtures";

const BACKGROUND_COLOR = "#F5F6FA";

export default function CrosswordPage() {
  const router = useRouter();

  const { id } = router.query;

  if (!id) {
    return <div>loading...</div>;
  }

  const isMini = id.includes("mini");

  const crossword = [...CROSSWORDS, ...MINI_CROSSWORDS].find(
    (crossword) => crossword.id === id[0]
  );

  console.log(crossword, id);

  if (!crossword) {
    router.back();
    return;
  }

  return (
    <>
      <Head>
        <title>
          추로스워드 {isMini ? "미니" : ""} : {crossword.title}
        </title>
      </Head>
      <Box
        alignItems="center"
        display="flex"
        minHeight="100dvh"
        flexDirection="column"
        bgcolor={BACKGROUND_COLOR}
      >
        <Box
          display="flex"
          alignItems="center"
          height={40}
          width="100%"
          justifyContent="space-between"
          position="fixed"
          sx={{
            backdropFilter: "blur(2px)",
          }}
        >
          <IconButton
            size="medium"
            sx={{
              ml: [1, 2, 4],
              color: "#212837",
            }}
            onClick={() => {
              router.back();
            }}
          >
            <ArrowBack
              sx={{
                fontSize: 20,
              }}
            />
          </IconButton>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          width={1}
          textAlign="left"
          mt="40px"
        >
          <Box display="flex" flexDirection="column" mx={[0, 4, 6]}>
            <Box display="flex" flexDirection="column" mx={2}>
              <Typography fontSize={18} fontWeight={700} color="#121212">
                {crossword.title}
              </Typography>
              <Box display="flex" gap={1}>
                <Typography fontSize={12} color="#6b6b6b">
                  {monthFormatter[crossword.date.month]}. {crossword.date.year},
                </Typography>

                <Typography fontSize={12} color="#6b6b6b">
                  {crossword.author}
                </Typography>
              </Box>
            </Box>
            <iframe
              height="650px"
              width="100%"
              allow="web-share;"
              src={crossword.crosswordSrc}
              aria-label="Puzzle Me Game"
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
