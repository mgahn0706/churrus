import { Box, Button, TextField } from "@mui/material";
import HexagonButton from "./HexagonButton";
import { useState } from "react";
import hangul from "hangul-js";
import { RestartAlt } from "@mui/icons-material";

interface HiveProps {
  centerLetter: string;
  outerLetters: string[];
  onSubmit: (answer: string[]) => void;
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

export default function Hive({
  centerLetter,
  outerLetters,
  onSubmit,
}: HiveProps) {
  const [input, setInput] = useState<string[]>([]);

  const [shuffledOuterLetters, setShuffledOuterLetters] =
    useState<string[]>(outerLetters);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(input);
        setInput([]);
      }}
    >
      <Box
        display="flex"
        mt={1}
        justifyContent="center"
        alignItems="center"
        width={1}
        flexDirection="column"
      >
        <TextField
          sx={{
            px: 12,
          }}
          id="spelling-bee-input"
          autoFocus
          style={{
            maxWidth: "300px",
          }}
          inputProps={{
            style: {
              textAlign: "center",
              fontSize: "2rem",
            },
          }}
          variant="standard"
          value={hangul.assemble(input)}
          onChange={(e) => {
            const value = e.target.value;
            setInput([...hangul.disassemble(value)]);
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
          {shuffledOuterLetters.map((letter, index) => (
            <HexagonButton
              key={letter}
              variant="outer"
              onClick={() => {
                setInput([...input, letter]);
              }}
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
            onClick={() => {
              setInput([...input, centerLetter]);
            }}
            sx={{
              position: "absolute",
              top: "calc(50% - 50px)",
              left: "calc(50% - 50px)",
            }}
          >
            {centerLetter}
          </HexagonButton>
        </Box>
        <Box width="100%" display="flex" justifyContent="center">
          <Box
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            width="300px"
          >
            <Button
              variant="outlined"
              sx={{
                height: "50px",
                width: "100px",
                borderRadius: "50px",
                fontSize: "1.2rem",
              }}
              onClick={() => setInput([])}
            >
              초기화
            </Button>
            <Button
              variant="outlined"
              sx={{
                height: "50px",
                width: "50px",
                borderRadius: "50px",
                fontSize: "1.2rem",
              }}
              onClick={() => {
                setShuffledOuterLetters(
                  [...shuffledOuterLetters].sort(() => Math.random() - 0.5)
                );
              }}
            >
              <RestartAlt />
            </Button>
            <Button
              variant="contained"
              type="submit"
              sx={{
                height: "50px",
                width: "100px",
                borderRadius: "50px",
                fontSize: "1.2rem",
              }}
            >
              제출
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  );
}
