import { ClueType } from "@/features/suspect/types";
import { createAdditionalQuestions } from "../utils";

const SUBWAY_DUMMY_IMAGE = "/image/suspect/scenario/mt-main.png";

export const subwayAdditionalQuestions = createAdditionalQuestions([
  {
    question: "피해자가 사건 당일 역사에 온 이유는 무엇인가요?",
    answer: "지하철 외주 계약 비리 관련 제보자를 만나기 위해서였습니다.",
  },
  {
    question: "역사 CCTV에서 비어 있는 시간대가 생긴 이유는 무엇인가요?",
    answer: "점검 명목으로 일부 카메라 녹화가 임시 중단되어 있었습니다.",
  },
  {
    question: "피해자의 휴대폰 메모에 반복해서 적힌 숫자는 무엇을 의미하나요?",
    answer: "막차 직전 화물 반입 시각과 관련된 내부 제보 코드였습니다.",
  },
]);

export const subwayClues: ClueType[] = [
  {
    id: 1,
    title: "피해자 시신",
    x: 51.2,
    y: 63.8,
    image: SUBWAY_DUMMY_IMAGE,
    description:
      "막차가 지난 뒤 승강장 끝 안전문 근처에서 발견된 시신. 급하게 몸싸움이 있었던 흔적이 남아 있다.",
    type: "basic",
    place: "platform",
  },
  {
    id: 2,
    title: "깨진 교통카드",
    x: 33.5,
    y: 48.1,
    image: SUBWAY_DUMMY_IMAGE,
    description:
      "반으로 금이 간 교통카드. 피해자의 지문 외에 다른 사람의 지문이 희미하게 섞여 있다.",
    type: "basic",
    place: "platform",
  },
  {
    id: 3,
    title: "역무일지",
    x: 68.4,
    y: 22.6,
    image: SUBWAY_DUMMY_IMAGE,
    description:
      "야간 근무자가 남긴 일지. 특정 시간대 CCTV 점검 기록이 적혀 있지만 사유가 모호하다.",
    type: "basic",
    place: "ground",
  },
  {
    id: 4,
    title: "청소 구역 체크표",
    x: 58.9,
    y: 71.4,
    image: SUBWAY_DUMMY_IMAGE,
    description:
      "청소 관리자 장태수의 서명이 있는 체크표. 실제 동선과 기록 사이에 15분 정도 차이가 난다.",
    type: "basic",
    place: "platform",
  },
  {
    id: 5,
    title: "피해자 휴대폰 메모",
    x: 16.7,
    y: 35.2,
    image: SUBWAY_DUMMY_IMAGE,
    description:
      "‘23:41, 2번 출구, 운전실 아님’이라는 메모가 남아 있다. 제보자와의 약속으로 보인다.",
    type: "additional",
    place: 1,
  },
  {
    id: 6,
    title: "선로 점검 보고서",
    x: 73.1,
    y: 41.9,
    image: SUBWAY_DUMMY_IMAGE,
    description:
      "기관사 민도윤이 제출한 보고서. 평소 양식과 달리 일부 시간이 수기로 덧붙여져 있다.",
    type: "additional",
    place: 3,
  },
];
