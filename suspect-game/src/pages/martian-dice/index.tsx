import GlobalHeader from "@/components/Navigation/GlobalHeader";
import { Box, Grid, Typography } from "@mui/material";
import { useState } from "react";

export default function MarsDice() {
  const [activeDice, setActiveDice] = useState<
    "ALIEN" | "TANK" | "HUMAN" | "CHICKEN" | "COW"[]
  >([]);
  const [fixedDice, setFixedDice] = useState<
    "ALIEN" | "TANK" | "HUMAN" | "CHICKEN" | "COW"[]
  >([]);

  return (
    <>
      <GlobalHeader />
      <Box textAlign="center" pt={11} justifyContent="center" px={9}>
        <Typography variant="h3">마션 다이스</Typography>
        <Grid container spacing={3} mt={4}>
          <Grid item xs={6} justifyContent="center">
            <Box
              width="38vw"
              height="38vw"
              border="1px solid black"
              borderRadius={2}
            >
              Dice
            </Box>
          </Grid>
          <Grid item xs={6} justifyContent="center">
            <Box display="flex" flexDirection="column">
              <Typography variant="h5">SCORE BOARD</Typography>
              <Box mt={5} border="1px solid black" borderRadius={2}>
                dffe
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
