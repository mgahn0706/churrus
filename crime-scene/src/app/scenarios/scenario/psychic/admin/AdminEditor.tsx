"use client";

import { AddRounded, ContentCopyRounded, DownloadRounded, ExpandMoreRounded, RestartAltRounded, UploadFileRounded } from "@mui/icons-material";
import {
  Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, Checkbox,
  Chip, FormControlLabel, MenuItem, Stack,
  TextField, ThemeProvider, Tooltip, Typography,
} from "@mui/material";
import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import EvidenceEditor from "@/components/InInterrogationAdmin/EvidenceEditor";
import SharedSourceEditor from "@/components/InInterrogationAdmin/SharedSourceEditor";
import SharedQuestionEditor from "@/components/InInterrogationAdmin/SharedQuestionEditor";
import ScriptEditor from "@/components/InInterrogationAdmin/ScriptEditor";
import { createScenarioTheme } from "@/components/createScenarioTheme";
import {
  evidenceOptions, isEditableContent, toInterrogationTypeScript,
  validateAdminContent, type EditableInterrogationContent,
} from "@/features/interrogation/adminContent";
import { psychicInterrogationContent } from "@/fixtures/psychic/interrogation";
import { psychicSuspects, psychicVictim } from "@/fixtures/psychic/suspects";
import { deriveSharedSources, ensureSharedSourceNumbers, materializeSharedSources, spreadSharedSourcePositions, type SharedSource } from "@/features/interrogation/sharedSources";
import { deriveSharedQuestions, materializeSharedQuestions, type SharedQuestion } from "@/features/interrogation/sharedQuestions";
import { defaultPersonPosition, phasePeople } from "@/features/interrogation/phasePeople";
import type { InterrogationEvidence, InterrogationMapPerson, InterrogationPhase, InterrogationQuestion, InterrogationScript } from "@/types";

const theme = createScenarioTheme("#bd874e", "dark", "Galmuri11, sans-serif");
const draftKey = "psychic-interrogation-admin-v2";
const previousDraftKey = "psychic-interrogation-admin-v1";
const suspectNames = [...psychicSuspects, psychicVictim].map((person) => person.name);
const legacyMapImage = "/image/scenario/psychic/map/lab-map.png";
const currentMapImage = "/image/scenario/psychic/map/lab-map.svg";
const currentMapLocations = [
  { id: "entrance", title: "연구소 입구", x: 12, y: 43 },
  { id: "main-hall", title: "메인홀", x: 77, y: 69 },
  { id: "laboratory", title: "실험실", x: 37, y: 23 },
  { id: "director-office", title: "소장실", x: 63, y: 22 },
];
const updateLegacyMap = (draft: EditableInterrogationContent) => {
  const next = structuredClone(draft);
  for (const phase of next.phases) {
    phase.people ??= phasePeople(phase);
    const hasLegacyLocations = phase.locations.some((location) =>
      location.id === "observation" || (location.id === "entrance" && location.x === 18 && location.y === 69));
    if (phase.mapImage !== legacyMapImage && !(phase.mapImage === currentMapImage && hasLegacyLocations)) continue;
    phase.mapImage = currentMapImage;
    phase.locations = phase.locations.map((location) => {
      const id = location.id === "observation" ? "laboratory" : location.id;
      const current = currentMapLocations.find((item) => item.id === id);
      return current ? { ...location, id, x: current.x, y: current.y, title: current.title } : location;
    });
    if (phase.id === "phase-4" && !phase.locations.some((location) => location.id === "director-office")) {
      const office = currentMapLocations.find((location) => location.id === "director-office");
      if (office) phase.locations.push(structuredClone(office));
    }
    phase.sources = phase.sources.map((source) => ({
      ...source,
      locationId: source.id === "p4-note" ? "director-office" : source.locationId === "observation" ? "laboratory" : source.locationId,
    }));
  }
  return next;
};
const normalizeMapCoordinates = (draft: EditableInterrogationContent) => {
  const next = updateLegacyMap(draft);
  for (const phase of next.phases) {
    for (const interrogation of phase.interrogations) {
      for (const question of interrogation.questions) {
        const legacy = question as InterrogationQuestion & { challenge?: { response: InterrogationScript; revealedEvidence?: InterrogationEvidence } };
        if (!legacy.challenge) continue;
        const lines = (script: InterrogationScript) => Array.isArray(script) ? script : [script];
        question.answer = [...lines(question.answer), ...lines(legacy.challenge.response)];
        question.revealedEvidence ??= legacy.challenge.revealedEvidence;
        delete legacy.challenge;
      }
    }
    phase.sources = phase.sources.map((source) => {
      const location = phase.locations.find((item) => item.id === source.locationId);
      const siblings = phase.sources.filter((item) => item.locationId === source.locationId);
      const spread = siblings.indexOf(source) - (siblings.length - 1) / 2;
      const positioned = {
        ...source,
        x: source.x ?? (location?.x ?? 50) + spread * 8,
        y: source.y ?? (location?.y ?? 50) + spread * 12,
      };
      delete positioned.locationId;
      return positioned;
    });
    phase.locations = [];
  }
  next.sharedSources = spreadSharedSourcePositions(ensureSharedSourceNumbers(next.sharedSources ?? deriveSharedSources(next.phases)));
  next.people ??= [];
  next.phases = materializeSharedSources(next.phases, next.sharedSources);
  next.sharedQuestions ??= deriveSharedQuestions(next.phases);
  next.phases = materializeSharedQuestions(next.phases, next.sharedQuestions);
  return next;
};
const newId = (prefix: string) =>
  `${prefix}-${typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID().slice(0, 8)
    : Math.random().toString(36).slice(2, 10)}`;
