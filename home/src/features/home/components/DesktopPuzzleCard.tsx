import { Box, Card, CardActionArea, Typography } from "@mui/material";
import Image from "next/image";

interface DeskropPuzzleCardProps {
  src: string;
  title: string;
  subtitle: string;
  onClick: () => void;
}

export default function DesktopPuzzleCard({
  src,
  title,
  subtitle,
  onClick,
}: DeskropPuzzleCardProps) {
  return (
    <CardActionArea
      onClick={onClick}
      sx={{
        maxWidth: "245px",
        minHeight: "127px",
        borderRadius: "12px",
      }}
    >
      <Card
        elevation={0}
        sx={{
          backgroundColor: "#F5F6FA",
          borderRadius: "12px",
          minHeight: "90px",
          alignItems: "center",
          p: 3,
        }}
      >
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" flexDirection="column">
            <Typography color="#6b6b6b" fontSize="12px">
              {subtitle}
            </Typography>
            <Typography
              color="#121212"
              fontSize="22px"
              fontWeight="bold"
              sx={{
                width: "150px",
                wordBreak: "keep-all",
              }}
            >
              {title}
            </Typography>
          </Box>
          <Image width={48} height={48} src={src} alt={title} />
        </Box>
      </Card>
    </CardActionArea>
  );
}
