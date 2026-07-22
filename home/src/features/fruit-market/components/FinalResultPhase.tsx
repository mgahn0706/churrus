import { Box, Chip, Paper, Typography } from "@mui/material";
import {
  formatFruitMarketMoney as money,
  FRUIT_META,
} from "@/features/fruit-market/constants";
import { FruitMarketGame } from "@/features/fruit-market/hooks/useFruitMarketGame";
import FruitMarketStage from "./FruitMarketStage";

interface FinalResultPhaseProps {
  game: FruitMarketGame;
}

export default function FinalResultPhase({ game }: FinalResultPhaseProps) {
  const { players } = game;

  return (
    <FruitMarketStage eyebrow="MARKET CLOSED" title="최종 수입">
      <Box display="grid" gap={1}>
        {[...players]
          .sort((a, b) => b.income - a.income)
          .map((player, index, ordered) => (
            <Paper
              key={player.id}
              elevation={0}
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                borderRadius: 3,
                bgcolor: index === 0 ? "#30241C" : "#F8F3EB",
                color: index === 0 ? "white" : "inherit",
              }}
            >
              <Typography
                width={48}
                fontSize={index === 0 ? 28 : 18}
                fontWeight={950}
              >
                {index + 1}
              </Typography>
              <Box flex={1}>
                <Typography fontWeight={900}>{player.name}</Typography>
                <Box display="flex" gap={0.75} mt={0.75}>
                  {player.fruits.map((fruit, fruitIndex) => (
                    <Typography key={`${fruit}-${fruitIndex}`}>
                      {FRUIT_META[fruit].emoji}
                    </Typography>
                  ))}
                </Box>
              </Box>
              <Typography variant="h5" fontWeight={950}>
                {money(player.income)}
              </Typography>
              {index === 0 && player.income === ordered[0].income && (
                <Chip
                  label="우승"
                  sx={{ ml: 2, bgcolor: "#F4C96B", fontWeight: 900 }}
                />
              )}
            </Paper>
          ))}
      </Box>
    </FruitMarketStage>
  );
}
