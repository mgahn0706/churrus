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
const { deriveSharedSources, ensureSharedSourceNumbers, materializeSharedSources, spreadSharedSourcePositions } = require("./sharedSources.ts");
const { deriveSharedQuestions, materializeSharedQuestions } = require("./sharedQuestions.ts");
const { phasePeople } = require("./phasePeople.ts");

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
      { id: "triple", evidenceIds: ["phase-1::evidence-a", "phase-1::evidence-b", "phase-1::inference-a"], prompt: "", answer: "세 단서 답변" },
    ],
  };
  assert.equal(findInterrogationQuestion(interrogation, ["phase-1::evidence-b", "phase-1::evidence-a"])?.id, "pair");
  assert.equal(findInterrogationQuestion(interrogation, ["phase-1::evidence-a"])?.id, "single");
  assert.equal(findInterrogationQuestion(interrogation, ["phase-1::inference-a", "phase-1::evidence-b", "phase-1::evidence-a"])?.id, "triple");
  assert.equal(findInterrogationQuestion(interrogation, ["phase-1::inference-a", "phase-1::evidence-b", "phase-1::evidence-a", "phase-1::pair-reveal"]), undefined);
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
  assert.throws(() => validateInterrogationPhases("psychic", [{
    ...combinedPhase,
    interrogations: [{ ...interrogation, questions: [...interrogation.questions, {
      id: "four-clues",
      evidenceIds: ["phase-1::evidence-a", "phase-1::evidence-b", "phase-1::inference-a", "phase-1::pair-reveal"],
      prompt: "", answer: "네 단서 답변",
    }] }],
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
    { id: "afternoon", sources: [{ ...baseSource, id: "afternoon-source", x: 70, y: 20 }], combinations: [], interrogations: [] },
    { id: "evening", sources: [{ ...baseSource, id: "evening-source", x: 80, y: 30, evidence: { ...baseSource.evidence, title: "바뀐 A" } }], combinations: [], interrogations: [] },
  ];
  const [shared] = deriveSharedSources(phases);
  assert.deepEqual(shared.visiblePhaseIds, ["morning", "afternoon", "evening"]);
  assert.deepEqual(Object.keys(shared.changes), ["evening"]);

  shared.base.evidence.title = "기본 A";
  shared.base.x = 25;
  shared.base.y = 35;
  shared.visiblePhaseIds = ["morning", "evening"];
  const expanded = materializeSharedSources(phases, [shared]);
  assert.equal(expanded[0].sources[0].evidence.title, "기본 A");
  assert.deepEqual([expanded[0].sources[0].x, expanded[0].sources[0].y], [25, 35]);
  assert.deepEqual(expanded[1].sources, []);
  assert.equal(expanded[2].sources[0].evidence.title, "바뀐 A");
  assert.deepEqual([expanded[2].sources[0].x, expanded[2].sources[0].y], [25, 35]);
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

test("공유 단서 번호는 순서와 페이즈가 달라도 유지된다", () => {
  const old = ensureSharedSourceNumbers([
    { id: "a" }, { id: "b", number: 7 }, { id: "c" },
  ]);
  assert.deepEqual(old.map((source) => source.number), [1, 7, 2]);
  const inserted = [{ id: "new", number: Math.max(...old.map((source) => source.number)) + 1 }, ...old];
  assert.deepEqual(ensureSharedSourceNumbers(inserted).map((source) => source.number), [8, 1, 7, 2]);
  assert.deepEqual(ensureSharedSourceNumbers([old[2], old[0]]).map((source) => source.number), [2, 1]);
});

test("페이즈마다 인물을 숨기거나 새 인물의 지도 위치를 지정할 수 있다", () => {
  const custom = { name: "새 인물", x: 64, y: 38 };
  const configured = {
    ...phase,
    people: [custom],
    interrogations: [...phase.interrogations, { suspectName: custom.name, questions: [] }],
    requiredQuestionIds: [],
  };
  assert.deepEqual(phasePeople(configured), [custom]);
  assert.equal(phasePeople(phase)[0].name, "실험체 A");
  assert.doesNotThrow(() => validateInterrogationPhases("psychic", [configured], ["실험체 A", custom.name]));
  assert.throws(() => validateInterrogationPhases("psychic", [{ ...configured, people: [{ ...custom, x: 101 }] }], ["실험체 A", custom.name]));
  assert.throws(() => validateInterrogationPhases("psychic", [{ ...configured, people: [custom], interrogations: phase.interrogations }], ["실험체 A", custom.name]));
  assert.throws(() => validateInterrogationPhases("psychic", [{ ...configured, requiredQuestionIds: ["question-a"] }], ["실험체 A", custom.name]));
});

test("겹친 단서는 자동으로 벌어지고 옮긴 단서의 자리는 우선 유지된다", () => {
  const shared = Array.from({ length: 13 }, (_, index) => ({
    id: `clue-${index}`, number: index + 1,
    visiblePhaseIds: ["morning", "evening"], changes: {}, sourceIds: {}, order: {},
    base: { x: 50, y: 50, title: `단서 ${index}`, description: "", evidence: { id: `clue-${index}`, title: `단서 ${index}`, description: "" } },
  }));
  const assertSeparated = (sources) => {
    for (let left = 0; left < sources.length; left += 1) {
      for (let right = left + 1; right < sources.length; right += 1) {
        const dx = Math.abs(sources[left].base.x - sources[right].base.x);
        const dy = Math.abs(sources[left].base.y - sources[right].base.y);
        assert.ok((dx / 5) ** 2 + (dy / 8) ** 2 >= 1, `${sources[left].id}와 ${sources[right].id}가 겹침`);
      }
    }
  };
  const placed = spreadSharedSourcePositions(shared);
  assertSeparated(placed);
  assert.deepEqual(spreadSharedSourcePositions(placed), placed);

  const moved = spreadSharedSourcePositions(placed.map((source) => source.id === "clue-7"
    ? { ...source, base: { ...source.base, x: 50, y: 50 } }
    : source), "clue-7");
  assert.deepEqual([moved[7].base.x, moved[7].base.y], [50, 50]);
  assertSeparated(moved);
  const phases = [{ id: "morning", sources: [], combinations: [], interrogations: [] }, { id: "evening", sources: [], combinations: [], interrogations: [] }];
  const expanded = materializeSharedSources(phases, moved);
  assert.deepEqual(expanded[0].sources.map((source) => [source.x, source.y]), expanded[1].sources.map((source) => [source.x, source.y]));
});

test("같은 페이즈에 나오지 않는 단서는 같은 위치를 사용할 수 있다", () => {
  const makeSource = (id, phaseId) => ({
    id, number: id === "morning" ? 1 : 2, visiblePhaseIds: [phaseId], changes: {}, sourceIds: {}, order: {},
    base: { x: 50, y: 50, title: id, description: "", evidence: { id, title: id, description: "" } },
  });
  const separated = spreadSharedSourcePositions([makeSource("morning", "phase-1"), makeSource("evening", "phase-2")]);
  assert.deepEqual(separated.map((source) => [source.base.x, source.base.y]), [[50, 50], [50, 50]]);
  const together = spreadSharedSourcePositions([makeSource("morning", "phase-1"), makeSource("evening", "phase-1")]);
  assert.notDeepEqual([together[0].base.x, together[0].base.y], [together[1].base.x, together[1].base.y]);
  const nearby = [makeSource("morning", "phase-1"), { ...makeSource("evening", "phase-1"), base: { ...makeSource("evening", "phase-1").base, x: 56 } }];
  assert.deepEqual(spreadSharedSourcePositions(nearby).map((source) => [source.base.x, source.base.y]), [[50, 50], [56, 50]]);
  const edge = { ...makeSource("edge", "phase-1"), base: { ...makeSource("edge", "phase-1").base, x: 4, y: 5 } };
  assert.deepEqual([spreadSharedSourcePositions([edge])[0].base.x, spreadSharedSourcePositions([edge])[0].base.y], [4, 5]);
});

test("단서 비밀번호는 변경 페이즈에 따라 적용되고 빈 비밀번호는 거부된다", () => {
  const baseSource = { ...phase.sources[0], x: 40, y: 60, password: "0420" };
  const phases = [
    { ...phase, id: "morning", sources: [baseSource], combinations: [], interrogations: [], requiredCombinationIds: [], requiredQuestionIds: [] },
    { ...phase, id: "evening", sources: [{ ...baseSource, id: "evening-source", password: "925" }], combinations: [], interrogations: [], requiredCombinationIds: [], requiredQuestionIds: [] },
  ];
  const [shared] = deriveSharedSources(phases);
  assert.equal(shared.base.password, "0420");
  assert.equal(shared.changes.evening.password, "925");
  const expanded = materializeSharedSources(phases, [shared]);
  assert.deepEqual(expanded.map((item) => item.sources[0].password), ["0420", "925"]);
  assert.doesNotThrow(() => validateInterrogationPhases("psychic", expanded, ["실험체 A"]));
  assert.throws(() => validateInterrogationPhases("psychic", [{ ...expanded[0], sources: [{ ...expanded[0].sources[0], password: " " }] }], ["실험체 A"]));
});

test("공유 신문은 단서 조합을 유지하고 변경 페이즈의 답변만 바꾼다", () => {
  const question = { id: "morning-question", evidenceId: "morning::evidence-a", prompt: "무엇을 봤나요?", answer: "아침 답변" };
  const phases = [
    { id: "morning", sources: [{ ...phase.sources[0], versionPhaseId: "morning" }], combinations: [], interrogations: [{ suspectName: "실험체 A", questions: [question] }] },
    { id: "afternoon", sources: [{ ...phase.sources[0], id: "afternoon-source", versionPhaseId: "morning" }], combinations: [], interrogations: [{ suspectName: "실험체 A", questions: [{ ...question, id: "afternoon-question", answer: "오후 답변" }] }] },
    { id: "evening", sources: [], combinations: [], interrogations: [{ suspectName: "실험체 A", questions: [] }] },
  ];
  const [shared] = deriveSharedQuestions(phases);
  assert.deepEqual(shared.visiblePhaseIds, ["morning", "afternoon"]);
  assert.deepEqual(Object.keys(shared.changes), ["afternoon"]);
  shared.base.answer = "수정한 기본 답변";
  shared.visiblePhaseIds.push("evening");
  const expanded = materializeSharedQuestions(phases, [shared]);
  assert.equal(expanded[0].interrogations[0].questions[0].answer, "수정한 기본 답변");
  assert.equal(expanded[1].interrogations[0].questions[0].answer, "오후 답변");
  assert.equal(expanded[2].interrogations[0].questions[0].answer, "오후 답변");
  assert.deepEqual(expanded.map((item) => item.interrogations[0].questions[0].evidenceIds), [
    ["morning::evidence-a"], ["morning::evidence-a"], ["morning::evidence-a"],
  ]);
});

test("기존 초능력자 신문을 공유 문항으로 옮겨도 각 페이즈의 내용이 유지된다", () => {
  const { psychicInterrogationContent } = require("../../fixtures/psychic/interrogation.ts");
  const original = materializeSharedSources(
    psychicInterrogationContent.phases,
    deriveSharedSources(psychicInterrogationContent.phases),
  );
  const shared = deriveSharedQuestions(original);
  const expanded = materializeSharedQuestions(original, shared);
  const snapshot = (phases) => phases.map((item) => item.interrogations.map((person) => person.questions.map((question) => ({
    id: question.id,
    evidenceIds: question.evidenceIds ?? (question.evidenceId ? [question.evidenceId] : []),
    prompt: question.prompt,
    answer: question.answer,
    revealedEvidence: question.revealedEvidence,
  }))));
  assert.deepEqual(snapshot(expanded), snapshot(original));
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