const emptyEvidence = (): InterrogationEvidence => ({ id: newId("evidence"), title: "", description: "" });

function Section({ title, action, children, order }: { title: string; action?: ReactNode; children: ReactNode; order?: number }) {
  return (
    <Box sx={{ border: "1px solid rgba(231,201,148,.22)", bgcolor: "rgba(11,19,17,.82)", borderRadius: 1, p: { xs: 1.5, md: 2 }, display: "grid", gap: 2, order }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
        <Typography component="h2" sx={{ fontSize: 16, fontWeight: 800, color: "#f3dfbb" }}>{title}</Typography>
        {action}
      </Box>
      {children}
    </Box>
  );
}

type MapDragTarget = { kind: "source"; index: number } | { kind: "person"; name: string };

function MapPreview({ phase, sourceNumbers, people, onMoveSource, onMovePerson }: {
  phase: InterrogationPhase;
  sourceNumbers: Map<string, number>;
  people: InterrogationMapPerson[];
  onMoveSource: (index: number, x: number, y: number) => void;
  onMovePerson: (name: string, x: number, y: number) => void;
}) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<(MapDragTarget & { pointerId: number; offsetX: number; offsetY: number }) | null>(null);
  const [dragPosition, setDragPosition] = useState<(MapDragTarget & { x: number; y: number }) | null>(null);
  const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value * 10) / 10));
  const positionFromPointer = (event: ReactPointerEvent<HTMLElement>) => {
    const bounds = mapRef.current?.getBoundingClientRect();
    const drag = dragRef.current;
    if (!bounds || !drag) return null;
    return {
      ...(drag.kind === "source" ? { kind: "source" as const, index: drag.index } : { kind: "person" as const, name: drag.name }),
      x: clamp((event.clientX - bounds.left - drag.offsetX) / bounds.width * 100),
      y: clamp((event.clientY - bounds.top - drag.offsetY) / bounds.height * 100),
    };
  };
  const startDrag = (event: ReactPointerEvent<HTMLElement>, target: MapDragTarget, x: number, y: number) => {
    if (!event.isPrimary || event.button !== 0) return;
    const bounds = mapRef.current?.getBoundingClientRect();
    if (!bounds) return;
    dragRef.current = { ...target, pointerId: event.pointerId, offsetX: event.clientX - bounds.left - x / 100 * bounds.width, offsetY: event.clientY - bounds.top - y / 100 * bounds.height };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const finishDrag = (event: ReactPointerEvent<HTMLElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    const position = positionFromPointer(event);
    dragRef.current = null;
    setDragPosition(null);
    if (!position) return;
    if (position.kind === "source") onMoveSource(position.index, position.x, position.y);
    else onMovePerson(position.name, position.x, position.y);
  };
  if (!phase.mapImage) return null;
  return (
    <Box sx={{ display: "grid", gap: 1 }}>
      <Typography sx={{ color: "#b8ac98", fontSize: 12 }}>주황색 단서와 파란 인물을 끌어 놓으세요. 겹치는 단서는 가까운 빈자리로 자동 이동합니다.</Typography>
      <Box ref={mapRef} sx={{ position: "relative", width: "100%", maxWidth: 720, aspectRatio: "16 / 9", backgroundImage: `url(${phase.mapImage})`, backgroundSize: "100% 100%", border: "1px solid rgba(231,201,148,.3)", bgcolor: "#111b18", overflow: "hidden" }}>
        {phase.sources.map((source, index) => {
          const number = sourceNumbers.get(source.evidence.id);
          const x = dragPosition?.kind === "source" && dragPosition.index === index ? dragPosition.x : source.x ?? 50;
          const y = dragPosition?.kind === "source" && dragPosition.index === index ? dragPosition.y : source.y ?? 50;
          return (
            <Tooltip key={source.id} title={`#${number ?? "?"} · ${source.title || "새 단서"}`}>
              <Box
                component="button"
                type="button"
                aria-label={`단서 ${number ?? "?"} ${source.title || "새 단서"} 위치 이동`}
                onPointerDown={(event) => startDrag(event, { kind: "source", index }, x, y)}
                onPointerMove={(event) => {
                  if (dragRef.current?.pointerId !== event.pointerId) return;
                  setDragPosition(positionFromPointer(event));
                }}
                onPointerUp={finishDrag}
                onPointerCancel={() => { dragRef.current = null; setDragPosition(null); }}
                onKeyDown={(event) => {
                  const offset = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[event.key];
                  if (!offset) return;
                  event.preventDefault();
                  onMoveSource(index, clamp(x + offset[0]), clamp(y + offset[1]));
                }}
                sx={{ position: "absolute", left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)", width: 28, height: 28, p: 0, border: "2px solid #fff1cf", borderRadius: "50%", bgcolor: "#a76426", color: "#fff", fontSize: 12, fontWeight: 800, boxShadow: "0 0 0 3px rgba(0,0,0,.7)", cursor: dragPosition?.kind === "source" && dragPosition.index === index ? "grabbing" : "grab", touchAction: "none", zIndex: dragPosition?.kind === "source" && dragPosition.index === index ? 3 : 1, "&:focus-visible": { outline: "2px solid #fff1cf", outlineOffset: 3 } }}
              >
                {number ?? "?"}
              </Box>
            </Tooltip>
          );
        })}
        {people.map((person) => {
          const x = dragPosition?.kind === "person" && dragPosition.name === person.name ? dragPosition.x : person.x;
          const y = dragPosition?.kind === "person" && dragPosition.name === person.name ? dragPosition.y : person.y;
          return <Tooltip key={person.name} title={`${person.name} 위치 이동`}>
            <Box
              component="button"
              type="button"
              aria-label={`${person.name} 위치 이동`}
              onPointerDown={(event) => startDrag(event, { kind: "person", name: person.name }, x, y)}
              onPointerMove={(event) => { if (dragRef.current?.pointerId === event.pointerId) setDragPosition(positionFromPointer(event)); }}
              onPointerUp={finishDrag}
              onPointerCancel={() => { dragRef.current = null; setDragPosition(null); }}
              onKeyDown={(event) => {
                const offset = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[event.key];
                if (!offset) return;
                event.preventDefault();
                onMovePerson(person.name, clamp(x + offset[0]), clamp(y + offset[1]));
              }}
              sx={{ position: "absolute", left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)", minWidth: 32, height: 32, px: .5, border: "2px solid #d6edff", borderRadius: "50%", bgcolor: "#315f76", color: "#fff", fontSize: 12, fontWeight: 800, boxShadow: "0 0 0 3px rgba(0,0,0,.7)", cursor: dragPosition?.kind === "person" && dragPosition.name === person.name ? "grabbing" : "grab", touchAction: "none", zIndex: dragPosition?.kind === "person" && dragPosition.name === person.name ? 4 : 2, "&:focus-visible": { outline: "2px solid #d6edff", outlineOffset: 3 } }}
            >{person.name === "김짜장" ? "소장" : person.name.replace("실험체 ", "")}</Box>
          </Tooltip>;
        })}
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: .75, maxWidth: 720 }}>
        {phase.sources.map((source) => <Chip key={source.id} size="small" label={`#${sourceNumbers.get(source.evidence.id) ?? "?"} · ${source.title || "새 단서"}`} />)}
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: .75, maxWidth: 720 }}>
        {people.map((person) => <Chip key={person.name} size="small" color="info" label={person.name} />)}
      </Box>
    </Box>
  );
}

