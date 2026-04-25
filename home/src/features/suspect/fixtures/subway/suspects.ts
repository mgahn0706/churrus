import { SuspectType, VictimType } from "@/features/suspect/types";

export const subwaySuspects: SuspectType[] = [
  {
    name: "전공익",
    image: "/image/suspect/scenario/subway/profile/gi_jeon.png",
    age: 25,
    gender: "male",
    job: "지하철 공익근무요원",
    description:
      "사건이 벌어진 역사에서 안내와 질서 유지를 돕는 공익요원. 플랫폼과 지상층을 자주 오가며 역 안 분위기를 빠르게 파악하는 편이다.",
    statement:
      "저는 그날도 평소처럼 플랫폼 쪽에서 안내 업무를 보고 있었습니다. 사람이 빠진 뒤에는 지상층 쪽으로 올라가 있었고, 한참 뒤에야 역 안이 시끄러워졌다는 걸 알았어요.",
    finalArgument:
      "제가 역 안을 잘 안다고 해서 절 의심하시는 건가요? 저는 늘 사고 안 나게 사람들 통제하고 안내하는 입장입니다. 괜히 문제를 만들 이유가 없습니다.",
  },

  {
    name: "전사장",
    image: "/image/suspect/scenario/subway/profile/sj_jeon.png",
    age: 51,
    gender: "male",
    job: "추리스 커피 카페 사장",
    description:
      "역사 출구 근처에서 추리스 커피를 운영하는 사장. 늦은 시간까지 가게를 정리하는 날이 많아 막차 무렵의 역사 분위기에도 익숙하다.",
    statement:
      "그날도 가게 마감 정리를 하고 있었어요. 손님이 거의 빠진 뒤라 매장 안과 창고를 오갔고, 피해자도 지나가는 모습 정도만 봤습니다. 직접 길게 대화를 나누진 않았어요.",
    finalArgument:
      "저는 장사하는 사람입니다. 역사 안에서 사고가 나면 제 가게에도 바로 타격이 옵니다. 굳이 이런 일을 벌여서 제 목을 조를 이유가 없어요.",
  },
  {
    name: "홍셰프",
    image: "/image/suspect/scenario/subway/profile/sp_hong.png",
    age: 28,
    gender: "female",
    job: "킷사샤울 셰프",
    description:
      "근처 식당 킷사샤울에서 일하는 셰프. 퇴근이 늦은 편이라 막차 시간대 역사 주변을 지나는 일이 잦고, 상가 구역에도 종종 들른다.",
    statement:
      "그날은 가게 일이 늦게 끝나서 지상층 쪽 상가를 들렀다가 내려왔어요. 피해자를 본 것 같긴 한데, 제가 워낙 피곤해서 자세히 기억나진 않습니다. 따로 말을 건 적도 없어요.",
    finalArgument:
      "저는 하루 종일 주방에서 일하고 나와서 녹초였어요. 남을 해칠 기운도 없었고, 역사에서 문제를 일으키면 괜히 저만 더 피곤해집니다.",
  },
  {
    name: "하승객",
    image: "/image/suspect/scenario/subway/profile/sg_ha.png",
    age: 20,
    gender: "female",
    job: "대학생",
    description:
      "근처 대학에 다니는 학생. 평소 이 역을 자주 이용하는 승객이라 사건 당일에도 막차 시간대 역사 안에 있었다고 한다.",
    statement:
      "저는 수업 끝나고 약속이 있어서 역에 들렀다가 집에 가려던 참이었어요. 뭔가 소란스러운 분위기는 느꼈지만, 무슨 일인지 정확히 알게 된 건 나중이었습니다.",
    finalArgument:
      "저는 그냥 지나가던 학생이었어요. 피해자랑 원한 관계도 아니고, 굳이 모르는 사람을 해칠 이유가 없습니다. 저를 의심할 만한 이유가 있나요?",
  },
];

export const subwayVictim: VictimType = {
  name: "정보건",
  image: "/image/suspect/scenario/subway/profile/bg_jeong.png",
  age: 27,
  gender: "female",
  job: "보건소 위생과 조사관",
  description:
    "관할 보건소 위생과에서 근무하는 조사관. 사건 당일 역사 내부 상가와 관련된 민원을 확인하기 위해 현장에 들른 것으로 보인다.",
  statement: "",
};
