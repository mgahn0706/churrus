import { SPELLING_BEES } from "@/features/spelling-bee/fixtures";
import { Box, Button, TextField } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import weekOfYear from "dayjs/plugin/weekOfYear";
import hangul from "hangul-js";

dayjs.extend(weekOfYear);

const today = dayjs();

const spellingBeeDate = {
  year: today.get("year"),
  week: today.week(),
};

const KOREAN_REGEX = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

export default function SpellingBee() {
  const [input, setInput] = useState<string[]>([]);
  const [yourAnswers, setYourAnswers] = useState<string[]>([]);

  const TODAY_SPELLING_BEE = SPELLING_BEES[spellingBeeDate.year].find(
    (spellingBee) => spellingBee.week === spellingBeeDate.week
  );

  if (!TODAY_SPELLING_BEE) {
    return <h1>Spelling Bee is not available for today</h1>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const result = hangul.assemble(input);
        if (
          [
            ...TODAY_SPELLING_BEE.answers.common,
            ...TODAY_SPELLING_BEE.answers.uncommon,
          ].includes(result)
        ) {
          setYourAnswers([...yourAnswers, result]);
        }
        setInput([]);
      }}
    >
      {yourAnswers.map((answer) => (
        <p key={answer}>{answer}</p>
      ))}
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        width="20%"
      >
        <h1>Spelling Bee</h1>
        <Button variant="contained" type="submit">
          제출
        </Button>
        <TextField
          variant="standard"
          value={hangul.assemble(input)}
          onChange={() => {}}
        />
        {TODAY_SPELLING_BEE.outerLetters.map((letter) => (
          <Button
            key={letter}
            onClick={() => {
              setInput([...input, letter]);
            }}
          >
            {letter}
          </Button>
        ))}
        <Button
          variant="contained"
          onClick={() => {
            setInput([...input, TODAY_SPELLING_BEE.centerLetter]);
          }}
        >
          {TODAY_SPELLING_BEE.centerLetter}
        </Button>
      </Box>
    </form>
  );
}
