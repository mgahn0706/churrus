export interface ConversationLine {
  speaker: string;
  text: string;
}

export const CAFE_CONVERSATION: ConversationLine[] = [
  {
    speaker: "???",
    text: "카페 안 쪽으로 들어간 당신. 축하 메시지와 함께 카페 주인이 나타납니다.",
  },
  {
    speaker: "카페 주인",
    text: "어서 와요. REMIX 6문제와 에어보더 META 퍼즐까지 모두 풀어내셨군요.",
  },
  {
    speaker: "카페 주인",
    text: "축하드립니다!",
  },
  {
    speaker: "카페 주인",
    text: "31문제를 모두 푸시느라 많이 힘드셨을 것 같아요. 여기 카페에서 잠시 쉬어가세요.",
  },
  {
    speaker: "카페 주인",
    text: "사실 여러분이 푸신 문제 모두, 제가 만든 거에요.",
  },
  {
    speaker: "카페 주인",
    text: "문제 만드는 건 이제 그만 하려고 했는데, 어쩌다보니 또 대형 퍼즐 헌트를 만들게 되었어요.",
  },
  {
    speaker: "카페 주인",
    text: "대신 문제는 최대한 쉽게 내보려고 했는데, 막판 가니까 점점 어렵게 내게 되더라구요…ㅎㅎ",
  },
  {
    speaker: "카페 주인",
    text: "그래도 재미있게 즐겨주셨다면, 그것만으로 영광입니다.",
  },
  {
    speaker: "카페 주인",
    text: "문제가 너무 어렵진 않았는지, 너무 쉽진 않았는지 걱정이 좀 되긴 하네요.",
  },
  {
    speaker: "카페 주인",
    text: "혹시 문제를 푸시면서 어려웠던 점이나 아쉬웠던 점이 있다면, 피드백을 남겨주시면 감사하겠습니다.",
  },
  {
    speaker: "카페 주인",
    text: "여담으로, 지금 나오는 음악은 리듬 세상 시리즈의 카페 BGM이에요. 마음이 편안해지는 음악이죠.",
  },
  {
    speaker: "카페 주인",
    text: "잠시 쉬어가시면서, 음악도 즐기시고, 카페에서 제공하는 음료도 즐기시길 바랍니다.",
  },
  {
    speaker: "카페 주인",
    text: "여유를 즐기며, 31문제를 모두 풀어낸 여러분 스스로를 칭찬해주셔도 좋을 것 같아요.",
  },
  {
    speaker: "카페 주인",
    text: "수고 많으셨어요!",
  },
  {
    speaker: "카페 주인",
    text: "자, 그럼 낮동안 진행했던 카페 영업은 이만 종료하도록 할게요.",
  },
  {
    speaker: "카페 주인",
    text: "대신...",
  },
  {
    speaker: "카페 주인",
    text: "밤의 bar로 가봐야겠죠! 바를 오픈할게요!",
  },
];

export const BAR_CONVERSATION: ConversationLine[] = [
  {
    speaker: "바 주인",
    text: "자, 이제 내가 영업할게!",
  },
  {
    speaker: "바 주인",
    text: "이제 퍼즐은 익숙해졌겠지? 그럼 이번엔 조금 더 어려운 문제를 내볼게.",
  },
  {
    speaker: "바 주인",
    text: "그럼, 간다! 끝까지 재미있게 풀어줘!",
  },
];
