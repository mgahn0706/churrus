import { Box, Typography } from "@mui/material";
import { evidenceInstanceId } from "@/features/interrogation/engine";
import type { InterrogationMapLocation, InterrogationSource } from "@/types";

const psychicPersonPositions: Record<string, { x: number; y: number }> = {
  "실험체 A": { x: 9, y: 77 },
  "실험체 B": { x: 23, y: 77 },
  "실험체 C": { x: 37, y: 77 },
  "김짜장": { x: 63, y: 29 },
};

export default function ResearchMap({
  image,
  locations,
  sources,
  people,
  collectedEvidenceIds,
  phaseId,
  onSelect,
  onSelectPerson,
}: {
  image?: string;
  locations: InterrogationMapLocation[];
  sources: InterrogationSource[];
  people: { name: string; image?: string }[];
  collectedEvidenceIds: string[];
  phaseId: string;
  onSelect: (source: InterrogationSource) => void;
  onSelectPerson: (name: string) => void;
}) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        bgcolor: "#111b18",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: -24,
          backgroundImage: image ? `url(${image})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(18px) brightness(.35)",
          opacity: .45,
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "min(125%, 177.777dvh)", md: "min(100%, 177.777dvh)" },
          aspectRatio: "16 / 9",
          backgroundImage: image ? `url(${image})` : undefined,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          boxShadow: "0 0 40px rgba(0,0,0,.4)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(3,8,7,.2), transparent 45%, rgba(3,8,7,.35))",
            pointerEvents: "none",
          }}
        />
        {sources.map((source) => {
          const location = locations.find((item) => item.id === source.locationId);
          const siblings = sources.filter((item) => item.locationId === source.locationId);
          const spread = siblings.indexOf(source) - (siblings.length - 1) / 2;
          const x = source.x ?? (location?.x ?? 50) + spread * 8;
          const y = source.y ?? (location?.y ?? 50) + spread * 12;
          const collected = collectedEvidenceIds.includes(evidenceInstanceId(phaseId, source.evidence.id));
          return (
            <Box
            component="button"
            type="button"
            key={source.id}
            onClick={() => onSelect(source)}
            aria-label={`${source.title}, ${collected ? "다시 보기" : "조사"}`}
            sx={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-50%, -50%)",
              border: 0,
              bgcolor: "transparent",
              color: "white",
              cursor: "pointer",
              display: "grid",
              justifyItems: "center",
              gap: .5,
              p: .5,
              minWidth: 56,
              minHeight: 44,
              "&:hover .map-marker, &:focus-visible .map-marker": {
                transform: "scale(1.25)",
                boxShadow: "0 0 0 5px rgba(240,191,103,.2), 0 0 14px #e9b86f",
              },
              "&:focus-visible": {
                outline: "2px solid #ffdd9a",
                outlineOffset: 4,
              },
            }}
          >
            <Box
              className="map-marker"
              sx={{
                position: "relative",
                width: { xs: 9, md: 11 },
                height: { xs: 9, md: 11 },
                border: "2px solid #ffe3ad",
                borderRadius: "50%",
                bgcolor: collected ? "#65736b" : "#d9a465",
                boxShadow: "0 0 0 3px rgba(240,191,103,.14), 0 0 10px #e9b86f",
                transition: "transform .18s ease, box-shadow .18s ease",
                ...(!collected && {
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    inset: -3,
                    border: "1px solid #ffe3ad",
                    borderRadius: "50%",
                    animation: "investigationPulse 2.4s ease-out infinite",
                  },
                }),
                "@keyframes investigationPulse": {
                  "0%": { transform: "scale(.8)", opacity: .8 },
                  "100%": { transform: "scale(1.5)", opacity: 0 },
                },
              }}
            />
            <Typography
              component="span"
              sx={{
                px: .8,
                py: .3,
                bgcolor: "rgba(3,9,8,.88)",
                fontWeight: 700,
                fontSize: { xs: 10, md: 12 },
                whiteSpace: "nowrap",
              }}
            >
              {source.title}
            </Typography>
            </Box>
          );
        })}
        {people.map((person, index) => {
          const position = psychicPersonPositions[person.name] ?? [
            { x: 34, y: 36 },
            { x: 52, y: 62 },
            { x: 68, y: 36 },
            { x: 43, y: 22 },
          ][index] ?? { x: 50, y: 50 };
          return (
            <Box
              component="button"
              type="button"
              key={person.name}
              onClick={() => onSelectPerson(person.name)}
              aria-label={`${person.name}와 대화`}
              sx={{
                position: "absolute",
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: "translate(-50%, -50%)",
                border: 0,
                bgcolor: "transparent",
                color: "#fff",
                cursor: "pointer",
                display: "grid",
                justifyItems: "center",
                gap: .5,
                p: .5,
                minWidth: 56,
                minHeight: 44,
                "&:focus-visible": { outline: "2px solid #ffdd9a", outlineOffset: 4 },
                "&:hover .person-portrait, &:focus-visible .person-portrait": {
                  transform: "scale(1.08)",
                  borderColor: "#f1d19a",
                },
              }}
            >
              <Box
                component="img"
                className="person-portrait"
                src={person.image}
                alt=""
                sx={{
                  width: { xs: 42, md: 62 },
                  height: { xs: 42, md: 62 },
                  objectFit: "cover",
                  objectPosition: "center 22%",
                  border: "2px solid rgba(224,240,232,.78)",
                  borderRadius: "50%",
                  bgcolor: "#1a2421",
                  boxShadow: "0 2px 10px rgba(0,0,0,.6)",
                  transition: "transform .18s ease, border-color .18s ease",
                }}
              />
              <Typography component="span" sx={{ px: .8, py: .3, bgcolor: "rgba(3,9,8,.88)", fontWeight: 700, fontSize: { xs: 10, md: 12 }, whiteSpace: "nowrap" }}>
                {person.name}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
