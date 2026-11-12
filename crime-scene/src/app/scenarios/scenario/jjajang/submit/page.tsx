"use client";

import { psychicSuspects } from "@/fixtures/jjajang/suspects";
import type { DetectiveNoteType } from "@/types";
import { Box, Button, MenuItem, Stack, TextField, ThemeProvider, Typography } from "@mui/material";
import { createScenarioTheme } from "@/components/createScenarioTheme";
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
    localStorage.setItem("jjajang", JSON.stringify(note));
    router.push("/scenarios/scenario/jjajang/answer");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", bgcolor: "black", color: "white", display: "grid", placeItems: "center", p: 3 }}>
        <Stack spacing={3} sx={{ width: "100%", maxWidth: 520 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>초능력자 살인사건 · 추리 제출</Typography>
          <TextField select label="범인은 누구인가요?" value={accusedSuspect} onChange={(event) => setAccusedSuspect(event.target.value)} required>
            {psychicSuspects.map((suspect) => <MenuItem key={suspect.name} value={suspect.name}>{suspect.name}</MenuItem>)}
          </TextField>
          <TextField label="어떻게 사건이 벌어졌나요?" value={howDunnit} onChange={(event) => setHowDunnit(event.target.value)} multiline minRows={3} required />
          <TextField label="동기는 무엇인가요?" value={whyDunnit} onChange={(event) => setWhyDunnit(event.target.value)} multiline minRows={3} required />
          <Button variant="contained" disabled={!accusedSuspect || !howDunnit.trim() || !whyDunnit.trim()} onClick={submit}>추리 제출</Button>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
