import { ClueType } from "@/features/suspect/types";
import { createAdditionalQuestions } from "../utils";

export const novelistAdditionalQuestions = createAdditionalQuestions([
  {
    question: "피해자의 진단서가 보여주는 핵심 신체 이상은 무엇인가요?",
    answer: "후각과 청각에 장애가 있었다는 점입니다.",
  },
  {
    question: "2025년 3월 2일 무통장 입금증의 송금인은 누구인가요?",
    answer: "브레이크입니다.",
  },
  {
    question:
      "사건 당시 2층 방 안의 소리가 잘 퍼지지 않았던 이유는 무엇인가요?",
    answer:
      "방에 흡음재 시공 계획이 있었고 실제로 외부에 소리가 잘 새지 않는 구조였기 때문입니다.",
  },
  {
    question: "서재승이 피해자를 죽이기로 결심한 직접적 계기는 무엇인가요?",
    answer:
      "형 서재형의 사고 뒤에 이환이 실제 사건을 소재로 삼기 위해 개입했을 수 있다고 확신했기 때문입니다.",
  },
]);

export const novelistClues: ClueType[] = [
  {
    id: 1,
    title: "시체",
    x: 72.4,
    y: 31.2,
    image: "/image/suspect/scenario/novelist/clues/novelist-1.png",
    description:
      "피해자 이환의 시신이다. 2층 작업실 바닥에 쓰러져 있으며 오른쪽 가슴 부위에 식칼이 깊게 박혀 있다.",
    type: "basic",
    place: "room",
  },
  {
    id: 2,
    title: "작업 책상과 창문",
    x: 73.6,
    y: 10.8,
    image: "/image/suspect/scenario/novelist/clues/novelist-2.png",
    description:
      "작업실 창문이 열려 있고 책상 위에는 원고, 연필, 안경이 남아 있다. 눈 오는 밤인데도 환기를 시킨 듯한 상태다.",
    type: "basic",
    place: "room",
  },
  {
    id: 3,
    title: "보청기",
    x: 8.4,
    y: 48.6,
    image: "/image/suspect/scenario/novelist/clues/novelist-3.png",
    description:
      "작업실에서 발견된 보청기 한 쌍이다. 피해자가 사건 당시 귀에 착용하고 있지 않았을 가능성을 시사한다.",
    type: "additional",
    place: 2,
  },
  {
    id: 4,
    title: "보청기 사용 시 주의사항",
    x: 8.4,
    y: 60.8,
    image: "/image/suspect/scenario/novelist/clues/novelist-4.png",
    description:
      "보청기 안내문이다. 장시간 사용과 습기, 오염에 민감하다는 설명이 적혀 있다. 평소 꾸준히 관리해야 하는 기기임을 보여준다.",
    type: "additional",
    place: 2,
  },
  {
    id: 5,
    title: "편백 향수",
    x: 18.4,
    y: 51.2,
    image: "/image/suspect/scenario/novelist/clues/novelist-5.png",
    description:
      "편백 숲 향 계열 향수다. 강한 냄새를 덮기 좋은 우디 계열 향으로 보인다.",
    type: "additional",
    place: 2,
  },
  {
    id: 6,
    title: "진단서",
    x: 90.4,
    y: 12.8,
    image: "/image/suspect/scenario/novelist/clues/novelist-6.png",
    description:
      "피해자는 후각 및 청각 장애 진단을 받았고, 후각은 거의 상실된 상태였던 것으로 보인다. 냄새와 작은 인기척에 둔했을 가능성이 높다.",
    type: "basic",
    place: "room",
  },
  {
    id: 7,
    title: "나방",
    x: 53.8,
    y: 31.8,
    image: "/image/suspect/scenario/novelist/clues/novelist-7.png",
    description:
      "한겨울 밤인데도 방 안 벽에 나방이 붙어 있다. 창문이 한동안 열려 있었음을 뒷받침한다.",
    type: "basic",
    place: "room",
  },
  {
    id: 8,
    title: "침대",
    x: 90.2,
    y: 50.4,
    image: "/image/suspect/scenario/novelist/clues/novelist-8.png",
    description:
      "2층 방의 침대다. 흐트러진 흔적이 거의 없어 사건 직전 누군가가 숨어 있던 자리로 보이지는 않는다.",
    type: "basic",
    place: "room",
  },
  {
    id: 9,
    title: "옷장",
    x: 56.2,
    y: 48.7,
    image: "/image/suspect/scenario/novelist/clues/novelist-9.png",
    description:
      "작업실 옆 옷장이다. 겉보기엔 단정하지만 안쪽을 더 살펴볼 필요가 있어 보인다.",
    type: "basic",
    place: "room",
  },
  {
    id: 10,
    title: "서재 책장",
    x: 58.9,
    y: 12.3,
    image: "/image/suspect/scenario/novelist/clues/novelist-10.png",
    description:
      "작업실 책장이다. 이환의 저서와 국내외 추리소설이 빼곡히 꽂혀 있다. 몇 권은 최근 자주 꺼낸 흔적이 있다.",
    type: "basic",
    place: "room",
  },
  {
    id: 11,
    title: "<H의 비극>",
    x: 18.2,
    y: 27.3,
    image: "/image/suspect/scenario/novelist/clues/novelist-11.png",
    description:
      "이환의 대표작으로 보이는 책이다. 피해자가 자신의 이름 이니셜을 전면에 내세운 작품 세계를 밀고 있었음을 보여준다.",
    type: "additional",
    place: 10,
  },
  {
    id: 12,
    title: "<청년을 위한 나라는 없다>",
    x: 18.2,
    y: 39.4,
    image: "/image/suspect/scenario/novelist/clues/novelist-12.png",
    description:
      "책장에 꽂힌 코맥 매카시의 소설이다. 최근 피해자가 읽은 흔적이 있어 현실 폭력과 노년의 몰락 같은 주제에 관심을 두고 있었던 것으로 보인다.",
    type: "additional",
    place: 10,
  },
  {
    id: 13,
    title: "무통장 입금증",
    x: 18.2,
    y: 61.6,
    image: "/image/suspect/scenario/novelist/clues/novelist-13.png",
    description:
      "2025년 3월 2일 발급된 무통장 입금증이다. 송금인은 '브레이크', 취급점은 이천, 수취인은 김가센, 금액은 500만 원으로 적혀 있다.",
    type: "additional",
    place: 10,
  },
  {
    id: 14,
    title: "잡지",
    x: 22.2,
    y: 26.2,
    image: "/image/suspect/scenario/novelist/clues/novelist-14.png",
    description:
      "화장실에 있던 잡지. 2024년 10월 인터뷰 기사다. 이환은 '현실에서 일어날 수 있는 사건'을 중시한다고 말하며 특수설정 미스터리에 비판적인 태도를 드러낸다.",
    type: "basic",
    place: "room",
  },
  {
    id: 15,
    title: "접시",
    x: 78.2,
    y: 68.1,
    image: "/image/suspect/scenario/novelist/clues/novelist-15.png",
    description:
      "식탁 위 접시에 바게트 한 조각만 남아 있다. 저녁 식사가 완전히 정리되기 전에 사건이 벌어졌음을 보여준다.",
    type: "basic",
    place: "lounge",
  },
  {
    id: 16,
    title: "칼꽂이",
    x: 58.6,
    y: 45.9,
    image: "/image/suspect/scenario/novelist/clues/novelist-16.png",
    description:
      "싱크대 옆 칼꽂이다. 사건 현장에 꽂혀 있던 식칼과 같은 계열의 칼이 여기서 빠져나갔을 가능성이 높다.",
    type: "basic",
    place: "lounge",
  },
  {
    id: 17,
    title: "이환 작가 하루 일과표",
    x: 23.6,
    y: 54.8,
    image: "/image/suspect/scenario/novelist/clues/novelist-17.png",
    description:
      "피해자는 오후 10시부터 11시 30분까지를 원고 집필 시간으로 정해 두고 있었다. 그 시간에는 개인 공간 출입을 자제해 달라는 문구가 적혀 있다.",
    type: "basic",
    place: "lounge",
  },
  {
    id: 18,
    title: "윤찬의 스마트폰: 카카오페이",
    x: 37.1,
    y: 80.3,
    image: "/image/suspect/scenario/novelist/clues/novelist-18.png",
    description:
      "2026년 1월 12일 오후 2시 8분, 카카오페이로 29,000원이 'Google'에 결제된 기록이다. 사건 이틀 뒤의 흔적이지만 세부 구매 항목은 바로 보이지 않는다.",
    type: "basic",
    place: "lounge",
  },
  {
    id: 19,
    title: "종이 조각",
    x: 37.4,
    y: 84.6,
    image: "/image/suspect/scenario/novelist/clues/novelist-19.png",
    description:
      "종이 쪽지에 '표절?'이라고 급하게 적혀 있다. 누군가가 원고의 출처나 유사성을 강하게 의심하고 있었던 것으로 보인다.",
    type: "basic",
    place: "lounge",
  },
  {
    id: 20,
    title: "윤찬의 스마트폰: 메모장",
    x: 38.3,
    y: 70.5,
    image: "/image/suspect/scenario/novelist/clues/novelist-20.png",
    description:
      "원고 일부다. 카페에 놓여 있던 유리컵이 사라졌다는 장면이 적혀 있다. 메타적인 트릭을 중심으로 한 내용이라 표절 의혹과 연결될 여지가 있다.",
    type: "additional",
    place: 19,
  },
  {
    id: 21,
    title: "붉은 향수병",
    x: 79.4,
    y: 15.5,
    image: "/image/suspect/scenario/novelist/clues/novelist-21.png",
    description:
      "절반 정도 사용된 붉은 향수병이다. 독한 향이 남아 있어 특정 인물의 강한 체취나 담배 냄새를 덮는 데 쓰였을 가능성을 떠올리게 한다.",
    type: "basic",
    place: "lounge",
  },
  {
    id: 22,
    title: "류인영의 스마트폰: 기념 사진",
    x: 79.3,
    y: 19.8,
    image: "/image/suspect/scenario/novelist/clues/novelist-22.png",
    description:
      "과거 신간 사인회에서 찍은 사진이다. 윤찬과 류인영이 같은 책을 들고 밝게 웃고 있다. 최소한 당시 둘은 꽤 가까운 사이였던 것으로 보인다.",
    type: "basic",
    place: "lounge",
  },
  {
    id: 23,
    title: "다이어리",
    x: 72.3,
    y: 22.2,
    image: "/image/suspect/scenario/novelist/clues/novelist-23.png",
    description:
      "2024년 12월 양평 저택 방문 당시의 메모다. '보청기와 펜을 던짐'이라는 기록이 있어, 피해자가 최근 극도로 예민해졌음을 시사한다.",
    type: "basic",
    place: "lounge",
  },
  {
    id: 24,
    title: "류인영의 스마트폰: 현장 사진",
    x: 78.3,
    y: 29.4,
    image: "/image/suspect/scenario/novelist/clues/novelist-24.png",
    description:
      "2026년 1월 10일 오후 10시 7분에 촬영된 현장 사진이다. 류인영이 방에 들어갔을 때 이미 시신이 방 한가운데에 놓여 있었음을 보여준다.",
    type: "basic",
    place: "lounge",
  },
  {
    id: 25,
    title: "황도경의 스마트폰: 기사",
    x: 52.3,
    y: 30.8,
    image: "/image/suspect/scenario/novelist/clues/novelist-25.png",
    description:
      "2025년 10월 기사다. 2023년 훈련병 황모가 전투화 끈으로 목숨을 끊은 사건 이후, 군이 지퍼형 전투화로 바꾸려 한다는 내용이 담겨 있다.",
    type: "basic",
    place: "lounge",
  },
  {
    id: 26,
    title: "재떨이",
    x: 25.8,
    y: 70.9,
    image: "/image/suspect/scenario/novelist/clues/novelist-26.png",
    description:
      "꽁초가 수북이 쌓인 재떨이다. 피해자나 용의자 중 누군가가 사건 전후로 연달아 담배를 피웠음을 짐작하게 한다.",
    type: "basic",
    place: "lounge",
  },
  {
    id: 27,
    title: "서재승의 스마트폰: 샤울보험",
    x: 17.4,
    y: 79.8,
    image: "/image/suspect/scenario/novelist/clues/novelist-27.png",
    description:
      "서재형의 재직증명서와 함께 도착한 보험사 메시지다. 사고 경위와 병원 기록 사이에 차이가 있어 추가 소명을 요구하고 있다.",
    type: "basic",
    place: "lounge",
  },
  {
    id: 28,
    title: "저택 외부",
    x: 80.4,
    y: 5.7,
    image: "/image/suspect/scenario/novelist/clues/novelist-28.png",
    description:
      "눈 내리는 밤의 저택 외부 모습이다. 2층 작업실 창문만 활짝 열려 있다.",
    type: "basic",
    place: "room",
  },
  {
    id: 29,
    title: "식당 창문",
    x: 80.8,
    y: 88.6,
    image: "/image/suspect/scenario/novelist/clues/novelist-29.png",
    description:
      "창밖에서 들여다본 식당 모습이다. 한 시점에는 네 명의 제자가 모두 아래층에 함께 있었음을 보여준다. 범행 시각 특정에 도움이 된다.",
    type: "basic",
    place: "lounge",
  },
  {
    id: 30,
    title: "흡음재 시공 계획",
    x: 13.3,
    y: 58.7,
    image: "/image/suspect/scenario/novelist/clues/novelist-30.png",
    description:
      "작업실 흡음재 시공 계획서다. 이환이 집필실을 외부 소음과 차단된 공간으로 만들려 했음을 보여준다. 방 안의 소리가 밖으로 잘 새지 않았을 가능성이 높다.",
    type: "additional",
    place: 9,
  },
];
