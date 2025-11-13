import { SuspectType, VictimType } from "@/features/suspect/types";

export const dureSuspects: SuspectType[] = [
  {
    name: "백장훈",
    image: "/image/suspect/scenario/dure/profile/baek_jh.png",
    age: 27,
    gender: "male",
    job: "추러스 부원",
    description:
      "물리천문학부 16학번 백장훈입니다. 예진이랑은 그냥 같은 동아리원 정도의 사이예요. 오늘 열심히 준비한 연극이 있어서 긴장하면서 왔는데, 이런 일이 생겼네요.",
    statement:
      "오늘은 연극 시작 15분 전에 도착했습니다. 원래는 30분 전까지 왔어야하는데, 지각을 했죠. 아마 올라오면서 선재를 마주쳤을 거에요. 도착하자마자 사람들과 같이 306호로 왔는데 이 상황이었습니다. 에휴...연극은 물 건너갔네요.",
    finalArgument:
      "제가 범인이라니. 잘못 생각하셨습니다. 물론 전 추러스에 애정이 없어요. 하루빨리 해체되길 바라고 있죠. 하지만 그렇다고 이예진을 죽일 이유는 없어요. 15분만에 죽일 시간이 있었을까요? ",
  },

  {
    name: "고제준",
    image: "/image/suspect/scenario/dure/profile/gou_jj.png",
    age: 25,
    gender: "male",
    job: "추러스 임원진",
    description:
      "저는 조경·지역시스템공학부 18학번 고제준입니다. 예진이랑은 같이 임원진 활동하면서 많이 친했어요. 이런 일이 생기다니 안타깝네요. 그렇게 나쁜 친구는 아니었는데 말이죠.",
    statement:
      "오늘 저는 연극준비하느라 바빴어요. 예진이는 만나지못했고요. 전 연극 30분 전에 도착해서 추리극 준비를 했습니다. 한 20분 전부터 예진이를 찾았는데, 아무데도 없더라고요. 10분정도 찾다가 다시 돌아왔습니다. 그리고 306호에 친구들과 같이 들어가보니 이 상태네요...참. 분명 306호는 잠겨있었는데 말이죠.",
    finalArgument:
      "내가 범인이라니. 무슨소리를 하는거야? 오늘 예진과 만난건 사실이야. 근데 그 이후에 이예진은 따로 306호에 갔다고. 그 때 죽은게 확실하다니까. 나는 절대 그런 짓 안했어.",
  },

  {
    name: "박선재",
    image: "/image/suspect/scenario/dure/profile/park_sj.png",
    age: 25,
    gender: "male",
    job: "추러스 총무",
    description:
      "조경·지역시스템공학부 18학번 박선재라고 합니다. 이예진은 제가 사랑했던 사람입니다. 평생 함께하자고 했던 친구라고요!! 예진이가 없으면 전 어떻게 살죠? 죄송하지만 더이상 말하기 힘드네요..죄송합니다.",
    statement:
      "오늘 행적이요? 연극 시작 한 15분 전에 화장실 간 것 말고는 없어요. 가면서 장훈, 오면서 가연이랑 마주쳤던거 정도? 예진이가 자꾸 안오길래 혹시나 해서 306호에 갔는데.... 이런 일이 생겼네요.",
    finalArgument:
      "제가 범인이라니요? 절대 아닙니다. 예진이를 사랑했다니까요. 제가 죽일 이유는 전혀 없습니다. 물론 신고를 여러분께 좀 늦게하긴 했지만, 그건 충격이 너무 커서 그랬던거고요. 전 정말 아니에요.",
  },
  {
    name: "송가연",
    image: "/image/suspect/scenario/dure/profile/song_gy.png",
    age: 22,
    gender: "female",
    job: "추러스 부원",
    description:
      "컴퓨터공학부 21학번 송가연입니다. 예진이랑은 그냥 아는 사람정도에요. 예진이 친구가 썩 좋은건 아니었지만 죽일 정도로 싫은건 아니었어요. 예진이를 죽여봤자 얻는게 없는데요 뭐.",
    statement:
      "오늘은 담배 피느라 주로 밖에 있었어요. 제 오랜 습관이어서요. 연극 시작 20분 전 쯤이었나. 돌아오는 김에 참가자 분들을 데리고 온 거고요. 그러고 사람들이랑 같이 306호에 갔더니 이 상황인겁니다. 불쌍한 예진…",
    finalArgument:
      "내가 죽였다고? 그럴리 있나. 난 절대 죽이지 않았어. 애초에 오늘 몇시에 온 줄도 몰랐다니까? 어디에 있는지도 모르는 사람을 어떻게 죽여. 진짜 아니야. 진짜 화나게 하네.",
  },
];

export const dureVictim: VictimType = {
  name: "이예진",
  image: "/image/suspect/scenario/dure/profile/lee_yj.png",
  age: 22,
  gender: "female",
  job: "추러스 회장",
  statement: "",
  description:
    "일어일문학과 21학번. 추러스의 회장으로, 동아리 내에서 리더십을 발휘하는 인물이다. 추리에 진심인 인물로 이번 추리극을 처음 제안했다.",
};
