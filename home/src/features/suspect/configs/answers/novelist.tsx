import { createScenarioReveal } from "@/features/suspect/components/createScenarioReveal";
import { ScenarioAnswerConfig } from "@/features/suspect/types/answerPage";

const culprit = "서재승";

export const novelistAnswerConfig: ScenarioAnswerConfig = {
  scenarioKey: "novelist",
  missingDescription: (
    <>
      아직 추리소설가 살인사건의 진범이 지목되지 않았습니다. <br />
      게임을 진행해서 진범을 찾아주세요.
    </>
  ),
  reveal: createScenarioReveal({
    culprit,
    imageSrc: "/image/suspect/scenario/novelist/novelist-reveal.png",
    methodText: "원고 집필을 하던 피해자가 뒤돌아보자 부엌의 식칼로 찔러 살해.",
    motiveText:
      "실화 기반 추리 소설에 집착하던 이환 선생이 추리 소설 집필을 위해 피해자의 형에게 교통사고를 일으킨 것에 대한 복수",
    targetText: "이환을 살해한 범인이",
  }),
  confess: (
    <>
      저는 그날 있었던 일을 있는 그대로 말씀드리겠습니다. 꾸밀 생각도 없고,
      변명할 생각도 없습니다. 2026년 1월 10일 오후 6시쯤, 이환 선생 저택에
      도착했습니다. 제가 가장 먼저 도착했습니다. 선생은 1층 식당에서 저녁 준비를
      하고 있었습니다. <br />
      저는 화장실을 간다고 하고 2층으로 올라갔습니다. 그리고 선생 방에
      들어갔습니다. 방 안을 뒤지다가 2025년 3월 2일자 무통장 입금증을
      발견했습니다. 보내는 사람은 ‘브레이크’, 취급점은 이천이었습니다. 제 형
      사고가 바로 다음 날이었습니다. 브레이크 과열 사고였습니다. 그걸 보는 순간,
      우연이 아니라고 생각했습니다. <br />
      그때부터 표절 문제는 아무 의미 없다고 느꼈습니다. 7시쯤 식사가
      시작됐습니다. 윤찬이 표절 얘기를 꺼냈고... 선생은 처음엔 당황하다가, 곧
      태도를 바꿨습니다. 저희를 몰아붙였고, 대화를 끊고 올라갔습니다. 그 모습을
      보면서 더 확신했습니다. 이 사람은 멈추지 않을 거라고 생각했습니다. 그래서
      그때 죽이기로 했습니다. <br />
      9시 20분쯤, 저는 먼저 자리에서 일어났습니다. 이때 식칼 하나를 가져갔습니다.
      <br />
      10시쯤, 이환 선생이 원고를 쓰기 시작할 때였죠. 저는 2층으로 올가갔습니다.
      문을 열고 들어갔을 때 선생은 책상에 앉아 있었습니다. 저는 뒤에서
      접근했습니다. 선생이 창문에 비친 저를 보고 돌아봤습니다. 그런데 그걸 보고도
      멈추지는 않았습니다. 오른손으로 칼을 들고, 오른쪽 가슴을 찔렀고, 선생은
      바로 쓰러졌습니다. 칼은 그대로 둔 상태였습니다. <br />
      그때 노크 소리가 났습니다. 10시 5분쯤이었습니다. 류인영 목소리였습니다.
      숨을 곳이 없어 문 뒤에 섰지만, 창문에 제 모습이 비치는 게 보여서, 바로
      창문을 열었습니다. <br />
      류인영이 들어와 시신을 보고 사진을 찍고 나갔습니다. 계단 내려가는 소리를
      확인하고 바로 방을 나와 제 방으로 돌아갔습니다. 대략 10시 10분쯤이었습니다.
      뭐, 이제 다 끝났군요. 제가 범인입니다. 후회는 없어요.
    </>
  ),
  additional: [
    {
      question: "Q1. 홍차에서 검출된 것은 무엇인가요?",
      answer: "수면제 계열 진정 성분",
      showSubmittedAnswer: false,
    },
    {
      question: "Q2. 8시 41분 원고 파일을 수정한 계정은 무엇인가요?",
      answer: "YH-Editorial",
      showSubmittedAnswer: false,
    },
    {
      question: "Q3. 오민지의 USB는 무엇을 보여주나요?",
      answer: "오민지가 먼저 초고를 갖고 있었고, 표절 방향이 반대였을 가능성",
      showSubmittedAnswer: false,
    },
    {
      question: "Q4. 서윤호의 압박은 무엇이었나요?",
      answer: "신작 계약이 무산되면 실적과 편집장 지위를 잃을 위기",
      showSubmittedAnswer: false,
    },
  ],
  solution: (
    <>
      핵심은 세 가지입니다. 첫째, 강도현은 8시 24분에 건물을 나가 범행 시각에서
      벗어납니다. 둘째, 오민지의 USB는 표절 의혹의 방향을 뒤집어 오히려 그녀의
      동기를 약화시킵니다. 셋째, 서윤호만이 계약 파탄이라는 직접적 위기를 안고
      있었고, 원고 파일 수정 기록과 엘리베이터 CCTV 중단 기록까지 남겼습니다.
      <br />
      피해자를 무력화한 수단도 홍차 속 수면제로 설명됩니다. 외상이 거의 없고
      질식 정황이 남은 점까지 합치면, 서윤호가 대화 도중 약을 먹인 뒤 현장을
      조작하려 했다는 결론이 가장 자연스럽습니다.
    </>
  ),
  culpritsHref:
    "https://drive.google.com/file/d/19D-XLQMvKY4fHwt4peS2L-3HbY-s4Ipr/view?usp=drive_link",
};
