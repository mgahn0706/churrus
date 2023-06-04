export interface ClueType {
  id: number;
  image: string;
  title: string;
  x: number;
  y: number;
  reliability: "low" | "medium" | "high";
  description: string;
  type: "basic" | "additional" | "interrogation" | "locked";
  password?: string;
  passwordHint?: string;
  place: string | number;
}

export interface MovePlaceButtonType {
  from: string;
  to: string;
  x: number;
  y: number;
  direction: "up" | "down" | "left" | "right";
}

interface InterrogationType {
  id: number;
  statements: string[];
}

export interface SuspectType {
  name: string;
  image?: string;
  age: number;
  gender: "male" | "female";
  job: string;
  description: string;
  finalArgument?: string;
}

export type VictimType = SuspectType;

export interface ScenarioType {
  title: string;
  difficulty: number;
  numberOfSuspects: number;
  playTime: number;
  backgroundImage: string;
  cardImage: string;
  keyword: string;
  isInDevelopment: boolean;
  bgmURL?: string;
}

export interface AdditionalQuestionType {
  no: number;
  question: string;
}

export interface DetectiveNoteType {
  accusedSuspect: string;
  howDunnit: string;
  whyDunnit: string;
  additionalQuestionAnswers: string[];
  memo: string;
}
