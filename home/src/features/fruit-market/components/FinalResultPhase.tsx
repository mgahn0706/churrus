import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { CloseRounded, HistoryRounded } from "@mui/icons-material";
import {
  formatFruitMarketMoney as money,
  FRUIT_META,
  FRUITS,
} from "@/features/fruit-market/constants";
import { FruitMarketGame } from "@/features/fruit-market/hooks/useFruitMarketGame";
import { FruitMarketSpecial } from "@/features/fruit-market/types";
import FruitMarketStage from "./FruitMarketStage";
import { useState } from "react";

interface FinalResultPhaseProps {
  game: FruitMarketGame;
}

export default function FinalResultPhase({ game }: FinalResultPhaseProps) {
  const { players, gameLogs } = game;
  const [logOpen, setLogOpen] = useState(false);

  const specialLabel = (
    special: FruitMarketSpecial,
    targetFruit?: string,
    replacementFruit?: string,
  ) => {
    if (special === "secret" && targetFruit) {
      return `비밀: ${targetFruit}`;
    }
    if (special === "replace" && targetFruit && replacementFruit) {
      return `교체: ${targetFruit} -> ${replacementFruit}`;
    }
    return "없음";
  };

  return (
    <FruitMarketStage eyebrow="MARKET CLOSED" title="최종 수입">
      <Box display="flex" justifyContent="flex-end" mb={1.5}>
        <Button
          variant="outlined"
          startIcon={<HistoryRounded />}
          onClick={() => setLogOpen(true)}
          sx={{
            borderColor: "#30241C",
            color: "#30241C",
            fontWeight: 900,
          }}
        >
          로그
        </Button>
      </Box>
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
      <Dialog
        open={logOpen}
        onClose={() => setLogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          fontWeight={900}
        >
          진행 로그
          <IconButton onClick={() => setLogOpen(false)} aria-label="닫기">
            <CloseRounded />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box display="grid" gap={2} pb={1}>
            {gameLogs.map((roundLog) => (
              <Box key={roundLog.round}>
                <Typography fontWeight={950} color="#30241C" mb={1}>
                  {roundLog.round}라운드
                </Typography>
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(auto-fit, minmax(180px, 1fr))"
                  gap={1}
                >
                  {roundLog.players.map((playerLog) => (
                    <Paper
                      key={`${roundLog.round}-${playerLog.playerId}`}
                      variant="outlined"
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        minWidth: 0,
                      }}
                    >
                      <Typography
                        fontWeight={900}
                        mb={0.75}
                        noWrap
                        title={playerLog.playerName}
                      >
                        {playerLog.playerName}
                      </Typography>
                      <Box display="flex" flexWrap="wrap" gap={0.75} mb={1}>
                        {FRUITS.filter(
                          (fruit) => playerLog.bids[fruit] !== undefined,
                        ).map((fruit) => (
                          <Chip
                            key={fruit}
                            label={`${FRUIT_META[fruit].emoji} ${fruit} ${money(
                              playerLog.bids[fruit] ?? 0,
                            )}`}
                            sx={{
                              bgcolor: FRUIT_META[fruit].soft,
                              color: FRUIT_META[fruit].color,
                              fontWeight: 800,
                              maxWidth: "100%",
                              "& .MuiChip-label": {
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              },
                            }}
                          />
                        ))}
                      </Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ wordBreak: "keep-all" }}
                      >
                        특수 행동:{" "}
                        {specialLabel(
                          playerLog.special,
                          playerLog.targetFruit,
                          playerLog.replacementFruit,
                        )}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
                {roundLog.round !== gameLogs[gameLogs.length - 1]?.round && (
                  <Divider sx={{ mt: 2 }} />
                )}
              </Box>
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </FruitMarketStage>
  );
}
