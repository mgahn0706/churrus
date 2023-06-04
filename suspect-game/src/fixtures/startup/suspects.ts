import { SuspectType, VictimType } from "@/types";

export const startUpSuspects: SuspectType[] = [
  {
    name: "김성균",
    image: "/image/profile/kim_sg.jpeg",
    age: 29,
    gender: "male",
    job: "데이터 관리자",
    description:
      "데이터 관리자로 추러스에서 일하고 있는 김성균입니다. 채원이랑은 같은 과 동기였어요. 뭐 그것말고 특별한 관계가 있거나 한건 아닙니다. 그런데 왜 저를 용의자로 지목하시는 거죠?",
    finalArgument:
      "제가 범인이라구요? 저는 정말 아닙니다. 채원이가 죽은 것 때문에 너무 슬픈데 범인으로 몰려야한다니요. 제가 범인이 아닌 이유요? 그야 간단하죠. 첫째로 죽일 이유가 없다. 둘째로 죽일 방법이 없다는 것입니다. 저는 채원이와 항상 같이 퇴근하거나 일찍 퇴근했어요. 도대체 언제 니코틴을 그 술잔에 넣겠냐구요!",
  },

  {
    name: "강지혜",
    image: "/image/profile/kang_jh.jpeg",
    age: 27,
    gender: "female",
    job: "마케팅 인턴",
    description:
      "저는 추러스에서 마케팅 업무를 맡고 있는 강지혜라고 합니다. 오늘은 제 입사 3주년 기념 파티를 하는 날이었어요. 그런데 이런 안좋은 일이 생겨버렸네요. 평소 일 못한다고 구박하시긴 했지만, 나쁜 사람은 아니었어요.",
    finalArgument:
      "제가 범인이라고요? 참... 어이가 없네요. 제가 한채원을 왜 죽여야 하죠? 제가 한채원을 죽일 이유가 없다는 건 이미 조사하셔서 다 아시는 내용 아닌가요? 아 뭐... 꺼림칙한 부분이 없다고는 못하지만, 그건 당장 오늘에야 일어난 일이에요. 제가 한채원을 죽여서 얻는 이득은 하나도 없다고요!!",
  },

  {
    name: "박지혁",
    image: "/image/profile/park_jh.jpeg",
    age: 29,
    gender: "male",
    job: "영업 팀장",
    description:
      "영업 팀장입니다. 채원이랑은 공동 창업자 관게에요. 같은 동아리였거든요. 채원이가 쓰러졌을 때 그 자리에 있었다고 용의자라니, 상당히 불쾌하네요.",
    finalArgument:
      "제가 범인이라구요? 저는 정말 정말 아닙니다. 잘못 짚으셨어요. 채원이는 저랑 공동 창업자일 뿐입니다. 비록 최근에 마음에 들지 않는 일들을 한건 맞지만, 죽일 생각은 안했어요. 게다가 니코틴으로 독살할 생각은 더더욱 하지 않았습니다. 애초에 전 한채원이 오늘 위스키를 마시는 줄도 몰랐어요!",
  },
];

export const startUpVictim: VictimType = {
  name: "한채원",
  image: "/image/profile/han_cw.jpeg",
  age: 28,
  gender: "female",
  job: "추러스 대표이사",
  description:
    "2017년 추러스를 설립한 사람 중 한 명으로, 현재 추러스의 대표이사를 맡고 있었다.",
};

export { SuspectType };
