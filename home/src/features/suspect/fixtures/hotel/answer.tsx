import { createScenarioReveal } from "@/features/suspect/components/createScenarioReveal";
import { ScenarioAnswerConfig } from "@/features/suspect/types/answerPage";

const HOTEL_CULPRIT = "범인 이름";
const HOTEL_METHOD = "살해 방법을 입력하세요.";
const HOTEL_MOTIVE = "살해 동기를 입력하세요.";
const HOTEL_CULPRITS_HREF = "#";

const hotelConfess = (
  <>
    범인의 고백을 입력하세요. <br />
    이 영역의 문장만 수정하면 정답 페이지의 고백 탭에 반영됩니다.
  </>
);

const hotelSolution = (
  <>
    사건 풀이를 입력하세요. <br />
    단서, 알리바이, 동기, 범행 방법이 어떻게 연결되는지 이 영역에 작성하면 됩니다.
  </>
);

export const hotelAnswerConfig: ScenarioAnswerConfig = {
  scenarioKey: "hotel",
  missingDescription: (
    <>
      아직 호텔 살인사건의 진범이 지목되지 않았습니다. <br />
      게임을 진행해서 진범을 찾아주세요.
    </>
  ),
  reveal: createScenarioReveal({
    culprit: HOTEL_CULPRIT,
    imageSrc: "/image/suspect/scenario/hotel/hotel-reveal.png",
    methodText: HOTEL_METHOD,
    motiveText: HOTEL_MOTIVE,
    targetText: "유교수를 살해한 범인이",
  }),
  confess: hotelConfess,
  solution: hotelSolution,
  additional: [
    {
      question: "Q1. 추가 질문을 입력하세요.",
      answer: "A. 추가 질문의 정답을 입력하세요.",
    },
  ],
  culpritsHref: HOTEL_CULPRITS_HREF,
  culpritsTabLabel: "용의자 롤카드",
  culpritsButtonLabel: "용의자 롤카드 열기",
};
