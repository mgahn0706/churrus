import { Box } from "@mui/material";
import { PlayerType } from "../types";

export default function PlayerScoreSection({
  currentOrder,
  players,
}: {
  currentOrder: number;
  players: PlayerType[];
}) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      color="white"
      justifyContent="space-between"
      bgcolor="#313131"
      alignItems="center"
      width="180px"
      px={2}
      borderRadius="5px"
      height="580px"
    >
      <Box
        display="flex"
        p={2}
        gap={2}
        flexDirection="column"
        alignItems="center"
        borderRadius="5px"
        height="720px"
        overflow="scroll"
        bgcolor="#313131"
        width="100%"
      >
        {players.length > 0 ? (
          players.map((player, idx) => (
            <Box
              height="50px"
              display="flex"
              mx={2}
              px={2}
              alignItems="center"
              key={player.id}
              width="100%"
              color={idx === currentOrder ? "black" : "white"}
              borderRadius="5px"
              bgcolor={idx === currentOrder ? "#bcbcbc" : "#494949"}
            >
              <Box
                display="flex"
                alignItems="center"
                p={1}
                color="white"
                width="20px"
                height="20px"
                textAlign="center"
                justifyContent="center"
                fontWeight="bold"
                bgcolor="#313131"
                mr={2}
                borderRadius="50%"
              >
                {player.score}
              </Box>
              {player.name}
            </Box>
          ))
        ) : (
          <Box width="15vdw" color="white" my={6}>
            플레이어가 없습니다.
          </Box>
        )}
      </Box>
    </Box>
  );
}
