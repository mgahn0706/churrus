export interface QuizType {
  id: string;
  meetingId: string;
  quizNumber: number;
  title: string;
  madeBy: string | null;
  quizImgSrc: string;
  answer: string | null;
  shouldWarn: boolean;
  isAnswerable: boolean;
  difficulty?: "easy" | "normal" | "hard";
}
