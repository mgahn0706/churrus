"use client";

import { Box, Button, Typography, Chip } from "@mui/material";
import { PlayArrowRounded, PeopleAlt, Search } from "@mui/icons-material";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { scenarios } from "@/features/suspect/fixtures";
import Header from "@/features/suspect/components/Header";

export default function Suspect() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const current = scenarios[currentIndex];
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const listRef = useRef<HTMLDivElement | null>(null);
  const currentIndexRef = useRef(0);
  const genderLabel = (gender?: string) => {
    if (gender === "male") return "남";
    if (gender === "female") return "여";
    return "N/A";
  };

  const handleSelect = useCallback(() => {
    router.push(`/suspect/scenario/${current.id}`);
  }, [current.id, router]);

  const changeIndex = useCallback((index: number) => {
    const safeIndex = (index + scenarios.length) % scenarios.length;
    if (safeIndex === currentIndexRef.current) return;
    setCurrentIndex(safeIndex);
  }, []);

  /* ===========================
     TAB NAVIGATION
  =========================== */
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const nextIndex = e.shiftKey
          ? currentIndexRef.current - 1
          : currentIndexRef.current + 1;
        changeIndex(nextIndex);
      }

      if (e.key === "Enter") handleSelect();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [changeIndex, handleSelect]);

  useEffect(() => {
    const node = itemRefs.current[currentIndex];
    const list = listRef.current;
    if (!node || !list) return;

    const listRect = list.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();
    const isAbove = nodeRect.top < listRect.top;
    const isBelow = nodeRect.bottom > listRect.bottom;
    if (isAbove || isBelow) {
      const offset =
        node.offsetTop - (list.clientHeight - node.clientHeight) / 2;
      list.scrollTo({ top: offset, behavior: "smooth" });
    }
  }, [currentIndex]);

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        background: `radial-gradient(1200px circle at 20% 10%, ${current.color}22, transparent 55%), #0a0c10`,
        display: "flex",
        flexDirection: "column",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient animated background */}
      <Box
        sx={{
          position: "absolute",
          inset: "-20%",
          background: `
              radial-gradient(600px circle at 20% 20%, ${current.color}33, transparent 55%),
              radial-gradient(520px circle at 80% 30%, ${current.color}22, transparent 55%),
              radial-gradient(520px circle at 30% 80%, ${current.color}2b, transparent 60%)
            `,
          filter: { xs: "none", md: "blur(24px)" },
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <Header />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: { xs: "stretch", md: "center" },
          p: { xs: 2, md: 4 },
          pt: { xs: "96px", sm: "104px", md: 4 },
          pb: { xs: 3, md: 4 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 1600,
            height: { xs: "auto", md: "82vh" },
            display: "flex",
            gap: { xs: 2, md: 3 },
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* ================= GLASS WINDOW ================= */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              position: "relative",
              borderRadius: 5,
              overflow: "hidden",
              background: {
                xs: "rgba(8,10,14,0.92)",
                md: "rgba(255,255,255,0.04)",
              },
              border: `1px solid ${current.color}33`,
              boxShadow: "0 24px 72px rgba(0,0,0,0.55)",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {/* ================= LEFT PANEL ================= */}
            <Box
              ref={listRef}
              sx={{
                width: { xs: "100%", md: 330 },
                height: { xs: 120, md: "auto" },
                overflowY: { xs: "hidden", md: "auto" },
                overflowX: { xs: "auto", md: "hidden" },
                "&::-webkit-scrollbar": { display: "none" },
                position: "relative",
                display: { xs: "flex", md: "block" },
                gap: { xs: 1, md: 0 },
                p: { xs: 1, md: 0 },
              }}
            >
              {/* subtle scanline */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to bottom, rgba(255,255,255,0.06), transparent 8%, transparent 92%, rgba(255,255,255,0.04))",
                  opacity: 0.35,
                  pointerEvents: "none",
                }}
              />
              {scenarios.map((s, index) => {
                const active = index === currentIndex;

                return (
                  <Box
                    key={s.id}
                    onClick={() => changeIndex(index)}
                    ref={(el: HTMLDivElement | null) => {
                      itemRefs.current[index] = el;
                    }}
                    sx={{
                      position: "relative",
                      height: 115,
                      minWidth: { xs: 240, sm: 260, md: "auto" },
                      cursor: "pointer",
                      overflow: "hidden",
                      background: active
                        ? `linear-gradient(135deg, ${s.color}2f, rgba(255,255,255,0.03))`
                        : "rgba(255,255,255,0.02)",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                      transition:
                        "background-color 200ms ease, border-color 200ms ease",
                      "&:hover": {
                        borderColor: `${s.color}55`,
                      },
                      flexShrink: 0,
                    }}
                  >
                    <Box sx={{ position: "absolute", inset: 0 }}>
                      <Image
                        src={s.backgroundImage}
                        alt={s.title}
                        fill
                        sizes="(max-width: 900px) 260px, 330px"
                        loading="lazy"
                        quality={65}
                        style={{
                          objectFit: "cover",
                          filter: active
                            ? "brightness(1)"
                            : "brightness(0.6) grayscale(40%)",
                          transition: "filter .6s ease",
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to right, rgba(0,0,0,0.92), rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.15))",
                      }}
                    />

                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background: `linear-gradient(to right, ${s.color}${
                          active ? "40" : "18"
                        }, transparent 65%)`,
                      }}
                    />

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
                        color: active ? "#fff" : "rgba(255,255,255,0.82)",
                      }}
                    >
                      {s.title}
                    </Typography>
                  </Box>
                );
              })}
            </Box>

            {/* ================= RIGHT PANEL ================= */}
            <Box
              sx={{
                flex: 1,
                position: "relative",
                overflow: { xs: "visible", md: "hidden" },
                minHeight: { xs: 360, md: "auto" },
              }}
            >
              {/* HERO IMAGE */}
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: 220, sm: 280, md: "100%" },
                }}
              >
                <Image
                  key={current.id}
                  src={current.backgroundImage}
                  alt={current.title}
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 900px"
                  quality={72}
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    filter: "brightness(0.65)",
                    transition: "opacity .4s ease",
                  }}
                />
              </Box>

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
                  position: { xs: "relative", md: "absolute" },
                  bottom: { md: 100 },
                  left: { md: 90 },
                  maxWidth: 700,
                  p: { xs: 2.5, sm: 3, md: 0 },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "clamp(28px, 4vw, 52px)",
                    fontWeight: 800,
                    mb: { xs: 1.5, md: 3 },
                  }}
                >
                  {current.title}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    mb: { xs: 2, md: 3 },
                    flexWrap: "wrap",
                  }}
                >
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
                      current.gameType === "CLUE"
                        ? "단서 탐색형"
                        : "키워드 검색형"
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
                    mb: { xs: 2.5, md: 4 },
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

          {/* ================= RIGHT SIDEBAR ================= */}
          <Box
            sx={{
              width: { xs: "100%", md: 300 },
              display: "flex",
              flexDirection: "column",
              gap: 2,
              borderRadius: 4,
              p: { xs: 2, md: 2 },
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${current.color}33`,
              boxShadow: `0 18px 48px rgba(0,0,0,0.28)`,
              position: "relative",
              overflow: { xs: "visible", md: "hidden" },
              minHeight: 0,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(120deg, ${current.color}22, transparent 35%, transparent 70%, ${current.color}1a)`,
                opacity: 0.35,
                pointerEvents: "none",
              }}
            />
            <Box sx={{ px: 1, pt: 1 }}>
              <Typography sx={{ fontSize: 12, letterSpacing: 2, opacity: 0.6 }}>
                SCENARIO DETAIL
              </Typography>
              <Typography sx={{ fontSize: 18, fontWeight: 800, mt: 0.5 }}>
                {current.title}
              </Typography>
            </Box>

            <Box sx={{ px: 1 }}>
              <Typography sx={{ fontSize: 13, opacity: 0.6, mb: 0.5 }}>
                시나리오 설명
              </Typography>
              <Typography sx={{ fontSize: 14, lineHeight: 1.7, opacity: 0.9 }}>
                {current.description}
              </Typography>
            </Box>

            <Box
              sx={{
                px: 1,
                flex: 1,
                minHeight: 0,
                overflowY: "auto",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              <Typography sx={{ fontSize: 13, opacity: 0.6, mb: 0.5 }}>
                피해자
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
                {current.victims && current.victims.length > 0 ? (
                  current.victims.map((victim) => (
                    <Box
                      key={victim.name}
                      sx={{
                        display: "flex",
                        gap: 1.2,
                        p: 1,
                        borderRadius: 2,
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: 1.5,
                          overflow: "hidden",
                          position: "relative",
                          flexShrink: 0,
                        }}
                      >
                        <Image
                          src={victim.image || current.backgroundImage}
                          alt={victim.name}
                          fill
                          sizes="44px"
                          loading="lazy"
                          quality={60}
                          style={{ objectFit: "cover" }}
                        />
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                          {victim.name}
                        </Typography>
                        <Typography sx={{ fontSize: 12, opacity: 0.7 }}>
                          {victim.job}
                        </Typography>
                        <Typography sx={{ fontSize: 12, opacity: 0.6 }}>
                          {victim.age}세 · {genderLabel(victim.gender)}
                        </Typography>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Typography sx={{ fontSize: 13, opacity: 0.5 }}>
                    피해자 정보를 준비 중입니다.
                  </Typography>
                )}
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontSize: 13, opacity: 0.6, mb: 0.5 }}>
                  용의자 목록
                </Typography>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}
                >
                  {current.suspects && current.suspects.length > 0 ? (
                    current.suspects.map((suspect) => (
                      <Box
                        key={suspect.name}
                        sx={{
                          display: "flex",
                          gap: 1.2,
                          p: 1,
                          borderRadius: 2,
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.05)",
                        }}
                      >
                        <Box
                          sx={{
                            width: 44,
                            height: 44,
                            borderRadius: 1.5,
                            overflow: "hidden",
                            position: "relative",
                            flexShrink: 0,
                          }}
                        >
                          <Image
                            src={suspect.image || current.backgroundImage}
                            alt={suspect.name}
                            fill
                            sizes="44px"
                            loading="lazy"
                            quality={60}
                            style={{ objectFit: "cover" }}
                          />
                        </Box>
                        <Box sx={{ minWidth: 0 }}>
                          <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                            {suspect.name}
                          </Typography>
                          <Typography sx={{ fontSize: 12, opacity: 0.7 }}>
                            {suspect.job}
                          </Typography>
                          <Typography sx={{ fontSize: 12, opacity: 0.6 }}>
                            {suspect.age}세 · {genderLabel(suspect.gender)}
                          </Typography>
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Typography sx={{ fontSize: 13, opacity: 0.5 }}>
                      용의자 정보를 준비 중입니다.
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>

            <Box sx={{ px: 1, mt: "auto" }}>
              <Typography sx={{ fontSize: 12, opacity: 0.45, mb: 0.5 }}>
                기록
              </Typography>
              <Typography sx={{ fontSize: 12, opacity: 0.5, lineHeight: 1.6 }}>
                {current.histories && current.histories.length > 0
                  ? current.histories.join(" · ")
                  : "기록이 없습니다."}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
