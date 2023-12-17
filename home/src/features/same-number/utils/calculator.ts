import exp from "constants";

export const calculator = ({
  n1,
  operator,
  n2,
  secondOperator,
  n3,
}: {
  n1: string;
  operator: string;
  n2: string;
  secondOperator?: string;
  n3?: string;
}) => {
  if (!Number(n1) || !Number(n2)) {
    return "!";
  }

  switch (operator) {
    case "+":
      return `${Number(n1) + Number(n2)}`;
    case "-":
      return `${Number(n1) - Number(n2)}`;
    case "x":
      return `${Number(n1) * Number(n2)}`;
    case "÷":
      if (Number(n1) % Number(n2) !== 0) {
        return `${(Number(n1) / Number(n2)).toFixed(1)}`;
      }
      return `${Number(n1) / Number(n2)}`;
    default:
      return "!";
  }
};
