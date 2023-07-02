import { Box, Typography } from "@mui/material";

export default function Timer({ remainingTime }: { remainingTime: number }) {
  return (
    <Box textAlign="center" m={2}>
      {remainingTime > 0 && (
        <Typography color="red">{remainingTime}</Typography>
      )}
    </Box>
  );
}
