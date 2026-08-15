import { createScenarioReveal } from "@/features/suspect/components/createScenarioReveal";
import { ScenarioAnswerConfig } from "@/features/suspect/types/answerPage";

export const ghostAnswerConfig: ScenarioAnswerConfig = {
  scenarioKey: "ghost",
  missingDescription: (
    <>아직 귀신의 집 살인사건의 답안이 제출되지 않았습니다.</>
  ),
  reveal: createScenarioReveal({
    culprit: "기귀신",
    imageSrc: "/image/suspect/scenario/ghost/ghost-reveal.png",
    methodText: "정식 사건 해설을 준비 중입니다.",
    motiveText: "정식 사건 해설을 준비 중입니다.",
    targetText: "우물안을 살해한 범인이",
  }),
  confess: <>정식 범인 고백을 준비 중입니다.</>,
  solution: <>정식 사건 풀이를 준비 중입니다.</>,
  additional: [],
  culpritsHref: "/suspect/scenario/ghost",
};
