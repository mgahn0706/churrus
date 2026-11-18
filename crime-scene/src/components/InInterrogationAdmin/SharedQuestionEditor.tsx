"use client";

import { ExpandMoreRounded } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import type { InterrogationEvidence, InterrogationPhase } from "@/types";
import { sharedQuestionAtPhase, type SharedQuestion, type SharedQuestionState } from "@/features/interrogation/sharedQuestions";
import EvidenceCombinationPicker from "./EvidenceCombinationPicker";
import EvidenceEditor from "./EvidenceEditor";
import ScriptEditor from "./ScriptEditor";

type ClueOption = { id: string; label: string; description: string };

export default function SharedQuestionEditor({ question, phases, options, expanded, onExpandedChange, onChange, onDelete, createEvidence }: {
  question: SharedQuestion;
  phases: InterrogationPhase[];
  options: ClueOption[];
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
  onChange: (question: SharedQuestion) => void;
  onDelete: () => void;
  createEvidence: () => InterrogationEvidence;
}) {
  const availablePhases = phases.filter((phase) => phase.interrogations.some((item) => item.suspectName === question.suspectName));
  const firstVisible = availablePhases.find((phase) => question.visiblePhaseIds.includes(phase.id))?.id;
  const labels = new Map(options.map((option) => [option.id, option.label]));
  const update = (edit: (next: SharedQuestion) => void) => {
    const next = structuredClone(question);
    edit(next);
    onChange(next);
  };
  const editState = (phaseId: string | null, edit: (state: SharedQuestionState) => void) => update((next) => {
    const state = phaseId ? next.changes[phaseId] : next.base;
    if (state) edit(state);
  });
  const stateFields = (state: SharedQuestionState, phaseId: string | null) => (
    <Box sx={{ display: "grid", gap: 1.5 }}>
      <TextField size="small" label="플레이어 질문" value={state.prompt} onChange={(event) => editState(phaseId, (next) => { next.prompt = event.target.value; })} multiline minRows={2} />
      <ScriptEditor label="신문 답변" value={state.answer} defaultSpeaker={question.suspectName} onChange={(lines) => editState(phaseId, (next) => { next.answer = lines; })} />
      <FormControlLabel control={<Checkbox checked={Boolean(state.revealedEvidence)} onChange={(event) => editState(phaseId, (next) => { next.revealedEvidence = event.target.checked ? createEvidence() : undefined; })} />} label="답변 후 새 단서 획득" />
      {state.revealedEvidence && <EvidenceEditor value={state.revealedEvidence} onChange={(value) => editState(phaseId, (next) => { next.revealedEvidence = value; })} />}
    </Box>
  );

  return (
    <Accordion disableGutters expanded={expanded} onChange={(_, isExpanded) => onExpandedChange(isExpanded)} sx={{ bgcolor: "#121d19", color: "#f8edda" }}>
      <AccordionSummary expandIcon={<ExpandMoreRounded sx={{ color: "#d9b77d" }} />}>
        <Typography sx={{ fontSize: 13 }}>{question.clueIds.map((id) => labels.get(id) ?? id).join(" + ") || "단서 선택 필요"} → {question.base.prompt || "질문 없음"} · 표시 {question.visiblePhaseIds.length}개 페이즈</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ display: "grid", gap: 2 }}>
        <EvidenceCombinationPicker options={options} selectedIds={question.clueIds} onChange={(ids) => update((next) => { next.clueIds = ids; next.evidenceRefs = {}; })} />
        <Box sx={{ display: "grid", gap: .5 }}>
          <Typography sx={{ color: "#d9b77d", fontSize: 13, fontWeight: 800 }}>표시할 페이즈</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: .5 }}>
            {availablePhases.map((phase) => (
              <FormControlLabel key={phase.id} control={<Checkbox size="small" checked={question.visiblePhaseIds.includes(phase.id)} onChange={(event) => update((next) => {
                next.visiblePhaseIds = event.target.checked
                  ? [...next.visiblePhaseIds, phase.id]
                  : next.visiblePhaseIds.filter((id) => id !== phase.id);
                if (!event.target.checked) delete next.changes[phase.id];
              })} />} label={phase.timeLabel || phase.title} sx={{ mr: 1, "& .MuiFormControlLabel-label": { fontSize: 12 } }} />
            ))}
          </Box>
        </Box>
        <Box sx={{ display: "grid", gap: 1.5, p: 1.5, border: "1px solid rgba(231,201,148,.2)" }}>
          <Typography sx={{ color: "#d9b77d", fontSize: 13, fontWeight: 800 }}>기본 질문과 답변</Typography>
          {stateFields(question.base, null)}
        </Box>
        <Box sx={{ display: "grid", gap: .5 }}>
          <Typography sx={{ color: "#d9b77d", fontSize: 13, fontWeight: 800 }}>답변이 변경될 페이즈</Typography>
          <Typography sx={{ color: "#b8ac98", fontSize: 12 }}>선택한 페이즈부터 바뀐 대사가 적용됩니다.</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: .5 }}>
            {availablePhases.filter((phase) => question.visiblePhaseIds.includes(phase.id) && phase.id !== firstVisible).map((phase) => (
              <FormControlLabel key={phase.id} control={<Checkbox size="small" checked={Boolean(question.changes[phase.id])} onChange={(event) => update((next) => {
                if (event.target.checked) next.changes[phase.id] = structuredClone(sharedQuestionAtPhase(next, phases, phase.id));
                else delete next.changes[phase.id];
              })} />} label={phase.timeLabel || phase.title} sx={{ mr: 1, "& .MuiFormControlLabel-label": { fontSize: 12 } }} />
            ))}
          </Box>
        </Box>
        {availablePhases.filter((phase) => question.changes[phase.id] && question.visiblePhaseIds.includes(phase.id)).map((phase) => (
          <Box key={phase.id} sx={{ display: "grid", gap: 1.5, p: 1.5, border: "1px solid rgba(231,201,148,.2)" }}>
            <Typography sx={{ color: "#d9b77d", fontSize: 13, fontWeight: 800 }}>{phase.timeLabel || phase.title}부터 바뀐 답변</Typography>
            <ScriptEditor label="신문 답변" value={question.changes[phase.id].answer} defaultSpeaker={question.suspectName} onChange={(lines) => editState(phase.id, (next) => { next.answer = lines; })} />
          </Box>
        ))}
        <Button color="error" size="small" sx={{ justifySelf: "end" }} onClick={onDelete}>신문 삭제</Button>
      </AccordionDetails>
    </Accordion>
  );
}
