import { MovePlaceButtonType } from "@/features/suspect/types";

export const boxMoveButton: MovePlaceButtonType[] = [
  {
    from: "palace",
    to: "market",
    x: 2,
    y: 48,
    direction: "left",
  },
  {
    from: "market",
    to: "palace",
    x: 94,
    y: 48,
    direction: "right",
  },
  {
    from: "palace",
    to: "abandoned-palace",
    x: 94,
    y: 48,
    direction: "right",
  },
  {
    from: "abandoned-palace",
    to: "palace",
    x: 2,
    y: 48,
    direction: "left",
  },
];
