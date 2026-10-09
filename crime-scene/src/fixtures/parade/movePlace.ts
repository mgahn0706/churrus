import { MovePlaceButtonType } from "@/types";

export const paradeMoveButton: MovePlaceButtonType[] = [
  {
    from: "theme-park",
    to: "staff",
    x: 46,
    y: 8,
    direction: "up",
  },
  {
    from: "staff",
    to: "theme-park",
    x: 49,
    y: 91,
    direction: "down",
  },
  {
    from: "theme-park",
    to: "storage",
    x: 52,
    y: 8,
    direction: "up",
  },
  {
    from: "storage",
    to: "theme-park",
    x: 91,
    y: 90,
    direction: "down",
  },
];
