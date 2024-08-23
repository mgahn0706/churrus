export interface Player {
  id: number;
  name: string;
  score: {
    current: number;
    changed: number;
  };
  floor: number;
}

export interface CardSubmission {
  id: number;
  card: number;
}
