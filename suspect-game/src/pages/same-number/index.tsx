import SelectedPanelItem from "@/features/same-number/components/SelectedPanelItem";
import PanelItem from "@/features/same-number/components/PanelItem";
import { calculator } from "@/features/same-number/utils/calculator";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

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

interface PanelType {
  alphabet: string;
  number: string;
  isShowingNumber: boolean;
}

export default function SameNumber() {
  const [round, setRound] = useState(1);
  const [panel, setPanel] = useState<PanelType[][]>([
    [
      { alphabet: "A", number: "1", isShowingNumber: false },
      { alphabet: "L", number: "2", isShowingNumber: false },
      { alphabet: "I", number: "3", isShowingNumber: false },
      { alphabet: "E", number: "4", isShowingNumber: false },
    ],
    [
      { alphabet: "Y", number: "5", isShowingNumber: false },
      { alphabet: "O", number: "6", isShowingNumber: false },
      { alphabet: "U", number: "7", isShowingNumber: false },
      { alphabet: "M", number: "8", isShowingNumber: false },
    ],
    [
      { alphabet: "S", number: "9", isShowingNumber: false },
      { alphabet: "T", number: "10", isShowingNumber: false },
      { alphabet: "N", number: "11", isShowingNumber: false },
      { alphabet: "R", number: "12", isShowingNumber: false },
    ],
    [
      { alphabet: "H", number: "+", isShowingNumber: false },
      { alphabet: "D", number: "-", isShowingNumber: false },
      { alphabet: "G", number: "x", isShowingNumber: false },
      { alphabet: "K", number: "÷", isShowingNumber: false },
    ],
  ]);
  const [targetNumbers, setTargetNumbers] = useState(availableTargetNumbers);
  const [selectedPanels, setSelectedPanels] = useState<PanelType[]>([]);
  const [result, setResult] = useState("");

  useEffect(() => {
    const numbers = panel.flatMap((row) => row.map((item) => item.number));

    numbers.sort(() => Math.random() - 0.5);

    const shuffledPanel = panel.map((row, rowIdx) =>
      row.map((item, colIdx) => {
        return { ...item, number: numbers[rowIdx * 4 + colIdx] };
      })
    );
    setPanel(shuffledPanel);
    const newTargetNumbers = targetNumbers.sort(() => Math.random() - 0.5);
    setTargetNumbers(newTargetNumbers);
  }, []);

  const handleSubmit = () => {
    if (selectedPanels.length !== 3) return;
    const submittedExpression = selectedPanels.map((panel) => panel.number);
    setResult(
      calculator({
        expression: submittedExpression,
      })
    );
  };

  const resetSubmit = () => {
    setSelectedPanels([]);
    setResult("");
  };

  return (
    <Box>
      <Box display="flex" justifyContent="center" mt={10}>
        <Typography>같은 숫자 찾기 </Typography>
        <Typography>{round}라운드</Typography>
      </Box>
      <Box>타깃넘버: {targetNumbers[round - 1]}</Box>

      <Box display="flex" justifyContent="center" mt={2}>
        <Box>
          {panel.map((row, i) => (
            <Box key={i} display="flex">
              {row.map((col, j) => (
                <PanelItem
                  key={j}
                  onClick={() => {
                    if (
                      selectedPanels.length < 3 &&
                      !selectedPanels.includes(col)
                    ) {
                      setSelectedPanels([...selectedPanels, col]);
                    }
                  }}
                >
                  {col.isShowingNumber ? col.number : col.alphabet}
                </PanelItem>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" mt={2}>
        {selectedPanels.map((selectedPanel) => (
          <SelectedPanelItem
            key={selectedPanel.number}
            onClick={() => {
              resetSubmit();
            }}
          >
            {selectedPanel.number}
          </SelectedPanelItem>
        ))}
        {Array(3 - selectedPanels.length)
          .fill(0)
          .map((_, i) => (
            <SelectedPanelItem
              key={i}
              onClick={() => {
                resetSubmit();
              }}
            >
              {""}
            </SelectedPanelItem>
          ))}
        <SelectedPanelItem onClick={handleSubmit}>=</SelectedPanelItem>
        <SelectedPanelItem
          onClick={() => {
            resetSubmit();
          }}
        >
          {result}
        </SelectedPanelItem>
      </Box>

      <Box display="flex" justifyContent="center" mt={2}>
        {round < 61 && (
          <Button
            onClick={() => {
              setRound(round + 1);
              resetSubmit();
            }}
          >
            다음 라운드
          </Button>
        )}
      </Box>
    </Box>
  );
}
