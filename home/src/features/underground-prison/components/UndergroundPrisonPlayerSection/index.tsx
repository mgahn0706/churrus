import { Box, Grid, Typography } from "@mui/material";
import { Player } from "../../types/player";

interface UndergroundPrisonPlayerSectionProps {
  players: Player[];
}

export default function UndergroundPrisonPlayerSection({
  players,
}: UndergroundPrisonPlayerSectionProps) {
  console.log(players);
  return (
    <Box
      display="flex"
      px="62px"
      bgcolor="#1F1F2A"
      height="120px"
      alignItems="center"
      bottom="0"
      zIndex={2}
      position="absolute"
      width="calc(100% - 124px)"
    >
      <Grid container columnSpacing={2}>
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
                {player.score.current}
              </Typography>
              <ScoreChange scoreChange={player.score.changed} />
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
