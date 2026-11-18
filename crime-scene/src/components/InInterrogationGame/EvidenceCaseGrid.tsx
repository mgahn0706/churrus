"use client";

import { Box, Button, Typography } from "@mui/material";
import { memo, useMemo } from "react";
import type { InterrogationEvidence, InterrogationScenarioType } from "@/types";

const cardSx = {
  color: "#f3dfbb",
  border: "1px solid rgba(231,201,148,.35)",
  bgcolor: "rgba(15,24,21,.9)",
  borderRadius: .5,
  "&:hover": { bgcolor: "rgba(98,64,34,.8)", borderColor: "#f1d19a" },
  "&:focus-visible": { outline: "2px solid #ffdc9a", outlineOffset: 2 },
} as const;

export default memo(function EvidenceCaseGrid({
  scenario,
  evidence,
  onFocusEvidence,
  onFocusPerson,
}: {
  scenario: InterrogationScenarioType;
  evidence: (InterrogationEvidence & { instanceId: string })[];
  onFocusEvidence: (id: string) => void;
  onFocusPerson: (name: string) => void;
}) {
  const newestFirst = useMemo(() => [...evidence].reverse(), [evidence]);
  const people = useMemo(
    () => [...scenario.suspects, ...scenario.victims, ...(scenario.people ?? [])],
    [scenario.suspects, scenario.victims, scenario.people],
  );

  return (
    <Box sx={{ display: "grid", gap: 1.5 }}>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", sm: "repeat(4, minmax(0, 1fr))" }, gap: .5 }}>
        {people.map((person) => (
          <Button key={person.name} onClick={() => onFocusPerson(person.name)} aria-label={`${person.name} 정보 보기`} sx={{ ...cardSx, minWidth: 0, minHeight: 74, p: .5, display: "flex", flexDirection: "column", gap: .25 }}>
            {person.image && <Box component="img" src={person.image} alt="" loading="lazy" decoding="async" sx={{ width: 40, height: 40, objectFit: "cover", borderRadius: .5 }} />}
            <Typography component="span" sx={{ fontSize: 11, fontWeight: 800, whiteSpace: "nowrap" }}>{person.name}</Typography>
          </Button>
        ))}
      </Box>
      <Box sx={{ borderTop: "1px solid rgba(231,201,148,.18)" }} />
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))", gap: .75 }}>
        {newestFirst.map((item) => {
          const acquiredPhase = scenario.phases.find((phase) => item.instanceId.startsWith(`${phase.id}::`));
          return (
            <Button key={item.instanceId} onClick={() => onFocusEvidence(item.instanceId)} sx={{ ...cardSx, minWidth: 0, minHeight: { xs: 76, md: 92 }, px: 1.25, py: 1, display: "flex", flexDirection: "column", alignItems: "stretch", justifyContent: "space-between", gap: .75 }}>
              {item.image && <Box component="img" src={item.image} alt="" loading="lazy" decoding="async" sx={{ width: "100%", height: 56, objectFit: "cover", bgcolor: "#070c0b" }} />}
              <Typography component="span" sx={{ width: "100%", fontSize: { xs: 11, md: 12 }, lineHeight: 1.45, fontWeight: 800, textAlign: "left", whiteSpace: "normal", wordBreak: "keep-all", overflowWrap: "anywhere" }}>{item.title}</Typography>
              <Typography component="span" sx={{ width: "100%", fontSize: 9, color: "#b99c75", textAlign: "left" }}>{acquiredPhase?.timeLabel}</Typography>
            </Button>
          );
        })}
      </Box>
    </Box>
  );
});
