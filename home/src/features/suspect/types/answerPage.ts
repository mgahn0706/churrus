import { ReactNode } from "react";
import { AnswerRevealSequence } from "@/features/suspect/components/AnswerRevealSequence";
import { DetectiveNoteType } from "./index";

export const DEFAULT_WRONG_ANSWER_SUBTEXT =
  "여러분을 감쪽같이 속인 범인은 바로...";

export type ScenarioAdditionalAnswerItem = {
  question: ReactNode;
  answer: ReactNode;
  showSubmittedAnswer?: boolean;
  submittedAnswerIndex?: number;
};

export type ScenarioAnswerConfig = {
  scenarioKey: string;
  missingDescription: ReactNode;
  reveal: (submittedAnswer: DetectiveNoteType) => React.ComponentProps<
    typeof AnswerRevealSequence
  >;
  confess: ReactNode | ((submittedAnswer: DetectiveNoteType) => ReactNode);
  solution: ReactNode | ((submittedAnswer: DetectiveNoteType) => ReactNode);
  additional?:
    | ScenarioAdditionalAnswerItem[]
    | ((submittedAnswer: DetectiveNoteType) => ScenarioAdditionalAnswerItem[]);
  renderAdditional?: (submittedAnswer: DetectiveNoteType) => ReactNode;
  culpritsHref: string;
  culpritsTabLabel?: string;
  culpritsButtonLabel?: string;
};
