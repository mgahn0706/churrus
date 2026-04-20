import AddIcon from "@mui/icons-material/Add";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import RemoveIcon from "@mui/icons-material/Remove";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";

import { ShakeTextSection } from "@/features/suspect/components/ShakeTextSection";
import { SuspectType } from "@/features/suspect/types";

interface SuspectVoteModalProps {
  isOpen: boolean;
  suspects: SuspectType[];
  onClose: () => void;
}

const FINAL_REVEAL_STEPS = [
  "본격 추리게임 협동 크라임씬",
  "숨막히는 추리게임의 결과",
  "가장 많은 표를 얻은 사람은 누구일지",
  "지금부터 투표 결과를 공개합니다",
] as const;

export default function SuspectVoteModal({
  isOpen,
  suspects,
  onClose,
}: SuspectVoteModalProps) {
  const [voteCounts, setVoteCounts] = useState<Record<string, number>>({});
  const [isResultVisible, setIsResultVisible] = useState(false);
  const [isFinalRevealMode, setIsFinalRevealMode] = useState(false);
  const [finalRevealStepIndex, setFinalRevealStepIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setVoteCounts(
      Object.fromEntries(suspects.map((suspect) => [suspect.name, 0]))
    );
    setIsResultVisible(false);
    setIsFinalRevealMode(false);
    setFinalRevealStepIndex(0);
  }, [isOpen, suspects]);

  const voteSummary = useMemo(() => {
    return suspects.map((suspect) => ({
      suspect,
      count: voteCounts[suspect.name] ?? 0,
    }));
  }, [suspects, voteCounts]);

  const leadingSuspectNames = useMemo(() => {
    const maxVoteCount = Math.max(...voteSummary.map(({ count }) => count), 0);

    if (maxVoteCount === 0) {
      return new Set<string>();
    }

    const leaders = voteSummary
      .filter(({ count }) => count === maxVoteCount)
      .map(({ suspect }) => suspect.name);

    if (leaders.length !== 1) {
      return new Set<string>();
    }

    return new Set(leaders);
  }, [voteSummary]);

  const totalVotes = voteSummary.reduce((sum, item) => sum + item.count, 0);
  const currentFinalRevealText = FINAL_REVEAL_STEPS[finalRevealStepIndex];
  const isLastFinalRevealStep =
    finalRevealStepIndex === FINAL_REVEAL_STEPS.length - 1;

  const adjustVoteCount = (suspectName: string, delta: number) => {
    setVoteCounts((prev) => ({
      ...prev,
      [suspectName]: Math.max(0, (prev[suspectName] ?? 0) + delta),
    }));
  };

  const resetVotes = () => {
    setVoteCounts(
      Object.fromEntries(suspects.map((suspect) => [suspect.name, 0]))
    );
  };

  return (
    <Dialog fullScreen open={isOpen} onClose={onClose}>
      <Box
        sx={{
          minHeight: "100%",
          px: { xs: 2, md: 4 },
          py: { xs: 3, md: 5 },
          background:
            "radial-gradient(circle at 20% 0%, rgba(56, 189, 248, 0.2) 0%, rgba(8, 11, 18, 0) 30%), radial-gradient(circle at 80% 10%, rgba(59, 130, 246, 0.18) 0%, rgba(8, 11, 18, 0) 26%), linear-gradient(180deg, rgba(12, 17, 28, 0.96) 0%, rgba(4, 6, 12, 1) 100%)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 960,
            mx: "auto",
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            color: "common.white",
            position: "relative",
            overflow: "hidden",
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.06) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.16)",
            boxShadow:
              "0 24px 60px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.18)",
            backdropFilter: "blur(28px) saturate(150%)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "radial-gradient(circle at top left, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 32%), radial-gradient(circle at bottom right, rgba(59,130,246,0.12) 0%, rgba(59,130,246,0) 28%)",
            }}
          />

          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Box display="flex" alignItems="center" gap={1.2}>
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <HowToVoteIcon />
              </Box>
              <Box>
                <Typography fontWeight={800} fontSize={{ xs: 22, md: 28 }}>
                  용의자 투표
                </Typography>
                <Typography
                  fontSize={13}
                  sx={{ color: "rgba(226,232,240,0.68)" }}
                >
                  수동 입력 모드
                </Typography>
              </Box>
            </Box>
            <Typography fontSize={13} sx={{ color: "rgba(226,232,240,0.68)" }}>
              총 {totalVotes}표
            </Typography>
          </Box>

          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              minHeight: 260,
              borderRadius: 3,
              border: "1px solid rgba(255, 255, 255, 0.12)",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
              backdropFilter: "blur(18px)",
              px: { xs: 2, md: 3 },
              py: { xs: 2, md: 2.5 },
            }}
          >
            {isFinalRevealMode ? (
              <Box
                sx={{
                  minHeight: 320,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    minHeight: 220,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ShakeTextSection>
                    <Typography
                      sx={{
                        fontSize: { xs: 28, md: 42 },
                        fontWeight: 800,
                        letterSpacing: "-0.04em",
                        lineHeight: 1.35,
                        wordBreak: "keep-all",
                      }}
                    >
                      {currentFinalRevealText}
                    </Typography>
                  </ShakeTextSection>
                </Box>

                <Box display="flex" justifyContent="center" mt={3}>
                  <Button
                    variant="text"
                    endIcon={<KeyboardArrowRightIcon />}
                    onClick={() => {
                      if (isLastFinalRevealStep) {
                        return;
                      }
                      setFinalRevealStepIndex((prev) => prev + 1);
                    }}
                    disabled={isLastFinalRevealStep}
                    sx={{
                      color: "rgba(226,232,240,0.72)",
                      textTransform: "none",
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.04)",
                      },
                    }}
                  >
                    {isLastFinalRevealStep ? "다음 단계 준비 중" : "다음"}
                  </Button>
                </Box>
              </Box>
            ) : (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography fontWeight={700}>수동 투표 입력</Typography>
                  <Typography
                    fontSize={13}
                    sx={{ color: "rgba(226,232,240,0.68)" }}
                  >
                    {suspects.length}명 후보
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "repeat(2, minmax(0, 1fr))",
                      md: `repeat(${Math.min(Math.max(suspects.length, 2), 4)}, minmax(0, 1fr))`,
                    },
                    gap: 1.4,
                  }}
                >
                  {voteSummary.map(({ suspect, count }) => (
                    <Box
                      key={suspect.name}
                      sx={{
                        borderRadius: 3,
                        p: 1.4,
                        border: "1px solid",
                        borderColor: leadingSuspectNames.has(suspect.name)
                          ? "rgba(248, 113, 113, 0.28)"
                          : "rgba(255,255,255,0.1)",
                        background: leadingSuspectNames.has(suspect.name)
                          ? "linear-gradient(180deg, rgba(127, 29, 29, 0.28) 0%, rgba(255,255,255,0.05) 100%)"
                          : "rgba(255,255,255,0.05)",
                        boxShadow: leadingSuspectNames.has(suspect.name)
                          ? "0 0 0 1px rgba(248, 113, 113, 0.08), 0 0 24px rgba(239, 68, 68, 0.18)"
                          : "none",
                        textAlign: "center",
                        transition:
                          "border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
                      }}
                    >
                      <Avatar
                        src={suspect.image}
                        alt={suspect.name}
                        sx={{
                          width: 72,
                          height: 72,
                          mx: "auto",
                          mb: 1.2,
                          border: "2px solid rgba(255,255,255,0.12)",
                        }}
                      />
                      <Typography fontWeight={700} fontSize={14}>
                        {suspect.name}
                      </Typography>
                      <Typography
                        sx={{
                          mt: 0.5,
                          color: "rgba(226,232,240,0.68)",
                          fontSize: 12,
                        }}
                      >
                        {count}표
                      </Typography>

                      <Box
                        sx={{
                          mt: 1.3,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 0.8,
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => adjustVoteCount(suspect.name, -1)}
                          sx={{
                            color: "common.white",
                            border: "1px solid rgba(255,255,255,0.12)",
                            backgroundColor: "rgba(255,255,255,0.04)",
                          }}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography
                          sx={{
                            minWidth: 32,
                            fontWeight: 700,
                            fontSize: 16,
                          }}
                        >
                          {count}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => adjustVoteCount(suspect.name, 1)}
                          sx={{
                            color: "common.white",
                            border: "1px solid rgba(255,255,255,0.12)",
                            backgroundColor: "rgba(255,255,255,0.04)",
                          }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}
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
                      backgroundColor: "rgba(4, 6, 12, 0.42)",
                      backdropFilter: "blur(6px)",
                      pointerEvents: "none",
                    }}
                  >
                    <Box
                      sx={{
                        px: 2,
                        py: 1,
                        borderRadius: 999,
                        backgroundColor: "rgba(15, 23, 42, 0.78)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                      }}
                    >
                      <Typography fontSize={13} fontWeight={700}>
                        결과가 숨겨져 있습니다
                      </Typography>
                    </Box>
                  </Box>
                )}
              </>
            )}
          </Box>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={1.2}
            sx={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              justifyContent: "center",
              mt: 1.8,
            }}
          >
            {!isFinalRevealMode && (
              <Button
                variant="outlined"
                size="medium"
                startIcon={
                  isResultVisible ? <VisibilityOffIcon /> : <VisibilityIcon />
                }
                onClick={() => {
                  setIsResultVisible((prev) => !prev);
                }}
                sx={{
                  minWidth: 148,
                  borderRadius: 999,
                  textTransform: "none",
                  fontWeight: 700,
                  px: 2,
                  color: "common.white",
                  borderColor: "rgba(255,255,255,0.18)",
                  backgroundColor: "rgba(15, 23, 42, 0.72)",
                  "&:hover": {
                    borderColor: "rgba(255,255,255,0.32)",
                    backgroundColor: "rgba(255,255,255,0.07)",
                  },
                }}
              >
                {isResultVisible ? "결과 숨기기" : "결과 보기"}
              </Button>
            )}

            {!isFinalRevealMode && (
              <Button
                variant="outlined"
                size="medium"
                onClick={resetVotes}
                sx={{
                  minWidth: 120,
                  borderRadius: 999,
                  textTransform: "none",
                  fontWeight: 700,
                  px: 2,
                  color: "common.white",
                  borderColor: "rgba(255,255,255,0.18)",
                  backgroundColor: "rgba(15, 23, 42, 0.72)",
                }}
              >
                초기화
              </Button>
            )}

            <Button
              variant={isFinalRevealMode ? "contained" : "outlined"}
              size="medium"
              onClick={() => {
                setIsFinalRevealMode(true);
                setFinalRevealStepIndex(0);
              }}
              sx={{
                minWidth: 186,
                borderRadius: 999,
                textTransform: "none",
                fontWeight: 700,
                px: 2.2,
                color: "common.white",
                borderColor: "rgba(255,255,255,0.18)",
                backgroundColor: isFinalRevealMode
                  ? "rgba(59, 130, 246, 0.32)"
                  : "rgba(15, 23, 42, 0.72)",
                "&:hover": {
                  borderColor: "rgba(255,255,255,0.32)",
                  backgroundColor: isFinalRevealMode
                    ? "rgba(59, 130, 246, 0.4)"
                    : "rgba(255,255,255,0.07)",
                },
              }}
            >
              최종 투표 결과 공개
            </Button>
          </Stack>
        </Box>
      </Box>
    </Dialog>
  );
}
