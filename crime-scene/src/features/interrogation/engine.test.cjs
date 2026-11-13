const assert = require("node:assert/strict");
const test = require("node:test");
const {
  findCombination,
  getCollectedEvidence,
  initialInterrogationProgress,
  isPhaseReady,
  readInterrogationProgress,
  validateInterrogationPhases,
} = require("./engine.ts");

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
      evidenceIds: ["evidence-a", "evidence-b"],
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
          answer: "다른 곳에 있었습니다.",
          challenge: {
            evidenceId: "inference-a",
            response: "사실은 여기 있었습니다.",
            revealedEvidence: {
              id: "reveal-a",
              title: "새 단서",
              description: "",
            },
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
    findCombination(phase, "evidence-b", "evidence-a")?.result.id,
    "inference-a",
  );
  assert.equal(findCombination(phase, "evidence-a", "evidence-a"), undefined);
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
    ["evidence-a", "inference-a", "reveal-a"],
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
});
