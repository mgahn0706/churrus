import { QuizType } from "../types";

export const MEETINGS = [
  "2023-11",
  "2023-9",
  "2023-6",
  "2023-4",
  "2023-3",
  "2023-1-1",
  "2022-12",
  "2022-11",
  "2022-9",
  "2022-7",
  "2022-6",
  "2019-11",
  "2019-9",
] as const;

export const MeetingData: Record<
  string,
  {
    title: string;
    subtitle?: string;
    color: string;
  }
> = {
  "2019-9": {
    title: "2019년 9월 정기모임",
    color: "#ffe2db",
  },
  "2019-11": {
    title: "2019년 11월 정기모임",
    color: "#cef0ff",
  },
  "2022-6": {
    title: "2022년 6월 정기모임",
    color: "#d7f4dd",
  },
  "2022-7": {
    title: "2022년 7월 정기모임",
    color: "#fde2e2",
  },
  "2022-9": {
    title: "2022년 9월 정기모임",
    color: "#e2e2ff",
  },
  "2022-11": {
    title: "2022년 11월 정기모임",
    color: "#bbd0fc",
    subtitle: "달나라 너머",
  },
  "2022-12": {
    title: "2022년 12월 정기모임",
    color: "#fff3d4",
  },
  "2023-1-1": {
    title: "2023년 1월 1차 정기모임",
    color: "#f4beab",
    subtitle: "토끼와 거북이",
  },
  "2023-3": {
    title: "2023년 3월 정기모임",
    color: "#fde2e2",
    subtitle: "2023 추러스 OT",
  },
  "2023-4": {
    title: "2023년 4월 정기모임",
    color: "#c3e0f4",
    subtitle: "게임 속 여행",
  },
  "2023-6": {
    title: "2023년 6월 정기모임",
    color: "#b1b1b1",
  },
  "2023-9": {
    title: "2023년 9월 정기모임",
    color: "#fde2e2",
    subtitle: "Welcome to CHURRUS",
  },
  "2023-11": {
    title: "2023년 11월 정기모임",
    color: "#d3f6f6",
    subtitle: "일찍 온 크리스마스",
  },
};

