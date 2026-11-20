export const psychicIdentityAnswers = [
  { subject: "실험체 A", realName: "권정오", ability: "5cm 공중부양" },
  { subject: "실험체 B", realName: "묵지바", ability: "가위바위보 무조건 이기기" },
  { subject: "실험체 C", realName: "김액체", ability: "마지막으로 마신 액체로 주변 액체 변경 가능" },
] as const;

export const psychicAdditionalQuestions = psychicIdentityAnswers.flatMap(({ subject, realName, ability }) => [
  { question: `${subject}의 초능력은?`, answer: ability },
  { question: `${subject}의 본명은?`, answer: realName },
]);
