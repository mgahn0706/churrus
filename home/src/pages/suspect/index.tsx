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
  const creators = current.creators.filter(Boolean);
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

  const renderPersonCard = (
    person: {
      name: string;
      age: number;
      gender: "male" | "female";
      job: string;
      image?: string;
    },
    fallbackImage: string
  ) => (
    <Box
      key={person.name}
      tabIndex={0}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.1,
        p: 1,
        borderRadius: 1.5,
        background: "rgba(255,255,255,0.028)",
        border: "1px solid rgba(132,158,185,0.12)",
        minWidth: 0,
        outline: "none",
        transition: "background-color 180ms ease, border-color 180ms ease",
        "&:hover": {
          background: "rgba(255,255,255,0.05)",
          borderColor: "rgba(132,158,185,0.2)",
        },
        "&:focus-visible": {
          borderColor: "rgba(111,174,255,0.62)",
          boxShadow: "0 0 0 2px rgba(111,174,255,0.16)",
        },
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
          src={person.image || fallbackImage}
          alt={person.name}
          fill
          sizes="44px"
          loading="lazy"
          quality={60}
          style={{ objectFit: "cover" }}
        />
      </Box>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            gap: 0.7,
            minWidth: 0,
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 700,
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {person.name}
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              opacity: 0.72,
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {person.age}세 · {genderLabel(person.gender)}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: 12,
            opacity: 0.8,
            lineHeight: 1.35,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {person.job}
        </Typography>
      </Box>
    </Box>
  );

  /* ===========================
     TAB NAVIGATION
  =========================== */
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

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
                    role="button"
                    tabIndex={0}
                    aria-pressed={active}
                    onClick={() => changeIndex(index)}
                    onFocus={() => changeIndex(index)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        if (active) handleSelect();
                        else changeIndex(index);
                      }
                    }}
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
                        ? `linear-gradient(135deg, ${s.color}38, rgba(255,255,255,0.045))`
                        : "rgba(255,255,255,0.02)",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                      boxShadow: active
                        ? "inset 3px 0 0 rgba(111,174,255,0.72)"
                        : "none",
                      outline: "none",
                      transition:
                        "background 200ms ease, border-color 200ms ease, box-shadow 200ms ease",
                      "&:hover": {
                        borderColor: `${s.color}55`,
                        background: active
                          ? `linear-gradient(135deg, ${s.color}40, rgba(255,255,255,0.055))`
                          : "rgba(255,255,255,0.045)",
                      },
                      "&:focus-visible": {
                        boxShadow: active
                          ? "inset 3px 0 0 rgba(126,185,255,0.9), inset 0 0 0 1px rgba(126,185,255,0.62)"
                          : "inset 0 0 0 1px rgba(126,185,255,0.62)",
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
                            ? "brightness(1.04)"
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
                          active ? "48" : "18"
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
                    filter: "brightness(0.72)",
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
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "clamp(28px, 4vw, 52px)",
                    fontWeight: 800,
                    lineHeight: 1.06,
                    mb: { xs: 0.9, md: 1.2 },
                  }}
                >
                  {current.title}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    mb: { xs: 1.1, md: 1.5 },
                    flexWrap: "wrap",
                  }}
                >
                  <Chip
                    icon={<PeopleAlt />}
                    label={`용의자 ${current.numberOfSuspects}명`}
                    sx={{
                      bgcolor: `${current.color}30`,
                      color: "rgba(255,255,255,0.9)",
                      border: `1px solid ${current.color}78`,
                      "& .MuiChip-icon": {
                        color: "rgba(255,255,255,0.82)",
                      },
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
                      bgcolor: `${current.color}30`,
                      color: "rgba(255,255,255,0.9)",
                      border: `1px solid ${current.color}78`,
                      "& .MuiChip-icon": {
                        color: "rgba(255,255,255,0.82)",
                      },
                    }}
                  />
                </Box>

                <Typography
                  sx={{
                    fontSize: "clamp(14px, 1.1vw, 18px)",
                    opacity: 0.9,
                    lineHeight: 1.72,
                    maxWidth: 560,
                    mb: { xs: 1.2, md: 1.75 },
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
                    outline: "none",
                    transition:
                      "transform 180ms ease, box-shadow 180ms ease, filter 180ms ease",
                    "&:hover": {
                      transform: "translateY(-1px)",
                      boxShadow: `0 12px 34px ${current.color}72`,
                      background: current.color,
                      filter: "brightness(1.06)",
                    },
                    "&:focus-visible": {
                      boxShadow: `0 0 0 3px rgba(255,255,255,0.2), 0 12px 34px ${current.color}72`,
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
              "&::before": {
                content: '""',
                position: "absolute",
                top: 12,
                right: 12,
                width: 18,
                height: 18,
                borderTop: "1px solid rgba(111,174,255,0.18)",
                borderRight: "1px solid rgba(111,174,255,0.18)",
                pointerEvents: "none",
              },
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: 12,
                left: 12,
                width: 18,
                height: 18,
                borderBottom: "1px solid rgba(111,174,255,0.14)",
                borderLeft: "1px solid rgba(111,174,255,0.14)",
                pointerEvents: "none",
              },
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
            <Box
              sx={{
                px: 1,
                pt: 1,
                pb: 1.5,
                borderBottom: "1px solid rgba(111,174,255,0.24)",
              }}
            >
              <Typography sx={{ fontSize: 12, letterSpacing: 2, opacity: 0.7 }}>
                CASE FILE {String(currentIndex + 1).padStart(2, "0")}
              </Typography>
              <Typography
                sx={{
                  mt: 0.6,
                  fontSize: 15,
                  fontWeight: 700,
                  lineHeight: 1.35,
                  color: "rgba(255,255,255,0.88)",
                }}
              >
                {current.title}
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
              <Typography sx={{ fontSize: 13, opacity: 0.7, mb: 0.5 }}>
                피해자
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
                {current.victims && current.victims.length > 0 ? (
                  current.victims.map((victim) =>
                    renderPersonCard(victim, current.backgroundImage)
                  )
                ) : (
                  <Typography sx={{ fontSize: 13, opacity: 0.62 }}>
                    피해자 정보를 준비 중입니다.
                  </Typography>
                )}
              </Box>

              <Box
                sx={{
                  mt: 2.25,
                  pt: 2,
                  borderTop: "1px solid rgba(132,158,185,0.12)",
                }}
              >
                <Typography sx={{ fontSize: 13, opacity: 0.7, mb: 0.5 }}>
                  용의자
                </Typography>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}
                >
                  {current.suspects && current.suspects.length > 0 ? (
                    current.suspects.map((suspect) =>
                      renderPersonCard(suspect, current.backgroundImage)
                    )
                  ) : (
                    <Typography sx={{ fontSize: 13, opacity: 0.62 }}>
                      용의자 정보를 준비 중입니다.
                    </Typography>
                  )}
                </Box>
              </Box>

              {current.histories && current.histories.length > 0 && (
                <Box
                  sx={{
                    mt: 2.25,
                    pt: 2,
                    mb: 1,
                    borderTop: "1px solid rgba(132,158,185,0.12)",
                  }}
                >
                  <Typography sx={{ fontSize: 12, opacity: 0.65, mb: 0.5 }}>
                    기록
                  </Typography>
                  <Typography
                    sx={{ fontSize: 12, opacity: 0.68, lineHeight: 1.6 }}
                  >
                    {current.histories.join(" · ")}
                  </Typography>
                </Box>
              )}

              {creators.length > 0 && (
                <Typography
                  sx={{
                    mt: 2,
                    pt: 1.5,
                    borderTop: "1px solid rgba(132,158,185,0.08)",
                    fontSize: 10,
                    letterSpacing: 0.7,
                    lineHeight: 1.5,
                    color: "rgba(255,255,255,0.38)",
                  }}
                >
                  제작: {creators.join(", ")}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
