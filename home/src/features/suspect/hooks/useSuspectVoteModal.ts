import { useEffect, useMemo, useState } from "react";

import {
  clearPlayroomRoomHash,
  getPlayroomVoteJoinUrl,
  getPlayroomVoteLockedStateKey,
  getPlayroomVoteStateKey,
  getPlayroomVoteSuspectsStateKey,
  loadPlayroomKit,
  withPlayroomTimeout,
} from "@/features/suspect/libs/playroomVote";
import {
  buildFinalRevealSteps,
  shouldDisableFinalReveal,
} from "@/features/suspect/libs/suspectVoteReveal";
import { SuspectType } from "@/features/suspect/types";

interface UseSuspectVoteModalParams {
  episodeNumber: number;
  isOpen: boolean;
  scenarioTitle: string;
  suspects: SuspectType[];
}

export const useSuspectVoteModal = ({
  episodeNumber,
  isOpen,
  scenarioTitle,
  suspects,
}: UseSuspectVoteModalParams) => {
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
  const finalRevealSteps = useMemo(
    () =>
      buildFinalRevealSteps({
        episodeNumber,
        scenarioTitle,
        voteSummary,
      }),
    [episodeNumber, scenarioTitle, voteSummary]
  );
  const isFinalRevealDisabled = useMemo(
    () => shouldDisableFinalReveal(voteSummary),
    [voteSummary]
  );
  const isFinalRevealReVote = useMemo(() => {
    const maxVoteCount = Math.max(...voteSummary.map(({ count }) => count), 0);

    if (maxVoteCount <= 0) {
      return false;
    }

    return voteSummary.filter(({ count }) => count === maxVoteCount).length === 2;
  }, [voteSummary]);
  const currentFinalRevealText = finalRevealSteps[finalRevealStepIndex];
  const isLastFinalRevealStep =
    finalRevealStepIndex === finalRevealSteps.length - 1;

  const persistRoomCode = (nextRoomCode: string) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(roomStorageKey, nextRoomCode);
    }
  };

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
    nextPlayroomModule.setState?.(getPlayroomVoteLockedStateKey(), false, true);
    setRoomCode(nextRoomCode);
    persistRoomCode(nextRoomCode);
  };

  const clearLocalRoomState = (options?: { preserveOpeningState?: boolean }) => {
    setPlayroomModule(null);
    setRoomCode(null);
    setRoomError(null);
    if (!options?.preserveOpeningState) {
      setIsOpeningRoom(false);
    }
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

  const createFreshRoom = async () => {
    const nextPlayroomModule = await loadPlayroomKit();
    nextPlayroomModule.Multiplayer?.reset?.();
    clearPlayroomRoomHash();
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(roomStorageKey);
    }

    await withPlayroomTimeout(
      nextPlayroomModule.insertCoin({
        skipLobby: true,
        gameId: "suspect-realtime-vote",
        defaultStates: {
          [getPlayroomVoteLockedStateKey()]: false,
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
    persistRoomCode(actualRoomCode);
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

      await createFreshRoom();
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
      clearLocalRoomState({ preserveOpeningState: true });
      await createFreshRoom();
    } catch {
      setRoomError("투표 방 생성 실패");
      clearLocalRoomState({ preserveOpeningState: true });
      setPlayroomModule(null);
      setRoomCode(null);
    }
    setIsOpeningRoom(false);
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

  const handleStartFinalReveal = () => {
    setIsFinalRevealMode(true);
    setFinalRevealStepIndex(0);
    playroomModule?.setState?.(getPlayroomVoteLockedStateKey(), true, true);
  };

  const handleFinishFinalReveal = () => {
    if (isFinalRevealReVote) {
      playroomModule?.setState?.(getPlayroomVoteLockedStateKey(), false, true);
    }

    setIsFinalRevealMode(false);
    setFinalRevealStepIndex(0);
  };

  return {
    currentFinalRevealText,
    finalRevealStepIndex,
    handleCopyLink,
    handleFinishFinalReveal,
    handleOpenRoom,
    handleReopenRoom,
    handleStartFinalReveal,
    isCopied,
    isFinalRevealDisabled,
    isFinalRevealMode,
    isFinalRevealReVote,
    isLastFinalRevealStep,
    isOpeningRoom,
    isResultVisible,
    joinUrl,
    leadingSuspectNames,
    roomCode,
    roomError,
    setFinalRevealStepIndex,
    setIsFinalRevealMode,
    setIsResultVisible,
    totalVotes,
    voteSummary,
    voterCount,
  };
};
