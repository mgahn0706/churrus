"use client";

import { Box, Checkbox, Chip, FormControlLabel, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { MAX_INTERROGATION_CLUES } from "@/features/interrogation/engine";

type EvidenceOption = { id: string; label: string; description: string };

export default function EvidenceCombinationPicker({
  options,
  selectedIds,
  onChange,
}: {
  options: EvidenceOption[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}) {
  const [search, setSearch] = useState("");
  const optionLabels = new Map(options.map((option) => [option.id, option.label]));
  const filteredOptions = options.filter((option) =>
    `${option.label} ${option.description}`.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase()));
  const toggle = (id: string) => {
    if (!selectedIds.includes(id) && selectedIds.length >= MAX_INTERROGATION_CLUES) return;
    onChange(selectedIds.includes(id)
      ? selectedIds.filter((selectedId) => selectedId !== id)
      : [...selectedIds, id]);
  };

  return (
    <Box sx={{ display: "grid", gap: 1 }}>
      <Typography sx={{ color: "#d9b77d", fontSize: 13, fontWeight: 800 }}>제시할 단서 조합 · {selectedIds.length}/{MAX_INTERROGATION_CLUES}</Typography>
      <Typography sx={{ color: "#b8ac98", fontSize: 12 }}>단서를 최대 {MAX_INTERROGATION_CLUES}개까지 선택하세요. 이름 앞의 번호와 시간은 공유 단서 번호와 획득 페이즈입니다.</Typography>
      {selectedIds.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: .75 }}>
          {selectedIds.map((id) => (
            <Chip key={id} size="small" label={optionLabels.get(id) ?? `찾을 수 없는 단서: ${id}`} onDelete={() => toggle(id)} sx={{ maxWidth: "100%" }} />
          ))}
        </Box>
      )}
      <TextField size="small" label="단서 찾기" placeholder="단서 이름이나 내용" value={search} onChange={(event) => setSearch(event.target.value)} />
      <Box sx={{ maxHeight: 260, overflowY: "auto", border: "1px solid rgba(231,201,148,.22)", borderRadius: 1 }}>
        {filteredOptions.map((option) => (
          <FormControlLabel
            key={option.id}
            control={<Checkbox checked={selectedIds.includes(option.id)} disabled={!selectedIds.includes(option.id) && selectedIds.length >= MAX_INTERROGATION_CLUES} onChange={() => toggle(option.id)} size="small" />}
            label={
              <Box sx={{ py: .5, minWidth: 0 }}>
                <Typography sx={{ fontSize: 12, fontWeight: 700 }}>{option.label}</Typography>
                {option.description && <Typography sx={{ color: "#b8ac98", fontSize: 11, overflowWrap: "anywhere" }}>{option.description}</Typography>}
              </Box>
            }
            sx={{ display: "flex", mx: 0, px: 1, borderBottom: "1px solid rgba(231,201,148,.12)", alignItems: "flex-start", "&:hover": { bgcolor: "rgba(231,201,148,.06)" } }}
          />
        ))}
        {filteredOptions.length === 0 && (
          <Typography sx={{ color: "#b8ac98", fontSize: 12, p: 1.5 }}>
            {options.length ? "일치하는 단서가 없습니다." : "먼저 조사 단서를 추가하세요."}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
