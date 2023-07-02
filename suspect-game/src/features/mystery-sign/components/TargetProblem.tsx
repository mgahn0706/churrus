import {
  Box,
  Button,
  ListItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import { DragHandle } from "@mui/icons-material";
import { useEffect, useState } from "react";
import useMysterySign from "../hooks/useMysterySign";
import TargetProblemData from "../fixtures/TargetProblemData";

export default function TargetProblem({ round }: { round: number }) {
  const [enteredAnswer, setEnteredAnswer] = useState("");
  const [isAnswerSubmitted, setAnswerSubmitted] = useState(false);

  const answer = useMysterySign({
    first: TargetProblemData[round].first,
    second: TargetProblemData[round].second,
    round,
  });

  useEffect(() => {
    setAnswerSubmitted(false);
    setEnteredAnswer("");
  }, [round]);

  return (
    <Tooltip
      arrow
      disableHoverListener
      open={isAnswerSubmitted}
      title={TargetProblemData[round].description}
    >
      <Box
        border="1px solid lightgray"
        borderRadius="20px"
        my={2}
        pb={1}
        pt={1}
        width="300px"
      >
        <ListItem>
          <Typography textAlign="center" width="100px" fontSize="30px">
            {TargetProblemData[round].first}
          </Typography>
          <HelpIcon sx={{ m: 1 }} />
          <Typography textAlign="center" width="100px" fontSize="30px">
            {TargetProblemData[round].second}
          </Typography>
          <DragHandle sx={{ m: 2 }} />
          {!isAnswerSubmitted && (
            <TextField
              sx={{ width: "120px", fontSize: "30px" }}
              onChange={(e) => {
                if (
                  (/^[0-9]+$/.test(e.target.value) && e.target.value !== "0") ||
                  !e.target.value
                ) {
                  setEnteredAnswer(e.target.value);
                }
              }}
              value={enteredAnswer}
            />
          )}
          {isAnswerSubmitted && (
            <Typography textAlign="center" width="100px" fontSize="30px">
              {answer}
            </Typography>
          )}
        </ListItem>

        <Button
          disabled={!enteredAnswer}
          sx={{ height: "20px", fontSize: "10px" }}
          variant="outlined"
          onClick={() => {
            if (answer === enteredAnswer) {
              window.alert("정답입니다! 승점 +1");
              setAnswerSubmitted(true);
            } else {
              window.alert("오답입니다. 승점 -1");
              setEnteredAnswer("");
            }
          }}
        >
          정답 제출
        </Button>
      </Box>
    </Tooltip>
  );
}
