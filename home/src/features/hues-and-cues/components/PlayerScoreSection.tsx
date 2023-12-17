import { Box } from "@mui/material";
import { PlayerType } from "../types";

export default function PlayerScoreSection({
  players,
}: {
  players: PlayerType[];
}) {
  return (
    <Box bgcolor="white">
      {players.map((player) => (
        <Box key={player.id}>
          {player.name} : {player.score}
        </Box>
      ))}
    </Box>
  );
}
