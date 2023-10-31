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
        borderRadius: "4px",
        height: 200,
        color: "white",
        backgroundColor: content.color.main,
        background: `linear-gradient(45deg, ${content.color.dark} 5%, ${content.color.main} 50%, ${content.color.dark} 95%)`,
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
              <Button
                variant="contained"
                sx={{
                  mt: 4,
                  color: "white",
                  px: 5,
                  width: "fit-content",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                  },
                }}
                onClick={() => router.push(content.url)}
              >
                시작
              </Button>
            </Box>

            <Box display="flex" justifyContent="flex-end">
              {content.icon}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
