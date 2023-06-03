import { MovePlaceButtonType } from "@/types";

export const startUpMoveButton: MovePlaceButtonType[] = [
  {
    from: "lounge",
    to: "office",
    x: 22.859,
    y: 11.152,
    direction: "up",
  },

  {
    from: "lounge",
    to: "interrogate",
    x: 88.005,
    y: 79.88,
    direction: "right",
  },
  {
    from: "office",
    to: "lounge",
    x: 19.965,
    y: 85.88,
    direction: "down",
  },
  {
    from: "interrogate",
    to: "lounge",
    x: 8.005,
    y: 79.88,
    direction: "left",
  },
];
