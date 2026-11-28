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
  referenceId?: string;
}

export interface ClueInterrogation {
  id: string;
  suspectName: string;
  prompt: string;
  requiredReferenceIds: string[];
  result: {
    referenceId: string;
    title: string;
    description: string;
  };
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
  interrogations?: ClueInterrogation[];
}

export interface InterrogationEvidence {
  id: string;
  title: string;
  description: string;
  image?: string;
}

export interface InterrogationSource {
  id: string;
  locationId?: string;
  versionPhaseId?: string;
  x?: number;
  y?: number;
  title: string;
  password?: string;
  evidence: InterrogationEvidence;
}

export interface InterrogationMapLocation {
  id: string;
  title: string;
  x: number;
  y: number;
}

export interface InterrogationPersonProfile {
  name: string;
  image?: string;
  description?: string;
  canInterrogate?: boolean;
}

export interface InterrogationMapPerson {
  name: string;
  x: number;
  y: number;
}

export interface InterrogationDialogueLine {
  text: string;
  speaker?: string;
  portrait?: string;
}

export type InterrogationScript = string | (string | InterrogationDialogueLine)[];

export interface InterrogationConversationChoice {
  id: string;
  question: string;
  answer: InterrogationScript;
}

export interface InterrogationCombination {
  id: string;
  evidenceIds: [string, string];
  result: InterrogationEvidence;
  explanation: string;
}

export interface InterrogationQuestion {
  id: string;
  evidenceId?: string;
  evidenceIds?: string[];
  prompt?: string;
  answer: InterrogationScript;
  revealedEvidence?: InterrogationEvidence;
}

export interface InterrogationPhase {
  id: string;
  title: string;
  intro: InterrogationScript;
  timeLabel?: string;
  energyLimit?: number;
  finalInterrogation?: boolean;
  mapImage?: string;
  locations: InterrogationMapLocation[];
  people?: InterrogationMapPerson[];
  sources: InterrogationSource[];
  combinations: InterrogationCombination[];
  fallbackAnswers?: InterrogationScript[];
  interrogations: {
    suspectName: string;
    conversation?: InterrogationScript;
    conversationChoices?: InterrogationConversationChoice[];
    fallbackAnswers?: InterrogationScript[];
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
  people?: InterrogationPersonProfile[];
  fallbackAnswers?: InterrogationScript[];
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
