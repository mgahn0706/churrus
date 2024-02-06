import { Alert, Box, Snackbar, TextField } from "@mui/material";
import HexagonButton from "./HexagonButton";
import { useState } from "react";
import hangul from "hangul-js";
import { SpellingBeeType } from "../types";

interface HiveProps {
  spellingBee: SpellingBeeType;
}

const HALF_HEXAGON_WIDTH = 50;
const HALF_HEXAGON_HEIGHT = (Math.sqrt(3) * HALF_HEXAGON_WIDTH) / 2;

const GUTTER = 10;

const OUTER_HEXAGON_POSITIONS = [
  {
    top: `calc(50% - 50px - ${2 * HALF_HEXAGON_HEIGHT}px - ${GUTTER}px)`,
    left: "calc(50% - 50px)",
  },
  {
    top: `calc(50% - 50px - ${HALF_HEXAGON_HEIGHT}px - ${GUTTER / 2}px)`,
    left: `calc(50% - 50px + ${1.5 * HALF_HEXAGON_WIDTH}px + ${
      (GUTTER * Math.sqrt(3)) / 2
    }px)`,
  },
  {
    top: `calc(50% - 50px + ${HALF_HEXAGON_HEIGHT}px + ${GUTTER / 2}px)`,
    left: `calc(50% - 50px + ${1.5 * HALF_HEXAGON_WIDTH}px + ${
      (GUTTER * Math.sqrt(3)) / 2
    }px)`,
  },
  {
    top: `calc(50% - 50px + ${2 * HALF_HEXAGON_HEIGHT}px + ${GUTTER}px)`,
    left: "calc(50% - 50px)",
  },

  {
    top: `calc(50% - 50px + ${HALF_HEXAGON_HEIGHT}px + ${GUTTER / 2}px)`,
    left: `calc(50% - 50px - ${1.5 * HALF_HEXAGON_WIDTH}px - ${
      (GUTTER * Math.sqrt(3)) / 2
    }px)`,
  },
  {
    top: `calc(50% - 50px - ${HALF_HEXAGON_HEIGHT}px - ${GUTTER / 2}px)`,
    left: `calc(50% - 50px - ${1.5 * HALF_HEXAGON_WIDTH}px - ${
      (GUTTER * Math.sqrt(3)) / 2
    }px)`,
  },
];

const KOREAN_REGEX = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

export default function Hive({ spellingBee }: HiveProps) {
  const [input, setInput] = useState<string[]>([]);
  const [validationMessage, setValidationMessage] = useState<string>("");
  const setCurrentAnswers = (answers: string[]) => {
    localStorage.setItem("spelling-bee-answers", JSON.stringify(answers));
  };
  const currentAnswers = JSON.parse(
    localStorage.getItem("spelling-bee-answers") ?? "[]"
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (input.length < 4) {
          setValidationMessage("4개 미만의 글자로 이루어진 단어입니다.");
          return;
        }
        if (currentAnswers.includes(hangul.assemble(input))) {
          setValidationMessage("이미 찾은 단어입니다.");
          return;
        }
        if (!input.includes(spellingBee.centerLetter)) {
          setValidationMessage("가운데 글자를 포함하지 않은 단어입니다.");
          return;
        }
        if (
          !spellingBee.answers.common.includes(hangul.assemble(input)) &&
          !spellingBee.answers.uncommon.includes(hangul.assemble(input))
        ) {
          setValidationMessage("사전에 없는 단어입니다.");
          return;
        }
        setCurrentAnswers([...currentAnswers, hangul.assemble(input)]);

        setInput([]);
      }}
    >
      <Snackbar
        open={!!validationMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setValidationMessage("")}
      >
        <Alert
          severity="warning"
          variant="filled"
          sx={{
            width: "100%",
          }}
        >
          {validationMessage}
        </Alert>
      </Snackbar>
      <TextField
        autoFocus
        variant="standard"
        value={hangul.assemble(input)}
        onChange={(e) => {
          const value = e.target.value;
          if (value.length === 0 || KOREAN_REGEX.test(value)) {
            setInput([...hangul.disassemble(value)]);
          }
        }}
      />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        minHeight={6 * HALF_HEXAGON_HEIGHT + 2 * GUTTER + 100}
        minWidth={6 * HALF_HEXAGON_WIDTH + 2 * GUTTER + 100}
        position="relative"
      >
        {spellingBee.outerLetters.map((letter, index) => (
          <HexagonButton
            key={letter}
            variant="outer"
            onClick={() => {}}
            sx={{
              position: "absolute",
              top: OUTER_HEXAGON_POSITIONS[index].top,
              left: OUTER_HEXAGON_POSITIONS[index].left,
            }}
          >
            {letter}
          </HexagonButton>
        ))}

        <HexagonButton
          variant="center"
          onClick={() => {}}
          sx={{
            position: "absolute",
            top: "calc(50% - 50px)",
            left: "calc(50% - 50px)",
          }}
        >
          {spellingBee.centerLetter}
        </HexagonButton>
      </Box>
    </form>
  );
}
