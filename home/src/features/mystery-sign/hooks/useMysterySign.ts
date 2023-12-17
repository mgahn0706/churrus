import {
  prob1,
  prob2,
  prob3,
  prob4,
  prob5,
  prob6,
  prob7,
  prob8,
  prob9,
} from "../fixtures/MysterySignFunction";

interface useMysterySignProps {
  first: string;
  second: string;
  round: number;
}

export default function useMysterySign({
  first,
  second,
  round,
}: useMysterySignProps) {
  switch (round) {
    case 0:
      return String(Number(first) + Number(second));
    case 1:
      return prob1({ first, second });
    case 2:
      return prob2({ first, second });
    case 3:
      return prob3({ first, second });
    case 4:
      return prob4({ first, second });
    case 5:
      return prob5({ first, second });
    case 6:
      return prob6({ first, second });
    case 7:
      return prob7({ first, second });
    case 8:
      return prob8({ first, second });
    case 9:
      return prob9({ first, second });
    default:
      throw new Error("Invalid round");
  }
}
