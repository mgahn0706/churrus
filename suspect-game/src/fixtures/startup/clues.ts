export interface ClueType {
  id: number;
  image: string;
  title: string;
  x: number;
  y: number;
  reliability: "low" | "medium" | "high";
  description: string;
  type: "basic" | "additional" | "interrogation" | "locked";
  password?: string;
  passwordHint?: string;
  place: string | number;
}

export const startUpClues: ClueType[] = [
  {
    id: 1,
    title: "시체",
    x: 57.2338,
    y: 64.72874,
    reliability: "high",
    description:
      "피해자 한채원의 시체이다. 외상의 흔적은 없다. 사인은 니코틴 중독으로 치사량 이상의 니코틴이 검출되었다.",
    type: "basic",
    image: "/image/clue/startup-1.png",
    place: "lounge",
  },
  {
    id: 2,
    title: "한채원의 술잔",
    x: 56.134,
    y: 51.152,
    reliability: "high",
    description:
      "한채원이 마신 술잔이다. 술잔은 공유 오피스에서 공용으로 제공하는 스테인리스 컵이다. 술잔 안에는 조금의 알코올과 얼음, 다량의 니코틴이 검출되었다.",
    type: "basic",
    image: "/Suspect_Logo.png",
    place: "lounge",
  },
  {
    id: 3,
    title: "위스키 물약통",
    x: 58.008,
    y: 46.636,
    reliability: "high",
    description:
      "물약통에 담긴 위스키이다. 물약통에는 'Cask Strength ABV 17'이라고 적혀있다. 물약통에는 알코올 조금과 니코틴이 검출되었다.",
    type: "basic",
    image: "/Suspect_Logo.png",
    place: "lounge",
  },
  {
    id: 4,
    title: "책상",
    x: 50.26,
    y: 48.51,
    reliability: "high",
    description:
      "사건 당시 간단한 모임이 있었던 책상이다. 케이크와 술잔들이 놓여져있다.",
    type: "basic",
    image: "/Suspect_Logo.png",
    place: "lounge",
  },
  {
    id: 5,
    title: "제빙기",
    x: 30.794,
    y: 30.218,
    reliability: "high",
    description:
      "공유 오피스에서 제공하고 있는 제빙기이다. 일정 시간마다 얼음이 새롭게 얼고, 오래된 얼음은 녹는 방식이다.",
    type: "basic",
    image: "/Suspect_Logo.png",
    place: "lounge",
  },
  {
    id: 6,
    title: "냉장고",
    x: 72.005,
    y: 32.039,
    reliability: "high",
    description:
      "공유 오피스에서 제공하고 있는 공용 냉장고이다. 냉동고 부분에 '냉동고 고장'이라고 붙어있다. 냉동고 안은 비어있고 시원하지 않다.",
    type: "basic",
    image: "/Suspect_Logo.png",
    place: "lounge",
  },
  {
    id: 7,
    title: "가방",
    x: 41.797,
    y: 44.893,
    reliability: "high",
    description:
      "옆 테이블 의자에 놓여있던 가방이다. 가방 안에는 여러 잡동사니들과 필수품들이 들어있다.",
    type: "basic",
    image: "/Suspect_Logo.png",
    place: "lounge",
  },
  {
    id: 8,
    title: "쓰레기통",
    x: 61.654,
    y: 30.034,
    reliability: "high",
    description:
      "공용 오피스의 쓰레기통이다. '매일 아침 9시에 쓰레기통을 비웁니다'라는 문구가 있다. 쓰레기통 안에서 망가진 듯한 초소형 마이크가 발견되었다.",
    type: "basic",
    image: "/Suspect_Logo.png",
    place: "lounge",
  },
  {
    id: 9,
    title: "출퇴근 기록: 5월 25일",
    x: 93.229,
    y: 59.345,
    reliability: "high",
    description:
      "2023년 5월 25일에 기록된 출퇴근 기록이다. 출퇴근 기록을 찍어야만 해당 문을 이용할 수 있다.",
    type: "basic",
    image: "/Suspect_Logo.png",
    place: "lounge",
  },
  {
    id: 10,
    title: "출퇴근 기록: 5월 26일",
    x: 93.229,
    y: 62.345,
    reliability: "high",
    description:
      "2023년 5월 26일에 기록된 출퇴근 기록이다. 출퇴근 기록을 찍어야만 해당 문을 이용할 수 있다.",
    type: "basic",
    image: "/Suspect_Logo.png",
    place: "lounge",
  },
];
