import { SuspectType, VictimType } from "@/features/suspect/types";

export const subwaySuspects: SuspectType[] = [
  {
    name: "전공익",
    image: "/image/suspect/scenario/subway/profile/gi_jeon.png",
    age: 25,
    gender: "male",
    job: "지하철 공익근무요원",
    description:
      "안녕하세요. 전 전공익이라고 합니다. 뭐, 지하철에서 업무보는 사람이죠. 제가 사람을 죽일 것처럼 보이나요? 에휴, 조사 받기도 귀찮네요. 제가 용의자라고요? 제가요? 왜요?",
    statement:
      "전 오늘 야간 근무라 오후 6시에 서울대입구역에 왔어요. 중간에 취객 상대도 하고 화장실에 토한 거 제가 다 치웠어요. 아니, 이거 원래 공익이 하는거 아닌데 진짜 사회복무요원을 뭘로 보는지 좀 이해가 안갑니다. 병무청에 신고하려고요. 그러고 한 9시쯤 밖에 나갔다 온 것 밖에는 없네요?",
    finalArgument:
      "하, 내가 왜 죽였다는 거야. 죽이고는 싶었지만 알아서 먼저 쓰러지던데? 내가 커피를 줬다고? 퍽이나 그 사람이 내가 주는 거 마셨겠다. 이거 공익 차별이에요. 신체검사 4급 나온 거 무시합니까? 진짜 어이가 없어서.",
  },

  {
    name: "전사장",
    image: "/image/suspect/scenario/subway/profile/sj_jeon.png",
    age: 51,
    gender: "male",
    job: "추리스 커피 카페 사장",
    description:
      "예, 서울대입구역 근처에서 ‘추리스 커피’ 카페를 운영하고 있는 전사장입니다. 예, 서울대 학생이라면 다들 한 번 쯤 와봤겠지요?",
    statement:
      "예, 오늘은 쭉 카페에 있었습니다. 뭐, 마감 전에 잠깐 자리를 비우긴 했는데 그게 엄청 길진 않아서요.",
    finalArgument:
      "하, 이 나이 먹고 범인으로 의심당하다니. 네, 알아요. 커피에 독이 있었으니 카페 사장이 범인이다, 뭐 그런거겠죠. 이해합니다. 하지만, 정보건 씨는 정말 제 생명의 은인이세요. 죽일 동기가 없는 걸 넘어서 죽어서는 안되는 사람이란 말입니다.",
  },
  {
    name: "홍셰프",
    image: "/image/suspect/scenario/subway/profile/sp_hong.png",
    age: 28,
    gender: "female",
    job: "킷사샤울 셰프",
    description:
      "이랏샤이마세. 안녕하세요. 킷사샤울이라는 일식점을 운영하고 있는 일식 전문 셰프, 홍셰프라고 합니다. 요로시쿠 오네가이시마스!",
    statement:
      "음, 음식점은 주말에도 영업을 하거덩요. 그래서 오늘 쭉 음식점에 있었죠. 보건이를 8시? 쯤 만나긴 했는데 그 이후 바로 헤어지고 식당으로 돌아왔어요.",
    finalArgument:
      "하…. 완전히 잘못 생각 중이시군요. 서울대입구역, 그것도 사람들이 다니는 곳에서 죽일 이유가 뭐있겠습니까. 제가 죽였다면 이 사시미칼로 푹. 찔러 죽이면 끝이에요. 그리고 아끼는 후배를 왜 죽여요? 오히려 덕만 봤구만. 참 어이가 없어서~",
  },
  {
    name: "하승객",
    image: "/image/suspect/scenario/subway/profile/sg_ha.png",
    age: 20,
    gender: "female",
    job: "대학생",
    description:
      "안녕하세요, 서울대학교에 입학한 경영학과 이십학번 하승객이라고 합니다. 어, 저는 서울대 학생이긴 한데요, 그냥 서울대입구역에서 내린 것 밖에 없는데요?",
    statement:
      "저는 성수쪽 사는데 오늘 회의도 있고 곧 체력단련 시험이라 헬스장도 갈 예정이었어요. 뭐, 그정도? 그래서 9시쯤 왔다가 스케줄 끝나고 9시 55분, 10시쯤 다시 플랫폼에 서있었는데 글쎄 뒤에서 토하는 소리가 들리더니….",
    finalArgument:
      "아니에요, 진짜 아니에요. 저 이제 서울대 입학했고 학교 생활도 아직 못해봤어요. 이대로 억울하게 감옥에 가는거에요? 저는 진짜 모르는 일이에요. 그 분도 절 모르고 저도 그분을 모르는데, 커피를 줄 수가 있나요? 탐정님은 모르는 사람이 준 커피 막 드세요? 예?",
  },
];

export const subwayVictim: VictimType = {
  name: "정보건",
  image: "/image/suspect/scenario/subway/profile/bg_jeong.png",
  age: 27,
  gender: "female",
  job: "보건소 위생과 조사관",
  description: "관악구 보건소 위생과에서 근무하는 조사관.",
  statement: "",
};
