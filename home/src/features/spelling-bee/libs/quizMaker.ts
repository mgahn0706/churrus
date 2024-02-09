import { COMMON_NOUNS, KOREAN_NOUNS } from "@/fixtures/koreanNounList";

const Hangul = require("hangul-js");

// ✗ ts-node home/src/features/spelling-bee/libs/quizMaker.ts

export const verifySpellingBee = (quiz: {
  center: string;
  letters: string[];
}) => {
  const { center, letters } = quiz;

  const verifiedResult = Array.from(KOREAN_NOUNS).reduce<{
    fullScore: number;
    pangrams: string[];
  }>(
    (acc, curr) => {
      const disassembledWord = new Set<string>(Hangul.disassemble(curr));

      if (disassembledWord.size > 7 || disassembledWord.size < 4) {
        return acc;
      }

      if (
        !disassembledWord.has(center) ||
        Array.from(disassembledWord).some(
          (letter) => !letters.includes(letter) && letter !== center
        )
      ) {
        return acc;
      }

      const isPangram = disassembledWord.size === 7;
      const score = COMMON_NOUNS.has(curr)
        ? Hangul.disassemble(curr).length
        : 1;
      return {
        fullScore: acc.fullScore + score,
        pangrams: isPangram ? [...acc.pangrams, curr] : acc.pangrams,
      };
    },
    { fullScore: 0, pangrams: [] }
  );

  return verifiedResult;
};

const QUIZ: {
  center: string;
  letters: [string, string, string, string, string, string];
} = {
  center: process.argv[2],
  letters: process.argv.slice(3) as [
    string,
    string,
    string,
    string,
    string,
    string
  ],
};

const result = verifySpellingBee(QUIZ);

function pbcopy(data: string) {
  var proc = require("child_process").spawn("pbcopy");
  proc.stdin.write(data);
  proc.stdin.end();
}

const pangrams = [
  ...Array.from(COMMON_NOUNS),
  ...Array.from(KOREAN_NOUNS)
    .sort(() => Math.random() - 0.5)
    .slice(0, 30000),
]
  .map((noun) => {
    const letterSet = new Set<string>(Hangul.disassemble(noun));
    if (letterSet.size !== 7) {
      return [];
    }

    return Array.from(letterSet).sort((a, b) => a.localeCompare(b));
  })
  .filter((a) => a.length === 7);

const uniquePangrams = pangrams.reduce(
  (unique: string[][], current: string[]) => {
    const currentString = JSON.stringify(current);

    if (!unique.some((arr) => JSON.stringify(arr) === currentString)) {
      unique.push(current);
    }
    return unique;
  },
  []
);
const res = uniquePangrams
  .map((pan) => {
    const shuffled = pan.sort(() => Math.random() - 0.5);
    return {
      centerLetter: shuffled[0],
      outerLetters: shuffled.slice(1),
    };
  })
  .sort(() => Math.random() - 0.5);
let count = 0;

pbcopy(
  JSON.stringify(
    res.map((r) => {
      const percent = Math.floor((count / res.length) * 100);
      console.clear();
      console.log(
        `${"#".repeat(percent)} ${"-".repeat(100 - percent)} : ${percent}%`
      );

      count++;

      const verified = verifySpellingBee({
        center: r.centerLetter,
        letters: r.outerLetters,
      });

      return {
        ...r,
        ...verified,
      };
    })
  )
);

console.log(res.length, " puzzles!");

result.pangrams.length === 0
  ? console.log("🚨 Warning : No Pangrams")
  : result.pangrams.every((pan) => !COMMON_NOUNS.has(pan))
  ? console.log("🤔 Hmm... No Common Pangrams")
  : console.log("✅ Looks fine for next quiz!");
