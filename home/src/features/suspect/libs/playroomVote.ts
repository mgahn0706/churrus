type PlayroomModule = typeof import("playroomkit") & {
  Multiplayer?: {
    reset?: () => void;
  };
};

export const loadPlayroomKit = async (): Promise<PlayroomModule> => {
  return await import("playroomkit");
};

export const withPlayroomTimeout = async <T,>(
  promise: Promise<T>,
  ms: number
) => {
  return await Promise.race<T>([
    promise,
    new Promise<T>((_, reject) => {
      window.setTimeout(() => reject(new Error("TIMEOUT")), ms);
    }),
  ]);
};

export const getPlayroomVoteStateKey = () => "suspect-vote-choice";

export const getPlayroomVoteSuspectsStateKey = () => "suspect-vote-suspects";

export const getPlayroomVoteJoinUrl = (origin: string, roomCode: string) => {
  return `${origin}/suspect/vote?room=${encodeURIComponent(roomCode)}`;
};

export const clearPlayroomRoomHash = () => {
  if (typeof window === "undefined") {
    return;
  }

  const hash = window.location.hash.replace(/^#/, "");
  if (!hash) {
    return;
  }

  const params = new URLSearchParams(hash);
  params.delete("r");

  const nextHash = params.toString();
  const nextUrl = `${window.location.pathname}${window.location.search}${
    nextHash ? `#${nextHash}` : ""
  }`;

  window.history.replaceState(null, "", nextUrl);
};
