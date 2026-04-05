import { FadeInSection } from "@/features/suspect/components/FadeInSection";
import CertificationCard from "@/features/suspect/components/Certification/CertificationCard";
import Header from "@/features/suspect/components/Header";
import {
  getAllCertificationCards,
  getCertificationCards,
} from "@/features/suspect/libs/certification";
import { Box, Typography } from "@mui/material";
import { useMemo } from "react";
import { useRouter } from "next/router";

export default function Certification() {
  const router = useRouter();
  const scenarioId =
    typeof router.query.scenario === "string" ? router.query.scenario : null;

  const certificationCards = useMemo(
    () => (scenarioId === "all" ? getAllCertificationCards() : getCertificationCards()),
    [scenarioId]
  );

  return (
    <>
      <Header />
      <Box
        sx={{
          minHeight: "100dvh",
          background:
            "radial-gradient(circle at top, rgba(81,115,255,0.16), transparent 30%), #04070d",
        }}
        width="100%"
      >
        <FadeInSection>
          <Box width="100%" pt="110px" px={2}>
            <Typography
              color="white"
              fontWeight="bold"
              fontSize={{ xs: "28px", md: "40px" }}
              textAlign="center"
            >
              사건을 끝까지 추적한 기록
            </Typography>
            <Typography
              color="rgba(255,255,255,0.68)"
              fontSize={{ xs: 15, md: 18 }}
              textAlign="center"
              mt={2}
            >
              시나리오를 완료하면 인증 카드가 열립니다.
            </Typography>
          </Box>
        </FadeInSection>
        <FadeInSection>
          <Box width="100%" px={2} mt={2}>
            <Typography color="lightgray" fontSize="14px" textAlign="center">
              완료한 시나리오가 없다면 아직 카드가 표시되지 않습니다.
            </Typography>
          </Box>
        </FadeInSection>
        <Box
          width="100%"
          px={{ xs: 2, md: 4 }}
          py={{ xs: 4, md: 6 }}
          display="flex"
          justifyContent="center"
        >
          <Box
            width="100%"
            maxWidth="1280px"
            display="grid"
            gridTemplateColumns={{
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(3, minmax(0, 1fr))",
            }}
            gap={4}
          >
            {certificationCards.length > 0 ? (
              certificationCards.map((card) => (
                <Box
                  key={card.scenarioId}
                  display="flex"
                  justifyContent="center"
                  alignItems="stretch"
                >
                  <CertificationCard card={card} />
                </Box>
              ))
            ) : (
              <Box
                sx={{
                  gridColumn: "1 / -1",
                  minHeight: 360,
                  border: "1px dashed rgba(255,255,255,0.18)",
                  borderRadius: 6,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  color: "rgba(255,255,255,0.48)",
                  px: 3,
                }}
              >
                아직 발급된 인증 카드가 없습니다.
                <br />
                시나리오를 끝내고 다시 확인하세요.
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
