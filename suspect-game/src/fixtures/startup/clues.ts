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
      "공용 오피스의 쓰레기통이다. '매일 아침 9시에 쓰레기통을 비웁니다'라는 문구가 있다. 쓰레기통 안에서 망가진 듯한 초소형 마이크가 발견되었다. 기종은 삼성.",
    type: "basic",
    image: "/Suspect_Logo.png",
    place: "lounge",
  },
  {
    id: 9,
    title: "출퇴근 기록: 5월 25일",
    x: 79.229,
    y: 70.345,
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
    x: 79.229,
    y: 75.345,
    reliability: "high",
    description:
      "2023년 5월 26일에 기록된 출퇴근 기록이다. 출퇴근 기록을 찍어야만 해당 문을 이용할 수 있다.",
    type: "basic",
    image: "/Suspect_Logo.png",
    place: "lounge",
  },
  {
    id: 11,
    title: "뒷문",
    x: 4.803, y: 10.323,
    reliability: "high",
    description: "공유 오피스의 뒷문으로, 사람들이 점심시간 등에 편하게 이용하는 문이다. 출입기록이 따로 찍히지 않는다. 안내문에는 '20시 ~ 익일 6시 출입 제한'이라고 쓰여있다.",
    type: "basic",
    image: "/Suspect_Logo.png",
    place: "lounge",
  
  },
  {
    id: 12,
    title: "경비원: 뒷문",
    x: 13.889, y: 72.872,
    reliability: "medium",
    description: '아, 뒷문이요? 네, 제가 항상 잠급니다. 매일 사무실에 아무도 없는 거 확인하고 잠그고 나오죠. 어제, 그러니까 25일에도 분명 8시에 아무도 없는 거 확인하고 단단히 잠그고 나왔습니다. ',
    type: "basic",
    image: "/Suspect_Logo.png",
    place: "lounge",
  },
  {
    id: 13,
    title: "직원: 점심시간",
    x: 80.382, y: 15.029,
    reliability: "medium",
    description: "점심에 저희 회사는 보통 나가서 먹거나 배달시켜 먹는 사람이 대부분이에요. 오늘 점심이요? 저는 사무실에서 시켜먹었습니다. 채원님은 평소에는 자리에서 시켜드시다가, 오늘은 지혁님이랑 같이 점심 드시러 간 것 같고... 다른 사람은 잘 모르겠네요. 수상한 행적은 딱히 없었는데요. "
    ,type: "basic",
    image: "/Suspect_Logo.png",
    place: "lounge",
  },
  {
    id: 14,
    title: "한채원 옆자리",
    x: 5.549, y: 45.222,
    reliability: "high",
    description: "한채원 옆자리에 있던 사람이 앉은 자리이다. 케이크는 한입 먹은 상태이고, 술잔에는 립스틱이 묻어있다. 술잔에서 달콤한 브랜디 향이 난다.",
    type: "additional",
    image: "/Suspect_Logo.png",
    place: 4,
  },
  {
    id: 15,
    title: "한채원과 가장 먼 자리",
    x: 5.549, y: 26.621,
    reliability: "high",
    description: "한채원과 가장 먼 자리에 있던 사람이 앉은 자리이다. 케이크는 한입 먹은 상태이고, 술잔에는 술 대신 얼음물이 담겨있다.",
    type: "additional",
    image: "/Suspect_Logo.png",
    place: 4,
  }
  ,{
    id: 16,
    title: "한채원 맞은 편자리",
    x: 19.639, y: 26.621,
    reliability: "high",
    description: '한채원의 맞은편자리에 앉아있던 사람의 자리이다. 케이크는 포크로 먹은 자국이 있지만, 포크는 급하게 놓은 듯 케이크 덩어리가 그대로 있다. 술잔에는 달콤한 브랜디 향이 난다.',
    type: "additional",
    image: "/Suspect_Logo.png",
    place: 4,
  },
  {
    id: 17,
    title: "케이크와 칼",
    x: 17.148, y: 39.623,
    reliability: "high",
    description: "파티 기념으로 사온 케이크와 칼이다. 표시된 구매일자는 5월 26일 18시 20분. 케이크 옆에는 작은 과도가 놓여져있고, 칼에는 그 크기에 비해 큰 케이크를 자르느라 손잡이부분까지 생크림이 묻어있다.",
    type: "additional",
    image: "/Suspect_Logo.png",
    place: 4,
  }

  
];
