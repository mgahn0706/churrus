import { Box, Button, Chip, IconButton, Typography } from "@mui/material";
import {
  ArrowBackIosNewRounded,
  ArrowForwardIosRounded,
  PlayArrowRounded,
  PeopleAlt,
  Schedule,
} from "@mui/icons-material";
import { useEffect, useMemo, useState } from "react";

import { scenarios as sourceScenarios } from "@/features/suspect/fixtures";
import Header from "@/features/suspect/components/Header";
import { useRouter } from "next/navigation";

// --------- helpers ----------
const getDifficultyLabel = (d: unknown) => {
  if (typeof d === "string") return d; // "초급/중급/고급" 등
  if (typeof d === "number") {
    if (d <= 1.7) return "초급";
    if (d <= 2.4) return "중급";
    return "고급";
  }
  return "중급";
};

const difficultySx = (label: string) => {
  switch (label) {
    case "초급":
      return { bgcolor: "rgba(255,255,255,0.2)", color: "#fff" };
    case "중급":
      return {
        bgcolor: "rgba(255,255,255,0.08)",
        color: "#fff",
        border: "1px solid rgba(255,255,255,0.3)",
      };
    case "고급":
      return {
        bgcolor: "rgba(0,0,0,0.7)",
        color: "#fff",
        border: "1px solid rgba(255,255,255,0.4)",
      };
    default:
      return { bgcolor: "rgba(255,255,255,0.15)", color: "#fff" };
  }
};

// 시나리오 정규화: fixtures의 다양한 필드명 흡수
function useNormalizedScenarios() {
  return useMemo(
    () =>
      (sourceScenarios as any[]).map((s, idx) => {
        const image = s.image || s.backgroundImage || "/placeholder.svg";
        return {
          isInDevelopment: s.isInDevelopment || false,
          id: s.id || `scenario-${idx}`,
          title: s.title ?? "제목 없음",
          description:
            s.description ||
            s.synopsis ||
            "사건 현장을 수사하여 진실을 밝혀내세요.",
          difficulty: s.difficulty ?? 2,
          players: s.players || `${s.numberOfSuspects ?? 4}-8명`,
          duration:
            typeof s.playTime === "number"
              ? `${s.playTime}분`
              : s.duration || "60분",
          image,
          bgmURL: s.bgmURL,
          keyword: s.keyword || "",
          history: s.history,
          numberOfSuspects: s.numberOfSuspects,
          raw: s,
        };
      }),
    []
  );
}

