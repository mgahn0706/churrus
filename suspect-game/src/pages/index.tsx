import { Box, Typography } from "@mui/material";

export default function Churrus() {
  return (
    <Box display="flex" justifyContent="center">
      <Box display="flex" justifyContent="center" mt={10}>
        <Typography
          fontWeight="bolder"
          variant="h2"
          sx={{
            background: "linear-gradient(to right, #59b8ff, #0f0f70)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          CHURRUS
        </Typography>
        <Typography></Typography>
      </Box>
    </Box>
  );
}
