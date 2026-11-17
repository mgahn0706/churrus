import type { InterrogationEvidence, InterrogationScript } from "@/types";

// 신문 탭에서 제시한 단서 조합에 대한 질문과 답변을 이 파일에서 관리합니다.
// 단서 ID는 `획득한 페이즈 ID::단서 ID` 형식입니다.
export type PsychicInterrogationAnswer = {
  suspectName: string;
  evidenceId?: string;
  evidenceIds?: string[];
  prompt?: string;
  answer: InterrogationScript;
  revealedEvidence?: InterrogationEvidence;
};

export const defaultInterrogationPrompt = "이 단서에 대해 아는 것이 있나요?";

export const psychicInterrogationAnswers: Record<string, PsychicInterrogationAnswer[]> = {
  "phase-1": [
    { suspectName: "김짜장", evidenceId: "phase-1::pill-log", answer: ["오늘은 모두 같은 시간에 알약을 먹었습니다.", "상태는 제가 계속 확인할 겁니다."] },
    {
      suspectName: "김짜장",
      evidenceIds: ["phase-1::pill-log", "phase-1::vitals"],
      prompt: "복용 기록과 관찰 기록을 함께 보면, 이후 검사는 어디 있죠?",
      answer: ["첫 수치는 정상이라 별도 표시를 하지 않았습니다.", "그 뒤 기록은 관찰 장비를 다시 확인해야겠군요."],
      revealedEvidence: {
        id: "observation-gap",
        title: "관찰 기록의 공백",
        description: "소장은 첫 측정 이후의 기록을 아직 확인하지 않았다고 인정했다.",
      },
    },
    { suspectName: "실험체 A", evidenceId: "phase-1::schedule", answer: "오전 검사가 끝나면 계약 이야기를 다시 하기로 했어요." },
  ],
  "phase-2": [
    { suspectName: "김짜장", evidenceId: "phase-2::forecast", answer: "실험 원본은 저녁에 직접 확인하겠습니다. 공개 결과와 같아야겠지요." },
    { suspectName: "실험체 C", evidenceId: "phase-2::forecast", answer: ["성공한 결과만 공개한 건 맞아요.", "자세한 건 나중에 설명할게요."] },
    { suspectName: "실험체 B", evidenceId: "phase-2::notice", answer: "시연 준비 때문에 정신이 없어요. 보상 이야기는 아직 못 했습니다." },
  ],
  "phase-3": [
    { suspectName: "김짜장", evidenceId: "phase-3::forecast-original", answer: "이 원본은 공개 자료와 다릅니다. 자정 전에 C와 이야기하겠습니다." },
    { suspectName: "실험체 A", evidenceId: "phase-3::footage", answer: "행사가 끝날 때까지 카메라 앞에 있을 겁니다." },
    { suspectName: "실험체 C", evidenceId: "phase-3::forecast-original", answer: "원본을 어디서 찾았죠? 소장님이 보셨나요?" },
  ],
  "phase-4": [
    { suspectName: "실험체 C", evidenceId: "phase-4::door-log", answer: ["잠깐 돌아온 건 맞아요.", "하지만 소장님이 돌아가신 줄은 몰랐어요."] },
    { suspectName: "실험체 B", evidenceId: "phase-4::body", answer: "저도 방금 소식을 들었어요. 시연 뒤에는 메인홀에 있었습니다." },
    { suspectName: "실험체 A", evidenceId: "phase-4::director-note", answer: "소장님이 C의 원본을 확인하려는 건 알고 있었어요." },
  ],
  "final-interrogation": [
    { suspectName: "실험체 C", evidenceId: "phase-3::forecast-original", answer: "실패한 기록을 숨겼어요. 하지만 그것만으로 제가 소장님을 해쳤다는 뜻은 아니에요." },
    { suspectName: "실험체 C", evidenceId: "phase-4::door-log", answer: "행사 뒤 다시 들어온 건 사실입니다. 원본을 찾으려 했어요." },
    { suspectName: "실험체 A", evidenceId: "phase-3::footage", answer: "영상에 제 인터뷰가 남아 있어요. 그동안은 계속 메인홀에 있었습니다." },
    { suspectName: "실험체 B", evidenceId: "phase-3::footage", answer: "제 시연도 영상으로 확인할 수 있을 겁니다." },
  ],
};

// 정의되지 않은 단서 조합에 대한 응답입니다. 한 번 질문할 때 한 묶음을 재생합니다.
export const psychicInterrogationFallbackAnswers: InterrogationScript[] = [
  ["그 단서에 관해서는 제가 아는 게 없습니다.", "다른 기록과 함께 보면 달라질 수도 있겠네요."],
  ["그건 저와 관련이 없어요.", "다른 사람에게 물어보세요."],
  ["지금은 그 기록만으로 말씀드릴 수 있는 게 없네요.", "더 확실한 자료가 있으면 보여 주세요."],
];
