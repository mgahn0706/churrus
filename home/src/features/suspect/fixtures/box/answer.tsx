import { createScenarioReveal } from "@/features/suspect/components/createScenarioReveal";
import { ScenarioAnswerConfig } from "@/features/suspect/types/answerPage";

export const boxAnswerConfig: ScenarioAnswerConfig = {
  scenarioKey: "box",
  missingDescription: <>아직 뒤주 살인사건의 답안이 제출되지 않았습니다.</>,
  reveal: createScenarioReveal({
    culprit: "배홍동",
    imageSrc: "/image/suspect/scenario/box/box-reveal.png",
    methodText: "정식 사건 해설을 준비 중입니다.",
    motiveText: "정식 사건 해설을 준비 중입니다.",
    targetText: "추도세자를 살해한 범인이",
  }),
  confess: <>정식 범인 고백을 준비 중입니다.</>,
  solution: <>정식 사건 풀이를 준비 중입니다.</>,
  additional: [],
  culpritsHref: "/suspect/scenario/box",
};
