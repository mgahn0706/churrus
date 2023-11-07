import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  CardActionArea,
} from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export interface ContentType {
  title: string;
  description: string;
  icon: ReactNode;
  label: string;
  url: string;
  color: {
    main: string;
    dark: string;
  };
}

export default function ({ content }: { content: ContentType }) {
  const router = useRouter();

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
        elevation={4}
        sx={{
          borderRadius: "16px",
          height: 200,
          color: "#212937",
          backgroundColor: content.color.main,
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
        }}
      >
        <CardContent
          sx={{
            pt: 3,
          }}
        >
          <Box display="flex" flexDirection="column">
            <Box
              bgcolor="transparent"
              border="1px solid #5f6a80"
              borderRadius="4px"
              width="fit-content"
              height="fit-content"
              px={1}
              py={0.5}
              fontSize={8}
              fontWeight={400}
              mb={1}
            >
              {content.label}
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Box display="flex" flexDirection="column">
                <Typography fontSize={27} fontWeight={700}>
                  {content.title}
                </Typography>
                <Typography fontSize={16} fontWeight={300}>
                  {content.description}
                </Typography>
              </Box>

              <Box
                display="flex"
                justifyContent="flex-end"
                color="#212937"
                sx={{
                  opacity: 0.1,
                }}
              >
                {content.icon}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}
