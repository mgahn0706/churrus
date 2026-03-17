import { FadeInSection } from "@/features/suspect/components/FadeInSection";
import CertificationCard from "@/features/suspect/components/Certification/CertificationCard";
import Header from "@/features/suspect/components/Header";
import {
  getAllCertificationCards,
  getCertificationCards,
} from "@/features/suspect/libs/certification";
import { CertificationCardType } from "@/features/suspect/types";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Certification() {
  const router = useRouter();
  const [certificationCards, setCertificationCards] = useState<
    CertificationCardType[]
  >([]);
  const [selectedCard, setSelectedCard] =
    useState<CertificationCardType | null>(null);

  useEffect(() => {
    const scenarioId = router.query.scenario;
    const cards =
      scenarioId === "all"
        ? getAllCertificationCards()
        : getCertificationCards();

    setCertificationCards(cards);

    if (typeof scenarioId !== "string") {
      return;
    }

    if (scenarioId === "all") {
      setSelectedCard(null);
      return;
    }

    const matchingCard = cards.find((card) => card.scenarioId === scenarioId);
    if (matchingCard) {
      setSelectedCard(matchingCard);
    }
  }, [router.query.scenario]);

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
              시나리오를 완료하면 인증 카드가 열립니다. 카드를 눌러 에필로그를
              확인할 수 있습니다.
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
        <FadeInSection>
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
                    <CertificationCard
                      card={card}
                      onClick={() => setSelectedCard(card)}
                    />
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
        </FadeInSection>
      </Box>
      <Dialog
        open={selectedCard != null}
        onClose={() => setSelectedCard(null)}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            background:
              "linear-gradient(180deg, rgba(10,14,24,0.98), rgba(5,7,12,0.98))",
            color: "white",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 4,
            overflow: "hidden",
          },
        }}
      >
        {selectedCard && (
          <DialogContent sx={{ p: 0 }}>
            <Box
              sx={{
                position: "relative",
                px: { xs: 3, md: 5 },
                py: { xs: 4, md: 5 },
                background: `
                  linear-gradient(180deg, ${selectedCard.color}44, rgba(5,7,12,0.08)),
                  url(${selectedCard.image})
                `,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(5,7,12,0.15), rgba(5,7,12,0.92))",
                }}
              />
              <IconButton
                onClick={() => setSelectedCard(null)}
                sx={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  color: "white",
                  zIndex: 1,
                }}
              >
                <CloseRounded />
              </IconButton>
              <Box position="relative" zIndex={1} pr={5}>
                <Typography
                  sx={{
                    fontSize: 12,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.68)",
                    mb: 1,
                  }}
                >
                  Epilogue Article
                </Typography>
                <Typography
                  fontSize={{ xs: 28, md: 40 }}
                  fontWeight={900}
                  mb={1.5}
                >
                  {selectedCard.epilogueTitle}
                </Typography>
                <Typography
                  color="rgba(255,255,255,0.8)"
                  fontSize={{ xs: 15, md: 18 }}
                  lineHeight={1.7}
                >
                  {selectedCard.epilogueSubtitle}
                </Typography>
              </Box>
            </Box>

            <Box px={{ xs: 3, md: 5 }} py={{ xs: 3, md: 4 }}>
              {selectedCard.epilogueSections.map((section) => (
                <Box key={section.heading} mb={4}>
                  <Typography fontSize={22} fontWeight={800} mb={1.5}>
                    {section.heading}
                  </Typography>
                  {section.paragraphs.map((paragraph, index) => (
                    <Typography
                      key={`${section.heading}-${index}`}
                      color="rgba(255,255,255,0.8)"
                      lineHeight={1.95}
                      mb={1.5}
                    >
                      {paragraph}
                    </Typography>
                  ))}
                </Box>
              ))}
            </Box>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
