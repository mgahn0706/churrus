import { createScenarioReveal } from "@/features/suspect/components/createScenarioReveal";
import { clubroomAdditionalQuestions } from "@/features/suspect/fixtures/clubroom/clues";
import { ScenarioAnswerConfig } from "@/features/suspect/types/answerPage";

export const clubroomAnswerConfig: ScenarioAnswerConfig = {
  scenarioKey: "clubroom",
  missingDescription: (
    <>
      아직 동아리방 살인사건의 정답이 확정되지 않았습니다. <br />
      suspects, victim, 단서, 해설을 이후에 채워 넣어주세요.
    </>
  ),
  reveal: createScenarioReveal({
    culprit: "용의자 A",
    imageSrc: "/image/suspect/scenario/clubroom/clubroom-main.png",
    methodText: "아직 범행 수법이 작성되지 않았습니다.",
    motiveText: "아직 범행 동기가 작성되지 않았습니다.",
    targetText: "피해자를 살해한 범인이",
  }),
  confess: <>아직 범인의 자백이 작성되지 않았습니다.</>,
  additional: () =>
    clubroomAdditionalQuestions.map((question) => ({
      question: `Q${question.no}. ${question.question}`,
      answer: `A. ${question.answer}`,
    })),
  solution: <>아직 동아리방 시나리오의 해설이 작성되지 않았습니다.</>,
  culpritsHref: "https://example.com",
};
