import { ReactNode } from "react";
import { ScenarioAnswerPage } from "@/features/suspect/components/ScenarioAnswerPage";
import {
  ScenarioAdditionalAnswerList,
  ScenarioAnswerText,
  ScenarioSolutionText,
} from "@/features/suspect/components/ScenarioAnswerContent";
import { DetectiveNoteType } from "@/features/suspect/types";
import {
  ScenarioAdditionalAnswerItem,
  ScenarioAnswerConfig,
} from "@/features/suspect/types/answerPage";

function resolveContent(
  content: ReactNode | ((submittedAnswer: DetectiveNoteType) => ReactNode),
  submittedAnswer: DetectiveNoteType
): ReactNode;
function resolveContent(
  content:
    | ScenarioAdditionalAnswerItem[]
    | ((
        submittedAnswer: DetectiveNoteType
      ) => ScenarioAdditionalAnswerItem[]),
  submittedAnswer: DetectiveNoteType
): ScenarioAdditionalAnswerItem[];
function resolveContent(
  content:
    | ReactNode
    | ScenarioAdditionalAnswerItem[]
    | ((submittedAnswer: DetectiveNoteType) => ReactNode)
    | ((submittedAnswer: DetectiveNoteType) => ScenarioAdditionalAnswerItem[]),
  submittedAnswer: DetectiveNoteType
) {
  return typeof content === "function"
    ? content(submittedAnswer)
    : content;
}

export function createScenarioAnswerPage(config: ScenarioAnswerConfig) {
  function ScenarioAnswer() {
    return (
      <ScenarioAnswerPage
        scenarioKey={config.scenarioKey}
        missingDescription={config.missingDescription}
        reveal={config.reveal}
        renderConfess={(submittedAnswer) => (
          <ScenarioAnswerText>
            {resolveContent(config.confess, submittedAnswer)}
          </ScenarioAnswerText>
        )}
        renderAdditional={
          config.renderAdditional
            ? config.renderAdditional
            : config.additional
              ? (submittedAnswer) => (
                  <ScenarioAdditionalAnswerList
                    items={resolveContent(config.additional!, submittedAnswer)}
                    submittedAnswer={submittedAnswer}
                  />
                )
              : undefined
        }
        renderSolution={(submittedAnswer) => (
          <ScenarioSolutionText>
            {resolveContent(config.solution, submittedAnswer)}
          </ScenarioSolutionText>
        )}
        culpritsHref={config.culpritsHref}
        culpritsTabLabel={config.culpritsTabLabel}
        culpritsButtonLabel={config.culpritsButtonLabel}
      />
    );
  }

  ScenarioAnswer.displayName = `${config.scenarioKey}ScenarioAnswerPage`;

  return ScenarioAnswer;
}
