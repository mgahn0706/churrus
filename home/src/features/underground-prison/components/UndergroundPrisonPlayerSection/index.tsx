import { Box, Grid, Typography } from "@mui/material";
import { Player } from "../../types/player";

interface UndergroundPrisonPlayerSectionProps {
  players: Player[];
  round: number;
}

export default function UndergroundPrisonPlayerSection({
  players,
  round,
}: UndergroundPrisonPlayerSectionProps) {
  return (
    <Box
      display="flex"
      px="62px"
      bgcolor="#1F1F2A"
      height="120px"
      alignItems="center"
      bottom="0"
      position="absolute"
      width="calc(100% - 124px)"
    >
      <Grid xs={12} container columnSpacing={2}>
        {players.map((player) => (
          <Grid xs={12 / players.length} key={player.id} item>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              borderRadius="12px"
              bgcolor="#2C2C35"
              py={1}
            >
              <Typography color="#E4E4E5" fontSize="16px">
                {player.name}
              </Typography>
              <Typography color="#E4E4E5" fontSize="24px" fontWeight="bold">
                {player.scoreHistory[round]}
              </Typography>
              <ScoreChange
                scoreChange={
                  player.scoreHistory[round] - player.scoreHistory[round - 1]
                }
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

const ScoreChange = ({ scoreChange }: { scoreChange: number }) => {
  if (scoreChange > 0) {
    return (
      <Typography color="#F04352" fontSize="16px">
        {`(+${scoreChange})`}
      </Typography>
    );
  }
  if (scoreChange < 0) {
    return (
      <Typography color="#3485FA" fontSize="16px">
        {`(${scoreChange})`}
      </Typography>
    );
  }
  return (
    <Typography color="#E4E4E5" fontSize="16px">
      {"(0)"}
    </Typography>
  );
};
