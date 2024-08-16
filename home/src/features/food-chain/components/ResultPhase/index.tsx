import {
  Box,
  Button,
  Card,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import useFoodChainPlayerContext from "../../context";
import Image from "next/image";
import { ANIMALS } from "../../fixtures/animal";
import { Player } from "../../types";
import { EmojiEventsRounded } from "@mui/icons-material";
import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import useCheckVictory from "../../hooks/useCheckVictory";

export default function ResultPhase({
  onNextPhase,
}: {
  onNextPhase: () => void;
}) {
  const { playerStatus, resetPlayers } = useFoodChainPlayerContext();

  useCheckVictory();

  const xs = useResponsiveValue([12, 12, 6]);

  return (
    <Box width={1}>
      <Box display="flex" flexDirection="column">
        <Typography color="#121212" fontSize="24px" fontWeight={500}>
          먹이사슬 결과
        </Typography>
      </Box>
      <Grid container spacing={2} xs={12} mt={1}>
        <Grid item xs={xs}>
          <Typography color="#121212" fontSize="16px" height="18px">
            우승자
          </Typography>
          <Card
            sx={{
              minHeight: "100px",
              p: "12px",
              mt: "8px",
            }}
          >
            {playerStatus
              .filter((player) => player.result === "WIN")
              .map((player) => (
                <PlayerCard key={player.id} player={player} hasWon={true} />
              ))}
          </Card>
        </Grid>
        <Grid item xs={xs}>
          <Card
            sx={{
              mt: "26px",
              minHeight: "100px",
              p: "12px",
            }}
          >
            {playerStatus
              .filter((player) => player.result === "LOSE")
              .map((player) => (
                <PlayerCard key={player.id} player={player} hasWon={false} />
              ))}
          </Card>
        </Grid>
      </Grid>
      <Box position="fixed" bottom="12px" right="18px">
        <Button
          sx={{
            borderRadius: "50px",
          }}
          fullWidth
          onClick={() => {
            resetPlayers();
            onNextPhase();
          }}
        >
          게임 종료
        </Button>
      </Box>
    </Box>
  );
}

const PlayerCard = ({
  player,
  hasWon,
}: {
  player: Player;
  hasWon: boolean;
}) => {
  if (!player.role) {
    return null;
  }
  return (
    <Card
      elevation={0}
      sx={{
        p: "12px",

        borderRadius: "12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box display="flex" gap="12px">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minWidth="16px"
        >
          <Typography color="#318AE1" fontSize="16px" fontWeight={500}>
            {player.id}
          </Typography>
        </Box>
        <Image
          src={`/image/icon/food-chain/${player.role}.svg`}
          width={48}
          alt={`${player.role} icon`}
          height={48}
        />
        <Box
          display="flex"
          flexDirection="column"
          gap="4px"
          justifyContent="space-between"
        >
          <Typography color="#121212" fontSize="16px" fontWeight={500}>
            {player.name}
          </Typography>
          <Typography color="#828282" fontSize="12px">
            {ANIMALS[player.role].name}
          </Typography>
        </Box>
      </Box>
      {hasWon && (
        <EmojiEventsRounded
          sx={{
            color: "#318AE1",
          }}
        />
      )}
    </Card>
  );
};
