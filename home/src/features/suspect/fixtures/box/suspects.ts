import { SuspectType, VictimType } from "@/features/suspect/types";

export const boxSuspects: SuspectType[] = [
  {
    name: "배홍동",
    image: "/image/suspect/scenario/box/profile/bae_hd.png",
    age: 25,
    gender: "male",
    job: "배동",
    description:
      "세자 저하의 배동, 배홍동입니다. 어릴 적부터 저하 곁을 지켜왔지요… 뭐, 성미가 조금 거치시긴 해도 제가 잘 맞춰드리는 수밖에요.",
    statement:
      "저는 주상전하의 명에 따라 추도에게 음식물이나 물, 용변처리 등을 담당했습니다. 오늘은 새벽 2시경에 갔는데 뒤주 안이 조용하길래 ‘자고있나보네…. 괜히 건드렸다 욕먹지 말아야지’하고 그냥 돌아갔습니다.",
    finalArgument:
      "제가 추도세자 님의 오랜 벗이라고, 감정적으로 추리하신 건 이해합니다. 하지만, 전 범인이 아닙니다. 알리바이도 명확하고, 죽일 도구도 없습니다. 저를 범인으로 몰 이유는 하나도 없다구요.",
  },
  {
    name: "군의관",
    image: "/image/suspect/scenario/box/profile/gun_ug.png",
    age: 65,
    gender: "male",
    job: "의관",
    description:
      "궁의 약방을 맡고 있는 의관이오. 약이라면 모르는 것이 없으니, 몸이 아프거든 찾아오시오. 값만 제대로 치른다면 말이지.",
    statement:
      "자정 무렵 세자의 용태를 확인하러 폐궁에 다녀왔고, 당시에는 별다른 이상이 없었소. 이후 약방으로 돌아갔다가 새벽 네 시경 다시 찾아가 시신을 발견한거요.",
    finalArgument:
      "약을 다루는 사람이니 의심받을 것은 예상했습니다. 그러나 검시 결과 독의 흔적은 없었고, 제가 세자에게 약을 건넨 적도 없으니, 저를 범인으로 몰아가는 것은 억울합니다.",
  },
  {
    name: "문직",
    image: "/image/suspect/scenario/box/profile/mun_j.png",
    age: 28,
    gender: "male",
    job: "문지기",
    description:
      "폐궁의 출입을 지키는 문지기, 문직입니다. 얼굴을 가리는 데에는 사정이 있으니 캐묻지 마십시오. 제 할 일은 그저 아무도 이곳을 드나들지 못하게 하는 것입니다.",
    statement:
      "어젯 밤 누군가 추노했다고 들었소. 아마 폐궁쪽으로 온 것 같은데, 늦은 밤 소인이 그를 쫒아내느라 욕봤소. 붙잡아서 궁쪽으로 잘 돌려보냈고, 그 이후에 별다른 점은 없었소이다.",
    finalArgument:
      "창을 들고 문을 지킨다고 해서 제가 살인을 저지를 수 있는 것은 아닙니다. 저는 받은 명령대로 자리를 지켰습니다.",
  },

  {
    name: "제미인",
    image: "/image/suspect/scenario/box/profile/je_mi.png",
    age: 30,
    gender: "female",
    job: "지밀나인",
    description:
      "세자 저하를 가까이서 모시는 지밀나인 제미인입니다. 궁에서는 오래 살아남으려면, 보아도 못 본 척하고 들어도 못 들은 척할 줄 알아야 하지요.",
    statement:
      "저녁 수발을 마친 뒤에는 줄곧 제 처소에 있었습니다. 밤중에 폐궁 근처에는 간 적도, 세자 저하를 다시 뵌 적도 없습니다.",
    finalArgument:
      "궁 안의 소문을 안다고 해서 제가 사람을 죽인 것은 아니지 않습니까. 저는 제 목숨 하나 지키기도 벅찬 사람이에요.",
  },
];

export const boxVictim: VictimType = {
  name: "추도세자",
  image: "/image/suspect/scenario/box/profile/chu_dsj.png",
  age: 28,
  gender: "male",
  job: "조선의 왕세자",
  description:
    "1762년 7월 12일, 궁 안의 뒤주에서 숨진 채 발견된 조선의 왕세자.",
  statement: "",
};
