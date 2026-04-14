import { DetectiveNoteType } from "@/features/suspect/types";
import { DEFAULT_WRONG_ANSWER_SUBTEXT } from "@/features/suspect/types/answerPage";
import {
  ResolvableWithSubmittedAnswer,
  resolveWithSubmittedAnswer,
} from "@/features/suspect/types/resolvable";
import { AnswerRevealSequence } from "./AnswerRevealSequence";

type RevealConfig = {
  culprit: string;
  imageSrc: string;
  methodText: string;
  motiveText: string;
  targetText: ResolvableWithSubmittedAnswer<string>;
  accusedText?: (submittedAnswer: DetectiveNoteType) => string;
  isCorrect?: (submittedAnswer: DetectiveNoteType) => boolean;
  resultText?: (submittedAnswer: DetectiveNoteType) => string;
  resultSubtext?: (submittedAnswer: DetectiveNoteType) => string | undefined;
  showYouText?: (submittedAnswer: DetectiveNoteType) => boolean;
  imageAlt?: string;
  methodLabel?: string;
  motiveLabel?: string;
};

export function createScenarioReveal(config: RevealConfig) {
  return (
    submittedAnswer: DetectiveNoteType
  ): React.ComponentProps<typeof AnswerRevealSequence> => {
    const isCorrect = config.isCorrect
      ? config.isCorrect(submittedAnswer)
      : submittedAnswer.accusedSuspect === config.culprit;

    return {
      accusedText: config.accusedText
        ? config.accusedText(submittedAnswer)
        : submittedAnswer.accusedSuspect,
      culpritText: config.culprit,
      imageAlt: config.imageAlt,
      imageSrc: config.imageSrc,
      methodLabel: config.methodLabel,
      methodText: config.methodText,
      motiveLabel: config.motiveLabel,
      motiveText: config.motiveText,
      myMethodText: submittedAnswer.howDunnit,
      myMotiveText: submittedAnswer.whyDunnit,
      resultText: config.resultText
        ? config.resultText(submittedAnswer)
        : isCorrect
          ? "맞습니다!"
          : "아닙니다!",
      resultSubtext: config.resultSubtext
        ? config.resultSubtext(submittedAnswer)
        : isCorrect
          ? undefined
          : DEFAULT_WRONG_ANSWER_SUBTEXT,
      showYouText: config.showYouText?.(submittedAnswer),
      targetText: resolveWithSubmittedAnswer(
        config.targetText,
        submittedAnswer
      ),
    };
  };
}
