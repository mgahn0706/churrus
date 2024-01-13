import { PlayArrow } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

export default function GameProgressSection({
  currentCluerName,
  onGameStart,
}: {
  currentCluerName: string;
  onGameStart: () => void;
}) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      color="white"
      justifyContent="center"
      bgcolor="#313131"
      alignItems="center"
      width="180px"
      px={2}
      borderRadius="5px"
      height="120px"
    >
      <IconButton onClick={onGameStart}>
        <PlayArrow sx={{ fontSize: "2.3rem", color: "white" }} />
      </IconButton>
    </Box>
  );
}
