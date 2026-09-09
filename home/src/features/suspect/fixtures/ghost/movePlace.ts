import { MovePlaceButtonType } from "@/features/suspect/types";

export const ghostMoveButton: MovePlaceButtonType[] = [
  {
    from: "haunted-house",
    to: "staff",
    x: 94,
    y: 50,
    direction: "right",
  },
  {
    from: "staff",
    to: "haunted-house",
    x: 84,
    y: 91,
    direction: "down",
  },
];
