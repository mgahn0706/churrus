import { useMobileWidth } from "@/hooks/useMobileWIdth";
import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import { useWindowSize } from "@/hooks/useWindowSize";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useMemo } from "react";

interface ContentType {
  title: string;
  description: string;
  url: string;
  color: string;
}

const contents: ContentType[] = [
  {
    title: "협동 크라임씬",
    description: "",
    url: "suspect",
    color: "red",
  },
  {
    title: "마이너스 경매",
    description: "",
    url: "auction",
    color: "blue",
  },
  {
    title: "미스터리 사인",
    description: "",
    url: "mystery-sign",
    color: "green",
  },
  {
    title: "문제적 추러스",
    description: "",
    url: "problematic",
    color: "yellow",
  },
  {
    title: "장편 추리 문제",
    description: "",
    url: "murder-mystery",
    color: "",
  },
  {
    title: "체인옥션",
    description: "",
    url: "chain-auction",
    color: "",
  },
];

export default function Churrus() {
  const responsiveXS = useResponsiveValue([12, 6, 4]);

  const ContentCard = ({ content }: { content: ContentType }) => {
    return (
      <Grid item xs={responsiveXS}>
        <Card
          sx={{
            height: 200,
          }}
        >
          <CardContent>{content.title}</CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <Box>
      <Box display="flex" justifyContent="center" mt={10}>
        <Typography
          fontWeight="bolder"
          variant="h2"
          sx={{
            background: "linear-gradient(to right, #59b8ff, #0f0f70)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          CHURRUS
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center">
        <Typography>서울대학교 추리 동아리</Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        mt={10}
        mx="auto"
        px="1rem"
        maxWidth="1020px"
      >
        <Grid container spacing={3}>
          {contents.map((content) => (
            <ContentCard key={content.title} content={content} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
