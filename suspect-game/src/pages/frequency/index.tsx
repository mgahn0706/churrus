import HomeButton from "@/components/HomeButton";
import { useEffect, useState } from "react";

import { Box, Card, Typography } from "@mui/material";
import { ConceptType } from "@/features/frequency/types";
import ConceptCard from "@/features/frequency/components/ConceptCard";
import { FrequencyConcepts } from "@/features/frequency/fixtures";
import Dial from "@/features/frequency/components/Dial";

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

  const [dial, setDial] = useState(8);

  const [defenderPrediction, setDefenderPrediction] = useState<
    "left" | "right"
  >("left");

  const [playedConcepts, setPlayedConcepts] = useState<ConceptType[]>([]);

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * FrequencyConcepts.length);
    setConcept(FrequencyConcepts[randomNumber]);
  }, []);

  return (
    <Box textAlign="center" pt={4}>
      <HomeButton />

      <Typography variant="h5">내 마음의 주파수</Typography>
      <Typography variant="h6">Round {round}</Typography>
      <Dial isCoverRemoved={phase === "guess_dial"} />

      <Box display="flex" justifyContent="center" mt="100px">
        <ConceptCard concept={concept} />
      </Box>
    </Box>
  );
}