export default function Suspect() {
  const scenarios = useNormalizedScenarios();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [glitchText, setGlitchText] = useState("SELECT YOUR CRIME SCENE");

  const router = useRouter();

  // 글리치 텍스트
  useEffect(() => {
    const glitchChars = "█▓▒░▄▀▐▌│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌";
    const original = "SELECT YOUR CRIME SCENE";
    const id = setInterval(() => {
      if (Math.random() > 0.92) {
        const g = original
          .split("")
          .map((c) =>
            Math.random() > 0.7
              ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
              : c
          )
          .join("");
        setGlitchText(g);
        const t = setTimeout(() => setGlitchText(original), 150);
        return () => clearTimeout(t);
      }
    }, 300);
    return () => clearInterval(id);
  }, []);

  const handleSelect = (idx: number) => {
    router.push(
      `/suspect/scenario/${scenarios[idx].keyword || scenarios[idx].id}`
    );
  };

  const next = () => setCurrentIndex((p) => (p + 1) % scenarios.length);
  const prev = () =>
    setCurrentIndex((p) => (p - 1 + scenarios.length) % scenarios.length);

  // -------- 선택 화면(타겟 UI) --------
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "black",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Header />

      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 글리치 타이틀 */}
        <Box sx={{ textAlign: "center", py: 4, position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.05), transparent)",
            }}
          />
          <Box sx={{ position: "relative", height: 120 }}>
            <Box
              sx={{
                position: "relative",
                display: "inline-block",
                color: "#fff",
                fontFamily: "monospace",
                fontWeight: 800,
                letterSpacing: "0.2em",
                fontSize: { xs: 22, md: 32 },
                mt: 5,
                mb: 1.5,
                "&:before, &:after": {
                  content: `"${glitchText}"`,
                  position: "absolute",
                  left: 0,
                  color: "#fff",
                  clipPath: "polygon(0 0, 100% 0, 100% 33%, 0 33%)",
                },
              }}
            >
              {glitchText}
            </Box>
          </Box>
        </Box>

        {/* 중앙 큰 카드 */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            px: 2,
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 1080 }}>
            <Box
              sx={{
                width: "100%",
                height: 540,
                borderRadius: 3,
                overflow: "hidden",
                border: "2px solid rgba(255,255,255,0.3)",
                bgcolor: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(6px)",
                transition: "all .7s",
                "&:hover": {
                  borderColor: "#fff",
                  boxShadow: "0 20px 60px rgba(255,255,255,0.1)",
                },
                position: "relative",
              }}
            >
              {/* 배경 이미지 */}
              <Box
                component="img"
                src={scenarios[currentIndex].image}
                alt={scenarios[currentIndex].title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 1s",
                  "&:hover": { transform: "scale(1.03)" },
                }}
              />
              {/* 오버레이들 */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.4), transparent)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
                  backgroundSize: "40px 40px, 40px 40px",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)",
                  backgroundSize: "60px 60px",
                  opacity: 0.5,
                }}
              />

              {/* 코너 브라켓 */}
              {[
                { top: 24, left: 24, border: ["t", "l"] },
                { top: 24, right: 24, border: ["t", "r"] },
                { bottom: 24, left: 24, border: ["b", "l"] },
                { bottom: 24, right: 24, border: ["b", "r"] },
              ].map((pos, i) => (
                <Box
                  key={i}
                  sx={{
                    position: "absolute",
                    width: 48,
                    height: 48,
                    borderTop: pos.border.includes("t")
                      ? "2px solid rgba(255,255,255,0.6)"
                      : "none",
                    borderLeft: pos.border.includes("l")
                      ? "2px solid rgba(255,255,255,0.6)"
                      : "none",
                    borderRight: pos.border.includes("r")
                      ? "2px solid rgba(255,255,255,0.6)"
                      : "none",
                    borderBottom: pos.border.includes("b")
                      ? "2px solid rgba(255,255,255,0.6)"
                      : "none",
                    ...pos,
                  }}
                />
              ))}

              {/* 텍스트/버튼 */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  p: 3,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    alignItems: "center",
                    flexWrap: "wrap",
                    mb: 1,
                    mx: 1,
                  }}
                >
                  <Chip
                    label={getDifficultyLabel(
                      scenarios[currentIndex].difficulty
                    )}
                    sx={{
                      ...difficultySx(
                        getDifficultyLabel(scenarios[currentIndex].difficulty)
                      ),
                      px: 1.5,
                      height: 28,
                      fontFamily: "monospace",
                    }}
                  />
                  <Chip
                    variant="outlined"
                    label={
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <PeopleAlt fontSize="small" />
                        <span>{scenarios[currentIndex].numberOfSuspects}</span>
                      </Box>
                    }
                    sx={{
                      color: "#fff",
                      borderColor: "rgba(255,255,255,0.4)",
                      height: 28,
                      fontFamily: "monospace",
                    }}
                  />
                  <Chip
                    variant="outlined"
                    label={
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <Schedule fontSize="small" />
                        <span>{scenarios[currentIndex].duration}</span>
                      </Box>
                    }
                    sx={{
                      color: "#fff",
                      borderColor: "rgba(255,255,255,0.4)",
                      height: 28,
                      fontFamily: "monospace",
                    }}
                  />
                </Box>

                <Typography
                  variant="h4"
                  sx={{
                    mx: 1,
                    color: "#fff",
                    fontFamily: "monospace",
                    fontWeight: 800,
                  }}
                >
                  {scenarios[currentIndex].title}
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.9)",
                    maxWidth: 720,
                    mt: 1,
                    mx: 1,
                  }}
                >
                  {scenarios[currentIndex].description}
                </Typography>

                <Button
                  disabled={scenarios[currentIndex].isInDevelopment}
                  variant="contained"
                  onClick={() => handleSelect(currentIndex)}
                  startIcon={<PlayArrowRounded />}
                  sx={{
                    my: 2,
                    mx: 1,
                    bgcolor: "#fff",
                    color: "#000",
                    fontWeight: 800,
                    px: 2.5,
                    "&:hover": {
                      bgcolor: "#e6e6e6",
                      transform: "translateY(-1px)",
                    },
                    transition: "all .3s",
                    width: "fit-content",
                  }}
                >
                  게임 시작
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* 썸네일 바 + 좌우 버튼 */}
        <Box sx={{ pb: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              mb: 1.5,
            }}
          >
            <IconButton
              onClick={prev}
              sx={{
                width: 48,
                height: 48,
                color: "#fff",
                border: "2px solid rgba(255,255,255,0.3)",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.1)",
                  transform: "scale(1.05)",
                },
                transition: "all .3s",
              }}
            >
              <ArrowBackIosNewRounded />
            </IconButton>

            <Box sx={{ display: "flex", gap: 1.5, flexWrap: "nowrap" }}>
              {scenarios.map((s, index) => {
                const active = index === currentIndex;
                return (
                  <Box
                    key={s.id}
                    onClick={() => setCurrentIndex(index)}
                    sx={{
                      position: "relative",
                      cursor: "pointer",
                      transform: active ? "scale(1.08)" : "scale(1)",
                      transition: "all .4s",
                      filter: active ? "none" : "grayscale(0.2)",
                    }}
                  >
                    <Box
                      sx={{
                        width: 96,
                        height: 64,
                        borderRadius: 1.5,
                        overflow: "hidden",
                        border: `1px solid ${
                          active
                            ? "rgba(255,255,255,0.8)"
                            : "rgba(255,255,255,0.4)"
                        }`,
                        boxShadow: active
                          ? "0 10px 24px rgba(255,255,255,0.2)"
                          : "none",
                        position: "relative",
                        "&:hover img": { transform: "scale(1.05)" },
                      }}
                    >
                      <Box
                        component="img"
                        src={s.image}
                        alt={s.title}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform .4s",
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2), transparent)",
                        }}
                      />
                      {/* 미세한 그리드 오버레이 */}
                      <Box
                        sx={{
                          position: "absolute",
                          inset: 0,
                          opacity: active ? 1 : 0,
                          transition: "opacity .4s",
                          backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                          backgroundSize: "10px 10px, 10px 10px",
                        }}
                      />
                      {active && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 6,
                            right: 6,
                            width: 8,
                            height: 8,
                            bgcolor: "#fff",
                            borderRadius: "50%",
                            boxShadow: "0 0 12px rgba(255,255,255,0.8)",
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                );
              })}
            </Box>

            <IconButton
              onClick={next}
              sx={{
                width: 48,
                height: 48,
                color: "#fff",
                border: "2px solid rgba(255,255,255,0.3)",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.1)",
                  transform: "scale(1.05)",
                },
                transition: "all .3s",
              }}
            >
              <ArrowForwardIosRounded />
            </IconButton>
          </Box>

          {/* 하단 인디케이터 */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
            {scenarios.map((_, i) => {
              const active = i === currentIndex;
              return (
                <Box
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  sx={{
                    width: active ? 48 : 8,
                    height: 8,
                    borderRadius: active ? 999 : "50%",
                    bgcolor: active ? "#fff" : "rgba(255,255,255,0.4)",
                    border: active ? "none" : "1px solid rgba(255,255,255,0.2)",
                    transition: "all .4s",
                    cursor: "pointer",
                    "&:hover": { transform: "scale(1.1)" },
                  }}
                />
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
