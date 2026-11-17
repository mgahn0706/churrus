import type { InterrogationConversationChoice, InterrogationPhase, InterrogationScenarioType } from "@/types";
import { defaultInterrogationPrompt, psychicInterrogationAnswers, psychicInterrogationFallbackAnswers } from "./interrogationQuestions";
import { psychicSuspects, psychicVictim } from "./suspects";

// Placeholder story content. Repeated clue IDs become distinct versions by phase.
const locations = [
  { id: "entrance", title: "연구소 입구", x: 18, y: 69 },
  { id: "main-hall", title: "메인홀", x: 51, y: 42 },
  { id: "observation", title: "관찰실", x: 80, y: 67 },
];
const mapImage = "/image/scenario/psychic/map/lab-map.svg";
const conversationChoices: Record<string, InterrogationConversationChoice[]> = {
  "실험체 A": [
    { id: "contract", question: "소장과 계약 문제는 어떻게 됐어요?", answer: ["아직 합의하지 못했어요.", "검사가 끝나면 다시 이야기하기로 했습니다."] },
    { id: "ability", question: "생각을 읽는 능력은 지금 어떤가요?", answer: ["알약을 먹고 나면 다른 사람의 생각이 더 선명하게 들려요.", "그래서 사람이 많은 곳에서는 오래 집중하기 어렵습니다."] },
  ],
  "실험체 B": [
    { id: "reward", question: "실험 보상은 받았어요?", answer: ["약속한 보상은 아직 못 받았어요.", "소장에게 물어봤지만 검사부터 마치라고 하더군요."] },
    { id: "ability", question: "물체를 움직일 때 몸 상태는 어떤가요?", answer: ["큰 물체를 움직이면 금방 지쳐요.", "오늘은 시연도 있어서 힘을 아껴야 합니다."] },
  ],
  "실험체 C": [
    { id: "records", question: "예지 실험 기록은 누가 관리해요?", answer: ["제가 원본을 쓰고, 소장님께 결과를 전달해요.", "공개할 자료는 따로 정리합니다."] },
    { id: "ability", question: "오늘 예지 실험은 어땠어요?", answer: ["모든 장면이 또렷하게 보이는 건 아니에요.", "틀린 예측도 있어서 다시 확인해야 합니다."] },
  ],
  "김짜장": [
    { id: "pill", question: "오늘 알약은 어떻게 지급했나요?", answer: ["복용 시간과 수량은 지급대에 기록했습니다.", "이상이 있으면 관찰 장비의 수치도 확인해야 합니다."] },
    { id: "records", question: "검사 기록은 누가 보관하나요?", answer: ["각 실험체가 기록을 작성합니다.", "저녁에는 제가 원본과 공개 자료를 대조할 예정입니다."] },
  ],
};
const interrogations = (phaseId: string, director = true) =>
  [...psychicSuspects, ...(director ? [psychicVictim] : [])].map((person) => ({
    suspectName: person.name,
    conversation: [
      { speaker: "나", text: "지금 상황을 어떻게 보고 있나요?" },
      person.statement,
    ],
    conversationChoices: conversationChoices[person.name],
    questions: (psychicInterrogationAnswers[phaseId] ?? [])
      .filter((item) => item.suspectName === person.name)
      .map((item, index) => ({
        id: `${phaseId}-${person.name}-${index}`,
        evidenceId: item.evidenceId,
        evidenceIds: item.evidenceIds,
        prompt: item.prompt ?? defaultInterrogationPrompt,
        answer: item.answer,
        revealedEvidence: item.revealedEvidence,
      })),
  }));

