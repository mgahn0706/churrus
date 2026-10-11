import { ScenarioAnswerPage } from "@/components/ScenarioAnswerPage";
import {
  ScenarioAdditionalAnswerList,
  ScenarioAnswerText,
  ScenarioSolutionText,
} from "@/components/ScenarioAnswerContent";
import { ScenarioAnswerConfig } from "@/types/answerPage";
import { resolveWithSubmittedAnswer } from "@/types/resolvable";

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
