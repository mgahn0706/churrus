interface TargetProblemDataType {
  round: number;
  first: string;
  second: string;
  description: string;
}

const TargetProblemData: TargetProblemDataType[] = [
  {
    round: 0,
    first: "1",
    second: "2",
    description: "연습문제: (첫번째 수)+(두번째 수)",
  },
  {
    round: 1,
    first: "3",
    second: "20",
    description: "(첫번째 수)+(두번째 수 * 2)",
  },
  {
    round: 2,
    first: "16",
    second: "21",
    description: "모든 숫자의 자릿수 합",
  },
  {
    round: 3,
    first: "48",
    second: "75",
    description: "각 숫자를 거꾸로 읽은 수를 서로 더한 것",
  },
  {
    round: 4,
    first: "4",
    second: "18",
    description: "두 숫자 사이에 있는 제곱수의 개수",
  },
  {
    round: 5,
    first: "12",
    second: "45",
    description:
      "(첫번째 수 첫째 자리)*(두번째 수 첫째 자리), (첫번째 수 첫째자리)*(두번째 수 둘째자리)...",
  },
  {
    round: 6,
    first: "18",
    second: "30",
    description: "(큰 수) / (작은 수)의 몫과 나머지를 차례로 쓴 것",
  },
  {
    round: 7,
    first: "17",
    second: "23",
    description: "표시된 숫자 중 홀수의 개수",
  },
  {
    round: 8,
    first: "98",
    second: "157",
    description: "각 숫자에서 숫자만을 더한 값을 각각 구해 번갈아가며 쓴 것",
  },
  {
    round: 9,
    first: "126",
    second: "731",
    description:
      "각 수에서 (가장 큰 숫자)(가장 작은 숫자)로 두 자리수를 만들어 더한 값",
  },
];

export default TargetProblemData;
