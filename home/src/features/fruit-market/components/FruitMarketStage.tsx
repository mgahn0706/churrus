import { Paper, Typography } from "@mui/material";
import { ReactNode } from "react";

interface FruitMarketStageProps {
  eyebrow: string;
  title: string;
  children: ReactNode;
}

export default function FruitMarketStage({
  eyebrow,
  title,
  children,
}: FruitMarketStageProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, md: 4 },
        border: "1px solid #E7DDCE",
        borderRadius: 4,
        bgcolor: "rgba(255,255,255,.92)",
      }}
    >
      <Typography
        fontSize={12}
        fontWeight={900}
        letterSpacing=".14em"
        color="#A55A2A"
      >
        {eyebrow}
      </Typography>
      <Typography variant="h4" fontWeight={900} color="#30241C" mt={0.5} mb={3}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
}
