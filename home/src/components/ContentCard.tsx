import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Box,
} from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export interface ContentType {
  title: string;
  url: string;
}

export default function ({
  content,
  children,
}: {
  content: ContentType;
  children: ReactNode;
}) {
  const router = useRouter();

  return (
    <CardActionArea
      onClick={() => {
        router.push(`/${content.url}`);
      }}
    >
      <Card elevation={4}>
        <CardContent
          sx={{
            minHeight: "150px",
          }}
        >
          {children}
          <Box
            display="flex"
            width="100%"
            sx={{
              bgcolor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              fontSize: "1.5rem",
              textAlign: "center",
              fontWeight: "bold",
              bottom: "0",
              left: "0",
              position: "absolute",
            }}
          >
            {content.title}
          </Box>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}
