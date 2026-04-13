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

interface ScenarioBase {
  color: string;
  title: string;
  creators: string[];
  numberOfSuspects: number;
  backgroundImage: string;
  id: string;
  isInDevelopment: boolean;
  histories?: string[];
  description?: string;
  suspects: SuspectType[];
  victims: VictimType[];
  places: string[];
}

export interface TextScenarioType extends ScenarioBase {
  gameType: "TEXT";
  prologue: string[];
  clues: ClueData[];
}

export interface ClueScenarioType extends ScenarioBase {
  gameType: "CLUE";
  prologue?: string[];
  clues: ClueType[];
}

export type ScenarioType = TextScenarioType | ClueScenarioType;

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
  scenarioId: string;
  title: string;
  description: string;
  image: string;
  posterImage: string;
  date: string;
  isSuccess: boolean;
  color: string;
  historyLabel?: string;
}
