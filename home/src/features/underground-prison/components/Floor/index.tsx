import { Box, Grid, Typography } from "@mui/material";
import { Player } from "../../types/player";

interface FloorProps {
  floor: number;
  players: Player[];
}

export default function Floor({ floor, players }: FloorProps) {
  return (
    <Box
      display="flex"
      alignItems="center"
      width={1}
      borderTop={floor % 10 === 1 ? "2px solid #3485FA" : "2px solid #2C2C35"}
    >
      <Box
        display="flex"
        bgcolor="#1F1F2A"
        alignItems="center"
        justifyContent="center"
        width="58px"
        borderRight="1px solid #2C2C35"
        height="84px"
        mr="4px"
        flexDirection="column"
      >
        <Typography color="#9E9EA5" fontWeight="bold">
          {floor}F
        </Typography>
        <Typography color="#9E9EA5" fontSize="12px">
          {`(${floor % 10})`}
        </Typography>
      </Box>
      <Grid container columnSpacing={2} width="calc(100% - 110px)">
        {players.map((player) => (
          <Grid xs={12 / players.length} key={player.id} item>
            {player.floor === floor && (
              <Box
                sx={{
                  transition: "all 0.3s ease",
                }}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                borderRadius="12px"
                bgcolor="#2C2C35"
                py={1}
              >
                <Typography color="#E4E4E5" fontSize="24px" fontWeight="bold">
                  {player.name}
                </Typography>
              </Box>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
