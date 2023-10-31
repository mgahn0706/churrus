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
        borderRadius: 2,
      }}
    >
      <CardContent
        sx={{
          height: "100%",
          bgcolor: content.color,
          color: "white",
          background: `radial-gradient(circle at center 15%, ${content.color} 0%, rgba(39,40,43,1) 55%);`,
        }}
      >
        <CardMedia
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <Box>{content.icon}</Box>
        </CardMedia>
        <Box display="flex" alignItems="center" mb={2}>
          <Casino
            sx={{
              mr: 1,
              fontSize: 16,
            }}
          />
          <Typography fontSize={28} fontWeight={600}>
            {content.title}
          </Typography>
        </Box>
        <Typography
          fontSize={12}
          fontWeight={300}
          color="#dddddd"
          height="40px"
        >
          {content.description}
        </Typography>
        <Button
          sx={{
            mt: 2,
          }}
          fullWidth
          variant="contained"
          onClick={() => {
            router.push(`/${content.url}`);
          }}
        >
          시작
        </Button>
      </CardContent>
    </Card>
  );
}
