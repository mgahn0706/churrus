import { SuspectType } from "@/features/suspect/types";

type PlayroomKitModule = typeof import("playroomkit");

export const getSuspectVoteGameId = (scenarioId: string) =>
  `suspect-vote-${scenarioId}`;

export const getSuspectVoteStateKey = (scenarioId: string) =>
  `suspect-vote:${scenarioId}`;

export const createSuspectVoteRoomCode = () => {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 6 }, () => {
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  }).join("");
};

export const getSuspectVoteJoinUrl = (
  origin: string,
  scenarioId: string,
  roomCode: string
) =>
  `${origin}/suspect/scenario/${scenarioId}/vote?r=${encodeURIComponent(roomCode)}`;

export const withTimeout = async <T,>(promise: Promise<T>, ms: number) => {
  return await Promise.race<T>([
    promise,
    new Promise<T>((_, reject) => {
      window.setTimeout(() => reject(new Error("TIMEOUT")), ms);
    }),
  ]);
};

export const loadPlayroomKit = async (): Promise<PlayroomKitModule> => {
  return await import("playroomkit");
};

export const countVotesBySuspect = (
  suspects: SuspectType[],
  votes: Array<string | null | undefined>
) => {
  return suspects.map((suspect) => ({
    suspect,
    count: votes.filter((vote) => vote === suspect.name).length,
  }));
};
