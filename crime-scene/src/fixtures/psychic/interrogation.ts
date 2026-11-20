import type { InterrogationScenarioType } from "@/types";
import { psychicFinalQuestions } from "./finalQuestions";

export const psychicInterrogationContent: Pick<
  InterrogationScenarioType,
  "prologue" | "phases" | "fallbackAnswers" | "people"
> = {
  prologue: [
    {
      speaker: "나",
      text: "2082년. 한때 SF 영화에서나 나오던 초능력은 이제 정식 학문의 연구 대상이 되었다. 세계 각국의 대학과 연구기관에서는 초능력의 원리를 밝히기 위한 연구가 진행되고 있으며, 일부 대학에는 초능력학과까지 개설되었다.",
    },
    {
      speaker: "나",
      text: "이러한 가운데, 정부의 지원을 받아 운영되는 한 초능력 연구소에서는 알약을 이용 해 인위적으로 초능력을 발현시키는 실험을 진행하고 있었다. 연구소에서 개발한 알약을 복용하면 누구나 초능력을 얻을 수 있다는 것이었다",
    },
    {
      speaker: "나",
      text: "평소 초능력에 관심이 많았던 나는 실험에 지원했고, 얼마 지나지 않아 합격 통보를 받았다. 연구소에 도착한 당신은 연구소장으로부터 실험 절차와 생활 규칙에 대한 설명을 들었다. 앞으로 외출이 금지되고 외부와의 연락도 제한되며, 정해진 일정에 따라 검사와 실험에 참여해야 한다는 것이었다. ",
    },
    {
      text: "현재 연구소에는 먼저 입소한 세 명의 실험체 A, B, C가 생활하고 있었다. 나는 이들에 이어 네 번째 실험체로 등록되었으며, 실험체 D라는 식별명을 부여받았다. 입소 절차를 마친 나는 연구소장이 건넨 알약을 복용했다. 다행히 심각한 부작용 없이 초능력을 얻는 데 성공했고, 내게 발현된 능력은 식물과 대화하는 능력이었다.",
      speaker: "나",
    },
    {
      text: "그렇게 나는 세 명의 다른 실험체들과 함께 연구소에서의 생활을 시작하게 되었다.",
      speaker: "나",
    },
  ],
  phases: [
    {
      id: "phase-1",
      title: "첫 조사",
      timeLabel: "4/14 08:00",
      energyLimit: 5,
      intro: [
        {
          text: "오전 8시. 초능력이 무사히 발현되고, 오늘 실험체로서의 첫 아침이 시작되었다.",
          speaker: "나",
        },
        {
          text: "연구소를 둘러보자.",
          speaker: "나",
        },
      ],
      fallbackAnswers: [
        [
          {
            text: "음, 무슨 말인지 모르겠네.",
            speaker: "나",
          },
        ],
        [
          {
            text: "그걸 왜 나한테 지금 보여주는거지?",
            speaker: "나",
          },
        ],
      ],
      mapImage: "/image/scenario/psychic/map/lab-map.svg",
      locations: [],
      sources: [
        {
          x: 57.3,
          y: 78.1,
          title: "환풍구 지도",
          evidence: {
            id: "pill-vent",
            title: "환풍구 지도",
            description:
              "환풍구가 연결된 지도이다. 소장실에 하나, 실험실에 하나, 그리고 각 숙소별로 하나씩 있다. 환풍구의 위치는 각 숙소의 침대 위이다.",
          },
          id: "p1-pill",
          versionPhaseId: "phase-1",
        },
        {
          x: 19.9,
          y: 10,
          title: "혈액팩",
          evidence: {
            id: "badge-a",
            title: "혈액팩",
            description:
              "초능력자들의 피들이 보관되어있다. 어제 뽑은 당신의 피를 포함해 A, B, C, 소장의 혈액까지 있다.",
          },
          id: "p1-badge",
          versionPhaseId: "phase-1",
        },
        {
          x: 94.7,
          y: 28.3,
          title: "오늘의 식단표",
          evidence: {
            id: "schedule",
            title: "오늘의 식단표",
            description:
              "매일매일이 짜장면이다. 조식, 중식, 석식 모두 짜장면으로만 채워져 있다. 단무지조차 없다. 조식은 아침 7시, 중식은 12시, 석식은 저녁 7시이다.",
          },
          id: "p1-schedule",
          versionPhaseId: "phase-1",
        },
        {
          x: 56.4,
          y: 7.3,
          title: "환풍구",
          evidence: {
            id: "vent",
            title: "환풍구",
            description:
              "환풍구가 있다. 세로 길이가 꽤나 좁아 기어들어가려고 하면 낄 수가 있다. 먼지가 가득하다.",
          },
          id: "p1-vitals",
          versionPhaseId: "phase-1",
        },
        {
          x: 7.6,
          y: 65.7,
          title: "오래된 종이 문서",
          evidence: {
            id: "evidence-8c81c2b6",
            title: "과거 초능력 실험 기록",
            description:
              "김고체라는 이름으로 작성된 오래된 실험 기록이다. 식빵을 먹은 뒤 짜장면을 소환하려 했으나 식빵이 나왔고, 커피를 마신 후에도 결과는 같았다. 이후 볶음밥을 먹자 볶음밥이 소환되었으며, 물을 마신 뒤에도 볶음밥이 나왔다. 기록 하단에는 '원하는 음식을 자유롭게 소환할 수 없음'이라고 적혀 있다. 실험 보조자로 유기체라는 이름이 남아 있다.",
          },
          id: "phase-1-source-evidence-8c81c2b6",
          versionPhaseId: "phase-1",
        },
        {
          x: 19.5,
          y: 31.3,
          title: "캐비닛",
          evidence: {
            id: "evidence-bebfe84a",
            title: "캐비닛",
            description:
              "실험실의 캐비닛. 굳게 닫혀있어 힘을 주어야 열렸다. 안은 비어있다.",
          },
          id: "phase-1-source-evidence-bebfe84a",
          versionPhaseId: "phase-1",
        },
        {
          x: 67.7,
          y: 8,
          title: "서랍",
          evidence: {
            id: "evidence-560e89ff",
            title: "10년 전 사건 자료",
            description:
              "10년 전, '유기체'라는 사람에게 초능력 약물을 주사했다가 사망했다는 연구 기록이다. 욕조에 손목을 긋고 자살한 것처럼 위장했다는 메모도 남겨져있다.",
          },
          password: "0414",
          id: "phase-1-source-evidence-560e89ff",
          versionPhaseId: "phase-1",
        },
        {
          x: 12.3,
          y: 55.4,
          title: "옷",
          evidence: {
            id: "evidence-0221b7bc",
            title: "실험체 A의 옷과 잠옷",
            description: "옷과 잠옷이 있다. 깔끔하게 다려져있다.",
          },
          id: "phase-1-source-evidence-0221b7bc",
          versionPhaseId: "phase-1",
        },
        {
          x: 72.6,
          y: 19.8,
          title: "욕조",
          evidence: {
            id: "evidence-a20cd9ba",
            title: "욕조",
            description: "소장이 목욕할 때 사용하는 욕조다.",
          },
          id: "phase-1-source-evidence-a20cd9ba",
          versionPhaseId: "phase-1",
        },
        {
          x: 81.2,
          y: 9,
          title: "칼",
          evidence: {
            id: "evidence-82a326d5",
            title: "부엌칼",
            description: "단순한 부엌칼이다.",
          },
          id: "phase-1-source-evidence-82a326d5",
          versionPhaseId: "phase-1",
        },
        {
          x: 67.1,
          y: 17.6,
          title: "사진",
          evidence: {
            id: "footage",
            title: "가족 사진",
            description:
              "소장이 부인과 딸과 찍은 사진. 2062년에 찍은 사진이다. 사진 뒷면에는 김짜장과 유기체, 그리고 사랑하는 딸아이와. 라고 쓰여있다.",
          },
          id: "phase-1-source-footage",
          versionPhaseId: "phase-1",
        },
        {
          x: 64.3,
          y: 41.6,
          title: "소장실 출입문",
          evidence: {
            id: "door-log",
            title: "소장실 출입문",
            description: "다른 방과 달리 지문 인식으로 열리게 설정되어있다. ",
          },
          id: "phase-1-source-door-log",
          versionPhaseId: "phase-1",
        },
        {
          x: 77.4,
          y: 34.6,
          title: "설거지 당번표",
          evidence: {
            id: "evidence-aec28b2a",
            title: "설거지 당번표",
            description:
              "설거지 당번표에는 A와 C가 번갈아가며 쓰여있다. 가위바위보로만 정한다고 되어있다. 오늘은 모두 C가 당번이었다. 아마, 신입보호기간이 끝나면 나도 가위바위보에 참여하겠지.",
          },
          id: "phase-1-source-evidence-aec28b2a",
          versionPhaseId: "phase-1",
        },
        {
          x: 57.3,
          y: 21.7,
          title: "초능력 알약",
          evidence: {
            id: "evidence-6810b6b5",
            title: "초능력 알약",
            description:
              "초능력을 부여할 때 먹는 흰색 알약이다. 통에 보관되어있다. 3개가 들어있다.",
          },
          id: "phase-1-source-evidence-6810b6b5",
          versionPhaseId: "phase-1",
        },
        {
          x: 56.9,
          y: 32.5,
          title: "해독제",
          evidence: {
            id: "evidence-ecfd8386",
            title: "초능력 해독제",
            description:
              "초능력 약물을 실수로 2정 이상 복용했을 때 빠르게 먹으면 해독할 수 있는 물약이다. 초능력 약물을 실수로 복용한 후 5~10분 내로 먹어야한다.",
          },
          id: "phase-1-source-evidence-ecfd8386",
          versionPhaseId: "phase-1",
        },
      ],
      combinations: [],
      interrogations: [
        {
          suspectName: "실험체 A",
          conversation: [
            {
              speaker: "나",
              text: "안녕하세요...?",
            },
            {
              text: "아, 신입인가. 무슨 능력을 얻었는지는 모르겠지만 환영해.",
              speaker: "실험체 A",
            },
          ],
          conversationChoices: [
            {
              id: "p1-contract",
              question: "서로 능력을 알 수 없나요?",
              answer: [
                {
                  text: "응. 우리는 서로 능력도 몰라. 애초에 본명도 모르는 걸.",
                },
                {
                  text: "너도 괜히 알려고 하지 마렴.",
                },
              ],
            },
            {
              id: "p1-ability",
              question: "이 곳엔 어떻게 들어오시게 되었죠?",
              answer: [
                {
                  text: "그냥, 돈 때문이지 뭐.",
                  speaker: "실험체 A",
                  portrait: "/image/scenario/psychic/profile/exp_a.png",
                },
              ],
            },
          ],
          questions: [],
        },
        {
          suspectName: "실험체 B",
          conversation: [
            {
              speaker: "나",
              text: "아, 안녕하세요.",
            },
            {
              text: "아, 신입인가. 무슨 능력인지 궁금하네. 환영해.",
              speaker: "실험체 B",
              portrait: "/image/scenario/psychic/profile/exp_b.png",
            },
          ],
          conversationChoices: [
            {
              id: "p1-reward",
              question: "혹시 수당금은 언제 들어오나요?",
              answer: [
                {
                  text: "음, 너도 당했구나.",
                  speaker: "실험체 B",
                  portrait: "/image/scenario/psychic/profile/exp_b.png",
                },
                {
                  text: "사실 우리 연구소는 수당 지급을 잘 안해줘. 나도 몇 달은 밀렸는걸.",
                  speaker: "실험체 B",
                  portrait: "/image/scenario/psychic/profile/exp_b.png",
                },
              ],
            },
            {
              id: "p1-lunch",
              question: "저희 점심은 언제 먹어요?",
              answer: [
                {
                  text: "12시에 먹어. 저녁은 7시 쯤이고.",
                  speaker: "실험체 B",
                  portrait: "/image/scenario/psychic/profile/exp_b.png",
                },
                {
                  text: "어차피 메뉴는 짜장면일텐데...하하.",
                  speaker: "실험체 B",
                  portrait: "/image/scenario/psychic/profile/exp_b.png",
                },
              ],
            },
          ],
          questions: [],
        },
        {
          suspectName: "실험체 C",
          conversation: [
            {
              speaker: "나",
              text: "안녕하세요?",
            },
            {
              text: "아, 네... 안녕하세요. 새로 들어오신 분이군요.",
              speaker: "실험체 C",
              portrait: "/image/scenario/psychic/profile/exp_c.png",
            },
          ],
          conversationChoices: [
            {
              id: "p1-forecast",
              question: "성함이 어떻게 되세요?",
              answer: [
                {
                  text: "그건 말씀 드릴 수 없습니다.",
                },
                {
                  text: "하하... 연구소 방침이어서요.",
                },
              ],
            },
            {
              id: "p1-records",
              question: "나이가 어떻게 되세요?",
              answer: [
                {
                  text: "25살입니다.",
                },
                {
                  text: "아마 실험체 중에서는 제일 나이가 많을 듯 싶네요.",
                },
              ],
            },
          ],
          questions: [],
        },
        {
          suspectName: "김짜장",
          conversation: [
            {
              speaker: "나",
              text: "안녕하세요.",
            },
            {
              text: "응, 반갑네. 오늘 하루도 힘차게 시작해볼까. D.",
              speaker: "김짜장",
              portrait: "/image/scenario/psychic/profile/kim_jj.png",
            },
            {
              text: "새들은 지저귀고, 꽃들은 피어나고...",
              speaker: "김짜장",
              portrait: "/image/scenario/psychic/profile/kim_jj.png",
            },
          ],
          conversationChoices: [
            {
              id: "p1-pill",
              question: "초능력 알약은 어떤 원리인가요?",
              answer: [
                {
                  text: "원리는 극비야. 너라도 알려줄 수 없지. 우리 연구소의 존재 의의이자 이게 유출되면 아무것도 안남아.",
                  speaker: "김짜장",
                  portrait: "/image/scenario/psychic/profile/kim_jj.png",
                },
                {
                  text: "그냥 알약이 너의 잠재력을 일꺠워준다 정도만 얘기해줄 수 있겠군.",
                  speaker: "김짜장",
                  portrait: "/image/scenario/psychic/profile/kim_jj.png",
                },
                {
                  text: "하지만 조심해, 넌 이미 초능력이 발현되었으니까, 한 번 더 먹게되면 피가 선홍색으로 변하며 사망할거니까.",
                  speaker: "김짜장",
                  portrait: "/image/scenario/psychic/profile/kim_jj.png",
                },
              ],
            },
            {
              id: "p1-Pocket",
              question: "주머니에 이건 뭐죠?",
              answer: [
                {
                  text: "아, 마스터키인데.",
                  speaker: "김짜장",
                  portrait: "/image/scenario/psychic/profile/kim_jj.png",
                },
                {
                  text: "왜 이런걸 주목하지? 넌 쓸 일 없어.",
                  speaker: "김짜장",
                  portrait: "/image/scenario/psychic/profile/kim_jj.png",
                },
              ],
            },
            {
              id: "choice-b4e029e2",
              question: "연구소는 언제부터 있었어요?",
              answer: [
                {
                  text: "음, 아마 교수직을 물러나고 시작했으니 한 5년 되었으려나.",
                  speaker: "김짜장",
                  portrait: "/image/scenario/psychic/profile/kim_jj.png",
                },
                {
                  text: "딸아이가 대학생 되었을 때 쯤 시작했으니. 얼추 맞겠군.",
                  speaker: "김짜장",
                  portrait: "/image/scenario/psychic/profile/kim_jj.png",
                },
              ],
            },
          ],
          questions: [],
        },
      ],
      requiredCombinationIds: [],
      requiredQuestionIds: [],
      people: [
        {
          name: "실험체 A",
          x: 9,
          y: 77,
        },
        {
          name: "실험체 B",
          x: 23,
          y: 77,
        },
        {
          name: "실험체 C",
          x: 37,
          y: 77,
        },
        {
          name: "김짜장",
          x: 63,
          y: 29,
        },
      ],
    },
    {
      id: "phase-2",
      title: "오후 조사",
      timeLabel: "4/14 13:00",
      energyLimit: 5,
      intro: [
        {
          text: "오후 1시. 점심을 먹고 몸이 나른해진다. 조사를 계속하자. 이 연구소에 익숙해져야한다.",
        },
      ],
      fallbackAnswers: [
        [
          "오후 자료는 아직 정리 중이에요.",
          "그 기록과 제 이야기를 연결하기는 어렵습니다.",
        ],
        [
          "점심 이후로는 그 단서를 자세히 확인하지 못했어요.",
          "다른 자료가 있으면 보여 주세요.",
        ],
      ],
      mapImage: "/image/scenario/psychic/map/lab-map.svg",
      locations: [],
      sources: [
        {
          x: 7.6,
          y: 65.7,
          title: "오래된 종이 문서",
          evidence: {
            id: "evidence-8c81c2b6",
            title: "과거 초능력 실험 기록",
            description:
              "김고체라는 이름으로 작성된 오래된 실험 기록이다. 식빵을 먹은 뒤 짜장면을 소환하려 했으나 식빵이 나왔고, 커피를 마신 후에도 결과는 같았다. 이후 볶음밥을 먹자 볶음밥이 소환되었으며, 물을 마신 뒤에도 볶음밥이 나왔다. 기록 하단에는 '원하는 음식을 자유롭게 소환할 수 없음'이라고 적혀 있다. 실험 보조자로 유기체라는 이름이 남아 있다.",
          },
          id: "phase-2-source-evidence-8c81c2b6",
          versionPhaseId: "phase-1",
        },
        {
          x: 19.5,
          y: 31.3,
          title: "캐비닛",
          evidence: {
            id: "evidence-bebfe84a",
            title: "캐비닛",
            description:
              "실험실의 캐비닛. 굳게 닫혀있어 힘을 주어야 열렸다. 안은 비어있다.",
          },
          id: "phase-2-source-evidence-bebfe84a",
          versionPhaseId: "phase-1",
        },
        {
          x: 67.7,
          y: 8,
          title: "서랍",
          evidence: {
            id: "evidence-560e89ff",
            title: "10년 전 사건 자료",
            description:
              "10년 전, '유기체'라는 사람에게 초능력 약물을 주사했다가 사망했다는 연구 기록이다. 욕조에 손목을 긋고 자살한 것처럼 위장했다는 메모도 남겨져있다.",
          },
          password: "0414",
          id: "phase-2-source-evidence-560e89ff",
          versionPhaseId: "phase-1",
        },
        {
          x: 12.3,
          y: 55.4,
          title: "옷",
          evidence: {
            id: "evidence-0221b7bc",
            title: "실험체 A의 옷과 잠옷",
            description: "옷과 잠옷이 있다. 깔끔하게 다려져있다.",
          },
          id: "phase-2-source-evidence-0221b7bc",
          versionPhaseId: "phase-1",
        },
        {
          x: 72.6,
          y: 19.8,
          title: "욕조",
          evidence: {
            id: "evidence-a20cd9ba",
            title: "욕조",
            description: "소장이 목욕할 때 사용하는 욕조다.",
          },
          id: "phase-2-source-evidence-a20cd9ba",
          versionPhaseId: "phase-1",
        },
        {
          x: 81.2,
          y: 9,
          title: "칼",
          evidence: {
            id: "evidence-82a326d5",
            title: "부엌칼",
            description: "단순한 부엌칼이다.",
          },
          id: "phase-2-source-evidence-82a326d5",
          versionPhaseId: "phase-1",
        },
        {
          x: 57.3,
          y: 78.1,
          title: "환풍구 지도",
          evidence: {
            id: "pill-vent",
            title: "환풍구 지도",
            description:
              "환풍구가 연결된 지도이다. 소장실에 하나, 실험실에 하나, 그리고 각 숙소별로 하나씩 있다. 환풍구의 위치는 각 숙소의 침대 위이다.",
          },
          id: "phase-2-source-pill-vent",
          versionPhaseId: "phase-1",
        },
        {
          x: 19.9,
          y: 10,
          title: "혈액팩",
          evidence: {
            id: "badge-a",
            title: "혈액팩",
            description:
              "초능력자들의 피들이 보관되어있다. 어제 뽑은 당신의 피를 포함해 A, B, C, 소장의 혈액까지 있다.",
          },
          id: "phase-2-source-badge-a",
          versionPhaseId: "phase-1",
        },
        {
          x: 94.7,
          y: 28.3,
          title: "오늘의 식단표",
          evidence: {
            id: "schedule",
            title: "오늘의 식단표",
            description:
              "매일매일이 짜장면이다. 조식, 중식, 석식 모두 짜장면으로만 채워져 있다. 단무지조차 없다. 조식은 아침 7시, 중식은 12시, 석식은 저녁 7시이다.",
          },
          id: "phase-2-source-schedule",
          versionPhaseId: "phase-1",
        },
        {
          x: 56.4,
          y: 7.3,
          title: "환풍구",
          evidence: {
            id: "vent",
            title: "환풍구",
            description:
              "환풍구가 있다. 세로 길이가 꽤나 좁아 기어들어가려고 하면 낄 수가 있다. 먼지가 가득하다.",
          },
          id: "phase-2-source-vent",
          versionPhaseId: "phase-1",
        },
        {
          x: 67.1,
          y: 17.6,
          title: "사진",
          evidence: {
            id: "footage",
            title: "가족 사진",
            description:
              "소장이 부인과 딸과 찍은 사진. 2062년에 찍은 사진이다. 사진 뒷면에는 김짜장과 유기체, 그리고 사랑하는 딸아이와. 라고 쓰여있다.",
          },
          id: "phase-2-source-footage",
          versionPhaseId: "phase-1",
        },
        {
          x: 64.3,
          y: 41.6,
          title: "소장실 출입문",
          evidence: {
            id: "door-log",
            title: "소장실 출입문",
            description: "다른 방과 달리 지문 인식으로 열리게 설정되어있다. ",
          },
          id: "phase-2-source-door-log",
          versionPhaseId: "phase-1",
        },
        {
          x: 77.4,
          y: 34.6,
          title: "설거지 당번표",
          evidence: {
            id: "evidence-aec28b2a",
            title: "설거지 당번표",
            description:
              "설거지 당번표에는 A와 C가 번갈아가며 쓰여있다. 가위바위보로만 정한다고 되어있다. 오늘은 모두 C가 당번이었다. 아마, 신입보호기간이 끝나면 나도 가위바위보에 참여하겠지.",
          },
          id: "phase-2-source-evidence-aec28b2a",
          versionPhaseId: "phase-1",
        },
        {
          x: 57.3,
          y: 21.7,
          title: "초능력 알약",
          evidence: {
            id: "evidence-6810b6b5",
            title: "초능력 알약",
            description:
              "초능력을 부여할 때 먹는 흰색 알약이다. 통에 보관되어있다. 3개가 들어있다.",
          },
          id: "phase-2-source-evidence-6810b6b5",
          versionPhaseId: "phase-2",
        },
        {
          x: 56.9,
          y: 32.5,
          title: "해독제",
          evidence: {
            id: "evidence-ecfd8386",
            title: "초능력 해독제",
            description:
              "초능력 약물을 실수로 2정 이상 복용했을 때 빠르게 먹으면 해독할 수 있는 물약이다. 초능력 약물을 실수로 복용한 후 5~10분 내로 먹어야한다.",
          },
          id: "phase-2-source-evidence-ecfd8386",
          versionPhaseId: "phase-2",
        },
      ],
      combinations: [],
      interrogations: [
        {
          suspectName: "실험체 A",
          conversation: [
            {
              speaker: "나",
              text: "밥은 잘 드셨나요?",
            },
            {
              text: "밥이랄게 짜장면 밖에 없잖아.",
              speaker: "실험체 A",
              portrait: "/image/scenario/psychic/profile/exp_a.png",
            },
          ],
          conversationChoices: [
            {
              id: "p2-results",
              question: "능력이 뭐에요?",
              answer: [
                {
                  text: "못 말해 줘. 서로 알려줄 수 없거든.",
                },
                {
                  speaker: "실험체 A",
                  text: "하지만 뭐... 굳이 얘기하자면 '레비테이션' 능력이라고 해둘까. 후후.",
                },
              ],
            },
            {
              id: "p2-contract",
              question: "왜 짜장면만 나올까요?",
              answer: [
                {
                  text: "소장이 짜장면 능력자니까 그렇지.",
                },
                {
                  text: "짜장면을 소환하는 능력이야. ....",
                },
              ],
            },
          ],
          questions: [],
        },
        {
          suspectName: "실험체 B",
          conversation: [
            {
              speaker: "나",
              text: "오후엔 보통 뭐하시나요?",
            },
            {
              text: "보통 설거지를 해. 쉬거나.",
            },
          ],
          conversationChoices: [
            {
              id: "p2-reward",
              question: "능력이 뭐에요?",
              answer: [
                {
                  text: "알려드릴 수 없어요.",
                },
                {
                  text: "뭐 정신 조작 쪽이라고만 말씀드리죠. 훗.",
                },
              ],
            },
            {
              id: "p2-condition",
              question: "연구소에서 친한 사람이 있나요?",
              answer: [
                {
                  text: "김액체와 친한 것 같아요.",
                },
                {
                  text: "다른 분들은 사실...음... 아직 어색한 사이.",
                },
              ],
            },
          ],
          questions: [],
        },
        {
          suspectName: "실험체 C",
          conversation: [
            {
              speaker: "나",
              text: "안녕하세요...",
            },
            {
              text: "네. 안녕하세요.",
            },
          ],
          conversationChoices: [
            {
              id: "p2-public",
              question: "오늘 설거지를 왜 하셨나요?",
              answer: [
                {
                  text: "아, 제가 그래도 짬이 제일 높은데 제가 해야죠~",
                },
                {
                  text: "... 농담이고 가위바위보 졌습니다. D님도 다음주부터 가위바위보 하셔야합니다.",
                },
              ],
            },
            {
              id: "p2-original",
              question: "능력이 뭐에요?",
              answer: [
                {
                  text: "그건, 말씀드릴 수 없어요.",
                },
                {
                  text: "그 신입이라 잘 모르나본데 여기 서로 능력 얘기하면 안되거든요? 때가 되면 다 알게될거에요.",
                },
              ],
            },
          ],
          questions: [],
        },
        {
          suspectName: "김짜장",
          conversation: [
            {
              text: "아까부터 왜 내 방에 들락날락하는 것 같지?",
              speaker: "김짜장",
              portrait: "/image/scenario/psychic/profile/kim_jj.png",
            },
            {
              speaker: "나",
              text: "아, 아무것도 아닙니다.",
            },
          ],
          conversationChoices: [
            {
              id: "p2-pill",
              question: "능력이 뭐에요?",
              answer: [
                {
                  text: "내 능력? 나는 짜장면을 만드는 능력이네.",
                },
                {
                  text: "허허, 이상하지? 그래서 내 이름이 김짜장인거일세. 더 웃긴 건, 그릇은 소환이 안돼. 그래서 설거지 담당이 매번 그릇을 내 앞에 들고 있어야하지.",
                },
              ],
            },
            {
              id: "p2-records",
              question: "저에게 조언해주실 게 있나요?",
              answer: [
                {
                  text: "음, 실험체는 아무래도 헝그리 정신이 필요하네.",
                },
                {
                  text: "늘 짜장면만 먹고도, 돈을 좀 받지 못해도 이 나라의, 이 연구소의 기술 발전에 기여한다~고 생각하고! 열심히 해야하지.",
                },
              ],
            },
          ],
          questions: [],
        },
      ],
      requiredCombinationIds: [],
      requiredQuestionIds: [],
      people: [
        {
          name: "실험체 A",
          x: 90.8,
          y: 11.8,
        },
        {
          name: "실험체 B",
          x: 86.5,
          y: 27.9,
        },
        {
          name: "실험체 C",
          x: 91.3,
          y: 22.3,
        },
        {
          name: "김짜장",
          x: 36.1,
          y: 27.8,
        },
      ],
    },
    {
      id: "phase-3",
      title: "저녁 조사",
      timeLabel: "4/14 19:00",
      energyLimit: 10,
      intro: [
        {
          text: "저녁 식사가 시작되었다.",
        },
      ],
      fallbackAnswers: [
        [
          "지금은 저녁 일정 중이라 자세히 확인하기 어렵습니다.",
          "그 단서는 조금 뒤에 이야기하죠.",
        ],
        [
          "그 기록은 아직 직접 보지 못했어요.",
          "확인하고 나서 이야기하겠습니다.",
        ],
      ],
      mapImage: "/image/scenario/psychic/map/lab-map.svg",
      locations: [],
      sources: [
        {
          x: 94.7,
          y: 28.3,
          title: "오늘의 식단표",
          evidence: {
            id: "schedule",
            title: "오늘의 식단표",
            description:
              "매일매일이 짜장면이다. 조식, 중식, 석식 모두 짜장면으로만 채워져 있다. 단무지조차 없다. 조식은 아침 7시, 중식은 12시, 석식은 저녁 7시이다.",
          },
          id: "p3-schedule",
          versionPhaseId: "phase-1",
        },
        {
          x: 7.6,
          y: 65.7,
          title: "오래된 종이 문서",
          evidence: {
            id: "evidence-8c81c2b6",
            title: "과거 초능력 실험 기록",
            description:
              "김고체라는 이름으로 작성된 오래된 실험 기록이다. 식빵을 먹은 뒤 짜장면을 소환하려 했으나 식빵이 나왔고, 커피를 마신 후에도 결과는 같았다. 이후 볶음밥을 먹자 볶음밥이 소환되었으며, 물을 마신 뒤에도 볶음밥이 나왔다. 기록 하단에는 '원하는 음식을 자유롭게 소환할 수 없음'이라고 적혀 있다. 실험 보조자로 유기체라는 이름이 남아 있다.",
          },
          id: "phase-3-source-evidence-8c81c2b6",
          versionPhaseId: "phase-1",
        },
        {
          x: 19.5,
          y: 31.3,
          title: "캐비닛",
          evidence: {
            id: "evidence-bebfe84a",
            title: "캐비닛",
            description:
              "실험실의 캐비닛. 굳게 닫혀있어 힘을 주어야 열렸다. 안은 비어있다.",
          },
          id: "phase-3-source-evidence-bebfe84a",
          versionPhaseId: "phase-1",
        },
        {
          x: 12.3,
          y: 55.4,
          title: "옷",
          evidence: {
            id: "evidence-0221b7bc",
            title: "실험체 A의 옷과 잠옷",
            description: "옷과 잠옷이 있다. 옷에 먼지가 있다. 잠옷은 깔끔하다.",
          },
          id: "phase-3-source-evidence-0221b7bc",
          versionPhaseId: "phase-3",
        },
        {
          x: 81.2,
          y: 9,
          title: "칼",
          evidence: {
            id: "evidence-82a326d5",
            title: "부엌칼",
            description: "단순한 부엌칼이다.",
          },
          id: "phase-3-source-evidence-82a326d5",
          versionPhaseId: "phase-1",
        },
        {
          x: 57.3,
          y: 78.1,
          title: "환풍구 지도",
          evidence: {
            id: "pill-vent",
            title: "환풍구 지도",
            description:
              "환풍구가 연결된 지도이다. 소장실에 하나, 실험실에 하나, 그리고 각 숙소별로 하나씩 있다. 환풍구의 위치는 각 숙소의 침대 위이다.",
          },
          id: "phase-3-source-pill-vent",
          versionPhaseId: "phase-1",
        },
        {
          x: 19.9,
          y: 10,
          title: "혈액팩",
          evidence: {
            id: "badge-a",
            title: "혈액팩",
            description:
              "초능력자들의 피들이 보관되어있다. 어제 뽑은 당신의 피를 포함해 A, B, C, 소장의 혈액까지 있다.",
          },
          id: "phase-3-source-badge-a",
          versionPhaseId: "phase-1",
        },
        {
          x: 37,
          y: 35.4,
          title: "옷",
          evidence: {
            id: "ledger-b",
            title: "소장의 연구복",
            description:
              "소장이 밥을 먹다 의자에 걸어둔 연구복이다. 주머니엔 아무것도 없다.",
          },
          id: "phase-3-source-ledger-b",
          versionPhaseId: "phase-3",
        },
        {
          x: 35.7,
          y: 25,
          title: "짜장면",
          evidence: {
            id: "forecast",
            title: "짜장면",
            description: "소장이 실험실에서 먹던 짜장면이다. 몇 입 먹었다.  ",
          },
          id: "phase-3-source-forecast",
          versionPhaseId: "phase-3",
        },
        {
          x: 41.5,
          y: 25,
          title: "차",
          evidence: {
            id: "notice",
            title: "차",
            description: "짜장면과 함께 놓여져있던 차. 마신 흔적이 있다.",
          },
          id: "phase-3-source-notice",
          versionPhaseId: "phase-3",
        },
        {
          x: 64.3,
          y: 41.6,
          title: "소장실 출입문",
          evidence: {
            id: "door-log",
            title: "소장실 출입문",
            description: "다른 방과 달리 지문 인식으로 열리게 설정되어있다. ",
          },
          id: "phase-3-source-door-log",
          versionPhaseId: "phase-1",
        },
        {
          x: 77.4,
          y: 34.6,
          title: "설거지 당번표",
          evidence: {
            id: "evidence-aec28b2a",
            title: "설거지 당번표",
            description:
              "설거지 당번표에는 A와 C가 번갈아가며 쓰여있다. 가위바위보로만 정한다고 되어있다. 오늘은 모두 C가 당번이었다. 아마, 신입보호기간이 끝나면 나도 가위바위보에 참여하겠지.",
          },
          id: "phase-3-source-evidence-aec28b2a",
          versionPhaseId: "phase-1",
        },
      ],
      combinations: [],
      interrogations: [
        {
          suspectName: "실험체 A",
          conversation: [
            {
              speaker: "나",
              text: "짜장면은 입에 맞으세요?",
            },
            {
              text: "아니.",
            },
          ],
          conversationChoices: [
            {
              id: "p3-camera",
              question: "B님은 어디가셨죠?",
              answer: [
                {
                  text: "몰라, 아까 화장실 간다하고 나갔는데.",
                },
              ],
            },
            {
              id: "p3-contract",
              question: "이게 무슨 소리죠?",
              answer: [
                {
                  text: "모르겠어 복도 쪽에서 소장님이 뭐 하고 계시나.",
                },
                {
                  text: "빨리 밥 먹자.",
                },
              ],
            },
          ],
          questions: [],
        },
        {
          suspectName: "실험체 B",
          conversation: [
            {
              speaker: "나",
              text: "저녁은 같이 안 먹어요?",
            },
            "배가 좀 아파서요. 먼저 드세요.",
          ],
          conversationChoices: [
            {
              id: "p3-stage",
              question: "지금 어디에 가시려고요?",
              answer: [
                "화장실에 잠깐 다녀오려고요.",
                "저녁은 건너뛰어야겠어요.",
              ],
            },
            {
              id: "p3-fatigue",
              question: "많이 아픈가요?",
              answer: [
                "조금 배가 아픈 정도예요.",
                "괜찮아지면 돌아올게요.",
              ],
            },
          ],
          questions: [],
        },
        {
          suspectName: "실험체 C",
          conversation: [
            {
              speaker: "나",
              text: "안녕하세요.",
            },
            {
              text: "밥 먹을 땐 말시키는거 아니에요.",
            },
          ],
          conversationChoices: [],
          questions: [],
        },
        {
          suspectName: "김짜장",
          conversation: [
            {
              speaker: "나",
              text: "안녕하세요.",
            },
            {
              text: "크윽...",
            },
          ],
          conversationChoices: [
            {
              id: "p3-original",
              question: "무슨 일이세요?",
              answer: [
                {
                  text: "으...으... 몸이 안좋아.",
                },
                {
                  text: "이 느낌은 분명... 어서 빨리 해독을.",
                },
              ],
            },
            {
              id: "p3-meeting",
              question: "손은 왜 꽉 쥐고 계세요?",
              answer: [
                {
                  text: "몰라, 손이 안펴져. 이래서는...소장실에..",
                },
                {
                  text: "으윽.. 내가 알기로 마비 증세는 중독 증상에 없는데 뭐야!!",
                },
              ],
            },
          ],
          questions: [],
        },
      ],
      requiredCombinationIds: [],
      requiredQuestionIds: [],
      people: [
        {
          name: "실험체 A",
          x: 93,
          y: 14.9,
        },
        {
          name: "김짜장",
          x: 61.3,
          y: 50.2,
        },
        {
          name: "실험체 C",
          x: 87.1,
          y: 29.1,
        },
      ],
    },
    {
      id: "phase-4",
      title: "자정의 현장",
      timeLabel: "4/15 00:00",
      energyLimit: 15,
      intro: [
        {
          text: "자정. 실험체 C가 놀라 우리들을 깨웠다. 소장실 문을 열자 김짜장 소장이 피를 흘린 채 욕조에 누워 있다. 숨을 쉬지 않는다. 이제 이곳은 사건 현장이다.",
        },
      ],
      fallbackAnswers: [
        [
          "소장님이 돌아가셨다는 말에 아직 정신이 없어요.",
          "그 단서로는 제가 아는 게 없습니다.",
        ],
        [
          "현장에 무슨 일이 있었는지 저도 확인 중이에요.",
          "확실한 기록을 보여 주세요.",
        ],
      ],
      mapImage: "/image/scenario/psychic/map/lab-map.svg",
      locations: [],
      sources: [
        {
          x: 73.2,
          y: 10,
          title: "소장의 사체",
          evidence: {
            id: "body",
            title: "소장의 사체",
            description:
              "소장실에 딸린 화장실의 욕조에서 발견되었다. 손목이 그어진 채 욕조에 누워있다. 손목의 피가 선홍색이다.",
          },
          id: "p4-body",
          versionPhaseId: "phase-4",
        },
        {
          x: 64.3,
          y: 41.6,
          title: "소장실 출입문",
          evidence: {
            id: "door-log",
            title: "소장실 출입문",
            description:
              "다른 방과 달리 지문 인식으로 열리게 설정되어있다. 출입기록은 19시, 23시 30분에 한 번 씩 있다.",
          },
          id: "p4-door",
          versionPhaseId: "phase-4",
        },
        {
          x: 14,
          y: 67.5,
          title: "종이",
          evidence: {
            id: "pill-log",
            title: "대출심사기록",
            description:
              "실험체 A 방에 있던 대출 심사 기록. 대출을 신청한 사람의 이름은 '권정오'. 약 2억원 상당의 대출이다.",
          },
          id: "p4-pill",
          versionPhaseId: "phase-4",
        },
        {
          x: 90.6,
          y: 8.7,
          title: "짜장면 그릇",
          evidence: {
            id: "director-note",
            title: "짜장면 그릇",
            description:
              "짜장면 그릇이 설거지되어있지 않은 채 쌓여있다. 모두 같은 그릇들이라 구별되지 않는다.",
          },
          id: "p4-note",
          versionPhaseId: "phase-4",
        },
        {
          x: 7.6,
          y: 65.7,
          title: "오래된 종이 문서",
          evidence: {
            id: "evidence-8c81c2b6",
            title: "과거 초능력 실험 기록",
            description:
              "김고체라는 이름으로 작성된 오래된 실험 기록이다. 식빵을 먹은 뒤 짜장면을 소환하려 했으나 식빵이 나왔고, 커피를 마신 후에도 결과는 같았다. 이후 볶음밥을 먹자 볶음밥이 소환되었으며, 물을 마신 뒤에도 볶음밥이 나왔다. 기록 하단에는 '원하는 음식을 자유롭게 소환할 수 없음'이라고 적혀 있다. 실험 보조자로 유기체라는 이름이 남아 있다.",
          },
          id: "phase-4-source-evidence-8c81c2b6",
          versionPhaseId: "phase-1",
        },
        {
          x: 25.7,
          y: 52.4,
          title: "노트북",
          evidence: {
            id: "evidence-0b93f6fb",
            title: "노트북",
            description:
              "mjb1102@chon.co.kr 계정으로 recruit@chon.co.kr의 계정과 이메일을 주고받은 기록이 있다. 내용은 '초능력 알약'의 기전에 관한 것이다. ",
          },
          id: "phase-4-source-evidence-0b93f6fb",
          versionPhaseId: "phase-4",
        },
        {
          x: 31.8,
          y: 68.7,
          title: "마스터키",
          evidence: {
            id: "evidence-9e01afc2",
            title: "마스터키",
            description: "어디든 열 수 있는 마스터키이다.",
          },
          id: "phase-4-source-evidence-9e01afc2",
          versionPhaseId: "phase-4",
        },
        {
          x: 19.5,
          y: 31.3,
          title: "캐비닛",
          evidence: {
            id: "evidence-bebfe84a",
            title: "캐비닛",
            description:
              "실험실의 캐비닛. 캐비닛이 이미 살짝 열려있었다. 안은 비어있다.",
          },
          id: "phase-4-source-evidence-bebfe84a",
          versionPhaseId: "phase-4",
        },
        {
          x: 67.7,
          y: 8,
          title: "서랍",
          evidence: {
            id: "evidence-560e89ff",
            title: "10년 전 사건 자료",
            description:
              "10년 전, '유기체'라는 사람에게 초능력 약물을 주사했다가 사망했다는 연구 기록이다. 욕조에 손목을 긋고 자살한 것처럼 위장했다는 메모도 남겨져있다.",
          },
          password: "0414",
          id: "phase-4-source-evidence-560e89ff",
          versionPhaseId: "phase-4",
        },
        {
          x: 12.3,
          y: 55.4,
          title: "옷",
          evidence: {
            id: "evidence-0221b7bc",
            title: "실험체 A의 옷",
            description: "옷이 있다. 옷과 잠옷에 모두 먼지가 있다.",
          },
          id: "phase-4-source-evidence-0221b7bc",
          versionPhaseId: "phase-4",
        },
        {
          x: 72.6,
          y: 19.8,
          title: "욕조",
          evidence: {
            id: "evidence-a20cd9ba",
            title: "욕조",
            description:
              "소장이 목욕할 때 사용하는 욕조다. 욕조 안에 붉은색 피가 가득하다.",
          },
          id: "phase-4-source-evidence-a20cd9ba",
          versionPhaseId: "phase-4",
        },
        {
          x: 81.2,
          y: 9,
          title: "칼",
          evidence: {
            id: "evidence-82a326d5",
            title: "부엌칼",
            description:
              "단순한 부엌칼이다. 칼날에 미세하게 선홍색 피가 묻어있다.",
          },
          id: "phase-4-source-evidence-82a326d5",
          versionPhaseId: "phase-4",
        },
        {
          x: 57.3,
          y: 78.1,
          title: "환풍구 지도",
          evidence: {
            id: "pill-vent",
            title: "환풍구 지도",
            description:
              "환풍구가 연결된 지도이다. 소장실에 하나, 실험실에 하나, 그리고 각 숙소별로 하나씩 있다. 환풍구의 위치는 각 숙소의 침대 위이다.",
          },
          id: "phase-4-source-pill-vent",
          versionPhaseId: "phase-1",
        },
        {
          x: 19.9,
          y: 10,
          title: "혈액팩",
          evidence: {
            id: "badge-a",
            title: "혈액팩",
            description:
              "초능력자들의 피들이 보관되어있다. 어제 뽑은 당신의 피를 포함해 A, B, C, 소장의 혈액까지 있다. 소장의 혈액팩 양이 남들보다 적다.",
          },
          id: "phase-4-source-badge-a",
          versionPhaseId: "phase-4",
        },
        {
          x: 94.7,
          y: 28.3,
          title: "오늘의 식단표",
          evidence: {
            id: "schedule",
            title: "오늘의 식단표",
            description:
              "매일매일이 짜장면이다. 조식, 중식, 석식 모두 짜장면으로만 채워져 있다. 단무지조차 없다. 조식은 아침 7시, 중식은 12시, 석식은 저녁 7시이다.",
          },
          id: "phase-4-source-schedule",
          versionPhaseId: "phase-1",
        },
        {
          x: 56.4,
          y: 7.3,
          title: "환풍구",
          evidence: {
            id: "vent",
            title: "환풍구",
            description:
              "환풍구가 있다. 세로 길이가 꽤나 좁아 기어들어가려고 하면 낄 수가 있다. ",
          },
          id: "phase-4-source-vent",
          versionPhaseId: "phase-4",
        },
        {
          x: 37,
          y: 35.4,
          title: "옷",
          evidence: {
            id: "ledger-b",
            title: "소장의 연구복",
            description:
              "소장이 밥을 먹다 의자에 걸어둔 연구복이다. 주머니엔 아무것도 없다.",
          },
          id: "phase-4-source-ledger-b",
          versionPhaseId: "phase-3",
        },
        {
          x: 67.1,
          y: 17.6,
          title: "사진",
          evidence: {
            id: "footage",
            title: "가족 사진",
            description:
              "소장이 부인과 딸과 찍은 사진. 2062년에 찍은 사진이다. 사진 뒷면에는 김짜장과 유기체, 그리고 사랑하는 딸아이와. 라고 쓰여있다.",
          },
          id: "phase-4-source-footage",
          versionPhaseId: "phase-1",
        },
        {
          x: 63,
          y: 26.5,
          title: "보고서",
          evidence: {
            id: "forecast-original",
            title: "초능력 보고서",
            description:
              "각 실험체의 본명과 능력이 적혀있다. 권정오 - 공중부양(5cm), 묵지바 - 가위바위보 무조건 이기기, 김액체 - 마지막으로 마신 액체로 주변 액체 변경 가능",
          },
          id: "phase-4-source-forecast-original",
          versionPhaseId: "phase-4",
        },
        {
          x: 25.1,
          y: 62.1,
          title: "문서",
          evidence: {
            id: "evidence-b89b8208",
            title: "초능력 약물에 관한 문서",
            description:
              '"초능력 약물의 성분은 #~#이다. 인간의 큰 트라우마나 강한 기억에서로부터 초능력을 발현시킨다. 다만 아직까지 그 초능력의 위력은 미미한 수준에 그쳤다. 현재까지 이 성분의 기전은 밝혀지지 않았지만, 두 번 이상 먹으면 혈액이 선홍빛으로 변하며 산소 공급이 중단되어 사망에 이른다."',
          },
          id: "phase-4-source-evidence-b89b8208",
          versionPhaseId: "phase-4",
        },
        {
          x: 38.9,
          y: 60,
          title: "쪽지",
          evidence: {
            id: "evidence-a0669973",
            title: "비밀 쪽지",
            description:
              '쪽지에는 "소장실 서랍 밑 금고를 봐. 0414." 라고 쓰여있다.',
          },
          id: "phase-4-source-evidence-a0669973",
          versionPhaseId: "phase-4",
        },
        {
          x: 77.4,
          y: 34.6,
          title: "설거지 당번표",
          evidence: {
            id: "evidence-aec28b2a",
            title: "설거지 당번표",
            description:
              "설거지 당번표에는 A와 C가 번갈아가며 쓰여있다. 가위바위보로만 정한다고 되어있다. 오늘은 모두 C가 당번이었다. 아마, 신입보호기간이 끝나면 나도 가위바위보에 참여하겠지.",
          },
          id: "phase-4-source-evidence-aec28b2a",
          versionPhaseId: "phase-1",
        },
        {
          x: 57.3,
          y: 21.7,
          title: "초능력 알약",
          evidence: {
            id: "evidence-6810b6b5",
            title: "초능력 알약",
            description:
              "초능력을 부여할 때 먹는 흰색 알약이다. 통에 보관되어있다. 2개가 들어있다.",
          },
          id: "phase-4-source-evidence-6810b6b5",
          versionPhaseId: "phase-4",
        },
        {
          x: 19,
          y: 70,
          title: "침대 위",
          evidence: {
            id: "evidence-b50d4568",
            title: "초능력 해독제",
            description:
              "초능력 약물을 실수로 2정 이상 복용했을 때 빠르게 먹으면 해독할 수 있는 물약이다. 초능력 약물을 실수로 복용한 후 5~10분 내로 먹어야한다.",
          },
          id: "phase-4-source-evidence-b50d4568",
          versionPhaseId: "phase-4",
        },
      ],
      combinations: [],
      interrogations: [
        {
          suspectName: "실험체 A",
          conversation: [
            {
              speaker: "나",
              text: "소장님 소식을 들었어요?",
            },
            {
              text: "응. 방금 들었어. 믿기지 않아.",
            },
          ],
          conversationChoices: [
            {
              id: "p4-where",
              question: "자정 전에는 어디에 있었어요?",
              answer: [
                {
                  text: "소등 시각 전후를 얘기하는 거겠지. 나는 계속 숙소에 있었어.",
                },
                {
                  text: "내가 제일 끝 방이라 뭐 들은 것도 없지.",
                },
              ],
            },
          ],
          questions: [],
        },
        {
          suspectName: "실험체 B",
          conversation: [
            {
              speaker: "나",
              text: "무슨 일이 있었는지 봤어요?",
            },
            {
              text: "아니, 나도 소식을 방금 들었어.",
            },
          ],
          conversationChoices: [
            {
              id: "p4-after",
              question: "저녁 식사 때 어디가셨었어요?",
              answer: [
                {
                  text: "화장실에 있었어.",
                },
                {
                  text: "이런 것까지 얘기해줘야하나...",
                },
              ],
            },
            {
              id: "p4-director",
              question: "소등시각 전후로 어디에 계셨어요?",
              answer: [
                {
                  text: "난 내 숙소에서 쉬고 있었어.",
                },
                {
                  text: "처리해야할 일도 있고.",
                },
              ],
            },
          ],
          questions: [],
        },
        {
          suspectName: "실험체 C",
          conversation: [
            {
              speaker: "나",
              text: "괜찮으세요?",
            },
            {
              text: "모르겠어요. 흐흑...",
            },
          ],
          conversationChoices: [
            {
              id: "p4-return",
              question: "어떻게 시체를 발견하게 되었죠?",
              answer: [
                {
                  text: "그냥 소장님이 원래 저녁 드시고 어디 나갔다가 소등 전에는 들어오시거든요.",
                },
                {
                  text: "그런데도 안들어오시길래 소장실 문을 마스터키로 열고 들어갔는데, 이런 일이...",
                },
              ],
            },
            {
              id: "p4-room",
              question: "11시 전후로 뭐하셨나요?",
              answer: [
                {
                  text: "전 계속 숙소에 있었어요.",
                },
                {
                  text: "B와 대화한 것 말고는 기억나는 것도 없네요. 소장님은 늘 담배피러 나가셔서 그냥 오늘도 그런 줄 알았죠.",
                },
              ],
            },
          ],
          questions: [],
        },
        {
          suspectName: "난초",
          conversation: [
            {
              speaker: "난초",
              text: "안녕. 난. 난이야.",
            },
          ],
          conversationChoices: [
            {
              id: "choice-ffafd7f5",
              question: "오늘 저녁에 본 게 있니?",
              answer: [
                {
                  text: "난 식물이라 눈이 없는데.",
                },
                {
                  speaker: "난초",
                  text: "하지만, 복도에서 7시 경에 소란이 있었어. 소장이 당황하다가 쓰러지는 듯해 보였지.",
                },
              ],
            },
            {
              id: "choice-4c9096a3",
              question: "오늘 밤에 본 게 있니?",
              answer: [
                {
                  text: "난 식물이라 눈이 없어.",
                },
                {
                  speaker: "난초",
                  text: "하지만, 내가 광합성 끝냈을 때. 그러니까 소등 시간 이후겠지. 누군가 무거운 걸 질질 끄는 듯한 소리를 들었지.",
                },
              ],
            },
          ],
          questions: [],
        },
      ],
      requiredCombinationIds: [],
      requiredQuestionIds: [],
      people: [
        {
          name: "실험체 A",
          x: 9,
          y: 77,
        },
        {
          name: "실험체 B",
          x: 23,
          y: 77,
        },
        {
          name: "실험체 C",
          x: 37,
          y: 77,
        },
        {
          name: "난초",
          x: 5.1,
          y: 43.9,
        },
      ],
    },
    {
      id: "final-interrogation",
      title: "최종 추리",
      timeLabel: "4/15 이후",
      energyLimit: 30,
      finalInterrogation: true,
      intro:
        "현장 조사는 끝났다. 지금까지 모은 단서로 남은 세 사람에게 마지막 질문을 하자.",
      fallbackAnswers: [
        [
          "이미 아는 것은 모두 말했습니다.",
          "그 단서만으로는 다른 답을 드릴 수 없어요.",
        ],
        [
          "마지막으로 확인할 자료라면 정확히 보여 주세요.",
          "지금은 더 덧붙일 말이 없습니다.",
        ],
      ],
      mapImage: "/image/scenario/psychic/map/lab-map.svg",
      locations: [],
      sources: [],
      combinations: [],
      interrogations: [
        {
          suspectName: "실험체 A",
          questions: [
            ...psychicFinalQuestions.A,
            {
              id: "final-interrogation-question-question-93455d73",
              evidenceIds: ["phase-1::evidence-8c81c2b6"],
              answer: [
                {
                  text: "그래, 내 방에서 나왔다는 건 내가 봤다는거지.",
                  speaker: "실험체 A",
                },
                {
                  text: "김고체라는 사람은 마지막으로 먹은 음식을 소환할 수 있는 모양이야.",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-7328627f",
              evidenceIds: [
                "phase-4::forecast-original",
                "phase-4::evidence-b89b8208",
              ],
              answer: [
                {
                  text: "C에게 물어보라구.",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-bcf02556",
              evidenceIds: ["phase-4::evidence-0221b7bc", "phase-1::footage"],
              answer: [
                {
                  text: "옷은 아쉽게도, 사진 속 옷이 아니네.",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-a34495aa",
              evidenceIds: ["phase-4::door-log", "phase-4::forecast-original"],
              answer: [
                {
                  text: "이걸 왜 나에게? 내가 뭐 텔레포트 능력자라는건가.",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-dcf0a422",
              evidenceIds: ["phase-4::director-note", "phase-3::forecast"],
              answer: [
                {
                  text: "짜장면과 짜장면 그릇이군.",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-954c7ea8",
              evidenceIds: ["phase-3::notice", "phase-4::forecast-original"],
              answer: [
                {
                  text: "액체 능력자가 차에다가 뭘 했다...라는 추리인가?",
                  speaker: "실험체 A",
                },
                {
                  text: '"뭘 했을까?"를 얘기안하고 내가 선뜻 진술해줄거라고 생각했나.',
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-4be77788",
              evidenceIds: ["phase-4::badge-a", "phase-4::evidence-a20cd9ba"],
              answer: [
                {
                  text: "이 피는 확실히 혈액팩의 양이라기에는 너무 많아.",
                  speaker: "실험체 A",
                },
                {
                  text: "누가 이런 짓을 한거지?",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-4e72dd48",
              evidenceIds: ["phase-4::body", "phase-4::badge-a"],
              answer: [
                {
                  text: "자, 소장의 피는 붉은 색이야. 근데 왜 시체 손목의 피는 선홍색일까?",
                  speaker: "실험체 A",
                },
                {
                  text: "이 점에 주목해보자...아마 혈액팩의 피를 썼을지도 몰라.",
                  speaker: "실험체 A",
                },
                {
                  text: "잠깐, 근데 혈액팩에서 줄어든 피가 그렇게 많지 않은데.",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-12e4f09c",
              evidenceIds: ["phase-4::door-log", "phase-4::evidence-9e01afc2"],
              answer: [
                {
                  text: "난 마스터키를 쓴 적이 없대도.",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-c96a3ce1",
              evidenceIds: [
                "phase-4::evidence-6810b6b5",
                "phase-2::evidence-ecfd8386",
              ],
              answer: [
                {
                  text: "실수로 2개 먹었어도 해독이 가능하지.",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-1eeecfdf",
              evidenceIds: ["phase-1::footage", "phase-4::evidence-560e89ff"],
              answer: [
                {
                  text: "C에게 물어봐.",
                  speaker: "실험체 A",
                },
                {
                  text: "난 모른다구.",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-79206f70",
              evidenceIds: [
                "phase-4::evidence-0b93f6fb",
                "phase-4::evidence-b89b8208",
              ],
              answer: [
                {
                  text: "B에게 물어봐.",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-05d3ccf1",
              evidenceIds: ["phase-4::evidence-0b93f6fb"],
              answer: [
                {
                  text: "이건 B 노트북이잖아. 어쩐지 몰래 뭐 하더라니.",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-d16707af",
              evidenceIds: [
                "phase-4::forecast-original",
                "phase-4::evidence-b50d4568",
              ],
              answer: [
                {
                  text: "뭐, 어쩌라는거지.",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-882f0cca",
              evidenceIds: ["phase-4::vent", "phase-4::forecast-original"],
              answer: [
                {
                  text: "그래, 내가 초능력으로 환풍구를 드나들 수 있는 건 인정할게.",
                  speaker: "실험체 A",
                },
                {
                  text: "뭐, 오늘 했다는 증거는 없지만. 봅슬레이마냥 환풍구를 소리 안나게 왕복할 수 있어.",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-7c2ab7aa",
              evidenceIds: [
                "phase-4::evidence-0221b7bc",
                "phase-4::vent",
                "phase-4::forecast-original",
              ],
              answer: [
                {
                  text: "맞아. 초능력을 이용해 난 봅슬레이마냥 환풍구를 드나들 수 있어.",
                  speaker: "실험체 A",
                },
                {
                  text: "그래서 먼지가 끼었던거고.",
                  speaker: "실험체 A",
                },
                {
                  text: "그러니, 나도 사실 소장실 접근 가능성이 있다는 거겠지.",
                  speaker: "실험체 A",
                },
                {
                  text: "이걸 들키다니... 줴줴이야~",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-3b5c1c23",
              evidenceIds: [
                "phase-4::forecast-original",
                "phase-1::evidence-aec28b2a",
              ],
              answer: [
                {
                  text: "음, 이건 몰랐는데 가위바위보를 이기는 능력이 있네.",
                  speaker: "실험체 A",
                },
                {
                  text: "어쩐지 B가 가위바위보를 매번 이기더라.",
                  speaker: "실험체 A",
                },
                {
                  text: "아니, 이게 능력이라고? 진짜 어이가 없네.",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-9f4f2c24",
              evidenceIds: ["phase-4::evidence-9e01afc2", "phase-3::ledger-b"],
              answer: [
                {
                  text: "음, 확실히 소장의 연구복에 있던걸 훔쳐갔나보네.",
                  speaker: "실험체 A",
                },
                {
                  text: "일단 난 아님.",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-11694640",
              evidenceIds: [
                "phase-4::evidence-9e01afc2",
                "phase-4::evidence-a0669973",
              ],
              answer: [
                {
                  text: "난 몰라 이런거!",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-56e27f4b",
              evidenceIds: ["phase-4::evidence-9e01afc2"],
              answer: [
                {
                  text: "이거 마스터키잖아. 난 얻은 적 없어.",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-ae37b89b",
              evidenceIds: ["phase-4::evidence-a0669973"],
              answer: [
                {
                  text: "난 모르는 쪽지야.",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-43d03255",
              evidenceIds: ["phase-4::evidence-b89b8208"],
              answer: [
                {
                  text: "오, 흥미로운 내용이야.",
                  speaker: "실험체 A",
                },
                {
                  text: "근데 왜 이게 B의 방에서?",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-797b2b18",
              evidenceIds: ["phase-4::evidence-b50d4568"],
              answer: [
                {
                  text: "음, 초능력 해독제구나. 2개 이상 먹었을 때 해독할 수 있는 해독제네.",
                  speaker: "실험체 A",
                },
                {
                  text: "그러면 뭐 2개 이상 먹었어도 죽지 않을 수 있겠군.",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-cfdd0b8e",
              evidenceIds: ["phase-4::forecast-original"],
              answer: [
                {
                  text: "뭐야, 이런걸 어떻게 구했어. ",
                  speaker: "실험체 A",
                },
                {
                  text: "이것만 가지고는 내 능력과 본명을 알려줄 순 업지.",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-ef0ac8d1",
              evidenceIds: ["phase-4::director-note"],
              answer: [
                {
                  text: "응, 짜장면 그릇이야. 음식 소환 능력인데 그릇이 안나온다니 참 신기하지?",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-6b6b6ab1",
              evidenceIds: ["phase-4::pill-log"],
              answer: [
                {
                  text: "그래, 내 대출 심사 기록이야.",
                  speaker: "실험체 A",
                },
                {
                  text: "돈이 없어서 여기 들어온거라고. 불만있어?",
                  speaker: "실험체 A",
                },
                {
                  text: "소장이 돈을 안주는 데 어떻게 해.",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-0aed059f",
              evidenceIds: ["phase-4::body"],
              answer: [
                {
                  text: "하, 소장님이 이렇게 죽을 줄 몰랐어.",
                  speaker: "실험체 A",
                },
                {
                  text: "손목을 그으시다니. 뭔가 힘든일이 있으셨나.",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-4f5da3d5",
              evidenceIds: ["phase-3::notice"],
              answer: [
                {
                  text: "응, 맞아. 내가 타서 준 차야.",
                  speaker: "실험체 A",
                },
                {
                  text: "뭐 여기에 독을 탔을 수는 있겠지.",
                  speaker: "실험체 A",
                },
                {
                  text: "근데 그건 짜장면 그릇도 마찬가지 아냐?",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-cddc2394",
              evidenceIds: ["phase-3::forecast"],
              answer: [
                {
                  text: "뭐, 오늘 먹은 짜장면이잖아.",
                  speaker: "실험체 A",
                },
                {
                  text: "아마 여기에 뭘 탔을 수 있겠네.",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-5a9cd1ea",
              evidenceIds: ["phase-3::ledger-b"],
              answer: [
                {
                  text: "그냥 소장의 연구복이잖아.",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-b23813e7",
              evidenceIds: ["phase-2::evidence-ecfd8386"],
              answer: [
                {
                  text: "초능력 해독제구나. 실수로 초능력 알약을 먹어도 이걸 먹으면 해독되지.",
                  speaker: "실험체 A",
                },
                {
                  text: "넌 처음왔으니 모르겠구나.",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-4acc940c",
              evidenceIds: ["phase-4::evidence-6810b6b5"],
              answer: [
                {
                  text: "초능력 알약이 있네. 줄어들었다는 건 누군가 가져갔을 수 있다는 거겠지.",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-f863dda3",
              evidenceIds: ["phase-4::evidence-0221b7bc", "phase-4::vent"],
              answer: [
                {
                  text: "음, 먼지의 모양새와 환풍구의 먼지가 사라진게 마침 오늘이었다니.\n맞아, 환풍구를 탔어. 내 능력 덕분이지. 목적은 뭐, 소장실 침입 아니겠어?\n하지만 알아둬. 환풍구로는 나만 들어가서 움직일 수 있다는 것. 소장을 이동시켰거나 하는건 아니니까.",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-ce3045a4",
              evidenceIds: ["phase-4::door-log"],
              answer: [
                {
                  text: "소장실 출입문? 난 쓴 적 없어.",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-3963a8da",
              evidenceIds: ["phase-1::footage"],
              answer: [
                {
                  text: "음, 소장의 가족 사진이군.",
                  speaker: "실험체 A",
                },
                {
                  text: "아내와 딸이 있었나? 난 모르는 일인데..",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-f286d4f6",
              evidenceIds: ["phase-4::evidence-82a326d5"],
              answer: [
                {
                  text: "음, 칼이 있군요. 피도 묻어있는 것 같고.",
                  speaker: "실험체 A",
                },
                {
                  text: "그냥 그정도인 것 같네. 나와는 관련 없어.",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-e2e2bc59",
              evidenceIds: ["phase-4::evidence-a20cd9ba"],
              answer: [
                {
                  text: "음. 이렇게 끔찍하게 자살하신걸까. 피가 흥건하네.",
                  speaker: "실험체 A",
                },
                {
                  text: "어라 손목의 피 색깔은 좀 더 선홍빛인데.",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-70d482a6",
              evidenceIds: ["phase-4::evidence-0221b7bc"],
              answer: [
                {
                  text: "제 옷입니다. 평소에 잘 다려놓죠. 먼지가 묻은건... 하하. 뭐 먼지 묻을 일이 어디있겠어요. 단서를 더 가져오세요.",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-87fef741",
              evidenceIds: ["phase-4::evidence-560e89ff"],
              answer: [
                {
                  text: "이게 뭐야.. 사람이 죽었다고?",
                  speaker: "실험체 A",
                },
                {
                  text: "그래, 이 초능력 실험 꽤나 위험한거라니까!! 근데 소장은 위험수당도 안주고.",
                  speaker: "실험체 A",
                },
                {
                  text: "... 에휴.",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-36dbe5e9",
              evidenceIds: ["phase-4::evidence-bebfe84a"],
              answer: [
                {
                  text: "캐비닛? 이거 평소에 닫아두는 캐비닛인데 뭐 문제 있었나? ",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-51bcb7a7",
              evidenceIds: ["phase-4::vent"],
              answer: [
                {
                  text: "환풍구. 그래. 지금 내가 환풍구를 탔다고 의심하는건가? 하지만 더 자세한 증거를 가져와. ",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-fbb53b75",
              evidenceIds: ["phase-1::pill-vent"],
              answer: [
                {
                  text: "이건 환풍구 지도라는거야. 뭐 더 얘기할게 있나.",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-fd10ab91",
              evidenceIds: ["phase-1::evidence-aec28b2a"],
              answer: [
                {
                  text: "음, 내가 열심히 설거지를 했던 기록이군.",
                  speaker: "실험체 A",
                },
                {
                  text: "하지만 잘 봐봐, 오늘은 내가 설거지 당번이 아니었어. C가 당번이었다구. 혹시 내가 짜장면에 뭘 넣었을거라고 의심하는건가?",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-3d53c74e",
              evidenceIds: ["phase-1::schedule"],
              answer: [
                {
                  text: "그렇지. 하.... 질려서 죽어버리고 싶어.",
                  speaker: "실험체 A",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-47cea056",
              evidenceIds: ["phase-4::badge-a"],
              answer: [
                {
                  text: "우리 들어올 때 다 피 뽑아놨잖아. 혹시 모를 걸 대비해 뽑아놓은거지. 그 이상의 목적은 없어.",
                  speaker: "실험체 A",
                },
              ],
            },
          ],
        },
        {
          suspectName: "실험체 B",
          questions: [
            ...psychicFinalQuestions.B,
            {
              id: "final-interrogation-question-question-4995bf75",
              evidenceIds: ["phase-1::evidence-8c81c2b6"],
              answer: [
                {
                  text: "이건 처음 보는 자료야.",
                  speaker: "실험체 B",
                },
                {
                  text: "A에게 물어보지?",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-8c9e6ae1",
              evidenceIds: ["phase-4::door-log", "phase-4::forecast-original"],
              answer: [
                {
                  text: "아, 지문 인식을 못하게 내가 방해할 수 있다 그소리인가?",
                  speaker: "실험체 B",
                },
                {
                  text: "대단해, D. 신입인데 내 능력까지 알아내다니.",
                  speaker: "실험체 B",
                },
                {
                  text: "맞아. 내가 가위바위보에서 '보'를 내니까 소장이 주먹을 못피더라고.",
                  speaker: "실험체 B",
                },
                {
                  text: "그러면 지문 인식될 일이 없지~",
                  speaker: "실험체 B",
                },
                {
                  text: "하지만 그게 직접적 사인이야? 아니잖아!",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-abcbb69a",
              evidenceIds: ["phase-3::notice", "phase-4::forecast-original"],
              answer: [
                {
                  text: "음...",
                  speaker: "실험체 B",
                },
                {
                  text: "난 모르는 일이양",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-22fc32d3",
              evidenceIds: ["phase-4::badge-a", "phase-4::evidence-a20cd9ba"],
              answer: [
                {
                  text: "음, 피가 확실히 조작된거같아.",
                  speaker: "실험체 B",
                },
                {
                  text: "하지만, 양이 너무 다른걸.",
                  speaker: "실험체 B",
                },
                {
                  text: "이거 뭐 DNA 검사도 안되고.",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-9ef0327c",
              evidenceIds: ["phase-4::body", "phase-4::badge-a"],
              answer: [
                {
                  text: "소장의 피 색이 손목의 피 색과 조금 달라.",
                  speaker: "실험체 B",
                },
                {
                  text: "선홍색 피는 청산가리, 아니면....",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-6fecb645",
              evidenceIds: ["phase-4::door-log", "phase-4::evidence-9e01afc2"],
              answer: [
                {
                  text: "음, 그래.",
                  speaker: "실험체 B",
                },
                {
                  text: "마스터키를 쓴 흔적이겠지. 아마.",
                  speaker: "실험체 B",
                },
                {
                  text: "그 중 하나는 나일지도.",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-0182d1a6",
              evidenceIds: ["phase-1::footage", "phase-4::evidence-560e89ff"],
              answer: [
                {
                  text: "C에게 물어봐.",
                  speaker: "실험체 B",
                },
                {
                  text: "아니, 안 물어보는 편이 나으려나...",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-1b2b14dc",
              evidenceIds: [
                "phase-4::evidence-0b93f6fb",
                "phase-4::evidence-b89b8208",
              ],
              answer: [
                {
                  text: "음, 사실대로 얘기해야겠어.",
                  speaker: "실험체 B",
                },
                {
                  text: "맞아. 난 이 초능력 약물에 관한 문서를 다른 사람과 공유하려했어.",
                  speaker: "실험체 B",
                },
                {
                  text: "그냥, 이유는 묻지 말아줘. 그게 내가 소장실에 들어간 이유고.",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-c0664033",
              evidenceIds: [
                "phase-4::evidence-0b93f6fb",
                "phase-4::evidence-560e89ff",
              ],
              answer: [
                {
                  text: "이걸 원한 건 아니야. 내가 이걸 조사하려는 목적이었으면 내 방에 있었겠지?",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-382d33ec",
              evidenceIds: ["phase-4::evidence-0b93f6fb"],
              answer: [
                {
                  text: "음, 사실대로 얘기할 수 밖에 없나.",
                  speaker: "실험체 B",
                },
                {
                  text: "그냥, 나는 추가적으로 연구가 하고 싶어. 이 초능력 약물에 대해. 그래서 좀 더 몰래 조사했던거고.",
                  speaker: "실험체 B",
                },
                {
                  text: "더 이상 알려줄 수는 없어. 내 노트북 닫아줄래?",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-c920e2a5",
              evidenceIds: [
                "phase-4::forecast-original",
                "phase-4::evidence-b89b8208",
              ],
              answer: [
                {
                  text: "C에게 물어봐.",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-50bed7db",
              evidenceIds: [
                "phase-4::forecast-original",
                "phase-4::evidence-b50d4568",
              ],
              answer: [
                {
                  text: "초능력 해독제와 관련된 능력은 없어보여.",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-8ec8ed8e",
              evidenceIds: [
                "phase-4::evidence-0221b7bc",
                "phase-4::vent",
                "phase-4::forecast-original",
              ],
              answer: [
                {
                  text: "이건 A에게 직접 물어봐.",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-9028ea1c",
              evidenceIds: [
                "phase-4::forecast-original",
                "phase-1::evidence-aec28b2a",
              ],
              answer: [
                {
                  text: "그래, 사실대로 말할게.",
                  speaker: "실험체 B",
                },
                {
                  text: "내가 가위바위보를 모두 이기는 능력자야.",
                  speaker: "실험체 B",
                },
                {
                  text: "내면 무조건 상대방 정신을 조작해서든 무조건 이기게 되어있어. 상대방의 손을 조작할 수 있지.",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-470d44bd",
              evidenceIds: [
                "phase-4::evidence-9e01afc2",
                "phase-4::forecast-original",
              ],
              answer: [
                {
                  text: "음 내가 마스터키를 훔치는 능력인건 아니야.",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-aacc08e4",
              evidenceIds: ["phase-4::evidence-9e01afc2", "phase-3::ledger-b"],
              answer: [
                {
                  text: "음, 그래 내가 훔친 거 맞아.",
                  speaker: "실험체 B",
                },
                {
                  text: "사실 저녁 이전에 훔쳤어.",
                  speaker: "실험체 B",
                },
                {
                  text: "한, 점심 쯤이었을까. 소매치기하기 쉽더라고.",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-12c7425c",
              evidenceIds: [
                "phase-4::evidence-9e01afc2",
                "phase-4::evidence-a0669973",
              ],
              answer: [
                {
                  text: "다 말할게. 내가 소장실에 잠깐 들어갔었는데, 거기서 뭔갈 봤어.",
                  speaker: "실험체 B",
                },
                {
                  text: "나와 관련된 건 아니지만, 액체와 관련 있다고 생각했어.",
                  speaker: "실험체 B",
                },
                {
                  text: "그래서 동정심에 쪽지와 함께 건네준거야. 한, 21시 쯤.",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-467adb3b",
              evidenceIds: ["phase-4::evidence-9e01afc2"],
              answer: [
                {
                  text: "음...네. 마스터키군요. 제가 소등 직전에 C에게 건네줬어요.",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-8b486f4c",
              evidenceIds: ["phase-4::evidence-a0669973"],
              answer: [
                {
                  text: ".....",
                  speaker: "실험체 B",
                },
                {
                  text: "내가 마스터키와 함께 액체 언니에게 넘겨준 쪽지야.",
                  speaker: "실험체 B",
                },
                {
                  text: "그저 언니를 위해 뭔가 해주고 싶었어.",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-bc2aea19",
              evidenceIds: ["phase-4::evidence-b89b8208"],
              answer: [
                {
                  text: ".....",
                  speaker: "실험체 B",
                },
                {
                  text: "이건 그냥 문서일 뿐이에요. 제가 훔쳤다는 증거가 있나요?",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-11e7c6a6",
              evidenceIds: ["phase-4::evidence-b50d4568"],
              answer: [
                {
                  text: "이게, 왜 내 방에서 나왔는지 모르겠어.",
                  speaker: "실험체 B",
                },
                {
                  text: "난 진짜 모르는 일이야. 애초에 누가 침대 위에 이런걸 올려놓고 자?",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-54ac719a",
              evidenceIds: ["phase-4::forecast-original"],
              answer: [
                {
                  text: "뭐야, 이런걸 어떻게 구했대.",
                  speaker: "실험체 B",
                },
                {
                  text: "나한테도 좀 주면 안될까.",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-df2a798e",
              evidenceIds: ["phase-4::director-note"],
              answer: [
                {
                  text: "음. 우리 짜장면 그릇이 모두 구별 안되긴 하지.",
                  speaker: "실험체 B",
                },
                {
                  text: "어차피 난 평생 가위바위보로 걸릴 일 없으니까.",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-b357e82a",
              evidenceIds: ["phase-4::pill-log"],
              answer: [
                {
                  text: "음, 이런 개인정보가 가득담긴 걸 함부로 보면 안돼, D.",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-f6bc7380",
              evidenceIds: ["phase-4::body"],
              answer: [
                {
                  text: "소장님이 죽으신 모양새가 어째 이상해.",
                  speaker: "실험체 B",
                },
                {
                  text: "소장님은 오른손잡이이신데 오른손을 긋나 보통?",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-cc9ae3d8",
              evidenceIds: ["phase-3::notice"],
              answer: [
                {
                  text: "차네. 평소에 차 심부름도 시키시지.",
                  speaker: "실험체 B",
                },
                {
                  text: "아마 오늘은 A였던 것 같은데.",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-0f284a6c",
              evidenceIds: ["phase-3::forecast"],
              answer: [
                {
                  text: "짜장면이네.",
                  speaker: "실험체 B",
                },
                {
                  text: "김액체가 전달하는걸 봤어.",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-05c89e51",
              evidenceIds: ["phase-3::ledger-b"],
              answer: [
                {
                  text: "소장님의 연구복이네.",
                  speaker: "실험체 B",
                },
                {
                  text: "평소 마스터키를 넣고 다니시는데 왜 여기 걸어두고 가셨을까.",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-d3095fa7",
              evidenceIds: ["phase-2::evidence-ecfd8386"],
              answer: [
                {
                  text: "초능력 해독제구나. 실수로 초능력 알약을 먹어도 이걸 먹으면 해독되지.",
                  speaker: "실험체 B",
                },
                {
                  text: "이건 소장실에 숨겨져있었던 것 같네.",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-8873b0a2",
              evidenceIds: ["phase-4::evidence-6810b6b5"],
              answer: [
                {
                  text: "초능력 알약이 있군. 2번 이상 먹으면 사망하고, 지금 한 알이 비어있다는건.",
                  speaker: "실험체 B",
                },
                {
                  text: "그정도 눈치는 있을거라고 믿어, D.",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-140baba3",
              evidenceIds: ["phase-1::evidence-aec28b2a"],
              answer: [
                {
                  text: "음, 설거지 당번표군.",
                  speaker: "실험체 B",
                },
                {
                  text: "내가 안 써있는건 단순히 가위바위보를 잘해서야. 불만 있으면 너가 이기면 돼.",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-5fb90464",
              evidenceIds: ["phase-4::door-log"],
              answer: [
                {
                  text: "소장실 출입문은 지문으로 열리지.",
                  speaker: "실험체 B",
                },
                {
                  text: "마스터키가 없으면, 나는 열 수 없어.",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-cd990c79",
              evidenceIds: ["phase-1::footage"],
              answer: [
                {
                  text: "음, '유기체'씨가 소장의 아내인가보군.",
                  speaker: "실험체 B",
                },
                {
                  text: "뭐, 김액체에게 듣긴 했지만, 아마 자살했던 것 같아.",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-18297608",
              evidenceIds: ["phase-4::evidence-82a326d5"],
              answer: [
                {
                  text: "뭐, 부엌칼이잖아? 난 이거 건드린 적도 없어.",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-9a7d5918",
              evidenceIds: ["phase-4::evidence-a20cd9ba"],
              answer: [
                {
                  text: "욕조야. 별 문제는 없어보이는데.",
                  speaker: "실험체 B",
                },
                {
                  text: "피가 고인건, 뭐. 자살한건가.",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-4aa5ed80",
              evidenceIds: ["phase-4::evidence-0221b7bc"],
              answer: [
                {
                  text: "뭐야, 그냥 A 옷이잖아.",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-642b219c",
              evidenceIds: ["phase-4::evidence-560e89ff"],
              answer: [
                {
                  text: "음, 이건 나와는 관련 없는 자료야.",
                  speaker: "실험체 B",
                },
                {
                  text: "물론 나도 봤던 자료긴 하지만... 어떻게 보게 되었는지는 너에게 알려주기 싫은걸.",
                  speaker: "실험체 B",
                },
                {
                  text: "더 자세하게 물어보렴.",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-7f5e6fce",
              evidenceIds: ["phase-4::evidence-bebfe84a"],
              answer: [
                {
                  text: "캐비닛이군. 누구나 접근 가능하지. 근데 이거 잘 안열리던데 평소에. 누가 열어놨었나?",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-9acf825d",
              evidenceIds: ["phase-4::vent"],
              answer: [
                {
                  text: "환풍구? 내가 어떻게 거길 기어서 가. 더 확실한 증거를 가져오든가, 다른 사람을 찾아봐.",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-d1e4ef7f",
              evidenceIds: ["phase-1::schedule"],
              answer: [
                {
                  text: "짜장면만 나오는건 소장님이 짜장면 소환 능력자이시기 때문이죠.",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-ab8dc260",
              evidenceIds: ["phase-4::badge-a"],
              answer: [
                {
                  text: "혈액팩이군. 아마 내 것도 있을텐데. 들어올 때 피를 뽑아놨다가 실험 때 조금씩 뽑아 쓸 목적이라고 해. 매번 채혈하긴 그렇잖아?",
                  speaker: "실험체 B",
                },
                {
                  text: "그나저나 다들 피가 검붉구나. 건강이 안좋은건가.",
                  speaker: "실험체 B",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-ee03db34",
              evidenceIds: ["phase-1::pill-vent"],
              answer: [
                {
                  text: "이건 환풍구 지도군요. 어차피 전 들어가지도 못하는거.",
                  speaker: "실험체 B",
                },
              ],
            },
          ],
        },
        {
          suspectName: "실험체 C",
          questions: [
            ...psychicFinalQuestions.C,
            {
              id: "final-interrogation-question-question-5c8e6841",
              evidenceIds: ["phase-1::evidence-8c81c2b6"],
              answer: [
                {
                  text: "A에게 물어보는 게 좋겠어요.",
                  speaker: "실험체 C",
                },
                {
                  text: "김고체...는 아마 저희 아버지 예전 이름일텐데.",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-9c6012e2",
              evidenceIds: ["phase-4::door-log", "phase-4::forecast-original"],
              answer: [
                {
                  text: "B에게 물어보는 게 빠를듯해요.",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-b4eca23b",
              evidenceIds: ["phase-4::badge-a", "phase-4::evidence-a20cd9ba"],
              answer: [
                {
                  text: "아, 이걸 내가 피를 조작했다?",
                  speaker: "실험체 C",
                },
                {
                  text: "뭐, 그럴수도 있지. 근데 양 차이가 너무 나지 않아요?",
                  speaker: "실험체 C",
                },
                {
                  text: "좀 더 정확한 증거 조합을 가져오세요.",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-a463e0ec",
              evidenceIds: [
                "phase-4::badge-a",
                "phase-4::forecast-original",
                "phase-4::evidence-a20cd9ba",
              ],
              answer: [
                {
                  text: "제 능력을 알아내셨네요. 제법인데요? 그런데 제가 피를 소환할 수 있다는게, 죽였다는 증거는 아니잖아요.",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-1f351657",
              evidenceIds: [
                "phase-4::badge-a",
                "phase-4::forecast-original",
                "phase-4::body",
              ],
              answer: [
                {
                  text: "아, 제가 시체의 피를 조작했다 이건가요",
                  speaker: "실험체 C",
                },
                {
                  text: "뭐, 맞아요. 어떻게 알아내셨는진 모르겠는데.",
                  speaker: "실험체 C",
                },
                {
                  text: "왜요, 추리에 혼선이 있나요? 신입이 이것도 추리못하나?",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-42b8a36d",
              evidenceIds: ["phase-4::body", "phase-4::badge-a"],
              answer: [
                {
                  text: "소장의 피가 조금 줄어있네요.",
                  speaker: "실험체 C",
                },
                {
                  text: "뭐, 누군가 마셨거나 그런거 아닐까요? 욕조의 피를 이걸로 조작하기엔 너무 조금 줄어있어요.",
                  speaker: "실험체 C",
                },
                {
                  text: "뭐 더 얘기할건 없네요~",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-c9c82352",
              evidenceIds: [
                "phase-4::evidence-560e89ff",
                "phase-4::evidence-a0669973",
              ],
              answer: [
                {
                  text: "네, 제가 B에게 쪽지를 받고 이 자료를 볼 수 있었어요.",
                  speaker: "실험체 C",
                },
                {
                  text: "그떄가 한, 23시 30분이었나.",
                  speaker: "실험체 C",
                },
                {
                  text: "....... 더 이상 말 시키지 말아주세요. 10년 전 기억이.",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-5ffd46f1",
              evidenceIds: ["phase-4::door-log", "phase-4::evidence-560e89ff"],
              answer: [
                {
                  text: "네, 제가 들어갔어요. 어머니에 관한 자료가 있다는 이야기를 들어서요. 그때 처음 알았어요. 아버지가 무슨 짓을 했는지... 정말 아무것도 모르고 있었네요, 제가.",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-8ec4cc60",
              evidenceIds: ["phase-4::door-log", "phase-4::evidence-9e01afc2"],
              answer: [
                {
                  text: "네, 맞아요.",
                  speaker: "실험체 C",
                },
                {
                  text: "저도 마스터키를 써서 문을 열었죠.",
                  speaker: "실험체 C",
                },
                {
                  text: "아마, 그 둘 중 하나는 제 거일 거에요.",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-725cd07d",
              evidenceIds: [
                "phase-4::evidence-0b93f6fb",
                "phase-4::evidence-b89b8208",
              ],
              answer: [
                {
                  text: "B에게 물어보세요.",
                  speaker: "실험체 C",
                },
                {
                  text: "난 아는게 없답니다~",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-49a946f8",
              evidenceIds: ["phase-4::evidence-0b93f6fb"],
              answer: [
                {
                  text: "B에게 직접 물어보세요.",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-6960100a",
              evidenceIds: [
                "phase-4::forecast-original",
                "phase-4::evidence-b89b8208",
              ],
              answer: [
                {
                  text: "음....뭐, 제 어릴 적 트라우마와 관련이 깊긴 하죠.",
                  speaker: "실험체 C",
                },
                {
                  text: "10년 전 광경을 아직 잊을 수 없어요.",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-87d4945b",
              evidenceIds: [
                "phase-4::forecast-original",
                "phase-4::evidence-b50d4568",
              ],
              answer: [
                {
                  text: "해독제를 복제해서 제가 얻는게 뭐죠?",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-56fc064d",
              evidenceIds: [
                "phase-4::evidence-0221b7bc",
                "phase-4::vent",
                "phase-4::forecast-original",
              ],
              answer: [
                {
                  text: "이건 A에게 직접 물어보세요.",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-a6e3a15d",
              evidenceIds: [
                "phase-4::forecast-original",
                "phase-1::evidence-aec28b2a",
              ],
              answer: [
                {
                  text: "음, 그랬군요. 역시 제가 가위바위보를 못한 게 아니었어요.",
                  speaker: "실험체 C",
                },
                {
                  text: "이 '묵지바'가 가위바위보 능력으로 여태까지 우릴 기망해왔던 것이로군요.",
                  speaker: "실험체 C",
                },
                {
                  text: "내 이를 좌시하지 않을 것입니다. 앞으로 설거지는 모두 B가 할거에요.",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-c47ac5cb",
              evidenceIds: [
                "phase-4::evidence-9e01afc2",
                "phase-4::forecast-original",
              ],
              answer: [
                {
                  text: "마스터키로 이걸 본다 한들, 제가 뭐 할 수 있는게 있을까요.",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-919f709f",
              evidenceIds: ["phase-4::evidence-9e01afc2", "phase-3::ledger-b"],
              answer: [
                {
                  text: "음, 확실히 소장의 연구복에서 훔친 게 맞나보네요.",
                  speaker: "실험체 C",
                },
                {
                  text: "그런데 훔친 건 제가 아니에요. 아마, 저에게 준 B가 훔쳤겠죠.",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-cd7ed4fa",
              evidenceIds: [
                "phase-4::evidence-9e01afc2",
                "phase-4::evidence-a0669973",
              ],
              answer: [
                {
                  text: "음, 이렇게 2개를 B에게 받았어요.",
                  speaker: "실험체 C",
                },
                {
                  text: "한, 밤 9시 쯤이었을까요.",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-782b371e",
              evidenceIds: ["phase-4::evidence-9e01afc2"],
              answer: [
                {
                  text: "제가 가지고 있던 거 맞아요. B가 쪽지와 함께 건네줬어요.",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-f3cf7186",
              evidenceIds: ["phase-4::forecast-original", "phase-3::notice"],
              answer: [
                {
                  text: "아, 액체 능력자니까 내가 차를 어떻게 어떻게 했을거다 이런건가요>",
                  speaker: "실험체 C",
                },
                {
                  text: "하지만 땡~. 그러면 제가 독약을 먹었다는 소리인데...",
                  speaker: "실험체 C",
                },
                {
                  text: "전 해독제가 있는 줄 몰랐는걸요.",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-294c7732",
              evidenceIds: ["phase-4::evidence-a0669973"],
              answer: [
                {
                  text: "이걸 갖고 있었던 건 맞아요.",
                  speaker: "실험체 C",
                },
                {
                  text: "B가 준거에요. 마스터키와 함께요.",
                  speaker: "실험체 C",
                },
                {
                  text: "저녁 먹고 소등 전이었나.",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-88c379c1",
              evidenceIds: ["phase-4::evidence-b89b8208"],
              answer: [
                {
                  text: "어, 이거 막 봐도 되나요?",
                  speaker: "실험체 C",
                },
                {
                  text: "아마 안될텐데... 하하. 이게 누구 방에서 나왔다구요?",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-7b404c89",
              evidenceIds: ["phase-4::evidence-b50d4568"],
              answer: [
                {
                  text: "해독제군요. 이런게 있는지 꿈에도 몰랐어요.",
                  speaker: "실험체 C",
                },
                {
                  text: "그러면 2개 이상 초능력 알약을 먹었어도 해독할 방법이 있었다는거고",
                  speaker: "실험체 C",
                },
                {
                  text: "그걸 왜 이 친구가 가지고 있는진 모르겠지만요.",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-7d508201",
              evidenceIds: ["phase-4::forecast-original"],
              answer: [
                {
                  text: "어, 이걸 어떻게 구하신거죠.",
                  speaker: "실험체 C",
                },
                {
                  text: ".... 함부로 보면 안되는 거에요.",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-72156340",
              evidenceIds: ["phase-4::director-note"],
              answer: [
                {
                  text: "네, 제가 오늘 챙겼던 그릇들이네요.",
                  speaker: "실험체 C",
                },
                {
                  text: "모두 같은 그릇이라 제가 독약을 넣는다한들 타깃을 정확히 죽일 수는 없어요.",
                  speaker: "실험체 C",
                },
                {
                  text: "그 고전소설 '십각관의 살인'을 읽어보시면... 아, 아니에요.",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-4629ce44",
              evidenceIds: ["phase-4::pill-log"],
              answer: [
                {
                  text: "어, 이게 뭐죠. 저는 모르는 건데요.",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-d5e31e60",
              evidenceIds: ["phase-4::body"],
              answer: [
                {
                  text: "이 광경은 낯설지 않네요.",
                  speaker: "실험체 C",
                },
                {
                  text: "결국 돌아가셨군요. 슬프네요.",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-1ba78fd3",
              evidenceIds: ["phase-3::notice"],
              answer: [
                {
                  text: "차군요.",
                  speaker: "실험체 C",
                },
                {
                  text: "이것도 심부름 시키시는데 보통 A님이 타드리긴 해요. 오늘도 마찬가지였고요.",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-20af6901",
              evidenceIds: ["phase-3::forecast"],
              answer: [
                {
                  text: "짜장면이군요. 제가 전달해드린.",
                  speaker: "실험체 C",
                },
                {
                  text: "여기에 독을 탔을거라고요? 설마요.",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-40956740",
              evidenceIds: ["phase-3::ledger-b"],
              answer: [
                {
                  text: "연구복이네요.",
                  speaker: "실험체 C",
                },
                {
                  text: "....",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-7ff70962",
              evidenceIds: ["phase-2::evidence-ecfd8386"],
              answer: [
                {
                  text: "초능력 해독제? 이런 것도 있었나요?",
                  speaker: "실험체 C",
                },
                {
                  text: "아하, 그럼 실수로 2번 먹어도 살 수 있는 방법이 있었군요...",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-2c148403",
              evidenceIds: ["phase-4::evidence-6810b6b5"],
              answer: [
                {
                  text: "초능력 알약이군요.",
                  speaker: "실험체 C",
                },
                {
                  text: "절대 먹으시면 안돼요. 이미 한 번 드셨잖아요.",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-3b296dd1",
              evidenceIds: ["phase-4::evidence-560e89ff", "phase-1::footage"],
              answer: [
                {
                  text: "아... 아...\n흑....\n맞아요. 제가 그 딸이에요. 소장님 딸이라구요.\n그래서 오늘 11시 넘어서 몰래 소장실에 들어가서 이걸 봤어요. 그런데...\n10년 전 자살한 우리 엄마가, 사실 사고사였대요. 이걸 어떻게 자식에게까지 숨겨요?\n제가 그 광경을 처음 목격했을 때가 아직도 생생해요.",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-8c514786",
              evidenceIds: ["phase-1::evidence-aec28b2a"],
              answer: [
                {
                  text: "네, 설거지 당번표군요.",
                  speaker: "실험체 C",
                },
                {
                  text: "오늘 제가 설거지한 건 맞아요. 그릇을 닦고 그 그릇으로 소장님의 짜장면을 받아 건네준 건 사실이죠. 뭐, 그때 청산가리 같은 독극물을 넣었다라고 하면 말이 되긴 하는데요...",
                  speaker: "실험체 C",
                },
                {
                  text: "아직 증거가 부족하네요!",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-4322c668",
              evidenceIds: ["phase-4::door-log"],
              answer: [
                {
                  text: "소장실 출입문이군요.",
                  speaker: "실험체 C",
                },
                {
                  text: "....제가 출입했다는 증거가 있나요?",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-a07cc842",
              evidenceIds: ["phase-1::footage"],
              answer: [
                {
                  text: "......",
                  speaker: "실험체 C",
                },
                {
                  text: "이런 걸 왜 가지고 있는지 모르겠어요.",
                  speaker: "실험체 C",
                },
                {
                  text: "위선자.",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-65445116",
              evidenceIds: ["phase-4::evidence-82a326d5"],
              answer: [
                {
                  text: "부엌칼이네요. 분명 오전에는 피가 안 묻어있었던 것 같은데.",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-0d93ce11",
              evidenceIds: ["phase-4::evidence-a20cd9ba"],
              answer: [
                {
                  text: "10년 전 그때와 똑같아요.",
                  speaker: "실험체 C",
                },
                {
                  text: "그때도 욕조에, 빨간 핏물이 고여있었죠.",
                  speaker: "실험체 C",
                },
                {
                  text: "하...",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-102453d8",
              evidenceIds: ["phase-4::evidence-0221b7bc"],
              answer: [
                {
                  text: "옷이네요.",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-2ccbfc7d",
              evidenceIds: ["phase-4::evidence-560e89ff"],
              answer: [
                {
                  text: "아...",
                  speaker: "실험체 C",
                },
                {
                  text: "으음...",
                  speaker: "실험체 C",
                },
                {
                  text: "맞아요. 제가 본 자료에요. 오늘 밤에 보게 되었죠. 소등 이후에 침입한게 저에요.",
                  speaker: "실험체 C",
                },
                {
                  text: "하... 더이상 말하기 싫네요. 스트레스 받아요.",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-c4b74b29",
              evidenceIds: ["phase-4::evidence-bebfe84a"],
              answer: [
                {
                  text: "캐비닛이네요. 더 할말은 없어요. 사람이 숨기 딱 좋은 크기네요.",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-e5637d58",
              evidenceIds: ["phase-4::vent"],
              answer: [
                {
                  text: "환풍구요? 전 몸이 약해서 그런데 못들어가요. 제가 환풍구로 이동했다는 증거라도 있나요?",
                  speaker: "실험체 C",
                },
                {
                  text: "공간도 작아서 움직이지도 못하겠구만.",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-ed83e5fd",
              evidenceIds: ["phase-1::schedule"],
              answer: [
                {
                  text: "그 단서에 대해서는 할 말이 없습니다. 그냥 짜장면이 많이 나온다는 거죠.",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-4289fff5",
              evidenceIds: ["phase-4::badge-a"],
              answer: [
                {
                  text: "아, 이거요. 혈액팩이에요.",
                  speaker: "실험체 C",
                },
                {
                  text: "소장님께서 들어올때 다들 한 팩씩 뽑아놨어요. 실험할 때마다 뽑기 귀찮다면서요. ",
                  speaker: "실험체 C",
                },
                {
                  text: "전 거의 5년 전에 뽑아서 기억이 안나네요. 2082년의 기술력으로는 5년된 혈액은 상하지 않죠.",
                  speaker: "실험체 C",
                },
              ],
            },
            {
              id: "final-interrogation-question-question-4de162cc",
              evidenceIds: ["phase-1::pill-vent"],
              answer: [
                {
                  text: "이게 뭐죠? 아, 환풍구 지도네요. .... 어쩌라는거지..",
                  speaker: "실험체 C",
                },
              ],
            },
          ],
        },
      ],
      requiredCombinationIds: [],
      requiredQuestionIds: [],
      people: [
        {
          name: "실험체 A",
          x: 9,
          y: 77,
        },
        {
          name: "실험체 B",
          x: 23,
          y: 77,
        },
        {
          name: "실험체 C",
          x: 37,
          y: 77,
        },
      ],
    },
  ],
  fallbackAnswers: [
    [
      {
        text: "그 단서에 관해서는 제가 아는 게 없습니다.",
      },
    ],
    ["그건 저와 관련이 없어요.", "다른 사람에게 물어보세요."],
    [
      "지금은 그 기록만으로 말씀드릴 수 있는 게 없네요.",
      "더 확실한 자료가 있으면 보여 주세요.",
    ],
  ],
  people: [
    {
      name: "난초",
      description: "",
      canInterrogate: false,
    },
  ],
};
