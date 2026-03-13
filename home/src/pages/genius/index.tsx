import GlobalHeader from "@/components/Navigation/GlobalHeader";
import {
  CategoryRounded,
  ColorLensRounded,
  Filter1Rounded,
  HelpRounded,
  IndeterminateCheckBoxRounded,
  LockRounded,
  PetsRounded,
  PublicRounded,
  RadioRounded,
} from "@mui/icons-material";
import { Box, ButtonBase, Container, Typography } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

const FEATURED_GROUPS = [
  {
    label: "BOARD GAMES",
    title: "바로 시작할 수 있는 보드게임",
    description: "짧게 시작하고 바로 몰입할 수 있는 게임들.",
    games: [
      {
        title: "Hues and Cues",
        subtitle: "한 단어 힌트로 색을 유도하는 파티 게임",
        url: "/hues-and-cues",
        accent: "#D26A43",
        icon: <ColorLensRounded />,
      },
      {
        title: "내 마음의 주파수",
        subtitle: "감각의 간격을 맞추는 팀 게임",
        url: "/frequency",
        accent: "#355CC9",
        icon: <RadioRounded />,
      },
      {
        title: "마션 다이스",
        subtitle: "주사위 운용으로 점수를 쌓는 라운드 게임",
        url: "/martian-dice",
        accent: "#2F8A67",
        icon: <PublicRounded />,
      },
    ],
  },
  {
    label: "THE GENIUS",
    title: "협상과 추론 중심의 지니어스 스타일 게임",
    description: "협상, 블러핑, 정보전 중심의 메인 매치 스타일.",
    games: [
      {
        title: "먹이사슬",
        subtitle: "위치와 타이밍이 중요한 생존 심리전",
        url: "/food-chain",
        accent: "#7E5F45",
        icon: <PetsRounded />,
      },
      {
        title: "결! 합!",
        subtitle: "패턴을 가장 먼저 읽는 순발력 퍼즐",
        url: "/set",
        accent: "#7F5CC2",
        icon: <CategoryRounded />,
      },
      {
        title: "마이너스 경매",
        subtitle: "손해를 떠넘기며 가치 판단을 흔드는 경매 게임",
        url: "/minus-auction",
        accent: "#BF4E4A",
        icon: <IndeterminateCheckBoxRounded />,
      },
      {
        title: "지하감옥",
        subtitle: "행동 선택과 정보 비대칭이 핵심인 심리전",
        url: "/underground-prison",
        accent: "#34414D",
        icon: <LockRounded />,
      },
      {
        title: "미스터리 사인",
        subtitle: "숨겨진 규칙을 눈치채야 하는 관찰 추론 게임",
        url: "/mystery-sign",
        accent: "#A06A16",
        icon: <HelpRounded />,
      },
      {
        title: "같은 숫자 찾기",
        subtitle: "제한된 정보로 모두의 숫자를 좁혀가는 두뇌전",
        url: "/same-number",
        accent: "#4861C7",
        icon: <Filter1Rounded />,
      },
    ],
  },
];

