import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
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
import { josa } from "es-hangul";
import QRCode from "react-qr-code";
import { useEffect, useMemo, useState } from "react";

import { ShakeTextSection } from "@/features/suspect/components/ShakeTextSection";
import {
  clearPlayroomRoomHash,
  getPlayroomVoteJoinUrl,
  getPlayroomVoteStateKey,
  getPlayroomVoteSuspectsStateKey,
  loadPlayroomKit,
  withPlayroomTimeout,
} from "@/features/suspect/libs/playroomVote";
import { SuspectType } from "@/features/suspect/types";

interface SuspectVoteModalProps {
  isOpen: boolean;
  suspects: SuspectType[];
  scenarioTitle: string;
  episodeNumber: number;
  onClose: () => void;
}

export default function SuspectVoteModal({
  isOpen,
  suspects,
  scenarioTitle,
  episodeNumber,
  onClose,
}: SuspectVoteModalProps) {
  const roomStorageKey = useMemo(
    () => `suspect-vote-room-${episodeNumber}-${scenarioTitle}`,
    [episodeNumber, scenarioTitle]
  );
  const [origin, setOrigin] = useState("");
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [roomError, setRoomError] = useState<string | null>(null);
  const [isOpeningRoom, setIsOpeningRoom] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isResultVisible, setIsResultVisible] = useState(false);
  const [isFinalRevealMode, setIsFinalRevealMode] = useState(false);
  const [finalRevealStepIndex, setFinalRevealStepIndex] = useState(0);
  const [voteCounts, setVoteCounts] = useState<Record<string, number>>({});
  const [voterCount, setVoterCount] = useState(0);
  const [playroomModule, setPlayroomModule] =
    useState<Awaited<ReturnType<typeof loadPlayroomKit>> | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedRoomCode = window.localStorage.getItem(roomStorageKey);
    if (!storedRoomCode) {
      return;
    }

    setRoomCode((currentRoomCode) => currentRoomCode ?? storedRoomCode);
  }, [roomStorageKey]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setIsCopied(false);
    setIsFinalRevealMode(false);
    setFinalRevealStepIndex(0);
    if (!roomCode) {
      setRoomError(null);
      setIsOpeningRoom(false);
      setIsResultVisible(false);
      setVoterCount(0);
      setVoteCounts(
        Object.fromEntries(suspects.map((suspect) => [suspect.name, 0]))
      );
    }
  }, [isOpen, roomCode, suspects]);

  useEffect(() => {
    if (!roomCode || !playroomModule) {
      return;
    }

    const syncVotes = () => {
      const participants = Object.values(playroomModule.getParticipants() ?? {});
      const myId = playroomModule.me()?.id;
      const voters = participants.filter((participant) => participant.id !== myId);
      const nextCounts = Object.fromEntries(
        suspects.map((suspect) => [suspect.name, 0])
      ) as Record<string, number>;

      voters.forEach((participant) => {
        const votedSuspect = participant.getState(getPlayroomVoteStateKey()) as
          | string
          | undefined;

        if (votedSuspect && nextCounts[votedSuspect] !== undefined) {
          nextCounts[votedSuspect] += 1;
        }
      });

      setVoteCounts(nextCounts);
      setVoterCount(voters.length);
    };

    syncVotes();
    const intervalId = window.setInterval(syncVotes, 700);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [playroomModule, roomCode, suspects]);

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
  const joinUrl = roomCode ? getPlayroomVoteJoinUrl(origin, roomCode) : "";
  const finalRevealSteps = useMemo(() => {
    const sortedVoteSummary = [...voteSummary].sort((left, right) => {
      if (right.count !== left.count) {
        return right.count - left.count;
      }

      return left.suspect.name.localeCompare(right.suspect.name, "ko");
    });

    const topVoteCount = sortedVoteSummary[0]?.count ?? 0;
    const topTiedCandidates = sortedVoteSummary
      .filter(({ count }) => count === topVoteCount && count > 0)
      .map(({ suspect }) => suspect.name);
    const secondaryVoteCount =
      sortedVoteSummary.find(({ count }) => count < topVoteCount)?.count ?? 0;
    const suspenseCutoffVoteCount =
      secondaryVoteCount > 0 ? secondaryVoteCount : topVoteCount;
    const finalCandidates = sortedVoteSummary
      .filter(({ count }) => count >= suspenseCutoffVoteCount && count > 0)
      .map(({ suspect }) => suspect.name);
    const excludedCandidates = sortedVoteSummary
      .filter(({ count }) => count < suspenseCutoffVoteCount)
      .map(({ suspect }) => `${suspect.name}.`)
      .join(" ");

    const finalCandidateLine =
      finalCandidates.length > 0
        ? finalCandidates.join(" 그리고 ")
        : "지목된 후보가 없습니다";
    const excludedLine =
      excludedCandidates.length > 0
        ? excludedCandidates
        : "제외된 후보가 없습니다.";
    const winnerName = sortedVoteSummary[0]?.suspect.name ?? "지목된 인물이 없습니다";
    const runnerUpCount = sortedVoteSummary[1]?.count ?? 0;
    const winnerCount = topVoteCount > 0 ? topVoteCount : 0;
    const isTopVoteTied = topTiedCandidates.length > 1;
    const eliminationVoteCount =
      sortedVoteSummary.find(({ count }) => count < suspenseCutoffVoteCount)?.count ??
      0;
    const winnerScoreLine =
      winnerCount > 0 ? `${winnerCount}:${runnerUpCount}` : "0:0";
    const exclusionSteps =
      excludedCandidates.length > 0
        ? [
            `최종 범인 지목 투표 결과`,
            `${eliminationVoteCount}표를 받은 사람은`,
            excludedLine,
            "범인 후보 제외",
          ]
        : ["최종 범인 지목 투표 결과", "아직 제외된 후보가 없습니다"];
    const finalCandidateSteps =
      finalCandidates.length > 0
        ? [
            "이렇게 해서",
            "최종 범인 후보로",
            josa(finalCandidateLine, "이/가"),
            "지목되었습니다",
          ]
        : ["이렇게 해서", "최종 범인 후보는 아직 정해지지 않았습니다"];
    const winnerRevealSteps =
      isTopVoteTied
        ? [
            "본격 추리게임 크라임씬",
            `<${scenarioTitle}> 최종 투표 결과`,
            `${topTiedCandidates.join(", ")}가 ${winnerCount}표로 동률입니다.`,
            "재투표를 실시합니다!",
          ]
        : winnerCount > 0
        ? [
            `본격 추리게임 크라임씬`,
            `<${scenarioTitle}> 최종 투표 결과`,
            "최종 범인으로 지목된 사람은",
            `${josa(winnerScoreLine, "으로/로")} ${winnerCount}표를 획득한`,
            winnerName,
          ]
        : [
            "본격 추리게임 크라임씬",
            `<${scenarioTitle}> 최종 투표 결과`,
            "아직 최종 범인이 정해지지 않았습니다",
          ];

    return [
      `추리게임 협동 크라임씬의 ${episodeNumber}번째 에피소드`,
      `<${scenarioTitle}>의 범인을 찾기 위한`,
      "숨막히는 추리게임의 결과",
      "범인으로 가장 많은 지목을 받은 사람은 누구인지",
      "지금부터 투표 결과를 공개합니다.",
      "본격 추리 게임 크라임씬",
      "최종 범인 후보에서 제외된 사람을 말씀드리겠습니다",
      ...exclusionSteps,
      ...finalCandidateSteps,
      ...winnerRevealSteps,
      ...(!isTopVoteTied && winnerCount > 0
        ? [`최종 범인 후보로 지목된 ${josa(winnerName, "은/는")} 감옥으로 이동해주십시오.`]
        : []),
    ] as const;
  }, [episodeNumber, scenarioTitle, voteSummary]);
  const currentFinalRevealText = finalRevealSteps[finalRevealStepIndex];
  const isLastFinalRevealStep =
    finalRevealStepIndex === finalRevealSteps.length - 1;

  const connectHostToExistingRoom = async (nextRoomCode: string) => {
    const nextPlayroomModule = await loadPlayroomKit();
    await withPlayroomTimeout(
      nextPlayroomModule.insertCoin({
        skipLobby: true,
        roomCode: nextRoomCode,
        gameId: "suspect-realtime-vote",
      }),
      6000
    );

    setPlayroomModule(nextPlayroomModule);
    setRoomCode(nextRoomCode);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(roomStorageKey, nextRoomCode);
    }
  };

  const clearLocalRoomState = () => {
    setPlayroomModule(null);
    setRoomCode(null);
    setRoomError(null);
    setIsOpeningRoom(false);
    setIsCopied(false);
    setIsResultVisible(false);
    setIsFinalRevealMode(false);
    setFinalRevealStepIndex(0);
    setVoterCount(0);
    setVoteCounts(Object.fromEntries(suspects.map((suspect) => [suspect.name, 0])));
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(roomStorageKey);
    }
    clearPlayroomRoomHash();
  };

  const handleOpenRoom = async () => {
    if (isOpeningRoom) {
      return;
    }

    if (roomCode && playroomModule) {
      return;
    }

    setIsOpeningRoom(true);
    setRoomError(null);

    try {
      if (roomCode) {
        await connectHostToExistingRoom(roomCode);
        return;
      }

      const nextPlayroomModule = await loadPlayroomKit();
      nextPlayroomModule.Multiplayer?.reset?.();
      clearPlayroomRoomHash();
      await withPlayroomTimeout(
        nextPlayroomModule.insertCoin({
          skipLobby: true,
          gameId: "suspect-realtime-vote",
          defaultStates: {
            [getPlayroomVoteSuspectsStateKey()]: suspects.map((suspect) => ({
              name: suspect.name,
              image: suspect.image,
              job: suspect.job,
            })),
          },
        }),
        6000
      );

      let actualRoomCode: string | undefined;
      for (let index = 0; index < 24; index += 1) {
        actualRoomCode = nextPlayroomModule.getRoomCode?.();
        if (actualRoomCode) {
          break;
        }
        await new Promise((resolve) => window.setTimeout(resolve, 150));
      }

      if (!actualRoomCode) {
        throw new Error("ROOM_CODE_UNAVAILABLE");
      }

      setPlayroomModule(nextPlayroomModule);
      setRoomCode(actualRoomCode);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(roomStorageKey, actualRoomCode);
      }
    } catch {
      setRoomError("투표 방 생성 실패");
      setPlayroomModule(null);
      if (!playroomModule) {
        setRoomCode(null);
        if (typeof window !== "undefined") {
          window.localStorage.removeItem(roomStorageKey);
        }
      }
    } finally {
      setIsOpeningRoom(false);
    }
  };

  const handleReopenRoom = async () => {
    if (isOpeningRoom) {
      return;
    }

    setIsOpeningRoom(true);
    setRoomError(null);

    try {
      const nextPlayroomModule = await loadPlayroomKit();
      nextPlayroomModule.Multiplayer?.reset?.();
      clearPlayroomRoomHash();
      await Promise.allSettled([
        nextPlayroomModule.resetStates?.(),
        nextPlayroomModule.resetPlayersStates?.(),
      ]);
    } catch {
      // Ignore reset failures and still force a fresh local room open.
    } finally {
      clearLocalRoomState();
    }

    await new Promise((resolve) => window.setTimeout(resolve, 0));
    void handleOpenRoom();
  };

  useEffect(() => {
    if (!isOpen || !roomCode || playroomModule || isOpeningRoom) {
      return;
    }

    void handleOpenRoom();
    // handleOpenRoom intentionally uses current persisted room state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isOpeningRoom, playroomModule, roomCode]);

  const handleCopyLink = async () => {
    if (!joinUrl) {
      return;
    }

    await navigator.clipboard.writeText(joinUrl);
    setIsCopied(true);
    window.setTimeout(() => setIsCopied(false), 1500);
  };

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
          overflow: "hidden",
        },
      }}
    >
      <Box
        sx={{
          height: "100vh",
          overflow: "hidden",
          px: { xs: 2, md: 4 },
          py: { xs: 3, md: 5 },
          background:
            "radial-gradient(circle at 20% 0%, rgba(56, 189, 248, 0.2) 0%, rgba(8, 11, 18, 0) 30%), radial-gradient(circle at 80% 10%, rgba(59, 130, 246, 0.18) 0%, rgba(8, 11, 18, 0) 26%), linear-gradient(180deg, rgba(12, 17, 28, 0.96) 0%, rgba(4, 6, 12, 1) 100%)",
        }}
      >
        <IconButton
          onClick={onClose}
          aria-label="닫기"
          sx={{
            position: "fixed",
            top: 20,
            right: 20,
            zIndex: 20,
            color: "common.white",
            border: "1px solid rgba(255,255,255,0.14)",
            backgroundColor: "rgba(15, 23, 42, 0.48)",
            backdropFilter: "blur(10px)",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.08)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        {isFinalRevealMode ? (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              px: { xs: 2, md: 6 },
              py: { xs: 8, md: 10 },
            }}
          >
            <Box
              sx={{
                flex: 1,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShakeTextSection>
                <Typography
                  sx={{
                    fontSize: { xs: 38, md: 68 },
                    fontWeight: 800,
                    letterSpacing: "-0.05em",
                    lineHeight: 1.28,
                    wordBreak: "keep-all",
                    textAlign: "center",
                  }}
                >
                  {currentFinalRevealText}
                </Typography>
              </ShakeTextSection>
            </Box>

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
        ) : (
          <Box
            sx={{
              width: "100%",
              maxWidth: 920,
              mx: "auto",
              p: { xs: 2.5, md: 3.5 },
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
                mb: 1.8,
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
                    실시간 범인지목
                  </Typography>
                  <Typography
                    fontSize={12}
                    sx={{ color: "rgba(226,232,240,0.72)" }}
                  >
                    범인은 누구?
                  </Typography>
                </Box>
              </Box>
              <Typography
                fontSize={13}
                sx={{
                  color: "rgba(226,232,240,0.84)",
                  px: 1.2,
                  py: 0.55,
                  borderRadius: 999,
                  backgroundColor: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                총 {totalVotes}표
              </Typography>
            </Box>

            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                minHeight: 220,
                borderRadius: 4,
                border: "1px solid rgba(255, 255, 255, 0.16)",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 100%)",
                boxShadow:
                  "0 24px 48px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
                backdropFilter: "blur(16px)",
                px: { xs: 2, md: 2.6 },
                py: { xs: 2, md: 2.3 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 1.6,
                }}
              >
                <Typography fontWeight={800} fontSize={{ xs: 17, md: 19 }}>
                  실시간 투표
                </Typography>
                <Typography
                  fontSize={13}
                  sx={{
                    color: "rgba(226,232,240,0.82)",
                    px: 1.2,
                    py: 0.5,
                    borderRadius: 999,
                    backgroundColor: "rgba(15,23,42,0.34)",
                  }}
                >
                  {roomCode ? `${voterCount}명 참여` : "대기 중"}
                </Typography>
              </Box>

              {!roomCode ? (
                <Box
                  sx={{
                    minHeight: 220,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1.2,
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => void handleOpenRoom()}
                    disabled={isOpeningRoom}
                    sx={{
                      minWidth: 176,
                      borderRadius: 999,
                      textTransform: "none",
                      fontWeight: 700,
                    }}
                    >
                      {isOpeningRoom ? "투표 방 생성 중" : "투표 방 열기"}
                    </Button>
                  {roomError && (
                    <Box textAlign="center">
                      <Typography fontSize={13} color="#fca5a5">
                        {roomError}
                      </Typography>
                      <Button
                        size="small"
                        variant="text"
                        onClick={() => {
                          setRoomError(null);
                          void handleOpenRoom();
                        }}
                        sx={{ mt: 0.6, textTransform: "none" }}
                      >
                        다시 시도
                      </Button>
                    </Box>
                  )}
                </Box>
              ) : (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mb: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        p: 1.4,
                        borderRadius: 3,
                        backgroundColor: "#ffffff",
                        border: "1px solid rgba(255,255,255,0.32)",
                        boxShadow: "0 14px 34px rgba(0,0,0,0.24)",
                      }}
                    >
                      <QRCode
                        value={joinUrl}
                        size={112}
                        bgColor="#ffffff"
                        fgColor="#05070c"
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 2,
                      mb: 1.7,
                      p: 0.9,
                      borderRadius: 3,
                      backgroundColor: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      opacity: 0.74,
                    }}
                  >
                    <Box sx={{ minWidth: 0 }}>
                      <Typography fontSize={11} sx={{ opacity: 0.56 }}>
                        투표 링크
                      </Typography>
                      <Typography
                        sx={{
                          mt: 0.4,
                          fontSize: 11,
                          color: "rgba(226,232,240,0.7)",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: { xs: 180, md: 520 },
                        }}
                      >
                        {joinUrl}
                      </Typography>
                    </Box>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<ContentCopyIcon />}
                      onClick={() => void handleCopyLink()}
                      sx={{
                        flexShrink: 0,
                        textTransform: "none",
                        borderRadius: 999,
                        minWidth: 68,
                        color: "rgba(226,232,240,0.78)",
                        borderColor: "rgba(255,255,255,0.1)",
                        backgroundColor: "rgba(255,255,255,0.02)",
                      }}
                    >
                      {isCopied ? "복사됨" : "복사"}
                    </Button>
                  </Box>

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
                      {voteSummary.map(({ suspect, count }) => (
                        <Box
                          key={suspect.name}
                          sx={{
                            borderRadius: 3,
                            p: { xs: 1.2, md: 1.35 },
                            border: "1px solid",
                            borderColor:
                              isResultVisible && leadingSuspectNames.has(suspect.name)
                              ? "rgba(248, 113, 113, 0.34)"
                              : "rgba(255,255,255,0.12)",
                            background:
                              isResultVisible && leadingSuspectNames.has(suspect.name)
                              ? "linear-gradient(180deg, rgba(127, 29, 29, 0.34) 0%, rgba(255,255,255,0.07) 100%)"
                              : "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)",
                            boxShadow:
                              isResultVisible && leadingSuspectNames.has(suspect.name)
                              ? "0 0 0 1px rgba(248, 113, 113, 0.1), 0 0 28px rgba(239, 68, 68, 0.22), 0 18px 36px rgba(0,0,0,0.18)"
                              : "0 16px 34px rgba(0,0,0,0.18)",
                            textAlign: "center",
                          }}
                        >
                          {(() => {
                            const voteRatio =
                              totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;

                            return (
                              <>
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
                              color:
                                isResultVisible && leadingSuspectNames.has(suspect.name)
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
                              </>
                            );
                          })()}
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
                mt: 1.1,
              }}
            >
              {roomCode && (
                <Button
                  variant="outlined"
                  size="medium"
                  onClick={() => void handleReopenRoom()}
                  disabled={isOpeningRoom}
                  sx={{
                    minWidth: 160,
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
                  {isOpeningRoom ? "다시 여는 중" : "투표방 다시 열기"}
                </Button>
              )}

              {roomCode && (
                <Button
                  variant="outlined"
                  size="medium"
                  startIcon={
                    isResultVisible ? <VisibilityOffIcon /> : <VisibilityIcon />
                  }
                  onClick={() => setIsResultVisible((prev) => !prev)}
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

              {roomCode && (
                <Button
                  variant="outlined"
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
                    backgroundColor: "rgba(15, 23, 42, 0.72)",
                    "&:hover": {
                      borderColor: "rgba(255,255,255,0.32)",
                      backgroundColor: "rgba(255,255,255,0.07)",
                    },
                  }}
                >
                  최종 투표 결과 공개
                </Button>
              )}
            </Stack>
          </Box>
        )}
      </Box>
    </Dialog>
  );
}
