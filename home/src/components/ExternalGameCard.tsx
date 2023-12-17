import { useMobileWidth } from "@/hooks/useMobileWIdth";
import { HelpOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";

export interface ExternalGameContentType {
  title: string;
  color: {
    primary: string;
    secondary: string;
  };
  url: string;
  imgSrc: string;
  description?: string;
}

export default function ExternalGameCard({
  content,
}: {
  content: ExternalGameContentType;
}) {
  return (
    <CardActionArea
      sx={{
        borderRadius: "16px",
      }}
      onClick={() => {
        if (!content.url) return;
        window.open(content.url, "_blank", "noopener noreferrer");
      }}
    >
      <Card
        sx={{
          minHeight: 60,
          color: "#202836",
          alignItems: "center",
          borderRadius: "16px",
          verticalAlign: "middle",
          display: "flex",
        }}
      >
        <CardMedia
          component="img"
          image={content.imgSrc}
          title={content.title}
          sx={{
            height: 60,
            width: 60,
            textAlign: "center",
            justifyContent: "center",
            borderRadius: "16px",
          }}
        />

        <Typography
          color="#202836"
          textAlign="center"
          fontSize="18px"
          sx={{
            width: "100%",
            wordBreak: "keep-all",
          }}
        >
          {content.title}
        </Typography>
      </Card>
    </CardActionArea>
  );
}
