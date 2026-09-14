import {
  ChevronLeftRounded,
  ChevronRightRounded,
  HomeRounded,
  OpenInNewRounded,
} from "@mui/icons-material";
import { Box, Button, Chip, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ADVENTURE_JOURNEYS } from "../fixtures";
import { AdventureCoordinate, AdventureJourney } from "../types";

const PAGE_BACKGROUND = "#05070D";
const PANEL_BACKGROUND = "rgba(11, 17, 29, 0.48)";
const MAP_VIEWBOX_HEIGHT = (2048 / 2454) * 100;
const SEASON_ORDER = { 여름: 0, 겨울: 1 } as const;
const SORTED_ADVENTURE_JOURNEYS = [...ADVENTURE_JOURNEYS].sort(
  (left, right) =>
    right.year - left.year ||
    SEASON_ORDER[left.season] - SEASON_ORDER[right.season]
);

const createRoutePath = (points: AdventureCoordinate[]) => {
  if (points.length === 0) {
    return "";
  }

  const commands = [`M ${points[0].x} ${points[0].y}`];
  points.slice(1).forEach((point, index) => {
    const previousPoint = points[index];
    const deltaX = point.x - previousPoint.x;
    const deltaY = point.y - previousPoint.y;
    const isMostlyHorizontal = Math.abs(deltaX) >= Math.abs(deltaY);
    const turnOffset =
      Math.min(1.8, Math.hypot(deltaX, deltaY) * 0.12) *
      (index % 2 === 0 ? 1 : -1);
    const firstTurn = isMostlyHorizontal
      ? {
          x: previousPoint.x + deltaX * 0.34,
          y: previousPoint.y + deltaY * 0.12 + turnOffset,
        }
      : {
          x: previousPoint.x + deltaX * 0.14 + turnOffset,
          y: previousPoint.y + deltaY * 0.34,
        };
    const secondTurn = isMostlyHorizontal
      ? {
          x: previousPoint.x + deltaX * 0.68,
          y: previousPoint.y + deltaY * 0.78 + turnOffset,
        }
      : {
          x: previousPoint.x + deltaX * 0.82 + turnOffset,
          y: previousPoint.y + deltaY * 0.66,
        };

    commands.push(
      `L ${firstTurn.x} ${firstTurn.y}`,
      `L ${secondTurn.x} ${secondTurn.y}`,
      `L ${point.x} ${point.y}`
    );
  });

  return commands.join(" ");
};

