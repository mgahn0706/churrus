import { SuspectType, VictimType } from "@/features/suspect/types";

export const clubroomSuspects: SuspectType[] = [
  {
    name: "용의자 A",
    image: "/image/suspect/scenario/clubroom/profile/ai_gu.png",
    age: 24,
    gender: "male",
    job: "미정",
    description: "추후 설정될 동아리방 시나리오의 용의자 A.",
    statement: "아직 진술이 작성되지 않았습니다.",
    finalArgument: "아직 최종 변론이 작성되지 않았습니다.",
  },
  {
    name: "용의자 B",
    image: "/image/suspect/scenario/clubroom/profile/cm_an.png",
    age: 24,
    gender: "female",
    job: "미정",
    description: "추후 설정될 동아리방 시나리오의 용의자 B.",
    statement: "아직 진술이 작성되지 않았습니다.",
    finalArgument: "아직 최종 변론이 작성되지 않았습니다.",
  },
  {
    name: "용의자 C",
    image: "/image/suspect/scenario/clubroom/profile/hj_na.png",
    age: 24,
    gender: "female",
    job: "미정",
    description: "추후 설정될 동아리방 시나리오의 용의자 C.",
    statement: "아직 진술이 작성되지 않았습니다.",
    finalArgument: "아직 최종 변론이 작성되지 않았습니다.",
  },
  {
    name: "용의자 D",
    image: "/image/suspect/scenario/clubroom/profile/jc_jang.png",
    age: 24,
    gender: "male",
    job: "미정",
    description: "추후 설정될 동아리방 시나리오의 용의자 D.",
    statement: "아직 진술이 작성되지 않았습니다.",
    finalArgument: "아직 최종 변론이 작성되지 않았습니다.",
  },
];

export const clubroomVictim: VictimType = {
  name: "피해자",
  image: "/image/suspect/scenario/clubroom/profile/ji_oh.png",
  age: 24,
  gender: "male",
  job: "미정",
  description: "추후 설정될 동아리방 시나리오의 피해자.",
  statement: "",
};
