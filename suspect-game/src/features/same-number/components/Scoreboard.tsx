import { Box } from "@mui/material";

export default function Scoreboard({
  score,
  player1Name,
  player2Name,
  winner,
  onClick,
}: {
  winner: "player1" | "player2" | false;
  score: {
    player1: number;
    player2: number;
  };
  player1Name: string;
  player2Name: string;
  onClick: ({ player1, player2 }: { player1: number; player2: number }) => void;
}) {
  return (
    <Box display="flex" justifyContent="center" mt={2} gap={2}>
      <Box
        fontSize="25px"
        textAlign="left"
        color="white"
        fontWeight="bold"
        display="flex"
        sx={{
          cursor: "pointer",
          boxShadow: winner === "player1" ? "0 0 10px 5px #044977" : "none",
        }}
        justifyContent="center"
        alignItems="center"
        border="solid 2px #044977"
        onClick={() => {
          onClick({
            ...score,
            player1: score.player1 + 1,
          });
        }}
      >
        <Box bgcolor="#044977" px={2}>
          Player 1
        </Box>
        <Box bgcolor="#eae0d4" color="black" px={1}>
          {score.player1}
        </Box>
      </Box>
      <Box
        fontSize="25px"
        textAlign="right"
        color="white"
        fontWeight="bold"
        display="flex"
        sx={{
          cursor: "pointer",
          boxShadow: winner === "player2" ? "0 0 10px 5px #660008" : "none",
        }}
        justifyContent="center"
        alignItems="center"
        border="solid 2px #660008"
        onClick={() => {
          onClick({
            ...score,
            player2: score.player2 + 1,
          });
        }}
      >
        <Box bgcolor="#eae0d4" color="black" px={1}>
          {score.player2}
        </Box>
        <Box bgcolor="#660008" px={2}>
          Player 2
        </Box>
      </Box>
    </Box>
  );
}
