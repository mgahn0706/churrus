"use client";

import { FadeInSection } from "@/components/FadeInSection";
import CertificationCard from "@/components/Certification/CertificationCard";
import Header from "@/components/Header";
import {
  getAllCertificationCards,
  getCertificationCards,
} from "@/libs/certification";
import { CertificationCardType } from "@/types";
import { Box, Typography } from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function CertificationContent() {
  const searchParams = useSearchParams();
  const scenarioId = searchParams?.get("scenario") ?? null;
  const [certificationCards, setCertificationCards] = useState<
    CertificationCardType[]
  >([]);

  useEffect(() => {
    setCertificationCards(
      scenarioId === "all"
        ? getAllCertificationCards()
        : getCertificationCards(),
    );
  }, [scenarioId]);

  const showEmptyState =
    certificationCards.length === 0 && scenarioId !== "all";

  return (
    <>
      <Header />
      <Box
        sx={{
          width: "100%",
          minHeight: "100dvh",

          background:
            "radial-gradient(circle at top, rgba(81,115,255,0.16), transparent 30%), #04070d",

          overflowX: "clip",
          boxSizing: "border-box",
        }}
      >
        <FadeInSection>
          <Box
            sx={{
              width: "100%",
              pt: "110px",
              px: 2,
              boxSizing: "border-box",
            }}
          >
            <Typography
              color="white"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "28px", md: "40px" },
                textAlign: "center",
              }}
            >
              사건을 끝까지 추적한 기록
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.68)",
                fontSize: { xs: 15, md: 18 },
                textAlign: "center",
                mt: 2,
              }}
            >
              시나리오를 완료하면 인증 카드가 열립니다.
            </Typography>
          </Box>
        </FadeInSection>
        <Box
          sx={{
            width: "100%",
            px: { xs: 2, md: 4 },
            py: { xs: 4, md: 6 },
            display: "flex",
            justifyContent: "center",
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "1280px",
              display: "grid",

              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                lg: "repeat(3, minmax(0, 1fr))",
              },

              gap: 4,
            }}
          >
            {!showEmptyState ? (
              certificationCards.map((card) => (
                <Box
                  key={card.scenarioId}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "stretch",
                  }}
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

export default function Certification() {
  return (
    <Suspense fallback={null}>
      <CertificationContent />
    </Suspense>
  );
}
