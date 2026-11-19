import type { InterrogationScenarioType } from "@/types";

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
          description: "환풍구가 연결된 지도이다.",
          evidence: {
            id: "pill-vent",
            title: "환풍구 지도",
            description: "환풍구가 연결된 지도이다.",
          },
          id: "p1-pill",
          versionPhaseId: "phase-1",
        },
        {
          x: 19.9,
          y: 10,
          title: "혈액팩",
          description: "",
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
          description: "메인홀 벽에 일정표가 붙어 있다.",
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
          description: "누군가의 상태를 기록하는 장비다.",
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
          x: 19.5,
          y: 31.3,
          title: "캐비닛",
          description: "",
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
          description: "",
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
          description: "",
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
          description: "",
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
          description: "",
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
          description: "메인홀 카메라가 녹화 중이다.",
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
          description: "출입 단말기에 마지막 사용 내역이 남아 있다.",
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
          description: "",
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
          description: "",
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
          description: "",
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
              question: "예측이 항상 맞나요?",
              answer: [
                "아니요. 흐릿하게 보일 때도 있어요.",
                "틀린 예측까지 원본에 적어 둡니다.",
              ],
            },
            {
              id: "p1-records",
              question: "기록은 누가 보관해요?",
              answer: [
                "원본은 제가 작성해요.",
                "검사가 끝나면 소장님께 제출합니다.",
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
          "시연 준비 때문에 자세히 확인하지 못했어요.",
          "다른 자료가 있으면 보여 주세요.",
        ],
      ],
      mapImage: "/image/scenario/psychic/map/lab-map.svg",
      locations: [],
      sources: [
        {
          x: 19.5,
          y: 31.3,
          title: "캐비닛",
          description: "",
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
          description: "",
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
          description: "",
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
          description: "",
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
          description: "",
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
          description: "환풍구가 연결된 지도이다.",
          evidence: {
            id: "pill-vent",
            title: "환풍구 지도",
            description: "환풍구가 연결된 지도이다.",
          },
          id: "phase-2-source-pill-vent",
          versionPhaseId: "phase-1",
        },
        {
          x: 19.9,
          y: 10,
          title: "혈액팩",
          description: "",
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
          description: "메인홀 벽에 일정표가 붙어 있다.",
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
          description: "누군가의 상태를 기록하는 장비다.",
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
          description: "메인홀 카메라가 녹화 중이다.",
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
          description: "출입 단말기에 마지막 사용 내역이 남아 있다.",
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
          description: "",
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
          description: "",
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
          description: "",
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
      energyLimit: 8,
      intro:
        "오후 7시. 시연회가 시작된다. 사람이 많은 동안의 동선을 기억해 두자.",
      fallbackAnswers: [
        [
          "지금은 공개 시연 중입니다.",
          "그 단서에 대해서는 행사가 끝난 뒤 이야기하죠.",
        ],
        [
          "카메라와 관객 앞에서 계속 움직이고 있어요.",
          "그 기록은 아직 보지 못했습니다.",
        ],
      ],
      mapImage: "/image/scenario/psychic/map/lab-map.svg",
      locations: [],
      sources: [
        {
          x: 94.7,
          y: 28.3,
          title: "오늘의 식단표",
          description: "메인홀 벽에 일정표가 붙어 있다.",
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
          x: 19.5,
          y: 31.3,
          title: "캐비닛",
          description: "",
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
          description: "",
          evidence: {
            id: "evidence-0221b7bc",
            title: "실험체 A의 옷과 잠옷",
            description: "옷과 잠옷이 있다. 옷에 먼지가 있다. 잠옷은 깔끔하다.",
          },
          id: "phase-3-source-evidence-0221b7bc",
          versionPhaseId: "phase-3",
        },
        {
          x: 72.6,
          y: 19.8,
          title: "욕조",
          description: "",
          evidence: {
            id: "evidence-a20cd9ba",
            title: "욕조",
            description: "소장이 목욕할 때 사용하는 욕조다.",
          },
          id: "phase-3-source-evidence-a20cd9ba",
          versionPhaseId: "phase-1",
        },
        {
          x: 81.2,
          y: 9,
          title: "칼",
          description: "",
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
          description: "환풍구가 연결된 지도이다.",
          evidence: {
            id: "pill-vent",
            title: "환풍구 지도",
            description: "환풍구가 연결된 지도이다.",
          },
          id: "phase-3-source-pill-vent",
          versionPhaseId: "phase-1",
        },
        {
          x: 19.9,
          y: 10,
          title: "혈액팩",
          description: "",
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
          description: "실험체 B의 지급 내역이 있다.",
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
          description: "관찰실에 예지 실험 결과가 펼쳐져 있다.",
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
          description: "시연회 준비 공지가 도착했다.",
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
          description: "출입 단말기에 마지막 사용 내역이 남아 있다.",
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
          description: "",
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
              text: "이제 인터뷰 차례인가요?",
            },
            "네. 곧 카메라 앞에 서야 합니다.",
          ],
          conversationChoices: [
            {
              id: "p3-camera",
              question: "인터뷰하는 동안 어디에 있나요?",
              answer: [
                "계속 메인홀 카메라 앞에 있을 거예요.",
                "진행자와 대화하는 장면이 남을 겁니다.",
              ],
            },
            {
              id: "p3-contract",
              question: "소장과는 이야기했어요?",
              answer: [
                "계약 얘기는 아직 미뤄졌어요.",
                "행사가 끝나야 제대로 이야기할 수 있을 것 같습니다.",
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
              text: "시연 준비는 끝났어요?",
            },
            "네. 곧 무대에서 물체를 움직일 겁니다.",
          ],
          conversationChoices: [
            {
              id: "p3-stage",
              question: "시연 중에는 어디에 있나요?",
              answer: [
                "메인홀 무대에 계속 있을 거예요.",
                "카메라와 관객 앞에서 진행합니다.",
              ],
            },
            {
              id: "p3-fatigue",
              question: "오래 시연해도 괜찮아요?",
              answer: [
                "길어지면 힘들겠지만 준비는 됐어요.",
                "끝나면 잠시 쉬어야겠죠.",
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
              text: "원본 기록은 정리됐어요?",
            },
            "거의요. 공개 자료와 다시 대조하고 있습니다.",
          ],
          conversationChoices: [
            {
              id: "p3-failures",
              question: "빠진 실패 기록은 왜 있어요?",
              answer: [
                "공개 자료에 넣지 않은 기록이 있습니다.",
                "원본까지 없앤 건 아니에요.",
              ],
            },
            {
              id: "p3-director",
              question: "소장도 원본을 볼 예정인가요?",
              answer: ["보자고 하셨어요.", "무슨 말씀을 하실지 걱정됩니다."],
            },
          ],
          questions: [],
        },
        {
          suspectName: "김짜장",
          conversation: [
            {
              speaker: "나",
              text: "시연회는 순조로운가요?",
            },
            "지금까지는 그렇습니다. 끝나면 원본 자료를 확인해야겠군요.",
          ],
          conversationChoices: [
            {
              id: "p3-original",
              question: "예지 실험 원본을 찾고 있나요?",
              answer: [
                "공개 결과와 다른 부분이 있는지 봐야 합니다.",
                "원본을 확인한 뒤 C와 이야기하겠습니다.",
              ],
            },
            {
              id: "p3-meeting",
              question: "언제 C를 만나실 건가요?",
              answer: ["행사가 끝난 뒤입니다.", "자정 전에는 확인하고 싶군요."],
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
          description: "소장이 관찰실 바닥에 쓰러져 있다.",
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
          description: "출입 단말기에 마지막 사용 내역이 남아 있다.",
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
          x: 12,
          y: 67.5,
          title: "종이",
          description: "지급대의 기록이 바뀌어 있다.",
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
          description: "서둘러 쓴 메모가 발견된다.",
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
          x: 19.5,
          y: 31.3,
          title: "캐비닛",
          description: "",
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
          description: "",
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
          description: "",
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
          description: "",
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
          description: "",
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
          description: "환풍구가 연결된 지도이다.",
          evidence: {
            id: "pill-vent",
            title: "환풍구 지도",
            description: "환풍구가 연결된 지도이다.",
          },
          id: "phase-4-source-pill-vent",
          versionPhaseId: "phase-1",
        },
        {
          x: 19.9,
          y: 10,
          title: "혈액팩",
          description: "",
          evidence: {
            id: "badge-a",
            title: "혈액팩",
            description:
              "초능력자들의 피들이 보관되어있다. 어제 뽑은 당신의 피를 포함해 A, B, C, 소장의 혈액까지 있다.",
          },
          id: "phase-4-source-badge-a",
          versionPhaseId: "phase-4",
        },
        {
          x: 94.7,
          y: 28.3,
          title: "오늘의 식단표",
          description: "메인홀 벽에 일정표가 붙어 있다.",
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
          description: "누군가의 상태를 기록하는 장비다.",
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
          description: "실험체 B의 지급 내역이 있다.",
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
          description: "메인홀 카메라가 녹화 중이다.",
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
          description: "관찰실 서랍 안쪽에 원본이 있다.",
          evidence: {
            id: "forecast-original",
            title: "초능력 보고서",
            description:
              "각 실험체의 본명과 능력이 적혀있다. 권정오 - 공중부양(5cm), 묵지바 - 가위바위보 이기기, 김액체 - 마지막으로 먹은 액체로 다른 액체 변경 가능",
          },
          id: "phase-4-source-forecast-original",
          versionPhaseId: "phase-4",
        },
        {
          x: 25.1,
          y: 62.1,
          title: "문서",
          description: "",
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
          x: 52,
          y: 67.5,
          title: "쪽지",
          description: "",
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
          description: "",
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
          description: "",
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
          x: 18.7,
          y: 69.7,
          title: "침대 위",
          description: "",
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
      energyLimit: 3,
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
          conversation: [
            {
              speaker: "나",
              text: "마지막으로 확인할 게 있어요.",
            },
            "네. 제가 아는 건 모두 말하겠습니다.",
          ],
          conversationChoices: [
            {
              id: "final-camera",
              question: "인터뷰 시간 내내 메인홀에 있었나요?",
              answer: [
                "영상에 진행자와 제가 계속 나옵니다.",
                "그 시간에는 관찰실에 갈 수 없었어요.",
              ],
            },
            {
              id: "final-contract",
              question: "계약 갈등이 살인의 이유였나요?",
              answer: [
                "소장님에게 화가 난 건 사실이에요.",
                "하지만 해치지는 않았습니다.",
              ],
            },
          ],
          questions: [
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
          conversation: [
            {
              speaker: "나",
              text: "마지막 진술을 부탁해요.",
            },
            "제 시연 영상부터 확인해 주세요.",
          ],
          conversationChoices: [
            {
              id: "final-stage",
              question: "시연하는 동안 자리를 비웠나요?",
              answer: [
                "카메라 앞에서 계속 시연했습니다.",
                "관객들도 저를 보고 있었어요.",
              ],
            },
            {
              id: "final-reward",
              question: "보상 때문에 소장을 원망했나요?",
              answer: ["불만은 있었죠.", "그래도 살해할 생각은 없었습니다."],
            },
          ],
          questions: [
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
          conversation: [
            {
              speaker: "나",
              text: "출입 기록이 남아 있어요.",
            },
            "다시 온 건 인정해요. 하지만 그게 전부예요.",
          ],
          conversationChoices: [
            {
              id: "final-original",
              question: "왜 실험 원본을 숨겼나요?",
              answer: [
                "실패한 예측을 공개하고 싶지 않았어요.",
                "원본은 지우지 않았습니다.",
              ],
            },
            {
              id: "final-room",
              question: "관찰실에서 소장을 만났나요?",
              answer: [
                "원본을 찾으러 들어갔어요.",
                "소장님과 무슨 일이 있었는지는 더 말하고 싶지 않아요.",
              ],
            },
          ],
          questions: [
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
