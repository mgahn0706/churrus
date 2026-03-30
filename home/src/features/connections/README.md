# Connections Fixture Generator

`Connections` 신규 데이터는 `2026`년부터 텍스트 파일로 관리하고, 스크립트로 TypeScript fixture를 생성한다.

## 파일 위치

- 원본 텍스트: `src/features/connections/fixtures/raw/{year}.txt`
- 생성 결과: `src/features/connections/fixtures/{year}/index.ts`
- 실행 스크립트: `src/features/connections/generateFixtures.ts`

## 실행 방법

`home` 디렉터리에서 아래 명령을 실행한다.

```bash
npm run connections
```

이 명령은 `fixtures/raw` 아래의 `2026` 이상 연도 파일을 모두 읽어서 fixture를 다시 생성한다.

특정 연도만 다시 만들고 싶으면 연도를 인자로 넘긴다.

```bash
npm run connections -- 2027
```

스크립트는 연도별 fixture 파일만 만든다. 상위 `src/features/connections/fixtures/index.ts` 연결은 필요하면 사람이 직접 수정한다.

## 텍스트 포맷

한 파일은 여러 `week` 블록으로 구성한다.

```txt
week: 1
미국의 대통령의 성 | 트럼프, 루스벨트, 링컨, 워싱턴
색깔 | 시안, 스칼렛, 크림슨, 베이지
뮤지컬 제목 | 시카고, 레미제라블, 마틸다, 렌트
체스 기물로 끝나는 단어 | 다크나이트, 할리퀸, 버거킹, 스마트폰
```

규칙은 아래와 같다.

- 각 `week`에는 정확히 4개의 문제 줄이 있어야 한다.
- 각 문제 줄은 `설명 | 단어1, 단어2, 단어3, 단어4` 형식이어야 한다.
- 빈 줄은 허용한다.
- `#`으로 시작하는 줄은 주석으로 무시한다.
- 형식이 잘못되면 몇 번째 줄에서 실패했는지 에러가 출력된다.

## 운영 범위

- `2024` 이하 기존 fixture 파일은 이 스크립트의 관리 대상이 아니다.
- `2026+` 신규 데이터만 텍스트에서 생성한다고 가정한다.
