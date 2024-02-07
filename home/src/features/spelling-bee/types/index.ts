export interface SpellingBeeType {
  week: number;
  centerLetter: string;
  outerLetters: string[];
  answers: {
    common: string[];
    uncommon: string[];
  };
  pangrams: {
    common: string[];
    uncommon: string[];
  };
}
