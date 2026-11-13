import { Box, Typography } from "@mui/material";
import type { InterrogationMapLocation } from "@/types";

export default function ResearchMap({
  image,
  locations,
  onSelect,
}: {
  image?: string;
  locations: InterrogationMapLocation[];
  onSelect: (locationId: string) => void;
}) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "min(100%, 1500px)",
        aspectRatio: "16 / 9",
        minHeight: { xs: 420, md: 0 },
        mx: "auto",
        overflow: "hidden",
        border: "1px solid rgba(223,202,157,.5)",
        boxShadow: "0 28px 90px rgba(0,0,0,.7), inset 0 0 70px rgba(0,0,0,.55)",
        bgcolor: "#111b18",
        backgroundImage: image ? `url(${image})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
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
      <Typography
        sx={{
          position: "absolute",
          top: { xs: 18, md: 28 },
          left: { xs: 20, md: 36 },
          color: "#e9d6ac",
          fontSize: { xs: 13, md: 17 },
          letterSpacing: ".22em",
          fontWeight: 800,
          textShadow: "0 2px 14px #000",
        }}
      >
        INVESTIGATION MAP
      </Typography>
      {locations.map((location) => (
        <Box
          component="button"
          type="button"
          key={location.id}
          onClick={() => onSelect(location.id)}
          aria-label={`${location.title} 조사`}
          sx={{
            position: "absolute",
            left: `${location.x}%`,
            top: `${location.y}%`,
            transform: "translate(-50%, -50%)",
            border: 0,
            bgcolor: "transparent",
            color: "white",
            cursor: "pointer",
            display: "grid",
            justifyItems: "center",
            gap: 0.5,
            p: 1,
            minWidth: 100,
            "&:hover .map-marker, &:focus-visible .map-marker": {
              transform: "scale(1.2)",
              boxShadow: "0 0 0 9px rgba(240,191,103,.2), 0 0 28px #e9b86f",
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
              width: { xs: 22, md: 30 },
              height: { xs: 22, md: 30 },
              border: "3px solid #ffe3ad",
              borderRadius: "50%",
              bgcolor: "#9f642c",
              boxShadow: "0 0 0 7px rgba(240,191,103,.15), 0 0 20px #e9b86f",
              transition: "transform .18s ease, box-shadow .18s ease",
            }}
          />
          <Typography
            component="span"
            sx={{
              px: 1.4,
              py: 0.5,
              bgcolor: "rgba(3,9,8,.88)",
              border: "1px solid rgba(238,211,160,.7)",
              fontWeight: 800,
              fontSize: { xs: 12, md: 16 },
              whiteSpace: "nowrap",
              textShadow: "0 2px 6px #000",
            }}
          >
            {location.title}
          </Typography>
        </Box>
      ))}
      {locations.length === 0 && (
        <Typography
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            color: "#e6d2aa",
          }}
        >
          지도에 조사 장소를 추가해 주세요.
        </Typography>
      )}
    </Box>
  );
}
