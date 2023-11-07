import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import { Box, Button, Grid, Typography } from "@mui/material";
import {
  CategoryOutlined,
  Dashboard,
  Filter1,
  HelpOutlineOutlined,
  IndeterminateCheckBoxOutlined,
  LaunchOutlined,
  PlayArrowSharp,
  Quiz,
  Search,
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
        }}
      />
    ),
    label: "정기모임",
    url: "quiz",
    color: {
      dark: "#e8c0b6",
      main: "#ffe2db",
    },
  },
  {
    title: "협동 크라임씬",
    description: "범인을 추리하라",
    icon: (
      <Search
        sx={{
          fontSize: 120,
        }}
      />
    ),
    label: "정기모임",
    url: "suspect",
    color: {
      dark: "#b8dae9",
      main: "#cef0ff",
    },
  },
  {
    title: "추러스 커넥션",
    description: "네 개씩 네 그룹으로",
    icon: (
      <Dashboard
        sx={{
          fontSize: 120,
        }}
      />
    ),
    label: "NEW",
    url: "connections",
    color: {
      main: "#d7f4dd",
      dark: "#b1dbba",
    },
  },
];

const GENIUS_CONTENTS: GeniusContentType[] = [
  {
    title: "미스터리 사인",
    description: "힌트를 바탕으로 미스터리 사인의 규칙을 맞춰보세요",
    icon: (
      <HelpOutlineOutlined
        sx={{
          fontSize: 100,
          opacity: 0.8,
        }}
      />
    ),
    color: "#14d059",
    url: "mystery-sign",
  },
  {
    title: "마이너스 경매",
    description: "경매를 통해 점수 감점을 최소화하세요",
    icon: (
      <IndeterminateCheckBoxOutlined
        sx={{
          fontSize: 100,
          opacity: 0.8,
        }}
      />
    ),
    color: "#eeb802",
    url: "minus-auction",
  },
  {
    title: "같은 숫자 찾기",
    description: "숫자 패널의 위치를 기억해 타겟 넘버를 완성하세요",
    icon: (
      <Filter1
        sx={{
          fontSize: 100,
          opacity: 0.8,
        }}
      />
    ),
    color: "#83deff",
    url: "same-number",
  },
  {
    title: "결! 합!",
    description: "도형들의 속성들을 보고 결! 또는 합!을 외치세요",
    icon: (
      <CategoryOutlined
        sx={{
          fontSize: 100,
          opacity: 0.8,
        }}
      />
    ),
    color: "#f96656",
    url: "set",
  },
];

const EXTERNAL_CONTENTS: ExternalGameContentType[] = [
  {
    title: "꼬맨틀",
    imgSrc: "https://semantle-ko.newsjel.ly/assets/icon.svg",
    color: {
      primary: "#efcf19",
      secondary: "#33b693",
    },
    description: "정답 단어와의 유시도를 통해 단어를 맞춰보세요",
    url: "https://semantle-ko.newsjel.ly/",
  },
  {
    title: "랜덤 단어 생성기",
    imgSrc: "/image/card/external/random-word.png",
    color: {
      primary: "#7655a2",
      secondary: "#e21688",
    },
    description: "랜덤 단어를 생성해보세요",
    url: "https://jungdolp.synology.me/word",
  },
  {
    title: "더 라비린스",
    imgSrc: "/image/card/external/labyrinth.png",
    color: {
      primary: "#73cbc8",
      secondary: "#4373b7",
    },
    description: "미궁게임 사이트",
    url: "https://www.thelabyrinth.co.kr/labyrinth/",
  },
  {
    title: "NYT Crossword",
    imgSrc: "/image/card/external/nyt.png",
    color: {
      primary: "#92a9eb",
      secondary: "#fb95a3",
    },
    description: "뉴욕타임즈의 크로스워드 퍼즐",
    url: "https://www.nytimes.com/crosswords",
  },
  {
    title: "갈틱폰",
    imgSrc: "/image/card/external/gartic.png",
    color: {
      primary: "#f7a8a8",
      secondary: "#fbc7c7",
    },
    description: "온라인 텔레스트레이션",
    url: "https://garticphone.com/ko",
  },
  {
    title: "방탈출 평점 사이트",
    imgSrc: "https://colory.mooo.com/static/img/jb.png",
    color: {
      primary: "#fec740",
      secondary: "#97288f",
    },
    description: "방탈출 평점 사이트",
    url: "https://colory.mooo.com/catalogue",
  },
];

const BACKGROUND_COLOR = "#fffef8";
const BANNER_COLOR = "white";

export default function Churrus() {
  const responsiveXS = useResponsiveValue([12, 6, 4]);
  const router = useRouter();

  return (
    <Box bgcolor={BACKGROUND_COLOR} minHeight="100vh" minWidth="100vw" pt={10}>
      <GlobalHeader />
      <Box display="flex" justifyContent="center">
        <Box
          display="flex"
          justifyContent="flex-start"
          width="60vw"
          height="40vh"
          borderRadius="16px"
          sx={{
            bgcolor: BANNER_COLOR,
          }}
        >
          <Box
            width="25vw"
            display="flex"
            flexDirection="column"
            px={5}
            py={5}
            justifyContent="flex-start"
            gap={3}
          >
            <Typography color="black" variant="h6" mb={-2}>
              2023년 10월 정기모임
            </Typography>
            <Typography color="black" fontWeight="bold" variant="h3">
              계급 체스 &
            </Typography>
            <Typography color="#f96556" fontWeight="bold" variant="h3" mt={-2}>
              와부고 살인사건
            </Typography>
            <Button
              variant="contained"
              sx={{
                width: "fit-content",
                backgroundColor: "#f96556",
                color: "white",
                fontWeight: "bold",
                fontSize: "1.2rem",
                "&:hover": {
                  backgroundColor: "#da5142",
                },
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
              backgroundImage: `linear-gradient(to bottom, ${BANNER_COLOR} 3%, transparent 20%, transparent 70%, ${BANNER_COLOR} 98%), linear-gradient(to left, ${BANNER_COLOR} 3%, transparent 20%, transparent 80%, ${BANNER_COLOR} 98%), url("/image/devilsplan.png") `,
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
        justifyContent="center"
      >
        <Typography
          color="#2e3545"
          variant="h5"
          sx={{
            alignItems: "center",
            verticalAlign: "middle",
            my: 3,
            mr: 1,
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
        bgcolor="#232937"
        height="10vh"
      >
        <Typography color="#969ca5" variant="body2">
          © 2019-2023 CHURRUS. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
