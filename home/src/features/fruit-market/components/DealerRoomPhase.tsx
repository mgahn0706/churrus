import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { ArrowBackRounded } from "@mui/icons-material";
import {
  formatFruitMarketMoney as money,
  FRUIT_META,
} from "@/features/fruit-market/constants";
import { FruitMarketGame } from "@/features/fruit-market/hooks/useFruitMarketGame";
import {
  Fruit,
  FruitMarketSpecial as Special,
} from "@/features/fruit-market/types";
import FruitChip from "./FruitChip";
import FruitMarketStage from "./FruitMarketStage";

interface DealerRoomPhaseProps {
  game: FruitMarketGame;
}

export default function DealerRoomPhase({ game }: DealerRoomPhaseProps) {
  const {
    round,
    players,
    currentPlayer,
    bids,
    bidPlayerIds,
    special,
    targetFruit,
    setTargetFruit,
    replacementFruit,
    setReplacementFruit,
    currentPlayerFruits,
    marketFruits,
    replacementFruitOptions,
    bidFruits,
    bidComplete,
    selectSpecial,
    setPlayerBid,
    submitBids,
    leaveDealerRoomWithoutSubmitting,
  } = game;

  if (!currentPlayer) return null;

  return (
    <FruitMarketStage
      eyebrow={`ROUND ${round} · DEALER ROOM`}
      title={`${currentPlayer.name}의 희망가`}
    >
      <Box maxWidth={620}>
        <Typography color="text.secondary">
          내가 판매하는 과일마다 1천 원부터 5천 원 사이의 희망가를 정해주세요.
        </Typography>
        <Box mt={2.5} p={2} borderRadius={3} bgcolor="#F8F3EB">
          <FormControlLabel
            control={
              <Checkbox
                checked={special !== "none"}
                disabled={currentPlayer.usedSpecial}
                onChange={(event) =>
                  selectSpecial(event.target.checked ? "secret" : "none")
                }
              />
            }
            label={
              currentPlayer.usedSpecial
                ? "특수 행동 사용 완료"
                : "이번 제출에 특수 행동 사용"
            }
          />
          {special !== "none" && (
            <Box display="flex" flexWrap="wrap" gap={1.5} mt={1.5}>
              <Select
                value={special}
                onChange={(event) =>
                  selectSpecial(event.target.value as Special)
                }
              >
                <MenuItem value="secret">비밀</MenuItem>
                <MenuItem
                  value="replace"
                  disabled={replacementFruitOptions.length === 0}
                >
                  교체
                </MenuItem>
              </Select>
              <Select
                value={targetFruit}
                onChange={(event) =>
                  setTargetFruit(event.target.value as Fruit)
                }
              >
                {(special === "replace"
                  ? currentPlayerFruits
                  : marketFruits
                ).map((fruit) => (
                  <MenuItem key={fruit} value={fruit}>
                    {FRUIT_META[fruit].emoji} {fruit}
                  </MenuItem>
                ))}
              </Select>
              {special === "replace" && (
                <Select
                  value={replacementFruit}
                  onChange={(event) =>
                    setReplacementFruit(event.target.value as Fruit)
                  }
                >
                  {replacementFruitOptions.map((fruit) => (
                    <MenuItem key={fruit} value={fruit}>
                      {FRUIT_META[fruit].emoji} {fruit}로 교체
                    </MenuItem>
                  ))}
                </Select>
              )}
            </Box>
          )}
        </Box>
        <Box display="grid" gap={1.5} mt={3}>
          {bidFruits.map((fruit) => (
            <Paper
              key={fruit}
              variant="outlined"
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 3,
              }}
            >
              <FruitChip fruit={fruit} />
              <Select
                displayEmpty
                value={bids[currentPlayer.id]?.[fruit] ?? ""}
                onChange={(event) =>
                  setPlayerBid(fruit, Number(event.target.value))
                }
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="" disabled>
                  희망가 선택
                </MenuItem>
                {[1000, 2000, 3000, 4000, 5000].map((value) => (
                  <MenuItem key={value} value={value}>
                    {money(value)}
                  </MenuItem>
                ))}
              </Select>
            </Paper>
          ))}
        </Box>
        <Box display="flex" flexWrap="wrap" gap={1.25} mt={3}>
          <Button
            variant="outlined"
            size="large"
            onClick={leaveDealerRoomWithoutSubmitting}
            startIcon={<ArrowBackRounded />}
            sx={{
              borderColor: "#30241C",
              color: "#30241C",
            }}
          >
            돌아가기
          </Button>
          <Button
            variant="contained"
            size="large"
            disabled={!bidComplete}
            onClick={submitBids}
            sx={{ bgcolor: "#30241C" }}
          >
            {bidPlayerIds.length === players.length - 1
              ? "라운드 마감"
              : "희망가 제출"}
          </Button>
        </Box>
      </Box>
    </FruitMarketStage>
  );
}
