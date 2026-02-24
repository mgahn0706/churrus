import { SuspectType, VictimType } from "@/features/suspect/types";

export const kpopSuspects: SuspectType[] = [
  {
    name: "하루",
    image: "/image/suspect/scenario/kpop/profile/haru.png",
    age: 21,
    gender: "female",
    job: "HaEvE 멤버",
    description: "케이팝 데몬 헌터스 사건과 관련된 인물로 조사 중입니다.",
    statement: "아직 진술을 정리 중입니다.",
    finalArgument: "아직 최종 변론이 준비되지 않았습니다.",
  },
  {
    name: "석PD",
    image: "/image/suspect/scenario/kpop/profile/seok_pd.png",
    age: 42,
    gender: "male",
    job: "방송 PD",
    description: "케이팝 데몬 헌터스 사건과 관련된 인물로 조사 중입니다.",
    statement: "아직 진술을 정리 중입니다.",
    finalArgument: "아직 최종 변론이 준비되지 않았습니다.",
  },

  {
    name: "매니",
    image: "/image/suspect/scenario/kpop/profile/mani.png",
    age: 28,
    gender: "male",
    job: "HaEvE 매니저",
    description: "케이팝 데몬 헌터스 사건과 관련된 인물로 조사 중입니다.",
    statement: "아직 진술을 정리 중입니다.",
    finalArgument: "아직 최종 변론이 준비되지 않았습니다.",
  },
  {
    name: "에덴",
    image: "/image/suspect/scenario/kpop/profile/eden.png",
    age: 24,
    gender: "male",
    job: "Forbidden 멤버",
    description: "케이팝 데몬 헌터스 사건과 관련된 인물로 조사 중입니다.",
    statement: "아직 진술을 정리 중입니다.",
    finalArgument: "아직 최종 변론이 준비되지 않았습니다.",
  },
  {
    name: "아담",
    image: "/image/suspect/scenario/kpop/profile/adam.png",
    age: 23,
    gender: "male",
    job: "Forbidden 멤버",
    description: "케이팝 데몬 헌터스 사건과 관련된 인물로 조사 중입니다.",
    statement: "아직 진술을 정리 중입니다.",
    finalArgument: "아직 최종 변론이 준비되지 않았습니다.",
  },
];

export const kpopVictim: VictimType = {
  name: "이브",
  image: "/image/suspect/scenario/kpop/profile/eve.png",
  age: 21,
  gender: "female",
  job: "HaEvE 멤버",
  description: "그룹 내부에서 발생한 사건의 피해자로 조사 중입니다.",
  statement: "",
};
