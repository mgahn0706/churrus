import { Box, MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";
import useFoodChainPlayerContext from "../../context";
import { ANIMALS } from "../../fixtures/animal";

export default function PeekingPhase() {
  const [peekingPlayerId, setPeekingPlayerId] = useState(1);

  const { playerStatus } = useFoodChainPlayerContext();

  const currentPlayer = playerStatus.find(
    (player) => player.id === peekingPlayerId
  );

  if (!currentPlayer || !currentPlayer.role) {
    return null;
  }

  const peekingCount = ANIMALS[currentPlayer.role].peekingCount;

  return (
    <Box width={1}>
      <Box display="flex" flexDirection="column">
        <Typography color="#121212" fontSize="18px">
          엿보기
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          mt="8px"
          mb="4px"
        >
          {Array.from({ length: peekingCount }).map((_, index) => (
            <Box key={index} mt={2}>
              <PeekingInput playerId={peekingPlayerId} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

const PeekingInput = ({ playerId }: { playerId: number }) => {
  const { playerStatus } = useFoodChainPlayerContext();

  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  return (
    <Box display="flex" flexDirection="column">
      <Select
        value={selectedPlayer}
        onChange={(e) => setSelectedPlayer(e.target.value as number)}
      >
        {playerStatus
          .filter((player) => player.id !== playerId)
          .map((player) => (
            <MenuItem value={player.id}>
              {player.id}번 {player.name}
            </MenuItem>
          ))}
      </Select>
    </Box>
  );
};
