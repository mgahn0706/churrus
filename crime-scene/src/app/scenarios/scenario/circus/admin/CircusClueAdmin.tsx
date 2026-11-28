"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type MouseEvent as ReactMouseEvent } from "react";
import Image from "next/image";
import { Alert, Box, Button, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";
import type { ClueType } from "@/types";
import { applyCircusClueEdits, circusPlaces, serializeCircusClues, validateCircusClueEdits, type CircusClueEdit } from "@/fixtures/circus/clueEditor";
import { saveCircusClues } from "./actions";

type Place = "auditorium" | "indoor" | "outdoor";
type Tab = Place | "additional";
type Position = Pick<CircusClueEdit, "x" | "y">;
type Positions = Record<number, Position>;
type ClueMetadata = Pick<CircusClueEdit, "location" | "type" | "place">;
type Metadata = Record<number, ClueMetadata>;

const draftKey = "circus-clue-positions-v2";
const metadataDraftKey = "circus-clue-metadata-v1";
const clamp = (value: number) => Math.max(0, Math.min(100, Number(value.toFixed(3))));

export default function CircusClueAdmin({
  clues,
  canSaveToSource,
}: {
  clues: ClueType[];
  canSaveToSource: boolean;
}) {
  const [tab, setTab] = useState<Tab>("auditorium");
  const [selectedId, setSelectedId] = useState(clues.find((clue) => clue.type === "basic" && clue.place === "auditorium")?.id ?? 0);
  const [positions, setPositions] = useState<Positions>(() =>
    Object.fromEntries(clues.map(({ id, x, y }) => [id, { x, y }])),
  );
  const [metadata, setMetadata] = useState<Metadata>(() =>
    Object.fromEntries(clues.map(({ id, location, type, place }) => [id, { location, type, place }])),
  );
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ severity: "success" | "error"; text: string } | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ id: number; pointerId: number; offsetX: number; offsetY: number } | null>(null);

  useEffect(() => {
    try {
      const draft = JSON.parse(localStorage.getItem(draftKey) ?? "null") as Positions | null;
      if (draft && typeof draft === "object") {
        setPositions((current) => {
          const next = { ...current };
          for (const clue of clues) {
            const position = draft[clue.id];
            if (position && Number.isFinite(position.x) && Number.isFinite(position.y)) {
              next[clue.id] = { x: clamp(position.x), y: clamp(position.y) };
            }
          }
          return next;
        });
      }
    } catch {
      localStorage.removeItem(draftKey);
    }
    try {
      const draft = JSON.parse(localStorage.getItem(metadataDraftKey) ?? "null") as Metadata | null;
      if (draft && typeof draft === "object") {
        setMetadata((current) => {
          const next = { ...current };
          for (const clue of clues) {
            const entry = draft[clue.id];
            if (!entry || (entry.type !== "basic" && entry.type !== "additional")) continue;
            next[clue.id] = {
              location: typeof entry.location === "string" ? entry.location : undefined,
              type: entry.type,
              place: entry.place,
            };
          }
          return next;
        });
      }
    } catch {
      localStorage.removeItem(metadataDraftKey);
    }
    setLoaded(true);
  }, [clues]);

  const edits: CircusClueEdit[] = clues.map((clue) => ({
    id: clue.id,
    x: positions[clue.id]?.x ?? clue.x,
    y: positions[clue.id]?.y ?? clue.y,
    location: metadata[clue.id]?.location,
    type: metadata[clue.id]?.type ?? clue.type,
    place: metadata[clue.id]?.place ?? clue.place,
  }));
  const editedClues = applyCircusClueEdits(clues, edits);
  const changedCount = editedClues.filter((clue, index) =>
    clue.x !== clues[index].x || clue.y !== clues[index].y ||
    clue.location !== clues[index].location || clue.type !== clues[index].type ||
    clue.place !== clues[index].place,
  ).length;

  useEffect(() => {
    if (!loaded) return;
    if (changedCount === 0) {
      localStorage.removeItem(draftKey);
      localStorage.removeItem(metadataDraftKey);
    } else {
      localStorage.setItem(draftKey, JSON.stringify(positions));
      localStorage.setItem(metadataDraftKey, JSON.stringify(metadata));
    }
  }, [loaded, positions, metadata, changedCount]);

  const visibleClues = editedClues.filter((clue) =>
    tab === "additional" ? clue.type === "additional" : clue.type === "basic" && clue.place === tab,
  );
  const selected = editedClues.find((clue) => clue.id === selectedId);
  const originalSelected = clues.find((clue) => clue.id === selectedId);
  const selectedPosition = positions[selectedId];
  const parentClue = selected?.type === "additional"
    ? editedClues.find((clue) => clue.id === selected.place)
    : undefined;
  const previewClues = parentClue
    ? editedClues.filter((clue) => clue.type === "additional" && clue.place === parentClue.id)
    : [];
  const availableParents = editedClues.filter((candidate) => {
    if (candidate.id === selectedId) return false;
    const visited = new Set<number>();
    let current: ClueType | undefined = candidate;
    while (current?.type === "additional" && typeof current.place === "number") {
      if (current.place === selectedId || visited.has(current.place)) return false;
      visited.add(current.place);
      current = editedClues.find((clue) => clue.id === current?.place);
    }
    return true;
  });

  const updatePosition = (id: number, position: Position) => {
    setPositions((current) => ({ ...current, [id]: { x: clamp(position.x), y: clamp(position.y) } }));
    setMessage(null);
  };

  const updateMetadata = (id: number, value: ClueMetadata) => {
    setMetadata((current) => ({ ...current, [id]: value }));
    setMessage(null);
  };

  const startDrag = (event: ReactPointerEvent<HTMLButtonElement>, id: number) => {
    const bounds = mapRef.current?.getBoundingClientRect();
    const position = positions[id];
    if (!bounds || !position) return;
    dragRef.current = {
      id,
      pointerId: event.pointerId,
      offsetX: event.clientX - bounds.left - position.x / 100 * bounds.width,
      offsetY: event.clientY - bounds.top - position.y / 100 * bounds.height,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setSelectedId(id);
  };

  const moveDrag = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const bounds = mapRef.current?.getBoundingClientRect();
    const drag = dragRef.current;
    if (!bounds || !drag || drag.pointerId !== event.pointerId) return;
    updatePosition(drag.id, {
      x: (event.clientX - bounds.left - drag.offsetX) / bounds.width * 100,
      y: (event.clientY - bounds.top - drag.offsetY) / bounds.height * 100,
    });
  };

  const placeSelected = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || !selected ||
      (tab === "additional" ? selected.type !== "additional" : selected.place !== tab)) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    updatePosition(selected.id, {
      x: (event.clientX - bounds.left) / bounds.width * 100,
      y: (event.clientY - bounds.top) / bounds.height * 100,
    });
  };

  const save = async () => {
    const error = validateCircusClueEdits(clues, edits);
    if (error) {
      setMessage({ severity: "error", text: error });
      return;
    }
    setSaving(true);
    setMessage(null);
    try {
      const result = await saveCircusClues(edits);
      setMessage(result.ok
        ? { severity: "success", text: "단서 변경사항을 src/fixtures/circus/clues.ts에 저장했습니다." }
        : { severity: "error", text: result.error ?? "저장하지 못했습니다." });
    } catch {
      setMessage({ severity: "error", text: "저장하지 못했습니다. 개발 서버 로그를 확인하세요." });
    } finally {
      setSaving(false);
    }
  };

  const downloadFixture = () => {
    const error = validateCircusClueEdits(clues, edits);
    if (error) {
      setMessage({ severity: "error", text: error });
      return;
    }
    const source = serializeCircusClues(editedClues);
    const url = URL.createObjectURL(new Blob([source], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "clues.ts";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage({ severity: "success", text: "clues.ts를 다운로드했습니다. 저장소의 서커스 단서 파일을 교체한 뒤 배포하세요." });
  };

  const renderMarker = (clue: ClueType) => {
    const position = positions[clue.id] ?? clue;
    return (
      <Button
        key={clue.id}
        size="small"
        variant="contained"
        title={`${clue.id}. ${clue.title}`}
        aria-label={`${clue.id}번 ${clue.title} 위치 이동`}
        onPointerDown={(event) => startDrag(event, clue.id)}
        onPointerMove={moveDrag}
        onPointerUp={(event) => { if (dragRef.current?.pointerId === event.pointerId) dragRef.current = null; }}
        onPointerCancel={() => { dragRef.current = null; }}
        onKeyDown={(event) => {
          const step = event.shiftKey ? 2 : 0.5;
          const delta = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[event.key];
          if (!delta) return;
          event.preventDefault();
          setSelectedId(clue.id);
          updatePosition(clue.id, { x: position.x + delta[0], y: position.y + delta[1] });
        }}
        sx={{
          position: "absolute", left: `${position.x}%`, top: `${position.y}%`,
          minWidth: 32, height: 32, p: 0.5, borderRadius: "50%",
          bgcolor: clue.id === selectedId ? "#facc15" : "#991b1b",
          color: clue.id === selectedId ? "#211715" : "white",
          border: "2px solid white", boxShadow: "0 1px 8px #000",
          cursor: "grab", touchAction: "none", zIndex: clue.id === selectedId ? 2 : 1,
          "&:hover": { bgcolor: clue.id === selectedId ? "#fde047" : "#b91c1c" },
        }}
      >
        {clue.id}
      </Button>
    );
  };

  return (
    <Box sx={{ minHeight: "100dvh", bgcolor: "#1e1615", color: "#fff7ed", p: { xs: 2, md: 3 } }}>
      <Box sx={{ maxWidth: 1500, mx: "auto" }}>
        <Stack direction={{ xs: "column", sm: "row" }} sx={{ justifyContent: "space-between", alignItems: { sm: "center" }, gap: 2, mb: 2 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>서커스 단서 편집</Typography>
            <Typography variant="body2" sx={{ color: "#d9c7c0" }}>지도에서 표식을 옮기고, 오른쪽에서 위치와 단서 종류를 편집하세요.</Typography>
          </Box>
          <Stack direction="row" sx={{ gap: 1, alignItems: "center" }}>
            <Typography variant="body2">변경 {changedCount}개</Typography>
            {canSaveToSource ? (
              <Button variant="contained" disabled={!loaded || changedCount === 0 || saving} onClick={save}>변경 저장</Button>
            ) : (
              <Button variant="contained" disabled={!loaded || changedCount === 0} onClick={downloadFixture}>clues.ts 다운로드</Button>
            )}
          </Stack>
        </Stack>

        {!canSaveToSource && (
          <Alert severity="info" sx={{ mb: 2 }}>
            이 페이지의 변경은 현재 브라우저에 임시 저장됩니다. 모든 플레이어에게 적용하려면 clues.ts를 다운로드해 저장소에 반영하고 다시 배포하세요.
          </Alert>
        )}
        {message && <Alert severity={message.severity} sx={{ mb: 2 }}>{message.text}</Alert>}

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) 320px" }, gap: 2 }}>
          <Paper sx={{ p: 1.5, minWidth: 0 }}>
            <Stack direction="row" sx={{ gap: 1, mb: 1.5 }}>
              {(["auditorium", "indoor", "outdoor", "additional"] as const).map((item) => (
                <Button
                  key={item}
                  variant={tab === item ? "contained" : "outlined"}
                  onClick={() => {
                    setTab(item);
                    setSelectedId(editedClues.find((clue) => item === "additional"
                      ? clue.type === "additional"
                      : clue.type === "basic" && clue.place === item)?.id ?? 0);
                  }}
                >
                  {item === "auditorium" ? "공연장" : item === "indoor" ? "실내" : item === "outdoor" ? "실외" : "추가 단서"}
                </Button>
              ))}
            </Stack>
            {tab === "additional" ? (
              <Box
                ref={mapRef}
                onClick={placeSelected}
                sx={{ position: "relative", aspectRatio: "16 / 9", bgcolor: "#eee7df", overflow: "hidden", cursor: "crosshair" }}
              >
                {parentClue ? (
                  <>
                    <Box sx={{ position: "absolute", left: "4%", top: "13%", width: "32%", aspectRatio: "1", pointerEvents: "none" }}>
                      <Image src={parentClue.image} alt={`${parentClue.title} 단서 이미지`} fill sizes="(max-width: 1200px) 32vw, 360px" style={{ objectFit: "contain" }} />
                    </Box>
                    <Box sx={{ position: "absolute", left: "45%", top: "22%", width: "48%", pointerEvents: "none" }}>
                      <Typography sx={{ fontWeight: 800 }}>{parentClue.id}. {parentClue.title}</Typography>
                      <Typography variant="body2" sx={{ mt: 1, whiteSpace: "pre-line", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 5, WebkitBoxOrient: "vertical" }}>
                        {parentClue.description}
                      </Typography>
                    </Box>
                    {previewClues.map(renderMarker)}
                  </>
                ) : (
                  <Typography sx={{ position: "absolute", left: "10%", top: "45%" }}>추가 단서를 선택하고 상위 단서를 지정하세요.</Typography>
                )}
              </Box>
            ) : <Box
              ref={mapRef}
              onClick={placeSelected}
              sx={{ position: "relative", aspectRatio: "16 / 9", width: "100%", bgcolor: "#211715", overflow: "hidden", cursor: "crosshair" }}
            >
              <Image
                src={`/image/scenario/circus/map/circus-${tab}.png`}
                alt={`서커스 ${tab === "auditorium" ? "공연장" : tab === "indoor" ? "실내" : "실외"} 지도`}
                fill
                sizes="(max-width: 1200px) 100vw, 1100px"
                style={{ objectFit: "fill", pointerEvents: "none" }}
                priority
              />
              {visibleClues.map(renderMarker)}
            </Box>}
            <Typography variant="caption" color="text.secondary">표식을 드래그하거나 빈 곳을 클릭해 이동하세요. 방향키는 0.5%, Shift+방향키는 2%씩 이동합니다.</Typography>
          </Paper>

          <Paper sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2, maxHeight: { lg: "calc(100dvh - 140px)" } }}>
            {selected && selectedPosition && (
              <Box>
                <Typography sx={{ fontWeight: 700 }}>{selected.id}. {selected.title}</Typography>
                <Stack sx={{ gap: 1.5, mt: 1.5 }}>
                  <TextField
                    label="위치 설명"
                    size="small"
                    fullWidth
                    value={selected.location ?? ""}
                    onChange={(event) => updateMetadata(selected.id, {
                      location: event.target.value || undefined,
                      type: selected.type,
                      place: selected.place,
                    })}
                  />
                  <TextField
                    select
                    label="단서 종류"
                    size="small"
                    fullWidth
                    value={selected.type}
                    onChange={(event) => {
                      const type = event.target.value as ClueType["type"];
                      const nextPlace = type === "basic"
                        ? (tab === "additional" ? "auditorium" : tab)
                        : (availableParents[0]?.id ?? selected.id);
                      updateMetadata(selected.id, { location: selected.location, type, place: nextPlace });
                      setTab(type === "basic" ? nextPlace as Place : "additional");
                    }}
                  >
                    <MenuItem value="basic">기본 단서 (지도)</MenuItem>
                    <MenuItem value="additional">추가 단서 (상위 단서)</MenuItem>
                  </TextField>
                  <TextField
                    select
                    label={selected.type === "basic" ? "지도" : "상위 단서"}
                    size="small"
                    fullWidth
                    value={selected.place}
                    onChange={(event) => {
                      const place = selected.type === "basic" ? event.target.value : Number(event.target.value);
                      updateMetadata(selected.id, { location: selected.location, type: selected.type, place });
                      if (selected.type === "basic") setTab(place as Place);
                    }}
                  >
                    {selected.type === "basic"
                      ? circusPlaces.map((place) => <MenuItem key={place} value={place}>{place === "auditorium" ? "공연장" : place === "indoor" ? "실내" : "실외"}</MenuItem>)
                      : availableParents.map((clue) => <MenuItem key={clue.id} value={clue.id}>{clue.id}. {clue.title}</MenuItem>)}
                  </TextField>
                </Stack>
                <Stack direction="row" sx={{ gap: 1, mt: 1.5 }}>
                  {(["x", "y"] as const).map((axis) => (
                    <TextField
                      key={axis}
                      label={axis.toUpperCase() + " (%)"}
                      type="number"
                      size="small"
                      value={selectedPosition[axis]}
                      slotProps={{ htmlInput: { min: 0, max: 100, step: 0.1 } }}
                      onChange={(event) => {
                        const value = Number(event.target.value);
                        if (Number.isFinite(value)) updatePosition(selected.id, { ...selectedPosition, [axis]: value });
                      }}
                    />
                  ))}
                </Stack>
                <Button size="small" sx={{ mt: 1 }} onClick={() => {
                  if (!originalSelected) return;
                  updatePosition(selected.id, { x: originalSelected.x, y: originalSelected.y });
                  updateMetadata(selected.id, {
                    location: originalSelected.location,
                    type: originalSelected.type,
                    place: originalSelected.place,
                  });
                  setTab(originalSelected.type === "basic" ? originalSelected.place as Place : "additional");
                }}>이 단서 원래 값으로</Button>
              </Box>
            )}
            <Box sx={{ overflowY: "auto", minHeight: 0 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>{tab === "auditorium" ? "공연장" : tab === "indoor" ? "실내" : tab === "outdoor" ? "실외" : "추가"} 단서 ({visibleClues.length})</Typography>
              <Stack sx={{ gap: 0.5 }}>
                {visibleClues.map((clue) => (
                  <Button
                    key={clue.id}
                    variant={selectedId === clue.id ? "contained" : "text"}
                    onClick={() => setSelectedId(clue.id)}
                    sx={{ justifyContent: "flex-start", textAlign: "left" }}
                  >
                    {clue.id}. {clue.title}
                  </Button>
                ))}
              </Stack>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
