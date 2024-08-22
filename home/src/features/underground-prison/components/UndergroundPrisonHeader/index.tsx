import { Box, Button, Typography } from "@mui/material";

interface UndergroundPrisonHeaderProps {
  round: number;
  onNextRoundClick: () => void;
}

export default function UndergroundPrisonHeader({
  round,
  onNextRoundClick,
}: UndergroundPrisonHeaderProps) {
  return (
    <Box
      display="flex"
      zIndex={2}
      justifyContent="space-between"
      position="absolute"
      top={0}
      bgcolor="rgba(31,31,42,0.5)"
      left={0}
      px={2}
      width="calc(100% - 32px)"
      alignItems={"center"}
      height="52px"
      sx={{
        backdropFilter: "blur(10px)",
      }}
    >
      <Typography color="#FFFFFF" fontSize="18px" fontWeight="bold">
        지하감옥
      </Typography>
      <Typography color="#FFFFFF" fontSize="18px" fontWeight="bold">
        {round ? `${round} 라운드` : "게임 준비"}
      </Typography>
      <Button variant="contained" onClick={onNextRoundClick}>
        카드 제시
      </Button>
    </Box>
  );
}
