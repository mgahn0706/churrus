import { createScenarioReveal } from "@/components/createScenarioReveal";
import type { ScenarioAnswerConfig } from "@/types/answerPage";

export const psychicAnswerConfig: ScenarioAnswerConfig = {
  scenarioKey: "psychic",
  reveal: createScenarioReveal({
    culprit: "실험체 A",
    imageSrc: "/image/scenario/psychic/psychic-reveal.png",
    methodText: "차에 초능력 알약을 타서 소장을 독살.",
    motiveText:
      "자금이 충분함에도 금전적 보상을 지급하지 않았고 소장이 의도적으로 짜장면만 먹인 것에 대한 배신감",
    targetText: "김짜장을 살해한 범인이",
  }),
  confess:
    "김짜장 소장님이 실험 원본을 가져오라고 하셨습니다. 공개 결과표에서 실패한 기록을 뺀 걸 알아채셨더군요. 자정 전 관찰실에서 이야기를 나누다가 돌이킬 수 없는 일이 벌어졌습니다. 겁이 나서 연구소를 떠났고, 다시 돌아오지 않았다고 거짓말했습니다.",
  solution:
    "4월 14일 오전부터 연구소의 기록을 따라가면 예지 실험의 공개 결과와 원본이 다르다는 점이 드러납니다. 저녁에 소장은 실험체 C에게 원본을 확인하겠다고 말했습니다. 자정 무렵 소장이 사체로 발견되고, C는 돌아오지 않았다는 말과 달리 행사 뒤 연구소에 다시 들어온 기록이 남아 있습니다. 이는 C의 동기와 기회를 가리킵니다. 이 결론과 대사는 추후 정식 원고로 교체할 임시 콘텐츠입니다.",
  culpritsHref: "/scenarios/scenario/psychic",
  culpritsTabLabel: "용의자 롤카드 PDF",
  culpritsButtonLabel: "용의자 롤카드 PDF 다운로드",
};
