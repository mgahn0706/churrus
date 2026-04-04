import { CertificationCardType, EpilogueSectionType } from "@/features/suspect/types";
import { scenarios } from "./index";

interface ScenarioCertificationMetaType {
  culprit?: string;
  description: string;
  epilogueTitle: string;
  epilogueSubtitle: string;
  epilogueSections: EpilogueSectionType[];
}

const scenarioCertificationMeta: Record<string, ScenarioCertificationMetaType> = {
  startup: {
    culprit: "김성균",
    description: "추러스 스타트업 오피스를 끝까지 추리한 기록입니다.",
    epilogueTitle: "에필로그: 끝내 공개된 스타트업의 밤",
    epilogueSubtitle:
      "한채원의 죽음 이후, 남겨진 팀과 서비스는 이전과 같은 방식으로 움직일 수 없었다.",
    epilogueSections: [
      {
        heading: "무너진 조직도",
        paragraphs: [
          "김성균의 범행이 드러난 직후, 회사는 대표 공백과 투자 철회 압박을 동시에 맞이했다. 겉으로는 빠르게 돌아가던 조직이 사실은 공포와 침묵 위에 서 있었다는 사실이 알려지자, 팀원들은 비로소 각자 숨겨 두었던 불신을 입 밖으로 꺼내기 시작했다.",
          "한채원이 남긴 메모와 로그 기록은 서비스보다 사람을 먼저 지켜야 한다는 경고처럼 읽혔다. 사건 이후 팀은 제품 발표를 중단하고 내부 진상 기록을 정리하는 데 먼저 시간을 쓰게 된다.",
        ],
      },
      {
        heading: "남겨진 사람들",
        paragraphs: [
          "용의선상에 올랐던 구성원들은 서로를 의심했던 시간을 쉽게 털어내지 못했다. 하지만 사건의 전체 구조가 드러나자, 각자의 사소한 거짓말과 숨김은 범행과는 다른 차원의 비겁함이었다는 점도 분명해졌다.",
          "추러스는 한동안 조용해졌지만, 다시 시작한다면 적어도 이번만큼은 누군가의 불안을 성과로 포장하지 않겠다는 합의가 남았다.",
        ],
      },
    ],
  },
  school: {
    culprit: "손민혜",
    description: "와부고 사건의 진실과 뒤늦은 후일담이 카드에 기록됩니다.",
    epilogueTitle: "에필로그: 와부고에 남은 소문들",
    epilogueSubtitle:
      "사건은 종결되었지만, 교실과 복도에는 오래도록 그날 저녁의 공기가 남아 있었다.",
    epilogueSections: [
      {
        heading: "늦게 도착한 진실",
        paragraphs: [
          "손민혜의 범행은 한 학생의 죽음만이 아니라 학교 안에 숨어 있던 유통 구조와 침묵의 공모까지 끌어올렸다. 학생들은 자신들이 알고도 지나쳤던 장면들을 뒤늦게 연결하기 시작했고, 교사들 역시 관리의 부재를 더는 변명할 수 없게 되었다.",
          "박현성의 죽음은 자살로 덮일 뻔했지만, 끝내 누군가가 남긴 메시지와 이동 동선이 진실을 붙잡았다.",
        ],
      },
      {
        heading: "사건 이후의 학교",
        paragraphs: [
          "생명실은 한동안 폐쇄되었고, 동아리 활동도 잠시 멈췄다. 학생들은 시험 범위보다 사건의 전말을 더 많이 이야기했고, 졸업 이후에도 그날을 기준으로 기억을 나눌 가능성이 컸다.",
          "그래도 사건을 끝까지 추적한 사람들 덕분에, 적어도 박현성은 왜 죽었는지조차 모른 채 잊히지는 않게 되었다.",
        ],
      },
    ],
  },
  jahayeon: {
    culprit: "조노원",
    description: "자하연의 겨울을 통과한 탐정에게 주어지는 수사 인증 카드입니다.",
    epilogueTitle: "에필로그: 얼음 밑에 남은 파문",
    epilogueSubtitle:
      "자하연의 수면은 다시 얼어붙었지만, 그 아래에서 한번 생긴 균열은 쉽게 사라지지 않았다.",
    epilogueSections: [
      {
        heading: "고요해 보였던 연못",
        paragraphs: [
          "조노원의 정체와 김하연의 마지막 동선이 맞물리면서, 사건은 단순한 우발 범행이 아니라 오래 누적된 욕망과 계산의 산물로 정리되었다. 자하연은 다시 조용해졌지만, 그 조용함은 이전과 같은 낭만이 아니라 사건을 알고 난 뒤의 침묵이었다.",
          "연못 주변을 스쳐 지나던 사람들 모두가 조금씩은 무언가를 감추고 있었다는 사실이, 이 사건을 더 차갑게 만들었다.",
        ],
      },
      {
        heading: "겨울이 지나고",
        paragraphs: [
          "남은 인물들은 각자 다른 방식으로 사건을 해석했다. 누군가는 운이 나빴다고 말했고, 누군가는 처음부터 예정된 결말이었다고 말했다.",
          "하지만 탐정의 기록에는 보다 단순한 문장만 남는다. 결국 진실은 가장 많은 설명을 요구하는 사람이 아니라, 가장 많은 흔적을 남긴 사람 쪽에 있었다.",
        ],
      },
    ],
  },
  dure: {
    culprit: "백장훈",
    description: "두레문예관에서 이어진 두 개의 사건을 모두 목격한 탐정의 증명서입니다.",
    epilogueTitle: "에필로그: 무대가 꺼진 뒤",
    epilogueSubtitle:
      "추리극은 끝났지만, 두레문예관에는 연극이 아니라 고백의 잔향이 남았다.",
    epilogueSections: [
      {
        heading: "되돌아온 306호",
        paragraphs: [
          "백장훈의 자백은 현재의 사건만이 아니라 1년 전 강제호 사건의 매듭까지 다시 풀어냈다. 그 순간 두레문예관은 단순한 사건 현장이 아니라, 오래 미뤄 둔 진실이 한꺼번에 터져 나온 공간이 되었다.",
          "처음에는 단서처럼 흩어져 있던 피, 전등, 창문, 망치가 결국 하나의 동선으로 묶이며 모두가 외면하던 과거를 현재로 끌어냈다.",
        ],
      },
      {
        heading: "끝내 남은 질문",
        paragraphs: [
          "사람들은 백장훈이 왜 멈추지 못했는지를 오래 이야기하겠지만, 더 중요한 건 그가 이미 한 번 성공적으로 진실을 덮어 버렸다는 사실이다. 두 번째 사건은 첫 번째 은폐가 낳은 결과이기도 했다.",
          "그날 이후 두레문예관의 문과 창문, 그리고 306호라는 숫자는 누군가에게는 영원히 사건의 별칭으로 남게 된다.",
        ],
      },
    ],
  },
  museum: {
    culprit: "강컨서",
    description: "박물관 전시 뒤편의 진실까지 확인한 플레이 기록입니다.",
    epilogueTitle: "에필로그: 전시실 밖의 진실",
    epilogueSubtitle:
      "화려한 조명 아래 놓여 있던 유물보다 더 오래 기억된 것은 도투어의 마지막 행적이었다.",
    epilogueSections: [
      {
        heading: "전시가 끝난 자리",
        paragraphs: [
          "박물관은 사건 이후 한동안 관람을 중단했다. 기획 의도와 전시 연출보다 안전과 은폐의 문제가 먼저 거론되자, 건물 전체가 거대한 무대장치처럼 느껴졌다.",
          "강컨서의 범행은 공간을 설계한 사람이 얼마나 효율적으로 시선을 통제할 수 있는지를 보여 줬다. 그러나 완벽해 보이는 동선일수록 작은 어긋남 하나가 더 선명하게 남는다.",
        ],
      },
      {
        heading: "기록되는 사람",
        paragraphs: [
          "도투어는 더 이상 사건의 피해자로만 남지 않았다. 그의 조사 기록과 행동은 오히려 범인을 드러내는 마지막 전시물이 되었다.",
          "사건을 해결한 뒤 박물관을 다시 찾는다면, 가장 먼저 보게 되는 것은 유리가 아니라 그 뒤에서 누가 무엇을 감추려 했는가일 것이다.",
        ],
      },
    ],
  },
  serial: {
    culprit: "황새내",
    description: "28동과 301동을 잇는 연쇄 살인의 전말을 확인한 인증 카드입니다.",
    epilogueTitle: "에필로그: 두 건물 사이의 낙하",
    epilogueSubtitle:
      "멀리 떨어져 보였던 두 현장은 결국 한 사람의 의도 안에서 같은 높이에 놓여 있었다.",
    epilogueSections: [
      {
        heading: "겹쳐진 현장",
        paragraphs: [
          "28동과 301동에서 벌어진 두 죽음은 처음엔 우연한 병치처럼 보였지만, 황새내의 진술과 단서들이 모이며 하나의 설계도로 바뀌었다. 범인은 거리와 시간의 틈을 이용해 사건들을 서로 무관한 것처럼 보이게 만들려 했다.",
          "하지만 사건이 복잡할수록 범인은 설명해야 할 것도 많아진다. 결국 무리하게 맞춰 둔 퍼즐의 이음새가 가장 큰 단서가 되었다.",
        ],
      },
      {
        heading: "도시의 밤공기",
        paragraphs: [
          "사건 이후 사람들은 건물의 층수와 창문, CCTV 사각지대를 전보다 예민하게 기억했다. 같은 캠퍼스 안에서도 서로 다른 건물은 얼마나 쉽게 고립될 수 있는지 모두가 알게 되었다.",
          "탐정의 인증 카드는 그래서 단순한 수료증이 아니다. 두 현장을 끝까지 연결해 낸 사람이 있었다는 최종 기록이다.",
        ],
      },
    ],
  },
  mountain: {
    culprit: "최령신",
    description: "청룡산 등산로 끝에서 벌어진 추락 사건의 진실을 끝까지 추적한 기록입니다.",
    epilogueTitle: "에필로그: 청룡산 아래 남은 소원",
    epilogueSubtitle:
      "절벽 아래로 사건은 끝났지만, 산을 둘러싼 믿음과 모욕의 기억은 더 오래 남았다.",
    epilogueSections: [
      {
        heading: "잘못 놓인 표지판",
        paragraphs: [
          "추리수의 죽음은 단순한 실족처럼 보였지만, 엇갈린 동선과 누군가가 남긴 흔적은 사건을 다른 방향으로 끌고 갔다. 바뀐 표지판과 뒤엉킨 발자국은 우연이 아니라 마지막 실랑이의 구조를 드러내는 증거였다.",
          "청룡산에 모인 사람들은 각자 사소한 거짓말과 회피를 품고 있었고, 그 탓에 진실은 한동안 더 깊은 안개 속에 숨을 수 있었다.",
        ],
      },
      {
        heading: "신앙과 상처",
        paragraphs: [
          "최령신의 고백은 범행의 순간보다도 그 이전에 오래 누적된 수치심과 불안을 더 선명하게 남겼다. 사건 이후 사람들은 누군가의 약점을 농담처럼 건드렸던 장면들을 다시 떠올리게 되었다.",
          "청룡산은 다시 평소의 등산로로 돌아가겠지만, 그곳을 지나는 이들 가운데 몇몇은 표지판 하나와 말 한마디가 사람을 어디까지 몰아갈 수 있는지 오래 기억하게 된다.",
        ],
      },
    ],
  },
  kpop: {
    description: "무대 뒤편까지 파고든 탐정의 기록을 담은 케이팝 데몬 헌터스 인증 카드입니다.",
    epilogueTitle: "에필로그: 스포트라이트가 꺼진 뒤",
    epilogueSubtitle:
      "환호와 조명이 걷힌 자리에서는, 끝내 감춰지지 못한 균열들이 서로의 얼굴을 드러냈다.",
    epilogueSections: [
      {
        heading: "무대 위와 무대 아래",
        paragraphs: [
          "관객에게 보였던 팀워크와 서사는 사건 이후 전혀 다른 의미로 읽히기 시작했다. 완벽한 이미지로 포장된 관계일수록, 그 안에서 오래 눌려 있던 불안과 경쟁은 더 날카로운 흔적으로 남았다.",
          "탐정이 확인한 기록은 단순한 스캔들이 아니라 누가 어떤 방식으로 시선을 통제했고, 누구의 침묵이 그 구조를 가능하게 했는지까지 보여 줬다.",
        ],
      },
      {
        heading: "남겨진 무대",
        paragraphs: [
          "사건 이후 사람들은 더 이상 퍼포먼스만으로 진실을 판단하지 않게 되었다. 노래와 안무, 방송용 멘트보다 중요한 것은 카메라 바깥에서 서로를 어떻게 대했는가였다.",
          "케이팝 데몬 헌터스의 카드가 증명하는 것은 단순한 클리어 기록이 아니다. 가장 화려한 무대일수록 그림자도 더 선명해진다는 사실을 끝까지 확인한 기록이다.",
        ],
      },
    ],
  },
  bluemoon: {
    description: "푸른 달이 뜬 밤 조선시대 마을의 진실을 추적한 탐정에게 남는 인증 카드입니다.",
    epilogueTitle: "에필로그: 푸른 달 아래의 고을",
    epilogueSubtitle:
      "한밤의 소란은 지나갔지만, 고을 사람들의 시선은 이전처럼 단순하게 돌아가지 않았다.",
    epilogueSections: [
      {
        heading: "현령이 사라진 자리",
        paragraphs: [
          "김관우의 죽음은 한 사람의 몰락에 그치지 않고, 그를 둘러싸고 얽혀 있던 권력과 원한의 구조를 함께 끌어올렸다. 고을 사람들은 그를 두려워하면서도 이용했고, 그 관계의 균열이 사건 이후 한꺼번에 드러났다.",
          "탐정이 맞춰 낸 동선과 진술의 틈은 밤의 정적보다 더 정확했다. 결국 푸른 달 아래 숨겨진 것은 초현상이 아니라 사람이 만든 계산과 감정이었다.",
        ],
      },
      {
        heading: "오래 남는 소문",
        paragraphs: [
          "사건이 종결된 뒤에도 월향루와 관청, 약방을 오가는 이야기들은 쉽게 사라지지 않았다. 사람들은 그날 밤 누구를 어디서 보았는지, 어떤 말이 거짓이었는지를 저마다 다른 버전으로 기억하게 된다.",
          "그래도 한 가지는 분명하다. 그 밤의 진실은 더 이상 권세 있는 누군가의 말 한마디로 덮을 수 없는 기록이 되었다.",
        ],
      },
    ],
  },
};

export function buildCertificationCard(
  scenarioId: string,
  accusedSuspect?: string
): CertificationCardType | null {
  const scenario = scenarios.find((item) => item.id === scenarioId);
  const meta = scenarioCertificationMeta[scenarioId];

  if (!scenario || !meta) {
    return null;
  }

  return {
    scenarioId,
    title: scenario.title,
    description: meta.description,
    image: scenario.backgroundImage,
    posterImage: `/image/suspect/certiciation-card/${scenarioId}.png`,
    date: scenario.histories?.[scenario.histories.length - 1] ?? "",
    isSuccess:
      accusedSuspect && meta.culprit ? accusedSuspect === meta.culprit : true,
    color: scenario.color,
    verdict: meta.culprit ?? "",
    historyLabel: scenario.histories?.[scenario.histories.length - 1],
    epilogueTitle: meta.epilogueTitle,
    epilogueSubtitle: meta.epilogueSubtitle,
    epilogueSections: meta.epilogueSections,
  };
}
