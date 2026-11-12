import type { SuspectType, VictimType } from "@/types";

export const psychicSuspects: SuspectType[] = [
  {
    name: "실험체 A",
    age: 22,
    gender: "female",
    job: "실험체",
    description: "상대의 생각을 읽는 능력을 시연한다. 최근 소장과 실험 참여 계약을 두고 다퉜다.",
    statement: "밤 8시 40분부터 진행자와 공개 인터뷰를 했어요. 제 모습은 방송 영상에 남아 있습니다.",
    finalArgument: "실험 참여 계약 때문에 화가 난 건 맞지만, 사건이 벌어진 동안 저는 인터뷰 중이었습니다.",
  },
  {
    name: "실험체 B",
    age: 24,
    gender: "male",
    job: "실험체",
    description: "물체를 움직이는 능력을 시연한다. 실험 보상 문제로 소장에게 불만이 있었다.",
    statement: "그 시간엔 메인홀에서 시연을 하고 있었어요. 관객과 카메라가 계속 보고 있었습니다.",
    finalArgument: "제 능력을 의심하셔도 좋습니다. 하지만 당시 제 동선은 영상으로 확인할 수 있어요.",
  },
  {
    name: "실험체 C",
    age: 25,
    gender: "female",
    job: "실험체",
    description: "미래를 예측하는 실험의 핵심 참가자다. 소장이 실험 원본을 요구한 뒤 불안해했다.",
    statement: "8시 20분에 연구소를 나갔어요. 소장님이 원본을 보자고 하셨지만 다시 돌아가지는 않았습니다.",
    finalArgument: "관찰실에 갔다는 기록만으로 제가 소장님을 해쳤다고 단정할 수는 없잖아요.",
  },
];

export const psychicVictim: VictimType = {
  name: "김짜장",
  age: 50,
  gender: "male",
  job: "초능력 연구소장",
  description: "초능력을 지닌 연구소장. 시연회가 끝난 뒤 예지 실험의 원본 기록을 확인하려 했다.",
  statement: "",
};
