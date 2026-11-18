const assert = require("node:assert/strict");
const test = require("node:test");
const {
  findCombination,
  findInterrogationQuestion,
  evidenceInstanceId,
  getCollectedEvidence,
  initialInterrogationProgress,
  isPhaseReady,
  readInterrogationProgress,
  validateInterrogationPhases,
} = require("./engine.ts");
const { deriveSharedSources, materializeSharedSources } = require("./sharedSources.ts");

const phase = {
  id: "phase-1",
  title: "첫 조사",
  intro: "",
  locations: [{ id: "room", title: "조사실", x: 50, y: 50 }],
  sources: [
    {
      id: "source-a",
      locationId: "room",
      title: "기록 A",
      description: "",
      evidence: { id: "evidence-a", title: "A", description: "" },
    },
    {
      id: "source-b",
      locationId: "room",
      title: "기록 B",
      description: "",
      evidence: { id: "evidence-b", title: "B", description: "" },
    },
  ],
  combinations: [
    {
      id: "combination-a",
    evidenceIds: ["phase-1::evidence-a", "phase-1::evidence-b"],
      result: { id: "inference-a", title: "추론", description: "" },
      explanation: "연결된다",
    },
  ],
  interrogations: [
    {
      suspectName: "실험체 A",
      questions: [
        {
          id: "question-a",
          prompt: "어디에 있었나요?",
          answer: ["다른 곳에 있었습니다.", "사실은 여기 있었습니다."],
          revealedEvidence: {
            id: "reveal-a",
            title: "새 단서",
            description: "",
          },
        },
      ],
    },
  ],
  requiredCombinationIds: ["combination-a"],
  requiredQuestionIds: ["question-a"],
};

test("단서 연결은 선택 순서와 관계없이 같은 추론을 만든다", () => {
  assert.equal(
    findCombination(phase, "phase-1::evidence-b", "phase-1::evidence-a")?.result.id,
    "inference-a",
  );
  assert.equal(findCombination(phase, "phase-1::evidence-a", "phase-1::evidence-a"), undefined);
});

test("신문은 선택한 단서 전체의 정확한 조합으로 한 질문을 찾는다", () => {
  const interrogation = {
    suspectName: "실험체 A",
    questions: [
      { id: "single", evidenceId: "phase-1::evidence-a", prompt: "", answer: "한 단서 답변" },
      {
        id: "pair",
        evidenceIds: ["phase-1::evidence-a", "phase-1::evidence-b"],
        prompt: "",
        answer: ["조합 답변 1", "조합 답변 2"],
        revealedEvidence: { id: "pair-reveal", title: "새 조합 단서", description: "" },
      },
    ],
  };
  assert.equal(findInterrogationQuestion(interrogation, ["phase-1::evidence-b", "phase-1::evidence-a"])?.id, "pair");
  assert.equal(findInterrogationQuestion(interrogation, ["phase-1::evidence-a"])?.id, "single");
  assert.equal(findInterrogationQuestion(interrogation, ["phase-1::evidence-a", "phase-1::inference-a"]), undefined);
  assert.equal(findInterrogationQuestion(interrogation, ["phase-1::evidence-a", "phase-1::evidence-a"]), undefined);
  const combinedPhase = { ...phase, interrogations: [interrogation], requiredQuestionIds: [] };
  assert.doesNotThrow(() => validateInterrogationPhases("psychic", [combinedPhase], ["실험체 A"]));
  assert.deepEqual(
    getCollectedEvidence([combinedPhase], ["phase-1::pair-reveal"]).map((item) => item.title),
    ["새 조합 단서"],
  );
  assert.throws(() => validateInterrogationPhases("psychic", [{
    ...combinedPhase,
    interrogations: [{
      ...interrogation,
      questions: [...interrogation.questions, {
        id: "duplicate-pair",
        evidenceIds: ["phase-1::evidence-b", "phase-1::evidence-a"],
        prompt: "",
        answer: "",
      }],
    }],
  }], ["실험체 A"]));
});

test("조합과 심문을 모두 해결해야 다음 페이즈가 열린다", () => {
  assert.equal(isPhaseReady(phase, initialInterrogationProgress), false);
  const withCombination = {
    ...initialInterrogationProgress,
    solvedCombinationIds: ["combination-a"],
  };
  assert.equal(isPhaseReady(phase, withCombination), false);
  assert.equal(
    isPhaseReady(phase, {
      ...withCombination,
      resolvedQuestionIds: ["question-a"],
    }),
    true,
  );
  assert.equal(
    isPhaseReady(
      { ...phase, requiredCombinationIds: [], requiredQuestionIds: [] },
      initialInterrogationProgress,
    ),
    false,
  );
});

test("획득한 조사 단서와 추론 및 심문 단서가 단서함에 모인다", () => {
  const titles = getCollectedEvidence(
    [phase],
    ["phase-1::evidence-a", "phase-1::inference-a", "phase-1::reveal-a"],
  ).map((item) => item.title);
  assert.deepEqual(titles, ["A", "추론", "새 단서"]);
});

