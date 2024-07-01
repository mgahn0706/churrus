import { ENGLISH_NOUNS } from "@/fixtures/englishNounList";

const isHeterogram = (word: string): boolean => {
  const letters = word.split("");
  const uniqueLetters = new Set(letters);
  return uniqueLetters.size === letters.length;
};

const orders: Record<string, number[]> = {
  B: [1, 3, 5, 9, 7, 1],
  A: [7, 2, 9, 6, 4],
  Kreverse: [9, 5, 9, 4, 3],
  K: [1, 7, 3, 5, 6],
  I: [1, 3, 2, 8, 7, 9],
  N: [7, 1, 9, 3],
  G: [3, 4, 8, 6, 5],
  S: [3, 4, 6, 7],
  O: [3, 1, 7, 9, 3],
  D: [1, 7, 6, 1],
};

const target = "A";

Object.keys(ENGLISH_NOUNS).forEach((noun) => {
  if (noun.length === 9 && isHeterogram(noun)) {
    const targetOrder = orders[target];
    const drivenNoun = targetOrder.map((index) => noun[index - 1]).join("");
    if (ENGLISH_NOUNS[drivenNoun]) {
      console.log(noun, drivenNoun);
    }
  }
});
