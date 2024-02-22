import { useMobileWidth } from "@/hooks/useMobileWIdth";
import { Casino } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export interface PuzzleCardProps {
  src: string;
  color: string;
  title: string;
  url: string;
  disabled?: boolean;
}

export default function PuzzleCard({
  src,
  title,
  url,
  color,
  disabled,
}: PuzzleCardProps) {
  const router = useRouter();

  return (
    <CardActionArea
      sx={{
        borderRadius: "20px",
      }}
      onClick={() => {
        if (!disabled) {
          router.push(`/${url}`);
          return;
        }
        window.alert("아직 준비중이에요, 조금만 기다려주세요!");
      }}
    >
      <Card
        sx={{
          border: `2px solid ${color}`,
          minHeight: 150,
          borderRadius: "16px",
          color: "#2e3545",
          bgcolor: disabled ? "#f0f0f0" : "#ffffff",
          transition: "all 0.2s ease-in-out",
        }}
      >
        <Box
          display="flex"
          p={4}
          height={150}
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box display="flex" justifyContent="end">
            <Image src={src} alt={title} width={60} height={60} />
          </Box>
          <Typography
            sx={{
              wordBreak: "keep-all",
              color: "#121212",
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
          >
            {title}
          </Typography>
        </Box>
      </Card>
    </CardActionArea>
  );
}
