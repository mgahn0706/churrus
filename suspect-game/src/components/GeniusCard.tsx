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
  const { isMobileWidth } = useMobileWidth();
  return (
    <CardActionArea
      sx={{
        borderRadius: "16px",
      }}
      onClick={() => {
        router.push(`/${content.url}`);
      }}
    >
      <Card
        elevation={2}
        sx={{
          border: `1px solid ${content.color}`,
          minHeight: 200,
          borderRadius: "16px",
          color: "#2e3545",
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            scale: 1.05,
            boxShadow: `0px 0px 10px 0px ${content.color}`,
          },
        }}
      >
        <CardContent
          sx={{
            height: "100%",
            bgcolor: "white",
          }}
        >
          <CardMedia
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
              opacity: 0.8,
            }}
          >
            <Box color={content.color}>{content.icon}</Box>
          </CardMedia>
          <Box display="flex" alignItems="center" mb={1}>
            <Casino
              sx={{
                mr: 1,
                fontSize: 16,
              }}
            />
            <Typography fontSize={isMobileWidth ? 18 : 24} fontWeight={600}>
              {content.title}
            </Typography>
          </Box>
          <Typography
            fontSize={12}
            fontWeight={300}
            color="#475063"
            height="40px"
          >
            {content.description}
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}
