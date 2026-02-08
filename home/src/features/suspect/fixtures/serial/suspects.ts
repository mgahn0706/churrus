import { SuspectType, VictimType } from "@/features/suspect/types";

export const serialSuspects: SuspectType[] = [
  {
    name: "권영교",
    image: "/image/suspect/scenario/serial/profile/kwon_yg.png",
    age: 23,
    gender: "male",
    job: "영어교육과 22학번",
    description:
      "Yo yo, 영어교육과 22학번 권영교라고 해요. 추러스 임원진들이 죽었다고요? 근데 전 일단 추러스가 아닌데...man",
    statement:
      "전 오늘 윗공대에 있다가 28동으로 내려왔어요. 내려온 건 한 10~11시 쯤이었나. 남남친을 찾았는데 없길래 그냥 학생회관으로 갔어요. 11시 쯤?",
    finalArgument:
      "저를 왜 의심하시는 거죠? 맞아요, 추러스를 싫어하긴 해도 사람을 죽일 정도는 아니에요. 아니, 죽이려고는 했어도 전 남남친을 만난 적도 없어요!",
  },
  {
    name: "황새내",
    image: "/image/suspect/scenario/serial/profile/hwang_sn.png",
    age: 20,
    gender: "female",
    job: "전기정보공학부 새내기",
    description:
      "안녕하세요, 올해 전기정보공학부에 입학한 새내기 황새내라고 해요. 추러스 너무 재미있는 것 같아요!",
    statement:
      "저는 301동에서 공부 좀 하다가, 오후 10시 넘어서 28동으로 왔어요. 여친 선배가 남친 선배님에게 뭐 좀 물어봐달라고 해서요. 근데 못 만났어요. 11시 쯤 됐을까요? 갑자기 쿵 소리가 나서 밖에 나가봤더니.. 흑흑. 더이상 얘기 못해요.",
    finalArgument:
      "아 진짜 화나게 하네. 전 추러스 활동 열심히 하는데 왜 자꾸 의심을 받아야 하는 거죠? 전 그저 선배님들의 말을 잘 들었을 뿐. 사람을 죽일 생각은 1도 없어요!",
  },

  {
    name: "안친구",
    image: "/image/suspect/scenario/serial/profile/an_cg.png",
    age: 23,
    gender: "female",
    job: "수리과학부 22학번",
    description:
      "수리과학부 22학번 안친구라고 해요. 남친이와 여친이는 제 오랜 친구에요. 같은 와부초 출신이기도 하고요. 그런데 어떻게 이런 일이...!",
    statement:
      "오늘 전 28동에서 남친이와 대화하다가 301동으로 올라갔어요. 올라간게 10시 넘어서였나? 정확히 기억은 안나는데요. 뭐, 불미스러운 일이 있긴 했지만...",
    finalArgument:
      "저를 왜 의심하시는 건지. 제가 사람을 죽일 이유가 없잖아요. 심지어 두 명을 동시에 죽일 이유는 더더욱 없어요.",
  },
];

export const serialVictims: VictimType[] = [
  {
    name: "여여친",
    image: "/image/suspect/scenario/serial/profile/yeo_yc.png",
    age: 24,
    gender: "female",
    job: "화학생물공학부 22학번",
    statement: "",
    description: "추러스 임원진. 301동에서 시체로 발견됨.",
  },
  {
    name: "남남친",
    image: "/image/suspect/scenario/serial/profile/nam_nc.png",
    age: 24,
    gender: "male",
    job: "수리과학부 22학번",
    statement: "",
    description: "추러스 임원진. 28동에서 시체로 발견됨.",
  },
];
