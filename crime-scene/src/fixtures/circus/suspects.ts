import type { SuspectType, VictimType } from "@/types";

export const circusSuspects: SuspectType[] = [
  {
    name: "윤마술",
    age: 31,
    gender: "male",
    job: "마술사",
    description: "단장과 공연 순서를 두고 다퉜다. 마지막 리허설에서 첫 무대를 맡았다.",
    statement: "8시 10분부터 20분까지 무대에서 공연 동선을 연습했습니다. 객석 카메라를 보면 알 거예요.",
    finalArgument: "단장과 싸운 건 사실이지만, 리허설 도중에 무대를 떠난 적은 없어요.",
  },
  {
    name: "서곡예",
    age: 28,
    gender: "female",
    job: "공중 곡예사",
    description: "부상 뒤 복귀를 앞두고 단장과 계약 문제로 갈등을 겪었다.",
    statement: "그 시간에는 무대 위에서 윤마술과 합을 맞췄어요. 계속 같이 있었죠.",
    finalArgument: "계약 때문에 화가 났다고 해서 그 사람을 해친 건 아닙니다. 제 동선은 영상에 남아 있어요.",
  },
  {
    name: "오조명",
    age: 42,
    gender: "male",
    job: "조명 감독",
    description: "공연 예산 삭감으로 단장과 언쟁했다. 리허설 중에는 조명실을 맡았다.",
    statement: "리허설 내내 조명실에 있었습니다. 큐가 여러 번 바뀌어서 자리를 비울 수 없었어요.",
    finalArgument: "조명실 출입 기록과 제 동료의 확인을 받으세요. 저는 무대 뒤로 가지 않았습니다.",
  },
  {
    name: "한매표",
    age: 35,
    gender: "female",
    job: "매표 담당자",
    description: "입장권 매출을 정산한다. 최근 단장이 현금 정산표 원본을 요구했다.",
    statement: "8시쯤 매표소를 닫고 집계표를 정리했어요. 리허설 동안 무대 뒤에는 안 갔습니다.",
    finalArgument: "정산표가 틀린 건 실수일 수 있잖아요. 출입 기록만으로 저를 범인이라고 할 수는 없어요.",
  },
];

export const circusVictim: VictimType = {
  name: "강단장",
  age: 54,
  gender: "male",
  job: "인간 서커스 단장",
  description: "폐막 공연을 준비하며 입장권 매출 정산을 다시 확인하려 했다.",
  statement: "",
};
