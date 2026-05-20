import { ReactNode } from "react";
import { ScenarioAnswerPage } from "@/features/suspect/components/ScenarioAnswerPage";
import {
  ScenarioAdditionalAnswerList,
  ScenarioAnswerText,
  ScenarioSolutionText,
} from "@/features/suspect/components/ScenarioAnswerContent";
import { ScenarioAnswerConfig } from "@/features/suspect/types/answerPage";
import { resolveWithSubmittedAnswer } from "@/features/suspect/types/resolvable";

function createAdditionalRenderer(config: ScenarioAnswerConfig) {
  if (!config.additional) {
    return undefined;
  }

  const additional = config.additional;

  if (Array.isArray(additional) && additional.length === 0) {
    return undefined;
  }

  function renderGeneratedAdditional(
    submittedAnswer: Parameters<ScenarioAnswerConfig["reveal"]>[0]
  ) {
    return (
      <ScenarioAdditionalAnswerList
        items={resolveWithSubmittedAnswer(additional, submittedAnswer)}
        submittedAnswer={submittedAnswer}
      />
    );
  }

  return renderGeneratedAdditional;
}

export function createScenarioAnswerPage(config: ScenarioAnswerConfig) {
  function ScenarioAnswer() {
    const renderAdditional =
      config.renderAdditional ?? createAdditionalRenderer(config);

    return (
      <ScenarioAnswerPage
        scenarioKey={config.scenarioKey}
        missingDescription={config.missingDescription}
        reveal={config.reveal}
        renderConfess={(submittedAnswer) => (
          <ScenarioAnswerText>
            {resolveWithSubmittedAnswer(config.confess, submittedAnswer)}
          </ScenarioAnswerText>
        )}
        renderAdditional={renderAdditional}
        renderSolution={(submittedAnswer) => (
          <ScenarioSolutionText>
            {resolveWithSubmittedAnswer(config.solution, submittedAnswer)}
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
