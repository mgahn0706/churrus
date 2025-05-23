import { AdditionalQuestionType, ClueType } from "@/features/suspect/types";

export const startupAdditionalQuestions: AdditionalQuestionType[] = [
  {
    no: 1,
    question: "김성균은 피해자를 평소에 어떻게 생각하고 있었나요?",
  },
  {
    no: 2,
    question: "살해 당시 피해자 맞은 편에 앉아있던 사람은 누구인가요?",
  },
  {
    no: 3,
    question: "박지혁의 연인은 누구인가요?",
  },
  {
    no: 4,
    question: " 강지혜가 추러스에 입사하게 된 계기는 무엇인가요?",
  },
];

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
    x: 4.803,
    y: 10.323,
    reliability: "high",
    description:
      "공유 오피스의 뒷문으로, 사람들이 점심시간 등에 편하게 이용하는 문이다. 출입기록이 따로 찍히지 않는다. 안내문에는 '20시 ~ 익일 6시 출입 제한'이라고 쓰여있다.",
    type: "basic",
    image: "/Suspect_Logo.png",
    place: "lounge",
  },
  {
    id: 12,
    title: "경비원: 뒷문",
    x: 13.889,
    y: 72.872,
    reliability: "medium",
    description:
      "아, 뒷문이요? 네, 제가 항상 잠급니다. 매일 사무실에 아무도 없는 거 확인하고 잠그고 나오죠. 어제, 그러니까 26일에도 분명 8시에 아무도 없는 거 확인하고 단단히 잠그고 나왔습니다.",
    type: "basic",
    image: "/Suspect_Logo.png",
    place: "lounge",
  },
  {
    id: 13,
    title: "직원: 점심시간",
    x: 80.382,
    y: 15.029,
    reliability: "medium",
    description:
      "저희 회사 점심시간은 12시부터 1시 30분까지입니다. 오늘 점심이요? 저는 사무실에서 시켜먹었습니다. 항상 사무실에서 시켜먹는 사람들이 있거든요. 채원님은 평소에는 자리에서 시켜드시다가, 오늘은 지혁님이랑 같이 점심 드시러 간 것 같고... 다른 사람은 잘 모르겠네요. 수상한 행적은 딱히 없었는데요. ",
    type: "basic",
    image: "/Suspect_Logo.png",
    place: "lounge",
  },
  {
    id: 14,
    title: "한채원 옆자리",
    x: 9.549,
    y: 55.222,
    reliability: "high",
    description:
      "한채원 옆자리에 있던 사람이 앉은 자리이다. 케이크는 한입 먹은 상태이고, 술잔에는 립스틱이 묻어있다. 술잔에서 달콤한 브랜디 향이 난다.",
    type: "additional",
    image: "/Suspect_Logo.png",
    place: 4,
  },
  {
    id: 15,
    title: "한채원과 가장 먼 자리",
    x: 9.549,
    y: 26.621,
    reliability: "high",
    description:
      "한채원과 가장 먼 자리에 있던 사람이 앉은 자리이다. 케이크는 한입 먹은 상태이고, 술잔에는 술 대신 얼음물이 담겨있다.",
    type: "additional",
    image: "/Suspect_Logo.png",
    place: 4,
  },
  {
    id: 16,
    title: "한채원 맞은 편자리",
    x: 23.639,
    y: 26.621,
    reliability: "high",
    description:
      "한채원의 맞은편자리에 앉아있던 사람의 자리이다. 케이크는 포크로 먹은 자국이 있지만, 포크는 급하게 놓은 듯 케이크 덩어리가 그대로 있다. 술잔에는 달콤한 브랜디 향이 난다.",
    type: "additional",
    image: "/Suspect_Logo.png",
    place: 4,
  },
  {
    id: 17,
    title: "케이크와 칼",
    x: 20.148,
    y: 39.623,
    reliability: "high",
    description:
      "파티 기념으로 사온 케이크와 칼이다. 표시된 구매일자는 5월 27일 19시 10분. 케이크 옆에는 작은 과도가 놓여져있고, 칼에는 그 크기에 비해 큰 케이크를 자르느라 손잡이부분까지 초코크림이 묻어있다.",
    type: "additional",
    image: "/Suspect_Logo.png",
    place: 4,
  },
  {
    id: 18,
    title: "직원: 한채원의 술",
    x: 80.382,
    y: 19.029,
    reliability: "medium",
    description:
      "채원님은 술 좋아하셨죠. 소주 맥주도 좋아하시긴 하는데, 술자리보다는 술을 좋아해서 위스키나 브랜디 이런거 혼술하는거 좋아하십니다. 따로 물약통 같은데 담아서 회사 서랍에 넣고 매번 먹는다니까요. 제품팀 회식 했다면 한번 쯤 먹는거 다 봤을텐데? 아, 비즈니스팀이면 모를 수도 있겠네요. 저랑 며칠전, 그러니까 5월 25일 저녁에도 한번 드셨어요. 그때는 괜찮았는데...",
    type: "basic",
    image: "/Suspect_Logo.png",
    place: "lounge",
  },
  {
    id: 19,
    title: "립스틱",
    x: 10.148,
    y: 39.623,
    reliability: "high",
    description:
      "빨간색 내지는 분홍색의 립스틱이다. 사용 흔적이 있다. 그 외에 별다른 것은 없어보인다.",
    type: "additional",
    image: "/Suspect_Logo.png",
    place: 7,
  },
  {
    id: 20,
    title: "강지혜의 스마트폰",
    x: 27.148,
    y: 33.623,
    reliability: "high",
    description:
      "강지혜의 스마트폰이다. 기종은 갤럭시 Z플립2이다. 잠금해제는 강지혜의 도움을 받아 열었다.",
    type: "additional",
    image: "/Suspect_Logo.png",
    place: 7,
  },
  {
    id: 21,
    title: "음성파일: 230525-19:12",
    x: 27.148,
    y: 29.623,
    reliability: "high",
    description:
      '강지혜의 스마트폰에 저장된 음성파일이다. 김성균과 한채원의 목소리가 들린다. 잘은 들리지 않지만, 김성균이 한채원에게 호감의 표시를 하는 듯한 뉘앙스가 느껴진다. 한채원은 이에 "이번에도 잘 부탁한다."며 "덕분에 잘 해결될 것 같다"라는 말들이 오고간다. 녹음된 시간은 그리 길지 않다.',
    type: "additional",
    image: "/Suspect_Logo.png",
    place: 20,
  },
  {
    id: 22,
    title: "카카오톡: 한채원",
    x: 17.148,
    y: 39.623,
    reliability: "high",
    description: "강지혜와 한채원의 대화이다.",
    type: "additional",
    image: "/Suspect_Logo.png",
    place: 20,
  },
  {
    id: 23,
    title: "카카오톡: 심현수",
    x: 10.148,
    y: 49.623,
    reliability: "high",
    description: "강지혜와 심현수의 대화이다.",
    type: "additional",
    image: "/Suspect_Logo.png",
    place: 20,
  },

  {
    id: 24,
    title: "한채원의 PC",
    x: 78.993,
    y: 71.44,
    reliability: "high",
    description: "한채원의 PC이다. 안에 여러가지 파일들이 저장되어있다.",
    type: "locked",
    image: "/Suspect_Logo.png",
    place: "office",
    password: "0801",
    passwordHint:
      "한채원의 PC는 잠겨있다. 비밀번호 힌트로 '내 생일' 이라고 적혀있다.",
  },
  {
    id: 25,
    title: "한채원의 서랍",
    x: 83.993,
    y: 81.44,
    reliability: "high",
    description: "한채원의 서랍이다. 안에 여러가지 사무용품과 잡동사니가 있다.",
    type: "basic",
    image: "/Suspect_Logo.png",
    place: "office",
  },
  {
    id: 26,
    title: "인사 담당자의 노트",
    x: 12.326,
    y: 11.637,
    reliability: "high",
    description:
      '인사 담당자의 노트이다. 여러 사람들의 생일, 입사일 등의 정보가 적혀있다. 노트 내용으로 미루어 보아 영업팀과 마케팅팀은 비즈니스팀에 속해있고 그 외는 제품 개발 팀에 속해있는 것으로 보인다. 각 구성원의 비고한은 비어있지만, 강지혜의 비고란에만 "저성과자"라는 메모가 남겨져있다.',
    type: "basic",
    image: "/Suspect_Logo.png",
    place: "office",
  },
  {
    id: 27,
    title: "게시판: 추러스의 역사",
    x: 5.176,
    y: 59.862,
    reliability: "high",
    description:
      '게시판 한 켠에 적혀있는 추러스의 역사에 관련된 기사이다: 추러스는 2017년, 서울대학교 주류 동아리 "휴림"에서 한채원, 박지혁, 정혜수 등 6명의 학생이 모여 만든 IT 스타트업입니다. 추러스는 2020년 스위트파인더라는 내 주변 추러스 가게 찾기 앱을 선보이면서 큰 성공을 얻게 되었습니다. 이후 2023년에는 스낵 지니어스(SnackGenius)라는 인공지능을 개발하는데 성공하여 더 많은 투자 유치금을 받게 되었습니다. 추러스는 현재도 빠르게 성장하고 있는 기업입니다. 특히, 한채원을 포함한 초기 개발자 4인은, 현재까지도 인원수 변동 없이 유지되고 있으며, 한 대표는 개발자의 추가 채용 계획은 2017년부터 지금까지 없었고 앞으로도 없을 것이라 말했습니다. ... (계속)',
    type: "basic",
    image: "/Suspect_Logo.png",
    place: "office",
  },
  {
    id: 28,
    title: "게시판: 경쟁사 기사",
    x: 5.176,
    y: 64.862,
    reliability: "high",
    description:
      '추러스의 경쟁사 와플러브는, 2020년 1월, 서울대학교 개발동아리 와플스튜디오에서 시작한 스타트업입니다. 대표 심현수는 "내 주변 가까운 와플 가게 찾기 어플"을 선보였으며, 그 후 다양한 종류의 간식으로까지 사업 범위를 확장했습니다. 국내 1위 간식 어플 기업 추러스의 뒤를 최근 빠르게 쫓고 있는 추세입니다. 특히 2020년 하반기를 기점으로 폭발적인 성장을 하는 스타트업으로 주목받고 있습니다. ... (계속)',
    type: "basic",
    image: "/Suspect_Logo.png",
    place: "office",
  },
  {
    id: 29,
    title: "강지혜의 노트북",
    x: 42.775,
    y: 6.213,
    reliability: "high",
    description:
      "마케팅 팀에서 일하고 있는 강지혜의 맥북이다. 잠금해제는 강지혜의 도움으로 풀 수 있었다. 사내에서 지원해준 PC가 아닌, 개인 맥북을 사용하고 있다.",
    type: "basic",
    image: "/Suspect_Logo.png",
    place: "office",
  },
  {
    id: 30,
    title: "네이버 검색 기록",
    x: 10.775,
    y: 31.213,
    reliability: "high",
    description:
      "강지혜의 네이버 검색기록이다. Cask Strength, ABV 등의 검색어가 보인다.",
    type: "additional",
    image: "/Suspect_Logo.png",
    place: 29,
  },
  {
    id: 31,
    title: "사직서 양식",
    x: 10.775,
    y: 36.213,
    reliability: "high",
    description:
      '강지혜의 사직서 양식이다. "강지혜"라는 이름만 써져있고 다른 내용은 아직 빈칸이다. 작성하다 만 듯하다. 최종수정 시각은 2023년 5월 27일 오후 5시',
    type: "additional",
    image: "/Suspect_Logo.png",
    place: 29,
  },
  {
    id: 32,
    title: "박지혁의 스마트폰",
    x: 17.65,
    y: 43.984,
    reliability: "high",
    description:
      "책상 위에 놓여있던 박지혁의 스마트폰이다. 안에 여러가지 기록들이 보인다.",
    type: "basic",
    image: "/Suspect_Logo.png",
    place: "office",
  },
  {
    id: 33,
    title: "김성균의 PC",
    x: 80.208,
    y: 38.757,
    reliability: "high",
    description:
      "김성균의 PC이다. 안에 여러가지 기록들이 보인다. 데이터 관리자 직책이어서 그런지 보안이 굉장히 강화되어있다.",
    type: "basic",
    image: "/Suspect_Logo.png",
    place: "office",
  },
  {
    id: 34,
    title: "사과문",
    x: 20.208,
    y: 23.757,
    reliability: "high",
    description:
      "아직 인쇄되지 않은 사과문이다. 내용은 지난 와플러브에서 폭로한 개인정보 유출 사건이 사실이며, 이는 데이터 관리자의 독단적인 결정이었음을 폭로하는 내용이다. 이에 따라 데이터 관리자 김성균을 해고하고 개인정보보호법에 따라 적법하게 처벌하겠다는 내용의 발표문이다. 적혀있는 발표 일자는 6월 1일이다.",
    type: "additional",
    image: "/Suspect_Logo.png",
    place: 24,
  },
  {
    id: 35,
    title: "기사: 와플러브의 폭로",
    x: 20.208,
    y: 28.757,
    reliability: "high",
    description:
      "2023년 3월 1일, 와플러브에서 추러스의 인공지능 스낵 지니어스가 기초부터 잘못 설계된 엉터리 인공지능임을 폭로했다. 이에 따라 추러스의 이미지는 급락했다.",
    type: "additional",
    image: "/Suspect_Logo.png",
    place: 24,
  },
  {
    id: 36,
    title: "기사: 추러스 개인정보 유출",
    x: 20.208,
    y: 33.757,
    reliability: "high",
    description:
      "2023년 5월 7일, 와플러브에서 추러스가 무단으로 사용자들의 개인정보를 이용했다는 의혹을 제기했다. 최근 비약적으로 발전한 스낵 지니어스 인공지능의 성능이 사용자들의 개인정보를 이용하지 않고서야 불가능하다는 내용이다. 경찰은 추러스의 한 대표(28)에게 해명을 요구하고 있다.",
    type: "additional",
    image: "/Suspect_Logo.png",
    place: 24,
  },
  {
    id: 37,
    title: "네임펜",
    x: 20.208,
    y: 38.757,
    reliability: "high",
    description:
      "한채원의 서랍에서 발견된 네임펜이다. 포장을 금방 뜯은 듯 새것 같지만, 펜촉이 미세하게 닳아있어 아주 약간의 사용감이 느껴진다.",
    type: "additional",
    image: "/Suspect_Logo.png",
    place: 25,
  },
  {
    id: 38,
    title: "메모",
    x: 30.208,
    y: 53.757,
    reliability: "high",
    description:
      "한채원의 서랍에서 발견된 메모이다. 악필 때문에 잘 읽히지는 않지만, 볼펜으로 쓰여졌고, 정부 지원금이 최근 와플러브의 개인정보 유출 폭로로 인해 취소될 위기에 있다는 내용이다. 이 외에도 16개 이상의 투자사에서 투자가 끊길 위기에 있다는 내용으로 보인다.",
    type: "additional",
    image: "/Suspect_Logo.png",
    place: 25,
  },
  {
    id: 39,
    title: "카카오톡: SG♥",
    x: 20.208,
    y: 48.757,
    reliability: "high",
    description:
      "박지혁과 SG 라는 사람의 카카오톡 내용이다. 내용으로 보아 연인 관계로 보인다.",
    type: "additional",
    image: "/Suspect_Logo.png",
    place: 32,
  },
  {
    id: 40,
    title: "저장된 페이지: 5/24 회의록",
    x: 10.208,
    y: 30.757,
    reliability: "high",
    description:
      "5월 24일 회의록이다. 내용은 최근 개인정보 유출 사건으로 인해 회사에서 개발한 인공지능의 카카오톡 연동 기능을 폐지하고, 이를 통해 수집된 데이터를 모두 삭제하겠다는 내용이다.",
    type: "additional",
    image: "/Suspect_Logo.png",
    place: 32,
  },
  {
    id: 41,
    title: "직원: 박지혁에 대해",
    x: 80.382,
    y: 23.029,
    reliability: "medium",
    description:
      "아, 지혁님이요? 저희 공동창업자 중 한명이고, 현재 영업팀장으로 계십니다. 최근에 특별히 수상한 행동은 보이시지 않았어요. 아, 최근에 연인 문제로 우울해 보이시긴 했어요. 뭔가 헤어질 것 같은 분위기던데, 사귀시는 분과 사이가 안좋아진 건 아닌데 다른 이유가 생겼나봐요. 뭔가 채원님과 관계가 있는 것 같기도 하고요.",
    type: "basic",
    image: "/Suspect_Logo.png",
    place: "lounge",
  },
  {
    id: 42,
    title: "위스키 도서",
    x: 6.655,
    y: 44.324,
    reliability: "high",
    description:
      "평소 박지혁이 자주 즐겨보는 위스키 도서이다. 책에는 위스키에 대한 내용들이 적혀있다. 책은 많이 읽은 듯 여기저기 메모와 밑줄이 군데군데 있고, 책 뒷표지에 박지혁의 이름도 쓰여져있다.",
    type: "basic",
    image: "/Suspect_Logo.png",
    place: "office",
  },
  {
    id: 43,
    title: "용어: ABV",
    x: 24.4,
    y: 31.647,
    reliability: "high",
    description:
      "ABV(Alcohol by Volume)는 알코올 도수(%)를 의미한다. 위스키의 경우 40도가 일반적이며, 40도를 넘어가면 고도의 위스키라고 한다. 일반적으로 알려진 소주의 경우 20도, 맥주의 경우 5도 정도이다.",
    type: "additional",
    image: "/Suspect_Logo.png",
    place: 42,
  },
  {
    id: 44,
    title: "용어: 캐스크 스트랭스",
    x: 23.4,
    y: 49.647,
    reliability: "high",
    description:
      "캐스크 스트랭스(Cask Strength)란 통에서 꺼낸 그대로의 알코올 도수를 말한다. 보통 위스키는 물을 섞어 알코올 도수 40% 정도로 일정하게 맞추는데 캐스크 스트랭스는 오크통에서 숙성을 마친 순수 위스키 원액이다. 알코올 도수가 50~70% 정도로 매우 높지만, 이를 즐기는 마니아 층도 많이 있다.",
    type: "additional",
    image: "/Suspect_Logo.png",
    place: 42,
  },
  {
    id: 45,
    title: "스크랩: 개인정보보호법 강화",
    x: 11.4,
    y: 22.647,
    reliability: "high",
    description:
      "2023년부터 개인정보보호법이 강화된다는 내용의 기사이다. 개인정보를 무단으로 유출하거나 이용한 사람은 기업 차원이 아닌 개인 차원으로도 처벌이 가능하며 그 처벌 수위도 징역 3년 이하의 벌금형에서 징역 5년 이하의 징역형으로 강화된다는 내용이다.",
    type: "additional",
    image: "/Suspect_Logo.png",
    place: 33,
  },
  {
    id: 46,
    title: "개인정보 접근 권한 관리도구",
    x: 11.4,
    y: 27.647,
    reliability: "high",
    description:
      "사용자들의 데이터에 접근할 수 있는 권한을 관리하는 프로그램이다. 데이터에 접근 가능한 사람은 김성균, 한채원, 강지혜이다. 대량의 개인정보가 인공지능에 이용된 시점은 2023년 4월 말이며, 한채원과 김성균이 이용한 것으로 확인된다.",
    type: "additional",
    image: "/Suspect_Logo.png",
    place: 33,
  },
  {
    id: 47,
    title: "김성균의 지갑",
    x: 80.729,
    y: 50.346,
    reliability: "high",
    description:
      "김성균의 지갑이다. 내용물은 신분증, 현금 49,000원과 동전 몇개가 들어있다. 특이한 점으로는 2015년에 화학생물공학부 조별 활동에서 찍은 사진이 들어있다. 사진에는 김성균과 한채원이 찍혀있다.",
    type: "basic",
    image: "/Suspect_Logo.png",
    place: "office",
  },
  {
    id: 48,
    title: "영수증",
    x: 15.47,
    y: 48.848,
    reliability: "high",
    description: "박지혁의 서랍에서 나온 영수증.",
    type: "basic",
    image: "/Suspect_Logo.png",
    place: "office",
  },
  {
    id: 49,
    title: "통화기록",
    x: 11.532,
    y: 37.528,
    reliability: "high",
    description:
      "박지혁의 통화기록이다. 5월 24일에 한채원과 통화한 기록이 있다. 그 외의 최근 일주일간 통화기록은 없다.",
    type: "additional",
    image: "/Suspect_Logo.png",
    place: 32,
  },
  {
    id: 50,
    title: "카카오톡: 한채원",
    x: 11.532,
    y: 42.528,
    reliability: "high",
    description:
      "박지혁과 한채원의 카카오톡 대화 내용이다. 사건 당일 저녁에 따로 만나자는 내용이 있다.",
    type: "additional",
    image: "/Suspect_Logo.png",
    place: 32,
  },
];
