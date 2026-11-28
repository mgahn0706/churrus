import type { MovePlaceButtonType } from "@/types";

export const circusMoveButtons: MovePlaceButtonType[] = [
  { from: "auditorium", to: "indoor", x: 88, y: 76, direction: "right" },
  { from: "indoor", to: "auditorium", x: 61, y: 72, direction: "left" },
  { from: "indoor", to: "outdoor", x: 47, y: 91, direction: "down" },
  { from: "outdoor", to: "indoor", x: 49, y: 59, direction: "up" },
];
