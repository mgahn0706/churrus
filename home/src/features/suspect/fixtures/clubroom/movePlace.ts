import { MovePlaceButtonType } from "@/features/suspect/types";

export const clubroomMoveButton: MovePlaceButtonType[] = [
  {
    from: "room",
    to: "recycling",
    x: 4,
    y: 88,
    direction: "left",
  },
  {
    from: "recycling",
    to: "room",
    x: 90,
    y: 88,
    direction: "right",
  },
  {
    from: "room",
    to: "homes",
    x: 90,
    y: 88,
    direction: "right",
  },
  {
    from: "homes",
    to: "room",
    x: 4,
    y: 88,
    direction: "left",
  },
];
