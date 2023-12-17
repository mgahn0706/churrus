import { useMobileWidth } from "@/hooks/useMobileWIdth";
import { useResponsiveValue } from "@/hooks/useResponsiveValue";
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

  const isMobileWidth = useResponsiveValue([1, 1, 0]);

  useEffect(() => {
    setIsTargetNumberShowing(false);
  }, [round]);

  if (isMobileWidth) {
    return (
      <Box
        my={2}
        border="3px solid #673238"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          cursor: isTargetNumberShowing ? "default" : "pointer",
        }}
        onClick={() => {
          setIsTargetNumberShowing(true);
        }}
        height="40px"
      >
        <Box height="100%" textAlign="center" bgcolor="#f6deb2" px={2}>
          <Typography color="black" variant="h6" lineHeight="40px">
            ROUND {round}
          </Typography>
        </Box>
        <Box
          height="100%"
          textAlign="center"
          bgcolor="#673238"
          px={3}
          lineHeight="40px"
        >
          <Typography variant="h4" color="white" fontWeight="bolder">
            {isTargetNumberShowing ? targetNumber : "?"}
          </Typography>
        </Box>
      </Box>
    );
  }

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
