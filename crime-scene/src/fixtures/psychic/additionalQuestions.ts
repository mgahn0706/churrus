// 임시 원고: 정식 인물 설정이 정해지면 본명과 정답을 여기서 교체합니다.
export const psychicIdentityAnswers = [
  { subject: "실험체 A", realName: "강하준", ability: "독심술" },
  { subject: "실험체 B", realName: "윤서아", ability: "염동력" },
  { subject: "실험체 C", realName: "한지우", ability: "예지력" },
] as const;

export const psychicAdditionalQuestions = psychicIdentityAnswers.flatMap(({ subject, realName, ability }) => [
  { question: `${subject}의 초능력은?`, answer: ability },
  { question: `${subject}의 본명은?`, answer: realName },
]);
