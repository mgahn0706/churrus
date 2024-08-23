import { Avatar, Box, Typography } from "@mui/material";
import { Player } from "../../types/player";

const BGCOLORS = [
  "#1e6ef4",
  "#ef4452",
  "#f78002",
  "#50c578",
  "#a4aeb8",
  "#ea4d61",
  "#694131",
  "#8b8cf4",
  "#19a4a4",
  "#557f64",
  "#db8b30",
  "#6acd29",
  "#1e6ef4",
  "#313d4c",
];

export default function Result({ players }: { players: Player[] }) {
  const sortedPlayers = players.sort(
    (a, b) => b.score.current - a.score.current
  );

  let lastRank = 1;

  const playerRanks: number[] = sortedPlayers.map((player, index, array) => {
    if (index > 0 && player.score.current === array[index - 1].score.current) {
      return lastRank;
    } else {
      lastRank = index + 1;
      return lastRank;
    }
  });

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
      {players.map((player, index) => (
        <RankItem key={player.id} player={player} rank={playerRanks[index]} />
      ))}
    </Box>
  );
}

const RankItem = ({ player, rank }: { player: Player; rank: number }) => {
  return (
    <Box
      width={1}
      display="flex"
      justifyContent="space-between"
      gap={4}
      bgcolor="#2C2C35"
      borderRadius="12px"
      py={1}
      px={2}
    >
      <Box display="flex" alignItems="center" gap="12px" mr={1}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minWidth="16px"
          mr={1}
        >
          <Typography color="#318AE1" fontSize="16px" fontWeight={500}>
            {rank}
          </Typography>
        </Box>
        <Avatar
          sx={{
            fontSize: "16px",
            bgcolor: BGCOLORS[player.id % BGCOLORS.length],
            width: "24px",
            height: "24px",
          }}
        >
          {player.name[0]}
        </Avatar>
        <Box display="flex" alignItems="center">
          <Typography color="#E4E4E5" fontSize="18px" fontWeight={500}>
            {player.name}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        <Typography fontSize="18px" color="#E4E4E5" fontWeight={600}>
          {player.score.current}
        </Typography>
      </Box>
    </Box>
  );
};
