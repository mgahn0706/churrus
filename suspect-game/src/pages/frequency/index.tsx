import HomeButton from "@/components/HomeButton";
import { useEffect, useState } from "react";

import {
  Box,
  Card,
  Typography,
} from "@mui/material";
import { ConceptType } from "@/features/frequency/types";


export default function Frequency() {
  const [round, setRound] = useState(1);

  const [phase, setPhase] = useState('idle'); 

  const [score, setScore] = useState({
    red: 0,
    blue: 0
  })

  const [concept, setConcept] = useState({
    left: '',
    righr: '',
  })

  const [dial, setDial] = useState(8);

  const [defenderPrediction, setDefenderPrediction] = useState<'left' | 'right'>('left')
  

  const [playedConcepts, setPlayedConcepts] = useState<ConceptType[]>([])



  return (
    <Box textAlign="center" pt={4}>
      <HomeButton />

      <Typography variant="h5">내 마음의 주파수</Typography>
      <Typography variant="h6">Round {round}</Typography>
      <Card>
        <Typography variant="h6">왼쪽: {}</Typography>
        <Typography variant="h6">Score: {score.red} : {score.blue}</Typography>
      </Card>
    </Box>
  );
}
