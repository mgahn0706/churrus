import { ScenarioAnswerConfig } from "@/features/suspect/types/answerPage";

export const bluemoonAnswerConfig: ScenarioAnswerConfig = {
  scenarioKey: "bluemoon",
  missingDescription: (
    <>
      아직 푸른 달 살인사건의 최종 제출이 진행되지 않았습니다. <br />
      게임을 진행한 뒤 답안을 제출해주세요.
    </>
  ),
  reveal: (submittedAnswer) => ({
    accusedText: submittedAnswer.accusedSuspect || "답변 없음",
    culpritText: "정답 정리 중",
    imageSrc: "/image/suspect/scenario/bluemoon/bluemoon-reveal.png",
    methodText: "최종 정답 정리 중",
    motiveText: "최종 정답 정리 중",
    myMethodText: submittedAnswer.howDunnit,
    myMotiveText: submittedAnswer.whyDunnit,
    resultText: "정답 공개 준비 중입니다.",
    resultSubtext: "현재는 TEXT 플레이 구조와 제출 흐름만 연결되어 있습니다.",
    showYouText: false,
    targetText: "김관우 사건의 진상은",
  }),
  confess: (
    <>
      푸른 달 살인사건의 범인 고백문은 아직 정식으로 정리되지 않았습니다. <br />
      현재 페이지는 TEXT 시나리오 구조에 맞춰 제출 및 정답 페이지 흐름을 먼저
      연결한 상태입니다.
    </>
  ),
  additional: [
    {
      question: "Q1. 시신의 입 주변에 남아 있던 특징은 무엇인가요?",
      answer: "A. 옅은 거품 자국이 남아 있었습니다.",
    },
    {
      question: "Q2. 깨진 술병에서는 어떤 냄새가 확인되나요?",
      answer: "A. 진한 약재 냄새가 남아 있었습니다.",
    },
    {
      question: "Q3. 세금 장부에는 어떤 이상한 정황이 보이나요?",
      answer: "A. 김관우가 개인적으로 거둔 추가 금액이 기록되어 있습니다.",
    },
    {
      question: "Q4. 밀서는 무엇을 암시하나요?",
      answer: "A. 청나라 사신과의 거래와 약재 반출 대가를 암시합니다.",
    },
  ],
  solution: (
    <>
      현재 `bluemoon`은 `CLUE` 구조에서 `TEXT` 구조로 전환되었습니다. <br />
      따라서 프롤로그, 키워드 검색형 단서 조회, 최종 제출, 정답 페이지 진입
      흐름은 모두 `school`과 `dure`와 같은 방식으로 동작합니다. <br />
      다만 최종 범인, 살해 방법, 살해 동기에 대한 정식 해설 문안은 아직 이
      저장소에 준비되어 있지 않아 placeholder 텍스트로 연결되어 있습니다.
    </>
  ),
  culpritsHref: "/suspect/scenario/bluemoon",
  culpritsButtonLabel: "시나리오 페이지 열기",
};
