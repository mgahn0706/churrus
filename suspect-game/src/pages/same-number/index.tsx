import SelectedPanelItem from "@/features/same-number/components/SelectedPanelItem";
import PanelItem from "@/features/same-number/components/PanelItem";
import { calculator } from "@/features/same-number/utils/calculator";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import TargetNumberBox from "@/features/same-number/components/TargetNumberBox";
import Scoreboard from "@/features/same-number/components/Scoreboard";
import { Flip } from "@mui/icons-material";
import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import HomeButton from "@/components/HomeButton";

const ALPHABETS = [
  "A",
  "L",
  "I",
  "E",
  "Y",
  "O",
  "U",
  "M",
  "S",
  "T",
  "N",
  "R",
  "H",
  "D",
  "G",
  "K",
];

const availableTargetNumbers = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 26, 27, 28, 30, 32, 33, 35, 36, 40, 44, 48, 45, 50, 55, 60, 42, 54,
  66, 72, 56, 63, 70, 77, 84, 80, 88, 96, 90, 99, 108, 110, 120, 132,
];

export default function SameNumber() {
  const isMobileWidth = useResponsiveValue([true, true, false]);

  const [round, setRound] = useState(1);
  const [panel, setPanel] = useState<string[]>([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "+",
    "-",
    "x",
    "÷",
  ]);
  const [flippedPanels, setFlippedPanels] = useState<number[]>([]);
  const [selectedPanels, setSelectedPanels] = useState<number[]>([]);
  const [result, setResult] = useState("");
  const [score, setScore] = useState({
    player1: 0,
    player2: 0,
  });

  const [targetNumbers, setTargetNumbers] = useState<number[]>([]);

  useEffect(() => {
    const shuffledPanel = panel.sort(() => Math.random() - 0.5);
    setPanel(shuffledPanel);
    const shuffledTargetNumbers = availableTargetNumbers.sort(
      () => Math.random() - 0.5
    );
    setTargetNumbers(shuffledTargetNumbers);
  }, []);

  const handleSubmit = () => {
    if (selectedPanels.length !== 3) return;
    const submittedExpression = selectedPanels.map(
      (selectedPanel) => panel[selectedPanel]
    );
    const calculatedResult = calculator({
      n1: submittedExpression[0],
      operator: submittedExpression[1],
      n2: submittedExpression[2],
    });

    selectedPanels.forEach((selectedPanel, idx) => {
      setTimeout(() => {
        setFlippedPanels((prev) => [...prev, selectedPanel]);
      }, idx * 500);
    });

    setTimeout(() => {
      setResult(calculatedResult);
    }, selectedPanels.length * 500);

    if (Number(calculatedResult) !== targetNumbers[round - 1]) {
      setTimeout(() => {
        resetSubmit();
      }, (selectedPanels.length + 1) * 500);
    }

    setTimeout(() => {}, selectedPanels.length * 500);
  };

  const resetSubmit = () => {
    setFlippedPanels([]);
    setSelectedPanels([]);
    setResult("");
  };

  const handleFlipAll = () => {
    ALPHABETS.forEach((_, idx) => {
      setTimeout(() => {
        setFlippedPanels((prev) => [...prev, idx]);
      }, idx * 10);
    });
    setTimeout(() => {
      setFlippedPanels([]);
    }, 5000);
  };

  return (
    <Box>
      <HomeButton />
      <Box display="flex" justifyContent="center" mt={10}>
        <Typography lineHeight="40px" variant="h5">
          같은 숫자 찾기
        </Typography>
        {round === 1 && (
          <Tooltip title="5초간 숫자 공개" placement="right">
            <IconButton onClick={handleFlipAll}>
              <Flip />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Scoreboard
        score={score}
        onClick={setScore}
        player1Name="Player 1"
        player2Name="Player 2"
        winner={
          score.player1 >= 10
            ? "player1"
            : score.player2 >= 10
            ? "player2"
            : false
        }
      />
      {isMobileWidth && (
        <Box display="flex" justifyContent="center">
          <TargetNumberBox
            targetNumber={targetNumbers[round - 1]}
            round={round}
          />
        </Box>
      )}
      <Box display="flex" justifyContent="center" mt={2} alignItems="center">
        {!isMobileWidth && (
          <Box position="absolute" left="10%">
            <TargetNumberBox
              targetNumber={targetNumbers[round - 1]}
              round={round}
            />
          </Box>
        )}
        <Grid container width="430px" spacing={1} mb={2}>
          {panel.map((item, i) => (
            <Grid item xs={3}>
              <PanelItem
                isSelected={selectedPanels.includes(i)}
                isFlipped={flippedPanels.includes(i)}
                key={i}
                onClick={() => {
                  if (selectedPanels.includes(i)) {
                    setSelectedPanels(selectedPanels.filter((n) => n !== i));
                    return;
                  }
                  setSelectedPanels(
                    selectedPanels.length < 3
                      ? [...selectedPanels, i]
                      : selectedPanels
                  );
                }}
              >
                {flippedPanels.includes(i) ? item : ALPHABETS[i]}
              </PanelItem>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box display="flex" justifyContent="center" mt={2}>
        {selectedPanels.map((selectedPanel) => (
          <SelectedPanelItem key={selectedPanel}>
            {flippedPanels.includes(selectedPanel)
              ? panel[selectedPanel]
              : ALPHABETS[selectedPanel]}
          </SelectedPanelItem>
        ))}
        {Array(3 - selectedPanels.length)
          .fill(0)
          .map((_, i) => (
            <SelectedPanelItem key={i}>{""}</SelectedPanelItem>
          ))}
        <SelectedPanelItem onClick={result ? () => {} : handleSubmit}>
          =
        </SelectedPanelItem>
        <SelectedPanelItem>{result}</SelectedPanelItem>
      </Box>

      <Box display="flex" justifyContent="center" gap={2} mt={5}>
        {round > 1 && (
          <Button
            color="primary"
            onClick={() => {
              setRound(round - 1);
              resetSubmit();
            }}
          >
            이전 라운드
          </Button>
        )}
        {round < 61 && (
          <Button
            disabled={
              score.player1 >= 10 ||
              score.player2 >= 10 ||
              score.player1 + score.player2 < round
            }
            onClick={() => {
              setRound(round + 1);
              resetSubmit();
            }}
            variant="outlined"
          >
            다음 라운드
          </Button>
        )}
      </Box>
    </Box>
  );
}
