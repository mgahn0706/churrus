"use client";

import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { AddRounded, ArrowDownwardRounded, ArrowUpwardRounded, DeleteOutlineRounded } from "@mui/icons-material";
import type { InterrogationDialogueLine, InterrogationScript } from "@/types";
import { scriptLines } from "@/features/interrogation/adminContent";

export default function ScriptEditor({
  label,
  value,
  onChange,
}: {
  label: string;
  value: InterrogationScript | InterrogationDialogueLine[] | undefined;
  onChange: (lines: InterrogationDialogueLine[]) => void;
}) {
  const lines = scriptLines(value);
  const edit = (index: number, patch: Partial<InterrogationDialogueLine>) =>
    onChange(lines.map((line, lineIndex) => lineIndex === index ? { ...line, ...patch } : line));
  const move = (index: number, offset: number) => {
    const next = [...lines];
    [next[index], next[index + offset]] = [next[index + offset], next[index]];
    onChange(next);
  };

  return (
    <Box sx={{ display: "grid", gap: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
        <Typography sx={{ color: "#d9b77d", fontSize: 13, fontWeight: 800 }}>{label}</Typography>
        <Button size="small" startIcon={<AddRounded />} onClick={() => onChange([...lines, { text: "" }])}>대사 추가</Button>
      </Box>
      {lines.map((line, index) => (
        <Box key={index} sx={{ display: "grid", gridTemplateColumns: { xs: "1fr auto", sm: "130px 1fr auto" }, gap: 1, p: 1, bgcolor: "rgba(255,255,255,.035)", border: "1px solid rgba(231,201,148,.18)", borderRadius: 1 }}>
          <TextField size="small" label="화자" placeholder="기본 화자" value={line.speaker ?? ""} onChange={(event) => edit(index, { speaker: event.target.value || undefined })} sx={{ gridColumn: { xs: "1 / -1", sm: "auto" } }} />
          <TextField size="small" label={`대사 ${index + 1}`} value={line.text} onChange={(event) => edit(index, { text: event.target.value })} multiline minRows={2} sx={{ minWidth: 0 }} />
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center" }}>
            <IconButton size="small" aria-label="위로" disabled={index === 0} onClick={() => move(index, -1)}><ArrowUpwardRounded fontSize="small" /></IconButton>
            <IconButton size="small" aria-label="아래로" disabled={index === lines.length - 1} onClick={() => move(index, 1)}><ArrowDownwardRounded fontSize="small" /></IconButton>
            <IconButton size="small" aria-label="대사 삭제" onClick={() => onChange(lines.filter((_, lineIndex) => lineIndex !== index))}><DeleteOutlineRounded fontSize="small" /></IconButton>
          </Box>
          <TextField size="small" label="프로필 이미지 경로 (선택)" value={line.portrait ?? ""} onChange={(event) => edit(index, { portrait: event.target.value || undefined })} sx={{ gridColumn: "1 / -1" }} />
        </Box>
      ))}
      {lines.length === 0 && <Typography sx={{ color: "#9b927f", fontSize: 12 }}>대사 없음</Typography>}
    </Box>
  );
}
