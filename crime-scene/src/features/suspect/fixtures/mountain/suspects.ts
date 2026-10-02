import { SuspectType, VictimType } from "@/features/suspect/types";

export const mountainSuspects: SuspectType[] = [
  {
    name: "천람석",
    image: "/image/suspect/scenario/mountain/profile/rs_cheon.png",
    age: 26,
    gender: "male",
    job: "추러스 신입 부원",
    description:
      "아…안녕하세요. 저는 천람석이라고 합니다. 예. 그 제가 추러스에 들어온지 얼마 안되어서 말이. 에. 을! 더듬을 수도 있는데, 양해바랍니다. 죄송해요 너무 떨려서.",
    statement:
      "추러스 MT가 재미없어서 좀 도망갔어요. 근데 아무도 모르더라구요. 스케줄을 무시하고.. 예. 단독행동을 한 건 죄송한데, 그게 절 살인자로 몰 이유는 안되죠.",
    finalArgument:
      "저 아니에요. 갑자기 사라진건 제 취미를 위해서지 살인을 위해서가 아니에요. 그리고 실족사일 수 있다면서요, 살인자로 왜 모시는 거에요. 제발 저 아니에요.",
  },
  {
    name: "최령신",
    image: "/image/suspect/scenario/mountain/profile/rs_choi.png",
    age: 25,
    gender: "male",
    job: "추러스 신입 교육 담당 임원",
    description:
      "안녕하십니까. 저는 추러스 신입 부원 교육 담당 임원진이자, 철학과 17학번에 재학중인 최령신이라고 합니다. 제 말투가 이상하다고요? 뭐, 그렇게 느낄 수도 있죠. 사람마다 생각은 다 다른거니까요.",
    statement:
      "오늘 MT 장소에서 7시 20분 쯤 회장님과 함께 추러스 가게로 출발했습니다. 송채린 양은 화장실에 있겠다고 두고 왔고요. 그러다 회장님과 표지판 근처에서 헤어졌습니다. 제 말을 안들으시더니, 결국 이렇게 되었군요.",
    finalArgument:
      "내가 범인이라니. 당치도 않는 소리입니다. 분명 회장님과 마지막으로 같이 있었던 사람이라고 저를 의심하시는 것이겠지요? 아닙니다. 분명 저와 헤어진 후 다른 사람과 만난 게 분명합니다. 그렇지 않고서야, 회장님이 어떻게 제가 가지도 않은 절벽에서 죽었겠습니까.",
  },
  {
    name: "차림솔",
    image: "/image/suspect/scenario/mountain/profile/rs_cha.png",
    age: 26,
    gender: "female",
    job: "추러스 가게 알바",
    description:
      "안녕하세요, 저는 추러스 가게에서 알바하고 있는 차림솔입니다. 어… 식품영양학과 17학번이긴 한데요, 지금은 그냥 알바하고 있어요. 곧 졸업하거든요. 더, 소개할 게 있나? MBTI는 ENFP이고요. 재기발랄한 활동가라는데, 저는 잘 모르겠어요. 완전 설명보면 저랑 비슷한 것 같으면서도 약간 안맞는 부분이 있는 것 같은데…, 아 제 얘기 그만할게요. 그래서 탐정님 MBTI는 뭐에요?",
    statement:
      "청룡산은 제 일터죠. 가게를 잠깐 벗어나긴 했었어요. 소화도 시킬 겸… 발 닿는 대로 걷다가 다시 같은 경로로 돌아왔어요. 음…. 기억이 잘 나진 않네요? 한 7시 전후로 산책 갔다왔던거같은데. 가게를 맘대로 비워도 되냐고요? 어차피 사람 안와요~",
    finalArgument:
      "저 아니에요 탐정님. 아니, 난 추러스 가게에 있던 사람이에요. 가게를 오래 비운게 죄가 되나요? 다시 가게에 돌아왔다니까요? 알리바이를 잘 보세요. CCTV를 보시라고요. 아니 유능한 사람들인 줄 알았는데 아니었잖아?",
  },
  {
    name: "채린 송",
    image: "/image/suspect/scenario/mountain/profile/cr_song.png",
    age: 22,
    gender: "female",
    job: "추러스 신입 부원",
    description:
      "Hi… I’m Chaerin Song. I major in sculpture…. 저는 조소 인간 입니다. 19.5 hak-beon…ip-ni-da. Yeah… uh… wow… I don’t even know what’s going on… Sorry. My bad.",
    statement:
      "I don’t know anything… I just went to the 화장실, and then I headed over to the churros shop a bit late. I got there… and that’s it.",
    finalArgument: "저 아닙니다. 진짜 아니에요. 억울해요.",
  },
];

export const mountainVictim: VictimType = {
  name: "추리수",
  image: "/image/suspect/scenario/mountain/profile/rs_chu.png",
  age: 23,
  gender: "male",
  job: "추러스 회장",
  description:
    "수리과학부 19학번이자 추러스 회장. 청룡산 절벽 아래에서 숨진 채 발견되었다.",
  statement: "",
};
