import { SuspectType, VictimType } from "@/features/suspect/types";

export const jahayeonSuspects: SuspectType[] = [
  {
    name: "서여친",
    image: "/image/profile/seo_yc.png",
    age: 21,
    gender: "female",
    job: "피해자의 여자친구",
    description:
      "서울대학교 사회과학대학 사회학과 22학번 서여친이라고 합니다. 하연이는 제 남자친구예요.",
    statement:
      "28일 행적이요? 하연이를 그날 한참 찾았는데 결국 못 만났어요. 만나지를 못했는데 어떻게 죽이나요?",
    finalArgument: "",
  },
  {
    name: "조노원",
    image: "/image/profile/cho_nw.png",
    age: 23,
    gender: "male",
    job: "일어일문 21학번",
    description:
      "안녕하세요, 인문대 일어일문학과 21학번 조노원이라고 합니다. 노원구에서 통학 중입니다. 하연이는 저희 과 과대여서 자주 만났던 사이죠.",
    statement:
      "어... 사건 당일에 전 옆방에서 자다가 바로 집으로 갔어요. 그 사이에 하연이에게 무슨 일이 있었나요?",
    finalArgument: "",
  },

  {
    name: "이구관",
    image: "/image/profile/lee_gg.png",
    age: 23,
    gender: "male",
    job: "일어일문 21학번",
    description:
      "일어일문 21학번입니다. 922동에 거주 중이에요. 김하연은 그냥 저희 과대일 뿐입니다. 그 친구를 저를 모를걸요?",
    statement:
      "그날 그 친구랑 술을 너무 많이 마셔서.. 죄송하지만 기억이 안납니다. 하지만 전 바로 기숙사로 돌아왔어요.",
    finalArgument: "",
  },
  {
    name: "박경기",
    image: "/image/profile/park_kg.png",
    age: 22,
    gender: "male",
    job: "일어일문학과",
    description:
      "일어일문학과의 박경기입니다. 경기도 남양주시에서 통학 중이고요. 하연이와는 같은 과라 친해진 것일 뿐, 그 친구를 싫어하거나 하지는 않아요.",
    statement:
      "28일이라면 전 일찍 버스를 타고 집에 왔습니다. 제일 먼저 술자리에서 나왔어요.",
  },
];

export const jahayeonVictim: VictimType = {
  name: "김하연",
  image: "/image/profile/kim_hy.png",
  age: 22,
  gender: "male",
  job: "일어일문학과 21학번 과대표",
  statement: "",
  description:
    " 마르고 작은 체구를 가진 서울대학교 일어일문학과 남학생. 기숙사 신관인 906동에 거주 중이다. 평소 밝은 성격으로, 다른 친구들을 잘 챙겨준다.",
};
