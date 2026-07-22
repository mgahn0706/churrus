import {
  ArrowForwardRounded,
  LockRounded,
  SwapHorizRounded,
} from "@mui/icons-material";
import { Box, Button, Chip, Typography } from "@mui/material";
import { FruitMarketGame } from "@/features/fruit-market/hooks/useFruitMarketGame";
import FruitMarketStage from "./FruitMarketStage";

interface DealerRoomGateProps {
  game: FruitMarketGame;
}

export default function DealerRoomGate({ game }: DealerRoomGateProps) {
  const { currentPlayer, replacementNotices, setRoomOpen } = game;

  if (!currentPlayer) return null;

  return (
    <FruitMarketStage
      eyebrow="DEALER ROOM"
      title={`${currentPlayer.name} 님 차례입니다`}
    >
      <Box maxWidth={520}>
        <Box
          display="flex"
          gap={1.5}
          alignItems="center"
          p={2}
          borderRadius={3}
          bgcolor="#F6F0E7"
        >
          <LockRounded color="action" />
          <Typography color="text.secondary">
            다른 플레이어는 화면을 보지 않도록 해주세요.
          </Typography>
        </Box>
        {replacementNotices.length > 0 && (
          <Box mt={2}>
            {replacementNotices.map((notice) => (
              <Chip
                key={notice}
                icon={<SwapHorizRounded />}
                label={notice}
                sx={{ mr: 1 }}
              />
            ))}
          </Box>
        )}
        <Button
          variant="contained"
          size="large"
          onClick={() => setRoomOpen(true)}
          endIcon={<ArrowForwardRounded />}
          sx={{ mt: 3, bgcolor: "#30241C" }}
        >
          입장하기
        </Button>
      </Box>
    </FruitMarketStage>
  );
}
