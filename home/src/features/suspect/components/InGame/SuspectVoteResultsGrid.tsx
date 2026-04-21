import { Avatar, Box, Typography } from "@mui/material";

import { SuspectType } from "@/features/suspect/types";

interface VoteSummaryItem {
  suspect: SuspectType;
  count: number;
}

interface SuspectVoteResultsGridProps {
  isResultVisible: boolean;
  leadingSuspectNames: Set<string>;
  totalVotes: number;
  voteSummary: VoteSummaryItem[];
}

export default function SuspectVoteResultsGrid({
  isResultVisible,
  leadingSuspectNames,
  totalVotes,
  voteSummary,
}: SuspectVoteResultsGridProps) {
  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: 3,
        minHeight: 190,
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, minmax(0, 1fr))",
            md: `repeat(${Math.min(Math.max(voteSummary.length, 2), 4)}, minmax(0, 1fr))`,
          },
          gap: 1.1,
        }}
      >
        {voteSummary.map(({ suspect, count }) => {
          const voteRatio =
            totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
          const isLeading =
            isResultVisible && leadingSuspectNames.has(suspect.name);

          return (
            <Box
              key={suspect.name}
              sx={{
                borderRadius: 3,
                p: { xs: 1.2, md: 1.35 },
                border: "1px solid",
                borderColor: isLeading
                  ? "rgba(248, 113, 113, 0.34)"
                  : "rgba(255,255,255,0.12)",
                background: isLeading
                  ? "linear-gradient(180deg, rgba(127, 29, 29, 0.34) 0%, rgba(255,255,255,0.07) 100%)"
                  : "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)",
                boxShadow: isLeading
                  ? "0 0 0 1px rgba(248, 113, 113, 0.1), 0 0 28px rgba(239, 68, 68, 0.22), 0 18px 36px rgba(0,0,0,0.18)"
                  : "0 16px 34px rgba(0,0,0,0.18)",
                textAlign: "center",
              }}
            >
              <Avatar
                src={suspect.image || ""}
                alt={suspect.name}
                sx={{
                  width: { xs: 64, md: 72 },
                  height: { xs: 64, md: 72 },
                  mx: "auto",
                  mb: 0.9,
                  border: "2px solid rgba(255,255,255,0.14)",
                  boxShadow: "0 10px 24px rgba(0,0,0,0.16)",
                }}
              />
              <Typography fontWeight={800} fontSize={{ xs: 13, md: 14 }}>
                {suspect.name}
              </Typography>
              <Typography
                sx={{
                  mt: 0.5,
                  color: isLeading
                    ? "rgba(254, 202, 202, 0.96)"
                    : "rgba(241,245,249,0.94)",
                  fontSize: { xs: 18, md: 20 },
                  lineHeight: 1,
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                }}
              >
                {isResultVisible ? count : "?"}
              </Typography>
              <Box
                sx={{
                  mt: 0.7,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.6,
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    height: 6,
                    borderRadius: 999,
                    overflow: "hidden",
                    backgroundColor: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <Box
                    sx={{
                      width: isResultVisible ? `${voteRatio}%` : "0%",
                      height: "100%",
                      borderRadius: 999,
                      background: leadingSuspectNames.has(suspect.name)
                        ? "linear-gradient(90deg, rgba(248,113,113,0.95) 0%, rgba(251,146,60,0.92) 100%)"
                        : "linear-gradient(90deg, rgba(96,165,250,0.9) 0%, rgba(56,189,248,0.86) 100%)",
                      transition: "width 0.35s ease",
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    minWidth: 32,
                    textAlign: "right",
                    color: "rgba(226,232,240,0.78)",
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {isResultVisible ? `${voteRatio}%` : "--"}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>

      {!isResultVisible && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 3,
            background:
              "linear-gradient(180deg, rgba(3, 6, 14, 0.7) 0%, rgba(6, 10, 20, 0.78) 100%)",
            backdropFilter: "blur(18px) saturate(120%)",
            WebkitBackdropFilter: "blur(18px) saturate(120%)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              px: 2,
              py: 1,
              borderRadius: 999,
              backgroundColor: "rgba(10, 14, 24, 0.92)",
              border: "1px solid rgba(255,255,255,0.14)",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            <Typography fontSize={13} fontWeight={700}>
              결과가 숨겨져 있습니다
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
