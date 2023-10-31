import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Icon,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import {
  AutoStories,
  Category,
  ConnectWithoutContact,
  Dashboard,
  DirectionsRun,
  Filter1,
  Help,
  IndeterminateCheckBox,
  OpenInNew,
  Quiz,
  Route,
  Search,
  ShowChart,
  Shuffle,
  Sms,
} from "@mui/icons-material";
import Image from "next/image";
import GlobalHeader from "@/components/GlobalHeader";

interface ContentType {
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

const CONTENTS: ContentType[] = [
  {
    title: "문제적 추러스",
    description: "창의적이고 어려운 문제들",
    icon: (
      <Quiz
        sx={{
          fontSize: 120,
          opacity: 0.8,
        }}
      />
    ),
    label: "정기모임",
    url: "quiz",
    color: {
      main: "#ea0650",
      dark: "#b10b35",
    },
  },
  {
    title: "협동 크라임씬",
    description: "범인을 추리하라",
    icon: (
      <Search
        sx={{
          fontSize: 120,
          opacity: 0.8,
        }}
      />
    ),
    label: "정기모임",
    url: "suspect",
    color: {
      main: "#7615bb",
      dark: "#5d0894",
    },
  },
  {
    title: "추러스 커넥션",
    description: "네 개씩 네 그룹으로",
    icon: (
      <Dashboard
        sx={{
          fontSize: 120,
          opacity: 0.8,
        }}
      />
    ),
    label: "NEW",
    url: "connections",
    color: {
      main: "#1ba713",
      dark: "#149d0f",
    },
  },
];

const BACKGROUND_COLOR = "#202125";

export default function Churrus() {
  const responsiveXS = useResponsiveValue([12, 6, 4]);

  const router = useRouter();

  const ContentCard = ({ content }: { content: ContentType }) => {
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
  };

  return (
    <Box bgcolor={BACKGROUND_COLOR} minHeight="100vh" minWidth="100vw" pt={10}>
      <GlobalHeader />
      <Box display="flex" justifyContent="center">
        <Box display="flex" justifyContent="center" width="60vw" height="40vh">
          <Box
            width="20vw"
            display="flex"
            flexDirection="column"
            px={5}
            py={5}
            justifyContent="flex-start"
            gap={3}
          >
            <Typography color="white" variant="h6">
              2023년 10월 정기모임
            </Typography>
            <Typography color="white" fontWeight="bold" variant="h3">
              계급 체스 <br /> & 와부고 살인사건
            </Typography>
            <Button
              variant="contained"
              sx={{
                width: "fit-content",
              }}
              onClick={() => {}}
            >
              Play
            </Button>
          </Box>

          <Box
            width="30vw"
            height="100%"
            sx={{
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundImage:
                'linear-gradient(to bottom, #202125 3%, transparent 20%, transparent 70%, #202125 98%), linear-gradient(to left, #202125 3%, transparent 20%, transparent 70%, #202125 98%), url("/image/devilsplan.png") ',
            }}
          />
        </Box>
      </Box>
      <Box mt={10} mx="auto" px="1rem" maxWidth="1020px">
        <Box width="100%" mb={5}>
          <Grid container spacing={3}>
            {CONTENTS.map((content) => (
              <Grid item xs={4}>
                <ContentCard content={content} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
