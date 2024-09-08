export interface QuizType {
  id: string;
  meetingId: string;
  quizNumber: number;
  title: string;
  creator: string | null;
  quizImageSource: string;
  answer: string | null;
  tags: Tags[];
}

type Tags =
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
  | "ONLY_FOR_MEEING"
  | "RIDDLE"
  | "ENIGMATIC"
  | "WORD"
  | "META";

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
