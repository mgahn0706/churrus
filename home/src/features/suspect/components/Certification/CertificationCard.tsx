import { CertificationCardType } from "@/features/suspect/types";
import { Box, Typography } from "@mui/material";
import { useState } from "react";

export default function CertificationCard({
  card,
  onClick,
}: {
  card: CertificationCardType;
  onClick?: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const solvedLabel = card.historyLabel ?? card.date;

  return (
    <Box
      onClick={() => {
        setIsFlipped((previous) => !previous);
        onClick?.();
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: 360,
        aspectRatio: "5 / 7",
        borderRadius: "20px",
        cursor: "pointer",
        perspective: "1400px",
        transform: `translateY(${isHovered ? "-4px" : "0px"}) scale(${isHovered ? 1.01 : 1})`,
        transition: "transform 180ms ease, box-shadow 180ms ease",
        boxShadow: isHovered
          ? `0 0 24px ${card.color}33, 0 24px 56px rgba(0,0,0,0.28)`
          : `0 0 10px ${card.color}22, 0 14px 36px rgba(0,0,0,0.22)`,
      }}
    >
      <Box
        sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: "20px",
        overflow: "hidden",
        backgroundColor: "#111",
        border: "1px solid rgba(255,255,255,0.16)",
      }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${card.posterImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            opacity: isFlipped ? 0 : 1,
            transform: `scale(${isFlipped ? 0.98 : 1})`,
            transition: "opacity 220ms ease, transform 220ms ease",
            pointerEvents: isFlipped ? "none" : "auto",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.08), transparent 18%, transparent 82%, rgba(0,0,0,0.16))",
              pointerEvents: "none",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: "-18%",
              background:
                "linear-gradient(115deg, transparent 36%, rgba(255,255,255,0.18) 49%, transparent 62%)",
              transform: `translateX(${isHovered ? "18%" : "-28%"}) rotate(8deg)`,
              transition: "transform 320ms ease",
              opacity: 0.75,
              pointerEvents: "none",
            }}
          />
        </Box>

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 2.5,
            background: `
              radial-gradient(circle at top left, ${card.color}30, transparent 34%),
              linear-gradient(180deg, rgba(16,20,30,0.98), rgba(7,10,18,0.98))
            `,
            opacity: isFlipped ? 1 : 0,
            transform: `scale(${isFlipped ? 1 : 0.98})`,
            transition: "opacity 220ms ease, transform 220ms ease",
            pointerEvents: isFlipped ? "auto" : "none",
          }}
        >
          <Box>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.62)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                mb: 1.2,
              }}
            >
              Detective Record
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontSize: 28,
                fontWeight: 900,
                lineHeight: 1.08,
                mb: 1.5,
              }}
            >
              {card.title}
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.78)",
                fontSize: 14,
                lineHeight: 1.7,
              }}
            >
              {card.description}
            </Typography>
          </Box>

          <Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 1.2,
                mb: 2,
              }}
            >
              <Box>
                <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: 11, mb: 0.3 }}>
                  STATUS
                </Typography>
                <Typography sx={{ color: "white", fontSize: 15, fontWeight: 700 }}>
                  {card.isSuccess ? "CASE SOLVED" : "CASE CLOSED"}
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: 11, mb: 0.3 }}>
                  SCENARIO
                </Typography>
                <Typography sx={{ color: "white", fontSize: 15, fontWeight: 700 }}>
                  #{card.scenarioId.toUpperCase()}
                </Typography>
              </Box>
              {solvedLabel ? (
                <Box>
                  <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: 11, mb: 0.3 }}>
                    ARCHIVE
                  </Typography>
                  <Typography sx={{ color: "white", fontSize: 15, fontWeight: 700 }}>
                    {solvedLabel}
                  </Typography>
                </Box>
              ) : null}
            </Box>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.52)",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Click again to return
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
