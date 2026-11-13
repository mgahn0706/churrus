# 초능력자 사건 심문 콘텐츠 작성

실제 내용은 [interrogation.ts](./interrogation.ts)의 `psychicInterrogationContent`에 넣습니다. 기존 검색형 단서 파일인 `clues.ts`는 새 화면에서 사용하지 않습니다.

프롤로그 대사는 글자가 차례로 나타나며, 클릭하거나 Enter/Space로 다음 대사로 넘어갑니다. 마지막 대사 다음에는 지도가 열립니다. `prologue`에는 문자열이나 `{ speaker, text, portrait }` 형식의 대사를 넣을 수 있습니다.

한 페이즈의 진행 순서는 **지도에서 장소 선택 → 단서 수집 → 단서 두 개 연결 → 용의자에게 질문 → 필요한 진술 해결 → 다음 페이즈**입니다. 조사와 조합으로 얻은 단서는 뒤 페이즈에서도 사용할 수 있습니다.

```ts
{
  id: "phase-1",
  title: "첫 번째 조사",
  intro: "이 페이즈의 상황 설명",
  mapImage: "/image/scenario/psychic/map/lab-map.svg",
  locations: [
    { id: "room-a", title: "조사할 장소", x: 50, y: 50 },
  ],
  sources: [
    {
      id: "p1-source-a",
      locationId: "room-a",
      title: "조사할 장소나 기록",
      description: "조사하기 전 화면에 보일 설명",
      evidence: {
        id: "p1-evidence-a",
        title: "획득할 단서",
        description: "조사 후 단서함에 표시할 내용",
      },
    },
    // 연결할 두 번째 단서도 추가
  ],
  combinations: [
    {
      id: "p1-combination-a",
      evidenceIds: ["p1-evidence-a", "p1-evidence-b"],
      result: {
        id: "p1-inference-a",
        title: "새로운 추론",
        description: "단서를 연결해서 알게 된 사실",
      },
      explanation: "왜 두 단서가 이어지는지 설명",
    },
  ],
  interrogations: [
    {
      suspectName: "실험체 A",
      questions: [
        {
          id: "p1-a-question-a",
          prompt: "용의자에게 할 질문",
          answer: "처음에 듣는 진술",
          challenge: {
            evidenceId: "p1-inference-a",
            response: "맞는 단서를 제시했을 때 바뀌는 진술",
            // 선택 사항: 심문으로 새 단서를 획득
            revealedEvidence: {
              id: "p1-reveal-a",
              title: "새로 드러난 단서",
              description: "단서함에 저장할 내용",
            },
          },
        },
      ],
    },
  ],
  requiredCombinationIds: ["p1-combination-a"],
  requiredQuestionIds: ["p1-a-question-a"],
}
```

- `challenge`가 없는 질문은 진술을 듣는 즉시 해결됩니다. `challenge`가 있으면 해당 단서를 제시해야 해결됩니다.
- 지도 이미지는 `mapImage`로 교체할 수 있습니다. 장소 버튼의 `x`, `y`는 이미지 너비와 높이에 대한 백분율입니다. 조사 지점의 `locationId`는 해당 장소의 `id`를 가리킵니다.
- `requiredCombinationIds`와 `requiredQuestionIds`에 적은 항목을 모두 해결해야 다음 페이즈 버튼이 나타납니다. 둘 다 비어 있으면 페이즈를 마칠 수 없습니다.
- 모든 페이즈에서 증거·조합·질문 ID는 고유해야 합니다. 조합 입력은 앞서 얻을 수 있는 단서 ID여야 하고, `suspectName`은 인물 데이터의 이름과 같아야 합니다. 잘못된 참조는 빌드 중 오류가 납니다.
- 진행 상황은 브라우저의 `interrogation-psychic-v2` 저장 키에 보관됩니다. 콘텐츠 구조를 크게 바꿔 이전 진행과 호환되지 않으면 저장 키의 버전을 올리세요.
- 콘텐츠와 정답 화면을 완성한 뒤 `src/fixtures/index.ts`의 `psychic.isInDevelopment`를 `false`로 바꾸면 목록에서 시작할 수 있습니다.
