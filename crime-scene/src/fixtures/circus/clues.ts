import type { ClueType } from "@/types";
import { createAdditionalQuestions } from "../utils";

export const circusAdditionalQuestions = createAdditionalQuestions([]);

const clueImage = "/image/scenario/circus/clues";
type ClueIcon = "scene" | "document" | "camera";
type BasicDraft = Pick<ClueType, "id" | "title" | "description"> & {
  location?: string;
  icon?: ClueIcon;
};

const placeClues = (
  drafts: BasicDraft[],
  place: "ring" | "backstage",
): ClueType[] =>
  drafts.map(({ icon = "scene", ...draft }, index) => ({
    ...draft,
    image: clueImage + "/" + icon + ".svg",
    x: 4 + (index % 4) * 23,
    y: 10 + Math.floor(index / 4) * 13,
    place,
    type: "basic",
  }));

const nestedClue = (
  parentId: number,
  index: number,
  title: string,
  location: string,
  description: string,
  icon: ClueIcon = "document",
): ClueType => ({
  id: parentId * 100 + index,
  title,
  location,
  description,
  image: clueImage + "/" + icon + ".svg",
  x: 4 + (index - 1) * 18,
  y: 12,
  place: parentId,
  type: "additional",
});

const ringClues: BasicDraft[] = [
  {
    id: 1,
    title: "시체 상태",
    location: "무대",
    description:
      "어깨에 바늘 구멍이 있고, 그 주변으로 푸른 멍이 들어 있다. 입에는 재갈이 물려 있고, 몸은 밧줄로 묶여 있다.",
  },
  {
    id: 2,
    title: "무대 상태",
    location: "무대",
    description: "십자가에 시체가 못 박혀 있다. 불에 반쯤 탄 상태다.",
  },
  {
    id: 3,
    title: "보관함",
    location: "무대 아래",
    description: "인간 한 마리가 들어가기에 적합한 크기의 보관함이다.",
  },
  {
    id: 4,
    title: "밧줄",
    location: "무대 아래",
    description:
      "묶을 때 사용하는 밧줄이다. 시체를 묶은 밧줄과 동일한 것으로 보인다. 주로 인간들이 공연할 때 사용한다.",
  },
  {
    id: 5,
    title: "인간",
    location: "무대 아래",
    description: "바닥에 누워 있다. 건드려도 아무 반응이 없다.",
  },
  {
    id: 6,
    title: "비밀공간",
    location: "무대 위",
    description:
      "무대 위에 비밀스럽게 숨겨져 있다. 걸어서 갈 수 있는 길은 없다. 덩그러니 있는 금고는 자물쇠가 망가져 있다.",
  },
  {
    id: 7,
    title: "우리",
    location: "인간 컨테이너",
    description: "자물쇠가 뜯어져 있다.",
  },
  {
    id: 8,
    title: "인간 컨테이너 벽",
    location: "인간 컨테이너",
    description: "벽에 바늘이 하나 꽂혀 있다.",
  },
  {
    id: 22,
    title: "작은 굴",
    location: "외부",
    description: "작은 수인 한 명이 지나갈 수 있는 통로다.",
  },
  {
    id: 23,
    title: "관람객 명부",
    location: "경비실",
    description:
      "오늘의 관람객 명단이다. VIP의 이름 옆에 ‘절대 심기를 거스르지 말 것!!!’이라고 적혀 있다. 토끼의 이름은 없다.",
    icon: "document",
  },
  {
    id: 24,
    title: "마취총",
    location: "경비실",
    description: "사용된 흔적이 없다.",
  },
  {
    id: 25,
    title: "CCTV",
    location: "경비실",
    description: "천막 입구와 주차장 쪽을 비추는 CCTV가 있다.",
    icon: "camera",
  },
  {
    id: 26,
    title: "가방",
    location: "경비실",
    description:
      "관객에게서 압수한 가방이다. 당근 모양이 그려져 있고, 겉면에 진흙이 잔뜩 묻어 있다.",
  },
  {
    id: 29,
    title: "마취총",
    location: "VIP실",
    description: "이미 사용한 흔적이 있다. 매우 고급스럽다.",
  },
  {
    id: 30,
    title: "VIP 라운지 구조",
    location: "VIP실",
    description:
      "거대한 창을 통해 무대에서도 VIP실이 충분히 보일 것 같다. 천장은 뚫려 있다. 무대 쪽 유리 너머로 대들보가 보인다.",
  },
  {
    id: 33,
    title: "무대 구조도",
    description: "무대 구조도다.",
    icon: "document",
  },
];

