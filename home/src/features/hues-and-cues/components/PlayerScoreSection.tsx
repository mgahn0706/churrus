import { Box } from "@mui/material";
import { PlayerType } from "../types";
import { PsychologyAlt, Star } from "@mui/icons-material";
import { getColorCodeFromNumbers } from "../libs";

export default function PlayerScoreSection({
  currentOrder,
  currentGuessingPlayer,
  players,
}: {
  currentOrder: number;
  currentGuessingPlayer: number;
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
              justifyContent="space-between"
              mx={2}
              px={2}
              alignItems="center"
              key={player.id}
              width="100%"
              color={idx === currentGuessingPlayer ? "black" : "white"}
              borderRadius="5px"
              bgcolor={idx === currentGuessingPlayer ? "#bcbcbc" : "#494949"}
            >
              <Box display="flex" alignItems="center">
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
                <Box
                  width="60px"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  sx={{ mr: 2 }}
                >
                  {player.name}
                </Box>

                {player.selectedColors.map((color) => (
                  <Box
                    display="flex"
                    justifyContent="center"
                    key={color[0]}
                    alignItems="center"
                    sx={{ mr: 1 }}
                    bgcolor={"#000000"}
                    width="24px"
                    height="24px"
                    color="#121212"
                    fontWeight="bold"
                    textAlign="center"
                  >
                    {getColorCodeFromNumbers(color)}
                  </Box>
                ))}
              </Box>

              {idx === currentOrder && <Star sx={{ ml: 2 }} fontSize="small" />}
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
