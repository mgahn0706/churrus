import { createScenarioReveal } from "@/features/suspect/components/createScenarioReveal";
import { clubroomAdditionalQuestions } from "@/features/suspect/fixtures/clubroom/clues";
import { ScenarioAnswerConfig } from "@/features/suspect/types/answerPage";

export const clubroomAnswerConfig: ScenarioAnswerConfig = {
  scenarioKey: "clubroom",
  missingDescription: (
    <>
      아직 동아리방 살인사건의 진범이 지목되지 않았습니다. <br />
      게임을 진행해서 진범을 찾아주세요.
    </>
  ),
  reveal: createScenarioReveal({
    culprit: "오지인",
    imageSrc: "/image/suspect/scenario/clubroom/clubroom-reveal.png",
    methodText:
      "주변에 있던 병으로 피해자의 머리를 가격해 기절시킨 뒤, 충전기로 목을 졸라 살해했다.",
    motiveText:
      "피해자가 오지인의 중간고사 조작 사실을 알고 이를 약점으로 잡고 있었고, 사건 당일 그 사실을 공개해 오지인의 졸업을 늦추겠다고 협박했기 때문이다.",
    targetText: "나회장을 살해한 범인이",
  }),
  confess: (
    <>
      맞아요. 제가 나회장을 죽였어요. 처음부터 죽일 생각까지 있었던 건 아니에요.
      하지만 그 애가 제 중간고사 조작 사실을 알고 나서 계속 그걸 들먹였어요.
      오늘은 아예 그 사실을 다른 사람들에게 밝히고 제 졸업까지 늦춰버리겠다고
      협박했죠. <br />
      순간 너무 두렵고 화가 나서, 주변에 있던 병으로 머리를 먼저 내리쳤어요.
      그대로 기절한 걸 보고 멈췄어야 했는데, 저는 충전기를 집어 들어 목을
      졸랐어요. 그때는 그 애가 살아 있으면 제 인생이 끝난다고만 생각했어요.
    </>
  ),
  additional: () =>
    clubroomAdditionalQuestions.map((question) => ({
      question: `Q${question.no}. ${question.question}`,
      answer: `A. ${question.answer}`,
    })),
  solution: (
    <>
      이 사건의 핵심은 피해자가 먼저 기절한 뒤 교살되었다는 점입니다. 머리를
      가격할 수 있는 둔기와 목을 조를 수 있는 끈 형태의 물건이 모두 현장에
      있었고, 그중 충전기는 우발적으로도 바로 범행 도구로 전환될 수 있는
      물건입니다. <br />
      또한 범인의 동기는 단순한 말다툼이 아니라, 학업과 졸업이 걸린 약점
      때문이었습니다. 피해자는 오지인의 중간고사 조작 사실을 알고 있었고, 사건
      당일 그 사실을 폭로해 졸업을 늦추겠다고 협박했습니다. 이는 즉각적인 분노와
      공포를 불러일으킬 만한 강한 동기입니다. <br />
      따라서 피해자의 약점을 가장 크게 의식했고, 그 약점이 공개될 경우 직접적인
      타격을 입는 인물은 오지인뿐입니다. 오지인은 현장에 있던 병으로 피해자의
      머리를 가격해 기절시킨 뒤, 충전기로 목을 졸라 살해했습니다.
    </>
  ),
  culpritsHref: "https://example.com",
};
