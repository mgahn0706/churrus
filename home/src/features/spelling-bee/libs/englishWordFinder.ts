import { KOREAN_NOUNS } from "@/fixtures/koreanNounList";

const Hangul = require("hangul-js");

const RotateMap: Record<string, string> = {
  ㄱ: "ㄴ",
  ㄹ: "ㄹ",
  ㅁ: "ㅁ",
  ㅇ: "ㅇ",
  ㅍ: "ㅍ",
  ㅏ: "ㅓ",
  ㅑ: "ㅕ",
  ㅗ: "ㅜ",
  ㅛ: "ㅠ",
  ㅡ: "ㅡ",
  ㅣ: "ㅣ",
  ㅐ: "ㅐ",
};

Array.from(KOREAN_NOUNS).forEach((noun) => {
  const rotatedNoun = Hangul.disassemble(noun)
    .map((letter: string) => RotateMap[letter])
    .reverse();
  if (rotatedNoun.some((letter: string) => !letter)) {
    return;
  }

  const assembled = Hangul.assemble(rotatedNoun);
  if (KOREAN_NOUNS.has(assembled)) {
    console.log(noun, assembled);
    return;
  }
});
