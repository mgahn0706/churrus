import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import { Box, Card, CardActionArea, Grid, Typography } from "@mui/material";
import GlobalHeader from "@/components/Navigation/GlobalHeader";
import ContentCard from "@/components/ContentCard";

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
  const responsiveXS = useResponsiveValue([12, 12, 6]);
  const responsiveGeniusXs = useResponsiveValue([6, 6, 3]);

  const responsiveMaxWidth = useResponsiveValue([90, 90, 60]);

  return (
    <Box
      bgcolor={BACKGROUND_COLOR}
      minHeight="100vh"
      minWidth="100vw"
      px={[7, 7, 0]}
      pt={[6, 6, 0]}
    >
      <Typography color="#121212" fontWeight="700" fontSize={36} mb={3}>
        추러스
      </Typography>
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
