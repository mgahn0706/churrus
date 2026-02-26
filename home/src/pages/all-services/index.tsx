import GlobalHeader from "@/components/Navigation/GlobalHeader";
import ServiceButton from "@/components/ServiceButton";
import {
  CategoryRounded,
  ColorLensRounded,
  DashboardRounded,
  Filter1Rounded,
  GridOnRounded,
  HelpRounded,
  HexagonRounded,
  HomeRounded,
  IndeterminateCheckBoxRounded,
  InfoRounded,
  LockRounded,
  MailRounded,
  PetsRounded,
  PsychologyRounded,
  PublicRounded,
  QuizRounded,
  RadioRounded,
  SearchRounded,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import Head from "next/head";

const CategorizedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      mt="10px"
      gap={1.25}
      bgcolor="#ffffff"
      borderRadius="18px"
      p={[2, 2.5, 3]}
      boxShadow="0 12px 26px rgba(20, 20, 20, 0.06)"
    >
      {children}
    </Box>
  );
};

export default function AllServicesPage() {
  return (
    <>
      <Head>
        <title>추러스: 전체 서비스</title>
      </Head>
      <GlobalHeader />
      <Box
        display="flex"
        minHeight="100dvh"
        flexDirection="column"
        bgcolor="#F7F5F2"
        sx={{
          backgroundImage:
            "radial-gradient(1200px 600px at 10% -10%, #FFF4E8 0%, transparent 55%), radial-gradient(900px 500px at 100% 0%, #F1F1ED 0%, transparent 50%)",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          mx={[2, 4, 8]}
          mb={5}
          mt={[2, 3, "48px"]}
          width="100%"
          maxWidth="980px"
          alignSelf="center"
        >
          <Box mt={2} mb={2}>
            <Typography color="#1B1B1B" fontSize={26} fontWeight={700}>
              전체 서비스
            </Typography>
            <Typography color="#6B6B6B" fontSize={13} mt={0.5}>
              추러스에서 제공하는 모든 게임과 모임을 한눈에.
            </Typography>
          </Box>

          <Typography color="#3B3B3B" fontSize={12} fontWeight={600} mt={2.5}>
            추러스
          </Typography>
          <CategorizedLayout>
            <ServiceButton label="추러스 홈" url="/" icon={<HomeRounded />} />
            <ServiceButton label="소개" url="/about" icon={<InfoRounded />} />
            <ServiceButton
              label="지원하기"
              url="/recruit"
              icon={<MailRounded />}
            />
          </CategorizedLayout>
          <Typography color="#3B3B3B" fontSize={12} fontWeight={600} mt={3}>
            정기모임
          </Typography>
          <CategorizedLayout>
            <ServiceButton
              label="문제적 추러스"
              url="/quiz"
              icon={<QuizRounded />}
            />
            <ServiceButton
              label="협동 크라임씬"
              url="/suspect"
              icon={<SearchRounded />}
            />
          </CategorizedLayout>

          <Typography color="#3B3B3B" fontSize={12} fontWeight={600} mt={3}>
            정기퍼즐
          </Typography>
          <CategorizedLayout>
            <ServiceButton
              label="스펠링 비"
              url="/spelling-bee"
              icon={<HexagonRounded />}
            />
            <ServiceButton
              label="추러스 커넥션"
              url="/connections"
              icon={<DashboardRounded />}
            />
            <ServiceButton
              label="추로스워드"
              url="/crosswords"
              icon={<GridOnRounded />}
            />
            <ServiceButton
              label="추러스 말장난"
              url="/cryptic"
              icon={<PsychologyRounded />}
            />
          </CategorizedLayout>

          <Typography color="#3B3B3B" fontSize={12} fontWeight={600} mt={3}>
            보드게임 / 더 지니어스
          </Typography>
          <CategorizedLayout>
            <ServiceButton
              label="Hues and Cues"
              url="/hues-and-cues"
              icon={<ColorLensRounded />}
            />
            <ServiceButton
              label="내 마음의 주파수"
              url="/frequency"
              icon={<RadioRounded />}
            />
            <ServiceButton
              label="마션 다이스"
              url="/martian-dice"
              icon={<PublicRounded />}
            />
            <ServiceButton
              label="마이너스 경매"
              url="/minus-auction"
              icon={<IndeterminateCheckBoxRounded />}
            />
            <ServiceButton
              label="먹이사슬"
              url="/food-chain"
              icon={<PetsRounded />}
            />
            <ServiceButton
              label="지하감옥"
              url="/underground-prison"
              icon={<LockRounded />}
            />
            <ServiceButton
              label="미스터리 사인"
              url="/mystery-sign"
              icon={<HelpRounded />}
            />
            <ServiceButton
              label="같은 숫자 찾기"
              url="/same-number"
              icon={<Filter1Rounded />}
            />
            <ServiceButton
              label="결! 합!"
              url="/set"
              icon={<CategoryRounded />}
            />
          </CategorizedLayout>
        </Box>
      </Box>
    </>
  );
}
