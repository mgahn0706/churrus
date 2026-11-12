import { createScenarioReveal } from "@/components/createScenarioReveal";
import type { ScenarioAnswerConfig } from "@/types/answerPage";

export const psychicAnswerConfig: ScenarioAnswerConfig = {
  scenarioKey: "jjajang",
  reveal: createScenarioReveal({
    culprit: "실험체 C",
    imageSrc: "/image/scenario/jjajang/jjajang-main.png",
    methodText: "관찰실에서 소장과 충돌해 그를 숨지게 했다.",
    motiveText: "예지 실험 결과를 조작한 사실이 드러나는 것을 막으려 했다.",
    targetText: "김짜장 소장을 숨지게 한 사람을",
  }),
  confess:
    "김짜장 소장님이 실험 원본을 가져오라고 하셨습니다. 공개 결과표에서 실패한 기록을 뺀 걸 알아채셨더군요. 관찰실에서 이야기를 나누다가 돌이킬 수 없는 일이 벌어졌습니다. 겁이 나서 연구소를 떠났고, 다시 돌아오지 않았다고 거짓말했습니다.",
  solution:
    "사건 추정 시각은 8시 40분부터 8시 50분 사이입니다. 실험체 A는 그동안 생방송 인터뷰에, 실험체 B는 메인홀 시연 영상에 계속 등장합니다. 실험체 C는 돌아오지 않았다고 말했지만 출입 카드 기록에는 8시 41분 입장, 8시 51분 퇴장이 남아 있습니다. 복도 영상은 실험체 C가 8시 43분 관찰실에 들어가 8시 49분에 나왔으며 그 사이 다른 출입자가 없었음을 보여줍니다. 김짜장 소장의 메시지와 조작된 실험 결과표는 실험체 C가 관찰실에 간 이유와 원본을 숨기려 한 동기를 설명합니다.",
  culpritsHref: "/scenarios/scenario/jjajang",
  culpritsTabLabel: "사건 다시 보기",
  culpritsButtonLabel: "사건 다시 보기",
};