const phases: InterrogationPhase[] = [
  {
    id: "phase-1", title: "첫 조사", timeLabel: "4/14 08:00", energyLimit: 3,
    intro: ["오전 8시. 방금 초능력 알약을 삼켰다.", "머리가 조금 맑아지는 것 같다. 연구소를 둘러보자."],
    mapImage, locations,
    sources: [
      { id: "p1-pill", locationId: "entrance", title: "알약 지급대", description: "아침 복용 기록이 놓여 있다.", evidence: { id: "pill-log", title: "오전 복용 기록", description: "오전 8시, A·B·C와 내가 알약을 받았다. 소장도 같은 종류를 챙겼다." } },
      { id: "p1-schedule", locationId: "main-hall", title: "오늘의 일정표", description: "메인홀 벽에 일정표가 붙어 있다.", evidence: { id: "schedule", title: "오전 일정표", description: "오전에는 능력 검사를, 오후에는 공개 시연 준비를 한다." } },
      { id: "p1-vitals", locationId: "observation", title: "관찰 장비", description: "누군가의 상태를 기록하는 장비다.", evidence: { id: "vitals", title: "기초 관찰 기록", description: "알약 복용 직후의 생체 수치가 정상 범위로 표시되어 있다." } },
    ],
    combinations: [],
    interrogations: interrogations("phase-1"),
    requiredCombinationIds: [], requiredQuestionIds: [],
  },
  {
    id: "phase-2", title: "오후 조사", timeLabel: "4/14 13:00", energyLimit: 3,
    intro: "오후 1시. 오전과는 다른 기록이 보인다. 알약의 영향도 다시 확인해야겠다.",
    mapImage, locations,
    sources: [
      { id: "p2-pill", locationId: "entrance", title: "갱신된 복용 기록", description: "지급대의 기록이 바뀌어 있다.", evidence: { id: "pill-log", title: "오후 복용 기록", description: "오후 1시 점검란에는 소장만 추가 복용한 것으로 적혀 있다. 오전 기록과 내용이 다르다." } },
      { id: "p2-forecast", locationId: "observation", title: "예지 실험 기록", description: "관찰실에 예지 실험 결과가 펼쳐져 있다.", evidence: { id: "forecast", title: "예지 실험 결과", description: "공개용 결과에는 성공 사례만 표시되어 있다. 원본과 대조가 필요하다." } },
      { id: "p2-message", locationId: "main-hall", title: "연구소 공지", description: "시연회 준비 공지가 도착했다.", evidence: { id: "notice", title: "오후 공지", description: "저녁 공개 시연 전까지 모든 실험 자료를 제출하라는 소장의 지시다." } },
    ],
    combinations: [],
    interrogations: interrogations("phase-2"),
    requiredCombinationIds: [], requiredQuestionIds: [],
  },
  {
    id: "phase-3", title: "저녁 조사", timeLabel: "4/14 19:00", energyLimit: 3,
    intro: "오후 7시. 시연회가 시작된다. 사람이 많은 동안의 동선을 기억해 두자.",
    mapImage, locations,
    sources: [
      { id: "p3-schedule", locationId: "main-hall", title: "시연회 일정표", description: "오전 일정표 대신 새 일정표가 붙었다.", evidence: { id: "schedule", title: "저녁 일정표", description: "오후 7시부터 A의 인터뷰와 B의 시연이 이어진다. 오전 일정표와 내용이 다르다." } },
      { id: "p3-footage", locationId: "main-hall", title: "시연 카메라", description: "메인홀 카메라가 녹화 중이다.", evidence: { id: "footage", title: "시연 영상", description: "A와 B가 공개 행사에 참여하는 장면이 이어진다." } },
      { id: "p3-original", locationId: "observation", title: "실험 원본", description: "관찰실 서랍 안쪽에 원본이 있다.", evidence: { id: "forecast-original", title: "예지 실험 원본", description: "공개 결과에서 빠진 실패 사례가 여러 건 있다." } },
    ],
    combinations: [],
    interrogations: interrogations("phase-3"),
    requiredCombinationIds: [], requiredQuestionIds: [],
  },
  {
    id: "phase-4", title: "자정의 현장", timeLabel: "4/15 00:00", energyLimit: 3,
    intro: "자정. 관찰실 문을 열자 김짜장 소장이 쓰러져 있다. 숨을 쉬지 않는다. 이제 이곳은 사건 현장이다.",
    mapImage, locations,
    sources: [
      { id: "p4-body", locationId: "observation", title: "소장의 사체", description: "소장이 관찰실 바닥에 쓰러져 있다.", evidence: { id: "body", title: "소장의 사체", description: "자정 무렵 관찰실에서 발견했다. 정확한 사인은 아직 확인되지 않았다." } },
      { id: "p4-door", locationId: "entrance", title: "출입 기록", description: "출입 단말기에 마지막 사용 내역이 남아 있다.", evidence: { id: "door-log", title: "심야 출입 기록", description: "C의 카드가 행사 뒤 연구소 출입에 사용되었다. 정확한 행적은 더 확인해야 한다." } },
      { id: "p4-pill", locationId: "observation", title: "소장의 약통", description: "책상 위 약통이 비어 있다.", evidence: { id: "pill-log", title: "소장의 마지막 복용 기록", description: "오후 기록과 달리 자정 무렵의 복용 칸은 비어 있다. 약통에는 알약이 남지 않았다." } },
      { id: "p4-note", locationId: "main-hall", title: "소장의 메모", description: "서둘러 쓴 메모가 발견된다.", evidence: { id: "director-note", title: "원본 확인 메모", description: "소장은 C에게 예지 실험 원본을 가져오라고 남겼다." } },
    ],
    combinations: [],
    interrogations: interrogations("phase-4", false),
    requiredCombinationIds: [], requiredQuestionIds: [],
  },
  {
    id: "final-interrogation", title: "최종 추리", timeLabel: "4/15 이후", energyLimit: 3,
    finalInterrogation: true,
    intro: "현장 조사는 끝났다. 지금까지 모은 단서로 남은 세 사람에게 마지막 질문을 하자.",
    mapImage, locations: [], sources: [], combinations: [],
    interrogations: interrogations("final-interrogation", false),
    requiredCombinationIds: [], requiredQuestionIds: [],
  },
];

export const psychicInterrogationContent: Pick<InterrogationScenarioType, "prologue" | "phases" | "fallbackAnswers"> = {
  prologue: [
    { speaker: "나", text: "4월 14일 아침. 연구소의 하루가 시작됐다. 오늘도 초능력 알약을 먹고 검사를 받아야 한다." },
    { speaker: "나", text: "알약을 삼키자 머릿속이 낯설 만큼 선명해졌다. 무슨 일이 일어날지 모르니 주변을 잘 살펴보자." },
    { speaker: "나", text: "우선 오전 8시의 연구소를 조사하자. 사람들에게도 단서를 보여 주며 물어볼 수 있다." },
  ],
  phases,
  fallbackAnswers: psychicInterrogationFallbackAnswers,
};
