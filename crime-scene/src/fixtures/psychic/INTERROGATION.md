# 초능력자 사건 심문 콘텐츠 작성

단계·조사 단서는 [interrogation.ts](./interrogation.ts), 신문 탭의 단서 조합별 질문·답변과 폴백 답변은 [interrogationQuestions.ts](./interrogationQuestions.ts)에서 관리합니다. 기존 검색형 단서 파일인 `clues.ts`는 새 화면에서 사용하지 않습니다.

프롤로그 대사는 글자가 차례로 나타나며, 클릭하거나 Enter/Space로 다음 대사로 넘어갑니다. 마지막 대사 다음에는 지도가 열립니다. `prologue`에는 문자열이나 `{ speaker, text, portrait }` 형식의 대사를 넣을 수 있습니다.

현재 초능력자 시나리오는 **오전 8시 → 오후 1시 → 오후 7시 → 다음 날 자정 → 최종 추리** 순서입니다. 조사와 심문은 각각 에너지 1을 사용합니다. 에너지를 모두 쓰면 다음 페이즈로 진행할 수 있고, 경고를 본 뒤에도 계속 행동할 수 있습니다. 마지막 페이즈는 심문과 답변 제출만 가능합니다.

단서를 확보하면 용의자 또는 생존한 소장에게 단서 조합 하나를 제시해 신문할 수 있습니다. 선택한 단서 전체와 정확히 일치하는 인물·단서 조합은 `psychicInterrogationAnswers`의 대사 한 묶음으로, 없는 조합은 `psychicInterrogationFallbackAnswers`의 무작위 대사 한 묶음으로 응답합니다. 동일한 단서 ID의 내용이 시간에 따라 변할 수 있으므로 저장 키는 `페이즈 ID::단서 ID` 형식입니다. 획득 기록은 각각 단서함에 남고, 이전 페이즈의 조사 지점은 지도에서 사라집니다.

단서함은 게임 안의 별도 탭이며 조사 단서와 인물 카드의 내용 열람만 가능합니다. 지도에서 단서를 누르면 해당 단서의 상세 모달이 열립니다. 신문 탭에서는 상단에서 인물을 선택하고 왼쪽 단서 그리드에서 여러 단서를 고른 뒤 오른쪽 신문 버튼을 누릅니다. 선택 단서 수와 관계없이 신문 한 번에 에너지 1을 사용합니다. 질문에 `revealedEvidence`를 지정하면 대사가 끝난 뒤 새 단서를 획득합니다. 일반 대화는 지도 인물을 눌러 진행하며 에너지 1을 사용합니다. 각 페이즈 `interrogations` 항목의 `conversation`에 일반 대사를 작성할 수 있습니다.

지도에서는 작은 점이 조사 단서를, 인물 사진이 대화 상대를 뜻합니다. 지도 인물 사진을 누르면 지도 위에서 일반 대화만 열립니다.

`intro`, 일반 대화 `conversation`, 질문 `answer`, 반박 `challenge.response`에는 한 줄 문자열이나 여러 대사의 배열을 넣을 수 있습니다. 배열은 문자열과 `{ speaker, text, portrait }` 객체를 섞어 쓸 수 있으며, 플레이어가 각 줄을 눌러 다음 대사로 넘깁니다.

```ts
{
  id: "phase-1",
  title: "첫 번째 조사",
  intro: ["첫 번째 독백", "다음 독백"],
  timeLabel: "4월 14일 오전 8시",
  energyLimit: 3,
  mapImage: "/image/scenario/psychic/map/lab-map.svg",
  locations: [
    { id: "room-a", title: "조사할 장소", x: 50, y: 50 },
  ],
  sources: [
    {
      id: "p1-source-a",
      locationId: "room-a",
      x: 48,
      y: 52,
      title: "조사할 장소나 기록",
      description: "조사하기 전 화면에 보일 설명",
      evidence: {
        id: "p1-evidence-a",
        title: "획득할 단서",
        description: "조사 후 단서함에 표시할 내용",
        image: "/image/scenario/psychic/clue/example.png",
      },
    },
    // 연결할 두 번째 단서도 추가
  ],
  combinations: [
    {
      id: "p1-combination-a",
      evidenceIds: ["phase-1::p1-evidence-a", "phase-1::p1-evidence-b"],
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
      conversation: [{ speaker: "나", text: "잠깐 이야기할 수 있나요?" }, "네, 말씀하세요."],
      questions: [
        {
          id: "p1-a-question-a",
          evidenceIds: ["phase-1::p1-evidence-a", "phase-1::p1-evidence-b"],
          prompt: "용의자에게 할 질문",
          answer: ["처음에 듣는 진술", "다음에 듣는 진술"],
          revealedEvidence: {
            id: "p1-answer-clue",
            title: "조합으로 얻은 단서",
            description: "신문 대사가 끝나면 단서함에 들어갈 내용",
          },
          challenge: {
            evidenceId: "phase-1::p1-inference-a",
            response: ["맞는 단서를 제시했을 때 바뀌는 진술", "이어지는 진술"],
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
  requiredCombinationIds: [],
  requiredQuestionIds: [],
}
```

- `challenge`가 없는 질문은 진술을 듣는 즉시 해결됩니다. `challenge`가 있으면 해당 단서를 제시해야 해결됩니다.
- 지도 이미지는 `mapImage`로 교체할 수 있습니다. 지도 점 하나가 `source` 하나를 열며, `source.x`와 `source.y`는 화면이 아닌 지도 이미지의 너비와 높이에 대한 백분율입니다. 지도와 점은 같은 16:9 좌표 영역에서 함께 크기가 바뀝니다. 좌표가 없으면 같은 `locationId`의 단서들을 해당 장소 주변에 자동으로 나누어 표시합니다.
- 에너지를 모두 쓰면 다음 페이즈 버튼이 나타납니다. `requiredCombinationIds`와 `requiredQuestionIds`는 별도의 조기 진행 조건으로 사용할 수 있습니다.
- 같은 단서 ID는 다른 페이즈에서 다시 쓸 수 있습니다. 조합 입력과 질문의 `evidenceId`/`evidenceIds`는 `페이즈 ID::단서 ID` 형식이며, 단서 선택 순서는 결과에 영향을 주지 않습니다. `suspectName`은 인물 또는 소장 데이터의 이름과 같아야 합니다. 잘못된 참조는 빌드 중 오류가 납니다.
- 진행 상황은 브라우저의 `interrogation-psychic-v3` 저장 키에 보관되고 최종 답변 제출 시 삭제됩니다. 제출 답변은 결과 화면을 위해 별도 저장됩니다. 콘텐츠 구조를 크게 바꿔 이전 진행과 호환되지 않으면 저장 키의 버전을 올리세요.
- 현재 대사와 단서는 흐름 검증용 placeholder입니다. 정식 원고가 오면 `interrogation.ts`, `interrogationQuestions.ts`, `suspects.ts`, `answer.tsx`의 내용을 교체하세요.
