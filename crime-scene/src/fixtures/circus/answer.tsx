import { createScenarioReveal } from "@/components/createScenarioReveal";
import type { ScenarioAnswerConfig } from "@/types/answerPage";

export const circusAnswerConfig: ScenarioAnswerConfig = {
  scenarioKey: "circus",
  reveal: createScenarioReveal({
    culprit: "한매표",
    imageSrc: "/image/scenario/circus/circus-main.png",
    methodText:
      "정산을 확인하러 온 단장과 사무 공간에서 충돌해 그를 숨지게 했다.",
    motiveText: "누락된 입장권 현금 매출을 숨기려 했다.",
    targetText: "강단장을 숨지게 한 사람을",
  }),
  confess:
    "단장님이 정산표 원본을 가져오라고 하셨습니다. 이미 현금 내역이 맞지 않는 걸 알아채신 듯했어요. 사무 공간에서 이야기를 나누다가 제가 숨기던 일이 드러났고, 결국 단장님이 숨지셨습니다. 겁이 나서 아무 일도 없었던 것처럼 매표소에 있었던 척했습니다.",
  solution:
    "사건 추정 시각은 8시 10분부터 20분 사이입니다. 객석 영상에는 윤마술과 서곡예가 그 시간 내내 무대 위에 있고, 조명실 기록과 동료 증언은 오조명이 조명실에 있었음을 확인해 줍니다. 한매표는 무대 뒤에 가지 않았다고 했지만 출입 카드와 복도 영상에는 8시 12분 단장의 사무 공간에 들어가 8시 20분에 나오는 모습이 남아 있습니다. 그 사이 다른 사람은 드나들지 않았습니다. 단장의 메모, 정산표 원본과 수정된 집계표를 함께 보면 한매표가 현금 매출 누락을 숨길 동기도 확인할 수 있습니다.",
  culpritsHref: "/scenarios/scenario/circus",
  culpritsTabLabel: "사건 다시 보기",
  culpritsButtonLabel: "사건 다시 보기",
};