export default function GeniusPage() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>추러스: Genius Games</title>
      </Head>
      <GlobalHeader />
      <Box
        minHeight="100dvh"
        bgcolor="#F3F5F8"
        sx={{
          background: "linear-gradient(180deg, #F3F5F8 0%, #EEF2F7 100%)",
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            pt: { xs: 3, md: 10 },
            pb: { xs: 10, md: 8 },
            px: { xs: 2, sm: 3 },
          }}
        >
          <Box
            position="relative"
            display="grid"
            gridTemplateColumns={{ xs: "1fr", md: "minmax(0, 1.2fr) 240px" }}
            gap={{ xs: 3, md: 4 }}
            alignItems="end"
            pb={{ xs: 3, md: 4 }}
            borderBottom="1px solid #D7DCE3"
            sx={{
              animation: "heroReveal 720ms ease-out",
              "@keyframes heroReveal": {
                "0%": {
                  opacity: 0,
                  transform: "translateY(20px)",
                },
                "100%": {
                  opacity: 1,
                  transform: "translateY(0)",
                },
              },
            }}
          >
            <Box>
              <Typography
                color="#6B7280"
                fontSize={12}
                fontWeight={700}
                letterSpacing="0.18em"
              >
                GENIUS GAMES
              </Typography>
              <Typography
                mt={1.5}
                color="#111827"
                fontSize={{ xs: 34, sm: 42, md: 56 }}
                lineHeight={1.02}
                fontWeight={800}
                maxWidth="720px"
              >
                보드게임과 더 지니어스 게임 모음.
              </Typography>
              <Typography
                mt={2}
                color="#4B5563"
                fontSize={{ xs: 14, md: 16 }}
                lineHeight={1.7}
                maxWidth="480px"
              >
                바로 플레이할 수 있는 게임만 모았습니다. 보드게임과 지니어스
                스타일 게임으로 나눠서 볼 수 있습니다.
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent={{ xs: "flex-start", md: "flex-end" }}
              alignItems="center"
            >
              <Box
                position="relative"
                width={{ xs: 176, sm: 208, md: 220 }}
                height={{ xs: 88, sm: 104, md: 110 }}
              >
                <Image
                  src="/image/genius-logo.webp"
                  alt="The Genius logo"
                  fill
                  sizes="(max-width: 600px) 176px, (max-width: 900px) 208px, 220px"
                  style={{
                    objectFit: "contain",
                    filter: "drop-shadow(0 16px 26px rgba(17, 24, 39, 0.18))",
                    animation: "logoFloat 5.4s ease-in-out infinite",
                  }}
                  priority
                />
              </Box>
            </Box>
          </Box>

          <Box mt={{ xs: 4, md: 5 }}>
            {FEATURED_GROUPS.map((group, index) => (
              <Box
                key={group.title}
                pt={index === 0 ? 0 : { xs: 4, md: 5 }}
                mt={index === 0 ? 0 : { xs: 4, md: 5 }}
                borderTop={index === 0 ? "none" : "1px solid #D7DCE3"}
              >
                <Typography
                  color="#6B7280"
                  fontSize={12}
                  fontWeight={700}
                  letterSpacing="0.16em"
                >
                  {group.label}
                </Typography>
                <Typography
                  mt={1}
                  color="#111827"
                  fontSize={{ xs: 24, md: 30 }}
                  fontWeight={700}
                >
                  {group.title}
                </Typography>
                <Typography
                  mt={1}
                  color="#4B5563"
                  fontSize={{ xs: 14, md: 15 }}
                  lineHeight={1.7}
                  maxWidth="480px"
                >
                  {group.description}
                </Typography>

                <Box
                  mt={2.5}
                  display="grid"
                  gridTemplateColumns={{
                    xs: "1fr",
                    sm: "repeat(2, minmax(0, 1fr))",
                  }}
                  gap={1.5}
                >
                  {group.games.map((game, gameIndex) => (
                    <GameCard
                      key={game.title}
                      title={game.title}
                      subtitle={game.subtitle}
                      icon={game.icon}
                      accent={game.accent}
                      delay={index * 120 + gameIndex * 60}
                      onClick={() => router.push(game.url)}
                    />
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}

interface GameCardProps {
  title: string;
  subtitle: string;
  accent: string;
  icon: React.ReactNode;
  delay: number;
  onClick: () => void;
}

function GameCard({
  title,
  subtitle,
  accent,
  icon,
  delay,
  onClick,
}: GameCardProps) {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        display: "block",
        width: "100%",
        textAlign: "left",
        borderRadius: "18px",
        animation: "cardReveal 560ms ease-out both",
        animationDelay: `${delay}ms`,
        "@keyframes cardReveal": {
          "0%": {
            opacity: 0,
            transform: "translateY(16px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      }}
    >
      <Box
        p={{ xs: 2, md: 2.5 }}
        minHeight={{ xs: 132, sm: 148 }}
        borderRadius="18px"
        border="1px solid #D7DCE3"
        bgcolor="#FFFFFF"
        position="relative"
        overflow="hidden"
        sx={{
          transition:
            "background-color 220ms ease, border-color 220ms ease, transform 220ms ease, box-shadow 220ms ease",
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(196,30,58,0.05) 100%)",
            opacity: 0,
            transition: "opacity 220ms ease",
            pointerEvents: "none",
          },
          "&:hover": {
            bgcolor: "#F8FAFC",
            borderColor: "#C41E3A",
            transform: "translateY(-4px)",
            boxShadow: "0 18px 28px rgba(148, 163, 184, 0.16)",
          },
          "&:hover::after": {
            opacity: 1,
          },
        }}
      >
        <Box
          width={40}
          height={40}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="12px"
          bgcolor={accent}
          color="#FFFFFF"
          sx={{
            boxShadow: `0 10px 18px ${accent}35`,
            transition: "transform 220ms ease",
            ".MuiButtonBase-root:hover &": {
              transform: "translateY(-2px) scale(1.04)",
            },
          }}
        >
          {icon}
        </Box>
        <Typography
          mt={2}
          color="#111827"
          fontSize={{ xs: 18, md: 19 }}
          fontWeight={700}
        >
          {title}
        </Typography>
        <Typography mt={0.75} color="#4B5563" fontSize={14} lineHeight={1.65}>
          {subtitle}
        </Typography>
      </Box>
    </ButtonBase>
  );
}
