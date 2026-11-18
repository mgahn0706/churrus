"use client";

import { psychicSuspects } from "@/fixtures/psychic/suspects";
import { psychicIdentityAnswers } from "@/fixtures/psychic/additionalQuestions";
import type { DetectiveNoteType } from "@/types";
import { Box, Button, IconButton, MenuItem, Stack, TextField, ThemeProvider } from "@mui/material";
import { VolumeOffRounded, VolumeUpRounded } from "@mui/icons-material";
import { createScenarioTheme } from "@/components/createScenarioTheme";
import { interrogationStorageKey } from "@/features/interrogation/engine";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const theme = createScenarioTheme("#422006", "dark", "Galmuri11, sans-serif");

export default function PsychicSubmit() {
  const router = useRouter();
  const [accusedSuspect, setAccusedSuspect] = useState("");
  const [howDunnit, setHowDunnit] = useState("");
  const [whyDunnit, setWhyDunnit] = useState("");
  const [additionalAnswers, setAdditionalAnswers] = useState<string[]>(
    () => Array(psychicIdentityAnswers.length * 2).fill(""),
  );
  const [bgmPlaying, setBgmPlaying] = useState(false);
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const removeBgmRetryRef = useRef<(() => void) | null>(null);
  const bgmToggledRef = useRef(false);

  useEffect(() => {
    const audio = bgmRef.current;
    if (!audio) return;
    let active = true;
    let retryPending = false;
    const removeRetry = () => {
      document.removeEventListener("pointerdown", retryOnInteraction);
      document.removeEventListener("keydown", retryOnInteraction);
      removeBgmRetryRef.current = null;
    };
    const retryOnInteraction = (event: Event) => {
      if (event.target instanceof Element && event.target.closest("[data-bgm-toggle]")) return;
      if (!audio.paused) {
        removeRetry();
        return;
      }
      if (retryPending) return;
      retryPending = true;
      audio.currentTime = 0;
      void audio.play().then(() => {
        if (active) setBgmPlaying(true);
        removeRetry();
      }).catch(() => { retryPending = false; });
    };
    audio.volume = 0.35;
    audio.currentTime = 0;
    void audio.play().then(() => {
      if (active && !bgmToggledRef.current) setBgmPlaying(true);
    }).catch(() => {
      if (!active || bgmToggledRef.current) return;
      setBgmPlaying(false);
      document.addEventListener("pointerdown", retryOnInteraction);
      document.addEventListener("keydown", retryOnInteraction);
      removeBgmRetryRef.current = removeRetry;
    });
    return () => {
      active = false;
      removeRetry();
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const toggleBgm = () => {
    const audio = bgmRef.current;
    if (!audio) return;
    bgmToggledRef.current = true;
    removeBgmRetryRef.current?.();
    if (audio.paused) {
      audio.currentTime = 0;
      void audio.play().then(() => setBgmPlaying(true)).catch(() => setBgmPlaying(false));
    } else {
      audio.pause();
      audio.currentTime = 0;
      setBgmPlaying(false);
    }
  };

  const updateAdditionalAnswer = (index: number, value: string) => {
    setAdditionalAnswers((previous) => previous.map((answer, answerIndex) =>
      answerIndex === index ? value : answer,
    ));
  };

  const submit = () => {
    const note: DetectiveNoteType = {
      accusedSuspect,
      howDunnit: howDunnit.trim(),
      whyDunnit: whyDunnit.trim(),
      additionalQuestionAnswers: additionalAnswers.map((answer) => answer.trim()),
      memo: "",
    };
    localStorage.setItem("psychic", JSON.stringify(note));
    localStorage.removeItem(interrogationStorageKey("psychic"));
    router.push("/scenarios/scenario/psychic/answer");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100dvh", bgcolor: "#080d0c", color: "#f8edda", px: { xs: 2, sm: 3 }, py: { xs: 4, md: 7 } }}>
        <Box sx={{ maxWidth: 560, mx: "auto" }}>
          <audio ref={bgmRef} src="/music/psychic-submit.mp3" loop preload="auto" />
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
            <Button sx={{ color: "#e9c997" }} onClick={() => router.push("/scenarios/scenario/psychic")}>← 심문</Button>
            <IconButton data-bgm-toggle onClick={toggleBgm} aria-label={bgmPlaying ? "배경음악 끄기" : "배경음악 켜기"} aria-pressed={bgmPlaying} sx={{ color: "#e9c997" }}>
              {bgmPlaying ? <VolumeUpRounded /> : <VolumeOffRounded />}
            </IconButton>
          </Box>
          <Stack
            component="form"
            spacing={3}
            onSubmit={(event) => {
              event.preventDefault();
              submit();
            }}
            sx={{ width: "100%" }}
          >
            <TextField
              select
              label="1. 범인은 누구인가요?"
              value={accusedSuspect}
              onChange={(event) => setAccusedSuspect(event.target.value)}
              required
              fullWidth
            >
              {psychicSuspects.map((suspect) => <MenuItem key={suspect.name} value={suspect.name}>{suspect.name}</MenuItem>)}
            </TextField>
            <TextField
              label="2. 사건은 어떻게 벌어졌나요?"
              value={howDunnit}
              onChange={(event) => setHowDunnit(event.target.value)}
              multiline
              minRows={3}
              required
              fullWidth
            />
            <TextField
              label="3. 동기는 무엇인가요?"
              value={whyDunnit}
              onChange={(event) => setWhyDunnit(event.target.value)}
              multiline
              minRows={3}
              required
              fullWidth
            />
            {psychicIdentityAnswers.map(({ subject }, personIndex) => (
              <Box key={subject} sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 1.5 }}>
                <TextField
                  label={`${subject}의 초능력은?`}
                  value={additionalAnswers[personIndex * 2]}
                  onChange={(event) => updateAdditionalAnswer(personIndex * 2, event.target.value)}
                  fullWidth
                />
                <TextField
                  label={`${subject}의 본명은?`}
                  value={additionalAnswers[personIndex * 2 + 1]}
                  onChange={(event) => updateAdditionalAnswer(personIndex * 2 + 1, event.target.value)}
                  fullWidth
                />
              </Box>
            ))}
            <Button type="submit" variant="contained" size="large" disabled={!accusedSuspect || !howDunnit.trim() || !whyDunnit.trim()} sx={{ py: 1.5, fontWeight: 800, bgcolor: "#a36a35", "&:hover": { bgcolor: "#bd874e" } }}>
              답변 제출하고 결과 보기 →
            </Button>
          </Stack>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
