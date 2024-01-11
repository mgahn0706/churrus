import { CONNECTIONS2022 } from "./2022";
import { CONNECTIONS2023 } from "./2023";
import { CONNECTIONS2024 } from "./2024";

export const CONNECTIONS_COLOR = ["#f8b703", "#949217", "#89b4c4", "#c1a7b0"];

export interface ConnectionQuizType {
  words: [string, string, string, string];
  description: string;
}

export interface ConnectionsType {
  week: number;
  quiz: [
    ConnectionQuizType,
    ConnectionQuizType,
    ConnectionQuizType,
    ConnectionQuizType
  ];
}

export const KOREAN_CONNECTIONS: Record<number, ConnectionsType[]> = {
  2022: CONNECTIONS2022,
  2023: CONNECTIONS2023,
  2024: CONNECTIONS2024,
};
