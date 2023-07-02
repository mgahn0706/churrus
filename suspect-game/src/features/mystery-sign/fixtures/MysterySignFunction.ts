export const prob1 = ({ first, second }: { first: string; second: string }) => {
  return String(Number(first) + Number(second) * 2);
};

export const prob2 = ({ first, second }: { first: string; second: string }) => {
  let result = 0;
  for (let i = 0; i < first.length; i++) {
    result += Number(first[i]);
  }

  for (let j = 0; j < second.length; j++) {
    result += Number(second[j]);
  }
  return String(result);
};

export const prob3 = ({ first, second }: { first: string; second: string }) => {
  const reversedFirst = first.split("").reverse().join("");
  const reversedSecond = second.split("").reverse().join("");

  return String(Number(reversedFirst) + Number(reversedSecond));
};

export const prob4 = ({ first, second }: { first: string; second: string }) => {
  const firstSqrt = Math.floor(Math.sqrt(Number(first)));
  const secondSqrt = Math.floor(Math.sqrt(Number(second)));

  const isSqrt = (num: number) => {
    return Math.sqrt(num) % 1 === 0;
  };

  const edgeCaseFirst = isSqrt(Number(first)) ? 1 : 0;
  const edgeCaseSecond = isSqrt(Number(second)) ? 1 : 0;

  return String(
    Math.abs(secondSqrt - firstSqrt) + edgeCaseFirst - edgeCaseSecond
  );
};

export const prob5 = ({ first, second }: { first: string; second: string }) => {
  let result = "";

  for (let i = 0; i < first.length; i++) {
    for (let j = 0; j < second.length; j++) {
      result += String(Number(first[i]) * Number(second[j]));
    }
  }

  return result;
};

export const prob6 = ({ first, second }: { first: string; second: string }) => {
  const largerNum = Math.max(Number(first), Number(second));
  const smallerNum = Math.min(Number(first), Number(second));

  return (
    String(Math.floor(largerNum / smallerNum)) + String(largerNum % smallerNum)
  );
};

export const prob7 = ({ first, second }: { first: string; second: string }) => {
  const combinedString = first + second;

  let result = 0;
  const odd = ["1", "3", "5", "7", "9"];

  for (let i = 0; i < combinedString.length; i++) {
    if (odd.includes(combinedString[i])) {
      result++;
    }
  }

  return String(result);
};

export const prob8 = ({ first, second }: { first: string; second: string }) => {
  let sumOfFirst = 0;
  let sumOfSecond = 0;
  for (let i = 0; i < first.length; i++) {
    sumOfFirst += Number(first[i]);
  }

  for (let j = 0; j < second.length; j++) {
    sumOfSecond += Number(second[j]);
  }

  let sumOfFirstString = String(sumOfFirst);
  let sumOfSecondString = String(sumOfSecond);
  let result = "";
  for (
    let k = 0;
    k < Math.max(sumOfFirstString.length, sumOfSecondString.length);
    k++
  ) {
    if (k < sumOfFirstString.length) {
      result += sumOfFirstString[k];
      sumOfFirstString = sumOfFirstString.slice(k);
    }

    if (k < sumOfSecondString.length) {
      result += sumOfSecondString[k];
      sumOfSecondString = sumOfSecondString.slice(k);
    }
  }

  return result;
};

export const prob9 = ({ first, second }: { first: string; second: string }) => {
  const firstArray = first.split("").map((num) => Number(num));
  const secondArray = second.split("").map((num) => Number(num));

  return String(
    10 * (Math.max(...firstArray) + Math.max(...secondArray)) +
      (Math.min(...firstArray) + Math.min(...secondArray))
  );
};
