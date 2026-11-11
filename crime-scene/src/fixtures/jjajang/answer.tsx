import { createScenarioReveal } from "@/components/createScenarioReveal";
import type { ScenarioAnswerConfig } from "@/types/answerPage";

export const jjajangAnswerConfig: ScenarioAnswerConfig = {
  scenarioKey: "jjajang",
  reveal: createScenarioReveal({
    culprit: "박경리",
    imageSrc: "/image/scenario/jjajang/jjajang-main.png",
    methodText: "정산을 따지러 사무실에 온 최사장과 충돌해 그를 숨지게 했다.",
    motiveText: "매출 장부의 누락된 현금 내역을 들키지 않으려 했다.",
    targetText: "최사장을 숨지게 한 사람을",
  }),
  confess:
    "장부를 가져오라는 메시지를 받고 돌아갔어요. 빠진 현금 내역을 사장님이 알아챈 걸 보고 겁이 났습니다. 말다툼 끝에 사장님이 숨졌고, 저는 그대로 가게를 떠났어요. 퇴근한 뒤 돌아오지 않았다고 거짓말한 것도 그 때문입니다.",
  solution:
    "최사장의 메시지는 박경리가 8시 31분 이후 사무실로 돌아올 이유를 보여줍니다. 출입 카드 기록은 박경리가 추정 사망 시각인 8시 40분부터 8시 50분 사이 사무실 쪽 복도에 있었음을 확인해 줍니다. 퇴근 후 돌아오지 않았다는 진술도 기록과 어긋납니다. 강주방은 주방 카메라에 계속 보이고, 이배달은 배달지의 수령 기록으로 가게 밖에 있었음을 확인할 수 있습니다. 장부의 현금 누락은 박경리에게 정산을 숨길 동기가 있었음을 뒷받침합니다.",
  culpritsHref: "/scenarios/scenario/jjajang",
  culpritsTabLabel: "사건 다시 보기",
  culpritsButtonLabel: "사건 다시 보기",
};
