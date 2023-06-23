import { useMobileWidth } from "@/hooks/useMobileWIdth";
import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import { useWindowSize } from "@/hooks/useWindowSize";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useMemo } from "react";

interface ContentType {
  category: string;
  title: string;
  description: string;
  url: string;
  color: string;
}

const contents: ContentType[] = [
  {
    category: "추리",
    title: "협동 크라임씬",
    description: "다함께 용의자들 중 범인을 추리하세요.",
    url: "suspect",
    color: "#FF0060",
  },
  {
    category: "더 지니어스",
    title: "마이너스 경매",
    description: "",
    url: "auction",
    color: "#F6FA70",
  },
  {
    category: "더 지니어스",
    title: "미스터리 사인",
    description: "",
    url: "mystery-sign",
    color: "#00DFA2",
  },
  {
    category: "문제풀이",
    title: "문제적 추러스",
    description: "",
    url: "problematic",
    color: "#0079FF",
  },
  {
    category: "추리",
    title: "장편 추리 문제",
    description: "",
    url: "murder-mystery",
    color: "",
  },
  {
    category: "더 지니어스",
    title: "체인옥션",
    description: "",
    url: "chain-auction",
    color: "",
  },
];

export default function Churrus() {
  const responsiveXS = useResponsiveValue([12, 6, 4]);

  const ContentCard = ({ content }: { content: ContentType }) => {
    const router = useRouter();
    return (
      <Grid item xs={responsiveXS}>
        <Card
          variant="outlined"
          sx={{
            transition: "all 0.2s",
            height: 200,
            boxShadow: `#3b82f6 0px 3px 8px`,
            "&:hover": {
              border: `#0f0f70 solid 2px`,
              boxShadow: `#3b82f6 0px 5px 8px`,
            },
          }}
        >
          <CardContent
            onClick={() => {
              router.push(`/${content.url}`);
            }}
            sx={{
              height: 200,
            }}
          >
            {" "}
            <Typography
              variant="h5"
              component="div"
              color="#3b82f6"
              fontWeight="bold"
              gutterBottom
            >
              {content.title}
            </Typography>
            <Typography variant="body2" color="#3b82f6">
              {content.description}
            </Typography>
          </CardContent>
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
