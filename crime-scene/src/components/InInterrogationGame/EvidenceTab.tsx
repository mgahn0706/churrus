"use client";

import { Box, Button, Typography } from "@mui/material";
import { memo, useCallback, useRef, useState } from "react";
import type { InterrogationEvidence, InterrogationScenarioType } from "@/types";
import EvidenceCaseGrid from "./EvidenceCaseGrid";

export default memo(function EvidenceTab({
  scenario,
  evidence,
}: {
  scenario: InterrogationScenarioType;
  evidence: (InterrogationEvidence & { instanceId: string })[];
}) {
  const [focusedEvidenceId, setFocusedEvidenceId] = useState("");
  const [focusedPersonName, setFocusedPersonName] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const listScrollTop = useRef(0);
  const focusedEvidence = evidence.find((item) => item.instanceId === focusedEvidenceId);
  const people = [...scenario.suspects, ...scenario.victims];
  const focusedPerson = people.find((item) => item.name === focusedPersonName);

  const focusEvidence = useCallback((id: string) => {
    listScrollTop.current = scrollRef.current?.scrollTop ?? 0;
    setFocusedEvidenceId(id);
    scrollRef.current?.scrollTo(0, 0);
  }, []);
  const focusPerson = useCallback((name: string) => {
    listScrollTop.current = scrollRef.current?.scrollTop ?? 0;
    setFocusedPersonName(name);
    scrollRef.current?.scrollTo(0, 0);
  }, []);
  const backToList = () => {
    setFocusedEvidenceId("");
    setFocusedPersonName("");
    window.requestAnimationFrame(() => scrollRef.current?.scrollTo(0, listScrollTop.current));
  };

  return (
    <Box
      ref={scrollRef}
      sx={{
        position: "absolute",
        top: { xs: 62, md: 72 },
        bottom: { xs: "calc(82px + env(safe-area-inset-bottom))", md: 96 },
        left: 0,
        right: 0,
        width: "min(100%, 1000px)",
        mx: "auto",
        px: { xs: 1.5, md: 3 },
        py: { xs: 1, md: 1.5 },
        overflowX: "hidden",
        overflowY: "auto",
        overscrollBehavior: "contain",
        touchAction: "pan-y",
        WebkitOverflowScrolling: "touch",
        scrollbarGutter: "stable",
        scrollbarWidth: "thin",
        scrollbarColor: "#8a704d transparent",
        "&::-webkit-scrollbar": { width: 7 },
        "&::-webkit-scrollbar-thumb": { bgcolor: "#8a704d", borderRadius: 4 },
      }}
    >
      {(focusedEvidence || focusedPerson) && (
        <Box>
          <Button onClick={backToList} sx={{ color: "#d9b77d", mb: 2 }}>← 목록</Button>
          {focusedEvidence ? (
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: focusedEvidence.image ? "minmax(0, 1.2fr) minmax(260px, .8fr)" : "1fr" }, gap: 3, alignItems: "start" }}>
              {focusedEvidence.image && <Box component="img" src={focusedEvidence.image} alt={focusedEvidence.title} decoding="async" sx={{ width: "100%", maxHeight: "60dvh", objectFit: "contain", bgcolor: "#070c0b", border: "1px solid rgba(231,201,148,.18)" }} />}
              <Box>
                <Typography sx={{ color: "#b99c75", fontSize: 12, mb: 1 }}>{scenario.phases.find((phase) => focusedEvidence.instanceId.startsWith(`${phase.id}::`))?.timeLabel}</Typography>
                <Typography sx={{ fontSize: { xs: 20, md: 26 }, fontWeight: 800, mb: 2 }}>{focusedEvidence.title}</Typography>
                <Typography sx={{ fontSize: { xs: 15, md: 17 }, lineHeight: 1.7, whiteSpace: "pre-wrap", wordBreak: "keep-all" }}>{focusedEvidence.description}</Typography>
              </Box>
            </Box>
          ) : focusedPerson && (
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) minmax(260px, .8fr)" }, gap: 3, alignItems: "start" }}>
              {focusedPerson.image && <Box component="img" src={focusedPerson.image} alt={focusedPerson.name} decoding="async" sx={{ width: "100%", maxHeight: "60dvh", objectFit: "contain", bgcolor: "#070c0b" }} />}
              <Box>
                <Typography sx={{ fontSize: { xs: 20, md: 26 }, fontWeight: 800, mb: 2 }}>{focusedPerson.name}</Typography>
                <Typography sx={{ fontSize: { xs: 15, md: 17 }, lineHeight: 1.7, whiteSpace: "pre-wrap", wordBreak: "keep-all" }}>{focusedPerson.description}</Typography>
              </Box>
            </Box>
          )}
        </Box>
      )}
      <Box sx={{ display: focusedEvidence || focusedPerson ? "none" : "block" }}>
        <EvidenceCaseGrid scenario={scenario} evidence={evidence} onFocusEvidence={focusEvidence} onFocusPerson={focusPerson} />
      </Box>
    </Box>
  );
});
