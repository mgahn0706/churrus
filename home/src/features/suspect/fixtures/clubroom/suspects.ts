import { SuspectType, VictimType } from "@/features/suspect/types";

export const clubroomSuspects: SuspectType[] = [
  {
    name: "구애인",
    image: "/image/suspect/scenario/clubroom/profile/ai_gu.png",
    age: 23,
    gender: "female",
    job: "피해자의 애인",
    description:
      "안녕하세요, 국어교육과 구애인입니다. 혹시 몰라 얘기하는데, 전 안죽였어요.",
    statement:
      "저는 오늘 미니정모 끝나고 나회장을 만났다가, 그 이후에 나와서 낙성대 자취방으로 간 것 밖에 없어요. 8시 반에 만나서 한 15분 쯤…. 집에 도착하니 9시 넘은 시간이었어요. 아니, 정확히 시간을 외우고 다니는 사람이 어딨어요?",
    finalArgument:
      "제발, 탐정님들. 전 아닙니다. 제 가방의 붉은 자국 때문인가요? 아니면 제 물건 때문? 맞아요. 충분히 이상한건 인정하는데, 전 진짜 죽이지 않았어요. 지금 이별 때문에 안그래도 힘든데, 저에게 더 이러지 마세요.",
  },
  {
    name: "안총무",
    image: "/image/suspect/scenario/clubroom/profile/cm_an.png",
    age: 22,
    gender: "male",
    job: "추러스 총무",
    description:
      "안녕하세요, 안총무라고 해요. 추러스에서 총무를 맡고 있죠. 회비 쓸 일 있으면 저에게 얘기해주세요.",
    statement:
      "오늘…. 사실 뭐 없었어요. 전 내내 기숙사에서 쉬고 있었던 걸요. 룸메가 없었어서 알리바이 증명은 안되지만…. 전 죽일 수가 없어요.",
    finalArgument:
      "하, 이 바보들. 저를 범인으로 모는 게 말이 안돼요. 범인에게 농락당하신 거라구요. 자, 제가 갔을 때는 분명 이불을 푹 뒤집어 쓰고 있었어요. 제가 오기 전에 죽어있었을거란 말이죠.",
  },
  {
    name: "오지인",
    image: "/image/suspect/scenario/clubroom/profile/ji_oh.png",
    age: 24,
    gender: "female",
    job: "피해자의 친한 선배",
    description:
      "어, 저는 정치외교학부 오지인이라고 합니다. 피해자와는 선후배 관계고요. 뭐, 더 필요한 정보가 있으실까요?",
    statement:
      "저는 밤 10시 쯤 동아리방에서 나회장을 만났습니다. 그리고 몇십분 얘기하다가 나왔어요. 그리고 그냥 집에 왔어요. 끝! 뭐, 더 없는데요? 미니정모 전에 만난 것도 얘기해야하나?",
    finalArgument:
      "저기요, 정신 나가셨어요? 왜 내가 범인이라는거죠? 지금 사건 현장을 보세요. 누군가 원한을 가지고 죽인 게 틀림 없어요. 전, 원한 따윈 없다구요. 나회장을 죽여서 제가 얻는 게 뭐란 말입니까? 예?",
  },
  {
    name: "장절친",
    image: "/image/suspect/scenario/clubroom/profile/jc_jang.png",
    age: 23,
    gender: "male",
    job: "피해자의 절친",
    description:
      "네, 저는 장절친이라고 합니다. 나회장과는 친한 친구죠. 추러스 누구든 인정할거에요. 아, 이번 학기 신입 부원은 모를수도.",
    statement:
      "저는 미니정모 끝나고, 그냥 집으로 갔어요. 자취방에 있다가 오늘 동아리방에 11시 30분쯤? 왔는데 죽어있는…, 네, 회장이를 본 거죠.",
    finalArgument:
      "네, 알아요. 저랑 회장이는 절친은 커녕 원수지간인걸, 아실거라 예상했어요. 그래도 전 물리적으로 죽일 수가 없습니다. 전 낙성대 자취한단 말이에요. 학생회관까지 가려면…. 적어도 1시간은 걸어가야할걸요.",
  },
];

export const clubroomVictim: VictimType = {
  name: "나회장",
  image: "/image/suspect/scenario/clubroom/profile/hj_na.png",
  age: 23,
  gender: "male",
  job: "추러스 회장",
  description: "추후 설정될 동아리방 시나리오의 피해자.",
  statement: "",
};
