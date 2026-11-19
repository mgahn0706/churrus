"use client";

import { Box, Checkbox, Chip, TextField, Typography } from "@mui/material";
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
      <Typography sx={{ color: "#d9b77d", fontSize: 13, fontWeight: 800 }}>제시할 단서 · {selectedIds.length}/{MAX_INTERROGATION_CLUES}</Typography>
      <Typography sx={{ color: "#b8ac98", fontSize: 12 }}>단서 1~{MAX_INTERROGATION_CLUES}개를 선택하세요. 번호와 시간은 단서 번호와 획득 페이즈입니다.</Typography>
      {selectedIds.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: .75 }}>
          {selectedIds.map((id) => (
            <Chip key={id} size="small" label={optionLabels.get(id) ?? `찾을 수 없는 단서: ${id}`} onDelete={() => toggle(id)} sx={{ maxWidth: "100%" }} />
          ))}
        </Box>
      )}
      <TextField size="small" label="단서 찾기" placeholder="단서 이름이나 내용" value={search} onChange={(event) => setSearch(event.target.value)} />
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(3, minmax(0, 1fr))" }, gap: .75, maxHeight: 300, overflowY: "auto", p: .75, border: "1px solid rgba(231,201,148,.22)", borderRadius: 1, alignContent: "start" }}>
        {filteredOptions.map((option) => (
          <Box
            component="label"
            key={option.id}
            sx={{ display: "flex", alignItems: "flex-start", minWidth: 0, p: .75, border: "1px solid", borderColor: selectedIds.includes(option.id) ? "#bd874e" : "rgba(231,201,148,.16)", borderRadius: 1, bgcolor: selectedIds.includes(option.id) ? "rgba(189,135,78,.15)" : "rgba(255,255,255,.025)", cursor: "pointer", "&:hover": { bgcolor: "rgba(231,201,148,.09)" } }}
          >
            <Checkbox checked={selectedIds.includes(option.id)} disabled={!selectedIds.includes(option.id) && selectedIds.length >= MAX_INTERROGATION_CLUES} onChange={() => toggle(option.id)} size="small" sx={{ p: .25, mr: .5 }} />
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontSize: 12, fontWeight: 700 }}>{option.label}</Typography>
              {option.description && <Typography sx={{ color: "#b8ac98", fontSize: 11, overflowWrap: "anywhere", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }} title={option.description}>{option.description}</Typography>}
            </Box>
          </Box>
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
