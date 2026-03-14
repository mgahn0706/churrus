import { MovePlaceButtonType } from "@/features/suspect/types";

export const mountainMoveButton: MovePlaceButtonType[] = [
  {
    from: "cafe",
    to: "intersection",
    x: 84,
    y: 52,
    direction: "right",
  },
  {
    from: "intersection",
    to: "cafe",
    x: 14,
    y: 52,
    direction: "left",
  },
];
