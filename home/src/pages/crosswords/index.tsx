import GlobalHeader from "@/components/Navigation/GlobalHeader";
import CrosswordCard from "@/features/crosswords/components/CrosswordCard";
import { CROSSWORDS } from "@/features/crosswords/fixtures";
import QuizCard from "@/features/quiz/components/QuizCard";
import { MEETINGS, MeetingData, QuizData } from "@/features/quiz/fixtures";
import {
  ArrowBackRounded,
  Lightbulb,
  NavigateBefore,
  NavigateBeforeRounded,
  NavigateNext,
} from "@mui/icons-material";
import {
  Box,
  Card,
  Grid,
  Icon,
  IconButton,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import Head from "next/head";

import { useRouter } from "next/router";

const BACKGROUND_COLOR = "#f2f3f6";

export default function Crosswords() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>추로스워드 : 서울대 추리 동아리</title>
      </Head>
      <GlobalHeader />
      <Box
        minHeight="100dvh"
        bgcolor={BACKGROUND_COLOR}
        display="flex"
        justifyContent="center"
      >
        <Box
          height="100vh"
          overflow="scroll"
          px={[2, 6, 10]}
          width="100%"
          maxWidth={1000}
          pb={6}
        >
          <Box
            width="100%"
            textAlign="left"
            color="#212837"
            mt={[3, 4, "100px"]}
            mb={[2, 3, 4]}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <IconButton onClick={() => router.push("/")}>
                <ArrowBackRounded />
              </IconButton>
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={3}
          >
            <Grid container spacing={[3, 4, 6]} width="100%">
              {CROSSWORDS.toReversed().map((crossword) => (
                <CrosswordCard {...crossword} />
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}
