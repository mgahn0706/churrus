import type { SuspectType, VictimType } from "@/types";

export const jjajangSuspects: SuspectType[] = [
  {
    name: "강주방",
    age: 38,
    gender: "male",
    job: "주방장",
    description: "개업 때부터 주방을 맡았다. 최근 사장과 메뉴 개편 문제로 다퉜다.",
    statement: "밤 8시 반부터 마지막 주문을 만들었어요. 8시 50분까지 주방을 비운 적 없습니다.",
    finalArgument: "사장님과 다툰 건 맞지만, 그 시간엔 밀린 주문을 만들고 있었어요.",
  },
  {
    name: "이배달",
    age: 27,
    gender: "female",
    job: "배달 기사",
    description: "사건 당일 마지막 배달을 맡았다. 미지급 배달비 때문에 사장에게 항의했다.",
    statement: "8시 35분에 가게를 나갔고, 먼 곳에 배달하고 돌아왔어요. 사장님을 다시 본 건 발견 때예요.",
    finalArgument: "배달 기록을 보세요. 그때 저는 가게 밖에 있었습니다.",
  },
  {
    name: "박경리",
    age: 34,
    gender: "female",
    job: "가게 경리",
    description: "매출 장부와 정산을 담당한다. 사장과 장부 원본을 두고 갈등이 있었다.",
    statement: "8시 20분에 퇴근했어요. 사장님이 나중에 장부를 보자고 하셨지만 저는 돌아가지 않았습니다.",
    finalArgument: "출입 기록에 제 이름이 있다 해도, 제가 사장님을 해쳤다는 뜻은 아니잖아요.",
  },
];

export const jjajangVictim: VictimType = {
  name: "최사장",
  age: 52,
  gender: "male",
  job: "짜장짜장 사장",
  description: "가게를 운영하며 그날 밤 매출 장부를 확인하려 했다.",
  statement: "",
};
