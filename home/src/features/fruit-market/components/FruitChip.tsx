import { Chip } from "@mui/material";
import { FRUIT_META } from "@/features/fruit-market/constants";
import { Fruit } from "@/features/fruit-market/types";

interface FruitChipProps {
  fruit: Fruit;
}

export default function FruitChip({ fruit }: FruitChipProps) {
  const meta = FRUIT_META[fruit];

  return (
    <Chip
      label={`${meta.emoji} ${fruit}`}
      sx={{ bgcolor: meta.soft, color: meta.color, fontWeight: 800 }}
    />
  );
}
