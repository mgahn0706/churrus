"use client";

import { Box, Button, Typography, Chip } from "@mui/material";
import { PlayArrowRounded, PeopleAlt, Search } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { scenarios as sourceScenarios } from "@/features/suspect/fixtures";
import Header from "@/features/suspect/components/Header";

export default function Suspect() {
  const scenarios = sourceScenarios;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);
  const router = useRouter();
  const current = scenarios[currentIndex];

  const handleSelect = () => {
    router.push(`/suspect/scenario/${current.id}`);
  };

  const changeIndex = (index: number) => {
    const safeIndex = (index + scenarios.length) % scenarios.length;
    setFadeKey((p) => p + 1);
    setCurrentIndex(safeIndex);
  };

  /* ===========================
     TAB NAVIGATION
  =========================== */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault();
        e.shiftKey
          ? changeIndex(currentIndex - 1)
          : changeIndex(currentIndex + 1);
      }

      if (e.key === "Enter") handleSelect();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex]);

  return (
    <Box
      sx={{
        height: "100vh",
        background: "#0a0c10",
        display: "flex",
        flexDirection: "column",
        color: "#fff",
      }}
    >
      <Header />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
        }}
      >
        {/* ================= GLASS WINDOW ================= */}
        <Box
          sx={{
            width: "100%",
            maxWidth: 1400,
            height: "82vh",
            display: "flex",
            position: "relative",
            borderRadius: 5,
            overflow: "hidden",
            backdropFilter: "blur(24px)",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 40px 120px rgba(0,0,0,0.8)",
          }}
        >
          {/* ================= LEFT PANEL ================= */}
          <Box
            sx={{
              width: 330,
              overflowY: "auto",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {scenarios.map((s, index) => {
              const active = index === currentIndex;

              return (
                <Box
                  key={s.id}
                  onClick={() => changeIndex(index)}
                  sx={{
                    position: "relative",
                    height: 115,
                    cursor: "pointer",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    component="img"
                    src={s.backgroundImage}
                    alt={s.title}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: active
                        ? "brightness(1)"
                        : "brightness(0.6) grayscale(40%)",
                      transition: "all .6s ease",
                    }}
                  />

                  {/* Dark gradient */}
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to right, rgba(0,0,0,0.95), rgba(0,0,0,0.6) 40%, transparent)",
                    }}
                  />

                  {/* Scenario color overlay (subtle) */}
                  {active && (
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background: `linear-gradient(to right, ${s.color}33, transparent 60%)`,
                        transition: "opacity .6s ease",
                      }}
                    />
                  )}

                  <Typography
                    sx={{
                      position: "absolute",
                      left: 24,
                      top: 20,
                      fontSize: 11,
                      letterSpacing: 2,
                      fontWeight: 600,
                      opacity: active ? 0.8 : 0.4,
                    }}
                  >
                    CASE {String(index + 1).padStart(2, "0")}
                  </Typography>

                  <Typography
                    sx={{
                      position: "absolute",
                      left: 24,
                      bottom: 28,
                      fontSize: 17,
                      fontWeight: active ? 700 : 500,
                      letterSpacing: 0.8,
                      transition: "transform 350ms ease",
                      transform: active ? "scale(1.04)" : "scale(1)",
                      transformOrigin: "left bottom",
                    }}
                  >
                    {s.title}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          {/* ================= RIGHT PANEL ================= */}
          <Box sx={{ flex: 1, position: "relative", overflow: "hidden" }}>
            {/* HERO IMAGE */}
            <Box
              key={fadeKey}
              component="img"
              src={current.backgroundImage}
              alt={current.title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.65)",
                transition: "opacity .6s ease",
              }}
            />

            {/* Base dark gradient */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background: `
                  linear-gradient(to right, rgba(0,0,0,0.95), rgba(0,0,0,0.7) 45%, transparent 70%),
                  linear-gradient(to top, rgba(0,0,0,0.85), transparent 60%)
                `,
              }}
            />

            {/* Scenario color radial mood */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background: `radial-gradient(circle at 30% 40%, ${current.color}55, transparent 60%)`,
                mixBlendMode: "overlay",
                pointerEvents: "none",
              }}
            />

            {/* ================= CONTENT ================= */}
            <Box
              sx={{
                position: "absolute",
                bottom: 100,
                left: 90,
                maxWidth: 700,
              }}
            >
              <Typography
                sx={{
                  fontSize: "clamp(28px, 4vw, 52px)",
                  fontWeight: 800,
                  mb: 3,
                }}
              >
                {current.title}
              </Typography>

              <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <Chip
                  icon={<PeopleAlt />}
                  label={`용의자 ${current.numberOfSuspects}명`}
                  sx={{
                    bgcolor: `${current.color}22`,
                    color: current.color,
                    border: `1px solid ${current.color}55`,
                  }}
                />
                <Chip
                  icon={<Search />}
                  label={
                    current.gameType === "CLUE" ? "단서 탐색형" : "단서 검색형"
                  }
                  sx={{
                    bgcolor: `${current.color}22`,
                    color: current.color,
                    border: `1px solid ${current.color}55`,
                  }}
                />
              </Box>

              <Typography
                sx={{
                  fontSize: "clamp(14px, 1.1vw, 18px)",
                  opacity: 0.85,
                  lineHeight: 1.8,
                  mb: 4,
                }}
              >
                {current.description}
              </Typography>

              <Button
                startIcon={<PlayArrowRounded />}
                onClick={handleSelect}
                disabled={current.isInDevelopment}
                sx={{
                  px: 3,
                  py: 1.2,
                  borderRadius: 999,
                  fontWeight: 600,
                  fontSize: 14,
                  background: current.color,
                  color: "#fff",
                  boxShadow: `0 10px 30px ${current.color}55`,
                  transition: "all .3s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: `0 15px 40px ${current.color}88`,
                    background: current.color,
                  },
                }}
              >
                조사 시작
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
