import { MovePlaceButtonType } from "@/features/suspect/types";

export const subwayMoveButton: MovePlaceButtonType[] = [
  {
    from: "1F",
    to: "B1",
    direction: "down",
    x: 50,
    y: 30,
  },
  {
    from: "B1",
    to: "1F",
    direction: "up",
    x: 30,
    y: 25,
  },
  {
    from: "B1",
    to: "B2",
    direction: "down",
    x: 75,
    y: 45,
  },
  {
    from: "B2",
    to: "B1",
    direction: "up",
    x: 80,
    y: 45,
  },
];
