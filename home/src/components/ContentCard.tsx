import { AddCircleOutline, PlayCircleOutline } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Box,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export interface ContentType {
  title: string;
  description: string;
  image: string;
  url: string;
}

export default function ContentCard({ content }: { content: ContentType }) {
  const router = useRouter();

  return (
    <CardActionArea
      onClick={() => {
        router.push(`/${content.url}`);
      }}
      sx={{
        borderRadius: "20px",
      }}
    >
      <Card
        elevation={4}
        sx={{
          borderRadius: "20px",
          "&:hover": {
            "& .content-description-text": {
              display: "block",
            },
            "& .content-image": {
              filter: "blur(30px)",
              transform: "scale(1.2)",
              transition: "all 0.1s ease-in",
            },
            "& .content-title-text": {
              fontSize: "1.5rem",
            },
            "& .play-icon": {
              display: "none",
            },
          },
        }}
      >
        <CardContent
          sx={{
            minHeight: "200px",
            borderRadius: "20px",
          }}
        >
          <CardMedia
            component="img"
            height="194px"
            image={content.image}
            alt={content.title}
            className="content-image"
          />
          <Box
            display="flex"
            maxWidth={300}
            flexDirection="column"
            gap={1}
            sx={{
              py: 2,
              top: 20,
              wordBreak: "keep-all",
              left: 40,
              position: "absolute",
            }}
          >
            <Typography
              color="#333d4b"
              fontSize="2rem"
              sx={{
                transition: "all 0.3s ease-in-out",
              }}
              fontWeight="bold"
              display="block"
              className="content-title-text"
            >
              {content.title}
            </Typography>
            <PlayCircleOutline
              className="play-icon"
              sx={{
                transition: "all 0.3s ease-in-out",
                color: "#333d4b",
                fontSize: "2rem",
              }}
            />
            <Typography
              className="content-description-text"
              color="#333d4b"
              fontSize={18}
              display="none"
              sx={{
                transition: "all 0.3s ease-in-out",
              }}
            >
              {content.description}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}
