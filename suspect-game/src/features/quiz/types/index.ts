export interface QuizType {
  id: string;
  quizNumber: number;
  title: string;
  madeBy: string | null;
  quizImgSrc: string;
  answer: string | null;
  shouldWarn: boolean;
  isAnswerable: boolean;
}
