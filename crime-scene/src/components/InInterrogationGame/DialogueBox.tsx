"use client";

import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import type { InterrogationDialogueLine } from "@/types";

export default function DialogueBox({
  line,
  onAdvance,
}: {
  line: InterrogationDialogueLine;
  onAdvance: () => void;
}) {
  const glyphs = Array.from(line.text);
  const [visibleCount, setVisibleCount] = useState(0);
  const isComplete = visibleCount >= glyphs.length;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setVisibleCount((count) => {
        if (count >= glyphs.length) {
          window.clearInterval(timer);
          return count;
        }
        return count + 1;
      });
    }, 28);

    return () => window.clearInterval(timer);
  }, [glyphs.length]);

  const advance = () => {
    if (isComplete) onAdvance();
    else setVisibleCount(glyphs.length);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      const target = event.target as HTMLElement;
      if (target.closest("button, input, textarea, select")) return;
      event.preventDefault();
      advance();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return (
    <Box
      component="button"
      type="button"
      autoFocus
      onClick={advance}
      aria-label={`${line.speaker ? `${line.speaker}: ` : ""}${line.text}. ${isComplete ? "다음 대사" : "전체 대사 표시"}`}
      sx={{
        appearance: "none",
        position: "fixed",
        left: { xs: 12, md: "7%" },
        right: { xs: 12, md: "7%" },
        bottom: { xs: 12, md: 28 },
        minHeight: { xs: 166, md: 190 },
        width: { xs: "calc(100% - 24px)", md: "86%" },
        border: "2px solid rgba(237,211,164,.75)",
        borderRadius: 1.5,
        bgcolor: "rgba(9,12,14,.95)",
        boxShadow:
          "0 20px 70px rgba(0,0,0,.65), inset 0 0 35px rgba(203,164,104,.1)",
        color: "#fff9ec",
        textAlign: "left",
        cursor: "pointer",
        px: { xs: 2.5, md: 5 },
        py: { xs: 3, md: 4 },
        pl: line.portrait ? { xs: 2.5, md: 190 } : undefined,
        overflow: "visible",
        zIndex: 50,
        "&:focus-visible": {
          outline: "3px solid #f7d492",
          outlineOffset: 4,
        },
      }}
    >
      {line.portrait && (
        <Box
          component="img"
          src={line.portrait}
          alt=""
          sx={{
            display: { xs: "none", md: "block" },
            position: "absolute",
            left: 22,
            bottom: 0,
            width: 145,
            height: 185,
            objectFit: "cover",
            objectPosition: "top",
            borderRadius: "8px 8px 0 0",
            maskImage: "linear-gradient(to bottom, black 78%, transparent)",
          }}
        />
      )}
      <Typography
        component="span"
        sx={{
          position: "absolute",
          top: -20,
          left: line.portrait ? { xs: 18, md: 185 } : 22,
          bgcolor: "#b8874b",
          color: "#17110b",
          px: 2,
          py: 0.5,
          fontWeight: 800,
          fontSize: 15,
          borderRadius: "4px 4px 0 0",
        }}
      >
        {line.speaker || "사건 기록"}
      </Typography>
      <Typography
        aria-hidden="true"
        sx={{
          fontSize: { xs: 18, md: 23 },
          lineHeight: 1.65,
          fontWeight: 600,
          wordBreak: "keep-all",
          whiteSpace: "pre-wrap",
        }}
      >
        {glyphs.slice(0, visibleCount).join("")}
      </Typography>
      <Typography
        component="span"
        aria-hidden="true"
        sx={{
          position: "absolute",
          right: 24,
          bottom: 12,
          fontSize: 13,
          color: "#d8bd89",
          opacity: isComplete ? 1 : 0.5,
          animation: isComplete
            ? "dialoguePulse 1s ease-in-out infinite"
            : "none",
          "@keyframes dialoguePulse": {
            "50%": { transform: "translateY(4px)", opacity: 0.45 },
          },
        }}
      >
        {isComplete ? "▼ 계속" : "클릭하여 펼치기"}
      </Typography>
    </Box>
  );
}
