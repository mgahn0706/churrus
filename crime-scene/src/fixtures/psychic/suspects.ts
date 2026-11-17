import type { SuspectType, VictimType } from "@/types";

export const psychicSuspects: SuspectType[] = [
  {
    name: "실험체 A",
    image: "/image/scenario/psychic/profile/exp_a.png",
    age: 22,
    gender: "male",
    job: "실험체",
    description: "상대의 생각을 읽는 능력을 시연한다. 최근 소장과 실험 참여 계약을 두고 다퉜다.",
    statement: "저녁 시연회에서는 진행자와 인터뷰를 했어요. 영상에 남아 있을 겁니다.",
    finalArgument: "계약 때문에 화가 난 건 맞지만, 소장님을 해치지는 않았습니다.",
  },
  {
    name: "실험체 B",
    image: "/image/scenario/psychic/profile/exp_b.png",
    age: 24,
    gender: "female",
    job: "실험체",
    description: "물체를 움직이는 능력을 시연한다. 실험 보상 문제로 소장에게 불만이 있었다.",
    statement: "저녁에는 메인홀에서 시연을 했어요. 카메라가 계속 보고 있었습니다.",
    finalArgument: "보상 문제로 다퉜지만, 시연 뒤에는 소장님을 만나지 않았어요.",
  },
  {
    name: "실험체 C",
    image: "/image/scenario/psychic/profile/exp_c.png",
    age: 25,
    gender: "female",
    job: "실험체",
    description: "미래를 예측하는 실험의 핵심 참가자다. 소장이 실험 원본을 요구한 뒤 불안해했다.",
    statement: "저녁 행사 뒤 연구소를 나갔어요. 원본은 나중에 보여드리려 했습니다.",
    finalArgument: "다시 들어온 건 맞지만, 제가 소장님을 해쳤다는 증거는 아니잖아요.",
  },
];

export const psychicVictim: VictimType = {
  name: "김짜장",
  image: "/image/scenario/psychic/profile/kim_jj.png",
  age: 50,
  gender: "male",
  job: "초능력 연구소장",
  description: "초능력을 연구하는 소장. 저녁 시연회 뒤 예지 실험의 원본 기록을 확인하려 했다.",
  statement: "오늘 검사 결과와 저녁 시연 자료를 정리하고 있습니다. 필요한 게 있으면 물어보세요.",
};
