import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const ALPHABETS = [
  ["A", "L", "I", "E"],
  ["Y", "O", "U", "M"],
  ["S", "T", "N", "R"],
  ["H", "D", "G", "K"],
];

const availableTargetNumbers = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 40, 44, 48, 45, 50,
  55, 60, 42, 54, 66, 72, 56, 63, 70, 77, 84, 80, 88, 96, 90, 99, 108, 110, 120,
  132,
];

export default function SameNumber() {
  const [round, setRound] = useState(1);
  const [panel, setPanel] = useState<string[][]>([
    ["7", "3", "10", "5"],
    ["-", "11", "+", "2"],
    ["1", "6", "8", "x"],
    ["9", "÷", "12", "4"],
  ]);
  const [targetNumbers, setTargetNumbers] = useState(
    availableTargetNumbers.sort(() => Math.random() - 0.5)
  );
  const shuffle = (array: (number | string)[]) => {
    array.sort(() => Math.random() - 0.5);
    return array;
  };

  return (
    <Box>
      <Box display="flex" justifyContent="center" mt={10}>
        <Typography>같은 숫자 찾기 </Typography>
        <Typography>{round}라운드</Typography>
      </Box>
      <Box display="flex" justifyContent="center" mt={2}>
        <Box>타깃넘버: {targetNumbers[round - 1]}</Box>
        <Box>
          {panel.map((row, i) => (
            <Box key={i} display="flex">
              {row.map((col, j) => (
                <Box
                  sx={{ cursor: "pointer" }}
                  key={j}
                  width="50px"
                  height="50px"
                  border="1px solid black"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  onClick={() => {}}
                >
                  {col}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" mt={2}>
        <Button onClick={() => setRound(round + 1)}>다음 라운드</Button>
      </Box>
    </Box>
  );
}
