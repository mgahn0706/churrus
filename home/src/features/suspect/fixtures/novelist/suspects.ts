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
      "뭐, 저는 식당에 계속 있었습니다. 저녁 7시부터 계속요. 여러분이 각자 방에 들어간 후에도 인영 씨와 대화를 나눴죠. 중간에 화장실 가느라 10분 정도 자리를 좀 비운거 빼고는...",
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
      "이환 선생의 제자 중 한 명. 특수 설정 미스터리 작가로 인기를 얻고 있다. 진한 향수 냄새가 난다.",
    statement:
      "저는 식당에 계속 있었죠. 9시 30분에서 40분 정도 화장실을 간 것 빼고는 계속 있었어요. 도경 님과 재승 님이 방에 가신 후, 10시 5분 쯤 선생님 방에 갔는데 이미 죽어게셨어요. 저는 바로 현장 사진을 찍고 찬이에게 알렸죠.",
    finalArgument:
      "제가 왜 선생님을 죽이나요? 말이 되는 소리를 하세요. 일단, 창문이 열려있는게 향수 냄새를 없애기 위해서라고 생각하신 것 같은데, 그러면 편백나무 향수를 쓰면 돼요. 아니, 애초에 창문을 닫고 나왔겠죠? ",
  },
  {
    name: "황도경",
    image: "/image/suspect/scenario/novelist/profile/hwang_dg.png",
    age: 31,
    gender: "female",
    job: "역사 미스터리 작가",
    description:
      "이환 선생의 제자 4인 중 한 명으로 최근 신라 시대를 배경으로 한 역사 미스터리로 인기를 끌고 있다.",
    statement:
      "저는 다같이 식당에서 저녁을 먹다 9시 30분 쯤 제 방으로 들어갔어요. 그러고 10시 10분? 쯤 찬 님이 저를 부르셔서 2층에 갔죠. 그게 다에요. 뭐 더 얘기할 게 있으려나~?",
    finalArgument:
      "흠, 저를 의심하시는 건가요? 좋은 추리에요. 하지만, 제 방에서 2층으로 가려면 무조건 식당 앞을 지나야해요. 아마 식당에는 찬 님과 인영 님이 계셨겠죠? 제가 범인이라면 그런 대범한 짓을 할까요?",
  },
  {
    name: "서재승",
    image: "/image/suspect/scenario/novelist/profile/seo_js.png",
    age: 30,
    gender: "male",
    job: "하드보일드 소설 작가",
    description:
      "후줄근한 패션의 호리호리한 남성. 최근 하드보일드 문학의 기대주로 떠오르고 있다고 한다.",
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
