import { SuspectType, VictimType } from "@/features/suspect/types";

const placeholderImage = "/image/suspect/scenario/bluemoon/bluemoon-main.png";

export const bluemoonSuspects: SuspectType[] = [
  {
    name: "김선민",
    image: "/image/suspect/scenario/bluemoon/profile/sm_kim.png",
    age: 36,
    gender: "male",
    job: "향리",
    description:
      "안녕하십니까. 저는 이 고을의 향리인 김선민입니다. 김관우님은 제 상관이십니다. 아시다시피 그렇게 사이가 좋지는 않았습니다.",
    statement:
      "저는 오늘 11시 경 관청을 나가, 기방에 가려다 다시 돌아와서 관청 밖을 돌아다니며 담배를 피우다 보니 이곳에 떨어져 있었습니다.",
    finalArgument: "아직 최종 변론이 준비되지 않았습니다.",
  },
  {
    name: "가영",
    image: "/image/suspect/scenario/bluemoon/profile/gayeong.png",
    age: 20,
    gender: "female",
    job: "기생",
    description:
      "안녕하신지요. 저는 고을 기방 월향루의 첫 번째 꽃, 가영이라고 합니다. 관우님과는 저희 기방에 들를 때 몇 차례 본 적이 있는 사이입니다",
    statement:
      "저는 사건 당일 11시 30분에 관우님이 부르셔서 갔다가, 계시지 않길래 계속 하인 돌쇠의 집에 가 있었습니다. 돌쇠와 재미있게 놀다 보니 정신을 잃고 이곳에 떨어졌습니다.",
    finalArgument: "아직 최종 변론이 준비되지 않았습니다.",
  },
  {
    name: "임연화",
    image: "/image/suspect/scenario/bluemoon/profile/yh_im.png",
    age: 44,
    gender: "female",
    job: "부인",
    description:
      "안녕하사와요. 다들 아시겠지만 관우의 둘도 없는 처, 임연화라고 하옵니다. 오늘 저녁에은 계속 안방에만 있어서 바깥 상황은 전혀 몰랐사옵니다.",
    statement:
      "저녁에 방에서 연부농씨를 만나고, 11시 45분에 연부농을 보낸 이후에는 계속 혼자 방 안에 있었습니다. 그러고 보니 부농씨가 나가고 조금 뒤에 다급한 발자국 소리를 들었습니다.",
    finalArgument: "아직 최종 변론이 준비되지 않았습니다.",
  },
  {
    name: "량타오췬",
    image: "/image/suspect/scenario/bluemoon/profile/tc_liang.png",
    age: 31,
    gender: "male",
    job: "청나라 사신",
    description:
      "Da Jia Hao, Wo shi Liang Tao Chin. 청에서 와서 조선말이 조금 어눌하다. 양해 부탁드린다해. 김관우는 이 동네 대장. 몇 번 본 적 있다. ",
    statement:
      "나는 11시 55분에 별채에서 나왔다해. 12시부터 김관우의 방 문 앞에서 기다렸는데, 김관우 안 나왔다. 그래서 문 열려고 했는데, 여기였다해. Wǒ xiǎng kuàidiǎn huídào yuánlái de dìfāng.",
    finalArgument: "아직 최종 변론이 준비되지 않았습니다.",
  },
  {
    name: "허순",
    image: "/image/suspect/scenario/bluemoon/profile/s_heo.png",
    age: 22,
    gender: "female",
    job: "약방 주인",
    description:
      "안녕하신지요. 오다가다 만난 분도 계시겠지만, 소녀는 고을 약방의 주인 허순입니다. 왜 여기 있는지는 잘 모르겠습니다. 피해자는 이 고을의 현령이시고, 그리 좋은 분은 아니었던 걸로 알고 있습니다.",
    statement:
      "소녀는 11시 40분 경 관청에 들어와 숨어서 사람들을 지켜보고 있다가, 갑자기 정신을 잃었습니다. 연부농이 나오는 걸 봤고, 곧 량타오친과 만나는 걸 봤습니다. 조금 더 숨어있다 보니 이곳이었습니다.",
    finalArgument: "아직 최종 변론이 준비되지 않았습니다.",
  },
  {
    name: "연부농",
    image: "/image/suspect/scenario/bluemoon/profile/bn_yeon.png",
    age: 29,
    gender: "male",
    job: "부유 농민",
    description:
      "안녕하십니까. 옆 고을 농부인 연부농입니다. 관우님과는 몇 차례 일적으로 이야기한 적이 있습니다.",
    statement:
      "저는 오늘은 마님께 볼 일이 있어 마님 방에 들렀다가 11시 45분에 나왔습니다. 나가는 길에 55분쯤 량타오친님을 보았고, 집 밖으로 나와 12시 경에 벽에 기대 기다리고 있었습니다. 저도 그렇게 정신을 잃었습니다..",
    finalArgument: "아직 최종 변론이 준비되지 않았습니다.",
  },
];

export const bluemoonVictim: VictimType = {
  name: "김관우",
  image: "/image/suspect/scenario/bluemoon/profile/kw_kim.png",
  age: 31,
  gender: "male",
  job: "탐관오리",
  description: "푸른 달이 뜨는 밤 숨진 탐관오리.",
  statement: "",
};
