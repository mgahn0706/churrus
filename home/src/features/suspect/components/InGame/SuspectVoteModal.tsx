import CloseIcon from "@mui/icons-material/Close";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import { CircularProgress } from "@mui/material";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  IconButton,
  Typography,
} from "@mui/material";
import { insertCoin, getRoomCode, usePlayersList, usePlayersState } from "playroomkit";
import QRCode from "react-qr-code";
import { useEffect, useMemo, useState } from "react";

import { SuspectType } from "@/features/suspect/types";
import {
  countVotesBySuspect,
  getSuspectVoteGameId,
  getSuspectVoteJoinUrl,
  getSuspectVoteStateKey,
} from "@/features/suspect/libs/vote";

interface SuspectVoteModalProps {
  isOpen: boolean;
  scenarioId: string;
  suspects: SuspectType[];
  onClose: () => void;
}

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
  const [origin, setOrigin] = useState("");
  const playerVotes = usePlayersState(getSuspectVoteStateKey(scenarioId));
  const players = usePlayersList(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    if (!isOpen || isRoomReady || isInitializing) {
      return;
    }

    let isCancelled = false;

    const resolveRoomCode = async () => {
      for (let index = 0; index < 30; index += 1) {
        const nextRoomCode = getRoomCode();
        if (nextRoomCode) {
          return nextRoomCode;
        }

        await new Promise((resolve) => window.setTimeout(resolve, 150));
      }

      return null;
    };

    const initRoom = async () => {
      setIsInitializing(true);
      setInitError(null);

      try {
        await new Promise<void>((resolve, reject) => {
          void insertCoin(
            {
              skipLobby: true,
              gameId: getSuspectVoteGameId(scenarioId),
            },
            () => resolve(),
            (error) => reject(error)
          );
        });

        if (isCancelled) {
          return;
        }

        const nextRoomCode = await resolveRoomCode();

        if (isCancelled) {
          return;
        }

        if (!nextRoomCode) {
          throw new Error("ROOM_CODE_UNAVAILABLE");
        }

        setRoomCode(nextRoomCode);
        setIsRoomReady(true);
      } catch (error) {
        if (!isCancelled) {
          setInitError("QR 코드를 불러오지 못했습니다");
        }
      } finally {
        if (!isCancelled) {
          setIsInitializing(false);
        }
      }
    };

    void initRoom();

    return () => {
      isCancelled = true;
    };
  }, [isInitializing, isOpen, isRoomReady, scenarioId]);

  const joinUrl = useMemo(() => {
    if (!origin || !roomCode) {
      return "";
    }

    return getSuspectVoteJoinUrl(origin, scenarioId, roomCode);
  }, [origin, roomCode, scenarioId]);

  const voteSummary = useMemo(() => {
    return countVotesBySuspect(
      suspects,
      playerVotes.map((item) => item.state as string | null | undefined)
    );
  }, [playerVotes, suspects]);

  const connectedVoterCount = Math.max(players.length - 1, 0);

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
            <IconButton
              onClick={onClose}
              aria-label="닫기"
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                color: "common.white",
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              <CloseIcon />
            </IconButton>

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
                {joinUrl ? (
                  <QRCode
                    value={joinUrl}
                    size={160}
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : initError ? (
                  <Box textAlign="center">
                    <Typography fontSize={12} fontWeight={700}>
                      QR ERROR
                    </Typography>
                    <Typography fontSize={11} mt={0.8}>
                      {initError}
                    </Typography>
                  </Box>
                ) : (
                  <>
                    <CircularProgress size={28} />
                    <Typography fontSize={12} fontWeight={700} mt={1.4}>
                      ROOM
                    </Typography>
                  </>
                )}
              </Box>
            </Box>

            <Typography
              textAlign="center"
              mt={2.2}
              sx={{ color: "rgba(226, 232, 240, 0.68)", fontSize: 13 }}
            >
              {roomCode ? `ROOM ${roomCode}` : initError ?? "연결 중"}
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography fontWeight={700}>실시간 투표</Typography>
              <Typography fontSize={13} sx={{ color: "rgba(226,232,240,0.68)" }}>
                {connectedVoterCount}명 접속
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
                    border: "1px solid rgba(255,255,255,0.1)",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    textAlign: "center",
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
          </Box>

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
