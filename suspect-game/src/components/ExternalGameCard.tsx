import { HelpOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
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
  icon: ReactNode;
  description?: string;
}

export default function ExternalGameCard({
  content,
}: {
  content: ExternalGameContentType;
}) {
  return (
    <Card
      sx={{
        minHeight: 200,
        borderRadius: 2,
      }}
    >
      <CardContent
        sx={{
          height: "100%",
          bgcolor: content.color,
          color: "white",
          background: `linear-gradient(45deg, ${content.color.primary} 0%, ${content.color.secondary} 100%)`,
        }}
      >
        {content.icon}
      </CardContent>
      <CardActions
        sx={{
          backgroundColor: "#27282b",
          flexDirection: "column",
          textAlign: "left",
        }}
      >
        <Typography
          sx={{
            color: "rgba(255,255,255,0.8)",
            fontWeight: 300,
            fontSize: 16,
          }}
        >
          {content.title}
        </Typography>

        <Button
          fullWidth
          onClick={() => {
            window.open(content.url, "_blank", "noopener noreferrer");
          }}
        >
          이동
        </Button>
      </CardActions>
    </Card>
  );
}
