import { scenarios } from "@/features/suspect/fixtures";
import {
  getSuspectVoteGameId,
  getSuspectVoteStateKey,
} from "@/features/suspect/libs/vote";
import { ClueScenarioType, ScenarioType, SuspectType } from "@/features/suspect/types";
import { Avatar, Box, CircularProgress, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { insertCoin, myPlayer } from "playroomkit";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

const findScenario = (scenarioId?: string | string[]) => {
  if (typeof scenarioId !== "string") {
    return null;
  }

  return scenarios.find((scenario): scenario is ScenarioType => {
    return scenario.id === scenarioId;
  }) ?? null;
};

export default function SuspectVotePage() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [selectedSuspect, setSelectedSuspect] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const scenario = useMemo(() => {
    return findScenario(router.query.scenarioId);
  }, [router.query.scenarioId]);

  const roomCode =
    typeof router.query.r === "string" ? router.query.r.toUpperCase() : "";

  useEffect(() => {
    if (!router.isReady || !scenario || !roomCode || isReady || isConnecting) {
      return;
    }

    let isCancelled = false;

    const connect = async () => {
      setIsConnecting(true);

      try {
        await insertCoin({
          skipLobby: true,
          roomCode,
          gameId: getSuspectVoteGameId(scenario.id),
        });

        if (!isCancelled) {
          setIsReady(true);
        }
      } finally {
        if (!isCancelled) {
          setIsConnecting(false);
        }
      }
    };

    void connect();

    return () => {
      isCancelled = true;
    };
  }, [isConnecting, isReady, roomCode, router.isReady, scenario]);

  const handleVote = (suspect: SuspectType) => {
    if (!scenario || !isReady) {
      return;
    }

    setSelectedSuspect(suspect.name);
    myPlayer().setState(getSuspectVoteStateKey(scenario.id), suspect.name, true);
  };

  if (!scenario) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#050816",
          color: "white",
        }}
      >
        <Typography>시나리오를 찾을 수 없습니다.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        px: 2,
        py: 2.5,
        color: "white",
        background:
          "radial-gradient(circle at top, rgba(59,130,246,0.18) 0%, rgba(5,8,22,0) 28%), linear-gradient(180deg, #0b1020 0%, #04060c 100%)",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 560,
          mx: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2.5,
          }}
        >
          <IconButton
            onClick={() => router.back()}
            sx={{
              color: "white",
              backgroundColor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography fontSize={12} sx={{ opacity: 0.66 }}>
            ROOM {roomCode}
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h5" fontWeight={800}>
            용의자 투표
          </Typography>
          <Typography sx={{ mt: 0.7, opacity: 0.68, fontSize: 14 }}>
            한 명을 선택하세요
          </Typography>
        </Box>

        {!isReady ? (
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
              투표방 연결 중
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 1.4,
            }}
          >
            {scenario.suspects.map((suspect) => {
              const selected = selectedSuspect === suspect.name;

              return (
                <Box
                  key={suspect.name}
                  onClick={() => handleVote(suspect)}
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
                  }}
                >
                  <Avatar
                    src={suspect.image}
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
        )}
      </Box>
    </Box>
  );
}
