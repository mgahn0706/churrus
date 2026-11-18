import type { InterrogationScenarioType } from "@/types";

export const psychicInterrogationContent: Pick<
  InterrogationScenarioType,
  "prologue" | "phases" | "fallbackAnswers"
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
          "아직 오전 검사가 시작된 지 얼마 안 됐어요.",
          "그 단서만으로는 말씀드릴 게 없습니다.",
        ],
        [
          "지금은 복용 직후 상태를 확인하는 중입니다.",
          "기록이 더 쌓이면 다시 물어봐 주세요.",
        ],
      ],
      mapImage: "/image/scenario/psychic/map/lab-map.svg",
      locations: [
        {
          id: "entrance",
          title: "연구소 입구",
          x: 12,
          y: 43,
        },
        {
          id: "main-hall",
          title: "메인홀",
          x: 77,
          y: 69,
        },
        {
          id: "laboratory",
          title: "실험실",
          x: 37,
          y: 23,
        },
      ],
      sources: [
        {
          id: "p1-pill",
          locationId: "main-hall",
          title: "환풍구 지도",
          description: "환풍구가 연결된 지도이다.",
          evidence: {
            id: "pill-vent",
            title: "환풍구 지도",
            description: "환풍구가 연결된 지도이다.",
          },
        },
        {
          id: "p1-badge",
          locationId: "entrance",
          title: "A의 출입증",
          description: "출입증 뒷면에 본명이 적혀 있다.",
          evidence: {
            id: "badge-a",
            title: "실험체 A의 출입증",
            description: "실험체 A의 본명은 강하준이다.",
          },
        },
        {
          id: "p1-schedule",
          locationId: "main-hall",
          title: "오늘의 일정표",
          description: "메인홀 벽에 일정표가 붙어 있다.",
          evidence: {
            id: "schedule",
            title: "오전 일정표",
            description:
              "오전에는 능력 검사를, 오후에는 공개 시연 준비를 한다.",
          },
        },
        {
          id: "p1-vitals",
          locationId: "laboratory",
          title: "관찰 장비",
          description: "누군가의 상태를 기록하는 장비다.",
          evidence: {
            id: "vitals",
            title: "기초 관찰 기록",
            description:
              "알약 복용 직후의 생체 수치가 정상 범위로 표시되어 있다.",
          },
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
              text: "오늘 예지 검사는 시작했어요?",
            },
            "첫 기록을 쓰는 중이에요. 아직 결과를 단정하기 어려워요.",
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
          ],
          questions: [],
        },
      ],
      requiredCombinationIds: [],
      requiredQuestionIds: [],
    },
    {
      id: "phase-2",
      title: "오후 조사",
      timeLabel: "4/14 13:00",
      energyLimit: 3,
      intro:
        "오후 1시. 오전과는 다른 기록이 보인다. 알약의 영향도 다시 확인해야겠다.",
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
      locations: [
        {
          id: "entrance",
          title: "연구소 입구",
          x: 12,
          y: 43,
        },
        {
          id: "main-hall",
          title: "메인홀",
          x: 77,
          y: 69,
        },
        {
          id: "laboratory",
          title: "실험실",
          x: 37,
          y: 23,
        },
      ],
      sources: [
        {
          id: "p2-pill",
          locationId: "entrance",
          title: "갱신된 복용 기록",
          description: "지급대의 기록이 바뀌어 있다.",
          evidence: {
            id: "pill-log",
            title: "오후 복용 기록",
            description:
              "오후 1시 점검란에는 소장만 추가 복용한 것으로 적혀 있다. 오전 기록과 내용이 다르다.",
          },
        },
        {
          id: "p2-ledger",
          locationId: "main-hall",
          title: "보상 지급대장",
          description: "실험체 B의 지급 내역이 있다.",
          evidence: {
            id: "ledger-b",
            title: "실험체 B의 지급대장",
            description:
              "실험체 B의 본명은 윤서아이다. 보상란은 아직 비어 있다.",
          },
        },
        {
          id: "p2-forecast",
          locationId: "laboratory",
          title: "예지 실험 기록",
          description: "관찰실에 예지 실험 결과가 펼쳐져 있다.",
          evidence: {
            id: "forecast",
            title: "예지 실험 결과",
            description:
              "공개용 결과에는 성공 사례만 표시되어 있다. 원본과 대조가 필요하다.",
          },
        },
        {
          id: "p2-message",
          locationId: "main-hall",
          title: "연구소 공지",
          description: "시연회 준비 공지가 도착했다.",
          evidence: {
            id: "notice",
            title: "오후 공지",
            description:
              "저녁 공개 시연 전까지 모든 실험 자료를 제출하라는 소장의 지시다.",
          },
        },
      ],
      combinations: [],
      interrogations: [
        {
          suspectName: "실험체 A",
          conversation: [
            {
              speaker: "나",
              text: "오전 검사는 끝났어요?",
            },
            "네. 이제 저녁 인터뷰를 준비해야 해요.",
          ],
          conversationChoices: [
            {
              id: "p2-results",
              question: "검사 결과는 어땠어요?",
              answer: [
                "읽힌 생각이 너무 많아 기록을 정리하기 어려웠어요.",
                "소장님께는 중요한 부분만 보고했습니다.",
              ],
            },
            {
              id: "p2-contract",
              question: "계약 문제는 해결됐어요?",
              answer: [
                "아직 결론이 안 났어요.",
                "시연이 끝난 뒤 다시 이야기하자고 했습니다.",
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
              text: "오후 준비는 잘 되고 있어요?",
            },
            "장비를 옮기는 중이에요. 저녁 시연까지 시간이 많지 않네요.",
          ],
          conversationChoices: [
            {
              id: "p2-reward",
              question: "보상 얘기는 다시 해 봤어요?",
              answer: [
                "아직 못 했어요.",
                "소장님은 공개 시연 자료부터 내라고 하셨습니다.",
              ],
            },
            {
              id: "p2-condition",
              question: "오전보다 힘이 떨어졌나요?",
              answer: [
                "조금 피곤하지만 능력은 쓸 수 있어요.",
                "시연 전에는 쉬려고 합니다.",
              ],
            },
          ],
          questions: [
            {
              id: "phase-2-실험체 B-0",
              evidenceId: "phase-2::notice",
              prompt: "이 단서에 대해 아는 것이 있나요?",
              answer:
                "시연 준비 때문에 정신이 없어요. 보상 이야기는 아직 못 했습니다.",
            },
          ],
        },
        {
          suspectName: "실험체 C",
          conversation: [
            {
              speaker: "나",
              text: "공개 결과표를 만들고 있나요?",
            },
            "네. 오전 기록을 추려서 제출해야 합니다.",
          ],
          conversationChoices: [
            {
              id: "p2-public",
              question: "성공한 예측만 공개하나요?",
              answer: [
                "공개용 표에는 확인된 결과를 먼저 넣었어요.",
                "원본에는 다른 기록도 남아 있습니다.",
              ],
            },
            {
              id: "p2-original",
              question: "원본은 어디에 있어요?",
              answer: [
                "관찰실에서 정리하고 있어요.",
                "아직 소장님께 보여 드리지 않았습니다.",
              ],
            },
          ],
          questions: [
            {
              id: "phase-2-실험체 C-0",
              evidenceId: "phase-2::forecast",
              prompt: "이 단서에 대해 아는 것이 있나요?",
              answer: [
                "성공한 결과만 공개한 건 맞아요.",
                "자세한 건 나중에 설명할게요.",
              ],
            },
          ],
        },
        {
          suspectName: "김짜장",
          conversation: [
            {
              speaker: "나",
              text: "오후에는 무엇을 확인하나요?",
            },
            "저녁 시연 전에 자료와 복용 상태를 다시 점검합니다.",
          ],
          conversationChoices: [
            {
              id: "p2-pill",
              question: "오후에 알약을 더 드셨나요?",
              answer: [
                "제 상태를 확인하려고 한 번 더 복용했습니다.",
                "기록은 지급대에서 볼 수 있습니다.",
              ],
            },
            {
              id: "p2-records",
              question: "실험 원본도 오늘 보시나요?",
              answer: [
                "저녁에 직접 대조할 겁니다.",
                "공개 자료와 같아야겠지요.",
              ],
            },
          ],
          questions: [
            {
              id: "phase-2-김짜장-0",
              evidenceId: "phase-2::forecast",
              prompt: "이 단서에 대해 아는 것이 있나요?",
              answer:
                "실험 원본은 저녁에 직접 확인하겠습니다. 공개 결과와 같아야겠지요.",
            },
          ],
        },
      ],
      requiredCombinationIds: [],
      requiredQuestionIds: [],
    },
    {
      id: "phase-3",
      title: "저녁 조사",
      timeLabel: "4/14 19:00",
      energyLimit: 3,
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
      locations: [
        {
          id: "entrance",
          title: "연구소 입구",
          x: 12,
          y: 43,
        },
        {
          id: "main-hall",
          title: "메인홀",
          x: 77,
          y: 69,
        },
        {
          id: "laboratory",
          title: "실험실",
          x: 37,
          y: 23,
        },
      ],
      sources: [
        {
          id: "p3-schedule",
          locationId: "main-hall",
          title: "시연회 일정표",
          description: "오전 일정표 대신 새 일정표가 붙었다.",
          evidence: {
            id: "schedule",
            title: "저녁 일정표",
            description:
              "오후 7시부터 A의 인터뷰와 B의 시연이 이어진다. 오전 일정표와 내용이 다르다.",
          },
        },
        {
          id: "p3-footage",
          locationId: "main-hall",
          title: "시연 카메라",
          description: "메인홀 카메라가 녹화 중이다.",
          evidence: {
            id: "footage",
            title: "시연 영상",
            description: "A와 B가 공개 행사에 참여하는 장면이 이어진다.",
          },
        },
        {
          id: "p3-original",
          locationId: "laboratory",
          title: "실험 원본",
          description: "관찰실 서랍 안쪽에 원본이 있다.",
          evidence: {
            id: "forecast-original",
            title: "예지 실험 원본",
            description:
              "공개 결과에서 빠진 실패 사례가 여러 건 있다. 기록 작성자 한지우는 실험체 C다.",
          },
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
          questions: [
            {
              id: "phase-3-실험체 A-0",
              evidenceId: "phase-3::footage",
              prompt: "이 단서에 대해 아는 것이 있나요?",
              answer: "행사가 끝날 때까지 카메라 앞에 있을 겁니다.",
            },
          ],
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
          questions: [
            {
              id: "phase-3-실험체 C-0",
              evidenceId: "phase-3::forecast-original",
              prompt: "이 단서에 대해 아는 것이 있나요?",
              answer: "원본을 어디서 찾았죠? 소장님이 보셨나요?",
            },
          ],
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
          questions: [
            {
              id: "phase-3-김짜장-0",
              evidenceId: "phase-3::forecast-original",
              prompt: "이 단서에 대해 아는 것이 있나요?",
              answer:
                "이 원본은 공개 자료와 다릅니다. 자정 전에 C와 이야기하겠습니다.",
            },
          ],
        },
      ],
      requiredCombinationIds: [],
      requiredQuestionIds: [],
    },
    {
      id: "phase-4",
      title: "자정의 현장",
      timeLabel: "4/15 00:00",
      energyLimit: 3,
      intro:
        "자정. 관찰실 문을 열자 김짜장 소장이 쓰러져 있다. 숨을 쉬지 않는다. 이제 이곳은 사건 현장이다.",
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
      locations: [
        {
          id: "entrance",
          title: "연구소 입구",
          x: 12,
          y: 43,
        },
        {
          id: "main-hall",
          title: "메인홀",
          x: 77,
          y: 69,
        },
        {
          id: "laboratory",
          title: "실험실",
          x: 37,
          y: 23,
        },
        {
          id: "director-office",
          title: "소장실",
          x: 63,
          y: 22,
        },
      ],
      sources: [
        {
          id: "p4-body",
          locationId: "laboratory",
          title: "소장의 사체",
          description: "소장이 관찰실 바닥에 쓰러져 있다.",
          evidence: {
            id: "body",
            title: "소장의 사체",
            description:
              "자정 무렵 관찰실에서 발견했다. 정확한 사인은 아직 확인되지 않았다.",
          },
        },
        {
          id: "p4-door",
          locationId: "entrance",
          title: "출입 기록",
          description: "출입 단말기에 마지막 사용 내역이 남아 있다.",
          evidence: {
            id: "door-log",
            title: "심야 출입 기록",
            description:
              "C의 카드가 행사 뒤 연구소 출입에 사용되었다. 정확한 행적은 더 확인해야 한다.",
          },
        },
        {
          id: "p4-pill",
          locationId: "laboratory",
          title: "소장의 약통",
          description: "책상 위 약통이 비어 있다.",
          evidence: {
            id: "pill-log",
            title: "소장의 마지막 복용 기록",
            description:
              "오후 기록과 달리 자정 무렵의 복용 칸은 비어 있다. 약통에는 알약이 남지 않았다.",
          },
        },
        {
          id: "p4-note",
          locationId: "director-office",
          title: "소장의 메모",
          description: "서둘러 쓴 메모가 발견된다.",
          evidence: {
            id: "director-note",
            title: "원본 확인 메모",
            description: "소장은 C에게 예지 실험 원본을 가져오라고 남겼다.",
          },
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
            "네. 방금 들었습니다. 믿기지 않아요.",
          ],
          conversationChoices: [
            {
              id: "p4-where",
              question: "자정 전에는 어디에 있었어요?",
              answer: [
                "행사가 끝난 뒤에는 메인홀 주변에 있었어요.",
                "인터뷰 영상도 확인해 보세요.",
              ],
            },
            {
              id: "p4-c",
              question: "C와 소장 사이에 무슨 일이 있었나요?",
              answer: [
                "소장님이 C의 원본을 보려던 건 알아요.",
                "그 뒤에 둘이 만났는지는 모르겠습니다.",
              ],
            },
          ],
          questions: [
            {
              id: "phase-4-실험체 A-0",
              evidenceId: "phase-4::director-note",
              prompt: "이 단서에 대해 아는 것이 있나요?",
              answer: "소장님이 C의 원본을 확인하려는 건 알고 있었어요.",
            },
          ],
        },
        {
          suspectName: "실험체 B",
          conversation: [
            {
              speaker: "나",
              text: "무슨 일이 있었는지 봤어요?",
            },
            "아니요. 저도 소식을 듣고 왔어요.",
          ],
          conversationChoices: [
            {
              id: "p4-after",
              question: "시연 뒤에는 어디에 있었어요?",
              answer: [
                "메인홀에서 장비를 정리했어요.",
                "관찰실 쪽에는 가지 않았습니다.",
              ],
            },
            {
              id: "p4-director",
              question: "소장님과 마지막으로 이야기한 건 언제예요?",
              answer: [
                "시연 전에 잠깐 봤어요.",
                "그 뒤에는 따로 만나지 않았습니다.",
              ],
            },
          ],
          questions: [
            {
              id: "phase-4-실험체 B-0",
              evidenceId: "phase-4::body",
              prompt: "이 단서에 대해 아는 것이 있나요?",
              answer:
                "저도 방금 소식을 들었어요. 시연 뒤에는 메인홀에 있었습니다.",
            },
          ],
        },
        {
          suspectName: "실험체 C",
          conversation: [
            {
              speaker: "나",
              text: "연구소에 다시 왔었나요?",
            },
            "잠깐 들른 건 맞아요. 원본 자료가 필요했습니다.",
          ],
          conversationChoices: [
            {
              id: "p4-return",
              question: "왜 다시 들어왔어요?",
              answer: [
                "원본을 가져가려고 했어요.",
                "소장님이 기다리고 계신 줄은 몰랐습니다.",
              ],
            },
            {
              id: "p4-room",
              question: "관찰실에는 들어갔어요?",
              answer: [
                "서랍을 확인하러 갔어요.",
                "그때는 이런 일이 생긴 줄 몰랐어요.",
              ],
            },
          ],
          questions: [
            {
              id: "phase-4-실험체 C-0",
              evidenceId: "phase-4::door-log",
              prompt: "이 단서에 대해 아는 것이 있나요?",
              answer: [
                "잠깐 돌아온 건 맞아요.",
                "하지만 소장님이 돌아가신 줄은 몰랐어요.",
              ],
            },
          ],
        },
      ],
      requiredCombinationIds: [],
      requiredQuestionIds: [],
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
              id: "final-interrogation-실험체 A-0",
              evidenceId: "phase-3::footage",
              prompt: "이 단서에 대해 아는 것이 있나요?",
              answer:
                "영상에 제 인터뷰가 남아 있어요. 그동안은 계속 메인홀에 있었습니다.",
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
              id: "final-interrogation-실험체 B-0",
              evidenceId: "phase-3::footage",
              prompt: "이 단서에 대해 아는 것이 있나요?",
              answer: "제 시연도 영상으로 확인할 수 있을 겁니다.",
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
              id: "final-interrogation-실험체 C-0",
              evidenceId: "phase-3::forecast-original",
              prompt: "이 단서에 대해 아는 것이 있나요?",
              answer:
                "실패한 기록을 숨겼어요. 하지만 그것만으로 제가 소장님을 해쳤다는 뜻은 아니에요.",
            },
            {
              id: "final-interrogation-실험체 C-1",
              evidenceId: "phase-4::door-log",
              prompt: "이 단서에 대해 아는 것이 있나요?",
              answer:
                "행사 뒤 다시 들어온 건 사실입니다. 원본을 찾으려 했어요.",
            },
          ],
        },
      ],
      requiredCombinationIds: [],
      requiredQuestionIds: [],
    },
  ],
  fallbackAnswers: [
    [
      "그 단서에 관해서는 제가 아는 게 없습니다.",
      "다른 기록과 함께 보면 달라질 수도 있겠네요.",
    ],
    ["그건 저와 관련이 없어요.", "다른 사람에게 물어보세요."],
    [
      "지금은 그 기록만으로 말씀드릴 수 있는 게 없네요.",
      "더 확실한 자료가 있으면 보여 주세요.",
    ],
  ],
};
