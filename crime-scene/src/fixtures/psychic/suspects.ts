import type { SuspectType, VictimType } from "@/types";

export const psychicSuspects: SuspectType[] = [
  {
    name: "실험체 A",
    image: "/image/scenario/psychic/profile/exp_a.png",
    age: 22,
    gender: "male",
    job: "실험체",
    description: "22세. 직설적인 말투에 경계심이 느껴지는 사람이다.",
    statement: "뭐, 이렇게 될 걸 알고 있었어. 잔인하게 죽다니.",
    finalArgument: "차를 준비한 건 맞지만, 내가 소장을 해쳤다는 증거는 없잖아.",
  },
  {
    name: "실험체 B",
    image: "/image/scenario/psychic/profile/exp_b.png",
    age: 24,
    gender: "female",
    job: "실험체",
    description: "2밝고 능청스러운 분위기의 사람이다.",
    statement: "저녁에는 배가 아파서 식사를 거르고 자리를 비웠어.",
    finalArgument: "저녁에 자리를 비운 건 맞지만, 소장을 죽이지는 않았어.",
  },
  {
    name: "실험체 C",
    image: "/image/scenario/psychic/profile/exp_c.png",
    age: 25,
    gender: "female",
    job: "실험체",
    description: "25세. 차분하지만 생각이 많아 보이는 실험체.",
    statement: "저녁 식사 도중 소장님이 몸이 이상하다며 자리를 뜨셨어요.",
    finalArgument:
      "제가 시체를 옮긴 건 맞아요. 하지만 발견했을 때 이미 돌아가신 상태였어요.",
  },
];

export const psychicVictim: VictimType = {
  name: "김짜장",
  image: "/image/scenario/psychic/profile/kim_jj.png",
  age: 50,
  gender: "male",
  job: "초능력 연구소장",
  description: "50세. 차분하고 권위적인 분위기의 연구소장.",
  statement: "오늘도 정해진 일정에 따라 검사와 실험을 진행합시다.",
};
