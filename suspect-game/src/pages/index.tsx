import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";

interface ContentType {
  category: string;
  title: string;
  description: string;
  subDesription: string;
  isAvailable?: boolean;
  url: string;
  color: {
    main: string;
    light: string;
  };
}

const contents: ContentType[] = [
  {
    category: "문제풀이",
    title: "문제적 추러스",
    description: "창의적이고 어려운 문제들을 풀어보세요",
    subDesription:
      "매월 정기모임때마다 풀게 되는 문제적 남자 형식의 문제들입니다. 이곳에서는 역대 문제들을 풀어볼 수 있습니다.",
    url: "quiz",
    color: {
      main: "red",
      light: "#EF4444",
    },
  },
  {
    category: "추리",
    title: "장편 추리 문제",
    description: "소설로 된 추리 문제를 읽으며 범인을 추리하세요",
    subDesription:
      "소설 형식으로 쓰여진 추리 문제들이며, 독해력과 추리력을 바탕으로 진범을 지목하세요. 이곳에서는 역대 장편 추리 문제들을 풀어볼 수 있습니다.",
    url: "novel",
    color: {
      main: "green",
      light: "#10B981",
    },
  },
  {
    category: "추리",
    title: "협동 크라임씬",
    description: "단서들을 바탕으로 함께 범인을 추리하세요",
    isAvailable: true,
    subDesription:
      "용의자들 중에 진범이 있고, 당신은 범인, 방법, 동기를 찾아야합니다. 이곳에서는 협동 크라임씬을 직접 플레이할 수 있습니다.",
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
    subDesription:
      "2팀으로 나누어 서로 힌트를 제시하고, 미지의 연산 기호가 갖는 규칙을 빠르게 파악하는 지니어스 게임입니다. 이곳에서는 미스터리 사인을 직접 플레이할 수 있습니다.",
    url: "mystery-sign",
    color: {
      main: "purple",
      light: "#8B5CF6",
    },
  },
  {
    category: "더 지니어스",
    title: "마이너스 경매",
    description: "경매를 통해 점수 감점을 최소화하세요",
    subDesription:
      "자신의 칩을 이용하여 마이너스 점수를 패스하거나, 마이너스 점수와 칩을 낙찰받는 지니어스 게임입니다. 이곳에서는 마이너스 경매를 직접 플레이할 수 있습니다.",
    url: "minus",
    color: {
      main: "gold",
      light: "#EAB308",
    },
  },
  {
    category: "더 지니어스",
    title: "체인옥션",
    description: "경매와 협상을 통해 타겟 숫자를 완성하세요",
    subDesription:
      "숫자와 기호를 경매를 통해 얻고 자신의 칩을 이용해 타겟 넘버와 최대한 가까운 숫자를 만드는 지니어스 게임입니다. 이곳에서는 체인옥션을 직접 플레이할 수 있습니다.",
    url: "chain",
    color: {
      main: "orange",
      light: "#F97316",
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
            boxShadow: `${content.color.light} 0px 3px 8px`,
            "&:hover": {
              border: `${content.color.main} solid 1px`,
            },
          }}
        >
          <CardContent
            onClick={() => {
              if (content.isAvailable) {
                router.push(`/${content.url}`);
                return;
              }
              window.alert("아직 준비 중인 게임입니다.");
            }}
            sx={{
              height: 200,
            }}
          >
            <Typography color="lightgray" variant="body2">
              {content.category}
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Typography
                variant="h5"
                component="div"
                color={content.color.light}
                fontWeight="bold"
                gutterBottom
              >
                {content.title}
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
            <Typography
              variant="body2"
              color="lightgray"
              fontStyle="oblique"
              sx={{
                wordBreak: "keep-all",
              }}
            >
              {content.subDesription}
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
