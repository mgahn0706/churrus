import { MovePlaceButtonType } from "@/features/suspect/types";

export const clubroomMoveButton: MovePlaceButtonType[] = [
  {
    from: "room",
    to: "recycling",
    x: 90,
    y: 88,
    direction: "right",
  },
  {
    from: "recycling",
    to: "homes",
    x: 36.328,
    y: 3.719,
    direction: "up",
  },
  {
    from: "homes",
    to: "recycling",
    x: 51.674,
    y: 89.463,
    direction: "down",
  },
  {
    from: "recycling",
    to: "room",
    x: 64.797,
    y: 41.116,
    direction: "right",
  },
];
