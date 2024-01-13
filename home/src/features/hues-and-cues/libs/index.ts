export function getCharCodeFromNumber(num: number) {
  return String.fromCharCode(num + "A".charCodeAt(0));
}

export function getColorCodeFromNumbers(numbers: [number, number]) {
  return getCharCodeFromNumber(numbers[0]) + `${numbers[1] + 1}`;
}
