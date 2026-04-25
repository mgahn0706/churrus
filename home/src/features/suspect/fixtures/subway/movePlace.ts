import { MovePlaceButtonType } from "@/features/suspect/types";

export const subwayMoveButton: MovePlaceButtonType[] = [
  {
    from: "platform",
    to: "ground",
    x: 85,
    y: 18,
    direction: "up",
  },
  {
    from: "ground",
    to: "platform",
    x: 22,
    y: 82,
    direction: "down",
  },
];
