"use client";

import { Box, Button, Typography } from "@mui/material";
import { memo, useMemo } from "react";
import type { InterrogationEvidence } from "@/types";

type CollectedEvidence = InterrogationEvidence & { instanceId: string };

const EvidenceSelectionCard = memo(function EvidenceSelectionCard({
  item,
  selected,
  onToggle,
}: {
  item: CollectedEvidence;
  selected: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <Button
      aria-pressed={selected}
      aria-label={`${item.title} ${selected ? "선택 해제" : "선택"}`}
      onClick={() => onToggle(item.instanceId)}
      sx={{
        color: "#f3dfbb",
        border: "1px solid rgba(231,201,148,.55)",
        borderRadius: .5,
        fontWeight: 800,
        position: "relative",
        minWidth: 0,
        minHeight: { xs: 72, md: 88 },
        px: 1.25,
        py: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "flex-start",
        gap: .75,
        bgcolor: selected ? "#624022" : "rgba(20,31,27,.9)",
        "&:hover": { bgcolor: selected ? "#815329" : "rgba(167,112,55,.4)", borderColor: "#f1d19a" },
        "&:focus-visible": { outline: "2px solid #ffdc9a", outlineOffset: 2 },
      }}
    >
      {item.image && <Box component="img" src={item.image} alt="" loading="lazy" decoding="async" sx={{ width: "100%", height: 56, objectFit: "cover", bgcolor: "#070c0b" }} />}
      <Typography component="span" sx={{ width: "100%", pr: 1.5, fontSize: { xs: 11, md: 12 }, lineHeight: 1.45, textAlign: "left", whiteSpace: "normal", wordBreak: "keep-all", overflowWrap: "anywhere" }}>{item.title}</Typography>
      <Typography component="span" sx={{ position: "absolute", top: 7, right: 9, color: "#f1d19a", fontSize: 12 }}>{selected ? "✓" : "+"}</Typography>
    </Button>
  );
});

export default memo(function EvidenceSelectionGrid({
  evidence,
  selectedIds,
  onToggle,
}: {
  evidence: CollectedEvidence[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}) {
  const newestFirst = useMemo(() => [...evidence].reverse(), [evidence]);
  const selected = useMemo(() => new Set(selectedIds), [selectedIds]);

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))", gridAutoRows: "max-content", gap: .75, alignContent: "start" }}>
      {newestFirst.map((item) => (
        <EvidenceSelectionCard key={item.instanceId} item={item} selected={selected.has(item.instanceId)} onToggle={onToggle} />
      ))}
      {evidence.length === 0 && <Typography sx={{ p: 1, fontSize: 12, color: "#b99c75" }}>단서 없음</Typography>}
    </Box>
  );
});
