import { CheckRounded, LockRounded } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { FruitMarketGame } from "@/features/fruit-market/hooks/useFruitMarketGame";
import FruitMarketStage from "./FruitMarketStage";

interface BidLobbyPhaseProps {
  game: FruitMarketGame;
}

export default function BidLobbyPhase({ game }: BidLobbyPhaseProps) {
  const { round, players, bidPlayerIds, selectPlayer } = game;

  return (
    <FruitMarketStage
      eyebrow={`ROUND ${round} · DEALER ROOM`}
      title="희망가를 제시할 참가자"
    >
      <Typography color="text.secondary" mb={2}>
        도착한 참가자가 자기 이름을 선택해 딜러룸에 입장하세요.
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        }}
        gap={1}
      >
        {players.map((player) => {
          const completed = bidPlayerIds.includes(player.id);

          return (
            <Button
              key={player.id}
              disabled={completed}
              variant={completed ? "outlined" : "contained"}
              onClick={() => selectPlayer(player.id)}
              endIcon={completed ? <CheckRounded /> : <LockRounded />}
              sx={{
                justifyContent: "space-between",
                py: 1.5,
                px: 2,
                bgcolor: completed ? undefined : "#30241C",
              }}
            >
              {player.name}
              {completed ? " · 제출 완료" : ""}
            </Button>
          );
        })}
      </Box>
      <Typography variant="body2" color="text.secondary" mt={2}>
        {bidPlayerIds.length} / {players.length}명 제출
      </Typography>
    </FruitMarketStage>
  );
}
