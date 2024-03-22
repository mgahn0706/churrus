export interface CrosswordType {
  id: string;
  title: string;
  author: string;
  date: {
    year: number;
    month: number;
  };
  crosswordSrc: string;
}
