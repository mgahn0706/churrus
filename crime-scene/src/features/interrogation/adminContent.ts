import type {
  InterrogationDialogueLine,
  InterrogationEvidence,
  InterrogationScenarioType,
  InterrogationScript,
} from "@/types";
import { MAX_INTERROGATION_CLUES, validateInterrogationPhases } from "./engine";
import type { SharedSource } from "./sharedSources";
import type { SharedQuestion } from "./sharedQuestions";

export type EditableInterrogationContent = Pick<
  InterrogationScenarioType,
  "prologue" | "phases" | "fallbackAnswers" | "people"
> & { sharedSources?: SharedSource[]; sharedQuestions?: SharedQuestion[] };

export function scriptLines(
  script: InterrogationScript | InterrogationScenarioType["prologue"] | undefined,
): InterrogationDialogueLine[] {
  if (script === undefined) return [];
  return (Array.isArray(script) ? script : [script]).map((line) =>
    typeof line === "string" ? { text: line } : line,
  );
}

export function evidenceOptions(
  content: EditableInterrogationContent,
  throughPhaseIndex = content.phases.length - 1,
) {
  const options: { id: string; label: string; description: string }[] = [];
  const seen = new Set<string>();
  const sourceNumbers = new Map((content.sharedSources ?? []).map((source) => [source.id, source.number]));
  const add = (phaseId: string, timeLabel: string, evidence: InterrogationEvidence) => {
    const id = `${phaseId}::${evidence.id}`;
    if (!evidence.id || seen.has(id)) return;
    seen.add(id);
    const number = sourceNumbers.get(evidence.id);
    options.push({ id, label: `${number ? `#${number} · ` : ""}${timeLabel} · ${evidence.title || "이름 없는 단서"}`, description: evidence.description });
  };

  content.phases.slice(0, throughPhaseIndex + 1).forEach((phase) => {
    const timeLabel = phase.timeLabel || phase.title;
    phase.sources.forEach((source) => add(source.versionPhaseId ?? phase.id, timeLabel, source.evidence));
    phase.combinations.forEach((combination) => add(phase.id, timeLabel, combination.result));
    phase.interrogations.forEach((interrogation) => interrogation.questions.forEach((question) => {
      if (question.revealedEvidence) add(phase.id, timeLabel, question.revealedEvidence);
    }));
  });
  return options;
}

export function validateAdminContent(
  content: EditableInterrogationContent,
  suspectNames: string[],
): string | null {
  if (scriptLines(content.prologue).every((line) => !line.text.trim())) return "프롤로그 대사를 한 줄 이상 입력하세요.";
  if (content.phases.length === 0) return "페이즈를 한 개 이상 입력하세요.";
  if (!content.phases.some((phase) => phase.finalInterrogation)) return "최종 추리 페이즈가 필요합니다.";
  for (const question of content.sharedQuestions ?? []) {
    if (!question.clueIds.length) return `${question.suspectName}: 신문 단서를 선택하세요.`;
    if (question.clueIds.length > MAX_INTERROGATION_CLUES) return `${question.suspectName}: 신문 단서는 최대 ${MAX_INTERROGATION_CLUES}개까지 선택하세요.`;
    if (scriptLines(question.base.answer).every((line) => !line.text.trim())) return `${question.suspectName}: 신문 답변을 입력하세요.`;
  }
  const allNames = [...suspectNames, ...(content.people ?? []).map((person) => person.name)];
  if (new Set(allNames).size !== allNames.length || (content.people ?? []).some((person) => !person.name.trim())) {
    return "인물 이름이 비었거나 중복되었습니다.";
  }
  for (const phase of content.phases) {
    if (phase.fallbackAnswers && phase.fallbackAnswers.some((answer) => scriptLines(answer).every((line) => !line.text.trim()))) {
      return `${phase.title}: 기본 응답 대사를 입력하세요.`;
    }
    if (phase.finalInterrogation && phase.combinations.length) {
      return `${phase.title}: 최종 추리에서는 단서 연결을 추가할 수 없습니다.`;
    }
    if (scriptLines(phase.intro).every((line) => !line.text.trim())) {
      return `${phase.title}: 페이즈 시작 대사를 입력하세요.`;
    }
    for (const interrogation of phase.interrogations) {
      if (interrogation.fallbackAnswers?.some((answer) => scriptLines(answer).every((line) => !line.text.trim()))) {
        return `${phase.title} · ${interrogation.suspectName}: 기본 응답 대사를 입력하세요.`;
      }
      const choiceIds = new Set<string>();
      for (const choice of interrogation.conversationChoices ?? []) {
        if (!choice.id || choiceIds.has(choice.id)) {
          return `${phase.title} · ${interrogation.suspectName}: 선택지 ID가 비었거나 중복되었습니다.`;
        }
        choiceIds.add(choice.id);
        if (!choice.question.trim() || scriptLines(choice.answer).every((line) => !line.text.trim())) {
          return `${phase.title} · ${interrogation.suspectName}: 대화 선택지와 답변을 입력하세요.`;
        }
      }
      for (const question of interrogation.questions) {
        if (phase.finalInterrogation && question.revealedEvidence) {
          return `${phase.title}: 최종 추리에서는 새 단서를 획득할 수 없습니다.`;
        }
        if (!question.evidenceId && !question.evidenceIds?.length) {
          return `${phase.title} · ${interrogation.suspectName}: 신문 단서를 선택하세요.`;
        }
        if ((question.evidenceIds?.length ?? (question.evidenceId ? 1 : 0)) > MAX_INTERROGATION_CLUES) {
          return `${phase.title} · ${interrogation.suspectName}: 신문 단서는 최대 ${MAX_INTERROGATION_CLUES}개까지 선택하세요.`;
        }
        if (scriptLines(question.answer).every((line) => !line.text.trim())) {
          return `${phase.title} · ${interrogation.suspectName}: 신문 답변을 입력하세요.`;
        }
      }
    }
  }
  try {
    validateInterrogationPhases("psychic", content.phases, allNames);
    return null;
  } catch (error) {
    return error instanceof Error ? error.message : "콘텐츠를 확인해 주세요.";
  }
}

export function isEditableContent(value: unknown): value is EditableInterrogationContent {
  const record = (item: unknown): item is Record<string, unknown> =>
    Boolean(item && typeof item === "object" && !Array.isArray(item));
  const strings = (item: unknown): item is string[] =>
    Array.isArray(item) && item.every((entry) => typeof entry === "string");
  const line = (item: unknown) => typeof item === "string" ||
    (record(item) && typeof item.text === "string" &&
      (item.speaker === undefined || typeof item.speaker === "string") &&
      (item.portrait === undefined || typeof item.portrait === "string"));
  const script = (item: unknown) => typeof item === "string" ||
    (Array.isArray(item) && item.every(line));
  const evidence = (item: unknown) => record(item) &&
    typeof item.id === "string" && typeof item.title === "string" &&
    typeof item.description === "string" &&
    (item.image === undefined || typeof item.image === "string");
  const choice = (item: unknown) => record(item) &&
    typeof item.id === "string" && typeof item.question === "string" && script(item.answer);
  const question = (item: unknown) => record(item) &&
    typeof item.id === "string" && (item.prompt === undefined || typeof item.prompt === "string") && script(item.answer) &&
    (item.evidenceId === undefined || typeof item.evidenceId === "string") &&
    (item.evidenceIds === undefined || strings(item.evidenceIds)) &&
    (item.revealedEvidence === undefined || evidence(item.revealedEvidence)) &&
    (item.challenge === undefined || (record(item.challenge) &&
      typeof item.challenge.evidenceId === "string" && script(item.challenge.response) &&
      (item.challenge.revealedEvidence === undefined || evidence(item.challenge.revealedEvidence))));
  const interrogation = (item: unknown) => record(item) &&
    typeof item.suspectName === "string" &&
    (item.conversation === undefined || script(item.conversation)) &&
    (item.fallbackAnswers === undefined || (Array.isArray(item.fallbackAnswers) && item.fallbackAnswers.every(script))) &&
    (item.conversationChoices === undefined || (Array.isArray(item.conversationChoices) && item.conversationChoices.every(choice))) &&
    Array.isArray(item.questions) && item.questions.every(question);
  const location = (item: unknown) => record(item) &&
    typeof item.id === "string" && typeof item.title === "string" &&
    typeof item.x === "number" && typeof item.y === "number";
  const personProfile = (item: unknown) => record(item) && typeof item.name === "string" &&
    (item.image === undefined || typeof item.image === "string") &&
    (item.description === undefined || typeof item.description === "string") &&
    (item.canInterrogate === undefined || typeof item.canInterrogate === "boolean");
  const mapPerson = (item: unknown) => record(item) && typeof item.name === "string" &&
    typeof item.x === "number" && typeof item.y === "number";
  const source = (item: unknown) => record(item) &&
    typeof item.id === "string" && (item.locationId === undefined || typeof item.locationId === "string") &&
    (item.versionPhaseId === undefined || typeof item.versionPhaseId === "string") &&
    typeof item.title === "string" &&
    (item.password === undefined || typeof item.password === "string") &&
    (item.x === undefined || typeof item.x === "number") &&
    (item.y === undefined || typeof item.y === "number") && evidence(item.evidence);
  const sourceState = (item: unknown) => record(item) &&
    typeof item.x === "number" && typeof item.y === "number" &&
    typeof item.title === "string" &&
    (item.password === undefined || typeof item.password === "string") && evidence(item.evidence);
  const sharedSource = (item: unknown) => record(item) && typeof item.id === "string" &&
    (item.number === undefined || (Number.isInteger(item.number) && (item.number as number) > 0)) &&
    strings(item.visiblePhaseIds) && sourceState(item.base) &&
    record(item.changes) && Object.values(item.changes).every(sourceState) &&
    record(item.sourceIds) && Object.values(item.sourceIds).every((id) => typeof id === "string") &&
    record(item.order) && Object.values(item.order).every((index) => typeof index === "number");
  const questionState = (item: unknown) => record(item) &&
    script(item.answer) &&
    (item.revealedEvidence === undefined || evidence(item.revealedEvidence));
  const sharedQuestion = (item: unknown) => record(item) &&
    typeof item.id === "string" && typeof item.suspectName === "string" &&
    strings(item.clueIds) && strings(item.visiblePhaseIds) && questionState(item.base) &&
    record(item.changes) && Object.values(item.changes).every(questionState) &&
    record(item.questionIds) && Object.values(item.questionIds).every((id) => typeof id === "string") &&
    record(item.evidenceRefs) && Object.values(item.evidenceRefs).every(strings) &&
    record(item.order) && Object.values(item.order).every((index) => typeof index === "number");
  const combination = (item: unknown) => record(item) &&
    typeof item.id === "string" && strings(item.evidenceIds) && item.evidenceIds.length === 2 &&
    typeof item.explanation === "string" && evidence(item.result);
  const phase = (item: unknown) => record(item) &&
    typeof item.id === "string" && typeof item.title === "string" && script(item.intro) &&
    (item.timeLabel === undefined || typeof item.timeLabel === "string") &&
    (item.energyLimit === undefined || typeof item.energyLimit === "number") &&
    (item.mapImage === undefined || typeof item.mapImage === "string") &&
    (item.finalInterrogation === undefined || typeof item.finalInterrogation === "boolean") &&
    (item.fallbackAnswers === undefined || (Array.isArray(item.fallbackAnswers) && item.fallbackAnswers.every(script))) &&
    Array.isArray(item.locations) && item.locations.every(location) &&
    (item.people === undefined || (Array.isArray(item.people) && item.people.every(mapPerson))) &&
    Array.isArray(item.sources) && item.sources.every(source) &&
    Array.isArray(item.combinations) && item.combinations.every(combination) &&
    Array.isArray(item.interrogations) && item.interrogations.every(interrogation) &&
    strings(item.requiredCombinationIds) && strings(item.requiredQuestionIds);

  return record(value) && Array.isArray(value.prologue) && value.prologue.every(line) &&
    Array.isArray(value.phases) && value.phases.length > 0 && value.phases.every(phase) &&
    (value.people === undefined || (Array.isArray(value.people) && value.people.every(personProfile))) &&
    (value.fallbackAnswers === undefined || (Array.isArray(value.fallbackAnswers) && value.fallbackAnswers.every(script))) &&
    (value.sharedSources === undefined || (Array.isArray(value.sharedSources) && value.sharedSources.every(sharedSource))) &&
    (value.sharedQuestions === undefined || (Array.isArray(value.sharedQuestions) && value.sharedQuestions.every(sharedQuestion)));
}

export function toInterrogationTypeScript(content: EditableInterrogationContent) {
  const gameContent = { prologue: content.prologue, phases: content.phases, fallbackAnswers: content.fallbackAnswers, people: content.people };
  return [
    'import type { InterrogationScenarioType } from "@/types";',
    "",
    'export const psychicInterrogationContent: Pick<InterrogationScenarioType, "prologue" | "phases" | "fallbackAnswers" | "people"> =',
    `  ${JSON.stringify(gameContent, null, 2)};`,
    "",
  ].join("\n");
}
