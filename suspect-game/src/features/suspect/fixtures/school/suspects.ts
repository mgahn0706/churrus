import { SuspectType, VictimType } from "@/features/suspect/types";

type InterviewType = {
  question: string;
  answer: string;
};

export const schoolSuspects: SuspectType[] = [
  {
    name: "손민혜",
    image: "",
    age: 19,
    gender: "female",
    job: "3-1, 화학실험 동아리 기장",
    description:
      "현성이와는 그냥 같은 반 학생 정도의 사이였어요. 죽일 원한도 없고, 제가 얻는 것도 없죠. 도시락 전달 봉사도 하던 착한 친구였는데 안타깝게 되었네요.",
    statement:
      "오늘 석식 먹고 뭐했냐고요? 전 동아리..활동을 준비했습니다. 전 화학 동아리 기장이거든요. 한 7시 20분 정도부터 화학실에서 실험 준비하고 8시쯤 자습실에 돌아왔어요. 원래 활동 전날에는 기장들은 다 각자 동아리실에서 준비합니다.",
    finalArgument:
      "제가 범인이라구요? 잘못 짚으셨어요. 제가 무슨 원한이 있어서 현성이를 죽일까요. 전 화학실에서 실험 준비하다가 자습실로 돌어온 것밖에는 없어요. 제 자습실 기록이 그걸 증명해줄거리고요.",
  },

  {
    name: "현태민",
    image: "/image/profile/hyun_tm.jpeg",
    age: 19,
    gender: "male",
    job: "3-2, 위클리 와부 동아리 기장",
    description:
      "교내 신문 동아리, 위클리 와부의 기장. 현태민입니다. 현성이요? 좋은 친구죠.",
    statement:
      "저는 7시 넘어서 내일 동아리 활동을 준비하러 나갔어요. 신문을 미리 인쇄해놔야 내일 활동에 지장이 없거든요. 특히, 내일 자 신문은 중요한 내용이 있어서 전 계속 동아리실에 있었어요. 그리고 7시 45분쯤 자습실에 돌아왔습니다. 현성이와는 8시쯤에 따로 만나기로 했어요. 내일 자 신문을 미리 보여주고 싶었거든요. 왜 연락이 안오나 해서 1반 교실에 가봤는데, 이렇게 됐네요.",
    finalArgument:
      "제가 범인이라고요? 참... 어이가 없네요. 무슨 이유로 지목하신지는 알 것 같아요. 하지만 그게 사람을 죽일 이유가 되나요? 그건 심증일 뿐이죠. 결정적으로 전 신문 인쇄하느라 현성이를 죽일 시간은 없었습니다. ",
  },

  {
    name: "유지현",
    image: "/image/profile/yu_jh.jpeg",
    age: 19,
    gender: "female",
    job: "3-2, 생명 동아리 부원",
    description:
      "안녕하세요, 생명과학 동아리에서 활동 중인 3학년 2반 유지현입니다. 박현성은 같은 동아리의 기장이었어요.",
    statement:
      "오늘 그 친구랑은 7시 쯤에 잠깐 만난게 다예요. 그 후에는 대화조차 하지 않았습니다. 8시쯤에 화장실을 좀 오래 다녀온 것 빼고는, 자습실을 벗어난 적도 없어요. ",
    finalArgument:
      "제가 범인이라구요? 저는 정말 아니에요. 저는... 저는 죽일 생각은 없었어요. ",
  },
];

export const schoolVictim: VictimType = {
  name: "박현성",
  image: "/image/profile/park_hs.jpeg",
  age: 19,
  gender: "male",
  job: "3-1, 생명 동아리 기장",
  statement: "",
  description: "3학년 1반의 학생으로, 생명 동아리의 기장을 맡고 있다.",
};
