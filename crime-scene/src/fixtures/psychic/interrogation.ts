import type { InterrogationConversationChoice, InterrogationPhase, InterrogationQuestion, InterrogationScenarioType, InterrogationScript } from "@/types";
import { psychicIdentityAnswers } from "./additionalQuestions";
import { psychicSuspects, psychicVictim } from "./suspects";

// Placeholder story content. Repeated clue IDs become distinct versions by phase.
const locations = [
  { id: "entrance", title: "연구소 입구", x: 18, y: 69 },
  { id: "main-hall", title: "메인홀", x: 51, y: 42 },
  { id: "observation", title: "관찰실", x: 80, y: 67 },
];
const mapImage = "/image/scenario/psychic/map/lab-map.svg";
type QuestionDraft = Omit<InterrogationQuestion, "id" | "prompt"> & {
  suspectName: string;
  prompt?: string;
};
const defaultInterrogationPrompt = "이 단서에 대해 아는 것이 있나요?";

type PhasePersonDialogue = {
  conversation: InterrogationScript;
  conversationChoices: InterrogationConversationChoice[];
};

// 지도 인물을 눌렀을 때의 대화와 선택지는 페이즈마다 별개 원고입니다.
const phaseDialogues: Record<string, Record<string, PhasePersonDialogue>> = {
  "phase-1": {
    "실험체 A": {
      conversation: [{ speaker: "나", text: "아침 검사는 어때요?" }, "알약을 먹은 지 얼마 안 돼서 아직 집중하는 중이에요."],
      conversationChoices: [
        { id: "p1-contract", question: "소장과 계약 이야기는 했어요?", answer: ["검사가 끝나면 다시 이야기하기로 했어요.", "아직 약속이 확정된 건 아닙니다."] },
        { id: "p1-ability", question: "생각을 읽는 능력은 어떤가요?", answer: ["방금부터 다른 사람의 생각이 조금씩 들려요.", "사람이 많으면 소리가 겹쳐서 구분하기 어렵습니다."] },
      ],
    },
    "실험체 B": {
      conversation: [{ speaker: "나", text: "몸 상태는 괜찮아요?" }, "아직은 괜찮아요. 오전 검사를 기다리고 있습니다."],
      conversationChoices: [
        { id: "p1-ability", question: "물체를 움직이면 힘이 많이 들어요?", answer: ["큰 물체일수록 빨리 지쳐요.", "오늘은 저녁 시연도 있어서 힘을 아껴야 합니다."] },
        { id: "p1-reward", question: "실험 보상은 받았어요?", answer: ["아직 받지 못했어요.", "소장님은 검사부터 마치자고 하셨습니다."] },
      ],
    },
    "실험체 C": {
      conversation: [{ speaker: "나", text: "오늘 예지 검사는 시작했어요?" }, "첫 기록을 쓰는 중이에요. 아직 결과를 단정하기 어려워요."],
      conversationChoices: [
        { id: "p1-forecast", question: "예측이 항상 맞나요?", answer: ["아니요. 흐릿하게 보일 때도 있어요.", "틀린 예측까지 원본에 적어 둡니다."] },
        { id: "p1-records", question: "기록은 누가 보관해요?", answer: ["원본은 제가 작성해요.", "검사가 끝나면 소장님께 제출합니다."] },
      ],
    },
    "김짜장": {
      conversation: [{ speaker: "나", text: "오늘 검사는 어떻게 진행되나요?" }, "오전에는 복용 직후 수치를 확인합니다. 모두 순서대로 검사받으세요."],
      conversationChoices: [
        { id: "p1-pill", question: "알약은 모두 같은 걸 받았나요?", answer: ["같은 종류를 지급했습니다.", "시간과 수량은 지급대에 기록해 뒀습니다."] },
        { id: "p1-vitals", question: "검사 수치는 어디에 남나요?", answer: ["관찰 장비에 먼저 남습니다.", "이상이 있으면 제가 다시 확인하겠습니다."] },
      ],
    },
  },
  "phase-2": {
    "실험체 A": {
      conversation: [{ speaker: "나", text: "오전 검사는 끝났어요?" }, "네. 이제 저녁 인터뷰를 준비해야 해요."],
      conversationChoices: [
        { id: "p2-results", question: "검사 결과는 어땠어요?", answer: ["읽힌 생각이 너무 많아 기록을 정리하기 어려웠어요.", "소장님께는 중요한 부분만 보고했습니다."] },
        { id: "p2-contract", question: "계약 문제는 해결됐어요?", answer: ["아직 결론이 안 났어요.", "시연이 끝난 뒤 다시 이야기하자고 했습니다."] },
      ],
    },
    "실험체 B": {
      conversation: [{ speaker: "나", text: "오후 준비는 잘 되고 있어요?" }, "장비를 옮기는 중이에요. 저녁 시연까지 시간이 많지 않네요."],
      conversationChoices: [
        { id: "p2-reward", question: "보상 얘기는 다시 해 봤어요?", answer: ["아직 못 했어요.", "소장님은 공개 시연 자료부터 내라고 하셨습니다."] },
        { id: "p2-condition", question: "오전보다 힘이 떨어졌나요?", answer: ["조금 피곤하지만 능력은 쓸 수 있어요.", "시연 전에는 쉬려고 합니다."] },
      ],
    },
    "실험체 C": {
      conversation: [{ speaker: "나", text: "공개 결과표를 만들고 있나요?" }, "네. 오전 기록을 추려서 제출해야 합니다."],
      conversationChoices: [
        { id: "p2-public", question: "성공한 예측만 공개하나요?", answer: ["공개용 표에는 확인된 결과를 먼저 넣었어요.", "원본에는 다른 기록도 남아 있습니다."] },
        { id: "p2-original", question: "원본은 어디에 있어요?", answer: ["관찰실에서 정리하고 있어요.", "아직 소장님께 보여 드리지 않았습니다."] },
      ],
    },
    "김짜장": {
      conversation: [{ speaker: "나", text: "오후에는 무엇을 확인하나요?" }, "저녁 시연 전에 자료와 복용 상태를 다시 점검합니다."],
      conversationChoices: [
        { id: "p2-pill", question: "오후에 알약을 더 드셨나요?", answer: ["제 상태를 확인하려고 한 번 더 복용했습니다.", "기록은 지급대에서 볼 수 있습니다."] },
        { id: "p2-records", question: "실험 원본도 오늘 보시나요?", answer: ["저녁에 직접 대조할 겁니다.", "공개 자료와 같아야겠지요."] },
      ],
    },
  },
  "phase-3": {
    "실험체 A": {
      conversation: [{ speaker: "나", text: "이제 인터뷰 차례인가요?" }, "네. 곧 카메라 앞에 서야 합니다."],
      conversationChoices: [
        { id: "p3-camera", question: "인터뷰하는 동안 어디에 있나요?", answer: ["계속 메인홀 카메라 앞에 있을 거예요.", "진행자와 대화하는 장면이 남을 겁니다."] },
        { id: "p3-contract", question: "소장과는 이야기했어요?", answer: ["계약 얘기는 아직 미뤄졌어요.", "행사가 끝나야 제대로 이야기할 수 있을 것 같습니다."] },
      ],
    },
    "실험체 B": {
      conversation: [{ speaker: "나", text: "시연 준비는 끝났어요?" }, "네. 곧 무대에서 물체를 움직일 겁니다."],
      conversationChoices: [
        { id: "p3-stage", question: "시연 중에는 어디에 있나요?", answer: ["메인홀 무대에 계속 있을 거예요.", "카메라와 관객 앞에서 진행합니다."] },
        { id: "p3-fatigue", question: "오래 시연해도 괜찮아요?", answer: ["길어지면 힘들겠지만 준비는 됐어요.", "끝나면 잠시 쉬어야겠죠."] },
      ],
    },
    "실험체 C": {
      conversation: [{ speaker: "나", text: "원본 기록은 정리됐어요?" }, "거의요. 공개 자료와 다시 대조하고 있습니다."],
      conversationChoices: [
        { id: "p3-failures", question: "빠진 실패 기록은 왜 있어요?", answer: ["공개 자료에 넣지 않은 기록이 있습니다.", "원본까지 없앤 건 아니에요."] },
        { id: "p3-director", question: "소장도 원본을 볼 예정인가요?", answer: ["보자고 하셨어요.", "무슨 말씀을 하실지 걱정됩니다."] },
      ],
    },
    "김짜장": {
      conversation: [{ speaker: "나", text: "시연회는 순조로운가요?" }, "지금까지는 그렇습니다. 끝나면 원본 자료를 확인해야겠군요."],
      conversationChoices: [
        { id: "p3-original", question: "예지 실험 원본을 찾고 있나요?", answer: ["공개 결과와 다른 부분이 있는지 봐야 합니다.", "원본을 확인한 뒤 C와 이야기하겠습니다."] },
        { id: "p3-meeting", question: "언제 C를 만나실 건가요?", answer: ["행사가 끝난 뒤입니다.", "자정 전에는 확인하고 싶군요."] },
      ],
    },
  },
  "phase-4": {
    "실험체 A": {
      conversation: [{ speaker: "나", text: "소장님 소식을 들었어요?" }, "네. 방금 들었습니다. 믿기지 않아요."],
      conversationChoices: [
        { id: "p4-where", question: "자정 전에는 어디에 있었어요?", answer: ["행사가 끝난 뒤에는 메인홀 주변에 있었어요.", "인터뷰 영상도 확인해 보세요."] },
        { id: "p4-c", question: "C와 소장 사이에 무슨 일이 있었나요?", answer: ["소장님이 C의 원본을 보려던 건 알아요.", "그 뒤에 둘이 만났는지는 모르겠습니다."] },
      ],
    },
    "실험체 B": {
      conversation: [{ speaker: "나", text: "무슨 일이 있었는지 봤어요?" }, "아니요. 저도 소식을 듣고 왔어요."],
      conversationChoices: [
        { id: "p4-after", question: "시연 뒤에는 어디에 있었어요?", answer: ["메인홀에서 장비를 정리했어요.", "관찰실 쪽에는 가지 않았습니다."] },
        { id: "p4-director", question: "소장님과 마지막으로 이야기한 건 언제예요?", answer: ["시연 전에 잠깐 봤어요.", "그 뒤에는 따로 만나지 않았습니다."] },
      ],
    },
    "실험체 C": {
      conversation: [{ speaker: "나", text: "연구소에 다시 왔었나요?" }, "잠깐 들른 건 맞아요. 원본 자료가 필요했습니다."],
      conversationChoices: [
        { id: "p4-return", question: "왜 다시 들어왔어요?", answer: ["원본을 가져가려고 했어요.", "소장님이 기다리고 계신 줄은 몰랐습니다."] },
        { id: "p4-room", question: "관찰실에는 들어갔어요?", answer: ["서랍을 확인하러 갔어요.", "그때는 이런 일이 생긴 줄 몰랐어요."] },
      ],
    },
  },
  "final-interrogation": {
    "실험체 A": {
      conversation: [{ speaker: "나", text: "마지막으로 확인할 게 있어요." }, "네. 제가 아는 건 모두 말하겠습니다."],
      conversationChoices: [
        { id: "final-camera", question: "인터뷰 시간 내내 메인홀에 있었나요?", answer: ["영상에 진행자와 제가 계속 나옵니다.", "그 시간에는 관찰실에 갈 수 없었어요."] },
        { id: "final-contract", question: "계약 갈등이 살인의 이유였나요?", answer: ["소장님에게 화가 난 건 사실이에요.", "하지만 해치지는 않았습니다."] },
      ],
    },
    "실험체 B": {
      conversation: [{ speaker: "나", text: "마지막 진술을 부탁해요." }, "제 시연 영상부터 확인해 주세요."],
      conversationChoices: [
        { id: "final-stage", question: "시연하는 동안 자리를 비웠나요?", answer: ["카메라 앞에서 계속 시연했습니다.", "관객들도 저를 보고 있었어요."] },
        { id: "final-reward", question: "보상 때문에 소장을 원망했나요?", answer: ["불만은 있었죠.", "그래도 살해할 생각은 없었습니다."] },
      ],
    },
    "실험체 C": {
      conversation: [{ speaker: "나", text: "출입 기록이 남아 있어요." }, "다시 온 건 인정해요. 하지만 그게 전부예요."],
      conversationChoices: [
        { id: "final-original", question: "왜 실험 원본을 숨겼나요?", answer: ["실패한 예측을 공개하고 싶지 않았어요.", "원본은 지우지 않았습니다."] },
        { id: "final-room", question: "관찰실에서 소장을 만났나요?", answer: ["원본을 찾으러 들어갔어요.", "소장님과 무슨 일이 있었는지는 더 말하고 싶지 않아요."] },
      ],
    },
  },
};
const interrogations = (phaseId: string, answers: QuestionDraft[], director = true) =>
  [...psychicSuspects, ...(director ? [psychicVictim] : [])].map((person) => {
    const dialogue = phaseDialogues[phaseId]?.[person.name];
    if (!dialogue) throw new Error(`${phaseId}: ${person.name} 대사가 없습니다.`);
    return {
      suspectName: person.name,
      conversation: dialogue.conversation,
      conversationChoices: dialogue.conversationChoices,
      questions: answers
        .filter((item) => item.suspectName === person.name)
        .map((item, index) => ({
          id: `${phaseId}-${person.name}-${index}`,
          evidenceId: item.evidenceId,
          evidenceIds: item.evidenceIds,
          prompt: item.prompt ?? defaultInterrogationPrompt,
          answer: item.answer,
          revealedEvidence: item.revealedEvidence,
        })),
    };
  });