const backstageClues: BasicDraft[] = [
  {
    id: 9,
    title: "마취총",
    location: "사육사 공간",
    description: "이미 사용한 흔적이 있다.",
  },
  {
    id: 10,
    title: "일기",
    location: "사육사 공간",
    description:
      "단장에 대한 찬양이 적혀 있고, 서커스 동료 몇 명이 소리소문없이 사라진 것에 대한 의심도 기록돼 있다.",
    icon: "document",
  },
  {
    id: 11,
    title: "훈련 기록",
    location: "훈련실",
    description:
      "사육사가 참고하는 훈련 기록이다. 보관함에 담긴 인간을 십자가에 박는 행위는 20:30에 시작한다.",
    icon: "document",
  },
  {
    id: 12,
    title: "몽둥이",
    location: "훈련실",
    description: "오래되어 굳은 검은 핏자국이 가득하다.",
  },
  {
    id: 13,
    title: "쓰러진 커피잔",
    location: "단장실",
    description: "커피잔이 바닥에 쓰러져 내용물이 흘러 있다.",
  },
  {
    id: 14,
    title: "신문 기사",
    location: "단장실",
    description:
      "서커스 수인 연쇄 사고 사건에 대한 기사다. 사건의 위험성을 경고하고 있다.",
    icon: "document",
  },
  {
    id: 15,
    title: "서랍",
    location: "단장실",
    description: "서랍에 열쇠가 꽂혀 있다. 열쇠는 항상 단장이 들고 다닌다.",
  },
  {
    id: 16,
    title: "신문 기사",
    location: "휴게실",
    description:
      "이상식욕 증상의 중독성과 충동성을 다룬 기사다. 일부 수인은 다른 수인을 먹으며, 이런 수인의 눈은 식욕 때문에 짐승의 눈이 된다고 한다. 식욕을 해소하지 못하면 충동성이 점점 심해지고, 30분이 지나면 억제할 수 없게 된다. 특히 원래 먹이사슬에서 피식자인 상대를 보면 증상이 극대화되어, 자신보다 약한 동물을 먹는 사건이 종종 발생한다.",
    icon: "document",
  },
  {
    id: 17,
    title: "직원의 증언 1",
    location: "복도",
    description: "“복도에서 의문의 USB를 주웠어요. 연구소장님의 것 같아요.”",
    icon: "document",
  },
  {
    id: 18,
    title: "직원의 증언 2",
    location: "복도",
    description: "“19:40에 단장님이 누군가와 대화하는 소리를 들었어요.”",
    icon: "document",
  },
  {
    id: 19,
    title: "직원의 증언 3",
    location: "복도",
    description:
      "“VIP님이 오시는 날에는 항상 어떤 공연이 예정되어 있는지 일정표를 보내드립니다.”",
    icon: "document",
  },
  {
    id: 20,
    title: "직원의 증언 4",
    location: "복도",
    description:
      "“인간들은 멍청해서 공연하기 20분 전에는 대기실에 세팅해 놔야 공연을 제대로 하더라고요.”",
    icon: "document",
  },
  {
    id: 21,
    title: "서커스 스케줄표",
    location: "복도",
    description:
      "서커스 일정표다. 19:00부터 19:30까지 사육사 쇼가 있고, 마지막 이벤트로 인간 처형식이 예정되어 있다.",
    icon: "document",
  },
  {
    id: 27,
    title: "비밀 계약서",
    location: "트럭",
    description:
      "연구소장이 폐기 인간을 제공하고, 대신 수인 시체를 제공받는 계약서다.",
    icon: "document",
  },
  {
    id: 28,
    title: "냉동창고",
    location: "트럭",
    description:
      "피투성이가 되어 형체를 알아볼 수 없는 뼈와 살덩이들이 돌아다닌다. 이빨 자국이 나 있다.",
  },
  {
    id: 31,
    title: "보디가드의 증언 1",
    location: "VIP실 앞",
    description:
      "“보스 취향은 우리 마피아 조직 내에서도 조금 괴팍한 편이죠. 잔인하다기보다 고통을 받는 모습에서 예술성과 쾌락을 느낀달까요?”",
    icon: "document",
  },
  {
    id: 32,
    title: "보디가드의 증언 2",
    location: "VIP실 앞",
    description:
      "“보스는 요즘 공연을 지루해하는 것 같아요. 옛날에 인간 서커스를 기획하실 때는 의욕이 가득해서 준비 과정도 직접 확인하셨는데 말이죠.”",
    icon: "document",
  },
];

