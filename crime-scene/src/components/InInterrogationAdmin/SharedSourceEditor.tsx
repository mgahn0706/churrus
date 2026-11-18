"use client";

import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { ExpandMoreRounded } from "@mui/icons-material";
import type { InterrogationPhase } from "@/types";
import { sharedSourceAtPhase, type SharedSource, type SharedSourceState } from "@/features/interrogation/sharedSources";
import EvidenceEditor from "./EvidenceEditor";

export default function SharedSourceEditor({ source, phases, onChange, onDelete }: {
  source: SharedSource;
  phases: InterrogationPhase[];
  onChange: (source: SharedSource) => void;
  onDelete: () => void;
}) {
  const availablePhases = phases.filter((phase) => !phase.finalInterrogation);
  const firstVisible = availablePhases.find((phase) => source.visiblePhaseIds.includes(phase.id))?.id;
  const update = (edit: (next: SharedSource) => void) => {
    const next = structuredClone(source);
    edit(next);
    onChange(next);
  };
  const editState = (phaseId: string | null, edit: (state: SharedSourceState) => void) => update((next) => {
    const state = phaseId ? next.changes[phaseId] : next.base;
    if (state) edit(state);
  });

  return (
    <Accordion disableGutters sx={{ bgcolor: "#121d19", color: "#f8edda" }}>
      <AccordionSummary expandIcon={<ExpandMoreRounded sx={{ color: "#d9b77d" }} />}>
        <Typography sx={{ fontSize: 13 }}>{source.base.evidence.title || source.base.title || "새 단서"} · 표시 {source.visiblePhaseIds.length}개 페이즈 · 변경 {Object.keys(source.changes).length}회</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ display: "grid", gap: 2 }}>
        <Box sx={{ display: "grid", gap: .5 }}>
          <Typography sx={{ color: "#d9b77d", fontSize: 13, fontWeight: 800 }}>표시할 페이즈</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: .5 }}>
            {availablePhases.map((phase) => (
              <FormControlLabel key={phase.id} control={<Checkbox size="small" checked={source.visiblePhaseIds.includes(phase.id)} onChange={(event) => update((next) => {
                next.visiblePhaseIds = event.target.checked
                  ? [...next.visiblePhaseIds, phase.id]
                  : next.visiblePhaseIds.filter((id) => id !== phase.id);
                if (!event.target.checked) delete next.changes[phase.id];
              })} />} label={phase.timeLabel || phase.title} sx={{ mr: 1, "& .MuiFormControlLabel-label": { fontSize: 12 } }} />
            ))}
          </Box>
        </Box>

        <Box sx={{ display: "grid", gap: 1.5, p: 1.5, border: "1px solid rgba(231,201,148,.2)" }}>
          <Typography sx={{ color: "#d9b77d", fontSize: 13, fontWeight: 800 }}>기본 내용</Typography>
          <TextField size="small" label="지도에 보이는 이름" value={source.base.title} onChange={(event) => editState(null, (state) => { state.title = event.target.value; })} />
          <EvidenceEditor showId={false} value={source.base.evidence} onChange={(value) => editState(null, (state) => { state.evidence = { ...value, id: source.id }; })} />
        </Box>

        <Box sx={{ display: "grid", gap: .5 }}>
          <Typography sx={{ color: "#d9b77d", fontSize: 13, fontWeight: 800 }}>내용이 변경될 페이즈</Typography>
          <Typography sx={{ color: "#b8ac98", fontSize: 12 }}>선택한 페이즈부터 새 내용이 적용됩니다. 다음 변경 페이즈를 선택하기 전까지 유지됩니다.</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: .5 }}>
            {availablePhases.filter((phase) => source.visiblePhaseIds.includes(phase.id) && phase.id !== firstVisible).map((phase) => (
              <FormControlLabel key={phase.id} control={<Checkbox size="small" checked={Boolean(source.changes[phase.id])} onChange={(event) => update((next) => {
                if (event.target.checked) next.changes[phase.id] = structuredClone(sharedSourceAtPhase(next, phases, phase.id));
                else delete next.changes[phase.id];
              })} />} label={phase.timeLabel || phase.title} sx={{ mr: 1, "& .MuiFormControlLabel-label": { fontSize: 12 } }} />
            ))}
          </Box>
        </Box>

        {availablePhases.filter((phase) => source.changes[phase.id] && source.visiblePhaseIds.includes(phase.id)).map((phase) => (
          <Box key={phase.id} sx={{ display: "grid", gap: 1.5, p: 1.5, border: "1px solid rgba(231,201,148,.2)" }}>
            <Typography sx={{ color: "#d9b77d", fontSize: 13, fontWeight: 800 }}>{phase.timeLabel || phase.title}부터 바뀐 내용</Typography>
            <TextField size="small" label="지도에 보이는 이름" value={source.changes[phase.id].title} onChange={(event) => editState(phase.id, (state) => { state.title = event.target.value; })} />
            <EvidenceEditor showId={false} value={source.changes[phase.id].evidence} onChange={(value) => editState(phase.id, (state) => { state.evidence = { ...value, id: source.id }; })} />
          </Box>
        ))}
        <Button color="error" size="small" sx={{ justifySelf: "end" }} onClick={onDelete}>단서 삭제</Button>
      </AccordionDetails>
    </Accordion>
  );
}
