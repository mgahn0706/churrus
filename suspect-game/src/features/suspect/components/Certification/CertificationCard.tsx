import { CertificationCardType } from "@/features/suspect/types";
import { Box } from "@mui/material";

export default function CertificationCard({
  card,
}: {
  card: CertificationCardType;
}) {
  return <Box>{card.title}</Box>;
}
