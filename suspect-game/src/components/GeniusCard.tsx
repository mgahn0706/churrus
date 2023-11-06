import { Casino } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export interface GeniusContentType {
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  url: string;
}

export default function GeniusCard({
  content,
}: {
  content: GeniusContentType;
}) {
  const router = useRouter();
  return (
    <Card
      sx={{
        minHeight: 320,
        borderRadius: "16px",
      }}
    >
      <CardContent
        sx={{
          height: "100%",
          bgcolor: "white",
          color: "white",
        }}
      >
        <CardMedia
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <Box color={content.color}>{content.icon}</Box>
        </CardMedia>
        <Box display="flex" alignItems="center" mb={2}>
          <Casino
            sx={{
              mr: 1,
              fontSize: 16,
            }}
          />
          <Typography fontSize={28} fontWeight={600} color="black">
            {content.title}
          </Typography>
        </Box>
        <Typography
          fontSize={12}
          fontWeight={300}
          color="#222222"
          height="40px"
        >
          {content.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
