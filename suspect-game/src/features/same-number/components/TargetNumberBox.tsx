import { Box, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function TargetNumberBox({
  targetNumber,
  round,
}: {
  targetNumber: number;
  round: number;
}) {
  const [isTargetNumberShowing, setIsTargetNumberShowing] = useState(false);

  useEffect(() => {
    setIsTargetNumberShowing(false);
  }, [round]);

  return (
    <Box
      border="3px solid #673238"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        cursor: isTargetNumberShowing ? "default" : "pointer",
      }}
      onClick={() => {
        setIsTargetNumberShowing(true);
      }}
      width="108px"
      height="88px"
    >
      <Box width="100%" textAlign="center" bgcolor="#f6deb2">
        <Typography color="black" variant="h6">
          ROUND {round}
        </Typography>
      </Box>
      <Box width="100%" textAlign="center" bgcolor="#673238">
        <Typography variant="h3" color="white" fontWeight="bolder">
          {isTargetNumberShowing ? targetNumber : "?"}
        </Typography>
      </Box>
    </Box>
  );
}
