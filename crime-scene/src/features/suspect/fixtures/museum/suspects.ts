import { SuspectType, VictimType } from "@/features/suspect/types";

export const museumSuspects: SuspectType[] = [
  {
    name: "신시장",
    image: "/image/suspect/scenario/museum/profile/shin_sj.png",
    age: 38,
    gender: "female",
    job: "샤울특별시 시장 후보",
    description:
      "현재 출마를 준비 중인 시장 후보입니다. 당선은 거의 확실하죠. 시의 박물관 지원 정책이 탐탁치 않긴 하지만… 사람을 죽이진 않습니다.",
    statement:
      "오늘 개관 전, 그러니까 아침 7시 30분에 박물관 A동에 왔어요. 제가 시체를 발견했죠. 손에 피요? 이건 손을 따다가…",
    finalArgument:
      "저를 왜 의심하시는 거죠? 저는 시장 후보입니다. 이런 일로 제 명예를 더럽히진 않아요. 저는 박물관 내부를 잘 알지도 못해요. 어떻게 박물관에서 능숙히 사람을 죽이겠어요?",
  },
  {
    name: "김큐레",
    image: "/image/suspect/scenario/museum/profile/kim_kr.png",
    age: 41,
    gender: "male",
    job: "박물관 큐레이터",
    description:
      "안녕하세요, 8년 전부터 추러스 박물관을 관리한 큐레이터입니다. 도투어는 그냥 직장 동료?",
    statement:
      "전 어젯밤 내내 B동에 위치한 제 사무실에서 업무를 보고 있었어요. 중간에 전시실을 둘러보기는 했지만, 이상한 점은 없었어요. 오늘은 오전 반차라 제 집에 있었고요.",
    finalArgument:
      "진짜 말도 안됩니다. 저는 오늘 내내 박물관에 들어가지도 않았어요. 그럼 어제 죽였을까요? 말도 안됩니다. 알리바이상으로도 말이 안되고, 사건 현장을 조작할 이유는 더더욱 없어요.",
  },

  {
    name: "강컨서",
    image: "/image/suspect/scenario/museum/profile/kang_ks.png",
    age: 49,
    gender: "male",
    job: "박물관 컨서베이터",
    description:
      "박물관의 여러 전시의 유지 보수작업을 담당하고 있습니다. 전 일개 직원이에요. 투어 씨에게 원한도 없다고요.",
    statement:
      "오늘 전 평소보다 일찍 아침 6시 반에 출근해 A동과 B동 전시물 몇개의 보수 작업을 했어요. 6시 50분에 A동을 떠날 때까지만 해도 큰 이상은 없었는데요.. ",
    finalArgument:
      "저를 왜 의심하시는 건지. 전 박물관 직원이고 추리에는 큰 관심 없어요. 도투어 씨의 시체 상태를 보세요. 누가봐도 추리에 관심 있는 사람이 저지른 범죄잖아요.",
  },
];

export const museumVictim: VictimType = {
  name: "도투어",
  image: "/image/suspect/scenario/museum/profile/doh_tu.png",
  age: 30,
  gender: "male",
  job: "박물관 투어 가이드",
  statement: "",
  description: "추러스 박물관에서 근무한 지 1년 정도 된 투어가이드.",
};
