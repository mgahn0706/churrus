import { createScenarioReveal } from "@/features/suspect/components/createScenarioReveal";
import { subwayAdditionalQuestions } from "@/features/suspect/fixtures/subway/clues";
import { ScenarioAnswerConfig } from "@/features/suspect/types/answerPage";

export const subwayAnswerConfig: ScenarioAnswerConfig = {
  scenarioKey: "subway",
  missingDescription: (
    <>
      아직 지하철 살인사건의 진범이 지목되지 않았습니다. <br />
      게임을 진행해서 진범을 찾아주세요.
    </>
  ),
  reveal: createScenarioReveal({
    culprit: "홍셰프",
    imageSrc: "/image/suspect/scenario/subway/subway-reveal.png",
    methodText:
      "복어에서 추출한 테트로도톡신을 커피에 넣은 후 피해자에게 건네서 살해했다.",
    motiveText:
      "2년 전 있었던 업무상 과실치사를 덮어준 대가로 피해자의 협박이 점점 심해졌기 때문이다.",
    targetText: "정보건을 살해한 범인이",
  }),
  confess: (
    <>
      맞아요. 제가 한지우 기자를 승강장 끝으로 불러냈어요. 처음에는 겁만 주고
      돌려보낼 생각이었어요. 그런데 그 사람이 이미 너무 많은 걸 알고 있었어요.
      CCTV가 왜 비어 있었는지, 점검 기록이 왜 맞지 않는지, 누가 야간 반입을
      눈감아줬는지까지요. <br />
      저는 잠깐의 침묵만 만들면 된다고 생각했습니다. 하지만 실랑이가 커졌고,
      결국 제가 먼저 손을 댔어요. 그 순간부터 모든 게 끝났죠.
    </>
  ),
  additional: () =>
    subwayAdditionalQuestions.map((question) => ({
      question: `Q${question.no}. ${question.question}`,
      answer: `A. ${question.answer}`,
    })),
  solution: (
    <>
      이 더미 시나리오에서는 핵심 단서가 세 가지입니다. 첫째, CCTV 공백 시간대가
      우연이 아니라는 점입니다. 둘째, 역무일지와 실제 동선 기록이 서로 맞지
      않습니다. 셋째, 피해자 휴대폰 메모에는 역사 내부 사정을 아는 사람만 할 수
      있는 표현이 남아 있습니다. <br />
      장태수는 청소 구역 기록이 어색하지만, 직접적으로 CCTV 공백을 만들 권한은
      없습니다. 민도윤 역시 보고서 시간이 수상하지만 운전실 중심 동선이라 현장
      조작의 핵심 주체로 보기는 어렵습니다. 반면 서하린은 역무원으로서 CCTV 점검
      기록, 유실물 처리, 역사 내부 동선을 모두 다룰 수 있습니다. <br />
      따라서 이 더미 데이터 기준에서 가장 자연스럽게 사건을 구성할 수 있는
      범인은 서하린입니다.
    </>
  ),
  culpritsHref:
    "https://drive.google.com/file/d/14pplWE_2NXsdxXvI24b-uQhNv_M-iEpj/view?usp=sharing",
};
