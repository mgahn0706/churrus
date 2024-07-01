import { COMMON_NOUNS, KOREAN_NOUNS } from "@/fixtures/koreanNounList";

const Hangul = require("hangul-js");

const randomHundredNumbers = Array.from({ length: 40000 }, (_, i) => i + 1).map(
  () => Math.random() * KOREAN_NOUNS.size - 1
);

const randomWords = randomHundredNumbers.map(
  (randomNumber) => Array.from(KOREAN_NOUNS)[Math.floor(randomNumber)]
);

const anagramFinder = (word: string) => {
  if (!word) return;
  const disassembledWord: string[] = Hangul.disassemble(word);

  const permutatedWords = disassembledWord.sort(() => Math.random() - 0.5);

  const anagrammedWord: string = Hangul.assemble(permutatedWords);
  KOREAN_NOUNS.has(anagrammedWord) &&
    anagrammedWord !== word &&
    console.log(anagrammedWord, word);
};

randomWords.forEach((word) => anagramFinder(word));
