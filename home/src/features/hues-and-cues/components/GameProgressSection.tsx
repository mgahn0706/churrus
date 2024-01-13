import { PlayArrow } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { GamePhaseType } from "../types";

export default function GameProgressSection({
  disabled,
  hints,
  phase,
  playerName,
  onNextPhase,
}: {
  disabled: boolean;
  hints: [string, string];
  phase: GamePhaseType;
  playerName: string;
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
              {playerName}님이 <br />한 단어 힌트를 제시할 차례입니다.
            </Typography>
          </Box>
        );

      case "SECOND_GUESS":
        return (
          <Box
            sx={{
              wordBreak: "keep-all",
            }}
          >
            <Typography
              fontSize="1.5rem"
              fontWeight="bold"
              textAlign="center"
              sx={{
                wordBreak: "keep-all",
              }}
            >
              {hints[1]}
            </Typography>
            <Typography variant="body2" textAlign="center">
              {playerName}님이 위 단어에 대한 색깔을 맞출 차례입니다.
            </Typography>
          </Box>
        );
      case "SECOND_CLUE":
        return (
          <Box>
            <Typography variant="h6" textAlign="center">
              {playerName}님이 <br />두 단어 힌트를 제시할 차례입니다.
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
