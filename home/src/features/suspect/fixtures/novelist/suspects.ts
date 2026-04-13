import { SuspectType, VictimType } from "@/features/suspect/types";

export const novelistSuspects: SuspectType[] = [
  {
    name: "윤찬",
    image: "/image/suspect/scenario/novelist/profile/yoon_c.png",
    age: 28,
    gender: "male",
    job: "일상 미스터리 작가",
    description:
      "이환 선생의 문하생이자 으뜸 제자. 일상 미스터리 작가로 활동 중이며, 우수한 작품성을 지닌 소설을 많이 출간했다.",
    statement:
      "뭐, 저는 식당에 계속 있었습니다. 저녁 7시부터 계속요. 여러분이 각자 방에 들어간 후에도 인영 씨와 대화를 나눴죠. 중간에 화장실 가느라 자리를 좀 비운거 빼고는...",
    finalArgument:
      "음, 제가 왼손잡이인 건 맞습니다. 아마 절 범인으로 몬 이유도 그 때문이겠죠?",
  },
  {
    name: "류인영",
    image: "/image/suspect/scenario/novelist/profile/ryu_iy.png",
    age: 34,
    gender: "female",
    job: "특수설정 미스터리 작가",
    description:
      "한서린의 소설 강연을 계기로 가까워진 문하생. 최근 표절 의혹을 둘러싸고 스승과 크게 다퉜다는 소문이 돌았다.",
    statement:
      "그날 저는 원고 피드백을 받으러 갔어요. 그런데 분위기가 너무 안 좋아서 금방 나왔죠. 표절이니 뭐니 하는 얘기는 억울합니다. 전 제 소설을 직접 썼어요.",
    finalArgument:
      "제가 왜 선생님을 죽이겠어요. 저는 아직도 그분한테 인정받고 싶었습니다. 오히려 저를 밀어내려는 사람이 따로 있었잖아요.",
  },
  {
    name: "황도경",
    image: "/image/suspect/scenario/novelist/profile/hwang_dg.png",
    age: 31,
    gender: "female",
    job: "역사 미스터리 작가",
    description:
      "한서린과 데뷔 시기가 비슷한 라이벌 작가. 신작 발표를 앞두고 있었으며, 최근 한서린이 그의 오래된 아이디어를 비판했다는 말이 있다.",
    statement:
      "저는 초대받아서 잠깐 들른 겁니다. 예전 얘기를 좀 했고, 기분 좋게 끝나진 않았어요. 그래도 전 8시 반 전에 나왔습니다. 괜히 라이벌이라는 이유로 절 의심하는 거겠죠.",
    finalArgument:
      "경쟁은 했어도 살인은 아닙니다. 제 원고로 충분히 승부할 수 있었는데, 굳이 그런 짓을 할 이유가 없어요.",
  },
  {
    name: "서재승",
    image: "/image/suspect/scenario/novelist/profile/seo_js.png",
    age: 30,
    gender: "male",
    job: "하드보일드 소설 작가",
    description:
      "한서린과 친분이 있는 동료 작가. 최근 한서린이 자신의 작품을 비판했다는 이야기가 있다.",
    statement:
      "저는 한서린 작가님과 친한 사이였습니다. 그날도 원고 피드백을 받으러 갔는데, 분위기가 안 좋아서 금방 나왔어요. 저는 그분을 존경했기 때문에 그런 행동을 할 이유가 없다고 생각합니다.",
    finalArgument:
      "저는 한서린 작가님과 친한 사이였습니다. 그날도 원고 피드백을 받으러 갔는데, 분위기가 안 좋아서 금방 나왔어요. 저는 그분을 존경했기 때문에 그런 행동을 할 이유가 없다고 생각합니다.",
  },
];

export const novelistVictim: VictimType = {
  name: "이환",
  image: "/image/suspect/scenario/novelist/profile/lee_h.png",
  age: 67,
  gender: "male",
  job: "추리소설계의 거장",
  statement: "",
  description:
    "추리 소설로 매우 유명한 작가. 과거에는 인자하고 제자를 아끼던 스승이었지만 최근 자존심이 강하고 성격이 좋지 않다는 소문이 있다.",
};
