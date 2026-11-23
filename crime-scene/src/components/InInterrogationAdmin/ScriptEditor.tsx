"use client";

import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import OptimizedAvatar from "@/components/OptimizedAvatar";
import { AddRounded, ArrowDownwardRounded, ArrowUpwardRounded, DeleteOutlineRounded } from "@mui/icons-material";
import { useId } from "react";
import type { InterrogationDialogueLine, InterrogationScript } from "@/types";
import { scriptLines } from "@/features/interrogation/adminContent";
import { psychicSuspects, psychicVictim } from "@/fixtures/psychic/suspects";

const speakerOptions: { name: string; label: string; image?: string }[] = [
  { name: "나", label: "나" },
  ...psychicSuspects.map((person, index) => ({ name: person.name, image: person.image, label: ["A", "B", "C"][index] })),
  { name: psychicVictim.name, image: psychicVictim.image, label: "소장" },
];

export default function ScriptEditor({
  label,
  value,
  onChange,
  defaultSpeaker = "나",
  additionalSpeakers = [],
  fixedSpeaker,
  hideSpeaker = false,
}: {
  label: string;
  value: InterrogationScript | InterrogationDialogueLine[] | undefined;
  onChange: (lines: InterrogationDialogueLine[]) => void;
  defaultSpeaker?: string;
  additionalSpeakers?: { name: string; image?: string }[];
  fixedSpeaker?: string;
  hideSpeaker?: boolean;
}) {
  const speakerLabelId = useId();
  const availableSpeakers = [
    ...speakerOptions,
    ...additionalSpeakers.filter((person) => !speakerOptions.some((option) => option.name === person.name)).map((person) => ({ ...person, label: person.name })),
  ];
  const lines = scriptLines(value).map((line) => fixedSpeaker
    ? { text: line.text, speaker: fixedSpeaker }
    : hideSpeaker ? { text: line.text } : line);
  const emit = (next: InterrogationDialogueLine[]) => onChange(fixedSpeaker
    ? next.map((line) => ({ text: line.text, speaker: fixedSpeaker }))
    : hideSpeaker ? next.map((line) => ({ text: line.text })) : next);
  const edit = (index: number, patch: Partial<InterrogationDialogueLine>) =>
    emit(lines.map((line, lineIndex) => lineIndex === index ? { ...line, ...patch } : line));
  const move = (index: number, offset: number) => {
    const next = [...lines];
    [next[index], next[index + offset]] = [next[index + offset], next[index]];
    emit(next);
  };

  return (
    <Box sx={{ display: "grid", gap: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
        <Typography sx={{ color: "#d9b77d", fontSize: 13, fontWeight: 800 }}>{label}</Typography>
        <Button size="small" startIcon={<AddRounded />} onClick={() => emit([...lines, { speaker: fixedSpeaker ?? (hideSpeaker ? undefined : defaultSpeaker), text: "" }])}>대사 추가</Button>
      </Box>
      {lines.map((line, index) => (
        <Box key={index} sx={{ display: "grid", gridTemplateColumns: { xs: "1fr auto", sm: fixedSpeaker || hideSpeaker ? "1fr auto" : "130px 1fr auto" }, gap: 1, p: 1, bgcolor: "rgba(255,255,255,.035)", border: "1px solid rgba(231,201,148,.18)", borderRadius: 1 }}>
          {!fixedSpeaker && !hideSpeaker && <FormControl size="small" sx={{ gridColumn: { xs: "1 / -1", sm: "auto" }, minWidth: 0 }}>
            <InputLabel id={`${speakerLabelId}-${index}`}>화자</InputLabel>
            <Select
              labelId={`${speakerLabelId}-${index}`}
              label="화자"
              value={availableSpeakers.some((option) => option.name === line.speaker) ? line.speaker : defaultSpeaker}
              onChange={(event) => {
                const speaker = event.target.value;
                const selected = availableSpeakers.find((option) => option.name === speaker);
                edit(index, { speaker, portrait: selected?.image });
              }}
            >
              {availableSpeakers.map((option) => (
                <MenuItem key={option.name} value={option.name} sx={{ display: "flex", gap: 1 }}>
                  {option.image && <OptimizedAvatar imageSize={24} src={option.image} alt="" sx={{ width: 24, height: 24 }} />}
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>}
          <TextField size="small" label={`대사 ${index + 1}`} value={line.text} onChange={(event) => edit(index, { text: event.target.value })} multiline minRows={2} sx={{ minWidth: 0 }} />
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center" }}>
            <IconButton size="small" aria-label="위로" disabled={index === 0} onClick={() => move(index, -1)}><ArrowUpwardRounded fontSize="small" /></IconButton>
            <IconButton size="small" aria-label="아래로" disabled={index === lines.length - 1} onClick={() => move(index, 1)}><ArrowDownwardRounded fontSize="small" /></IconButton>
            <IconButton size="small" aria-label="대사 삭제" onClick={() => emit(lines.filter((_, lineIndex) => lineIndex !== index))}><DeleteOutlineRounded fontSize="small" /></IconButton>
          </Box>
        </Box>
      ))}
      {lines.length === 0 && <Typography sx={{ color: "#9b927f", fontSize: 12 }}>대사 없음</Typography>}
    </Box>
  );
}
