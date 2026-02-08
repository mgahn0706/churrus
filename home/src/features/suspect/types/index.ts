import { ClueData } from "@/pages/api/getCluesWithKeyword";

export interface ClueType {
  id: number;
  image: string;
  title: string;
  x: number;
  y: number;
  description: string;
  type: "basic" | "additional" | "locked";
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

export interface SuspectType {
  name: string;
  image?: string;
  age: number;
  gender: "male" | "female";
  job: string;
  description: string;
  finalArgument?: string;
  statement: string;
}

export type VictimType = SuspectType;

export interface ScenarioType {
  title: string;
  numberOfSuspects: number;
  backgroundImage: string;
  id: string;
  isInDevelopment: boolean;
  history?: string;
  description?: string;
  gameType: "TEXT" | "CLUE";
  suspects: SuspectType[];
  victims: VictimType[];
  places: string[];
  prologue?: string[];
  clues: ClueType[] | ClueData[];
}

export interface AdditionalQuestionType {
  no: number;
  question: string;
  answer: string;
}

export interface DetectiveNoteType {
  accusedSuspect: string;
  howDunnit: string;
  whyDunnit: string;
  additionalQuestionAnswers: string[];
  memo: string;
}

export interface CertificationCardType {
  title: string;
  description: string;
  image: string;
  date: string;
  isSuccess: boolean;
}
