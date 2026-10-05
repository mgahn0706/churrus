import { MovePlaceButtonType } from "@/types";

export const paradeMoveButton: MovePlaceButtonType[] = [
  {
    from: "theme-park",
    to: "storage",
    x: 49,
    y: 8,
    direction: "up",
  },
  {
    from: "storage",
    to: "theme-park",
    x: 94,
    y: 90,
    direction: "down",
  },
  {
    from: "staff",
    to: "storage",
    x: 3,
    y: 47,
    direction: "left",
  },
  {
    from: "storage",
    to: "staff",
    x: 88,
    y: 90,
    direction: "down",
  },
];
