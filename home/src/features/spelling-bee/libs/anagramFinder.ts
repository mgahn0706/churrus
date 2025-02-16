import { COMMON_NOUNS, KOREAN_NOUNS } from "@/fixtures/koreanNounList";

// const Hangul = require("hangul-js");

const randomHundredNumbers = Array.from({ length: 50000 }, (_, i) => i + 1).map(
  () => Math.random() * KOREAN_NOUNS.size - 1
);

const randomWords = randomHundredNumbers.map(
  (randomNumber) => Array.from(KOREAN_NOUNS)[Math.floor(randomNumber)]
);

const targets = [
  "아",
  "르",
  "바",
  "이",
  "트",
  "생",
  "니",
  "콜",
  "라",
  "테",
  "슬",
  "디",
  "오",
  "안",
  "테",
  "나",
  "미",
  "스",
  "터",
  "션",
  "샤",
  "인",
  "티",
  "몰",
  "프",
  "탈",
  "레",
  "인",
  "작",
  "업",
  "스",
  "케",
  "줄",
  "링",
];

const melodies = ["도", "레", "미", "파", "솔", "라", "시"];

const pair = ["하", "트", "여", "왕"];

const anagramFinder = (word: string) => {
  const wordlst = word.split("");
  if (!wordlst.includes("명") && !wordlst.includes("암")) {
    return;
  }

  if (
    wordlst.includes(pair[0]) ||
    wordlst.includes(pair[1]) ||
    wordlst.includes(pair[2]) ||
    wordlst.includes(pair[3])
  ) {
    console.log(word);
  }
};

KOREAN_NOUNS.forEach((word, i) => {
  anagramFinder(word);
});
