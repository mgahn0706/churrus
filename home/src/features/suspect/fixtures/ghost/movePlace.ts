import { MovePlaceButtonType } from "@/features/suspect/types";

export const ghostMoveButton: MovePlaceButtonType[] = [
  {
    from: "haunted-house",
    to: "staff",
    x: 77,
    y: 91,
    direction: "down",
  },
  {
    from: "staff",
    to: "haunted-house",
    x: 84,
    y: 9,
    direction: "up",
  },
  {
    from: "haunted-house",
    to: "theme-park",
    x: 94,
    y: 40,
    direction: "right",
  },
  {
    from: "theme-park",
    to: "haunted-house",
    x: 8,
    y: 45,
    direction: "left",
  },
];
