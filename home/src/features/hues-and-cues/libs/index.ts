export function getCharCodeFromNumber(num: number) {
  return String.fromCharCode(num + "A".charCodeAt(0));
}

export function getColorCodeFromNumbers(numbers: [number, number]) {
  return getCharCodeFromNumber(numbers[0]) + `${numbers[1] + 1}`;
}

export const getScore = (
  selectedColors: [number, number],
  answerColor: [number, number]
) => {
  const maximumDistance = Math.max(
    Math.abs(selectedColors[0] - answerColor[0]),
    Math.abs(selectedColors[1] - answerColor[1])
  );
  const score = 3 - maximumDistance > 0 ? 3 - maximumDistance : 0;
  return score;
};
