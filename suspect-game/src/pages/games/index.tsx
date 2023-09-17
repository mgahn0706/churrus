import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import { Box, Card, CardContent, Grid, Icon, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import {
  AutoStories,
  Category,
  ConnectWithoutContact,
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
  category: string;
  title: string;
  description: string;
  icon: ReactNode;
  isAvailable?: boolean;
  url: string;
  color: {
    main: string;
    light: string;
  };
}

const contents: ContentType[] = [
  {
    category: "정기모임",
    title: "문제적 추러스",
    description: "창의적이고 어려운 문제들을 풀어보세요",
    isAvailable: true,
    icon: <Quiz sx={{ fontSize: 90, opacity: 0.2 }} />,
    url: "quiz",
    color: {
      main: "red",
      light: "#EF4444",
    },
  },
  {
    category: "정기모임",
    title: "장편 추리 문제",
    description: "소설로 된 추리 문제를 읽으며 범인을 추리하세요",
    icon: <AutoStories sx={{ fontSize: 90, opacity: 0.2 }} />,
    url: "novel",
    color: {
      main: "green",
      light: "#10B981",
    },
  },
  {
    category: "정기모임",
    title: "협동 크라임씬",
    description: "단서들을 바탕으로 함께 범인을 추리하세요",
    isAvailable: true,
    icon: <Search sx={{ fontSize: 90, opacity: 0.2 }} />,
    url: "suspect",
    color: {
      main: "blue",
      light: "#3B82F6",
    },
  },
  {
    category: "더 지니어스",
    title: "미스터리 사인",
    description: "힌트를 바탕으로 미스터리 사인의 규칙을 맞춰보세요",
    icon: <Help sx={{ fontSize: 90, opacity: 0.2 }} />,
    url: "mystery-sign",
    isAvailable: true,
    color: {
      main: "purple",
      light: "#8B5CF6",
    },
  },
  {
    category: "더 지니어스",
    title: "마이너스 경매",
    description: "경매를 통해 점수 감점을 최소화하세요",
    icon: <IndeterminateCheckBox sx={{ fontSize: 90, opacity: 0.2 }} />,
    url: "minus-auction",
    isAvailable: true,
    color: {
      main: "gold",
      light: "#EAB308",
    },
  },
  {
    category: "더 지니어스",
    title: "같은 숫자 찾기",
    description: "숫자를 기억해서 타겟 넘버를 완성하세요",
    icon: <Filter1 sx={{ fontSize: 90, opacity: 0.2 }} />,
    url: "same-number",
    isAvailable: true,
    color: {
      main: "orange",
      light: "#F97316",
    },
  },
  {
    category: "더 지니어스",
    title: "결! 합!",
    description: "도형들의 속성을 보고 결! 또는 합!을 외치세요",
    icon: <Category sx={{ fontSize: 90, opacity: 0.2 }} />,
    url: "set",
    isAvailable: true,
    color: {
      main: "pink",
      light: "#EC4899",
    },
  },
  {
    category: "더 지니어스",
    title: "중간 달리기",
    description: "능력을 사용해 최대한 중간으로 골인하세요",
    icon: <DirectionsRun sx={{ fontSize: 90, opacity: 0.2 }} />,
    url: "middle-race",
    color: {
      main: "lightgreen",
      light: "#c4d87c",
    },
  },
  {
    category: "더 지니어스",
    title: "폭풍의 증권시장",
    description: "폭등과 폭락의 증권시장에서 최고의 수익을 내보세요",
    icon: <ShowChart sx={{ fontSize: 90, opacity: 0.2 }} />,
    url: "stock-market",
    color: {
      main: "darkblue",
      light: "#9bb8ed",
    },
  },
  {
    category: "외부",
    title: "꼬맨틀",
    isAvailable: true,
    description: "단어의 유사도를 바탕으로 정답 단어를 맞추세요",
    icon: (
      <Image
        src="https://semantle-ko.newsjel.ly/assets/icon.svg"
        alt="logo"
        width={90}
        height={90}
        style={{ opacity: 0.2 }}
      />
    ),
    url: "https://semantle-ko.newsjel.ly/",
    color: {
      main: "#00a8e0",
      light: "#02b5ef",
    },
  },
  {
    category: "보드게임",
    title: "내 마음의 주파수",
    isAvailable: true,
    description: "내 마음을 맞춰줘!",
    icon: <ConnectWithoutContact sx={{ fontSize: 90, opacity: 0.2 }} />,
    url: "frequency",
    color: {
      main: "#4b9387",
      light: "#62afa8",
    },
  },
  {
    category: "보드게임",
    title: "코드네임",
    isAvailable: false,
    description: "단어를 조심스럽게 설명해주세요",
    icon: <Sms sx={{ fontSize: 90, opacity: 0.2 }} />,
    url: "code-name",
    color: {
      main: "#b4aa6f",
      light: "#D1CBA7",
    },
  },
  {
    category: "외부",
    title: "랜덤 단어 생성기",
    description: "랜덤 단어를 생성해주는 사이트에요",
    icon: <Shuffle sx={{ fontSize: 90, opacity: 0.2 }} />,
    url: "https://jungdolp.synology.me/word/index.html",
    isAvailable: true,
    color: {
      main: "#fbbf24",
      light: "#fcd34d",
    },
  },

  {
    category: "외부",
    title: "더 라비린스",
    description: "추러스에서 만든 미궁게임을 플레이 할 수 있어요",
    icon: <Route sx={{ fontSize: 90, opacity: 0.2 }} />,
    url: "https://www.thelabyrinth.co.kr/labyrinth/",
    color: {
      main: "black",
      light: "gray",
    },
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
            cursor: "pointer",
            transition: "all 0.2s",
            height: 200,
            boxShadow: content.isAvailable
              ? `${content.color.light} 0px 3px 8px`
              : "none",
            "&:hover": {
              border: `${content.color.main} solid 1px`,
            },
          }}
        >
          <CardContent
            onClick={() => {
              if (content.isAvailable) {
                content.category === "외부"
                  ? window.open(content.url, "_blank", "noopener noreferrer")
                  : router.push(`/${content.url}`);
                return;
              }
              window.alert("아직 준비 중인 게임입니다.");
            }}
            sx={{
              height: 200,
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              mt={1}
              alignContent="center"
            >
              <Typography
                variant="h5"
                component="div"
                color={content.color.light}
                fontWeight="bold"
                gutterBottom
              >
                {content.title}
                {content.category === "외부" && (
                  <OpenInNew
                    sx={{
                      ml: 1,
                      color: "lightgray",
                    }}
                  />
                )}
              </Typography>
              {!content.isAvailable && (
                <Box
                  fontWeight="bold"
                  color="white"
                  fontSize="12px"
                  py="4px"
                  height="16px"
                  px="8px"
                  bgcolor={content.color.light}
                  textAlign="center"
                  lineHeight="16px"
                >
                  개발 중
                </Box>
              )}
            </Box>
            <Typography
              variant="body2"
              color={content.color.light}
              gutterBottom
            >
              {content.description}
            </Typography>
            <Box
              display="flex"
              justifyContent="flex-end"
              color={content.color.light}
            >
              {content.icon}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <Box mb={20}>
      <GlobalHeader />
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
          GAMES
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center">
        <Typography>추러스에서 해왔던 게임들을 즐길 수 있어요</Typography>
      </Box>
      <Box mt={10} mx="auto" px="1rem" maxWidth="1020px">
        <Box width="100%" mb={5}>
          <Typography variant="h5" gutterBottom>
            정기모임
          </Typography>

          <Grid container spacing={3}>
            {contents
              .filter((content) => {
                return content.category === "정기모임" && content.isAvailable;
              })
              .map((content) => (
                <ContentCard key={content.title} content={content} />
              ))}
          </Grid>
        </Box>
        <Box width="100%" mb={5}>
          <Typography variant="h5" gutterBottom>
            더 지니어스
          </Typography>

          <Grid container spacing={3}>
            {contents
              .filter((content) => {
                return (
                  content.category === "더 지니어스" && content.isAvailable
                );
              })
              .map((content) => (
                <ContentCard key={content.title} content={content} />
              ))}
          </Grid>
        </Box>
        <Box width="100%" mb={5}>
          <Typography variant="h5" gutterBottom>
            보드게임
          </Typography>

          <Grid container spacing={3}>
            {contents
              .filter((content) => {
                return content.category === "보드게임" && content.isAvailable;
              })
              .map((content) => (
                <ContentCard key={content.title} content={content} />
              ))}
          </Grid>
        </Box>
        <Box width="100%" mb={5}>
          <Typography variant="h5" gutterBottom>
            외부 사이트
          </Typography>

          <Grid container spacing={3}>
            {contents
              .filter((content) => {
                return content.category === "외부";
              })
              .map((content) => (
                <ContentCard key={content.title} content={content} />
              ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
