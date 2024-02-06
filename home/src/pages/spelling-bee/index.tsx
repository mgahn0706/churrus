import { SPELLING_BEES } from "@/features/spelling-bee/fixtures";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import GlobalHeader from "@/components/Navigation/GlobalHeader";
import Hive from "@/features/spelling-bee/components/Hive";

dayjs.extend(weekOfYear);

const today = dayjs();

const spellingBeeDate = {
  year: today.get("year"),
  week: today.week(),
};

const KOREAN_REGEX = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

const TODAY_SPELLING_BEE = SPELLING_BEES[spellingBeeDate.year].find(
  (spellingBee) => spellingBee.week === spellingBeeDate.week
);

const fullScore =
  TODAY_SPELLING_BEE?.answers.common.reduce((acc, answer) => {
    return acc + answer.length;
  }, 0) ?? +(TODAY_SPELLING_BEE?.answers.uncommon.length ?? 0);

const RANK = {
  초보: 0,
  "좋은 시작": 2,
  "올라가는 중": 5,
  괜찮음: 8,
  잘함: 15,
  "아주 좋음": 25,
  대단함: 40,
  놀라움: 50,
  천재: 65,
};

export default function SpellingBee() {
  const currentAnswers: string[] = JSON.parse(
    localStorage.getItem("spelling-bee-answers") ?? "[]"
  );

  const currentScore = currentAnswers.reduce((acc, answer) => {
    return acc + answer.length;
  }, 0);
  const currentRank = Object.entries(RANK).find(
    ([, value]) => currentScore >= (fullScore * value) / 100
  )?.[0];

  if (!TODAY_SPELLING_BEE) {
    return <h1>Spelling Bee is not available for today</h1>;
  }

  return (
    <>
      <GlobalHeader />
      <Typography variant="h6">{currentRank} </Typography>
      {currentAnswers.map((answer) => (
        <p key={answer}>{answer}</p>
      ))}
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        px="30px"
        minWidth="100dvw"
        minHeight="100dvh"
        py="108px"
      >
        <Typography variant="h3"> Spelling Bee </Typography>
        <Typography color="GrayText" variant="h6">
          Week {TODAY_SPELLING_BEE.week}
        </Typography>

        <Box position="relative" width="100%">
          <Hive spellingBee={TODAY_SPELLING_BEE} />
        </Box>
      </Box>
    </>
  );
}
