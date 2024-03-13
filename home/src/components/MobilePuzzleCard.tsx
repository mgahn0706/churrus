import { ArrowForwardIos } from "@mui/icons-material";
import { Box, SxProps, Typography } from "@mui/material";
import Image from "next/image";

interface MobilePuzzleCardProps {
  title: string;
  subtitle: string;
  src: string;
  sx?: SxProps;
  onClick: () => void;
}

export default function MobilePuzzleCard({
  title,
  subtitle,
  src,
  sx,
  onClick,
}: MobilePuzzleCardProps) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px={3}
      bgcolor="#ffffff"
      borderRadius={20}
      minHeight="60px"
      sx={{
        ...sx,
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "rgba(0, 0, 0, 0.04)",
          transition: "0.1s",
        },
      }}
      onClick={onClick}
    >
      <Box display="flex" flexDirection="row" alignItems="center" gap={3}>
        <Image src={src} width={32} height={32} alt={title} />
        <Box display="flex" flexDirection="column">
          <Typography color="black" fontSize={18} fontWeight="bold">
            {title}
          </Typography>
          <Typography fontSize={12} color="text.secondary">
            {subtitle}
          </Typography>
        </Box>
      </Box>
      <ArrowForwardIos color="action" />
    </Box>
  );
}