const phases: InterrogationPhase[] = [
  {
    id: "phase-1", title: "첫 조사", timeLabel: "4/14 08:00", energyLimit: 3,
    intro: ["오전 8시. 방금 초능력 알약을 삼켰다.", "머리가 조금 맑아지는 것 같다. 연구소를 둘러보자."],
    fallbackAnswers: [
      ["아직 오전 검사가 시작된 지 얼마 안 됐어요.", "그 단서만으로는 말씀드릴 게 없습니다."],
      ["지금은 복용 직후 상태를 확인하는 중입니다.", "기록이 더 쌓이면 다시 물어봐 주세요."],
    ],
    mapImage, locations,
    sources: [
      { id: "p1-pill", locationId: "entrance", title: "알약 지급대", description: "아침 복용 기록이 놓여 있다.", evidence: { id: "pill-log", title: "오전 복용 기록", description: "오전 8시, A·B·C와 내가 알약을 받았다. 소장도 같은 종류를 챙겼다." } },
      { id: "p1-badge", locationId: "entrance", title: "A의 출입증", description: "출입증 뒷면에 본명이 적혀 있다.", evidence: { id: "badge-a", title: "실험체 A의 출입증", description: `실험체 A의 본명은 ${psychicIdentityAnswers[0].realName}이다.` } },
      { id: "p1-schedule", locationId: "main-hall", title: "오늘의 일정표", description: "메인홀 벽에 일정표가 붙어 있다.", evidence: { id: "schedule", title: "오전 일정표", description: "오전에는 능력 검사를, 오후에는 공개 시연 준비를 한다." } },
      { id: "p1-vitals", locationId: "observation", title: "관찰 장비", description: "누군가의 상태를 기록하는 장비다.", evidence: { id: "vitals", title: "기초 관찰 기록", description: "알약 복용 직후의 생체 수치가 정상 범위로 표시되어 있다." } },
    ],
    combinations: [],
    interrogations: interrogations("phase-1", [
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
    ]),
    requiredCombinationIds: [], requiredQuestionIds: [],
  },
  {
    id: "phase-2", title: "오후 조사", timeLabel: "4/14 13:00", energyLimit: 3,
    intro: "오후 1시. 오전과는 다른 기록이 보인다. 알약의 영향도 다시 확인해야겠다.",
    fallbackAnswers: [
      ["오후 자료는 아직 정리 중이에요.", "그 기록과 제 이야기를 연결하기는 어렵습니다."],
      ["시연 준비 때문에 자세히 확인하지 못했어요.", "다른 자료가 있으면 보여 주세요."],
    ],
    mapImage, locations,
    sources: [
      { id: "p2-pill", locationId: "entrance", title: "갱신된 복용 기록", description: "지급대의 기록이 바뀌어 있다.", evidence: { id: "pill-log", title: "오후 복용 기록", description: "오후 1시 점검란에는 소장만 추가 복용한 것으로 적혀 있다. 오전 기록과 내용이 다르다." } },
      { id: "p2-ledger", locationId: "main-hall", title: "보상 지급대장", description: "실험체 B의 지급 내역이 있다.", evidence: { id: "ledger-b", title: "실험체 B의 지급대장", description: `실험체 B의 본명은 ${psychicIdentityAnswers[1].realName}이다. 보상란은 아직 비어 있다.` } },
      { id: "p2-forecast", locationId: "observation", title: "예지 실험 기록", description: "관찰실에 예지 실험 결과가 펼쳐져 있다.", evidence: { id: "forecast", title: "예지 실험 결과", description: "공개용 결과에는 성공 사례만 표시되어 있다. 원본과 대조가 필요하다." } },
      { id: "p2-message", locationId: "main-hall", title: "연구소 공지", description: "시연회 준비 공지가 도착했다.", evidence: { id: "notice", title: "오후 공지", description: "저녁 공개 시연 전까지 모든 실험 자료를 제출하라는 소장의 지시다." } },
    ],
    combinations: [],
    interrogations: interrogations("phase-2", [
      { suspectName: "김짜장", evidenceId: "phase-2::forecast", answer: "실험 원본은 저녁에 직접 확인하겠습니다. 공개 결과와 같아야겠지요." },
      { suspectName: "실험체 C", evidenceId: "phase-2::forecast", answer: ["성공한 결과만 공개한 건 맞아요.", "자세한 건 나중에 설명할게요."] },
      { suspectName: "실험체 B", evidenceId: "phase-2::notice", answer: "시연 준비 때문에 정신이 없어요. 보상 이야기는 아직 못 했습니다." },
    ]),
    requiredCombinationIds: [], requiredQuestionIds: [],
  },
  {
    id: "phase-3", title: "저녁 조사", timeLabel: "4/14 19:00", energyLimit: 3,
    intro: "오후 7시. 시연회가 시작된다. 사람이 많은 동안의 동선을 기억해 두자.",
    fallbackAnswers: [
      ["지금은 공개 시연 중입니다.", "그 단서에 대해서는 행사가 끝난 뒤 이야기하죠."],
      ["카메라와 관객 앞에서 계속 움직이고 있어요.", "그 기록은 아직 보지 못했습니다."],
    ],
    mapImage, locations,
    sources: [
      { id: "p3-schedule", locationId: "main-hall", title: "시연회 일정표", description: "오전 일정표 대신 새 일정표가 붙었다.", evidence: { id: "schedule", title: "저녁 일정표", description: "오후 7시부터 A의 인터뷰와 B의 시연이 이어진다. 오전 일정표와 내용이 다르다." } },
      { id: "p3-footage", locationId: "main-hall", title: "시연 카메라", description: "메인홀 카메라가 녹화 중이다.", evidence: { id: "footage", title: "시연 영상", description: "A와 B가 공개 행사에 참여하는 장면이 이어진다." } },
      { id: "p3-original", locationId: "observation", title: "실험 원본", description: "관찰실 서랍 안쪽에 원본이 있다.", evidence: { id: "forecast-original", title: "예지 실험 원본", description: `공개 결과에서 빠진 실패 사례가 여러 건 있다. 기록 작성자 ${psychicIdentityAnswers[2].realName}는 실험체 C다.` } },
    ],
    combinations: [],
    interrogations: interrogations("phase-3", [
      { suspectName: "김짜장", evidenceId: "phase-3::forecast-original", answer: "이 원본은 공개 자료와 다릅니다. 자정 전에 C와 이야기하겠습니다." },
      { suspectName: "실험체 A", evidenceId: "phase-3::footage", answer: "행사가 끝날 때까지 카메라 앞에 있을 겁니다." },
      { suspectName: "실험체 C", evidenceId: "phase-3::forecast-original", answer: "원본을 어디서 찾았죠? 소장님이 보셨나요?" },
    ]),
    requiredCombinationIds: [], requiredQuestionIds: [],
  },
  {
    id: "phase-4", title: "자정의 현장", timeLabel: "4/15 00:00", energyLimit: 3,
    intro: "자정. 관찰실 문을 열자 김짜장 소장이 쓰러져 있다. 숨을 쉬지 않는다. 이제 이곳은 사건 현장이다.",
    fallbackAnswers: [
      ["소장님이 돌아가셨다는 말에 아직 정신이 없어요.", "그 단서로는 제가 아는 게 없습니다."],
      ["현장에 무슨 일이 있었는지 저도 확인 중이에요.", "확실한 기록을 보여 주세요."],
    ],
    mapImage, locations,
    sources: [
      { id: "p4-body", locationId: "observation", title: "소장의 사체", description: "소장이 관찰실 바닥에 쓰러져 있다.", evidence: { id: "body", title: "소장의 사체", description: "자정 무렵 관찰실에서 발견했다. 정확한 사인은 아직 확인되지 않았다." } },
      { id: "p4-door", locationId: "entrance", title: "출입 기록", description: "출입 단말기에 마지막 사용 내역이 남아 있다.", evidence: { id: "door-log", title: "심야 출입 기록", description: "C의 카드가 행사 뒤 연구소 출입에 사용되었다. 정확한 행적은 더 확인해야 한다." } },
      { id: "p4-pill", locationId: "observation", title: "소장의 약통", description: "책상 위 약통이 비어 있다.", evidence: { id: "pill-log", title: "소장의 마지막 복용 기록", description: "오후 기록과 달리 자정 무렵의 복용 칸은 비어 있다. 약통에는 알약이 남지 않았다." } },
      { id: "p4-note", locationId: "main-hall", title: "소장의 메모", description: "서둘러 쓴 메모가 발견된다.", evidence: { id: "director-note", title: "원본 확인 메모", description: "소장은 C에게 예지 실험 원본을 가져오라고 남겼다." } },
    ],
    combinations: [],
    interrogations: interrogations("phase-4", [
      { suspectName: "실험체 C", evidenceId: "phase-4::door-log", answer: ["잠깐 돌아온 건 맞아요.", "하지만 소장님이 돌아가신 줄은 몰랐어요."] },
      { suspectName: "실험체 B", evidenceId: "phase-4::body", answer: "저도 방금 소식을 들었어요. 시연 뒤에는 메인홀에 있었습니다." },
      { suspectName: "실험체 A", evidenceId: "phase-4::director-note", answer: "소장님이 C의 원본을 확인하려는 건 알고 있었어요." },
    ], false),
    requiredCombinationIds: [], requiredQuestionIds: [],
  },
  {
    id: "final-interrogation", title: "최종 추리", timeLabel: "4/15 이후", energyLimit: 3,
    finalInterrogation: true,
    intro: "현장 조사는 끝났다. 지금까지 모은 단서로 남은 세 사람에게 마지막 질문을 하자.",
    fallbackAnswers: [
      ["이미 아는 것은 모두 말했습니다.", "그 단서만으로는 다른 답을 드릴 수 없어요."],
      ["마지막으로 확인할 자료라면 정확히 보여 주세요.", "지금은 더 덧붙일 말이 없습니다."],
    ],
    mapImage, locations: [], sources: [], combinations: [],
    interrogations: interrogations("final-interrogation", [
      { suspectName: "실험체 C", evidenceId: "phase-3::forecast-original", answer: "실패한 기록을 숨겼어요. 하지만 그것만으로 제가 소장님을 해쳤다는 뜻은 아니에요." },
      { suspectName: "실험체 C", evidenceId: "phase-4::door-log", answer: "행사 뒤 다시 들어온 건 사실입니다. 원본을 찾으려 했어요." },
      { suspectName: "실험체 A", evidenceId: "phase-3::footage", answer: "영상에 제 인터뷰가 남아 있어요. 그동안은 계속 메인홀에 있었습니다." },
      { suspectName: "실험체 B", evidenceId: "phase-3::footage", answer: "제 시연도 영상으로 확인할 수 있을 겁니다." },
    ], false),
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
  fallbackAnswers: [
    ["그 단서에 관해서는 제가 아는 게 없습니다.", "다른 기록과 함께 보면 달라질 수도 있겠네요."],
    ["그건 저와 관련이 없어요.", "다른 사람에게 물어보세요."],
    ["지금은 그 기록만으로 말씀드릴 수 있는 게 없네요.", "더 확실한 자료가 있으면 보여 주세요."],
  ] satisfies InterrogationScript[],
};
