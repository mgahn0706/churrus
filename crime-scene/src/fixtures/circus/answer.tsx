import { createScenarioReveal } from "@/components/createScenarioReveal";
import type { ScenarioAnswerConfig } from "@/types/answerPage";

export const circusAnswerConfig: ScenarioAnswerConfig = {
  scenarioKey: "circus",
  reveal: createScenarioReveal({
    culprit: "빅 보스",
    imageSrc: "/image/scenario/circus/circus-reveal.png",
    methodText:
      "마취총으로 단장을 기절시킨 뒤 인간 처형식에 사용될 인간과 바꿔치기하여 불태워 살해했다.",
    motiveText:
      "단장이 자신을 배신하고 서커스를 버린 채 도주하려 한다는 사실에 분노하여 살해했다.",
    targetText: "프레디를 살해한 범인이",
  }),
  confess: (
    <>
      “그래, 내가 죽였다. 그 원숭이 녀석, 감히 날 속이고 도망칠 생각을 하더군.
      <br />
      내가 이 서커스에 얼마나 많은 돈을 쏟아부었는지 알아? 처음엔 그저 인간들이
      죽어 나가는 꼴을 구경하는 게 재미있었지. 그런데 시간이 지날수록
      시시해지더군. 그래서 단장에게 돈을 더 줄 테니 좀 더 자극적인 공연을 만들어
      보라고 했어. 그 녀석도 좋다면서 흔쾌히 받아들였지.
      <br />
      그런데 오늘, 우연히 녀석의 비밀 공간을 발견했어. 내일 출국할 항공권에 가짜
      여권, 보석까지 챙겨 놨더군. 날 배신하고 혼자 도망치려던 거야. 내가 그런
      배신자를 가만히 내버려 둘 것 같았나?
      <br />
      마침 오늘 공연의 마지막 순서가 인간 처형식이었지. 그걸 보고 아주 재미있는
      생각이 떠올랐어. 인간 대신 그 녀석을 태우면 어떨까? 그래서 마취총으로
      단장을 기절시키고, 처형에 사용할 인간과 바꿔치기했지. 나머지는 아무것도
      모르는 직원들이 알아서 해 줬고.
      <br />
      하하하! 자기가 만든 무대에서 자기가 불타 죽다니! 그 녀석도 마지막까지
      관객들을 즐겁게 해 줬으니 단장으로서 제 역할은 다한 셈이지.
      <br />
      아, 정말이지. 오늘 공연은 내 평생 본 것 중 최고였어!”
    </>
  ),
  solution:
    "사건 추정 시각은 8시 10분부터 20분 사이입니다. 객석 영상에는 윤마술과 서곡예가 그 시간 내내 무대 위에 있고, 조명실 기록과 동료 증언은 오조명이 조명실에 있었음을 확인해 줍니다. 한매표는 무대 뒤에 가지 않았다고 했지만 출입 카드와 복도 영상에는 8시 12분 단장의 사무 공간에 들어가 8시 20분에 나오는 모습이 남아 있습니다. 그 사이 다른 사람은 드나들지 않았습니다. 단장의 메모, 정산표 원본과 수정된 집계표를 함께 보면 한매표가 현금 매출 누락을 숨길 동기도 확인할 수 있습니다.",
  culpritsHref:
    "https://drive.google.com/file/d/1kRM9j9ENbOYLIswsUMZSzHVHVaPW-UIp/view?usp=sharing",
  culpritsTabLabel: "사건 다시 보기",
  culpritsButtonLabel: "사건 다시 보기",
};
