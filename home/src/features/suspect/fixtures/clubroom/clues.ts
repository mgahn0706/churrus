import { ClueType } from "@/features/suspect/types";
import { createAdditionalQuestions } from "../utils";

export const clubroomAdditionalQuestions = createAdditionalQuestions([]);

export const clubroomClues: ClueType[] = [
  {
    id: 1,
    title: "시체",
    x: 54,
    y: 52,
    image: "/image/suspect/scenario/clubroom/clues/subway-1.png",
    description:
      "동아리방 내부에서 발견된 시체이다. 추후 실제 단서 데이터로 교체될 예정이다.",
    type: "basic",
    place: "room",
  },
];
