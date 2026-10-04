import { createScenarioReveal } from "@/features/suspect/components/createScenarioReveal";
import { ScenarioAnswerConfig } from "@/features/suspect/types/answerPage";

export const paradeAnswerConfig: ScenarioAnswerConfig = {
  scenarioKey: "parade",
  missingDescription: <></>,
  reveal: createScenarioReveal({
    culprit: "",
    imageSrc: "/image/suspect/scenario/parade/parade-reveal.png",
    methodText: "",
    motiveText: "",
    targetText: "",
  }),
  confess: <></>,
  solution: <></>,
  additional: [],
  culpritsHref: "",
};
