import { SuspectType, VictimType } from "@/features/suspect/types";

export const mountainSuspects: SuspectType[] = [
  {
    name: "천람석",
    image: "/image/suspect/scenario/mountain/profile/rs_cheon.png",
    age: 26,
    gender: "male",
    job: "지구환경과학부",
    description: "청룡산 사건과 관련된 인물로 조사 중입니다.",
    statement: "아직 진술을 정리 중입니다.",
    finalArgument: "아직 최종 변론이 준비되지 않았습니다.",
  },
  {
    name: "최령신",
    image: "/image/suspect/scenario/mountain/profile/rs_choi.png",
    age: 25,
    gender: "male",
    job: "철학과",
    description: "청룡산 사건과 관련된 인물로 조사 중입니다.",
    statement: "아직 진술을 정리 중입니다.",
    finalArgument: "아직 최종 변론이 준비되지 않았습니다.",
  },
  {
    name: "차림솔",
    image: "/image/suspect/scenario/mountain/profile/rs_cha.png",
    age: 23,
    gender: "female",
    job: "식품영양학과",
    description: "청룡산 사건과 관련된 인물로 조사 중입니다.",
    statement: "아직 진술을 정리 중입니다.",
    finalArgument: "아직 최종 변론이 준비되지 않았습니다.",
  },
  {
    name: "채린 송",
    image: "/image/suspect/scenario/mountain/profile/cr_song.png",
    age: 26,
    gender: "female",
    job: "조소과",
    description: "청룡산 사건과 관련된 인물로 조사 중입니다.",
    statement: "아직 진술을 정리 중입니다.",
    finalArgument: "아직 최종 변론이 준비되지 않았습니다.",
  },
];

export const mountainVictim: VictimType = {
  name: "추리수",
  image: "/image/suspect/scenario/mountain/profile/rs_chu.png",
  age: 23,
  gender: "male",
  job: "수리과학부",
  description: "청룡산 등산로에서 숨진 피해자로 조사 중입니다.",
  statement: "",
};
