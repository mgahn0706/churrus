import { AdditionalQuestionType, ClueType } from "@/features/suspect/types";

export const bluemoonAdditionalQuestions: AdditionalQuestionType[] = [];

export const bluemoonClues: ClueType[] = [
  {
    id: 1,
    title: "김관우의 시신",
    x: 56.1,
    y: 54.2,
    image: "/image/suspect/scenario/bluemoon/clues/bluemoon-1.png",
    description:
      "탐관오리 김관우의 시신이다. 넘어지며 머리를 강하게 부딪힌 흔적과 함께, 입 주변에는 옅은 거품 자국이 남아 있다.",
    type: "basic",
    place: "village",
  },
  {
    id: 2,
    title: "깨진 술병",
    x: 63.4,
    y: 67.5,
    image: "/image/suspect/scenario/bluemoon/clues/bluemoon-2.png",
    description:
      "시신 근처에서 발견된 술병 파편이다. 병의 입구 쪽에 진한 약재 냄새가 남아 있다.",
    type: "basic",
    place: "village",
  },
  {
    id: 3,
    title: "향리의 장부",
    x: 34.6,
    y: 36.2,
    image: "/image/suspect/scenario/bluemoon/clues/bluemoon-3.png",
    description:
      "관청의 세금 장부다. 김관우가 개인적으로 거둔 추가 금액이 표시되어 있고, 일부 페이지가 급히 찢겨 있다.",
    type: "basic",
    place: "village",
  },
  {
    id: 4,
    title: "허순의 약첩",
    x: 74.4,
    y: 24.7,
    image: "/image/suspect/scenario/bluemoon/clues/bluemoon-4.png",
    description:
      "약방에서 쓰는 약첩이다. 진정 작용이 강한 약재와 함께 소량 복용 시 어지럼증을 일으킬 수 있는 성분이 적혀 있다.",
    type: "basic",
    place: "market",
  },
  {
    id: 5,
    title: "월향루 출입기록",
    x: 28.2,
    y: 62.9,
    image: "/image/suspect/scenario/bluemoon/clues/bluemoon-5.png",
    description:
      "기방 월향루의 출입기록이다. 사건 시각 직전, 가영이 관청으로 향했다는 기록과 함께 누군가의 이름이 덧칠되어 있다.",
    type: "basic",
    place: "market",
  },
  {
    id: 6,
    title: "낙관이 찍힌 밀서",
    x: 46.8,
    y: 44.1,
    image: "/image/suspect/scenario/bluemoon/clues/bluemoon-6.png",
    description:
      "청나라 사신과의 거래를 암시하는 밀서다. 김관우의 낙관이 찍혀 있으며, 약재 반출에 대한 대가가 적혀 있다.",
    type: "basic",
    place: "market",
  },
];
