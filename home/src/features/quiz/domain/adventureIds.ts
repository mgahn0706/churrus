const LEGACY_ADVENTURE_MEETING_IDS: Record<string, string> = {
  "2026-ADVENTURE-AUTUMN-1": "2026-MOVE-FALL",
  "2026-MOVE-1": "2026-MOVE-SUMMER",
  "2026-MT-1": "2026-MOVE-WINTER",
  "2025-8": "2025-MOVE-SUMMER",
  "2025-2": "2025-MOVE-WINTER",
  "2024-8": "2024-MOVE-SUMMER",
  "2024-2": "2024-MOVE-WINTER",
  "2023-8": "2023-MOVE-SUMMER",
  "2023-2": "2023-MOVE-WINTER",
  "2022-8": "2022-MOVE-SUMMER",
  "2020-MT": "2020-MOVE-WINTER",
};

const ADVENTURE_MEETING_ID_PAIRS = Object.entries(
  LEGACY_ADVENTURE_MEETING_IDS
);

const replaceQuizMeetingId = (
  quizId: string,
  sourceMeetingId: string,
  targetMeetingId: string,
  numberOffset = 0
): string | undefined => {
  const prefix = `${sourceMeetingId}-`;
  if (!quizId.startsWith(prefix)) {
    return undefined;
  }

  const quizNumber = quizId.slice(prefix.length);
  if (!/^\d+$/.test(quizNumber)) {
    return undefined;
  }

  const targetNumber = Number(quizNumber) + numberOffset;
  return targetNumber >= 0 ? `${targetMeetingId}-${targetNumber}` : undefined;
};

export const resolveMeetingId = (meetingId: string): string =>
  LEGACY_ADVENTURE_MEETING_IDS[meetingId] ?? meetingId;

export const resolveQuizId = (quizId: string): string => {
  for (const [legacyMeetingId, meetingId] of ADVENTURE_MEETING_ID_PAIRS) {
    const numberOffset = legacyMeetingId === "2026-MT-1" ? 1 : 0;
    const resolved = replaceQuizMeetingId(
      quizId,
      legacyMeetingId,
      meetingId,
      numberOffset
    );
    if (resolved) {
      return resolved;
    }
  }
  return quizId;
};

export const getLegacyQuizId = (quizId: string): string => {
  for (const [legacyMeetingId, meetingId] of ADVENTURE_MEETING_ID_PAIRS) {
    const numberOffset = legacyMeetingId === "2026-MT-1" ? -1 : 0;
    const legacyId = replaceQuizMeetingId(
      quizId,
      meetingId,
      legacyMeetingId,
      numberOffset
    );
    if (legacyId) {
      return legacyId;
    }
  }
  return quizId;
};
