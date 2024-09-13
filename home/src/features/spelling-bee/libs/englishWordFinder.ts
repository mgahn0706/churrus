import { KOREAN_NOUNS } from "@/fixtures/koreanNounList";

const Hangul = require("hangul-js");

const answerWords = ["리얼딸기라떼", "국립서울대학교", "두루미"];

const letter = answerWords.map((word) => word.split("")).flat();

Array.from(KOREAN_NOUNS).forEach((noun) => {
  if (noun.length < 3) {
    return;
  }

  const isAllInAnswer = noun.split("").every((char) => letter.includes(char));
  if (isAllInAnswer) {
    console.log(noun);
  }
  return;
});
