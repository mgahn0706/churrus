import { SuspectType, VictimType } from "@/features/suspect/types";

export const novelistSuspects: SuspectType[] = [
  {
    name: "윤찬",
    image: "/image/suspect/scenario/novelist/profile/yoon_c.png",
    age: 28,
    gender: "male",
    job: "일상 미스터리 작가",
    description:
      "저는 이환 선생의 문하생이자 으뜸 제자. 윤찬이라고 합니다. 부끄럽네요. 저는 일상 미스터리 작가로 활동하고 있어요.",
    statement:
      "뭐, 저는 식당에 계속 있었습니다. 저녁 7시부터 계속요. 여러분이 각자 방에 들어간 후에도 인영 씨와 대화를 나눴죠. 중간에 화장실 가느라 10분 정도 자리를 좀 비운거 빼고는... 인영 씨와 계속 있었거든요. 물론 식당 입구를 계속 보고 있던 건 아니라, 도경 씨든 인영 씨든 제가 제외해줄 수는 없는데, 인영 씨가 절 부른 이후 도경 씨를 데리러 가는 사이에는 식당 입구엔 아무도 지나가지 않았어요.",
    finalArgument:
      "음, 제가 왼손잡이인 건 맞습니다. 아마 절 범인으로 몬 이유도 그 때문이겠죠? 그치만, 잘 생각해봐요. 이환 선생이 뒤를 돌아보는 순간 범인이 칼을 찔렀다면, 충분히 오른손잡이도 범인이 될 수 있다는걸요.",
  },
  {
    name: "류인영",
    image: "/image/suspect/scenario/novelist/profile/ryu_iy.png",
    age: 34,
    gender: "female",
    job: "특수설정 미스터리 작가",
    description:
      "저는 이환 선생의 제자 중 한 명, 류인영이라고 합니다. 특수 설정 미스터리를 쓰고 있어요. 아, 제 향수 냄새가 불편하신가요?",
    statement:
      "저는 식당에 계속 있었죠. 9시 30분에서 40분 정도 화장실을 간 것 빼고는 계속 있었어요. 도경 님과 재승 님이 방에 가신 후, 10시 5분 쯤 선생님 방에 갔는데 이미 죽어게셨어요. 저는 바로 현장 사진을 찍고 식당 입구에서 찬이에게 알렸죠. 그러고 바로 재승 님을 데리러 갔고 재승 님과 함께 2층으로 왔습니다.",
    finalArgument:
      "제가 왜 선생님을 죽이나요? 말이 되는 소리를 하세요. 일단, 창문이 열려있는게 향수 냄새를 없애기 위해서라고 생각하신 것 같은데, 그러면 탈취제를 쓰면 돼요. 아니, 애초에 창문을 닫고 나왔겠죠? ",
  },
  {
    name: "황도경",
    image: "/image/suspect/scenario/novelist/profile/hwang_dg.png",
    age: 31,
    gender: "female",
    job: "역사 미스터리 작가",
    description:
      "전 이환 선생의 제자인 황도경이에요. 최근 신라 시대를 배경으로 한 역사 미스터리를 썼는데 인기가 많더라고요?",
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
      "아, 안녕하세요. 저는 서재승이라고 합니다. 최근 하드보일드 문학 작품을 쓰고 있습니다.",
    statement:
      "아, 제 행적 말씀이십니까. 이환 선생께서 들어가신 후 저는 9시 20분에 제 방으로 들어갔습니다. 사람 많은 걸 별로 안 좋아해서요. 그러다 10시 11~12분 쯤 인영 씨가 저를 부르셔서 2층으로 올라갔죠. 그게 다입니다.",
    finalArgument:
      "나를 의심한다고? 그래, 탐정으로서는 좋은 자세야. 나도 물론 명확한 알리바이가 없으니까. 하지만, 나는 창문을 열어둘 이유가 없어. 범인은 창문을 열어둘 필요가 있었던 거야. 예를 들면, 냄새라든가. 내 담배 냄새? 그럼 라벤더 탈취제를 쓰면 되는 거 아닌가?",
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
