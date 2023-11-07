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
  const { isMobileWidth } = useMobileWidth();
  return (
    <CardActionArea
      sx={{
        borderRadius: "16px",
      }}
      onClick={() => {
        window.open(content.url, "_blank", "noopener noreferrer");
      }}
    >
      <Card
        sx={{
          pb: 2,
          minHeight: 180,
          color: "#202836",
          alignContent: "center",
          borderRadius: "16px",
          verticalAlign: "middle",
        }}
      >
        <CardMedia
          component="img"
          image={content.imgSrc}
          title={content.title}
          sx={{
            mb: 1,
            height: 150,
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
            wordBreak: "keep-all",
          }}
        >
          {content.title}
        </Typography>
      </Card>
    </CardActionArea>
  );
}