const additionalClues: ClueType[] = [
  nestedClue(
    6,
    1,
    "항공권",
    "무대 위 비밀공간",
    "출국일은 내일이다. 약간 찢어져 있는 것 같다.",
  ),
  nestedClue(
    6,
    2,
    "보석",
    "무대 위 비밀공간",
    "이런 서커스단에 있기에는 값비싸 보이는 보석이다.",
    "scene",
  ),
  nestedClue(
    15,
    1,
    "메모장",
    "단장실 서랍",
    "수인의 종류를 적은 목록이다. 맨 마지막 줄을 제외하고 모두 빨간 줄이 그어져 있다. 마지막 줄에는 ‘사자?’라고 적혀 있다.",
  ),
  nestedClue(
    15,
    2,
    "계약서",
    "단장실 서랍",
    "마피아가 서커스 자금을 제공하는 대신, 마피아가 원하는 코너를 추가해야 한다는 계약서다.",
  ),
  nestedClue(
    17,
    1,
    "USB",
    "복도",
    "폐기 인간에 대한 정보가 담긴 연구 자료다. 폐기 인간은 지능과 정상적인 인지 능력이 거의 없으며, 정해진 도구처럼 훈련받은 명령만 수행한다.",
  ),
  nestedClue(
    17,
    2,
    "생체 실험 연구 기록",
    "복도",
    "(~~~)을 위해 인간을 모르모트로 사용한 기록이다. 실험에 실패하면 폐기 인간이 된다.",
  ),
  nestedClue(
    25,
    1,
    "주차장 CCTV",
    "경비실",
    "19:00에 트럭 한 대가 들어온 기록이 있다. 19:30부터 20:00까지는 CCTV가 꺼져 있다.",
    "camera",
  ),
  nestedClue(
    25,
    2,
    "천막 입구 CCTV",
    "경비실",
    "19:00에 토끼가 천막 입구로 들어오는 모습이 찍혀 있다.",
    "camera",
  ),
  nestedClue(
    26,
    1,
    "돈",
    "경비실의 가방",
    "단순 관람객이 들고 있기에는 너무 많은 돈이다.",
    "scene",
  ),
  nestedClue(
    26,
    2,
    "사진",
    "경비실의 가방",
    "유기인간 보호소에서 우수 표창장을 받은 사진이다.",
    "scene",
  ),
  nestedClue(
    26,
    3,
    "테이저건",
    "경비실의 가방",
    "호신용 테이저건이다.",
    "scene",
  ),
  nestedClue(
    26,
    4,
    "서커스 홍보지",
    "경비실의 가방",
    "‘새로운 조명 연출이 공개됩니다’라고 적힌 서커스 홍보지다.",
  ),
  nestedClue(
    26,
    5,
    "펜치",
    "경비실의 가방",
    "공구함에 들어 있어야 할 것 같은 펜치다.",
    "scene",
  ),
];

const orderedClues: ClueType[] = [
  ...placeClues(ringClues, "ring"),
  ...placeClues(backstageClues, "backstage"),
  ...additionalClues,
].sort(
  (first, second) =>
    (first.type === "additional" ? first.id / 100 : first.id) -
    (second.type === "additional" ? second.id / 100 : second.id),
);

const clueNumberByDraftId = new Map(
  orderedClues.map((clue, index) => [clue.id, index + 1]),
);

export const circusClues: ClueType[] = orderedClues.map((clue, index) => ({
  ...clue,
  id: index + 1,
  place:
    typeof clue.place === "number"
      ? clueNumberByDraftId.get(clue.place)!
      : clue.place,
}));