function downloadText(filename: string, text: string, type: string) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function PsychicAdminEditor() {
  const [content, setContent] = useState<EditableInterrogationContent>(() => normalizeMapCoordinates(structuredClone(psychicInterrogationContent)));
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState<"phase" | "prologue" | "fallback">("phase");
  const [phaseArea, setPhaseArea] = useState<"interrogation" | "dialogue" | "evidence" | "settings">("interrogation");
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [personName, setPersonName] = useState("");
  const [newPersonName, setNewPersonName] = useState("");
  const [newPersonImage, setNewPersonImage] = useState("");
  const [questionSearch, setQuestionSearch] = useState("");
  const [expandedSourceId, setExpandedSourceId] = useState<string | null>(null);
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [previousDraftAvailable, setPreviousDraftAvailable] = useState(false);
  const importRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef(content);

  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(draftKey);
      setPreviousDraftAvailable(Boolean(localStorage.getItem(previousDraftKey)));
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (isEditableContent(parsed)) setContent(normalizeMapCoordinates(parsed));
      }
    } catch {
      setNotice("저장된 초안을 읽지 못했습니다. 기본 원고를 표시합니다.");
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const timer = window.setTimeout(() => localStorage.setItem(draftKey, JSON.stringify(content)), 300);
    return () => window.clearTimeout(timer);
  }, [content, loaded]);

  useEffect(() => {
    if (!loaded) return;
    const save = () => localStorage.setItem(draftKey, JSON.stringify(contentRef.current));
    window.addEventListener("pagehide", save);
    return () => window.removeEventListener("pagehide", save);
  }, [loaded]);

  const [validationError, setValidationError] = useState<string | null>(() => validateAdminContent(content, suspectNames));
  useEffect(() => {
    const timer = window.setTimeout(() => setValidationError(validateAdminContent(content, suspectNames)), 300);
    return () => window.clearTimeout(timer);
  }, [content]);
  const phase = content.phases[phaseIndex];
  const visiblePeople = phase ? phasePeople(phase) : [];
  const visibleNames = new Set(visiblePeople.map((item) => item.name));
  const visibleInterrogations = phase?.interrogations.filter((item) => visibleNames.has(item.suspectName)) ?? [];
  const person = visibleInterrogations.find((item) => item.suspectName === personName) ?? visibleInterrogations[0];
  const activePersonIndex = phase?.interrogations.findIndex((item) => item.suspectName === person?.suspectName) ?? -1;
  const personCatalog = [...psychicSuspects, psychicVictim, ...(content.people ?? [])];
  const options = useMemo(() => evidenceOptions(content, phaseIndex), [content, phaseIndex]);
  const clueOptions = useMemo(() => {
    const byId = new Map<string, { id: string; label: string; description: string }>();
    for (const option of evidenceOptions(content)) {
      const id = option.id.includes("::") ? option.id.slice(option.id.indexOf("::") + 2) : option.id;
      if (!byId.has(id)) byId.set(id, { ...option, id });
    }
    return [...byId.values()];
  }, [content]);
  const sourceNumbers = useMemo(() => new Map((content.sharedSources ?? []).map((source) => [source.id, source.number ?? 0])), [content.sharedSources]);

  const update = (edit: (next: EditableInterrogationContent) => void, rebuild: "none" | "questions" | "all" = "none", preferredSourceId?: string) => {
    setContent((previous) => {
      const next = structuredClone(previous);
      edit(next);
      if (rebuild === "all" && next.sharedSources) {
        next.sharedSources = spreadSharedSourcePositions(next.sharedSources, preferredSourceId);
        next.phases = materializeSharedSources(next.phases, next.sharedSources);
      }
      if (rebuild !== "none" && next.sharedQuestions) next.phases = materializeSharedQuestions(next.phases, next.sharedQuestions);
      return next;
    });
  };
  const editPhase = (edit: (next: EditableInterrogationContent["phases"][number]) => void, rebuild: "none" | "questions" = "none") =>
    update((next) => edit(next.phases[phaseIndex]), rebuild);
  const editSharedQuestion = (id: string, edit: (question: SharedQuestion) => void) =>
    update((next) => {
      const question = next.sharedQuestions?.find((item) => item.id === id);
      if (question) edit(question);
    }, "questions");
  const editSharedSource = (id: string, edit: (source: SharedSource, phases: InterrogationPhase[]) => void, moved = false) =>
    update((next) => {
      const source = next.sharedSources?.find((item) => item.id === id);
      if (source) edit(source, next.phases);
    }, "all", moved ? id : undefined);
  const addSharedSource = () => {
    const evidence = emptyEvidence();
    setExpandedSourceId(evidence.id);
    update((next) => {
      const count = next.sharedSources?.length ?? 0;
      next.sharedSources ??= [];
      next.sharedSources.unshift({
        id: evidence.id,
        number: Math.max(0, ...next.sharedSources.map((source) => source.number ?? 0)) + 1,
        base: { x: 45 + (count % 4) * 5, y: 45 + (Math.floor(count / 4) % 4) * 5, title: "", description: "", evidence },
        visiblePhaseIds: next.phases.filter((item) => !item.finalInterrogation).map((item) => item.id),
        changes: {}, sourceIds: {}, order: {},
      });
    }, "all");
  };
  const addSharedQuestion = () => {
    if (!person) return;
    const id = newId("question");
    setExpandedQuestionId(id);
    setQuestionSearch("");
    update((next) => {
      next.sharedQuestions ??= [];
      next.sharedQuestions.unshift({
        id, suspectName: person.suspectName, clueIds: [],
        visiblePhaseIds: next.phases.slice(phaseIndex).filter((item) => item.interrogations.some((entry) => entry.suspectName === person.suspectName)).map((item) => item.id),
        base: { prompt: "", answer: [""] }, changes: {}, questionIds: {}, evidenceRefs: {}, order: {},
      });
    }, "questions");
  };
  const togglePhasePerson = (name: string, visible: boolean) => {
    editPhase((next) => {
      next.people ??= phasePeople(next);
      if (visible && !next.people.some((item) => item.name === name)) {
        next.people.push({ name, ...defaultPersonPosition(name, next.people.length) });
        if (!next.interrogations.some((item) => item.suspectName === name)) {
          next.interrogations.push({ suspectName: name, conversation: [], conversationChoices: [], questions: [] });
        }
      } else if (!visible) {
        next.people = next.people.filter((item) => item.name !== name);
        const hiddenQuestionIds = new Set(next.interrogations.find((item) => item.suspectName === name)?.questions.map((item) => item.id) ?? []);
        next.requiredQuestionIds = next.requiredQuestionIds.filter((id) => !hiddenQuestionIds.has(id));
      }
    }, "questions");
    if (visible) setPersonName(name);
    else if (personName === name) setPersonName("");
  };
  const addPerson = () => {
    const name = newPersonName.trim();
    if (!name || personCatalog.some((item) => item.name === name)) {
      setNotice("새 인물의 이름을 입력하고 중복되지 않는지 확인하세요.");
      return;
    }
    update((next) => {
      next.people ??= [];
      next.people.push({ name, image: newPersonImage.trim() || undefined, description: "" });
      const current = next.phases[phaseIndex];
      current.people ??= phasePeople(current);
      current.people.push({ name, ...defaultPersonPosition(name, current.people.length) });
      current.interrogations.push({ suspectName: name, conversation: [], conversationChoices: [], questions: [] });
    }, "questions");
    setPersonName(name);
    setNewPersonName("");
    setNewPersonImage("");
  };

  const exportCode = () => {
    const error = validateAdminContent(content, suspectNames);
    if (error) {
      setNotice(error);
      return null;
    }
    return toInterrogationTypeScript(content);
  };
  const saveCode = () => {
    const code = exportCode();
    if (!code) return;
    downloadText("interrogation.ts", code, "text/typescript;charset=utf-8");
    setNotice("interrogation.ts 저장됨 · src/fixtures/psychic/interrogation.ts에 교체하면 적용됩니다.");
  };
  const copyCode = async () => {
    const code = exportCode();
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setNotice("게임 원고 코드 복사됨 · src/fixtures/psychic/interrogation.ts에 붙여넣으면 적용됩니다.");
    } catch {
      setNotice("클립보드에 복사하지 못했습니다. TS 파일 저장을 사용하세요.");
    }
  };
  const importJson = async (file?: File) => {
    if (!file) return;
    try {
      const parsed: unknown = JSON.parse(await file.text());
      if (!isEditableContent(parsed)) throw new Error("올바른 초안 파일이 아닙니다.");
      setContent(normalizeMapCoordinates(parsed));
      setPhaseIndex(0);
      setPersonName("");
      setView("phase");
      setNotice("초안을 불러왔습니다.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "초안을 불러오지 못했습니다.");
    }
  };
  const addPhase = () => {
    const finalIndex = content.phases.findIndex((item) => item.finalInterrogation);
    const insertAt = finalIndex < 0 ? content.phases.length : finalIndex;
    update((next) => {
      const id = newId("phase");
      next.phases.splice(insertAt, 0, {
        id, title: "새 조사", timeLabel: "", energyLimit: 3,
        intro: [{ speaker: "나", text: "" }], mapImage: next.phases[0]?.mapImage,
        fallbackAnswers: [],
        locations: [], people: suspectNames.map((name, index) => ({ name, ...defaultPersonPosition(name, index) })), sources: [],
        combinations: [],
        interrogations: suspectNames.map((suspectName) => ({
          suspectName, conversation: [], conversationChoices: [], questions: [],
        })),
        requiredCombinationIds: [], requiredQuestionIds: [],
      });
      for (const source of next.sharedSources ?? []) source.visiblePhaseIds.push(id);
      for (const question of next.sharedQuestions ?? []) {
        const firstIndex = next.phases.findIndex((item) => question.visiblePhaseIds.includes(item.id));
        if (firstIndex >= 0 && firstIndex < insertAt && next.phases[insertAt].interrogations.some((entry) => entry.suspectName === question.suspectName)) {
          question.visiblePhaseIds.push(id);
        }
      }
    }, "all");
    setPhaseIndex(insertAt);
    setPersonName("");
    setView("phase");
  };
  const deletePhase = () => {
    if (!phase || phase.finalInterrogation || !window.confirm(`${phase.title} 페이즈를 삭제할까요?`)) return;
    update((next) => {
      const [removed] = next.phases.splice(phaseIndex, 1);
      for (const source of next.sharedSources ?? []) {
        source.visiblePhaseIds = source.visiblePhaseIds.filter((id) => id !== removed.id);
        delete source.changes[removed.id];
        delete source.sourceIds[removed.id];
        delete source.order[removed.id];
      }
      for (const question of next.sharedQuestions ?? []) {
        question.visiblePhaseIds = question.visiblePhaseIds.filter((id) => id !== removed.id);
        delete question.changes[removed.id];
        delete question.questionIds[removed.id];
        delete question.evidenceRefs[removed.id];
        delete question.order[removed.id];
      }
    }, "all");
    setPhaseIndex(Math.max(0, phaseIndex - 1));
    setPersonName("");
  };
  const restoreOriginal = () => {
    if (!window.confirm("브라우저 초안을 지우고 현재 게임 원고로 되돌릴까요?")) return;
    setContent(normalizeMapCoordinates(structuredClone(psychicInterrogationContent)));
    setPhaseIndex(0);
    setPersonName("");
    setView("phase");
    setNotice("현재 게임 원고를 다시 불러왔습니다.");
  };
  const loadPreviousDraft = () => {
    if (!window.confirm("현재 초안을 이전 버전 초안으로 바꿀까요?")) return;
    try {
      const stored = localStorage.getItem(previousDraftKey);
      const parsed: unknown = stored ? JSON.parse(stored) : null;
      if (!isEditableContent(parsed)) throw new Error("이전 초안을 읽을 수 없습니다.");
      setContent(normalizeMapCoordinates(parsed));
      setPhaseIndex(0);
      setPersonName("");
      setView("phase");
      setNotice("이전 초안을 불러왔습니다. 페이즈별 대사는 각각 수정할 수 있습니다.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "이전 초안을 읽을 수 없습니다.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100dvh", bgcolor: "#080d0c", color: "#f8edda", fontFamily: "Galmuri11, sans-serif", p: { xs: 1.5, md: 3 } }}>
        <Box sx={{ maxWidth: 1500, mx: "auto", display: "grid", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: { xs: "flex-start", md: "center" }, justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
            <Box>
              <Typography component="h1" sx={{ fontSize: { xs: 20, md: 26 }, fontWeight: 900 }}>초능력자 원고 관리</Typography>
              <Typography sx={{ color: "#b8ac98", fontSize: 12, mt: .5 }}>초안은 이 브라우저에 자동 저장됩니다.</Typography>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1 }}>
              <Chip size="small" color={validationError ? "warning" : "success"} label={validationError ? "검토 필요" : "내보내기 가능"} />
              <input ref={importRef} type="file" accept=".json,application/json" hidden onChange={(event) => { void importJson(event.target.files?.[0]); event.target.value = ""; }} />
              <Button size="small" startIcon={<UploadFileRounded />} onClick={() => importRef.current?.click()}>초안 불러오기</Button>
              {previousDraftAvailable && <Button size="small" onClick={loadPreviousDraft}>이전 초안</Button>}
              <Button size="small" startIcon={<DownloadRounded />} onClick={() => downloadText("psychic-interrogation-draft.json", JSON.stringify(content, null, 2), "application/json;charset=utf-8")}>초안 JSON</Button>
              <Button size="small" startIcon={<RestartAltRounded />} onClick={restoreOriginal}>원본 복원</Button>
              <Button size="small" variant="outlined" startIcon={<DownloadRounded />} onClick={saveCode}>TS 파일 저장</Button>
              <Button size="small" variant="contained" startIcon={<ContentCopyRounded />} onClick={() => void copyCode()}>코드 복사</Button>
            </Box>
          </Box>
          {validationError && <Alert severity="warning" sx={{ py: 0 }}>{validationError}</Alert>}
          {notice && <Alert severity="info" onClose={() => setNotice("")} sx={{ py: 0 }}>{notice}</Alert>}
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "230px minmax(0, 1fr)" }, gap: 2, alignItems: "start" }}>
            <Box component="nav" aria-label="원고 섹션" sx={{ display: "flex", flexDirection: { xs: "row", md: "column" }, gap: .5, overflowX: "auto", p: 1, border: "1px solid rgba(231,201,148,.22)", bgcolor: "rgba(11,19,17,.82)", borderRadius: 1, position: { md: "sticky" }, top: { md: 16 } }}>
              <Button onClick={() => setView("prologue")} variant={view === "prologue" ? "contained" : "text"} sx={{ justifyContent: "flex-start", whiteSpace: "nowrap" }}>프롤로그</Button>
              {content.phases.map((item, index) => (
                <Button key={item.id} onClick={() => { setPhaseIndex(index); setPersonName(""); setQuestionSearch(""); setView("phase"); }} variant={view === "phase" && phaseIndex === index ? "contained" : "text"} sx={{ justifyContent: "flex-start", whiteSpace: "nowrap", textAlign: "left" }}>
                  {item.timeLabel || item.title}
                </Button>
              ))}
              <Button size="small" startIcon={<AddRounded />} onClick={addPhase} sx={{ justifyContent: "flex-start", whiteSpace: "nowrap" }}>페이즈 추가</Button>
              <Button onClick={() => setView("fallback")} variant={view === "fallback" ? "contained" : "text"} sx={{ justifyContent: "flex-start", whiteSpace: "nowrap" }}>공통 예비 응답</Button>
            </Box>

            <Box sx={{ display: "grid", gap: 2, minWidth: 0 }}>
              {view === "prologue" && (
                <Section title="프롤로그">
                  <ScriptEditor label="시작 대사" value={content.prologue} additionalSpeakers={content.people} onChange={(lines) => update((next) => { next.prologue = lines; })} />
                </Section>
              )}
              {view === "fallback" && (
                <Section title="페이즈 응답이 없을 때의 공통 응답" action={<Button size="small" startIcon={<AddRounded />} onClick={() => update((next) => { next.fallbackAnswers = [...(next.fallbackAnswers ?? []), [""]]; })}>응답 추가</Button>}>
                  {(content.fallbackAnswers ?? []).map((answer, index) => (
                    <Accordion key={index} disableGutters slotProps={{ transition: { unmountOnExit: true } }} sx={{ bgcolor: "#121d19", color: "#f8edda" }}>
                      <AccordionSummary expandIcon={<ExpandMoreRounded sx={{ color: "#d9b77d" }} />}>응답 {index + 1}</AccordionSummary>
                      <AccordionDetails sx={{ display: "grid", gap: 1 }}>
                        <ScriptEditor label="대사" value={answer} additionalSpeakers={content.people} onChange={(lines) => update((next) => { next.fallbackAnswers![index] = lines; })} />
                        <Button color="error" size="small" onClick={() => update((next) => { next.fallbackAnswers!.splice(index, 1); })}>응답 삭제</Button>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Section>
              )}
              {view === "phase" && phase && (
                <>
                  <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 1 }}>
                    <Typography component="h2" sx={{ fontSize: 18, fontWeight: 800 }}>{phase.title}</Typography>
                    <Typography sx={{ color: "#b8ac98", fontSize: 12 }}>{phase.timeLabel} · 단서 {phase.sources.length} · 신문 {phase.interrogations.reduce((sum, item) => sum + item.questions.length, 0)}</Typography>
                  </Box>
                  <Box aria-label="페이즈 편집 항목" sx={{ display: "flex", flexWrap: "wrap", gap: .75, borderBottom: "1px solid rgba(231,201,148,.22)", pb: 1 }}>
                    {([
                      ["interrogation", "신문"],
                      ["dialogue", "대화"],
                      ["evidence", "단서"],
                      ["settings", "설정"],
                    ] as const).map(([area, label]) => (
                      <Button key={area} aria-pressed={phaseArea === area} variant={phaseArea === area ? "contained" : "text"} size="small" onClick={() => setPhaseArea(area)} sx={{ minWidth: 72 }}>{label}</Button>
                    ))}
                  </Box>

                  {phaseArea === "settings" && <Section title="페이즈" action={!phase.finalInterrogation && <Button color="error" size="small" onClick={deletePhase}>페이즈 삭제</Button>}>
                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 120px" }, gap: 1 }}>
                      <TextField size="small" label="페이즈 이름" value={phase.title} onChange={(event) => editPhase((next) => { next.title = event.target.value; })} />
                      <TextField size="small" label="시간" value={phase.timeLabel ?? ""} onChange={(event) => editPhase((next) => { next.timeLabel = event.target.value; })} />
                      <TextField size="small" type="number" label="에너지" value={phase.energyLimit ?? 4} onChange={(event) => editPhase((next) => { next.energyLimit = Number(event.target.value); })} />
                      <TextField size="small" label="지도 이미지 경로" value={phase.mapImage ?? ""} onChange={(event) => editPhase((next) => { next.mapImage = event.target.value; })} sx={{ gridColumn: "1 / -1" }} />
                    </Box>
                    <MapPreview phase={phase} sourceNumbers={sourceNumbers} people={visiblePeople} onMovePerson={(name, x, y) => {
                      editPhase((next) => {
                        const entry = next.people?.find((item) => item.name === name);
                        if (entry) { entry.x = x; entry.y = y; }
                      });
                    }} onMoveSource={(index, x, y) => {
                      const sourceId = phase.sources[index]?.evidence.id;
                      if (!sourceId) return;
                      editSharedSource(sourceId, (source) => {
                        source.base.x = x;
                        source.base.y = y;
                      }, true);
                    }} />
                  </Section>
                  }

                  {phaseArea === "interrogation" && <Section title={`기본 응답 · ${phase.fallbackAnswers?.length ?? 0}`} order={2} action={<Button size="small" startIcon={<AddRounded />} onClick={() => editPhase((next) => { next.fallbackAnswers ??= []; next.fallbackAnswers.push([""]); })}>응답 추가</Button>}>
                    {(phase.fallbackAnswers ?? []).map((answer, index) => (
                      <Accordion key={index} disableGutters slotProps={{ transition: { unmountOnExit: true } }} sx={{ bgcolor: "#121d19", color: "#f8edda" }}>
                        <AccordionSummary expandIcon={<ExpandMoreRounded sx={{ color: "#d9b77d" }} />}>응답 {index + 1}</AccordionSummary>
                        <AccordionDetails sx={{ display: "grid", gap: 1 }}>
                          <ScriptEditor label="신문 답변" value={answer} additionalSpeakers={content.people} onChange={(lines) => editPhase((next) => { next.fallbackAnswers![index] = lines; })} />
                          <Button color="error" size="small" sx={{ justifySelf: "end" }} onClick={() => editPhase((next) => { next.fallbackAnswers!.splice(index, 1); })}>응답 삭제</Button>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                    {!phase.fallbackAnswers?.length && <Typography sx={{ color: "#9b927f", fontSize: 12 }}>없으면 공통 기본 응답을 사용합니다.</Typography>}
                  </Section>
                  }

                  {phaseArea === "evidence" && <Section title={`공유 단서 · ${content.sharedSources?.length ?? 0}`} action={<Button size="small" startIcon={<AddRounded />} onClick={addSharedSource}>단서 추가</Button>}>
                    <Typography sx={{ color: "#b8ac98", fontSize: 12 }}>단서마다 표시할 페이즈와 내용이 바뀌기 시작하는 페이즈를 선택하세요. 위치는 각 페이즈의 설정 탭 지도에서 옮길 수 있습니다.</Typography>
                    {(content.sharedSources ?? []).map((source) => (
                      <SharedSourceEditor
                        key={source.id}
                        source={source}
                        phases={content.phases}
                        expanded={expandedSourceId === source.id}
                        onExpandedChange={(expanded) => setExpandedSourceId(expanded ? source.id : null)}
                        onChange={(changed) => editSharedSource(source.id, (item) => Object.assign(item, changed))}
                        onDelete={() => update((next) => { next.sharedSources = next.sharedSources?.filter((item) => item.id !== source.id); }, "all")}
                      />
                    ))}
                  </Section>
                  }

                  {phaseArea === "evidence" && phase.combinations.length > 0 && <Section title={`기존 단서 합성 · ${phase.combinations.length}`}>
                    {phase.combinations.map((combination, index) => (
                      <Accordion key={index} disableGutters slotProps={{ transition: { unmountOnExit: true } }} sx={{ bgcolor: "#121d19", color: "#f8edda" }}>
                        <AccordionSummary expandIcon={<ExpandMoreRounded sx={{ color: "#d9b77d" }} />}>{combination.result.title || `연결 ${index + 1}`}</AccordionSummary>
                        <AccordionDetails sx={{ display: "grid", gap: 1 }}>
                          <TextField size="small" label="연결 ID" value={combination.id} onChange={(event) => editPhase((next) => { next.combinations[index].id = event.target.value; }, "questions")} />
                          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 1 }}>
                            {[0, 1].map((inputIndex) => <TextField key={inputIndex} select size="small" label={`연결할 단서 ${inputIndex + 1}`} value={combination.evidenceIds[inputIndex]} onChange={(event) => editPhase((next) => { next.combinations[index].evidenceIds[inputIndex] = event.target.value; }, "questions")}>
                              {options.map((option) => <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>)}
                            </TextField>)}
                          </Box>
                          <TextField size="small" label="연결 설명" value={combination.explanation} onChange={(event) => editPhase((next) => { next.combinations[index].explanation = event.target.value; }, "questions")} multiline minRows={2} />
                          <EvidenceEditor value={combination.result} onChange={(value) => editPhase((next) => { next.combinations[index].result = value; }, "questions")} />
                          <Button color="error" size="small" sx={{ justifySelf: "end" }} onClick={() => editPhase((next) => { next.combinations.splice(index, 1); }, "questions")}>연결 삭제</Button>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </Section>}

                  {phaseArea === "dialogue" && <Section title="등장 인물">
                    <Typography sx={{ color: "#b8ac98", fontSize: 12 }}>이 페이즈에 보일 인물을 선택하세요. 위치는 설정 탭 지도에서 파란 표시를 끌어 옮깁니다.</Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {personCatalog.map((entry) => <FormControlLabel key={entry.name} control={<Checkbox size="small" checked={visibleNames.has(entry.name)} onChange={(event) => togglePhasePerson(entry.name, event.target.checked)} />} label={entry.name} sx={{ "& .MuiFormControlLabel-label": { fontSize: 13 } }} />)}
                    </Box>
                    <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1 }}>
                      <TextField size="small" label="새 인물 이름" value={newPersonName} onChange={(event) => setNewPersonName(event.target.value)} />
                      <TextField size="small" label="인물 이미지 경로" value={newPersonImage} onChange={(event) => setNewPersonImage(event.target.value)} placeholder="/image/..." />
                      <Button size="small" startIcon={<AddRounded />} onClick={addPerson}>인물 추가</Button>
                    </Box>
                    {(content.people ?? []).map((entry, index) => <Box key={entry.name} sx={{ display: "flex", flexWrap: "wrap", gap: 1, alignItems: "center" }}>
                      <Typography sx={{ minWidth: 100, fontSize: 13 }}>{entry.name}</Typography>
                      <TextField size="small" label="이미지 경로" value={entry.image ?? ""} onChange={(event) => update((next) => { next.people![index].image = event.target.value; })} />
                      <TextField size="small" label="인물 설명" value={entry.description ?? ""} onChange={(event) => update((next) => { next.people![index].description = event.target.value; })} sx={{ flexGrow: 1 }} />
                    </Box>)}
                  </Section>}

                  {phaseArea === "dialogue" && <Section title="시작 대사">
                    <ScriptEditor label="페이즈 시작 대사" value={phase.intro} additionalSpeakers={content.people} onChange={(lines) => editPhase((next) => { next.intro = lines; })} />
                  </Section>}

                  {(phaseArea === "dialogue" || phaseArea === "interrogation") && <Section title={phaseArea === "dialogue" ? "인물 대화" : "단서 신문"} order={1}>
                    <Stack direction="row" spacing={.75} sx={{ flexWrap: "wrap", gap: .75, "& > *": { marginLeft: "0 !important" } }}>
                      {visibleInterrogations.map((item) => <Button key={item.suspectName} variant={person?.suspectName === item.suspectName ? "contained" : "outlined"} size="small" onClick={() => { setPersonName(item.suspectName); setQuestionSearch(""); }} sx={{ whiteSpace: "nowrap" }}>{item.suspectName}{phaseArea === "interrogation" ? ` · ${(content.sharedQuestions ?? []).filter((question) => question.suspectName === item.suspectName).length}` : ""}</Button>)}
                    </Stack>
                    {person && (
                      <>
                        {phaseArea === "dialogue" && <>
                        <ScriptEditor label={`${person.suspectName} 기본 대화`} value={person.conversation} defaultSpeaker={person.suspectName} additionalSpeakers={content.people} onChange={(lines) => editPhase((next) => { next.interrogations[activePersonIndex].conversation = lines; })} />
                        <Box sx={{ display: "grid", gap: 1 }}>
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography sx={{ color: "#d9b77d", fontSize: 13, fontWeight: 800 }}>대화 선택지 · {person.conversationChoices?.length ?? 0}</Typography>
                            <Button size="small" startIcon={<AddRounded />} onClick={() => editPhase((next) => { next.interrogations[activePersonIndex].conversationChoices ??= []; next.interrogations[activePersonIndex].conversationChoices!.push({ id: newId("choice"), question: "", answer: [""] }); })}>선택지 추가</Button>
                          </Box>
                          {(person.conversationChoices ?? []).map((choice, index) => (
                            <Accordion key={index} disableGutters slotProps={{ transition: { unmountOnExit: true } }} sx={{ bgcolor: "#121d19", color: "#f8edda" }}>
                              <AccordionSummary expandIcon={<ExpandMoreRounded sx={{ color: "#d9b77d" }} />}>{choice.question || `선택지 ${index + 1}`}</AccordionSummary>
                              <AccordionDetails sx={{ display: "grid", gap: 1 }}>
                                <TextField size="small" label="선택지 ID" value={choice.id} onChange={(event) => editPhase((next) => { next.interrogations[activePersonIndex].conversationChoices![index].id = event.target.value; })} />
                                <TextField size="small" label="플레이어 질문" value={choice.question} onChange={(event) => editPhase((next) => { next.interrogations[activePersonIndex].conversationChoices![index].question = event.target.value; })} />
                                <ScriptEditor label="상대 답변" value={choice.answer} defaultSpeaker={person.suspectName} additionalSpeakers={content.people} onChange={(lines) => editPhase((next) => { next.interrogations[activePersonIndex].conversationChoices![index].answer = lines; })} />
                                <Button color="error" size="small" sx={{ justifySelf: "end" }} onClick={() => editPhase((next) => { next.interrogations[activePersonIndex].conversationChoices!.splice(index, 1); })}>선택지 삭제</Button>
                              </AccordionDetails>
                            </Accordion>
                          ))}
                        </Box>
                        </>}
                        {phaseArea === "interrogation" && (
                        <Box sx={{ display: "grid", gap: 1 }}>
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography sx={{ color: "#d9b77d", fontSize: 13, fontWeight: 800 }}>공유 신문 · {(content.sharedQuestions ?? []).filter((question) => question.suspectName === person.suspectName).length}</Typography>
                            <Button size="small" startIcon={<AddRounded />} onClick={addSharedQuestion}>신문 추가</Button>
                          </Box>
                          <Typography sx={{ color: "#b8ac98", fontSize: 12 }}>질문과 단서 조합은 공유하고, 필요한 페이즈의 답변만 바꿉니다.</Typography>
                          <TextField size="small" label="신문 검색" placeholder="질문 · 단서" value={questionSearch} onChange={(event) => setQuestionSearch(event.target.value)} />
                          {(content.sharedQuestions ?? []).filter((question) => question.suspectName === person.suspectName).map((question) => {
                            const searchText = [question.base.prompt, ...question.clueIds.map((id) => clueOptions.find((option) => option.id === id)?.label ?? id)].join(" ").toLocaleLowerCase();
                            if (questionSearch.trim() && !searchText.includes(questionSearch.trim().toLocaleLowerCase())) return null;
                            return (
                              <SharedQuestionEditor
                                key={question.id}
                                question={question}
                                phases={content.phases}
                                options={clueOptions}
                                speakers={content.people}
                                expanded={expandedQuestionId === question.id}
                                onExpandedChange={(expanded) => setExpandedQuestionId(expanded ? question.id : null)}
                                onChange={(changed) => editSharedQuestion(question.id, (item) => Object.assign(item, changed))}
                                onDelete={() => update((next) => { next.sharedQuestions = next.sharedQuestions?.filter((item) => item.id !== question.id); }, "questions")}
                                createEvidence={emptyEvidence}
                              />
                            );
                          })}
                        </Box>
                        )}
                      </>
                    )}
                  </Section>
                  }
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
