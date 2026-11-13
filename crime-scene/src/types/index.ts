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

export interface PhysicalClue {
  id: number;
  images: [string, ...string[]];
  text: string;
}

interface ClueBase {
  id: number;
  image: string;
  title: string;
  x: number;
  y: number;
  description: string;
  location?: string;
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
  age: number | "???";
  gender?: "male" | "female";
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
  gameType: "TEXT" | "CLUE" | "INTERROGATION";
  emoji?: string;
}

export interface TextScenarioType extends ScenarioSummary {
  episodeNumber: number;
  gameType: "TEXT";
  prologue: string[];
  clues: ClueData[];
  keywordIds: Record<string, number[]>;
}

export interface ClueScenarioType extends ScenarioSummary {
  episodeNumber: number;
  gameType: "CLUE";
  prologue: ReactNode;
  clues: ClueType[];
  movePlaceButtons: MovePlaceButtonType[];
  additionalQuestions: AdditionalQuestionType[];
}

export interface InterrogationEvidence {
  id: string;
  title: string;
  description: string;
}

export interface InterrogationSource {
  id: string;
  locationId: string;
  title: string;
  description: string;
  evidence: InterrogationEvidence;
}

export interface InterrogationMapLocation {
  id: string;
  title: string;
  x: number;
  y: number;
}

export interface InterrogationDialogueLine {
  text: string;
  speaker?: string;
  portrait?: string;
}

export interface InterrogationCombination {
  id: string;
  evidenceIds: [string, string];
  result: InterrogationEvidence;
  explanation: string;
}

export interface InterrogationQuestion {
  id: string;
  prompt: string;
  answer: string;
  challenge?: {
    evidenceId: string;
    response: string;
    revealedEvidence?: InterrogationEvidence;
  };
}

export interface InterrogationPhase {
  id: string;
  title: string;
  intro: string;
  mapImage?: string;
  locations: InterrogationMapLocation[];
  sources: InterrogationSource[];
  combinations: InterrogationCombination[];
  interrogations: {
    suspectName: string;
    questions: InterrogationQuestion[];
  }[];
  requiredCombinationIds: string[];
  requiredQuestionIds: string[];
}

export interface InterrogationScenarioType extends ScenarioSummary {
  episodeNumber: number;
  gameType: "INTERROGATION";
  prologue: (string | InterrogationDialogueLine)[];
  phases: InterrogationPhase[];
}

export type ScenarioType =
  | TextScenarioType
  | ClueScenarioType
  | InterrogationScenarioType;

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
