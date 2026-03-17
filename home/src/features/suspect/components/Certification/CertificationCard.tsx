import { CertificationCardType } from "@/features/suspect/types";
import { Box, Chip, Typography } from "@mui/material";
import { useMemo, useState } from "react";

export default function CertificationCard({
  card,
  onClick,
}: {
  card: CertificationCardType;
  onClick?: () => void;
}) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const formattedDate = useMemo(
    () => card.historyLabel ?? card.date,
    [card.date, card.historyLabel]
  );

  return (
    <Box
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setRotation({ x: 0, y: 0 });
      }}
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const offsetX = event.clientX - bounds.left;
        const offsetY = event.clientY - bounds.top;
        const rotateY = ((offsetX / bounds.width) - 0.5) * 18;
        const rotateX = (0.5 - offsetY / bounds.height) * 18;

        setRotation({ x: rotateX, y: rotateY });
      }}
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: 360,
        aspectRatio: "5 / 7",
        borderRadius: "24px",
        overflow: "hidden",
        cursor: "pointer",
        transformStyle: "preserve-3d",
        transform: `perspective(1400px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.02 : 1})`,
        transition: "transform 180ms ease, box-shadow 180ms ease",
        boxShadow: isHovered
          ? `0 0 28px ${card.color}88, 0 30px 90px ${card.color}66`
          : `0 0 14px ${card.color}44, 0 18px 50px rgba(0,0,0,0.45)`,
        background: `
          linear-gradient(145deg, rgba(255,255,255,0.2), rgba(255,255,255,0.02) 32%, rgba(0,0,0,0.2)),
          radial-gradient(circle at top left, ${card.color}88, transparent 38%),
          #10131a
        `,
        border: "1px solid rgba(255,255,255,0.18)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${card.image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          filter: "saturate(1.2)",
          opacity: 0.52,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(180deg, rgba(8,10,18,0.04) 0%, rgba(8,10,18,0.58) 48%, rgba(8,10,18,0.95) 100%),
            linear-gradient(130deg, ${card.color}77, transparent 42%)
          `,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 20%, ${card.color}33, transparent 32%)`,
          filter: "blur(18px)",
          opacity: 0.85,
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: "-20%",
          background: `linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.42) 45%, transparent 60%)`,
          transform: `translateX(${isHovered ? "26%" : "-34%"}) rotate(8deg)`,
          transition: "transform 450ms ease",
          pointerEvents: "none",
          opacity: 0.8,
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 2.5,
          pb: 4,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap={1}>
          <Chip
            label={card.isSuccess ? "CASE SOLVED" : "CASE CLOSED"}
            sx={{
              bgcolor: card.isSuccess ? "rgba(255,255,255,0.9)" : "rgba(18,24,37,0.8)",
              color: card.isSuccess ? "#111" : "#fff",
              fontWeight: 800,
              letterSpacing: "0.08em",
            }}
          />
          <Typography color="rgba(255,255,255,0.9)" fontSize={12} fontWeight={700}>
            #{card.scenarioId.toUpperCase()}
          </Typography>
        </Box>

        <Box>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.72)",
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            Churrus Detective Certification
          </Typography>
          <Typography
            sx={{
              color: "white",
              fontSize: { xs: 26, md: 30 },
              fontWeight: 900,
              lineHeight: 1.08,
              mb: 1.5,
              textShadow: "0 6px 20px rgba(0,0,0,0.35)",
            }}
          >
            {card.title}
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.82)",
              fontSize: 14,
              lineHeight: 1.6,
              minHeight: 96,
            }}
          >
            {card.description}
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.68)",
              fontSize: 12,
              mt: 2,
              letterSpacing: "0.04em",
            }}
          >
            Solved on {formattedDate}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
