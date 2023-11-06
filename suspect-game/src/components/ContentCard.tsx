import { Card, CardContent, Box, Typography, Button } from "@mui/material";
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
    <Card
      sx={{
        borderRadius: "16px",
        height: 200,
        color: "white",
        border: `1px solid white`,
        backgroundColor: content.color.main,
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          backgroundColor: content.color.dark,
          scale: 1.05,
        },
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
            border="1px solid rgba(255, 255, 255, 0.5)"
            borderRadius="4px"
            width="fit-content"
            height="fit-content"
            px={1}
            py={0.5}
            fontSize={8}
            fontWeight={300}
            mb={1}
          >
            {content.label}
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" flexDirection="column">
              <Typography fontSize={27} fontWeight={600}>
                {content.title}
              </Typography>
              <Typography fontSize={16} fontWeight={300}>
                {content.description}
              </Typography>
            </Box>

            <Box display="flex" justifyContent="flex-end" color="white">
              {content.icon}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