export const QuizData: Record<string, QuizType[]> = {
  "2019-9": [
    {
      id: "2019-9-1",
      quizNumber: 1,
      title: "스파이의 암호",
      madeBy: null,
      quizImgSrc: "/image/quiz/2019-9-1.png",
      answer: "9293191",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2019-9-2",
      quizNumber: 2,
      title: "나는 누구지?",
      madeBy: null,
      quizImgSrc: "/image/quiz/2019-9-2.png",
      answer: "art",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2019-9-3",
      quizNumber: 3,
      title: "알파벳과 화살표",
      madeBy: null,
      quizImgSrc: "/image/quiz/2019-9-3.png",
      answer: "TRUTH",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2019-9-4",
      quizNumber: 4,
      title: "코난의 집 비밀번호",
      madeBy: null,
      quizImgSrc: "/image/quiz/2019-9-4.png",
      answer: "3",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2019-9-5",
      quizNumber: 5,
      title: "아파트 살인사건",
      madeBy: null,
      quizImgSrc: "/image/quiz/2019-9-5.png",
      answer: "3",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2019-9-6",
      quizNumber: 6,
      title: "이상한 농구게임",
      madeBy: null,
      quizImgSrc: "/image/quiz/2019-9-6.png",
      answer: null,
      shouldWarn: false,
      isAnswerable: false,
    },
    {
      id: "2019-9-7",
      quizNumber: 7,
      title: "우리은행 적금 이벤트",
      madeBy: null,
      quizImgSrc: "/image/quiz/2019-9-7.png",
      answer: "5",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2019-9-8",
      quizNumber: 8,
      title: "Red-Blue Grid",
      madeBy: null,
      quizImgSrc: "/image/quiz/2019-9-8.png",
      answer: "매듭",
      shouldWarn: false,
      isAnswerable: true,
    },
  ],
  "2019-11": [
    {
      id: "2019-11-1",
      quizNumber: 1,
      title: "블록이 의미하는 것",
      madeBy: null,
      quizImgSrc: "/image/quiz/2019-11-1.png",
      answer: "36",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2019-11-2",
      quizNumber: 2,
      title: "외국인의 쪽지",
      madeBy: null,
      quizImgSrc: "/image/quiz/2019-11-2.png",
      answer: "BD",
      shouldWarn: false,
      isAnswerable: true,
    },

    {
      id: "2019-11-3",
      quizNumber: 3,
      title: "베이컨 가의 화살표",
      madeBy: null,
      quizImgSrc: "/image/quiz/2019-11-3.png",
      answer: "0221",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2019-11-4",
      quizNumber: 4,
      title: "수학 수업 도구",
      madeBy: null,
      quizImgSrc: "/image/quiz/2019-11-4.png",
      answer: "LOGIC",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2019-11-5",
      quizNumber: 5,
      title: "프라하 호텔 살인사건",
      madeBy: null,
      quizImgSrc: "/image/quiz/2019-11-5.png",
      answer: null,
      shouldWarn: false,
      isAnswerable: false,
    },
    {
      id: "2019-11-6",
      quizNumber: 6,
      title: "지원이의 여행",
      madeBy: null,
      quizImgSrc: "/image/quiz/2019-11-6.png",
      answer: "AMSTERDAM",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2019-11-7",
      quizNumber: 7,
      title: "금고털기",
      madeBy: null,
      quizImgSrc: "/image/quiz/2019-11-7.png",
      answer: "3",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2019-11-8",
      quizNumber: 8,
      title: "지훈이네 마라탕",
      madeBy: null,
      quizImgSrc: "/image/quiz/2019-11-8.png",
      answer: null,
      shouldWarn: false,
      isAnswerable: false,
    },
  ],
  "2022-6": [
    {
      id: "2022-6-1",
      quizNumber: 1,
      title: "재준이에게 무슨 일이",
      madeBy: null,
      quizImgSrc: "/image/quiz/2022-6-1.png",
      answer: null,
      shouldWarn: false,
      isAnswerable: false,
    },
    {
      id: "2022-6-2",
      quizNumber: 2,
      title: "귀신소동",
      madeBy: null,
      quizImgSrc: "/image/quiz/2022-6-2.png",
      answer: null,
      shouldWarn: false,
      isAnswerable: false,
    },
    {
      id: "2022-6-3",
      quizNumber: 3,
      title: "숫자 변환기",
      madeBy: null,
      quizImgSrc: "/image/quiz/2022-6-3.png",
      answer: "mouth",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2022-6-4",
      quizNumber: 4,
      title: "수리과학부의 인재",
      madeBy: "김지훈",
      quizImgSrc: "/image/quiz/2022-6-4.png",
      answer: null,
      shouldWarn: false,
      isAnswerable: false,
    },
  ],
  "2022-7": [
    {
      id: "2022-7-1",
      quizNumber: 1,
      title: "100으로 나누기",
      madeBy: null,
      quizImgSrc: "/image/quiz/2022-7-1.png",
      answer: null,
      shouldWarn: false,
      isAnswerable: false,
    },
    {
      id: "2022-7-2",
      quizNumber: 2,
      title: "Random Numbers?",
      madeBy: null,
      quizImgSrc: "/image/quiz/2022-7-2.png",
      answer: "123",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2022-7-3",
      quizNumber: 3,
      title: "골든벨 중학교",
      madeBy: null,
      quizImgSrc: "/image/quiz/2022-7-3.png",
      answer: "0",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2022-7-4",
      quizNumber: 4,
      title: "표에 들어갈 숫자는?",
      madeBy: null,
      quizImgSrc: "/image/quiz/2022-7-4.png",
      answer: "9",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2022-7-5",
      quizNumber: 5,
      title: "숫자의 의미",
      madeBy: null,
      quizImgSrc: "/image/quiz/2022-7-5.png",
      answer: "detective",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2022-7-6",
      quizNumber: 6,
      title: "자취방 정리",
      madeBy: null,
      quizImgSrc: "/image/quiz/2022-7-6.png",
      answer: "lookbehindyou",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2022-7-7",
      quizNumber: 7,
      title: "A-A",
      madeBy: null,
      quizImgSrc: "/image/quiz/2022-7-7.png",
      answer: "7",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2022-7-8",
      quizNumber: 8,
      title: "Three-digit",
      madeBy: null,
      quizImgSrc: "/image/quiz/2022-7-8.png",
      answer: "6",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2022-7-9",
      quizNumber: 9,
      title: "범인은 몇 호?",
      madeBy: null,
      quizImgSrc: "/image/quiz/2022-7-9.png",
      answer: "1106",
      shouldWarn: false,
      isAnswerable: true,
    },
  ],
  "2022-9": [
    {
      id: "2022-9-1",
      quizNumber: 1,
      title: "연쇄 도난 사건의 범인",
      madeBy: null,
      quizImgSrc: "/image/quiz/2022-9-1.png",
      answer: "2",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2022-9-2",
      quizNumber: 2,
      title: "성냥개비",
      madeBy: null,
      quizImgSrc: "/image/quiz/2022-9-2.png",
      answer: null,
      shouldWarn: false,
      isAnswerable: false,
    },
    {
      id: "2022-9-3",
      quizNumber: 3,
      title: "Next Alphabet",
      madeBy: null,
      quizImgSrc: "/image/quiz/2022-9-3.png",
      answer: "Y",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2022-9-4",
      quizNumber: 4,
      title: "흑백 디지털 숫자",
      madeBy: null,
      quizImgSrc: "/image/quiz/2022-9-4.png",
      answer: "8",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2022-9-5",
      quizNumber: 5,
      title: "이상한 뺄셈",
      madeBy: null,
      quizImgSrc: "/image/quiz/2022-9-5.png",
      answer: "1",
      shouldWarn: false,
      isAnswerable: true,
    },
  ],
  "2022-11": [
    {
      id: "2022-11-1",
      quizNumber: 1,
      title: "어디서 만날까?",
      madeBy: "안민규",
      quizImgSrc: "/image/quiz/2022-11-1.png",
      answer: "입술",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2022-11-2",
      quizNumber: 2,
      title: "버튼에 들어갈 숫자는?",
      madeBy: "강재호",
      quizImgSrc: "/image/quiz/2022-11-2.png",
      answer: "2",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2022-11-3",
      quizNumber: 3,
      title: "우주선의 표지판",
      madeBy: "강재호",
      quizImgSrc: "/image/quiz/2022-11-3.png",
      answer: null,
      shouldWarn: false,
      isAnswerable: false,
    },
    {
      id: "2022-11-4",
      quizNumber: 4,
      title: "재준이의 구조신호",
      madeBy: "강재호",
      quizImgSrc: "/image/quiz/2022-11-4.png",
      answer: "1",
      shouldWarn: true,
      isAnswerable: true,
    },
    {
      id: "2022-11-5",
      quizNumber: 5,
      title: "몰아치는 공격",
      madeBy: "안민규",
      quizImgSrc: "/image/quiz/2022-11-5.png",
      answer: "game",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2022-11-6",
      quizNumber: 6,
      title: "추러스 행성의 외계인들",
      madeBy: "안민규",
      quizImgSrc: "/image/quiz/2022-11-6.png",
      answer: "Jj",
      shouldWarn: true,
      isAnswerable: true,
    },
    {
      id: "2022-11-7",
      quizNumber: 7,
      title: "고장난 화면",
      madeBy: "안민규",
      quizImgSrc: "/image/quiz/2022-11-7.png",
      answer: "02",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2022-11-8",
      quizNumber: 8,
      title: "동전을 나눠주세요",
      madeBy: "강재호",
      quizImgSrc: "/image/quiz/2022-11-8.png",
      answer: null,
      shouldWarn: false,
      isAnswerable: false,
    },
  ],
  "2022-12": [
    {
      id: "2022-12-1",
      quizNumber: 1,
      title: "비밀 메시지 복구",
      madeBy: "강재호",
      quizImgSrc: "/image/quiz/2022-12-1.png",
      answer: null,
      shouldWarn: false,
      isAnswerable: false,
    },
    {
      id: "2022-12-2",
      quizNumber: 2,
      title: "동물빼기",
      madeBy: "고재준",
      quizImgSrc: "/image/quiz/2022-12-2.png",
      answer: "9",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2022-12-3",
      quizNumber: 3,
      title: "카타르 월드컵",
      madeBy: "고재준",
      quizImgSrc: "/image/quiz/2022-12-3.png",
      answer: "0.5",
      shouldWarn: false,
      isAnswerable: true,
    },
  ],
  "2023-1-1": [
    {
      id: "2023-1-1",
      quizNumber: 1,
      title: "나는 누구일까요?",
      madeBy: "안민규",
      quizImgSrc: "/image/quiz/2023-1-1.png",
      answer: "피노키오",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2023-1-2",
      quizNumber: 2,
      title: "하나만 추가해서",
      madeBy: "고재준",
      quizImgSrc: "/image/quiz/2023-1-2.png",
      answer: null,
      shouldWarn: false,
      isAnswerable: false,
    },
    {
      id: "2023-1-3",
      quizNumber: 3,
      title: "수식 타일",
      madeBy: "강재호",
      quizImgSrc: "/image/quiz/2023-1-3.png",
      answer: "6",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2023-1-4",
      quizNumber: 4,
      title: "왕은 있지만",
      madeBy: "김지훈",
      quizImgSrc: "/image/quiz/2023-1-4.png",
      answer: "침대",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2023-1-5",
      quizNumber: 5,
      title: "나는 X하다",
      madeBy: "김지훈",
      quizImgSrc: "/image/quiz/2023-1-5.png",
      answer: "말이 없는",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2023-1-6",
      quizNumber: 6,
      title: "해달별 조각을 모으자",
      madeBy: "고재준",
      quizImgSrc: "/image/quiz/2023-1-6.png",
      answer: "12",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2023-1-7",
      quizNumber: 7,
      title: "구역을 나눠라",
      madeBy: "강재호",
      quizImgSrc: "/image/quiz/2023-1-7.png",
      answer: null,
      shouldWarn: false,
      isAnswerable: false,
    },
    {
      id: "2023-1-8",
      quizNumber: 8,
      title: "두부 자르기",
      madeBy: "안민규",
      quizImgSrc: "/image/quiz/2023-1-8.png",
      answer: null,
      shouldWarn: false,
      isAnswerable: false,
    },
    {
      id: "2023-1-9",
      quizNumber: 9,
      title: "마지막 조각",
      madeBy: "안민규",
      quizImgSrc: "/image/quiz/2023-1-9.png",
      answer: "1",
      shouldWarn: true,
      isAnswerable: true,
    },
  ],

  "2023-3": [
    {
      id: "2023-3-1",
      quizNumber: 1,
      title: "네모 안의 두 숫자",
      madeBy: null,
      quizImgSrc: "/image/quiz/2023-3-1.png",
      answer: "4",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2023-3-2",
      quizNumber: 2,
      title: "삼각형과 원",
      madeBy: null,
      quizImgSrc: "/image/quiz/2023-3-2.png",
      answer: null,
      shouldWarn: false,
      isAnswerable: false,
    },
    {
      id: "2023-3-3",
      quizNumber: 3,
      title: "생쥐 잡기",
      madeBy: null,
      quizImgSrc: "/image/quiz/2023-3-3.png",
      answer: null,
      shouldWarn: false,
      isAnswerable: false,
    },
    {
      id: "2023-3-4",
      quizNumber: 4,
      title: "피튀기는 경기 결과",
      madeBy: null,
      quizImgSrc: "/image/quiz/2023-3-4.png",
      answer: "0/100/0",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2023-3-5",
      quizNumber: 5,
      title: "자물쇠와 열쇠",
      madeBy: null,
      quizImgSrc: "/image/quiz/2023-3-5.png",
      answer: "4",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2023-3-6",
      quizNumber: 6,
      title: "성냥개비 블록",
      madeBy: null,
      quizImgSrc: "/image/quiz/2023-3-6.png",
      answer: null,
      shouldWarn: false,
      isAnswerable: false,
    },
    {
      id: "2023-3-7",
      quizNumber: 7,
      title: "재준이의 최애 날짜들",
      madeBy: null,
      quizImgSrc: "/image/quiz/2023-3-7.png",
      answer: null,
      shouldWarn: true,
      isAnswerable: false,
    },
    {
      id: "2023-3-8",
      quizNumber: 8,
      title: "BLACK? WHITE?",
      madeBy: null,
      quizImgSrc: "/image/quiz/2023-3-8.png",
      answer: "BLACK",
      shouldWarn: false,
      isAnswerable: true,
    },
  ],
  "2023-4": [
    {
      id: "2023-4-1",
      quizNumber: 1,
      title: "현실과 다른 세계",
      madeBy: "김태우",
      quizImgSrc: "/image/quiz/2023-4-1.png",
      answer: null,
      shouldWarn: false,
      isAnswerable: false,
    },
    {
      id: "2023-4-2",
      quizNumber: 2,
      title: "HIGH SCORE",
      madeBy: "김태연",
      quizImgSrc: "/image/quiz/2023-4-2.png",
      answer: "21-7-3",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2023-4-3",
      quizNumber: 3,
      title: "카드 넣기",
      madeBy: "안민규",
      quizImgSrc: "/image/quiz/2023-4-3.png",
      answer: null,
      shouldWarn: false,
      isAnswerable: false,
    },
    {
      id: "2023-4-4",
      quizNumber: 4,
      title: "날짜는 언제인가요",
      madeBy: "안민규",
      quizImgSrc: "/image/quiz/2023-4-4.png",
      answer: "TODAY",
      shouldWarn: true,
      isAnswerable: true,
    },
    {
      id: "2023-4-5",
      quizNumber: 5,
      title: "게임 속 세계여행",
      madeBy: "강재호",
      quizImgSrc: "/image/quiz/2023-4-5.png",
      answer: null,
      shouldWarn: false,
      isAnswerable: false,
    },
    {
      id: "2023-4-6",
      quizNumber: 6,
      title: "손맛 전자 빠른 수리",
      madeBy: "안현수",
      quizImgSrc: "/image/quiz/2023-4-6.png",
      answer: null,
      shouldWarn: false,
      isAnswerable: false,
    },
    {
      id: "2023-4-7",
      quizNumber: 7,
      title: "ERROR MESSAGE",
      madeBy: "김현준",
      quizImgSrc: "/image/quiz/2023-4-7.png",
      answer: "추러스",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2023-4-8",
      quizNumber: 8,
      title: "LOCALE",
      madeBy: "김지훈",
      quizImgSrc: "/image/quiz/2023-4-8.png",
      answer: null,
      shouldWarn: false,
      isAnswerable: false,
    },
  ],
  "2023-6": [
    {
      id: "2023-6-1",
      quizNumber: 1,
      title: "I was the color of...",
      madeBy: "김현준",
      quizImgSrc: "/image/quiz/2023-6-1.png",
      answer: "google",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2023-6-2",
      quizNumber: 2,
      title: "Find missing alphabet",
      madeBy: "고재준",
      quizImgSrc: "/image/quiz/2023-6-2.png",
      answer: "DBE",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2023-6-3",
      quizNumber: 3,
      title: "Solve this puzzle",
      madeBy: "김현준",
      quizImgSrc: "/image/quiz/2023-6-3.png",
      answer: "ABRACADABRA",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2023-6-4",
      quizNumber: 4,
      title: "강한 순서대로 나열하시오",
      madeBy: "김현준",
      quizImgSrc: "/image/quiz/2023-6-4.png",
      answer: "BCF",
      shouldWarn: false,
      isAnswerable: true,
    },
  ],
  "2023-9": [
    {
      id: "2023-9-1",
      quizNumber: 1,
      title: "카운트다운",
      madeBy: "안민규",
      quizImgSrc: "/image/quiz/2023-9-1.png",
      answer: null,
      shouldWarn: false,
      isAnswerable: false,
    },
    {
      id: "2023-9-2",
      quizNumber: 2,
      title: "우리 가족",
      madeBy: "강재호",
      quizImgSrc: "/image/quiz/2023-9-2.png",
      answer: null,
      shouldWarn: false,
      isAnswerable: false,
    },
    {
      id: "2023-9-3",
      quizNumber: 3,
      title: "동전 교환기",
      madeBy: "안민규",
      quizImgSrc: "/image/quiz/2023-9-3.png",
      answer: "NOCOIN",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2023-9-4",
      quizNumber: 4,
      title: "할머니의 숫자",
      madeBy: "고재준",
      quizImgSrc: "/image/quiz/2023-9-4.png",
      answer: "1/2",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2023-9-5",
      quizNumber: 5,
      title: "언어의 온도",
      madeBy: "안민규",
      quizImgSrc: "/image/quiz/2023-9-5.png",
      answer: "snowman",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2023-9-6",
      quizNumber: 6,
      title: "소나기 소동",
      madeBy: "김현준",
      quizImgSrc: "/image/quiz/2023-9-6.png",
      answer: null,
      shouldWarn: false,
      isAnswerable: false,
    },
    {
      id: "2023-9-7",
      quizNumber: 7,
      title: "Who am I? 누구야?",
      madeBy: "김현준",
      quizImgSrc: "/image/quiz/2023-9-7.png",
      answer: "아이린",
      shouldWarn: false,
      isAnswerable: true,
    },
  ],
  "2023-11": [
    {
      id: "2023-11-1",
      quizNumber: 1,
      title: "초대장",
      madeBy: "안민규",
      quizImgSrc: "/image/quiz/2023-11-1.png",
      answer: "ILOVEYOU",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2023-11-2",
      quizNumber: 2,
      title: "24",
      madeBy: "안민규",
      quizImgSrc: "/image/quiz/2023-11-2.png",
      answer: "한글날",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2023-11-3",
      quizNumber: 3,
      title: "Ars Magna",
      madeBy: "강재호",
      quizImgSrc: "/image/quiz/2023-11-3.png",
      answer: "twelve + one",
      shouldWarn: false,
      isAnswerable: false,
    },
    {
      id: "2023-11-4",
      quizNumber: 4,
      title: "사각형",
      madeBy: "고재준",
      quizImgSrc: "/image/quiz/2023-11-4.png",
      answer: "6",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2023-11-5",
      quizNumber: 5,
      title: "별의 조각",
      madeBy: "고재준",
      quizImgSrc: "/image/quiz/2023-11-5.png",
      answer: "BLACK",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2023-11-6",
      quizNumber: 6,
      title: "흰색은 의미한다",
      madeBy: "안민규",
      quizImgSrc: "/image/quiz/2023-11-6.png",
      answer: "CHURRUS",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2023-11-7",
      quizNumber: 7,
      title: "실뜨기",
      madeBy: "안민규",
      quizImgSrc: "/image/quiz/2023-11-7.png",
      answer: "KOREA",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2023-11-8",
      quizNumber: 8,
      title: "책꽂이의 책",
      madeBy: "안민규",
      quizImgSrc: "/image/quiz/2023-11-8.png",
      answer: "MY LIFE BEGAN WHEN WE MET",
      shouldWarn: false,
      isAnswerable: true,
    },
    {
      id: "2023-11-9",
      quizNumber: 9,
      title: "모든 것의 시작은",
      madeBy: "김현준",
      quizImgSrc: "/image/quiz/2023-11-9.png",
      answer: "ㅡ",
      shouldWarn: false,
      isAnswerable: false,
    },
    {
      id: "2023-11-10",
      quizNumber: 10,
      title: "끝",
      madeBy: "안민규",
      quizImgSrc: "/image/quiz/2023-11-10.png",
      answer: "태극기",
      shouldWarn: false,
      isAnswerable: true,
    },
  ],
};