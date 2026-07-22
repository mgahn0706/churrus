import { Box, Button, Paper, Typography } from "@mui/material";
import { FruitMarketGame } from "@/features/fruit-market/hooks/useFruitMarketGame";
import FruitChip from "./FruitChip";
import FruitMarketStage from "./FruitMarketStage";

interface DistributionPhaseProps {
  game: FruitMarketGame;
}

export default function DistributionPhase({ game }: DistributionPhaseProps) {
  const { players, startRounds } = game;

  return (
    <FruitMarketStage eyebrow="DISTRIBUTION" title="과일 배정이 완료됐습니다">
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        }}
        gap={1.5}
      >
        {players.map((player) => (
          <Paper
            key={player.id}
            variant="outlined"
            sx={{ p: 2, borderRadius: 3 }}
          >
            <Typography fontWeight={900} mb={1.25}>
              {player.name}
            </Typography>
            <Box display="flex" gap={1}>
              {player.fruits.map((fruit, index) => (
                <FruitChip key={`${fruit}-${index}`} fruit={fruit} />
              ))}
            </Box>
          </Paper>
        ))}
      </Box>
      <Button
        variant="contained"
        size="large"
        onClick={startRounds}
        sx={{ mt: 3, bgcolor: "#30241C" }}
      >
        1라운드 시작
      </Button>
    </FruitMarketStage>
  );
}
