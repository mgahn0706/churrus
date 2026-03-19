import { Paper, Typography } from "@mui/material";

interface InteractionScoreBadgeProps {
  count: number;
}

export default function InteractionScoreBadge({
  count,
}: InteractionScoreBadgeProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        position: "absolute",
        right: 16,
        bottom: 16,
        zIndex: 1081,
        px: 1.1,
        height: 32,
        borderRadius: 999,
        color: "rgba(255,255,255,0.82)",
        backgroundColor: "rgba(18,18,18,0.34)",
        backdropFilter: "blur(6px)",
        border: "1px solid rgba(255,255,255,0.12)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Typography
        variant="caption"
        sx={{
          fontFamily: "monospace",
          opacity: 0.84,
          lineHeight: 1,
        }}
      >
        행동 {count}
      </Typography>
    </Paper>
  );
}