interface LabelBounds {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

const LABEL_VERTICAL_OFFSETS = [-1.6, 2.9, -4.7, 6, -7.8, 9] as const;

const getLabelWidth = (label: string) =>
  Array.from(label).reduce((width, character) => {
    if (character === " ") {
      return width + 0.8;
    }
    return width + (/[A-Za-z0-9]/.test(character) ? 1.25 : 2.05);
  }, 0.5);

const overlapsLabel = (candidate: LabelBounds, placed: LabelBounds[]) =>
  placed.some(
    (bounds) =>
      candidate.left < bounds.right + 0.6 &&
      candidate.right > bounds.left - 0.6 &&
      candidate.top < bounds.bottom + 0.5 &&
      candidate.bottom > bounds.top - 0.5
  );

interface JourneyMapProps {
  journey: AdventureJourney;
}

const JourneyMap = ({ journey }: JourneyMapProps) => {
  const renderStops = useMemo(() => {
    const placedLabels: LabelBounds[] = [];

    return journey.stops.map((stop) => {
      const x = stop.coordinate.x;
      const y = stop.coordinate.y * (MAP_VIEWBOX_HEIGHT / 100);
      const labelWidth = getLabelWidth(stop.name);
      const preferredAnchors: Array<"start" | "end"> =
        x > 58 ? ["end", "start"] : ["start", "end"];
      const candidates = LABEL_VERTICAL_OFFSETS.flatMap((verticalOffset) =>
        preferredAnchors.map((textAnchor) => {
          const labelX = x + (textAnchor === "start" ? 1.45 : -1.45);
          const labelY = y + verticalOffset;
          const bounds = {
            left: textAnchor === "start" ? labelX : labelX - labelWidth,
            right: textAnchor === "start" ? labelX + labelWidth : labelX,
            top: labelY - 2.25,
            bottom: labelY + 0.55,
          };
          return { labelX, labelY, textAnchor, bounds };
        })
      );
      const placement =
        candidates.find(
          ({ bounds }) =>
            bounds.left >= 1 &&
            bounds.right <= 99 &&
            bounds.top >= 1 &&
            bounds.bottom <= MAP_VIEWBOX_HEIGHT - 1 &&
            !overlapsLabel(bounds, placedLabels)
        ) ??
        candidates.find(
          ({ bounds }) =>
            bounds.left >= 1 &&
            bounds.right <= 99 &&
            bounds.top >= 1 &&
            bounds.bottom <= MAP_VIEWBOX_HEIGHT - 1
        ) ??
        candidates[0];

      placedLabels.push(placement.bounds);
      return { stop, x, y, ...placement };
    });
  }, [journey]);
  const renderRoute = useMemo(
    () =>
      renderStops.map(({ x, y }) => ({
        x,
        y,
      })),
    [renderStops]
  );
  const routePath = useMemo(() => createRoutePath(renderRoute), [renderRoute]);
  const firstStop = journey.stops[0];
  const finalStop = journey.stops[journey.stops.length - 1];
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: 0,
        borderRadius: { xs: "22px", md: "30px" },
        overflow: "hidden",
        border: "1px solid rgba(85, 246, 255, 0.18)",
        contain: "layout paint",
        background: `radial-gradient(circle at 76% 30%, ${journey.secondaryColor}18, transparent 36%), radial-gradient(circle at 36% 68%, ${journey.accentColor}12, transparent 38%), #070B12`,
        boxShadow:
          "0 40px 100px rgba(0, 0, 0, 0.52), inset 0 0 80px rgba(85, 246, 255, 0.04)",
      }}
    >
      <Image
        src="/image/seoul-map.png"
        alt="서울 지도 위 대이동 경로"
        fill
        priority
        sizes="(max-width: 900px) calc(100vw - 32px), 840px"
        style={{
          objectFit: "contain",
          filter: "grayscale(1) brightness(0.3) contrast(1.08)",
          opacity: 0.62,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.34,
          backgroundImage: `linear-gradient(${journey.accentColor}10 1px, transparent 1px), linear-gradient(90deg, ${journey.secondaryColor}12 1px, transparent 1px)`,
          backgroundSize: { xs: "26px 26px", md: "34px 34px" },
          maskImage:
            "radial-gradient(circle at center, black 30%, transparent 82%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 30%, transparent 82%)",
        }}
      />
      <Box
        component="svg"
        viewBox={`0 0 100 ${MAP_VIEWBOX_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          "@keyframes routeFlow": {
            from: { strokeDashoffset: 100 },
            to: { strokeDashoffset: 0 },
          },
          "& .route-flow": {
            animation: "routeFlow 6.8s linear infinite",
          },
          "& .map-label": {
            fontSize: { xs: "2.25px", sm: "1.8px", md: "1.52px" },
          },
          "@media (prefers-reduced-motion: reduce)": {
            "& .route-flow": {
              animationDuration: "12s",
            },
          },
        }}
      >
        <path
          d={routePath}
          fill="none"
          stroke={journey.accentColor}
          strokeWidth="4.5"
          opacity="0.08"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={routePath}
          fill="none"
          stroke={journey.accentColor}
          strokeWidth="1.4"
          opacity="0.46"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          key={journey.id}
          d={routePath}
          pathLength="100"
          fill="none"
          stroke={journey.accentColor}
          strokeWidth="2.4"
          strokeDasharray="24 76"
          opacity="0.92"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="route-flow"
        />
        {renderStops.map(({ stop, x, y, labelX, labelY, textAnchor }) => {
          const needsLeader = Math.abs(labelY - y) > 3.2;
          return (
            <g key={stop.id}>
              {needsLeader && (
                <line
                  x1={x}
                  y1={y}
                  x2={labelX + (textAnchor === "start" ? -0.45 : 0.45)}
                  y2={labelY - 0.5}
                  stroke={journey.accentColor}
                  strokeWidth="0.45"
                  opacity="0.42"
                  vectorEffect="non-scaling-stroke"
                />
              )}
              <rect
                x={x - 0.42}
                y={y - 0.42}
                width="0.84"
                height="0.84"
                rx="0.12"
                fill={journey.accentColor}
                transform={`rotate(45 ${x} ${y})`}
              />
              <text
                x={labelX}
                y={labelY}
                textAnchor={textAnchor}
                fill="#E4EDF0"
                stroke="#05070D"
                strokeWidth="0.72"
                strokeLinejoin="round"
                paintOrder="stroke"
                fontWeight="700"
                letterSpacing="-0.03em"
                className="map-label"
              >
                {stop.name}
              </text>
            </g>
          );
        })}
      </Box>
      <Box
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          pointerEvents: "none",
          top: "50%",
          bottom: "auto",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(85,246,255,0.12), transparent)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: { xs: 14, md: 22 },
          left: { xs: 14, md: 22 },
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 1.5,
          py: 0.8,
          borderRadius: "999px",
          bgcolor: "rgba(4, 8, 14, 0.38)",
          border: "1px solid rgba(85, 246, 255, 0.28)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 28px rgba(0,0,0,0.18)",
        }}
      >
        <Box
          sx={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            bgcolor: journey.accentColor,
            boxShadow: `0 0 14px ${journey.accentColor}`,
          }}
        />
        <Typography
          sx={{
            color: "#C9F9FF",
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: "0.16em",
          }}
        >
          ROUTE ARCHIVE
        </Typography>
      </Box>
      <Box
        sx={{
          display: { xs: "block", lg: "none" },
          position: "absolute",
          left: 14,
          right: 14,
          bottom: 14,
          px: 1.8,
          py: 1.3,
          borderRadius: "16px",
          background: `linear-gradient(135deg, ${journey.secondaryColor}24, rgba(10,18,28,0.48) 46%, ${journey.accentColor}14)`,
          border: `1px solid ${journey.accentColor}35`,
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.08), 0 14px 40px rgba(0,0,0,0.2)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 18,
            right: 18,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${journey.secondaryColor}, ${journey.accentColor}, transparent)`,
          }}
        />
        <Box>
          <Typography
            sx={{
              color: journey.accentColor,
              fontSize: 8,
              fontWeight: 800,
              letterSpacing: "0.16em",
            }}
          >
            ROUTE
          </Typography>
          <Box
            sx={{
              mt: 0.4,
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Typography sx={{ fontSize: 15, fontWeight: 800 }}>
              {firstStop?.name ?? "미정"}
            </Typography>
            <Typography sx={{ color: "#7E909A", fontSize: 9 }}>
              → {finalStop?.name ?? "미정"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default function AdventurePageContent() {
  const router = useRouter();
  const journeyTabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const journeyTabTouchStartRef = useRef<{ x: number; y: number } | null>(
    null
  );
  const [selectedJourneyId, setSelectedJourneyId] = useState(
    ADVENTURE_JOURNEYS[0].id
  );
  const selectedJourney =
    ADVENTURE_JOURNEYS.find((journey) => journey.id === selectedJourneyId) ??
    ADVENTURE_JOURNEYS[0];
  const selectedJourneyIndex = SORTED_ADVENTURE_JOURNEYS.findIndex(
    (journey) => journey.id === selectedJourney.id
  );
  const selectAdjacentJourney = (direction: -1 | 1) => {
    const adjacentJourney =
      SORTED_ADVENTURE_JOURNEYS[selectedJourneyIndex + direction];

    if (adjacentJourney) {
      setSelectedJourneyId(adjacentJourney.id);
    }
  };

  useEffect(() => {
    journeyTabRefs.current[selectedJourneyId]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }, [selectedJourneyId]);

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        bgcolor: PAGE_BACKGROUND,
        color: "#F2F8FA",
        overflowX: "hidden",
        overflowY: { xs: "auto", lg: "hidden" },
        position: "relative",
        backgroundImage:
          "radial-gradient(circle at 78% 18%, rgba(85,246,255,0.1), transparent 26%), radial-gradient(circle at 8% 70%, rgba(155,123,255,0.1), transparent 28%)",
        "&::before": {
          content: '""',
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.17,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 4px)",
        },
      }}
    >
      <Box
        component="header"
        sx={{
          width: "100%",
          maxWidth: 1440,
          mx: "auto",
          px: { xs: 2, md: 5 },
          height: { xs: 52, md: 58 },
          py: 1,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Button
          onClick={() => router.push("/")}
          startIcon={<HomeRounded />}
          sx={{
            color: "#D8E5E9",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.08em",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "999px",
            px: 1.8,
            bgcolor: "rgba(255,255,255,0.035)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)",
            "&:hover": { bgcolor: "rgba(85,246,255,0.1)" },
          }}
        >
          CHURRUS
        </Button>
      </Box>

      <Box
        component="main"
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          height: { xs: "auto", lg: "calc(100dvh - 58px)" },
          minHeight: { xs: "calc(100dvh - 52px)", lg: 0 },
          maxWidth: 1440,
          mx: "auto",
          px: { xs: 2, md: 5 },
          pb: { xs: 1.5, md: 2 },
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            pt: { xs: 1, md: 1.5 },
            pb: { xs: 1.5, md: 2 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) auto" },
            gap: { xs: 1.5, md: 4 },
            alignItems: "end",
            flexShrink: 0,
          }}
        >
          <Box>
            <Typography
              sx={{
                color: selectedJourney.accentColor,
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.32em",
                mb: 0.6,
              }}
            >
              CHURRUS ADVENTURE ARCHIVE
            </Typography>
            <Typography
              component="h1"
              sx={{
                m: 0,
                fontSize: { xs: 32, sm: 40, md: 48 },
                lineHeight: 1,
                letterSpacing: "-0.05em",
                fontWeight: 800,
                background: `linear-gradient(115deg, #FFFFFF 25%, ${selectedJourney.accentColor} 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              대이동
            </Typography>
            <Typography
              sx={{
                mt: 0.8,
                maxWidth: 590,
                color: "#93A4AE",
                fontSize: { xs: 11, md: 13 },
                lineHeight: 1.55,
                wordBreak: "keep-all",
                display: { xs: "none", sm: "block" },
              }}
            >
              서울 곳곳을 누비는 추러스 대이동.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              width: { xs: "100%", md: "min(720px, 55vw)" },
              maxWidth: "100%",
            }}
          >
            <IconButton
              aria-label="더 최근 대이동 보기"
              disabled={selectedJourneyIndex <= 0}
              onClick={() => selectAdjacentJourney(-1)}
              sx={{
                flexShrink: 0,
                width: 34,
                height: 34,
                color: "#9FB0B8",
                bgcolor: "rgba(255,255,255,0.045)",
                border: "1px solid rgba(255,255,255,0.09)",
                "&:hover": {
                  color: selectedJourney.accentColor,
                  bgcolor: `${selectedJourney.accentColor}12`,
                },
              }}
            >
              <ChevronLeftRounded />
            </IconButton>
            <Box
              role="tablist"
              aria-label="대이동 연도 선택"
              onTouchStart={(event) => {
                const touch = event.touches[0];
                journeyTabTouchStartRef.current = {
                  x: touch.clientX,
                  y: touch.clientY,
                };
              }}
              onTouchEnd={(event) => {
                const start = journeyTabTouchStartRef.current;
                const touch = event.changedTouches[0];
                journeyTabTouchStartRef.current = null;

                if (!start || !touch) {
                  return;
                }

                const horizontalDistance = touch.clientX - start.x;
                const verticalDistance = touch.clientY - start.y;
                if (
                  Math.abs(horizontalDistance) < 40 ||
                  Math.abs(horizontalDistance) <= Math.abs(verticalDistance)
                ) {
                  return;
                }

                selectAdjacentJourney(horizontalDistance < 0 ? 1 : -1);
              }}
              onTouchCancel={() => {
                journeyTabTouchStartRef.current = null;
              }}
              sx={{
                display: "flex",
                gap: 1,
                minWidth: 0,
                flex: 1,
                overflowX: "auto",
                py: 0.5,
                scrollbarWidth: "none",
                scrollBehavior: "smooth",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              {SORTED_ADVENTURE_JOURNEYS.map((journey) => {
                const isSelected = journey.id === selectedJourney.id;
                return (
                  <Button
                    key={journey.id}
                    ref={(element) => {
                      journeyTabRefs.current[journey.id] = element;
                    }}
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedJourneyId(journey.id)}
                    sx={{
                      minWidth: { xs: 84, md: 94 },
                      borderRadius: "12px",
                      px: 1.5,
                      py: 0.75,
                      color: isSelected
                        ? selectedJourney.accentColor
                        : "#6F808B",
                      bgcolor: isSelected
                        ? `${selectedJourney.accentColor}18`
                        : "rgba(255,255,255,0.035)",
                      border: "1px solid",
                      borderColor: isSelected
                        ? `${selectedJourney.accentColor}88`
                        : "rgba(255,255,255,0.08)",
                      fontWeight: 800,
                      boxShadow: isSelected
                        ? `inset 0 1px 0 ${selectedJourney.accentColor}30, 0 0 22px ${selectedJourney.accentColor}12`
                        : "inset 0 1px 0 rgba(255,255,255,0.04)",
                      "&:hover": {
                        bgcolor: isSelected
                          ? `${selectedJourney.accentColor}24`
                          : "rgba(255,255,255,0.07)",
                      },
                    }}
                  >
                    <Box>
                      <Typography
                        component="span"
                        sx={{
                          display: "block",
                          color: "inherit",
                          fontSize: 13,
                          fontWeight: 800,
                          lineHeight: 1.1,
                          letterSpacing: "0.08em",
                        }}
                      >
                        {journey.year}
                      </Typography>
                      <Typography
                        component="span"
                        sx={{
                          display: "block",
                          mt: 0.3,
                          color: "inherit",
                          opacity: isSelected ? 0.72 : 0.8,
                          fontSize: 10,
                          fontWeight: 800,
                          lineHeight: 1,
                          letterSpacing: "0.12em",
                        }}
                      >
                        {journey.season}
                      </Typography>
                    </Box>
                  </Button>
                );
              })}
            </Box>
            <IconButton
              aria-label="이전 대이동 보기"
              disabled={
                selectedJourneyIndex >= SORTED_ADVENTURE_JOURNEYS.length - 1
              }
              onClick={() => selectAdjacentJourney(1)}
              sx={{
                flexShrink: 0,
                width: 34,
                height: 34,
                color: "#9FB0B8",
                bgcolor: "rgba(255,255,255,0.045)",
                border: "1px solid rgba(255,255,255,0.09)",
                "&:hover": {
                  color: selectedJourney.accentColor,
                  bgcolor: `${selectedJourney.accentColor}12`,
                },
              }}
            >
              <ChevronRightRounded />
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) 360px" },
            gap: { xs: 2, lg: 2.5 },
            alignItems: "stretch",
            flex: 1,
            minHeight: 0,
            height: { xs: "auto", lg: "100%" },
            overflow: { xs: "visible", lg: "hidden" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
            }}
          >
            <Box
              sx={{
                flex: 1,
                minHeight: 0,
                height: {
                  xs: "clamp(360px, calc(100dvh - 210px), 580px)",
                  lg: "100%",
                },
              }}
            >
              <JourneyMap journey={selectedJourney} />
            </Box>
          </Box>

          <Box
            sx={{
              borderRadius: { xs: "22px", md: "30px" },
              bgcolor: PANEL_BACKGROUND,
              border: "1px solid rgba(255,255,255,0.08)",
              backgroundImage:
                "linear-gradient(145deg, rgba(255,255,255,0.045), transparent 42%)",
              backdropFilter: "blur(12px) saturate(125%)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.07), 0 24px 70px rgba(0,0,0,0.2)",
              p: { xs: 2, md: 2.5 },
              display: { xs: "none", lg: "flex" },
              flexDirection: "column",
              minHeight: 0,
              height: "100%",
              maxHeight: "100%",
              boxSizing: "border-box",
              overflowX: "hidden",
              overflowY: "scroll",
              overscrollBehavior: "contain",
              scrollbarGutter: "stable",
              scrollbarWidth: "thin",
              scrollbarColor: `${selectedJourney.accentColor}88 rgba(255,255,255,0.025)`,
              "&::-webkit-scrollbar": {
                width: 6,
              },
              "&::-webkit-scrollbar-track": {
                background: "rgba(255,255,255,0.025)",
                borderRadius: 999,
              },
              "&::-webkit-scrollbar-thumb": {
                background: `${selectedJourney.accentColor}88`,
                borderRadius: 999,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1.5,
              }}
            >
              <Typography
                component="h2"
                sx={{
                  minWidth: 0,
                  fontSize: { xs: 25, md: 28 },
                  lineHeight: 1.15,
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                }}
              >
                {selectedJourney.title}
              </Typography>
              {selectedJourney.meetingId && (
                <IconButton
                  aria-label={`${selectedJourney.title} 모임 페이지로 이동`}
                  onClick={() =>
                    router.push(`/meetings/${selectedJourney.meetingId}`)
                  }
                  sx={{
                    flexShrink: 0,
                    width: 34,
                    height: 34,
                    color: selectedJourney.accentColor,
                    bgcolor: `${selectedJourney.accentColor}10`,
                    border: `1px solid ${selectedJourney.accentColor}35`,
                    "&:hover": {
                      bgcolor: `${selectedJourney.accentColor}20`,
                      borderColor: `${selectedJourney.accentColor}70`,
                    },
                    "& svg": { fontSize: 17 },
                  }}
                >
                  <OpenInNewRounded />
                </IconButton>
              )}
            </Box>
            <Typography
              sx={{
                mt: 1.3,
                color: "#8798A3",
                fontSize: 13,
                lineHeight: 1.65,
                wordBreak: "keep-all",
              }}
            >
              {selectedJourney.subtitle}
            </Typography>
            <Box
              sx={{
                mt: 2.4,
                pt: 2,
                borderTop: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <Typography
                sx={{
                  color: selectedJourney.accentColor,
                  fontSize: 8,
                  fontWeight: 800,
                  letterSpacing: "0.15em",
                }}
              >
                FULL ROUTE
              </Typography>
              <Typography
                sx={{
                  mt: 0.6,
                  color: "#A9B7BE",
                  fontSize: 10,
                  lineHeight: 1.55,
                  wordBreak: "keep-all",
                }}
              >
                {selectedJourney.stops.map((stop) => stop.name).join(" → ")}
              </Typography>
            </Box>

            <Box
              sx={{
                mt: 2.6,
                pt: 2,
                borderTop: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <Typography
                sx={{
                  color: selectedJourney.accentColor,
                  fontSize: 8,
                  fontWeight: 800,
                  letterSpacing: "0.15em",
                }}
              >
                ROUTE DETAIL
              </Typography>
            </Box>
            <Box sx={{ mt: 1.5, pr: 0.5, flexShrink: 0 }}>
              {selectedJourney.stops.map((stop, index) => (
                <Box
                  key={stop.id}
                  sx={{
                    position: "relative",
                    display: "grid",
                    gridTemplateColumns: "16px minmax(0, 1fr)",
                    gap: 1.2,
                    pb: index === selectedJourney.stops.length - 1 ? 0 : 2.2,
                    "&::after":
                      index === selectedJourney.stops.length - 1
                        ? undefined
                        : {
                            content: '""',
                            position: "absolute",
                            left: 5,
                            top: 14,
                            bottom: 1,
                            width: "1px",
                            bgcolor: `${selectedJourney.accentColor}40`,
                          },
                  }}
                >
                  <Box
                    sx={{
                      width: 9,
                      height: 9,
                      mt: 0.45,
                      ml: 0.1,
                      borderRadius: "2px",
                      bgcolor: selectedJourney.accentColor,
                      transform: "rotate(45deg)",
                      boxShadow: `0 0 10px ${selectedJourney.accentColor}55`,
                      zIndex: 1,
                    }}
                  />
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 1,
                      }}
                    >
                      <Typography sx={{ fontSize: 13, fontWeight: 800 }}>
                        {stop.name}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#647680",
                          fontSize: 8,
                          fontWeight: 800,
                          letterSpacing: "0.1em",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {stop.area}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        color: "#71838D",
                        fontSize: 10,
                        mt: 0.4,
                        lineHeight: 1.45,
                      }}
                    >
                      {stop.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
