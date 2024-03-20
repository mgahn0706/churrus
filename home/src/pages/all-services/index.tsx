import GlobalHeader from "@/components/Navigation/GlobalHeader";
import ServiceButton from "@/components/ServiceButton";
import {
  CasinoRounded,
  CategoryRounded,
  ColorLensRounded,
  DashboardRounded,
  Filter1Rounded,
  HelpRounded,
  HexagonRounded,
  HomeRounded,
  IndeterminateCheckBoxRounded,
  InfoRounded,
  MailRounded,
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
      mt="8px"
      gap={1}
      bgcolor="#ffffff"
      borderRadius="20px"
      p={3}
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
        bgcolor="#f2f3f6"
      >
        <Box
          display="flex"
          flexDirection="column"
          mx={[2, 4, 8]}
          mb={5}
          mt={[0, 0, "40px"]}
        >
          <Typography color="#121212" fontSize={24} fontWeight={700} mt={4}>
            전체 서비스
          </Typography>

          <Typography color="#121212" fontSize={12} mt={3}>
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
          <Typography color="#121212" fontSize={12} mt={3}>
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

          <Typography color="#121212" fontSize={12} mt={3}>
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
          </CategorizedLayout>

          <Typography color="#121212" fontSize={12} mt={3}>
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
