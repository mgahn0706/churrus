"use client";

import { Box, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import type { InterrogationConversationChoice, InterrogationDialogueLine } from "@/types";
import { playDialogueBlip, primeDialogueAudio } from "./dialogueSound";

export default function DialogueBox({
  line,
  onAdvance,
  hasNext = false,
  endLabel = "닫기",
  choices,
  onChoose,
  onCloseChoices,
}: {
  line: InterrogationDialogueLine;
  onAdvance: () => void;
  hasNext?: boolean;
  endLabel?: string;
  choices?: InterrogationConversationChoice[];
  onChoose?: (choice: InterrogationConversationChoice) => void;
  onCloseChoices?: () => void;
}) {
  const glyphs = useMemo(() => Array.from(line.text), [line.text]);
  const [visibleCount, setVisibleCount] = useState(0);
  const previousVisibleCount = useRef(0);
  const isComplete = visibleCount >= glyphs.length;
  const advanceLabel = hasNext ? "다음 →" : endLabel;

  useEffect(() => {
    primeDialogueAudio();
  }, []);

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

  useEffect(() => {
    const typedOneCharacter = visibleCount === previousVisibleCount.current + 1;
    previousVisibleCount.current = visibleCount;
    const character = glyphs[visibleCount - 1];
    if (
      typedOneCharacter &&
      (visibleCount - 1) % 3 === 0 &&
      character &&
      /[\p{L}\p{N}]/u.test(character)
    ) {
      playDialogueBlip(line.speaker, visibleCount);
    }
  }, [visibleCount, glyphs, line.speaker]);

  const advance = () => {
    primeDialogueAudio();
    if (isComplete) onAdvance();
    else setVisibleCount(glyphs.length);
  };

  useEffect(() => {
    if (choices) return;
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

  if (choices) {
    return (
      <Box
        sx={{
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: { xs: 12, md: 24 },
          width: "min(1000px, calc(100% - 24px))",
          maxHeight: "70dvh",
          display: "flex",
          overflow: "hidden",
          border: "1px solid rgba(237,211,164,.55)",
          borderRadius: 1,
          bgcolor: "rgba(9,15,14,.96)",
          boxShadow: "0 12px 36px rgba(0,0,0,.5)",
          color: "#fff9ec",
          zIndex: 50,
        }}
      >
        {line.portrait && (
          <Box component="img" src={line.portrait} alt="" sx={{ width: { xs: 96, sm: 126, md: 180 }, objectFit: "cover", objectPosition: "center 25%", flexShrink: 0, borderRight: "1px solid rgba(237,211,164,.35)" }} />
        )}
        <Box sx={{ flex: 1, minWidth: 0, overflowY: "auto", px: { xs: 2, md: 3 }, py: 2 }}>
          <Typography sx={{ color: "#d9b77d", fontSize: { xs: 13, md: 15 }, fontWeight: 800, mb: 1 }}>무엇을 물어볼까?</Typography>
          <Box sx={{ display: "grid", gap: .75 }}>
            {choices.map((choice) => (
              <Box
                component="button"
                type="button"
                key={choice.id}
                onClick={() => onChoose?.(choice)}
                sx={{ width: "100%", px: 1.5, py: 1.25, border: "1px solid rgba(237,211,164,.3)", borderRadius: .5, bgcolor: "rgba(255,255,255,.04)", color: "#fff9ec", textAlign: "left", font: "inherit", fontSize: { xs: 13, md: 15 }, cursor: "pointer", "&:hover, &:focus-visible": { bgcolor: "rgba(163,106,53,.3)", borderColor: "#d9b77d" } }}
              >
                {choice.question}
              </Box>
            ))}
            <Box component="button" type="button" onClick={onCloseChoices} sx={{ alignSelf: "end", px: 1.5, py: 1, border: 0, bgcolor: "transparent", color: "#d9b77d", font: "inherit", cursor: "pointer" }}>대화 끝내기</Box>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      component="button"
      type="button"
      data-no-select-sfx
      autoFocus
      onClick={advance}
      aria-label={`${line.speaker ? `${line.speaker}: ` : ""}${line.text}. ${isComplete ? advanceLabel : "전체 대사 표시"}`}
      sx={{
        appearance: "none",
        position: "fixed",
        left: "50%",
        transform: "translateX(-50%)",
        bottom: { xs: 12, md: 24 },
        width: "min(1000px, calc(100% - 24px))",
        minHeight: line.portrait ? { xs: 160, md: 210 } : 112,
        maxHeight: "55dvh",
        border: "1px solid rgba(237,211,164,.55)",
        borderRadius: 1,
        bgcolor: "rgba(9,15,14,.96)",
        boxShadow: "0 12px 36px rgba(0,0,0,.5)",
        color: "#fff9ec",
        textAlign: "left",
        cursor: "pointer",
        p: 0,
        display: "flex",
        alignItems: "stretch",
        overflowY: "auto",
        zIndex: 50,
        "&:focus-visible": {
          outline: "2px solid #f7d492",
          outlineOffset: 2,
        },
      }}
    >
      {line.portrait && (
        <Box
          component="img"
          src={line.portrait}
          alt=""
          sx={{
            width: { xs: 96, sm: 126, md: 180 },
            minHeight: { xs: 160, md: 210 },
            objectFit: "cover",
            objectPosition: "center 25%",
            flexShrink: 0,
            borderRight: "1px solid rgba(237,211,164,.35)",
          }}
        />
      )}
      <Box component="span" sx={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, px: { xs: 2, md: 3 }, py: { xs: 1.5, md: 2 } }}>
        <Typography component="span" sx={{ color: "#d9b77d", fontSize: { xs: 13, md: 15 }, fontWeight: 800, mb: 1 }}>
          {line.speaker || "기록"}
        </Typography>
        <Typography
          component="span"
          aria-hidden="true"
          sx={{
            flex: 1,
            fontSize: { xs: 15, md: 18 },
            lineHeight: 1.65,
            wordBreak: "keep-all",
            whiteSpace: "pre-wrap",
          }}
        >
          {glyphs.slice(0, visibleCount).join("")}
        </Typography>
        <Typography component="span" aria-hidden="true" sx={{ display: "block", textAlign: "right", fontSize: 11, color: "#d8bd89", mt: 1 }}>
          {isComplete ? advanceLabel : "전체 보기"}
        </Typography>
      </Box>
    </Box>
  );
}
