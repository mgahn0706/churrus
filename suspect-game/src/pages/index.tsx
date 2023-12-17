import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import { Box, Grid, Typography } from "@mui/material";
import {
  CategoryOutlined,
  Dashboard,
  Filter1,
  HelpOutlineOutlined,
  IndeterminateCheckBoxOutlined,
  LaunchOutlined,
  Quiz,
  Search,
} from "@mui/icons-material";
import GlobalHeader from "@/components/Navigation/GlobalHeader";
import ContentCard, { ContentType } from "@/components/ContentCard";
import GeniusCard, { GeniusContentType } from "@/components/GeniusCard";

import ExternalGameCard, {
  ExternalGameContentType,
} from "@/components/ExternalGameCard";
import MainBanner from "@/components/MainBanner";

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
    label: "Weekly",
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
    title: "방탈출 평점",
    imgSrc: "https://colory.mooo.com/static/img/jb.png",
    color: {
      primary: "#fec740",
      secondary: "#97288f",
    },
    description: "방탈출 평점",
    url: "https://colory.mooo.com/catalogue",
  },
];

const BACKGROUND_COLOR = "#fffef8";

export default function Churrus() {
  const responsiveXS = useResponsiveValue([12, 12, 4]);
  const responsiveGeniusXs = useResponsiveValue([6, 6, 3]);

  const responsiveMaxWidth = useResponsiveValue([90, 90, 60]);
  const responsiveExternalXS = useResponsiveValue([6, 6, 2]);

  return (
    <Box bgcolor={BACKGROUND_COLOR} minHeight="100vh" minWidth="100vw" pt={10}>
      <GlobalHeader />
      <MainBanner />
      <Box my={10} mx="auto" px="1rem" maxWidth={`${responsiveMaxWidth}vw`}>
        <Box width="100%" mb={5}>
          <Grid container spacing={3}>
            {CONTENTS.map((content) => (
              <Grid item xs={responsiveXS}>
                <ContentCard content={content} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Box my={6} mx="auto" px="1rem" maxWidth={`${responsiveMaxWidth}vw`}>
        <Box width="100%" mb={5}>
          <Grid container spacing={3}>
            {GENIUS_CONTENTS.map((content) => (
              <Grid item xs={responsiveGeniusXs}>
                <GeniusCard content={content} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        maxWidth={`${responsiveMaxWidth}vw`}
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
        <Grid container spacing={1}>
          {EXTERNAL_CONTENTS.map((content) => (
            <Grid item xs={responsiveExternalXS}>
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
