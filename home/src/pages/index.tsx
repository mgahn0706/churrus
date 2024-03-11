import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import { Box, Card, CardActionArea, Grid, Typography } from "@mui/material";
import GlobalHeader from "@/components/Navigation/GlobalHeader";
import ContentCard from "@/components/ContentCard";

import { GameContentType } from "@/components/GameCard";
import MainBanner from "@/components/MainBanner";
import dayjs from "dayjs";
import PuzzleCard from "@/components/PuzzleCard";
import GameCard from "@/components/GameCard";
import { useRouter } from "next/router";
import { ArrowForwardIos } from "@mui/icons-material";

const WORD_PUZZLE_CONTENTS = [
  {
    title: "스펠링 비",
    src: "/image/logo/spellingbee-logo.png",
    color: "#f6cf6a",
    url: "/spelling-bee",
  },
  {
    title: "추러스 커넥션",
    src: "/image/logo/connections-logo.png",
    color: "#bda9b0",
    url: "/connections",
  },
  {
    title: "추로스워드",
    src: "/image/logo/crossword-logo.png",
    color: "#4b89da",
    url: "/crossword",
    disabled: true,
  },
  {
    title: "추로스워드 미니",
    src: "/image/logo/crosswordmini-logo.png",
    color: "#73b1f4",
    url: "/crossword-mini",
    disabled: true,
  },
];

const GAME_CONTENTS: GameContentType[] = [
  {
    title: "Hues and Cues",
    imgSrc:
      "https://cf.geekdo-images.com/jdR8WW75HkaoHGMTCIx9lA__imagepage/img/n2OeBC_N0lqSHG_0_fbta1jgeWs=/fit-in/900x600/filters:no_upscale():strip_icc()/pic5390676.jpg",
    url: "/hues-and-cues",
  },
  {
    title: "마션 다이스",
    imgSrc:
      "https://cf.geekdo-images.com/GC_uVmeQDbH6M9p8UuhedQ__imagepage/img/oH85noSBDpj7B9Y6GZyYtqNYuuk=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4762385.jpg",
    url: "/martian-dice",
  },
  {
    title: "결! 합!",
    imgSrc:
      "data:image/jpeg;base64,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",
    url: "/set",
  },
  {
    title: "미스터리 사인",
    imgSrc:
      "data:image/jpeg;base64,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",
    url: "/mystery-sign",
  },
  {
    title: "같은 숫자 찾기",
    imgSrc:
      "https://mblogthumb-phinf.pstatic.net/20141226_161/ej2042_1419567622607BBr2y_JPEG/tvN_%B4%F5_%C1%F6%B4%CF%BE%EE%BD%BA-%BA%ED%B7%A2%B0%A1%B3%DD.E12.END.141217.HDTV.H264.720p-WITH.mp4_20141225_195251.964.jpg?type=w420",
    url: "/same-number",
  },
  {
    title: "내 마음의 주파수",
    imgSrc:
      "https://cf.geekdo-images.com/z4fbPdmJg_5yphJEvql4ZA__itemrep/img/Dnjsh4DWMkiZBsPszNWs8bqtvGY=/fit-in/246x300/filters:strip_icc()/pic4552862.png",
    url: "/frequency",
  },
];

const BACKGROUND_COLOR = "#f2f3f6";

const MoreGamesButton = ({ onClick }: { onClick: () => void }) => {
  <CardActionArea
    sx={{
      borderRadius: "20px",
    }}
    onClick={onClick}
  >
    <Card
      sx={{
        border: "2px solid #9798a1",
        bgcolor: "#f2f4f5",
        minHeight: 60,
        color: "#121212",
        alignItems: "center",
        borderRadius: "20px",
        verticalAlign: "middle",
        display: "flex",
        px: 2,
      }}
    >
      <Typography
        color="#202836"
        textAlign="center"
        fontSize="18px"
        sx={{
          width: "100%",
          wordBreak: "keep-all",
        }}
      >
        더보기
      </Typography>
      <ArrowForwardIos
        sx={{
          fontSize: "0.8rem",
        }}
      />
    </Card>
  </CardActionArea>;
};

export default function Churrus() {
  const router = useRouter();

  const responsiveXS = useResponsiveValue([12, 12, 6]);
  const responsiveGeniusXs = useResponsiveValue([6, 6, 3]);

  const responsiveMaxWidth = useResponsiveValue([90, 90, 60]);
  const responsiveExternalXS = useResponsiveValue([6, 6, 2]);

  return (
    <Box bgcolor={BACKGROUND_COLOR} minHeight="100vh" minWidth="100vw">
      <GlobalHeader />
      <MainBanner />
      <Box my={10} mx="auto" px="1rem" maxWidth={`${responsiveMaxWidth}vw`}>
        <Box width="100%" mb={5}>
          <Typography color="#4b89da" fontWeight="600" fontSize="18px" mb={3}>
            정기모임
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={responsiveXS}>
              <ContentCard
                content={{
                  title: "문제적 추러스",
                  description:
                    "추러스에서 준비한 창의적이고 어려운 문제들을 풀어보세요.",
                  image: "/image/card/meeting/quiz-banner.png",
                  url: "/quiz",
                }}
              />
            </Grid>
            <Grid item xs={responsiveXS}>
              <ContentCard
                content={{
                  title: "협동 크라임씬",
                  description: "다같이 협동해서 용의자 중 진범을 찾아보세요.",
                  image: "/image/card/meeting/suspect-banner.png",
                  url: "/suspect",
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box my={6} mx="auto" px="1rem" maxWidth={`${responsiveMaxWidth}vw`}>
        <Box width="100%" mb={5}>
          <Typography color="#4b89da" fontWeight="600" fontSize="18px" mb={3}>
            정기 퍼즐
          </Typography>
          <Grid container spacing={3}>
            {WORD_PUZZLE_CONTENTS.map((content) => (
              <Grid item xs={responsiveGeniusXs}>
                <PuzzleCard {...content} />
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
        <Typography color="#4b89da" fontWeight="600" fontSize="18px" mb={3}>
          보드게임 & 더 지니어스
        </Typography>
        <Grid container spacing={2}>
          {GAME_CONTENTS.map((content) => (
            <Grid item xs={responsiveExternalXS}>
              <GameCard content={content} />
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
          © 2019-{dayjs().year()} CHURRUS. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
