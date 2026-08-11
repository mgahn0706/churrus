import { SuspectType, VictimType } from "@/features/suspect/types";

export const boxSuspects: SuspectType[] = [
  {
    name: "배홍동",
    image: "/image/suspect/scenario/box/profile/bae_hd.png",
    age: 25,
    gender: "male",
    job: "배동",
    description:
      "세자의 곁에서 글을 가르치고 일상을 보좌하던 젊은 관원입니다.",
    statement:
      "그날 저는 세자저하의 처소 밖에서 명을 기다리고 있었습니다. 뒤주에 관한 일은 나중에야 알았습니다.",
    finalArgument:
      "저하를 가까이에서 모신 것은 맞지만, 저는 명을 거스를 수 있는 사람이 아닙니다. 제가 뒤주를 준비하거나 세자저하를 해할 이유도 없었습니다.",
  },
  {
    name: "제미인",
    image: "/image/suspect/scenario/box/profile/je_mi.png",
    age: 30,
    gender: "female",
    job: "지밀나인",
    description:
      "궁 안의 사정을 오래 지켜본 나인으로, 세자와 왕실 사람들의 갈등을 가까이에서 보아 왔습니다.",
    statement:
      "저는 그날 내전에서 다른 나인들과 함께 있었습니다. 궁 안이 뒤숭숭했던 것은 사실이나, 세자저하께 직접 갈 수 있는 처지는 아니었습니다.",
    finalArgument:
      "궁 안의 소문을 안다고 해서 제가 사람을 죽인 것은 아니지 않습니까. 저는 제 목숨 하나 지키기도 벅찬 사람이에요.",
  },
  {
    name: "문직",
    image: "/image/suspect/scenario/box/profile/mun_j.png",
    age: 38,
    gender: "male",
    job: "문지기",
    description:
      "궁문과 행각을 지키는 수문장입니다. 사건 당일 뒤주가 놓인 곳 주변의 출입을 통제했습니다.",
    statement:
      "저는 명을 받고 문을 지켰을 뿐입니다. 누구도 함부로 드나들게 하지 않았고, 세자저하의 처분에 관해서는 아는 바가 없습니다.",
    finalArgument:
      "창을 들고 문을 지킨다고 해서 제가 살인을 저지를 수 있는 것은 아닙니다. 저는 받은 명령대로 자리를 지켰습니다.",
  },
  {
    name: "군의관",
    age: 65,
    gender: "male",
    job: "의관",
    description:
      "궁 안의 환자들을 돌보는 노련한 의관입니다. 사건 당일에도 환자의 약을 달이고 있었습니다.",
    statement:
      "저는 밤새 약방에서 처방한 약을 달였습니다. 세자저하의 상태를 확인한 적은 있으나, 뒤주가 있는 폐궁에는 가지 않았습니다.",
    finalArgument:
      "약을 다루는 사람이니 의심받을 것은 예상했습니다. 그러나 검시 결과 독의 흔적은 없었고, 제가 약방을 비운 시각도 기록으로 확인할 수 있습니다.",
  },
];

export const boxVictim: VictimType = {
  name: "추도세자",
  image: "/image/suspect/scenario/box/profile/chu_dsj.png",
  age: 27,
  gender: "male",
  job: "조선의 왕세자",
  description:
    "1762년 7월 12일, 궁 안의 뒤주에서 숨진 채 발견된 조선의 왕세자.",
  statement: "",
};
