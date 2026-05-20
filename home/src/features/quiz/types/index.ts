export interface QuizType {
  id: string;
  meetingId: string;
  quizNumber: number;
  title: string;
  creators: string[];
  quizImageSource: string;
  answer: string | null;
  tags: Tags[];
}

export type Tags =
  | "EASY"
  | "HARD"
  | "DEDUCTION"
  | "PUZZLE"
  | "MATHEMATICS"
  | "LATERAL_THINKING"
  | "KNOWLEDGE"
  | "PATTERN"
  | "GEOMETRY"
  | "ADVENTURE"
  | "ONLY_FOR_MEETING"
  | "RIDDLE"
  | "ENIGMATIC"
  | "WORD"
  | "META";

export type QuizViewMode = "grid" | "list" | "tag";

export interface MeetingType {
  id: string;
  title: string;
  subtitle?: string;
  imageSource?: string;
  quizIds: string[];
  date: {
    year: number;
    month: number;
  };
}
