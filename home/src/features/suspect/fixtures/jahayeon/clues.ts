import { AdditionalQuestionType, ClueType } from "@/features/suspect/types";

export const jahayeonAdditionalQuestions: AdditionalQuestionType[] = [
  {
    no: 1,
    question: "서여친이 사건 날 학교를 방문하게된 계기는 무엇인가요?",
    answer:
      "서여친은 사건 당일, 김하연과의 갈등을 해결하기 위해 학교를 방문했습니다. 두 사람은 최근에 오해가 생겨 관계가 소원해졌고, 서여친은 이를 풀기 위해 자하연에서 만나기로 약속했습니다.",
  },
  {
    no: 2,
    question: "박경기는 술자리를 떠난 이후 어디로 갔나요?",
    answer:
      "박경기는 술자리를 떠난 후, 지하철과 버스를 이용해 집으로 돌아갔습니다. 그는 남양주시에 거주하고 있어 막차 시간에 맞춰 자리를 일찍 떠날 수밖에 없었습니다.",
  },
];

export const jahayeonClues: ClueType[] = [
  {
    id: 1,
    title: "시체",
    x: 35.532,
    y: 35.149,
    image: "/image/clue/jahayeon-1.png",
    description:
      "피해자 김규민의 시체이다. 물에 빠진 채 눈을 감고 죽어있다. 시체 주변은 얼어있어 시체가 움직이지는 않는다.",
    type: "basic",
    place: "pond",
  },
  {
    id: 2,
    title: "시체 주변의 얼음",
    x: 38.31,
    y: 39.525,
    image: "/image/clue/jahayeon-2.png",
    description:
      "자하연 전체는 꽁꽁 얼어있다. 시체 주변의 얼음은 깨진 흔적 없이 얼어 있다. 그 어떤 균열이나 저항 흔적도 보이지 않는다..",
    type: "basic",
    place: "pond",
  },
  {
    id: 3,
    title: "시체 부검",
    x: 20,
    y: 20,
    image: "/image/clue/jahayeon-3.png",
    description:
      '피해자 김규민의 사인은 "익사"로 밝혀졌다. 피해자의 혈중 알코올 농도는 위험한 수준까지 올라가 있을 정도로 높게 나타났다. 그 외의 약물 성분은 검출되지 않았으며, 외상도 발견되지 않았다.',
    type: "additional",
    place: 1,
  },
  {
    id: 4,
    title: "김규민의 스마트폰",
    x: 31.771,
    y: 23.069,
    image: "/image/clue/jahayeon-4.png",
    description:
      "피해자 김규민의 스마트폰이다. 기종은 갤럭시 노트 10으로, 자하연 데크에 놓여져있었다. 남은 배터리는 14%. 얼굴인식, 지문, PIN 중 하나만 입력하면 잠금이 해제된다.",
    type: "locked",
    place: "pond",
    password: "0912",
    passwordHint:
      "자하연 데크에 놓여있던 스마트폰. 비밀번호 힌트는 'birthday'라고 표시된다.",
  },
];
