type PlayroomModule = typeof import("playroomkit");

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
