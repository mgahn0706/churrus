# 초능력자 사건 심문 콘텐츠 작성

관리 화면: `/scenarios/scenario/psychic/admin`

관리 화면에서 프롤로그, 페이즈, 지도 장소와 좌표 미리보기, 조사 단서와 사진 경로, 인물 대화, 대화 선택지, 단서 조합별 신문, 폴백 응답을 편집할 수 있습니다. 초안은 해당 브라우저에 자동 저장됩니다. `초안 JSON`으로 백업하고 `초안 불러오기`로 복원할 수 있습니다. 완성 후 `TS 파일 저장` 또는 `코드 복사`로 내보내고, 결과를 `src/fixtures/psychic/interrogation.ts`에 적용하면 게임에 반영됩니다. 내보낸 TS 파일은 현재 원고를 완성된 데이터 형태로 펼쳐서 저장합니다. 브라우저 초안만 바꿔서는 게임 데이터가 변경되지 않습니다.

프롤로그, 페이즈별 독백, 조사 단서, 단서 조합별 신문 질문·답변, 인물 대화 선택지, 폴백 답변은 [interrogation.ts](./interrogation.ts) 한 파일에서 관리합니다. 각 페이즈의 `intro` 아래에 `sources`와 `interrogations(...)`가 이어집니다. 인물의 기본 대화와 선택지는 `phaseDialogues`에서 페이즈별로 작성합니다. 기존 검색형 단서 파일인 `clues.ts`는 새 화면에서 사용하지 않습니다.

최종 제출의 선택 사항인 추가 질문은 A·B·C 각각의 초능력과 본명입니다. 비워 두어도 제출할 수 있습니다. 정답과 임시 본명은 [additionalQuestions.ts](./additionalQuestions.ts)에서 관리하며, 본명은 조사 단서에서도 확인할 수 있습니다. 제출한 답변은 결과 화면의 `추가 질문 해답` 탭에서 정답과 함께 표시됩니다.

프롤로그 대사는 글자가 차례로 나타나며, 클릭하거나 Enter/Space로 다음 대사로 넘어갑니다. 마지막 대사 다음에는 지도가 열립니다. `prologue`에는 문자열이나 `{ speaker, text, portrait }` 형식의 대사를 넣을 수 있습니다.

현재 초능력자 시나리오는 **오전 8시 → 오후 1시 → 오후 7시 → 다음 날 자정 → 최종 추리** 순서입니다. 조사와 심문은 각각 에너지 1을 사용합니다. 에너지가 남아 있어도 다음 페이즈로 진행할 수 있고, 모두 쓰면 경고를 본 뒤에도 계속 행동할 수 있습니다. 마지막 페이즈는 심문과 답변 제출만 가능합니다.

단서를 확보하면 용의자 또는 생존한 소장에게 단서 조합 하나를 제시해 신문할 수 있습니다. 선택한 단서 전체와 정확히 일치하는 인물·단서 조합은 해당 페이즈의 `interrogations(...)`에 적힌 대사 한 묶음으로 응답합니다. 없는 조합은 해당 페이즈의 `fallbackAnswers` 중 무작위로 응답하며, 비어 있으면 시나리오 공통 `fallbackAnswers`를 사용합니다. 동일한 단서 ID의 내용이 시간에 따라 변할 수 있으므로 저장 키는 `페이즈 ID::단서 ID` 형식입니다. 획득 기록은 각각 단서함에 남고, 이전 페이즈의 조사 지점은 지도에서 사라집니다.

관리 화면의 신문 조합은 단서 이름과 내용을 검색해 체크박스로 선택합니다. 선택 결과는 이름으로 표시되며, 저장 시 필요한 단서 ID는 자동으로 기록됩니다.

단서함은 게임 안의 별도 탭이며 조사 단서와 인물 카드의 내용 열람만 가능합니다. 지도에서 단서를 누르면 해당 단서의 상세 모달이 열립니다. 신문 탭에서는 상단에서 인물을 선택하고 왼쪽 단서 그리드에서 여러 단서를 고른 뒤 오른쪽 신문 버튼을 누릅니다. 선택 단서 수와 관계없이 신문 한 번에 에너지 1을 사용합니다. 질문에 `revealedEvidence`를 지정하면 대사가 끝난 뒤 새 단서를 획득합니다. 지도 인물을 눌러 일반 대화를 시작하는 데는 에너지가 들지 않고, 대화 선택지로 질문할 때마다 에너지 1을 사용합니다. 대화 선택지는 페이즈마다 별개이며 관리 화면에서 현재 페이즈와 인물을 선택해 수정합니다.

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
  ],
  combinations: [],
  interrogations: interrogations("phase-1", [
    {
      suspectName: "실험체 A",
      evidenceIds: ["phase-1::p1-evidence-a", "phase-1::p1-evidence-b"],
      prompt: "용의자에게 할 질문",
      answer: ["처음에 듣는 진술", "다음에 듣는 진술"],
      revealedEvidence: {
        id: "p1-answer-clue",
        title: "조합으로 얻은 단서",
        description: "신문 대사가 끝나면 단서함에 들어갈 내용",
      },
    },
  ]),
  requiredCombinationIds: [],
  requiredQuestionIds: [],
}
```

- `challenge`가 없는 질문은 진술을 듣는 즉시 해결됩니다. `challenge`가 있으면 해당 단서를 제시해야 해결됩니다.
- 지도 이미지는 `mapImage`로 교체할 수 있습니다. 설정 탭 지도에서 번호가 붙은 주황색 단서를 드래그하면 위치가 저장됩니다. `source.x`와 `source.y`는 화면이 아닌 지도 이미지의 너비와 높이에 대한 백분율입니다. 지도와 점은 같은 16:9 좌표 영역에서 함께 크기가 바뀝니다. 좌표가 없으면 같은 `locationId`의 단서들을 해당 장소 주변에 자동으로 나누어 표시합니다.
- 다음 페이즈 버튼은 항상 나타납니다. `requiredCombinationIds`와 `requiredQuestionIds`는 콘텐츠 검증과 별도 진행 조건에 사용할 수 있지만, 현재 화면 이동을 막지는 않습니다.
- `combinations`는 기존 엔진의 단서 합성 규칙을 위한 필드입니다. 현재 초능력자 시나리오에서는 모두 빈 배열이며, 관리자 화면에서는 새 규칙을 만들지 않습니다. 이전 초안에 규칙이 있으면 기존 항목만 편집할 수 있습니다. 신문에서 여러 단서를 선택하는 기능은 `interrogations`에서 관리합니다.
- 같은 단서 ID는 다른 페이즈에서 다시 쓸 수 있습니다. 조합 입력과 질문의 `evidenceId`/`evidenceIds`는 `페이즈 ID::단서 ID` 형식이며, 단서 선택 순서는 결과에 영향을 주지 않습니다. `suspectName`은 인물 또는 소장 데이터의 이름과 같아야 합니다. 잘못된 참조는 빌드 중 오류가 납니다.
- 진행 상황은 브라우저의 `interrogation-psychic-v3` 저장 키에 보관되고 최종 답변 제출 시 삭제됩니다. 제출 답변은 결과 화면을 위해 별도 저장됩니다. 콘텐츠 구조를 크게 바꿔 이전 진행과 호환되지 않으면 저장 키의 버전을 올리세요.
- 현재 대사와 단서는 흐름 검증용 placeholder입니다. 정식 원고가 오면 `interrogation.ts`, `suspects.ts`, `answer.tsx`의 내용을 교체하세요.