test("잘못된 콘텐츠 참조와 손상된 저장 데이터는 안전하게 처리한다", () => {
  assert.doesNotThrow(() =>
    validateInterrogationPhases("psychic", [phase], ["실험체 A"]),
  );
  assert.throws(() =>
    validateInterrogationPhases(
      "psychic",
      [{ ...phase, requiredQuestionIds: ["missing"] }],
      ["실험체 A"],
    ),
  );
  assert.throws(() =>
    validateInterrogationPhases(
      "psychic",
      [
        {
          ...phase,
          sources: [{ ...phase.sources[0], locationId: "missing" }],
        },
      ],
      ["실험체 A"],
    ),
  );
  assert.deepEqual(
    readInterrogationProgress("{broken"),
    initialInterrogationProgress,
  );
  assert.equal(
    readInterrogationProgress('{"started":false,"storyIndex":2}').storyIndex,
    2,
  );
  assert.deepEqual(
    readInterrogationProgress('{"askedQuestionIds":["question-a"],"resolvedQuestionIds":[]}').resolvedQuestionIds,
    ["question-a"],
  );
});

test("단서는 장소 없이 지도 좌표만으로 배치할 수 있다", () => {
  const sources = phase.sources.map((source, index) => ({
    ...source,
    locationId: undefined,
    x: 40 + index * 10,
    y: 60,
  }));
  const coordinatePhase = { ...phase, locations: [], sources };
  assert.doesNotThrow(() => validateInterrogationPhases("psychic", [coordinatePhase], ["실험체 A"]));
  assert.throws(() => validateInterrogationPhases("psychic", [
    { ...coordinatePhase, sources: [{ ...sources[0], y: undefined }, sources[1]] },
  ], ["실험체 A"]));
});

test("공유 단서는 표시 페이즈와 변경 페이즈에 따라 펼쳐진다", () => {
  const baseSource = { ...phase.sources[0], x: 40, y: 60 };
  const phases = [
    { id: "morning", sources: [baseSource], combinations: [], interrogations: [] },
    { id: "afternoon", sources: [{ ...baseSource, id: "afternoon-source" }], combinations: [], interrogations: [] },
    { id: "evening", sources: [{ ...baseSource, id: "evening-source", evidence: { ...baseSource.evidence, title: "바뀐 A" } }], combinations: [], interrogations: [] },
  ];
  const [shared] = deriveSharedSources(phases);
  assert.deepEqual(shared.visiblePhaseIds, ["morning", "afternoon", "evening"]);
  assert.deepEqual(Object.keys(shared.changes), ["evening"]);

  shared.base.evidence.title = "기본 A";
  shared.visiblePhaseIds = ["morning", "evening"];
  const expanded = materializeSharedSources(phases, [shared]);
  assert.equal(expanded[0].sources[0].evidence.title, "기본 A");
  assert.deepEqual(expanded[1].sources, []);
  assert.equal(expanded[2].sources[0].evidence.title, "바뀐 A");
  assert.equal(expanded[2].sources[0].id, "evening-source");
  assert.equal(expanded[2].sources[0].versionPhaseId, "evening");

  shared.visiblePhaseIds = ["morning", "afternoon", "evening"];
  const withQuestion = phases.map((item) => ({
    ...item,
    interrogations: item.id === "afternoon"
      ? [{ suspectName: "실험체 A", questions: [{ id: "afternoon-question", evidenceId: "afternoon::evidence-a", prompt: "질문", answer: "답변" }] }]
      : [],
  }));
  const sharedVersion = materializeSharedSources(withQuestion, [shared]);
  assert.equal(sharedVersion[1].sources[0].versionPhaseId, "morning");
  assert.equal(sharedVersion[1].interrogations[0].questions[0].evidenceId, "morning::evidence-a");
  assert.deepEqual(
    getCollectedEvidence(sharedVersion, ["morning::evidence-a"]).map((item) => item.title),
    ["기본 A"],
  );
});

test("같은 ID로 바뀐 단서는 페이즈마다 별도로 수집된다", () => {
  const laterPhase = {
    ...phase,
    id: "phase-2",
    sources: [{ ...phase.sources[0], id: "source-c", evidence: { id: "evidence-a", title: "바뀐 A", description: "" } }],
    combinations: [],
    interrogations: [],
    requiredCombinationIds: [],
    requiredQuestionIds: [],
  };
  assert.equal(evidenceInstanceId("phase-2", "evidence-a"), "phase-2::evidence-a");
  assert.deepEqual(
    getCollectedEvidence([phase, laterPhase], ["phase-1::evidence-a", "phase-2::evidence-a"]).map((item) => item.title),
    ["A", "바뀐 A"],
  );
  assert.doesNotThrow(() => validateInterrogationPhases("psychic", [phase, laterPhase], ["실험체 A"]));
});

test("초능력자 인물 대화와 기본 신문 응답은 페이즈별로 다르다", () => {
  const { psychicInterrogationContent } = require("../../fixtures/psychic/interrogation.ts");
  const phases = psychicInterrogationContent.phases;
  for (let index = 1; index < phases.length; index += 1) {
    const previous = phases[index - 1];
    const current = phases[index];
    assert.notDeepEqual(current.fallbackAnswers, previous.fallbackAnswers);
    for (const interrogation of current.interrogations) {
      const earlier = previous.interrogations.find((item) => item.suspectName === interrogation.suspectName);
      if (!earlier) continue;
      assert.notDeepEqual(interrogation.conversation, earlier.conversation);
      assert.notDeepEqual(interrogation.conversationChoices, earlier.conversationChoices);
    }
  }
});
