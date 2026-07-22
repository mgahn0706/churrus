import { Box, LinearProgress, Typography } from "@mui/material";
import { useFruitMarketGame } from "@/features/fruit-market/hooks/useFruitMarketGame";
import BidLobbyPhase from "./BidLobbyPhase";
import DealerRoomGate from "./DealerRoomGate";
import DealerRoomPhase from "./DealerRoomPhase";
import DistributionPhase from "./DistributionPhase";
import FinalResultPhase from "./FinalResultPhase";
import RoundResultPhase from "./RoundResultPhase";
import SetupPhase from "./SetupPhase";

export function FruitMarketPageContent() {
  const game = useFruitMarketGame();
  const { phase, round, currentPlayer, roomOpen } = game;
  const showRoundProgress =
    phase !== "setup" && phase !== "distribution" && phase !== "final";

  return (
    <Box
      minHeight="100dvh"
      pt={{ xs: 2, md: 4 }}
      pb={8}
      px={{ xs: 2, md: 4 }}
      sx={{
        backgroundColor: "#17110D",
        backgroundImage: "url('/image/genius-background.png')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: { md: "fixed" },
      }}
    >
      <Box maxWidth="1120px" mx="auto">
        {showRoundProgress && (
          <Box mb={3}>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography fontWeight={800}>{round}라운드</Typography>
              <Typography color="text.secondary">총 4라운드</Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(round / 4) * 100}
              sx={{
                height: 8,
                borderRadius: 9,
                bgcolor: "#E6D8C5",
                "& .MuiLinearProgress-bar": { bgcolor: "#C96D35" },
              }}
            />
          </Box>
        )}

        {phase === "setup" && <SetupPhase game={game} />}
        {phase === "distribution" && <DistributionPhase game={game} />}
        {phase === "bid" && !currentPlayer && <BidLobbyPhase game={game} />}
        {phase === "bid" && currentPlayer && !roomOpen && (
          <DealerRoomGate game={game} />
        )}
        {phase === "bid" && currentPlayer && roomOpen && (
          <DealerRoomPhase game={game} />
        )}
        {phase === "result" && <RoundResultPhase game={game} />}
        {phase === "final" && <FinalResultPhase game={game} />}
      </Box>
    </Box>
  );
}
