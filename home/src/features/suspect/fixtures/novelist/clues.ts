import { ClueType } from "@/features/suspect/types";
import { createAdditionalQuestions } from "../utils";

export const novelistAdditionalQuestions = createAdditionalQuestions([
  {
    question: "홍차에서 검출된 핵심 성분은 무엇인가요?",
    answer: "수면제 계열 진정 성분입니다.",
  },
  {
    question: "8시 41분에 원고 파일을 수정한 계정은 무엇인가요?",
    answer: "YH-Editorial 계정입니다.",
  },
  {
    question: "오민지의 USB가 보여주는 것은 무엇인가요?",
    answer: "오민지가 더 이른 시점의 초고를 갖고 있었고 표절 방향이 반대일 수 있다는 점입니다.",
  },
  {
    question: "서윤호가 범행을 서두른 직접적 이유는 무엇인가요?",
    answer:
      "신작 계약이 무산되면 실적과 편집장 지위를 잃을 위기였기 때문입니다.",
  },
]);

export const novelistClues: ClueType[] = [
  {
    id: 1,
    title: "피해자의 시신",
    x: 53.2,
    y: 58.4,
    description:
      "한서린은 작업실 소파 옆 바닥에서 쓰러진 채 발견되었다. 큰 외상은 없고, 질식 흔적이 희미하게 남아 있다.",
    type: "basic",
    image: "/image/suspect/scenario/novelist/novelist-reveal.png",
    place: "study",
  },
  {
    id: 2,
    title: "찢긴 계약서",
    x: 63.8,
    y: 43.6,
    description:
      "책상 위 계약서는 마지막 장이 찢겨 있다. 서명란 근처에는 서윤호의 지문이 선명하게 남아 있다.",
    type: "basic",
    image: "/image/suspect/scenario/novelist/novelist-main.png",
    place: "study",
  },
  {
    id: 3,
    title: "홍차 잔",
    x: 48.9,
    y: 42.7,
    description:
      "반쯤 식은 홍차 잔이다. 감식 결과 수면제 계열 진정 성분이 검출되었다.",
    type: "basic",
    image: "/image/suspect/scenario/novelist/novelist-main.png",
    place: "study",
  },
  {
    id: 4,
    title: "원고 노트북",
    x: 71.4,
    y: 34.2,
    description:
      "노트북의 원고 파일 마지막 수정 시각은 8시 41분이다. 수정 계정은 'YH-Editorial'로 기록되어 있다.",
    type: "basic",
    image: "/image/suspect/scenario/novelist/novelist-main.png",
    place: "study",
  },
  {
    id: 5,
    title: "쿠션",
    x: 39.8,
    y: 54.1,
    description:
      "소파 위 쿠션이다. 섬유에서 피해자의 타액 흔적이 검출되었다. 질식 도구로 쓰였을 가능성이 높다.",
    type: "basic",
    image: "/image/suspect/scenario/novelist/novelist-reveal.png",
    place: "study",
  },
  {
    id: 6,
    title: "오민지의 USB",
    x: 27.4,
    y: 48.5,
    description:
      "USB 안에는 한서린 차기작과 겹치는 문장이 있었지만, 파일 생성 시점은 훨씬 이전이다. 표절 방향이 반대일 가능성을 시사한다.",
    type: "basic",
    image: "/image/suspect/scenario/novelist/novelist-main.png",
    place: "study",
  },
  {
    id: 7,
    title: "로비 CCTV 기록",
    x: 61.7,
    y: 62.8,
    description:
      "강도현은 8시 24분에 건물을 나갔다. 서윤호는 8시 47분까지 로비에 내려오지 않았다.",
    type: "basic",
    image: "/image/suspect/scenario/novelist/novelist-main.png",
    place: "lounge",
  },
  {
    id: 8,
    title: "엘리베이터 점검 로그",
    x: 33.6,
    y: 36.9,
    description:
      "엘리베이터 내부 CCTV는 8시 43분부터 8시 46분까지 꺼져 있었다. 직전 점검 모드 비밀번호 입력자는 서윤호였다.",
    type: "basic",
    image: "/image/suspect/scenario/novelist/novelist-main.png",
    place: "lounge",
  },
  {
    id: 9,
    title: "출판사 내부 증언",
    x: 44.5,
    y: 23.1,
    description:
      "서윤호는 이번 신작 계약이 무산되면 실적과 직책 모두 위험해지는 상황이었다고 한다.",
    type: "basic",
    image: "/image/suspect/scenario/novelist/novelist-main.png",
    place: "lounge",
  },
  {
    id: 10,
    title: "익명 협박 메일",
    x: 75.8,
    y: 27.8,
    description:
      "메일함에는 표절 구조를 폭로하겠다는 협박성 메시지가 남아 있다. 누군가가 사건 전부터 원고 문제를 알고 있었다.",
    type: "basic",
    image: "/image/suspect/scenario/novelist/novelist-main.png",
    place: "lounge",
  },
  {
    id: 11,
    title: "찢긴 계약서 뒷면",
    x: 62.4,
    y: 49.4,
    description:
      "계약서 뒷면 메모에는 '오늘 끝내자. 더는 못 덮어준다'라는 문장이 적혀 있다.",
    type: "additional",
    image: "/image/suspect/scenario/novelist/novelist-reveal.png",
    place: 2,
  },
  {
    id: 12,
    title: "홍차 잔 바닥",
    x: 47.4,
    y: 47.9,
    description:
      "잔 바닥 침전물에서 빠르게 녹는 분말 약품 흔적이 추가로 확인되었다. 계획적 투약 가능성을 높인다.",
    type: "additional",
    image: "/image/suspect/scenario/novelist/novelist-reveal.png",
    place: 3,
  },
];
