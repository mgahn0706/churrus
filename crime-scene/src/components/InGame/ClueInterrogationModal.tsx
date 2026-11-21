import type { ClueInterrogation, ClueType, SuspectType } from "@/types";
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

type Progress = Record<string, (string | null)[]>;
type Evidence = { referenceId: string; title: string; description: string; kind: "현장" | "신문" };

interface Props {
  isOpen: boolean;
  onClose: () => void;
  clues: ClueType[];
  checkedClueList: number[];
  suspects: SuspectType[];
  interrogations: ClueInterrogation[];
  scenarioId: string;
  onInterrogationComplete: (title: string) => void;
}

const progressKey = (scenarioId: string) => `${scenarioId}-clue-interrogations-v1`;

export default function ClueInterrogationModal({
  isOpen, onClose, clues, checkedClueList, suspects, interrogations, scenarioId, onInterrogationComplete,
}: Props) {
  const [tab, setTab] = useState<"clues" | "interrogations">("clues");
  const [suspectName, setSuspectName] = useState(suspects[0]?.name ?? "");
  const [selectedReferenceId, setSelectedReferenceId] = useState<string | null>(null);
  const [progress, setProgress] = useState<Progress>({});
  const [loaded, setLoaded] = useState(false);
  const [rejected, setRejected] = useState<{ interrogationId: string; slot: number; referenceId: string; token: number } | null>(null);

  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(progressKey(scenarioId)) ?? "{}");
      if (saved && typeof saved === "object" && !Array.isArray(saved)) {
        const valid: Progress = {};
        for (const item of interrogations) {
          const slots = (saved as Progress)[item.id];
          if (!Array.isArray(slots)) continue;
          const used = new Set<string>();
          valid[item.id] = Array.from({ length: item.requiredReferenceIds.length }, (_, index) => {
            const id = slots[index];
            if (typeof id !== "string" || !item.requiredReferenceIds.includes(id) || used.has(id)) return null;
            used.add(id);
            return id;
          });
        }
        setProgress(valid);
      }
    } catch {
      setProgress({});
    }
    setLoaded(true);
  }, [scenarioId, interrogations]);

  useEffect(() => {
    if (loaded) localStorage.setItem(progressKey(scenarioId), JSON.stringify(progress));
  }, [loaded, progress, scenarioId]);

  useEffect(() => {
    if (!rejected) return;
    const timer = window.setTimeout(() => setRejected(null), 560);
    return () => window.clearTimeout(timer);
  }, [rejected]);

  const completed = useMemo(() => new Set(interrogations.filter((item) => {
    const slots = progress[item.id] ?? [];
    return slots.length === item.requiredReferenceIds.length && slots.every(Boolean);
  }).map((item) => item.id)), [interrogations, progress]);

  const available = useMemo<Evidence[]>(() => [
    ...clues.filter((clue) => checkedClueList.includes(clue.id) && clue.referenceId).map((clue) => ({
      referenceId: clue.referenceId!, title: clue.title, description: clue.description, kind: "현장" as const,
    })),
    ...interrogations.filter((item) => completed.has(item.id)).map((item) => ({
      ...item.result, kind: "신문" as const,
    })),
  ], [clues, checkedClueList, interrogations, completed]);
  const availableById = useMemo(() => new Map(available.map((item) => [item.referenceId, item])), [available]);

  const attempt = (item: ClueInterrogation, slotIndex: number, referenceId: string) => {
    const slots = progress[item.id] ?? Array(item.requiredReferenceIds.length).fill(null);
    if (completed.has(item.id) || slots[slotIndex] || !availableById.has(referenceId)) return;
    if (!item.requiredReferenceIds.includes(referenceId) || slots.includes(referenceId)) {
      setRejected((previous) => ({ interrogationId: item.id, slot: slotIndex, referenceId, token: (previous?.token ?? 0) + 1 }));
      return;
    }
    const next = [...slots];
    next[slotIndex] = referenceId;
    setProgress((previous) => ({ ...previous, [item.id]: next }));
    setSelectedReferenceId(null);
    setRejected(null);
    if (next.every(Boolean)) onInterrogationComplete(item.result.title);
  };

  const selectedEvidence = selectedReferenceId ? availableById.get(selectedReferenceId) : null;

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="lg" slotProps={{ paper: { sx: { height: "min(820px, calc(100dvh - 32px))" } } }}>
      <DialogTitle sx={{ fontWeight: 800 }}>단서함 · 용의자 신문</DialogTitle>
      <Tabs value={tab} onChange={(_event, value: "clues" | "interrogations") => setTab(value)} sx={{ px: 3, borderBottom: 1, borderColor: "divider" }}>
        <Tab value="clues" label={`단서함 (${available.length})`} />
        <Tab value="interrogations" label={`신문 (${completed.size}/${interrogations.length})`} />
      </Tabs>
      <DialogContent sx={{ minHeight: 0, p: 3 }}>
        {tab === "clues" ? (
          <>
            <Typography color="text.secondary" sx={{ mb: 2 }}>확인한 현장 단서와 신문으로 얻은 진술입니다. 단서를 누르면 신문 화면에서 빈칸에 넣을 수 있습니다.</Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 1.5 }}>
              {available.map((evidence) => (
                <Button key={evidence.referenceId}
                  onClick={() => { setSelectedReferenceId(evidence.referenceId); setTab("interrogations"); }}
                  variant={selectedReferenceId === evidence.referenceId ? "contained" : "outlined"}
                  sx={{ display: "block", textAlign: "left", textTransform: "none", p: 1.5, minHeight: 100, color: selectedReferenceId === evidence.referenceId ? "primary.contrastText" : "text.primary" }}>
                  <Chip size="small" label={evidence.kind} sx={{ mb: 0.75 }} />
                  <Typography sx={{ fontWeight: 700 }}>{evidence.title}</Typography>
                  <Typography variant="body2" sx={{ mt: 0.5, display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden" }}>{evidence.description}</Typography>
                </Button>
              ))}
            </Box>
            {available.length === 0 && <Typography>지도를 조사해 단서를 확인하세요.</Typography>}
          </>
        ) : (
          <>
            <Typography color="text.secondary" sx={{ mb: 1.5 }}>신문 항목은 모두 공개되어 있습니다. 정답 단서는 빈칸에 남고, 오답 단서는 빠집니다.</Typography>
            {selectedEvidence && <Chip label={`선택한 단서: ${selectedEvidence.title}`} onDelete={() => setSelectedReferenceId(null)} color="primary" sx={{ mb: 1.5 }} />}
            <Box aria-label="제시할 단서" sx={{ display: "flex", gap: 0.75, overflowX: "auto", pb: 1.5, mb: 1.5, borderBottom: 1, borderColor: "divider" }}>
              {available.map((evidence) => <Button key={evidence.referenceId} draggable onDragStart={(event) => event.dataTransfer.setData("text/plain", evidence.referenceId)}
                size="small" variant={selectedReferenceId === evidence.referenceId ? "contained" : "outlined"}
                onClick={() => setSelectedReferenceId(evidence.referenceId)}
                sx={{ flexShrink: 0, textTransform: "none" }}>{evidence.title}</Button>)}
              {available.length === 0 && <Typography color="text.secondary">확인한 단서가 없습니다.</Typography>}
            </Box>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
              {suspects.map((suspect) => <Button key={suspect.name} size="small" variant={suspectName === suspect.name ? "contained" : "outlined"} onClick={() => setSuspectName(suspect.name)}>{suspect.name}</Button>)}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {interrogations.filter((item) => item.suspectName === suspectName).map((item, index) => {
                const slots = progress[item.id] ?? Array(item.requiredReferenceIds.length).fill(null);
                const done = completed.has(item.id);
                return <Box key={item.id} sx={{ border: 1, borderColor: done ? "success.main" : "divider", borderRadius: 2, p: 2 }}>
                  <Typography sx={{ fontWeight: 800 }}>{index + 1}. {item.prompt}</Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", my: 1.5 }}>
                    {slots.map((referenceId, slotIndex) => {
                      const bad = rejected?.interrogationId === item.id && rejected.slot === slotIndex;
                      const display = referenceId ? availableById.get(referenceId)?.title : bad ? availableById.get(rejected.referenceId)?.title : null;
                      return <Button key={bad ? `${slotIndex}-${rejected.token}` : slotIndex} variant={referenceId ? "contained" : "outlined"} color={bad ? "error" : referenceId ? "success" : "primary"}
                        onClick={() => {
                          if (referenceId && !done) setProgress((previous) => ({ ...previous, [item.id]: slots.map((value, index) => index === slotIndex ? null : value) }));
                          else if (selectedReferenceId) attempt(item, slotIndex, selectedReferenceId);
                        }}
                        onDragOver={(event) => event.preventDefault()}
                        onDrop={(event) => { event.preventDefault(); attempt(item, slotIndex, event.dataTransfer.getData("text/plain")); }}
                        sx={{ minWidth: 145, minHeight: 54, textTransform: "none", borderStyle: "dashed", animation: bad ? "rejectClue .55s ease-out" : undefined, "@keyframes rejectClue": { "0%": { transform: "translateY(0)", opacity: 1 }, "60%": { transform: "translateY(8px)", opacity: 0.5 }, "100%": { transform: "translateY(22px)", opacity: 0 } } }}>
                        {display ?? (selectedReferenceId ? "선택한 단서 넣기" : "단서 빈칸")}
                      </Button>;
                    })}
                  </Box>
                  {done && <Box sx={{ bgcolor: "success.light", borderRadius: 1.5, p: 1.5 }}><Typography sx={{ fontWeight: 800 }}>{item.result.title}</Typography><Typography sx={{ mt: 0.5 }}>{item.result.description}</Typography></Box>}
                </Box>;
              })}
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 1.5 }}><Button onClick={onClose}>닫기</Button></DialogActions>
    </Dialog>
  );
}
