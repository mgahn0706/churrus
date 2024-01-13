import { PlayArrow } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { GamePhaseType } from "../types";

export default function GameProgressSection({
  disabled,
  phase,
  currentCluerName,
  onNextPhase,
}: {
  disabled: boolean;
  phase: GamePhaseType;
  currentCluerName: string;
  onNextPhase: () => void;
}) {
  const content = () => {
    switch (phase) {
      case "PLAYER_SETTING":
        return (
          <IconButton
            disabled={disabled}
            onClick={onNextPhase}
            sx={{
              color: "white",
              fontSize: "2.5rem",
            }}
          >
            <PlayArrow />
          </IconButton>
        );
      case "FIRST_CLUE":
        return (
          <Box>
            <Typography variant="h6" textAlign="center">
              {currentCluerName}님이 <br />한 단어 힌트를 제시할 차례입니다.
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  };

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
      {content()}
    </Box>
  );
}
