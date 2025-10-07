import { SuspectType, VictimType } from "@/features/suspect/types";

export const jahayeonSuspects: SuspectType[] = [
  {
    name: "서여친",
    image: "/image/suspect/scenario/jahayeon/profile/seo_yc.png",
    age: 21,
    gender: "female",
    job: "피해자의 여자친구",
    description:
      "서울대학교 사회과학대학 사회학과 22학번 서여친이라고 합니다. 하연이는 제 남자친구예요.",
    statement:
      "28일 행적이요? 저는 어제부터 오늘까지 김하연을 본 적이 없어요. 일문과 술자리에 간다는 건 알았지만 어디서 먹는지를 몰랐죠. 그래서 28일 저녁부터 걔를 한참 찾았어요. 연락을 아예 안받더라고요. 왜 그렇게 걔를 찾았냐고요? 그런 것까지 말해야하나요?",
    finalArgument: "",
  },
  {
    name: "조노원",
    image: "/image/suspect/scenario/jahayeon/profile/cho_nw.png",
    age: 23,
    gender: "male",
    job: "일어일문 21학번",
    description:
      "안녕하세요, 인문대 일어일문학과 21학번 조노원이라고 합니다. 노원구에서 통학 중입니다. 하연이는 저희 과 과대여서 자주 만났던 사이죠.",
    statement:
      "제 행적이요? 28일 저녁에는 같이 과 친구들과 술자리를 했죠. 하연이도 거기 있었고요. 한 10시 쯤이었나…그 날 너무 피곤해서 빨리 취해버렸던 기억이 나요. 다른 친구들이 저를 옆방 소파에 눕혀주었고요. 아마 잠든 것 같습니다. 그 후에 새벽 2시 반? 3시? 쯤에 일어나서 택시타고 제 집으로 왔습니다. 도착해서 숙취음료와 간식 사고 집으로 들어왔어요. 일어났을 때 하연이가 있었냐고요? 아니요, 다들 떠나버린 상태였어요. 하연이는 평소에 다른 친구들을 챙기는 편인데, 절 혼자 두고 간 것부터 좀 수상했어요…",
    finalArgument: "",
  },

  {
    name: "이구관",
    image: "/image/suspect/scenario/jahayeon/profile/lee_gg.png",
    age: 23,
    gender: "male",
    job: "일어일문 21학번",
    description:
      "일어일문 21학번입니다. 922동에 거주 중이에요. 김하연은 그냥 저희 과대일 뿐입니다. 그 친구를 저를 모를걸요?",
    statement:
      "저는 28일, 어제 그 과대친구와 박경기, 조노원과 함께 술자리에 갔습니다. 저녁이 지나고 밤까지 술을 계속 먹은 것 같아요. 몇몇은 가고 마지막에 저랑 과대친구만 남았었습니다. 그 이후로 그 친구와 얘기 좀 했던 것 같네요… 죄송하지만 자정 이후 기억이 없습니다. 눈을 떠보니 제 기숙사 방이었고 시간은 새벽 3시쯤 되었던 것 같아요. 필름이 끊겨서 죄송합니다. ",
    finalArgument: "",
  },
  {
    name: "박경기",
    image: "/image/suspect/scenario/jahayeon/profile/park_gg.png",
    age: 22,
    gender: "male",
    job: "일어일문 21학번",
    description:
      "일어일문학과의 박경기입니다. 경기도 남양주시에서 통학 중이고요. 하연이와는 같은 과라 친해진 것일 뿐, 그 친구를 싫어하거나 하지는 않아요.",
    statement:
      "저도 28일 술자리에 같이 있긴 했죠. 그런데 전 맨 처음 자리에서 나왔어요. 한 10시 반쯤이었을 겁니다. 왜 나왔냐고요? 막차를 타야했기 때문이죠. 남양주시에 살고 있는데, 지하철 막차가 11시면 끊기거든요. 제가 나온건 구관이와 하연이가 봤을 거에요. 그렇게 지하철타고 버스타고 해서 새벽에 집에 도착했습니다.",
    finalArgument: "",
  },
];

export const jahayeonVictim: VictimType = {
  name: "김하연",
  image: "/image/suspect/scenario/jahayeon/profile/kim_hy.png",
  age: 22,
  gender: "male",
  job: "일어일문 21학번 과대표",
  statement: "",
  description:
    "마르고 작은 체구를 가진 서울대학교 일어일문학과 남학생. 기숙사 신관인 901동에 거주 중이다. 평소 밝은 성격으로, 다른 친구들을 잘 챙겨준다.",
};
