"use client";

import { psychicSuspects } from "@/fixtures/psychic/suspects";
import type { DetectiveNoteType } from "@/types";
import { Box, Button, MenuItem, Stack, TextField, ThemeProvider } from "@mui/material";
import { createScenarioTheme } from "@/components/createScenarioTheme";
import { interrogationStorageKey } from "@/features/interrogation/engine";
import { useRouter } from "next/navigation";
import { useState } from "react";

const theme = createScenarioTheme("#422006", "dark");

export default function PsychicSubmit() {
  const router = useRouter();
  const [accusedSuspect, setAccusedSuspect] = useState("");
  const [howDunnit, setHowDunnit] = useState("");
  const [whyDunnit, setWhyDunnit] = useState("");

  const submit = () => {
    const note: DetectiveNoteType = {
      accusedSuspect,
      howDunnit: howDunnit.trim(),
      whyDunnit: whyDunnit.trim(),
      additionalQuestionAnswers: [],
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
          <Button sx={{ color: "#e9c997", mb: 4 }} onClick={() => router.push("/scenarios/scenario/psychic")}>
            ← 심문
          </Button>
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
            <Button type="submit" variant="contained" size="large" disabled={!accusedSuspect || !howDunnit.trim() || !whyDunnit.trim()} sx={{ py: 1.5, fontWeight: 800, bgcolor: "#a36a35", "&:hover": { bgcolor: "#bd874e" } }}>
              답변 제출하고 결과 보기 →
            </Button>
          </Stack>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
