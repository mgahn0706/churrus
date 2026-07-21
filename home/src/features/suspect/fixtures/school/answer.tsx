import { createScenarioReveal } from "@/features/suspect/components/createScenarioReveal";
import { schoolAdditionalQuestions } from "@/features/suspect/fixtures/school/additionalQuestions";
import { ScenarioAnswerConfig } from "@/features/suspect/types/answerPage";

export const schoolAnswerConfig: ScenarioAnswerConfig = {
  scenarioKey: "school",
  missingDescription: (
    <>
      아직 와부고 살인사건의 진범이 지목되지 않았습니다. <br />
      게임을 진행해서 진범을 찾아주세요.
    </>
  ),
  reveal: createScenarioReveal({
    culprit: "손민혜",
    imageSrc: "/image/suspect/scenario/school/school-reveal.png",
    methodText:
      "클로로포름으로 마취시킨 후 의료용 고무줄로 교살한 뒤 수면제를 먹여 자살로 위장",
    motiveText: "마약 유통 사실을 들켜 본인의 마약 수급은 물론 생명까지 위험해졌다.",
    accusedText: (submittedAnswer) =>
      `${submittedAnswer.accusedSuspect}${
        submittedAnswer.accusedSuspect === "자살" ? "은" : ""
      }`,
    showYouText: (submittedAnswer) => submittedAnswer.accusedSuspect !== "자살",
    targetText: (submittedAnswer) =>
      submittedAnswer.accusedSuspect === "자살"
        ? "박현성의 사인이"
        : "박현성을 살해한 범인이",
    isCorrect: (submittedAnswer) => submittedAnswer.accusedSuspect === "손민혜",
    resultText: (submittedAnswer) =>
      submittedAnswer.accusedSuspect === "손민혜" ? "맞습니다!" : "아닙니다!",
  }),
  confess: (
    <>
      네, 제가 죽였어요. <br />
      아직도 많이 후회하고 있어요. 이게 다 그때 급식...아니 마약 때문에 시작된
      일이거든요. <br />
      저는 화학실험 동아리 활동을 명분 삼아 펜타닐 제조에 필수적인 4-ANPP 물질,
      은어로는 '급식'을 만들고 있었어요. 최근에 한 클라이언트가 SA학원에서 해당
      원료를 구하고 싶다고 했었고, 저는 저희 조직의 명령에 따라 그 빌딩 안으로
      원료를 전달해야했어요. <br />
      하지만 그 빌딩은 그 학원 수강생만 들어갈 수 있는 곳이었고, 저는 박현성을
      이용하기로 했어요. <br />
      그 친구는 봉사 점수가 필요하니까, '도시락 전달 봉사'를 핑계로 클라이언트에게
      '마약이 든 도시락'을 전달해주면 될거라 생각했죠. 하지만 이건 잘못된
      생각이었어요. <br />
      박현성은 어디서 구했는진 모르겠지만 락픽과 렌치를 이용해, 냉동창고에 있던
      도시락에 걸려있던 자물쇠를 풀었죠. 그리고 안에 있던 내용물을 봐버렸나봐요.
      그날 전달된 도시락에는 아이스팩이 빠져있어서 급식이 변질되었고, 자물쇠도
      안달린 채 전달이 되었어요. 그날 조직원 두목께서 급식이 상했다면서, 앞으로
      너에게 줄 돈과 급식은 없다고. 지금 클라이언트가 너때문에 사망했다면서 살해
      협박을 하더라고요. <br />
      제 생명이 위험해졌어요. 전 이미 급식에 중독되어있었고 그 금단현상은
      너무너무 절 고통스럽게 하더군요. <br />
      그래서 저는 박현성을 죽이기로 했어요. <br />
      그것만이 제 금단증상을 막고, 목숨을 구할 방법이라고 생각했거든요. 그래서
      박현성을 석식 후 생명실로 유인해 마취한 후, 평소 투약에 사용하던 의료용
      고무줄로 교살했어요. 그러고는 교실로 옮겨 자살로 위장했죠. 전 완벽했다고
      생각했어요. <br />
      지금도 손이 떨려요. 금단증상인지, 후회인지, 아니면 내 자신에 대한
      경멸때문일지는 모르겠어요.
    </>
  ),
  additional: schoolAdditionalQuestions.map((item, index) => ({
    question: `Q${index + 1}. ${item.question}`,
    answer: `A. ${item.answer}`,
  })),
  solution: (
    <>
      박현성이 살해된 방법에는 세가지 요소가 있습니다. 클로로포름, 혼자 있었다는
      것, 그리고 자살로 위장되었다는 점입니다. <br />
      먼저, 범인은 클로로포름을 사용할 수 있어야합니다. 9월 1일에 들어온
      클로로포름이 동아리 활동 없이 이미 1병이 비워졌다는 것은, 범인이 생명실
      실험장의 클로로포름을 사용했다는 뜻이죠. <br />
      생명실의 실험장 열쇠는 총 2개입니다. 마스터키와 박현성의 열쇠죠. 이때,
      실험장의 유리창과 박현성의 열쇠의 유리조각으로, 박현성의 열쇠가 실험장에
      꽂힌 도중에 습격이 이루어졌음을 알 수 있습니다. 즉, 범인은 클로로포름을
      박현성이 실험장을 열기 이전에 구할 수 있었다는 뜻이고, 하루종일 걸려있었던
      박현성의 열쇠대신, 마스터키로 클로로포름을 미리 구했다는 뜻이 됩니다.
      <br />
      즉, 마스터키를 미리 가져가지 않은 유지현은 범인에서 제외됩니다. <br />
      두번째로, 범인은 박현성을 혼자 있도록 해야했습니다. 그래서 박현성에게
      '전지를 오늘까지 준비해야한다'는 거짓 정보를 말해줬고 의도적으로 박현성을
      혼자 동아리 준비를 하도록 만들었습니다. 현태민에게 보낸 문자를 통해
      현태민이 이 정보를 흘린 것이 아님을 알 수 있습니다. <br />
      박현성은 선생님과의 문자에서 '바로' 생명실로 간다했고, 생명실에서 습격을
      받았으므로 사망 추정시간은 7시 40분~8시로 좁혀집니다. 현태민은 이때
      알리바이상으로 범인에서 제외됩니다. <br />
      7시부터 7시 20분까지, 현태민에게는 알리바이가 없고, 그때 클로로포름을
      가져왔다고 합시다. 현태민은 위클리 와부 인쇄를 위해 7시 20분부터 45분까지
      동아리실에 있었습니다. 자습실로 돌아온 47분, 2분안에 살인을 저지르기엔
      쉽지 않습니다. <br />
      이후 8시 10분에 죽였다고 하기에는, 이미 동아리 활동이 준비된 이후일
      것입니다. 현태민은 30분이면 활동 준비가 끝날 것임을 알고 있었기 때문에 더욱
      미리 준비를 했을 것입니다. <br />
      즉, 7시 40분~8시 사이에 알리바이가 없고 클로로포름을 가져올 수 있었던 사람은
      손민혜 뿐입니다. <br />
      마지막으로, 살해동기가 크며 '자살로 위장'해야했었던 사람은 손민혜가
      유일합니다. 결정적 증거는 손민혜가 시체 발견 당시 손에 들고 있었던
      물컵입니다. 그 물컵은 정수기에서만 쓰이는 컵으로, 굳이 다른 곳에 들고갈
      이유가 없습니다. 이는 손민혜가 물을 마시는 목적이 아니라 다른 목적으로 컵을
      들고 갔음을 의미합니다. 아마, 박현성이 수면제를 먹기 위해서는 물컵이 꼭
      필요했다는 것을 자습실에 돌아오고 나서야 깨달았던 것 같네요.
    </>
  ),
  culpritsHref:
    "https://drive.google.com/file/d/1_eUjJDHCuuSfHP-pe6XVwE7d98-2KmkF/view?usp=drive_link",
  culpritsTabLabel: "용의자 롤카드",
};
