import HomeButton from "@/components/HomeButton";
import { useEffect, useState } from "react";

import { Box, Button, Card, IconButton, Typography } from "@mui/material";
import { ConceptType } from "@/features/frequency/types";
import ConceptCard from "@/features/frequency/components/ConceptCard";
import { FrequencyConcepts } from "@/features/frequency/fixtures";
import Dial from "@/features/frequency/components/Dial";
import { SkipNext } from "@mui/icons-material";

export default function Frequency() {
  const [round, setRound] = useState(1);

  const [phase, setPhase] = useState<
    | "IDLE"
    | "CONCEPT_REVEALED"
    | "CLUE_SUBMITTED"
    | "guess_dial"
    | "defend"
    | "answer_reveal"
  >("IDLE");

  const [score, setScore] = useState({
    red: 0,
    blue: 0,
  });

  const [concept, setConcept] = useState<ConceptType>({
    left: "",
    right: "",
  });

  const [exactDegree, setExactDegree] = useState(0);

  const [defenderPrediction, setDefenderPrediction] = useState<
    "left" | "right"
  >("left");

  const [playedConcepts, setPlayedConcepts] = useState<ConceptType[]>([]);

  useEffect(() => {
    setPlayedConcepts([...playedConcepts, concept]);
    const randomNumber = Math.floor(Math.random() * FrequencyConcepts.length);
    setConcept(
      playedConcepts.includes(FrequencyConcepts[randomNumber])
        ? FrequencyConcepts[randomNumber + 1]
        : FrequencyConcepts[randomNumber]
    );
    setExactDegree(Math.floor(Math.random() * 14));
  }, [round]);

  return (
    <Box textAlign="center" pt={4}>
      <HomeButton />

      <Typography variant="h5">내 마음의 주파수</Typography>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h6">Round {round}</Typography>
        <IconButton
          sx={{
            ml: 2,
          }}
          onClick={() => {
            setRound(round + 1);
          }}
        >
          <SkipNext />
        </IconButton>
      </Box>

      <Dial isCoverRemoved={phase === "guess_dial"} exactDegree={exactDegree} />

      <Box display="flex" justifyContent="center" mt="140px" mb={2}>
        <ConceptCard concept={concept} />
      </Box>
      <Button
        onClick={() => {
          setPhase(phase === "guess_dial" ? "IDLE" : "guess_dial");
        }}
      >
        {phase === "guess_dial" ? "다이얼 가리기" : "다이얼 열기"}
      </Button>
    </Box>
  );
}
