import { AdditionalQuestionType } from "@/features/suspect/types";

type AdditionalQuestionInput = Omit<AdditionalQuestionType, "no">;

export const createAdditionalQuestions = (
  questions: AdditionalQuestionInput[]
): AdditionalQuestionType[] => {
  return questions.map((question, index) => ({
    no: index + 1,
    ...question,
  }));
};
