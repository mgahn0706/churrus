import { AdditionalQuestionType, ClueType } from "@/types";

export const jahayeonAdditionalQuestions: AdditionalQuestionType[] = [
  {
    no: 1,
    question: "김성균은 피해자를 평소에 어떻게 생각하고 있었나요?",
  },
  {
    no: 2,
    question: "살해 당시 피해자 맞은 편에 앉아있던 사람은 누구인가요?",
  },
  {
    no: 3,
    question: "박지혁의 연인은 누구인가요?",
  },
  {
    no: 4,
    question: " 강지혜가 추러스에 입사하게 된 계기는 무엇인가요?",
  },
];

export const jahayeonClues: ClueType[] = [
  {
    id: 1,
    title: "시체",
    x: 35.532,
    y: 35.149,
    image: "/image/clue/jahayeon-1.png",
    description:
      "피해자 김규민의 시체이다. 물에 빠진 채 눈을 감고 죽어있다. 시체 주변은 얼어있어 시체가 움직이지는 않는다.",
    type: "basic",
    place: "pond",
    reliability: "high",
  },
];
