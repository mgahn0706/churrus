export const KoreanConnections: ConnectionsType[] = [
  {
    id: 1,
    quiz: [
      {
        words: ["보석", "수박", "캔디", "돼지"],
        description: "아이스크림 __바",
      },
      {
        words: ["구리", "용인", "화성", "양주"],
        description: "경기도의 행정구역",
      },
      {
        words: ["별똥별", "지진", "일식", "번개"],
        description: "자연현상",
      },
      {
        words: ["더위", "신사", "관심", "소유"],
        description: "무__",
      },
    ],
  },

  {
    id: 2,
    quiz: [
      {
        words: ["수영", "체조", "유도", "조정"],
        description: "올림픽 종목",
      },
      {
        words: ["돌", "콩", "숙주", "도라지"],
        description: "__나물",
      },
      {
        words: ["괴물", "기생충", "해운대", "암살"],
        description: "대한민국의 천만 관객 영화",
      },
      {
        words: ["복수", "다양", "다중", "곱절"],
        description: "여러개의",
      },
    ],
  },
  {
    id: 3,
    quiz: [
      {
        words: ["꽃", "가지", "뿌리", "열매"],
        description: "식물의 기관",
      },
      {
        words: ["주사", "겸자", "핀셋", "가위"],
        description: "수술도구",
      },
      {
        words: ["문신", "볼펜", "만년필", "프린터"],
        description: "잉크를 사용하는 것",
      },
      {
        words: ["게", "커튼", "와이퍼", "자동문"],
        description: "옆으로만 움직이는 것",
      },
    ],
  },
];

interface ConnectionsType {
  id: number;
  quiz: [
    ConnectionQuizType,
    ConnectionQuizType,
    ConnectionQuizType,
    ConnectionQuizType
  ];
}

interface ConnectionQuizType {
  words: [string, string, string, string];
  description: string;
}
