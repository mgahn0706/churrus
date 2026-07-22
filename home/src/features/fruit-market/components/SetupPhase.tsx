import {
  AddRounded,
  ArrowForwardRounded,
  RemoveRounded,
} from "@mui/icons-material";
import { Box, Button, Chip, Paper, TextField, Typography } from "@mui/material";
import { FRUIT_META, FRUITS } from "@/features/fruit-market/constants";
import { FruitMarketGame } from "@/features/fruit-market/hooks/useFruitMarketGame";
import FruitMarketStage from "./FruitMarketStage";

interface SetupPhaseProps {
  game: FruitMarketGame;
}

export default function SetupPhase({ game }: SetupPhaseProps) {
  const {
    participantNames,
    setParticipantNames,
    counts,
    participants,
    requiredCount,
    totalCount,
    setupReady,
    changeCount,
    startGame,
  } = game;

  return (
    <FruitMarketStage
      eyebrow="MARKET SETUP"
      title="오늘 장사할 사람과 과일을 정해주세요"
    >
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "1fr",
          md: "minmax(0, .8fr) minmax(0, 1.2fr)",
        }}
        gap={4}
      >
        <Box>
          <Typography fontWeight={900} mb={1}>
            참가자 명단
          </Typography>
          <TextField
            multiline
            minRows={7}
            fullWidth
            value={participantNames}
            onChange={(event) => setParticipantNames(event.target.value)}
            placeholder={"민수\n지수\n현우\n서연"}
            helperText="한 줄에 한 명씩 또는 쉼표로 구분하세요."
          />
          {participants.length > 0 && (
            <Box display="flex" flexWrap="wrap" gap={0.75} mt={2}>
              {participants.map((name, index) => (
                <Chip key={`${name}-${index}`} label={name} />
              ))}
            </Box>
          )}
        </Box>
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="end"
            mb={1.5}
          >
            <Box>
              <Typography fontWeight={900}>과일 구성</Typography>
              <Typography variant="body2" color="text.secondary">
                각 과일의 수량을 정해주세요.
              </Typography>
            </Box>
            <Typography
              fontWeight={900}
              color={
                totalCount === requiredCount && requiredCount > 0
                  ? "success.main"
                  : "#C96D35"
              }
            >
              {totalCount} / {requiredCount}
            </Typography>
          </Box>
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
            }}
            gap={1}
          >
            {FRUITS.map((fruit) => {
              const meta = FRUIT_META[fruit];

              return (
                <Paper
                  key={fruit}
                  variant="outlined"
                  sx={{
                    p: 1.25,
                    display: "flex",
                    alignItems: "center",
                    borderRadius: 2.5,
                    borderColor: counts[fruit] > 0 ? meta.color : "#E4DDD4",
                    bgcolor: counts[fruit] > 0 ? meta.soft : "#FFF",
                  }}
                >
                  <Typography fontSize={28} mr={1}>
                    {meta.emoji}
                  </Typography>
                  <Typography fontWeight={900} flex={1}>
                    {fruit}
                  </Typography>
                  <Button
                    onClick={() => changeCount(fruit, -1)}
                    disabled={counts[fruit] === 0}
                    sx={{ minWidth: 34, p: 0.5 }}
                  >
                    <RemoveRounded />
                  </Button>
                  <Typography width={28} textAlign="center" fontWeight={900}>
                    {counts[fruit]}
                  </Typography>
                  <Button
                    onClick={() => changeCount(fruit, 1)}
                    sx={{ minWidth: 34, p: 0.5 }}
                  >
                    <AddRounded />
                  </Button>
                </Paper>
              );
            })}
          </Box>
          {!setupReady && (
            <Typography variant="body2" color="text.secondary" mt={1.5}>
              참가자 2명 이상, 과일 2종 이상, 총 {requiredCount}개가 필요합니다.
            </Typography>
          )}
        </Box>
      </Box>
      <Button
        size="large"
        variant="contained"
        disabled={!setupReady}
        onClick={startGame}
        endIcon={<ArrowForwardRounded />}
        sx={{
          mt: 4,
          px: 3,
          bgcolor: "#30241C",
          "&:hover": { bgcolor: "#4B392C" },
        }}
      >
        무작위 배정하기
      </Button>
    </FruitMarketStage>
  );
}
