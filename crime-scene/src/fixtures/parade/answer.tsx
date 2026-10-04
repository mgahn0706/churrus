import { createScenarioReveal } from "@/components/createScenarioReveal";
import { ScenarioAnswerConfig } from "@/types/answerPage";

export const paradeAnswerConfig: ScenarioAnswerConfig = {
  scenarioKey: "parade",
  missingDescription: <></>,
  reveal: createScenarioReveal({
    culprit: "",
    imageSrc: "/image/scenario/parade/parade-reveal.png",
    methodText: "",
    motiveText: "",
    targetText: "",
  }),
  confess: <></>,
  solution: <></>,
  additional: [],
  culpritsHref: "",
};
