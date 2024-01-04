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
