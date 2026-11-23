import type { ClueInterrogation, ClueType, SuspectType } from "@/types";
import { AddRounded, CheckRounded, CloseRounded, DescriptionOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

type Progress = {
  completedIds: string[];
  workspaces: Record<string, (string | null)[]>;
};
type Evidence = {
  referenceId: string;
  title: string;
  description: string;
  source: string;
  number?: number;
};

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

const progressKey = (scenarioId: string) => `${scenarioId}-clue-interrogations-v2`;

const EvidenceCard = memo(function EvidenceCard({
  evidence,
  selected,
  onSelect,
}: {
  evidence: Evidence;
  selected: boolean;
  onSelect: (referenceId: string) => void;
}) {
  return (
    <Button
      title={`${evidence.title}: ${evidence.description}`}
      aria-label={`${evidence.title}: ${evidence.description}`}
      aria-pressed={selected}
      onClick={() => onSelect(evidence.referenceId)}
      sx={{ display: "block", height: 116, minWidth: 0, overflow: "hidden", textAlign: "left", textTransform: "none", p: 1, border: 1, borderColor: selected ? "primary.main" : "#d7d0c1", borderLeftWidth: 4, borderRadius: 1.5, bgcolor: "#fffefa", color: "text.primary", boxShadow: selected ? 2 : 0, cursor: "pointer", "&:hover": { bgcolor: "white", borderColor: "primary.main", boxShadow: 1 } }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.25 }}>
        <DescriptionOutlined sx={{ fontSize: 17, color: "text.secondary" }} />
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {evidence.number ? `단서 ${evidence.number} · ` : ""}{evidence.source}
        </Typography>
      </Box>
      <Typography sx={{ fontWeight: 800, lineHeight: 1.25, display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden" }}>{evidence.title}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25, lineHeight: 1.35, display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden", wordBreak: "keep-all" }}>{evidence.description}</Typography>
    </Button>
  );
});

