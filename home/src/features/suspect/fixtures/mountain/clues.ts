import { ClueType } from "@/features/suspect/types";
import { createAdditionalQuestions } from "../utils";

export const mountainAdditionalQuestions = createAdditionalQuestions([
  {
    question: "피해자 추리수는 사건 당일 왜 청룡산에 올라갔나요?",
    answer:
      "피해자는 용의자들과 함께 청룡산 정상 근처에서 만나기로 한 약속이 있었습니다.",
  },
  {
    question: "산 입구 카페에서 가장 눈에 띄게 남은 단서는 무엇인가요?",
    answer:
      "카페에서 발견된 찢어진 영수증 메모에는 피해자와 용의자들이 같은 날 만날 계획이 있었다는 흔적이 남아 있습니다.",
  },
]);

export const mountainClues: ClueType[] = [
  {
    id: 1,
    title: "산 입구 카페",
    x: 38.5,
    y: 58,
    image: "/image/suspect/scenario/mountain/map/mountain-cafe.png",
    description:
      "청룡산 초입에 있는 작은 카페다. 등산객들이 쉬어 가는 곳으로, 사건 당일 용의자들이 들렀다는 증언이 있다.",
    type: "basic",
    place: "cafe",
  },
  {
    id: 2,
    title: "찢어진 영수증 메모",
    x: 62,
    y: 44,
    image: "/image/suspect/scenario/mountain/profile/rs_chu.png",
    description:
      "카페 쓰레기통에서 발견된 영수증 조각이다. 뒷면에 '11시 갈림길'이라고 급하게 적혀 있다. 피해자 추리수의 필체와 유사하다.",
    type: "basic",
    place: "cafe",
  },
  {
    id: 3,
    title: "등산로 갈림길",
    x: 51,
    y: 48,
    image: "/image/suspect/scenario/mountain/map/mountain-intersection.png",
    description:
      "청룡산 중턱의 갈림길이다. 사고 지점으로 이어지는 길목이라 사건 당일 누가 먼저 지나갔는지가 중요하다.",
    type: "basic",
    place: "intersection",
  },
  {
    id: 4,
    title: "긁힌 난간",
    x: 71,
    y: 35,
    image: "/image/suspect/scenario/mountain/profile/rs_cheon.png",
    description:
      "갈림길 옆 안전 난간에 최근 생긴 긁힌 자국이 남아 있다. 금속 표면 일부에 진흙이 묻어 있어 몸싸움이 있었을 가능성을 시사한다.",
    type: "basic",
    place: "intersection",
  },
];
