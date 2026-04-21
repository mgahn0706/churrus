import { Avatar, Box, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import {
  getPlayroomVoteLockedStateKey,
  getPlayroomVoteStateKey,
  getPlayroomVoteSuspectsStateKey,
  loadPlayroomKit,
  withPlayroomTimeout,
} from "@/features/suspect/libs/playroomVote";

type VoteSuspect = {
  image?: string;
  job: string;
  name: string;
};

export default function SuspectVotePage() {
  const router = useRouter();
  const [playroomModule, setPlayroomModule] =
    useState<Awaited<ReturnType<typeof loadPlayroomKit>> | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [pageError, setPageError] = useState<string | null>(null);
  const [suspects, setSuspects] = useState<VoteSuspect[]>([]);
  const [selectedSuspectName, setSelectedSuspectName] = useState<string | null>(null);
  const [isVoteLocked, setIsVoteLocked] = useState(false);

  const roomCode =
    typeof router.query.room === "string" ? router.query.room.toUpperCase() : "";

  const connectToVoteRoom = async () => {
    if (!router.isReady || !roomCode || isConnecting || isReady) {
      return;
    }

    setIsConnecting(true);
    setPageError(null);
    setSuspects([]);
    setIsVoteLocked(false);

      try {
        const nextPlayroomModule = await loadPlayroomKit();
        await withPlayroomTimeout(
        nextPlayroomModule.insertCoin({
          skipLobby: true,
          roomCode,
          gameId: "suspect-realtime-vote",
          }),
          6000
        );

        const suspectsState = await withPlayroomTimeout(
          nextPlayroomModule.waitForState<VoteSuspect[]>(
            getPlayroomVoteSuspectsStateKey()
          ),
          4000
        );

        if (!suspectsState?.length) {
          throw new Error("SUSPECTS_UNAVAILABLE");
        }

      const lockedState =
        (await withPlayroomTimeout(
          nextPlayroomModule.waitForState<boolean>(getPlayroomVoteLockedStateKey()),
          4000
        ).catch(() => false)) ?? false;

      setSuspects(suspectsState);
      setIsVoteLocked(Boolean(lockedState));
      setSelectedSuspectName(
        (nextPlayroomModule.myPlayer().getState(
          getPlayroomVoteStateKey()
        ) as string | undefined) ?? null
      );
      setPlayroomModule(nextPlayroomModule);
      setIsReady(true);
    } catch {
      setPageError("투표방 연결 실패");
      setPlayroomModule(null);
      setIsReady(false);
    } finally {
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    if (!router.isReady || !roomCode || isReady || pageError) {
      return;
    }

    void connectToVoteRoom();
    // connectToVoteRoom intentionally depends on current room/router state
    // and is only triggered by the stable primitives listed here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, pageError, roomCode, router.isReady]);

  useEffect(() => {
    if (!playroomModule) {
      return;
    }

    const syncLockedState = () => {
      setIsVoteLocked(
        Boolean(playroomModule.getState?.(getPlayroomVoteLockedStateKey()))
      );
    };

    syncLockedState();
    const intervalId = window.setInterval(syncLockedState, 500);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [playroomModule]);

  const handleVote = (suspectName: string) => {
    if (!playroomModule || isVoteLocked) {
      return;
    }

    setSelectedSuspectName(suspectName);
    playroomModule.myPlayer().setState(getPlayroomVoteStateKey(), suspectName, true);
  };

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        px: 2,
        py: 3,
        color: "white",
        background:
          "radial-gradient(circle at top, rgba(59,130,246,0.18) 0%, rgba(5,8,22,0) 28%), linear-gradient(180deg, #0b1020 0%, #04060c 100%)",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 560, mx: "auto" }}>
        <Box sx={{ textAlign: "center", mb: 3.5 }}>
          <Typography fontSize={12} sx={{ opacity: 0.66 }}>
            ROOM {roomCode || "-"}
          </Typography>
          <Typography variant="h5" fontWeight={800} mt={1}>
            용의자 투표
          </Typography>
          <Typography sx={{ mt: 0.7, opacity: 0.68, fontSize: 14 }}>
            {isVoteLocked ? "최종 결과 공개 중" : "한 명을 선택하세요"}
          </Typography>
        </Box>

        {pageError ? (
          <Box
            sx={{
              minHeight: 260,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 1.2,
              borderRadius: 4,
              border: "1px solid rgba(255,255,255,0.1)",
              backgroundColor: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(16px)",
              textAlign: "center",
              px: 3,
            }}
          >
            <Typography fontWeight={700}>{pageError}</Typography>
            <Typography sx={{ opacity: 0.66, fontSize: 13 }}>
              호스트가 투표 방을 다시 열어야 합니다
            </Typography>
            <Typography
              onClick={() => {
                setPageError(null);
                void connectToVoteRoom();
              }}
              sx={{
                mt: 0.8,
                fontSize: 13,
                opacity: 0.8,
                textDecoration: "underline",
              }}
            >
              다시 시도
            </Typography>
          </Box>
        ) : !isReady || isConnecting || suspects.length === 0 ? (
          <Box
            sx={{
              minHeight: 260,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 1.5,
              borderRadius: 4,
              border: "1px solid rgba(255,255,255,0.1)",
              backgroundColor: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(16px)",
            }}
          >
            <CircularProgress size={30} />
            <Typography sx={{ opacity: 0.72, fontSize: 14 }}>
              {isConnecting ? "투표방 연결 중" : "후보 정보 불러오는 중"}
            </Typography>
          </Box>
        ) : (
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                mb: 1.6,
                px: 1.4,
                py: 1.1,
                borderRadius: 3,
                border: "1px solid rgba(255,255,255,0.1)",
                backgroundColor: isVoteLocked
                  ? "rgba(248, 113, 113, 0.12)"
                  : "rgba(255,255,255,0.04)",
                backdropFilter: "blur(16px)",
              }}
            >
              <Typography fontSize={13} fontWeight={700}>
                {isVoteLocked
                  ? "호스트가 최종 투표 결과를 공개했습니다"
                  : "원하는 용의자 한 명에게 투표하세요"}
              </Typography>
              <Typography sx={{ mt: 0.45, opacity: 0.7, fontSize: 12 }}>
                {isVoteLocked
                  ? "이제 투표 결과를 바꿀 수 없습니다."
                  : "투표는 다시 눌러 변경할 수 있습니다."}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 1.4,
              }}
            >
            {suspects.map((suspect) => {
              const selected = selectedSuspectName === suspect.name;

              return (
                <Box
                  key={suspect.name}
                  onClick={() => handleVote(suspect.name)}
                  sx={{
                    p: 1.3,
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: selected
                      ? "rgba(96, 165, 250, 0.8)"
                      : "rgba(255,255,255,0.1)",
                    background: selected
                      ? "linear-gradient(180deg, rgba(37,99,235,0.32) 0%, rgba(255,255,255,0.08) 100%)"
                      : "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
                    boxShadow: selected
                      ? "0 18px 36px rgba(37, 99, 235, 0.18)"
                      : "none",
                    backdropFilter: "blur(18px)",
                    cursor: isVoteLocked ? "not-allowed" : "pointer",
                    opacity: isVoteLocked ? 0.56 : 1,
                    pointerEvents: isVoteLocked ? "none" : "auto",
                  }}
                >
                  <Avatar
                    src={suspect.image || ""}
                    alt={suspect.name}
                    sx={{
                      width: "100%",
                      height: "auto",
                      aspectRatio: "1 / 1",
                      borderRadius: 3,
                      mb: 1.2,
                    }}
                    variant="rounded"
                  />
                  <Typography fontWeight={700} textAlign="center">
                    {suspect.name}
                  </Typography>
                  <Typography
                    textAlign="center"
                    sx={{ mt: 0.4, opacity: 0.62, fontSize: 12 }}
                  >
                    {suspect.job}
                  </Typography>
                </Box>
              );
            })}
            </Box>
            {isVoteLocked && (
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 4,
                  background:
                    "linear-gradient(180deg, rgba(3, 6, 14, 0.3) 0%, rgba(6, 10, 20, 0.42) 100%)",
                  pointerEvents: "none",
                }}
              >
                <Box
                  sx={{
                    px: 2.2,
                    py: 1,
                    borderRadius: 999,
                    backgroundColor: "rgba(10, 14, 24, 0.92)",
                    border: "1px solid rgba(255,255,255,0.14)",
                  }}
                >
                  <Typography fontSize={13} fontWeight={700}>
                    투표 수정이 비활성화되었습니다
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
