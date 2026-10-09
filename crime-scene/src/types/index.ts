import type { ReactNode } from "react";

interface BaseClueData {
  id: number;
  text: string;
  from: string;
}

export type ClueData = BaseClueData &
  (
    | {
        images: [string, ...string[]];
        physicalClueId: number;
      }
    | {
        images?: never;
        physicalClueId?: never;
      }
  );

interface ClueBase {
  id: number;
  image: string;
  title: string;
  x: number;
  y: number;
  description: string;
  place: string | number;
}

interface PasswordClueLock {
  method: "password";
  password: string;
  hint?: string;
}

interface PrerequisiteClueLock {
  method: "clue";
  clueId: number;
  hint?: string;
}

export type ClueLock = PasswordClueLock | PrerequisiteClueLock;

export interface ClueType extends ClueBase {
  type: "basic" | "additional";
  lock?: ClueLock;
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

export interface ScenarioSummary {
  color: string;
  title: string;
  englishTitle: string;
  creators: string[];
  backgroundImage: string;
  id: string;
  isInDevelopment: boolean;
  histories?: string[];
  description?: string;
  suspects: SuspectType[];
  victims: VictimType[];
  places: string[];
  gameType: "TEXT" | "CLUE";
}

export interface TextScenarioType extends ScenarioSummary {
  gameType: "TEXT";
  prologue: string[];
  clues: ClueData[];
}

export interface ClueScenarioType extends ScenarioSummary {
  gameType: "CLUE";
  prologue: ReactNode;
  clues: ClueType[];
  movePlaceButtons: MovePlaceButtonType[];
  additionalQuestions: AdditionalQuestionType[];
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
