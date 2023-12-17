import { Box, TextField, Button } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import { useState } from "react";

import Timer from "./Timer";
import useTimer from "../hooks/useTimer";
import { HintType } from "../types";
import useMysterySign from "../hooks/useMysterySign";

interface HintInputProps {
  onEnterHint: (hint: HintType) => void;
  round: number;
}

export default function HintInput({ onEnterHint, round }: HintInputProps) {
  const [enteredValue, setEnteredValue] = useState<{
    first: string;
    second: string;
  }>({
    first: "",
    second: "",
  });
  const [isPlayerOneFirst, setPlayerOneFirst] = useState(true);

  const validateInput = (input: string) => {
    if (!input) {
      return true;
    }
    return /^[0-9]+$/.test(input);
  };

  const result = useMysterySign({ ...enteredValue, round: round });
  const { remainingTime, resetTimer } = useTimer({
    initialRemainingTime: 30,
  });

  return (
    <Box display="flex">
      <TextField
        id="outlined-basic"
        error={!validateInput(enteredValue.first)}
        label={isPlayerOneFirst ? "선 플레이어" : "후 플레이어"}
        onChange={(e) => {
          if (e.target.value !== "0") {
            setEnteredValue({ ...enteredValue, first: e.target.value });
          }
        }}
        value={enteredValue.first}
      />
      <HelpIcon
        sx={{
          m: 2,
        }}
      />
      <TextField
        id="outlined-basic"
        error={!validateInput(enteredValue.second)}
        label={isPlayerOneFirst ? "후 플레이어" : "선 플레이어"}
        onChange={(e) => {
          if (e.target.value !== "0") {
            setEnteredValue({ ...enteredValue, second: e.target.value });
          }
        }}
        value={enteredValue.second}
      />
      <Button
        disabled={
          remainingTime > 0 ||
          !validateInput(enteredValue.first) ||
          !validateInput(enteredValue.second) ||
          !enteredValue.first ||
          !enteredValue.second
        }
        sx={{
          ml: 2,
        }}
        variant="outlined"
        onClick={() => {
          resetTimer();
          setEnteredValue({ first: "", second: "" });
          setPlayerOneFirst(!isPlayerOneFirst);
          onEnterHint({
            ...enteredValue,
            result,
          });
        }}
      >
        입력
      </Button>
      <Timer remainingTime={remainingTime} />
    </Box>
  );
}