export default function ClueInterrogationModal({
  isOpen,
  onClose,
  clues,
  checkedClueList,
  suspects,
  interrogations,
  scenarioId,
  onInterrogationComplete,
}: Props) {
  const [suspectName, setSuspectName] = useState(suspects[0]?.name ?? "");
  const [progress, setProgress] = useState<Progress>({ completedIds: [], workspaces: {} });
  const [loaded, setLoaded] = useState(false);
  const resultPanelRef = useRef<HTMLDivElement>(null);
  const attemptRef = useRef<(referenceId: string) => void>(() => {});
  const [rejected, setRejected] = useState<{
    suspectName: string;
    slot: number;
    referenceId: string;
    token: number;
  } | null>(null);

  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(progressKey(scenarioId)) ?? "null");
      const previous: unknown = saved ?? JSON.parse(localStorage.getItem(`${scenarioId}-clue-interrogations-v1`) ?? "{}");
      const knownIds = new Set(interrogations.map((item) => item.id));
      if (saved && typeof saved === "object" && !Array.isArray(saved)) {
        const record = saved as Partial<Progress>;
        const completedIds = Array.isArray(record.completedIds)
          ? record.completedIds.filter((id): id is string => typeof id === "string" && knownIds.has(id))
          : [];
        const workspaces: Progress["workspaces"] = {};
        if (record.workspaces && typeof record.workspaces === "object") {
          for (const person of suspects) {
            const slots = record.workspaces[person.name];
            if (!Array.isArray(slots)) continue;
            const used = new Set<string>();
            workspaces[person.name] = Array.from({ length: 3 }, (_, index) => {
              const id = slots[index];
              if (typeof id !== "string" || used.has(id)) return null;
              used.add(id);
              return id;
            });
          }
        }
        setProgress({ completedIds, workspaces });
      } else if (previous && typeof previous === "object" && !Array.isArray(previous)) {
        const old = previous as Record<string, (string | null)[]>;
        const completedIds = interrogations.filter((item) => {
          const slots = old[item.id];
          return Array.isArray(slots) && slots.length === item.requiredReferenceIds.length && slots.every((id) => typeof id === "string" && item.requiredReferenceIds.includes(id));
        }).map((item) => item.id);
        setProgress({ completedIds, workspaces: {} });
      }
    } catch {
      setProgress({ completedIds: [], workspaces: {} });
    }
    setLoaded(true);
  }, [scenarioId, interrogations, suspects]);

  useEffect(() => {
    if (loaded) localStorage.setItem(progressKey(scenarioId), JSON.stringify(progress));
  }, [loaded, progress, scenarioId]);

  useEffect(() => {
    if (!rejected) return;
    const timer = window.setTimeout(() => setRejected(null), 300);
    return () => window.clearTimeout(timer);
  }, [rejected]);

  const completed = useMemo(() => new Set(progress.completedIds), [progress.completedIds]);

  const available = useMemo<Evidence[]>(() => [
    ...clues.filter((clue) => checkedClueList.includes(clue.id) && clue.referenceId).map((clue) => ({
      referenceId: clue.referenceId!,
      title: clue.title,
      description: clue.description,
      source: clue.location ?? "현장 조사",
      number: clue.id,
    })),
    ...interrogations.filter((item) => completed.has(item.id)).map((item) => ({
      ...item.result,
      source: `${item.suspectName} 신문`,
    })),
  ], [clues, checkedClueList, interrogations, completed]);
  const availableById = useMemo(() => new Map(available.map((item) => [item.referenceId, item])), [available]);
  const suspect = suspects.find((item) => item.name === suspectName);
  const visibleInterrogations = interrogations.filter((item) => item.suspectName === suspectName);
  const workspace = progress.workspaces[suspectName] ?? [null, null, null];
  const workspaceEvidence = workspace.filter((id): id is string => typeof id === "string");
  const currentSolved = visibleInterrogations.find((item) =>
    completed.has(item.id) && workspaceEvidence.length === item.requiredReferenceIds.length &&
    workspaceEvidence.every((id) => item.requiredReferenceIds.includes(id))
  );

  useEffect(() => {
    resultPanelRef.current?.scrollTo(0, 0);
  }, [suspectName, currentSolved?.id]);

  const attempt = (referenceId: string) => {
    const slots = workspace;
    if (currentSolved) return;
    const existingIndex = slots.indexOf(referenceId);
    if (existingIndex !== -1) {
      setProgress((previous) => ({
        ...previous,
        workspaces: { ...previous.workspaces, [suspectName]: slots.map((value, index) => index === existingIndex ? null : value) },
      }));
      return;
    }
    const slotIndex = slots.findIndex((id) => id === null);
    if (slotIndex === -1 || !availableById.has(referenceId)) return;
    const next = [...slots];
    next[slotIndex] = referenceId;
    const submitted = next.filter((id): id is string => typeof id === "string");
    const candidates = visibleInterrogations.filter((item) =>
      !completed.has(item.id) && submitted.length <= item.requiredReferenceIds.length &&
      submitted.every((id) => item.requiredReferenceIds.includes(id))
    );
    if (candidates.length === 0) {
      setRejected((previous) => ({
        suspectName,
        slot: slotIndex,
        referenceId,
        token: (previous?.token ?? 0) + 1,
      }));
      return;
    }
    const finished = candidates.find((item) => submitted.length === item.requiredReferenceIds.length);
    setProgress((previous) => ({
      completedIds: finished ? [...previous.completedIds, finished.id] : previous.completedIds,
      workspaces: { ...previous.workspaces, [suspectName]: next },
    }));
    setRejected(null);
    if (finished) onInterrogationComplete(finished.result.title);
  };

  useEffect(() => {
    attemptRef.current = attempt;
  });
  const handleEvidenceSelect = useCallback((referenceId: string) => attemptRef.current(referenceId), []);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="xl"
      slotProps={{ paper: { sx: { width: "calc(100vw - 32px)", height: "min(760px, calc(100dvh - 32px))", maxHeight: "calc(100dvh - 32px)" } } }}
    >
      <DialogTitle sx={{ px: 2, py: 1, borderBottom: 1, borderColor: "divider" }}>
        <Typography component="h2" variant="h5" sx={{ fontWeight: 800 }}>용의자 신문</Typography>
        <Typography variant="body2" color="text.secondary">
          확보한 진술 {completed.size}/{interrogations.length}건
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ p: 0, minHeight: 0, overflow: "hidden" }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "minmax(0, 1fr) 300px", lg: "420px minmax(0, 1fr) 380px" }, gridTemplateRows: { xs: "auto minmax(0, 1fr)", lg: "minmax(0, 1fr)" }, height: "100%", minHeight: 0 }}>
          <Box component="section" aria-label={`${suspectName} 신문`} sx={{ gridColumn: 1, gridRow: 1, p: 2, minWidth: 0, minHeight: 0, overflowY: "auto", borderRight: 1, borderColor: "divider" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.25, p: 1.25, minHeight: 100, bgcolor: "grey.100", borderLeft: 4, borderColor: "primary.main", borderRadius: 2 }}>
              <Avatar src={suspect?.image} alt={`${suspectName} 프로필`} sx={{ width: 72, height: 72, flexShrink: 0 }} />
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 800 }}>현재 신문 대상</Typography>
                <Typography component="h3" variant="h5" sx={{ fontWeight: 800, lineHeight: 1.2 }}>{suspectName}</Typography>
                <Typography variant="body2" color="text.secondary">{suspect?.job} · 진술 {visibleInterrogations.filter((item) => completed.has(item.id)).length}건</Typography>
              </Box>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>신문 대상 변경</Typography>
            <Box role="group" aria-label="신문할 용의자 선택" sx={{ display: "flex", gap: 0.5, mb: 1, flexWrap: "wrap" }}>
              {suspects.map((person) => {
                const selected = suspectName === person.name;
                return (
                  <Button
                    key={person.name}
                    aria-pressed={selected}
                    onClick={() => setSuspectName(person.name)}
                    sx={{ minWidth: 64, p: 0.25, display: "flex", flexDirection: "column", gap: 0.25, textTransform: "none", color: "text.primary", borderRadius: 2, bgcolor: "transparent", "&:hover": { bgcolor: "action.hover" } }}
                  >
                    <Avatar src={person.image} alt="" sx={{ width: 38, height: 38, border: 2, borderColor: selected ? "primary.main" : "grey.300" }} />
                    <Typography variant="caption" sx={{ fontWeight: selected ? 800 : 600 }}>{person.name}</Typography>
                  </Button>
                );
              })}
            </Box>
            <Box sx={{ border: 1, borderColor: "divider", borderRadius: 2, p: 1.5, width: "fit-content", maxWidth: "100%" }}>
              <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
                {workspace.map((referenceId, slotIndex) => {
                  const bad = rejected?.suspectName === suspectName && rejected.slot === slotIndex;
                  const evidence = referenceId ? availableById.get(referenceId) : bad ? availableById.get(rejected.referenceId) : null;
                  return (
                    <Box
                      key={`${slotIndex}-${referenceId ?? "empty"}-${bad ? rejected.token : ""}`}
                      className={bad ? "circus-evidence-reject" : referenceId ? "circus-evidence-accept" : undefined}
                      aria-label={`${suspectName}, ${slotIndex + 1}번째 증거${evidence ? `: ${evidence.title}` : ""}`}
                      sx={{ boxSizing: "border-box", width: 112, height: 76, flex: "0 0 112px", p: 0.75, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0.25, border: "1px solid", borderStyle: referenceId || bad ? "solid" : "dashed", borderColor: bad ? "error.main" : referenceId ? "primary.main" : "grey.400", borderRadius: 1.5, bgcolor: referenceId ? "#fffefa" : "grey.50", boxShadow: referenceId ? 1 : 0, color: "text.primary" }}
                    >
                      {referenceId ? <CheckRounded sx={{ fontSize: 16, color: "primary.main" }} /> : bad ? <CloseRounded color="error" fontSize="small" /> : <AddRounded color="action" fontSize="small" />}
                      <Typography variant="caption" sx={{ fontWeight: referenceId ? 700 : 500, textAlign: "center", lineHeight: 1.2, display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden" }}>{evidence?.title ?? slotIndex + 1}</Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>

          <Box component="section" aria-label="확보한 진술" sx={{ gridColumn: { xs: 1, lg: 2 }, gridRow: { xs: 2, lg: 1 }, p: 2, minWidth: 0, minHeight: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <Typography component="h3" variant="h6" sx={{ fontWeight: 800, mb: 1, flexShrink: 0 }}>확보한 진술</Typography>
            <Box ref={resultPanelRef} sx={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {currentSolved && (
                  <Box sx={{ p: 1.5, borderRadius: 1.5, bgcolor: "#fffefa", border: 1, borderColor: "divider", borderLeft: 3, borderLeftColor: "primary.main" }}>
                    <Typography sx={{ fontWeight: 800, color: "primary.main" }}>{currentSolved.result.title}</Typography>
                    <Typography sx={{ mt: 1, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{currentSolved.result.description}</Typography>
                    <Button variant="outlined" size="small" sx={{ mt: 1.5 }} onClick={() => setProgress((previous) => ({ ...previous, workspaces: { ...previous.workspaces, [suspectName]: [null, null, null] } }))}>다른 조합 시도</Button>
                  </Box>
                )}
                {visibleInterrogations.filter((item) => completed.has(item.id) && item.id !== currentSolved?.id).map((item) => (
                  <Box key={item.id} sx={{ border: 1, borderColor: "divider", borderLeft: 3, borderLeftColor: "primary.main", borderRadius: 1.5, p: 1.5, bgcolor: "#fffefa" }}>
                    <Typography sx={{ fontWeight: 800, color: "primary.main" }}>{item.result.title}</Typography>
                    <Typography sx={{ mt: 0.75, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{item.result.description}</Typography>
                  </Box>
                ))}
                {visibleInterrogations.every((item) => !completed.has(item.id)) && <Typography variant="body2" color="text.secondary">아직 확보한 진술이 없습니다.</Typography>}
              </Box>
            </Box>
          </Box>

          <Box component="section" aria-label="제시할 단서" sx={{ gridColumn: { xs: 2, lg: 3 }, gridRow: { xs: "1 / span 2", lg: 1 }, borderLeft: 1, borderColor: "divider", bgcolor: "#f8f6f0", p: 1.5, minWidth: 0, minHeight: 0, height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", mb: 0.5 }}>
              <Typography component="h3" variant="h6" sx={{ fontWeight: 800 }}>제시할 단서</Typography>
              <Typography variant="body2" color="text.secondary">{available.length}개</Typography>
            </Box>
            <Box sx={{ flex: 1, minHeight: 0, overflowY: "auto", display: "grid", gridTemplateColumns: { xs: "1fr", lg: "repeat(2, minmax(0, 1fr))" }, gridAutoRows: "116px", alignContent: "start", gap: 0.75 }}>
              {available.map((evidence) => (
                <EvidenceCard key={evidence.referenceId} evidence={evidence} selected={workspace.includes(evidence.referenceId)} onSelect={handleEvidenceSelect} />
              ))}
              {available.length === 0 && <Typography color="text.secondary" sx={{ p: 2, textAlign: "center" }}>지도를 조사하면 단서가 이곳에 모입니다.</Typography>}
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 1.25, borderTop: 1, borderColor: "divider" }}>
        <Button onClick={onClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
}
