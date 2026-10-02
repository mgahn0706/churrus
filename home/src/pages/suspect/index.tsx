import { Box, Typography } from "@mui/material";

export default function SuspectMovedPage() {
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        px: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="h5" fontWeight={700}>
        협동 크라임씬은 이 주소로 이동되었어요
      </Typography>
    </Box>
  );
}
