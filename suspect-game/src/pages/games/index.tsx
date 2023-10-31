import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import { Box, Button, Grid, Typography } from "@mui/material";
import {
  Category,
  Circle,
  Dashboard,
  Filter1,
  Help,
  IndeterminateCheckBox,
  LaunchOutlined,
  LockClock,
  Newspaper,
  Phone,
  PlayArrowSharp,
  Quiz,
  Route,
  Search,
  Shuffle,
  Translate,
} from "@mui/icons-material";
import GlobalHeader from "@/components/GlobalHeader";
import ContentCard, { ContentType } from "@/components/ContentCard";
import GeniusCard, { GeniusContentType } from "@/components/GeniusCard";
import { useRouter } from "next/router";
import ExternalGameCard, {
  ExternalGameContentType,
} from "@/components/ExternalGameCard";

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
      main: "#1876d2",
      dark: "#1e43c8",
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
      main: "#1bb912",
      dark: "#0d8009",
    },
  },
];

const GENIUS_CONTENTS: GeniusContentType[] = [
  {
    title: "미스터리 사인",
    description: "힌트를 바탕으로 미스터리 사인의 규칙을 맞춰보세요",
    icon: (
      <Help
        sx={{
          fontSize: 120,
          opacity: 0.8,
        }}
      />
    ),
    color: "#7615bb",
    url: "mystery-sign",
  },
  {
    title: "마이너스 경매",
    description: "경매를 통해 점수 감점을 최소화하세요",
    icon: (
      <IndeterminateCheckBox
        sx={{
          fontSize: 120,
          opacity: 0.8,
        }}
      />
    ),
    color: "#cd7c1e",
    url: "minus-auction",
  },
  {
    title: "같은 숫자 찾기",
    description: "숫자 패널의 위치를 기억해 타겟 넘버를 완성하세요",
    icon: (
      <Filter1
        sx={{
          fontSize: 120,
          opacity: 0.8,
        }}
      />
    ),
    color: "#15a60e",
    url: "same-number",
  },
  {
    title: "결! 합!",
    description: "도형들의 속성들을 보고 결! 또는 합!을 외치세요",
    icon: (
      <Category
        sx={{
          fontSize: 120,
          opacity: 0.8,
        }}
      />
    ),
    color: "#ea0650",
    url: "set",
  },
];

const EXTERNAL_CONTENTS: ExternalGameContentType[] = [
  {
    title: "꼬맨틀",
    icon: (
      <Translate
        sx={{
          fontSize: 120,
          opacity: 0.8,
        }}
      />
    ),
    color: {
      primary: "#efcf19",
      secondary: "#33b693",
    },
    description: "정답 단어와의 유시도를 통해 단어를 맞춰보세요",
    url: "https://semantle-ko.newsjel.ly/",
  },
  {
    title: "랜덤 단어 생성기",
    icon: (
      <Shuffle
        sx={{
          fontSize: 120,
          opacity: 0.8,
        }}
      />
    ),
    color: {
      primary: "#7655a2",
      secondary: "#e21688",
    },
    description: "랜덤 단어를 생성해보세요",
    url: "https://jungdolp.synology.me/word",
  },
  {
    title: "더 라비린스",
    icon: (
      <Route
        sx={{
          fontSize: 120,
          opacity: 0.8,
        }}
      />
    ),
    color: {
      primary: "#73cbc8",
      secondary: "#4373b7",
    },
    description: "미궁게임 사이트",
    url: "https://www.thelabyrinth.co.kr/labyrinth/",
  },
  {
    title: "NYT Crossword",
    icon: (
      <Newspaper
        sx={{
          fontSize: 120,
          opacity: 0.8,
        }}
      />
    ),
    color: {
      primary: "#92a9eb",
      secondary: "#fb95a3",
    },
    description: "뉴욕타임즈의 크로스워드 퍼즐",
    url: "https://www.nytimes.com/crosswords",
  },
  {
    title: "갈틱폰",
    icon: (
      <Phone
        sx={{
          fontSize: 120,
          opacity: 0.8,
        }}
      />
    ),
    color: {
      primary: "#f7a8a8",
      secondary: "#fbc7c7",
    },
    description: "온라인 텔레스트레이션",
    url: "https://garticphone.com/ko",
  },
  {
    title: "방탈출 평점 사이트",
    icon: (
      <LockClock
        sx={{
          fontSize: 120,
          opacity: 0.8,
        }}
      />
    ),
    color: {
      primary: "#fec740",
      secondary: "#97288f",
    },
    description: "방탈출 평점 사이트",
    url: "https://colory.mooo.com/catalogue",
  },
];

const BACKGROUND_COLOR = "#202125";

export default function Churrus() {
  const responsiveXS = useResponsiveValue([12, 6, 4]);
  const router = useRouter();

  return (
    <Box bgcolor={BACKGROUND_COLOR} minHeight="100vh" minWidth="100vw" pt={10}>
      <GlobalHeader />
      <Box display="flex" justifyContent="center">
        <Box display="flex" justifyContent="center" width="60vw" height="40vh">
          <Box
            width="30vw"
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
              계급 체스 &
            </Typography>
            <Typography color="#1876d2" fontWeight="bold" variant="h3">
              와부고 살인사건
            </Typography>
            <Button
              variant="contained"
              sx={{
                width: "fit-content",
              }}
              size="large"
              onClick={() => {
                router.push("/suspect");
              }}
            >
              시작
              <PlayArrowSharp />
            </Button>
          </Box>

          <Box
            width="30vw"
            height="100%"
            sx={{
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundImage:
                'linear-gradient(to bottom, #202125 3%, transparent 20%, transparent 70%, #202125 98%), linear-gradient(to left, #202125 3%, transparent 20%, transparent 80%, #202125 98%), url("/image/devilsplan.png") ',
            }}
          />
        </Box>
      </Box>
      <Box my={10} mx="auto" px="1rem" maxWidth="60vw">
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
      <Box my={6} mx="auto" px="1rem" maxWidth="60vw">
        <Box width="100%" mb={5}>
          <Grid container spacing={3}>
            {GENIUS_CONTENTS.map((content) => (
              <Grid item xs={3}>
                <GeniusCard content={content} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        maxWidth="60vw"
        mx="auto"
        my={10}
      >
        <Typography
          color="white"
          variant="h5"
          sx={{
            alignItems: "center",
            verticalAlign: "middle",
            my: 2,
          }}
        >
          외부 사이트
          <LaunchOutlined />
        </Typography>
        <Grid container spacing={3}>
          {EXTERNAL_CONTENTS.map((content) => (
            <Grid item xs={2}>
              <ExternalGameCard content={content} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="#27282c"
        height="10vh"
      >
        <Typography color="white" variant="body2">
          © 2019-2023 CHURRUS. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
