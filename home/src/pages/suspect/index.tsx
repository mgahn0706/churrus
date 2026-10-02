import { ArrowForwardRounded, SearchRounded } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { CRIME_SCENE_URL } from "@/utils/externalUrls";
import Head from "next/head";

export default function SuspectMovedPage() {
  return (
    <>
      <Head>
        <title>추러스 크라임씬이 이동했어요</title>
      </Head>

      <Box
        sx={{
          minHeight: "100dvh",
          background:
            "radial-gradient(900px circle at 18% 12%, rgba(91, 126, 255, 0.22), transparent 55%), #0a0c10",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: "-20%",
            background: `
              radial-gradient(520px circle at 78% 24%, rgba(112, 87, 255, 0.2), transparent 58%),
              radial-gradient(480px circle at 28% 82%, rgba(61, 137, 255, 0.16), transparent 62%)
            `,
            filter: { xs: "none", md: "blur(22px)" },
            pointerEvents: "none",
          }}
        />

        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            opacity: 0.16,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent 78%)",
            pointerEvents: "none",
          }}
        />

        <Box
          component="header"
          sx={{
            minHeight: 60,
            px: { xs: 2, sm: 3 },
            display: "flex",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography fontSize={{ xs: 14, sm: 16 }} fontWeight={800}>
            추러스 크라임씬 🔍
          </Typography>
        </Box>

        <Box
          component="main"
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 2,
            pb: { xs: 8, sm: 10 },
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: 680,
              p: { xs: 3, sm: 5 },
              borderRadius: { xs: 4, sm: 5 },
              textAlign: "center",
              background:
                "linear-gradient(145deg, rgba(24,29,40,0.86), rgba(14,17,24,0.74))",
              border: "1px solid rgba(148, 169, 214, 0.18)",
              boxShadow:
                "0 30px 90px rgba(0,0,0,0.46), inset 0 1px 0 rgba(255,255,255,0.06)",
              backdropFilter: "blur(24px)",
            }}
          >
            <Box
              sx={{
                width: { xs: 72, sm: 84 },
                height: { xs: 72, sm: 84 },
                mx: "auto",
                mb: 3,
                display: "grid",
                placeItems: "center",
                borderRadius: "24px",
                color: "#dce7ff",
                background:
                  "linear-gradient(145deg, rgba(95,130,255,0.3), rgba(98,74,214,0.18))",
                border: "1px solid rgba(151,178,255,0.28)",
                boxShadow: "0 16px 42px rgba(44,76,180,0.24)",
              }}
            >
              <SearchRounded sx={{ fontSize: { xs: 36, sm: 42 } }} />
            </Box>

            <Box
              sx={{
                width: "fit-content",
                mx: "auto",
                mb: 2,
                px: 1.5,
                py: 0.65,
                borderRadius: 999,
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "rgba(220,231,255,0.82)",
                bgcolor: "rgba(118,149,255,0.09)",
                border: "1px solid rgba(135,164,255,0.16)",
              }}
            >
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  bgcolor: "#80a2ff",
                  boxShadow: "0 0 14px #6f91ff",
                }}
              />
              <Typography
                component="span"
                fontSize={11}
                fontWeight={800}
                letterSpacing="0.14em"
              >
                NEW LOCATION
              </Typography>
            </Box>

            <Typography
              component="h1"
              sx={{
                m: 0,
                fontSize: { xs: 28, sm: 40 },
                fontWeight: 900,
                lineHeight: 1.28,
                letterSpacing: "-0.035em",
              }}
            >
              협동 크라임씬은
              <Box component="span" sx={{ display: "block", color: "#a9c0ff" }}>
                새 주소로 이동되었어요
              </Box>
            </Typography>

            <Typography
              sx={{
                mt: 2,
                color: "rgba(225,231,244,0.68)",
                fontSize: { xs: 14, sm: 16 },
                lineHeight: 1.7,
              }}
            >
              기존 시나리오는 새 공간에서도 그대로 즐길 수 있어요.
              <br />
              아래 버튼을 눌러 새로운 공간에서 추리를 이어가세요.
            </Typography>

            <Button
              component="a"
              href={CRIME_SCENE_URL}
              variant="contained"
              endIcon={<ArrowForwardRounded />}
              sx={{
                mt: { xs: 3.5, sm: 4 },
                px: { xs: 3, sm: 4 },
                py: 1.4,
                borderRadius: 2.5,
                fontSize: { xs: 15, sm: 16 },
                fontWeight: 800,
                color: "#0a0c10",
                background: "linear-gradient(135deg, #dbe5ff, #93b1ff)",
                boxShadow: "0 14px 34px rgba(80,119,230,0.28)",
                textTransform: "none",
                transition: "transform 180ms ease, box-shadow 180ms ease",
                "&:hover": {
                  background: "linear-gradient(135deg, #edf2ff, #a8c0ff)",
                  boxShadow: "0 18px 40px rgba(80,119,230,0.4)",
                  transform: "translateY(-2px)",
                },
                "&:focus-visible": {
                  outline: "2px solid #fff",
                  outlineOffset: "3px",
                },
              }}
            >
              새로운 크라임씬으로 이동
            </Button>

            <Typography
              sx={{
                mt: 2,
                color: "rgba(202,213,237,0.38)",
                fontSize: 11,
                wordBreak: "break-all",
              }}
            >
              churrus-crime-scene.vercel.app
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
