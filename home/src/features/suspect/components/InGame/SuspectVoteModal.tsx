import HowToVoteIcon from "@mui/icons-material/HowToVote";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { CircularProgress } from "@mui/material";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  Stack,
  Typography,
} from "@mui/material";
import QRCode from "react-qr-code";
import { useEffect, useMemo, useState } from "react";

import { ShakeTextSection } from "@/features/suspect/components/ShakeTextSection";
import { SuspectType } from "@/features/suspect/types";
import {
  countVotesBySuspect,
  getSuspectVoteGameId,
  getSuspectVoteJoinUrl,
  getSuspectVoteStateKey,
  loadPlayroomKit,
  withTimeout,
} from "@/features/suspect/libs/vote";

interface SuspectVoteModalProps {
  isOpen: boolean;
  scenarioId: string;
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
  scenarioId,
  suspects,
  onClose,
}: SuspectVoteModalProps) {
  const [isRoomReady, setIsRoomReady] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [initError, setInitError] = useState<string | null>(null);
  const [isResultVisible, setIsResultVisible] = useState(false);
  const [isFinalRevealMode, setIsFinalRevealMode] = useState(false);
  const [finalRevealStepIndex, setFinalRevealStepIndex] = useState(0);
  const [origin, setOrigin] = useState("");
  const [connectedVoterCount, setConnectedVoterCount] = useState(0);
  const [voteSummary, setVoteSummary] = useState(() =>
    countVotesBySuspect(suspects, [])
  );
  const [playroomModule, setPlayroomModule] =
    useState<Awaited<ReturnType<typeof loadPlayroomKit>> | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    setRoomCode(null);
    setVoteSummary(countVotesBySuspect(suspects, []));
    setConnectedVoterCount(0);
    setInitError(null);
    setIsFinalRevealMode(false);
    setFinalRevealStepIndex(0);
  }, [isOpen, suspects]);

  useEffect(() => {
    if (!isRoomReady) {
      return;
    }

    if (!playroomModule) {
      return;
    }

    const syncVotes = () => {
      const participants = Object.values(playroomModule.getParticipants() ?? {});
      const myId = playroomModule.me()?.id;
      const voterParticipants = participants.filter((participant) => {
        return participant.id !== myId;
      });

      const votes = voterParticipants.map((participant) => {
        return participant.getState(getSuspectVoteStateKey(scenarioId)) as
          | string
          | null
          | undefined;
      });

      setConnectedVoterCount(voterParticipants.length);
      setVoteSummary(countVotesBySuspect(suspects, votes));
    };

    syncVotes();
    const intervalId = window.setInterval(syncVotes, 700);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isRoomReady, playroomModule, scenarioId, suspects]);

  const joinUrl = useMemo(() => {
    if (!origin || !roomCode) {
      return "";
    }

    return getSuspectVoteJoinUrl(origin, scenarioId, roomCode);
  }, [origin, roomCode, scenarioId]);

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

  const connectHostToVoteRoom = async () => {
    if (isInitializing || isRoomReady) {
      return;
    }

    setIsInitializing(true);
    setInitError(null);

    try {
      const nextPlayroomModule = await loadPlayroomKit();
      await withTimeout(
        nextPlayroomModule.insertCoin({
          skipLobby: true,
          gameId: getSuspectVoteGameId(scenarioId),
        }),
        6000
      );

      let actualRoomCode: string | undefined;
      for (let index = 0; index < 20; index += 1) {
        actualRoomCode = nextPlayroomModule.getRoomCode?.();
        if (actualRoomCode) {
          break;
        }
        await new Promise((resolve) => window.setTimeout(resolve, 150));
      }

      if (!actualRoomCode) {
        throw new Error("ROOM_CODE_UNAVAILABLE");
      }

      setRoomCode(actualRoomCode);
      setPlayroomModule(nextPlayroomModule);
      setIsRoomReady(true);
    } catch {
      setInitError("투표 방 생성 실패");
      setRoomCode(null);
      setPlayroomModule(null);
      setIsRoomReady(false);
    } finally {
      setIsInitializing(false);
    }
  };

  const currentFinalRevealText = FINAL_REVEAL_STEPS[finalRevealStepIndex];
  const isLastFinalRevealStep =
    finalRevealStepIndex === FINAL_REVEAL_STEPS.length - 1;

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
              flexDirection: "column",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Box
              sx={{
                width: { xs: 176, md: 204 },
                height: { xs: 176, md: 204 },
                borderRadius: 4,
                p: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.08) 100%)",
                border: "1px solid rgba(255,255,255,0.18)",
                boxShadow:
                  "0 24px 40px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.16)",
                backdropFilter: "blur(20px)",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 3,
                  backgroundColor: "#f8fafc",
                  color: "#0f172a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  p: 1.5,
                }}
              >
                {isRoomReady && joinUrl ? (
                  <QRCode
                    value={joinUrl}
                    size={160}
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : initError ? (
                  <Box textAlign="center">
                    <Typography fontSize={12} fontWeight={700}>
                      ROOM ERROR
                    </Typography>
                    <Typography fontSize={11} mt={0.8}>
                      {initError}
                    </Typography>
                    <Button
                      size="small"
                      variant="text"
                      onClick={() => {
                        setInitError(null);
                        setIsRoomReady(false);
                        setRoomCode(null);
                      }}
                      sx={{ mt: 1, minWidth: 0 }}
                    >
                      다시 시도
                    </Button>
                  </Box>
                ) : (
                  <Box textAlign="center">
                    {isInitializing ? (
                      <CircularProgress size={28} />
                    ) : (
                      <HowToVoteIcon sx={{ fontSize: 34 }} />
                    )}
                    <Typography fontSize={12} fontWeight={700} mt={1.4}>
                      {isInitializing ? "ROOM OPENING" : "OPEN ROOM"}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>

            <Typography
              textAlign="center"
              mt={2.2}
              sx={{ color: "rgba(226, 232, 240, 0.68)", fontSize: 13 }}
            >
              {roomCode ? `ROOM ${roomCode}` : isInitializing ? "투표 방 생성 중" : "투표 방 미개설"}
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

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 3,
                  }}
                >
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
                  <Typography fontWeight={700}>실시간 투표</Typography>
                  <Typography
                    fontSize={13}
                    sx={{ color: "rgba(226,232,240,0.68)" }}
                  >
                    {isRoomReady ? `${connectedVoterCount}명 접속` : "대기 중"}
                  </Typography>
                </Box>
                {!isRoomReady && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: 72,
                      mb: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      size="medium"
                      startIcon={
                        isInitializing ? (
                          <CircularProgress size={16} color="inherit" />
                        ) : (
                          <HowToVoteIcon />
                        )
                      }
                      onClick={() => {
                        void connectHostToVoteRoom();
                      }}
                      sx={{
                        minWidth: 168,
                        borderRadius: 999,
                        textTransform: "none",
                        fontWeight: 700,
                        px: 2.2,
                      }}
                    >
                      {isInitializing ? "연결 중" : "투표 방 열기"}
                    </Button>
                  </Box>
                )}

                <Box
                  sx={{
                    position: "relative",
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "repeat(2, minmax(0, 1fr))",
                      md: `repeat(${Math.min(Math.max(suspects.length, 2), 4)}, minmax(0, 1fr))`,
                    },
                    gap: 1.4,
                    opacity: isRoomReady ? 1 : 0.42,
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
                    </Box>
                  ))}
                </Box>

                {!isRoomReady && (
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 3,
                      backgroundColor: "rgba(4, 6, 12, 0.14)",
                      pointerEvents: "none",
                    }}
                  />
                )}

                {isRoomReady && !isResultVisible && (
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

          {isRoomReady && (
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
          )}

          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                color: "common.white",
                borderColor: "rgba(255,255,255,0.22)",
                "&:hover": {
                  borderColor: "rgba(255,255,255,0.4)",
                  backgroundColor: "rgba(255,255,255,0.04)",
                },
              }}
            >
              닫기
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}
