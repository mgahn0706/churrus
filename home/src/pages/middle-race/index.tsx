import GlobalHeader from "@/components/Navigation/GlobalHeader";
import { Box, Button, Chip, Divider, Typography } from "@mui/material";
import Head from "next/head";

const SectionCard = ({
  title,
  description,
  minHeight = 220,
}: {
  title: string;
  description: string;
  minHeight?: number;
}) => {
  return (
    <Box
      sx={{
        borderRadius: "28px",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(248,249,252,0.92))",
        border: "1px solid rgba(20,24,36,0.08)",
        boxShadow: "0 18px 50px rgba(18, 23, 37, 0.08)",
        p: { xs: 2.5, md: 3.5 },
        minHeight,
      }}
    >
      <Typography color="#111827" fontSize={24} fontWeight={800} mb={1}>
        {title}
      </Typography>
      <Typography color="#667085" fontSize={15} lineHeight={1.8}>
        {description}
      </Typography>
    </Box>
  );
};

export default function MiddleRacePage() {
  return (
    <>
      <Head>
        <title>추러스: Middle Race</title>
      </Head>
      <GlobalHeader />
      <Box
        sx={{
          minHeight: "100dvh",
          background:
            "radial-gradient(900px 420px at 8% 0%, rgba(255,181,71,0.24), transparent 55%), radial-gradient(840px 480px at 100% 10%, rgba(77,138,255,0.16), transparent 54%), linear-gradient(180deg, #f6f7fb 0%, #eef2f7 100%)",
          pb: { xs: 10, md: 8 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1120px",
            mx: "auto",
            px: { xs: 2, sm: 3, md: 4 },
            pt: { xs: "88px", md: "112px" },
          }}
        >
          <Box
            sx={{
              borderRadius: "32px",
              overflow: "hidden",
              position: "relative",
              px: { xs: 2.5, md: 5 },
              py: { xs: 4, md: 6 },
              mb: 3,
              background:
                "linear-gradient(135deg, #18212f 0%, #24354d 46%, #101827 100%)",
              boxShadow: "0 24px 70px rgba(15, 23, 42, 0.22)",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at 18% 24%, rgba(255,196,81,0.28), transparent 24%), radial-gradient(circle at 82% 16%, rgba(129,178,255,0.22), transparent 28%), linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
                pointerEvents: "none",
              }}
            />
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Chip
                label="COMING SOON"
                sx={{
                  mb: 2,
                  bgcolor: "rgba(255,255,255,0.1)",
                  color: "white",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                }}
              />
              <Typography
                color="white"
                fontWeight={900}
                sx={{
                  fontSize: { xs: 34, md: 64 },
                  lineHeight: 1.02,
                  letterSpacing: "-0.03em",
                  maxWidth: "8ch",
                }}
              >
                Middle Race
              </Typography>
              <Typography
                color="rgba(255,255,255,0.72)"
                fontSize={{ xs: 15, md: 18 }}
                lineHeight={1.8}
                mt={2}
                maxWidth="680px"
              >
                페이지 골격만 먼저 준비해 두었습니다. 제목, 설명, 섹션 블록,
                CTA 영역은 바로 교체 가능하도록 분리되어 있습니다.
              </Typography>
              <Box display="flex" gap={1.5} mt={3} flexWrap="wrap">
                <Button
                  disableElevation
                  sx={{
                    px: 2.2,
                    py: 1.1,
                    borderRadius: "999px",
                    bgcolor: "#f6c453",
                    color: "#17202c",
                    fontWeight: 800,
                    "&:hover": {
                      bgcolor: "#efba40",
                    },
                  }}
                >
                  Primary Slot
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    px: 2.2,
                    py: 1.1,
                    borderRadius: "999px",
                    borderColor: "rgba(255,255,255,0.22)",
                    color: "white",
                  }}
                >
                  Secondary Slot
                </Button>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "1.25fr 0.75fr" },
              gap: 3,
            }}
          >
            <SectionCard
              title="Main Content"
              description="가장 큰 본문 영역입니다. 규칙, 설명, 진행 방식, 카드 리스트, 인터랙션 컴포넌트 등 핵심 콘텐츠를 여기에 붙이면 됩니다."
              minHeight={320}
            />
            <SectionCard
              title="Side Panel"
              description="공지, 상태 요약, 메타 정보, 버튼 묶음, 링크 카드 같은 보조 요소를 두기 위한 영역입니다."
              minHeight={320}
            />
          </Box>

          <Box
            sx={{
              mt: 3,
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 3,
            }}
          >
            <SectionCard
              title="Block A"
              description="짧은 설명이나 카드형 콘텐츠를 넣기 좋습니다."
            />
            <SectionCard
              title="Block B"
              description="향후 이미지, 표, 입력 UI, 스텝 안내를 배치할 수 있습니다."
            />
            <SectionCard
              title="Block C"
              description="임시 레이아웃 확인용 영역입니다. 필요 없으면 제거하거나 다른 섹션과 합치면 됩니다."
            />
          </Box>

          <Box
            sx={{
              mt: 3,
              borderRadius: "28px",
              background: "rgba(255,255,255,0.74)",
              border: "1px solid rgba(20,24,36,0.08)",
              p: { xs: 2.5, md: 3.5 },
              boxShadow: "0 18px 50px rgba(18, 23, 37, 0.06)",
            }}
          >
            <Typography color="#0f172a" fontSize={22} fontWeight={800}>
              Notes
            </Typography>
            <Divider sx={{ my: 2, borderColor: "rgba(15,23,42,0.08)" }} />
            <Typography color="#667085" fontSize={15} lineHeight={1.8}>
              이후 실제 콘텐츠를 넣을 때는 이 페이지에서 텍스트만 교체하거나,
              별도 컴포넌트로 분리해서 꽂아 넣으면 됩니다.
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
