import { SuspectType, VictimType } from "@/features/suspect/types";

export const clubroomSuspects: SuspectType[] = [
  {
    name: "구애인",
    image: "/image/suspect/scenario/clubroom/profile/ai_gu.png",
    age: 23,
    gender: "female",
    job: "피해자의 애인",
    description: "추후 설정될 동아리방 시나리오의 용의자 A.",
    statement: "아직 진술이 작성되지 않았습니다.",
    finalArgument: "아직 최종 변론이 작성되지 않았습니다.",
  },
  {
    name: "안총무",
    image: "/image/suspect/scenario/clubroom/profile/cm_an.png",
    age: 22,
    gender: "male",
    job: "추러스 총무",
    description: "추후 설정될 동아리방 시나리오의 용의자 B.",
    statement: "아직 진술이 작성되지 않았습니다.",
    finalArgument: "아직 최종 변론이 작성되지 않았습니다.",
  },
  {
    name: "오지인",
    image: "/image/suspect/scenario/clubroom/profile/ji_oh.png",
    age: 24,
    gender: "female",
    job: "피해자의 친한 선배",
    description: "추후 설정될 동아리방 시나리오의 용의자 C.",
    statement: "아직 진술이 작성되지 않았습니다.",
    finalArgument: "아직 최종 변론이 작성되지 않았습니다.",
  },
  {
    name: "장절친",
    image: "/image/suspect/scenario/clubroom/profile/jc_jang.png",
    age: 23,
    gender: "male",
    job: "피해자의 절친",
    description: "추후 설정될 동아리방 시나리오의 용의자 D.",
    statement: "아직 진술이 작성되지 않았습니다.",
    finalArgument: "아직 최종 변론이 작성되지 않았습니다.",
  },
];

export const clubroomVictim: VictimType = {
  name: "나회장",
  image: "/image/suspect/scenario/clubroom/profile/hj_na.png",
  age: 23,
  gender: "male",
  job: "추러스 회장",
  description: "추후 설정될 동아리방 시나리오의 피해자.",
  statement: "",
};
