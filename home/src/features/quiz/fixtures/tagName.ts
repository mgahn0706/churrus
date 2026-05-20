import { Tags } from "../types";

export const QUIZ_TAGS: Tags[] = [
  "EASY",
  "HARD",
  "DEDUCTION",
  "PUZZLE",
  "MATHEMATICS",
  "LATERAL_THINKING",
  "KNOWLEDGE",
  "PATTERN",
  "GEOMETRY",
  "ADVENTURE",
  "ONLY_FOR_MEETING",
  "RIDDLE",
  "ENIGMATIC",
  "WORD",
  "META",
];

export interface QuizTagMeta {
  label: string;
  emoji: string;
  slug: string;
  imageSource: string;
  shortDescription: string;
  longDescription: string;
}

export const QUIZ_TAG_META: Record<Tags, QuizTagMeta> = {
  EASY: {
    label: "쉬움",
    emoji: "🙂",
    slug: "easy",
    imageSource: "/image/quiz/tag/easy.png",
    shortDescription: "초보자에게 적합한 쉬운 문제를 모아봤어요.",
    longDescription:
      "풀이에 쓰이는 단계가 적고, 직관적인 문제들을 모아봤어요. 추러스가 처음이라면, 이런 유형부터 시작해보는 건 어떨까요?",
  },
  HARD: {
    label: "어려움",
    emoji: "🔥",
    slug: "hard",
    imageSource: "/image/quiz/tag/hard.png",
    shortDescription: "베테랑 추러스 부원도 어려워한 문제예요.",
    longDescription:
      "문제적 추러스가 너무 쉬우신가요? 이 문제들은 다양한 사고와 복잡한 단계를 거칩니다. 그렇다고 문제가 더럽진 않아요!",
  },
  DEDUCTION: {
    label: "연역 추리",
    emoji: "🕵️",
    slug: "deduction",
    imageSource: "/image/quiz/tag/deduction.png",
    shortDescription: "주어진 조건으로 차근차근 좁혀나가요.",
    longDescription:
      "단서 사이의 논리 관계를 따라가며 가능한 경우를 줄여 나가는 유형입니다. 추측보다 정합성이 중요해요. 마치 지뢰찾기처럼요.",
  },
  PUZZLE: {
    label: "퍼즐",
    emoji: "🧩",
    slug: "puzzle",
    imageSource: "/image/quiz/tag/puzzle.png",
    shortDescription: "논리를 바탕으로 푸는 퍼즐형 문제들이에요.",
    longDescription:
      "전형적으로 단계를 하나하나 따라거며 푸는 문제입니다. 퍼즐헌트에서 주로 등장해요.",
  },
  MATHEMATICS: {
    label: "수학",
    emoji: "➗",
    slug: "mathematics",
    imageSource: "/image/quiz/tag/mathematics.png",
    shortDescription: "수학적 개념이 핵심이 되는 문제예요.",
    longDescription:
      "수학 잘 하시나요? 이 문제들은 종이와 펜이 필요할지도 몰라요. 여러분의 수학 개념을 활용해 문제를 풀어봅시다.",
  },
  LATERAL_THINKING: {
    label: "발상 전환",
    emoji: "💡",
    slug: "lateral-thinking",
    imageSource: "/image/quiz/tag/lateral-thinking.png",
    shortDescription: "익숙한 관점을 벗어나세요.",
    longDescription:
      "고정관념으로 바라보면 절대 답을 찾을 수 없는 문제들입니다. 발상의 전환이 문제 풀이의 핵심이 되는 창의적인 문제들이에요.",
  },
  KNOWLEDGE: {
    label: "사전 지식",
    emoji: "📚",
    slug: "knowledge",
    imageSource: "/image/quiz/tag/knowledge.png",
    shortDescription: "특정 분야의 배경지식이 필요해요.",
    longDescription:
      "누구나 풀 수 있는 문제는, 때로는 문제를 재미없게 만들죠. 이 문제들은 특정 분야의 지식이 있어야해요. 걱정마세요, 검색은 항상 가능하니까요!",
  },
  PATTERN: {
    label: "패턴",
    emoji: "🔁",
    slug: "pattern",
    imageSource: "/image/quiz/tag/pattern.png",
    shortDescription: "주어진 단서들에서 규칙을 발견하세요.",
    longDescription:
      "겉으로는 흩어져 보이는 요소들 사이에서 반복되는 형태나 변환 규칙을 찾는 유형이에요. A=1, B=2 ...",
  },
  GEOMETRY: {
    label: "도형",
    emoji: "📐",
    slug: "geometry",
    imageSource: "/image/quiz/tag/geometry.png",
    shortDescription: "기하학적 지식이 활용됩니다.",
    longDescription:
      "도형 잘 하세요? 칠교놀이는 잘 하시나요? 다양한 도형 요소들과 기하학 센스가 요구됩니다.",
  },
  ADVENTURE: {
    label: "대이동",
    emoji: "🏕️",
    slug: "adventure",
    imageSource: "/image/quiz/tag/adventure.png",
    shortDescription: "직접 장소에 가서 푸는 대이동 문제들.",
    longDescription:
      "추러스의 꽃, 대이동에서 사용된 문제들입니다. 문제의 정답은 모두 다음 장소에 대한 힌트입니다.",
  },
  ONLY_FOR_MEETING: {
    label: "정기모임 전용",
    emoji: "🎪",
    slug: "only-for-meeting",
    imageSource: "/image/quiz/tag/only-for-meeting.png",
    shortDescription: "정기모임에 가야만 풀 수 있는 문제들.",
    longDescription:
      "죄송하지만 이 문제들은 정기모임에 참석해야만 풀 수 있어요. 지금 여러분은 풀 수 없다는 뜻이죠. 그래도 어떤 문제가 나오는지 한번 볼까요?",
  },
  RIDDLE: {
    label: "수수께끼",
    emoji: "❓",
    slug: "riddle",
    imageSource: "/image/quiz/tag/riddle.png",
    shortDescription: "답이 딱 안떨어지는, 수수께끼형 문제.",
    longDescription:
      "짧은 문장과 이야기로 이루어진 문제들이에요. 답이 명확히 떨어지지 않고 문장형으로 나오는 경우도 많죠.",
  },
  ENIGMATIC: {
    label: "암호형",
    emoji: "🔐",
    slug: "enigmatic",
    imageSource: "/image/quiz/tag/enigmatic.png",
    shortDescription: "뭘 구해야하는지 안 알려주는 문제들.",
    longDescription:
      "보통 문제들은 무엇을 해야하는지 가이드를 주는데, 이 문제들은 답이 뭔지 어떻게 시작해야하는지 알려주지 않아요. 여러분의 센스를 믿을게요!",
  },
  WORD: {
    label: "언어",
    emoji: "🔤",
    slug: "word",
    imageSource: "/image/quiz/tag/word.png",
    shortDescription: "언어적인 요소가 많아요.",
    longDescription:
      "언어적인 요소가 강한 문제들입니다. 국어를 잘 하시나요? 텍스트를 읽어내는 능력이 중요해요.",
  },
  META: {
    label: "메타",
    emoji: "🪞",
    slug: "meta",
    imageSource: "/image/quiz/tag/meta.png",
    shortDescription: "퍼즐헌트의 꽃.",
    longDescription:
      "메타 문제는 다른 문제들에서 푼 정답들을 이용해 풀어내는 문제들입니다. 즉, 이 페이지만 보고 풀수는 없어요. 퍼즐헌트의 꽃이죠.",
  },
};

export const QUIZ_TAG_KOREAN_NAME: Record<Tags, string> = Object.fromEntries(
  QUIZ_TAGS.map((tag) => [tag, QUIZ_TAG_META[tag].label])
) as Record<Tags, string>;

export const QUIZ_TAG_EMOJI: Record<Tags, string> = Object.fromEntries(
  QUIZ_TAGS.map((tag) => [tag, QUIZ_TAG_META[tag].emoji])
) as Record<Tags, string>;

export const QUIZ_TAG_SLUG: Record<Tags, string> = Object.fromEntries(
  QUIZ_TAGS.map((tag) => [tag, QUIZ_TAG_META[tag].slug])
) as Record<Tags, string>;

export const QUIZ_TAG_IMAGE_SOURCE: Record<Tags, string> = Object.fromEntries(
  QUIZ_TAGS.map((tag) => [tag, QUIZ_TAG_META[tag].imageSource])
) as Record<Tags, string>;
