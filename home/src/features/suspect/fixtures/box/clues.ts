import { ClueType } from "@/features/suspect/types";
import { createAdditionalQuestions } from "../utils";

export const boxAdditionalQuestions = createAdditionalQuestions([]);

export const boxClues: ClueType[] = [
  {
    id: 1,
    image: "/image/suspect/scenario/box/clues/box-1.png",
    title: "뒤주 속 시신",
    x: 49.5,
    y: 46,
    description:
      "폐궁 한가운데 놓인 뒤주 안에서 추도세자의 시신이 발견되었다.",
    type: "basic",
    place: "abandoned-palace",
  },
];
