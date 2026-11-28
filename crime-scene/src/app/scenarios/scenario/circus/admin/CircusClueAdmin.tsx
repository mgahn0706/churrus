"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type MouseEvent as ReactMouseEvent } from "react";
import Image from "next/image";
import { Alert, Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import type { ClueType } from "@/types";
import { saveCircusCluePositions, type CluePosition } from "./actions";

type Place = "auditorium" | "indoor" | "outdoor";
type Position = Pick<CluePosition, "x" | "y">;
type Positions = Record<number, Position>;

const draftKey = "circus-clue-positions-v2";
const clamp = (value: number) => Math.max(0, Math.min(100, Number(value.toFixed(3))));

export default function CircusClueAdmin({ clues }: { clues: ClueType[] }) {
  const [place, setPlace] = useState<Place>("auditorium");
  const [selectedId, setSelectedId] = useState(clues[0]?.id ?? 0);
  const [positions, setPositions] = useState<Positions>(() =>
    Object.fromEntries(clues.map(({ id, x, y }) => [id, { x, y }])),
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
    setLoaded(true);
  }, [clues]);

  const changedCount = clues.filter((clue) =>
    positions[clue.id]?.x !== clue.x || positions[clue.id]?.y !== clue.y,
  ).length;

  useEffect(() => {
    if (!loaded) return;
    if (changedCount === 0) localStorage.removeItem(draftKey);
    else localStorage.setItem(draftKey, JSON.stringify(positions));
  }, [loaded, positions, changedCount]);

  const visibleClues = clues.filter((clue) => clue.place === place);
  const selected = clues.find((clue) => clue.id === selectedId);
  const selectedPosition = positions[selectedId];

  const updatePosition = (id: number, position: Position) => {
    setPositions((current) => ({ ...current, [id]: { x: clamp(position.x), y: clamp(position.y) } }));
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
    if (event.target !== event.currentTarget || !selected || selected.place !== place) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    updatePosition(selected.id, {
      x: (event.clientX - bounds.left) / bounds.width * 100,
      y: (event.clientY - bounds.top) / bounds.height * 100,
    });
  };

  const save = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const result = await saveCircusCluePositions(
        clues.map((clue) => ({ id: clue.id, ...positions[clue.id] })),
      );
      setMessage(result.ok
        ? { severity: "success", text: "단서 좌표를 src/fixtures/circus/clues.ts에 저장했습니다." }
        : { severity: "error", text: result.error ?? "저장하지 못했습니다." });
    } catch {
      setMessage({ severity: "error", text: "저장하지 못했습니다. 개발 서버 로그를 확인하세요." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100dvh", bgcolor: "#1e1615", color: "#fff7ed", p: { xs: 2, md: 3 } }}>
      <Box sx={{ maxWidth: 1500, mx: "auto" }}>
        <Stack direction={{ xs: "column", sm: "row" }} sx={{ justifyContent: "space-between", alignItems: { sm: "center" }, gap: 2, mb: 2 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>서커스 단서 위치 편집</Typography>
            <Typography variant="body2" sx={{ color: "#d9c7c0" }}>표식을 드래그하거나 지도를 클릭해 선택한 단서를 이동하세요.</Typography>
          </Box>
          <Stack direction="row" sx={{ gap: 1, alignItems: "center" }}>
            <Typography variant="body2">변경 {changedCount}개</Typography>
            <Button variant="contained" disabled={!loaded || changedCount === 0 || saving} onClick={save}>좌표 저장</Button>
          </Stack>
        </Stack>

        {message && <Alert severity={message.severity} sx={{ mb: 2 }}>{message.text}</Alert>}

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) 320px" }, gap: 2 }}>
          <Paper sx={{ p: 1.5, minWidth: 0 }}>
            <Stack direction="row" sx={{ gap: 1, mb: 1.5 }}>
              {(["auditorium", "indoor", "outdoor"] as const).map((item) => (
                <Button
                  key={item}
                  variant={place === item ? "contained" : "outlined"}
                  onClick={() => {
                    setPlace(item);
                    setSelectedId(clues.find((clue) => clue.place === item)?.id ?? 0);
                  }}
                >
                  {item === "auditorium" ? "공연장" : item === "indoor" ? "실내" : "실외"}
                </Button>
              ))}
            </Stack>
            <Box
              ref={mapRef}
              onClick={placeSelected}
              sx={{ position: "relative", aspectRatio: "16 / 9", width: "100%", bgcolor: "#211715", overflow: "hidden", cursor: "crosshair" }}
            >
              <Image
                src={`/image/scenario/circus/map/circus-${place}.png`}
                alt={`서커스 ${place === "auditorium" ? "공연장" : place === "indoor" ? "실내" : "실외"} 지도`}
                fill
                sizes="(max-width: 1200px) 100vw, 1100px"
                style={{ objectFit: "fill", pointerEvents: "none" }}
                priority
              />
              {visibleClues.map((clue) => {
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
              })}
            </Box>
            <Typography variant="caption" color="text.secondary">표식을 선택한 뒤 방향키로 0.5%, Shift+방향키로 2% 이동할 수 있습니다.</Typography>
          </Paper>

          <Paper sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2, maxHeight: { lg: "calc(100dvh - 140px)" } }}>
            {selected && selectedPosition && (
              <Box>
                <Typography sx={{ fontWeight: 700 }}>{selected.id}. {selected.title}</Typography>
                <Typography variant="caption" color="text.secondary">{selected.location ?? selected.place}</Typography>
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
                <Button size="small" sx={{ mt: 1 }} onClick={() => updatePosition(selected.id, { x: selected.x, y: selected.y })}>이 단서 원래 위치로</Button>
              </Box>
            )}
            <Box sx={{ overflowY: "auto", minHeight: 0 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>{place === "auditorium" ? "공연장" : place === "indoor" ? "실내" : "실외"} 단서 ({visibleClues.length})</Typography>
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
