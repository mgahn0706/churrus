"use client";

import InInterrogationGame from "@/components/InInterrogationGame";
import { deriveSharedQuestions, materializeSharedQuestions, syncSharedQuestionPhases } from "@/features/interrogation/sharedQuestions";
import { deriveSharedSources, materializeSharedSources } from "@/features/interrogation/sharedSources";
import { createInterrogationScenario } from "@/fixtures";
import { psychicInterrogationContent } from "@/fixtures/psychic/interrogation";

const sharedSources = deriveSharedSources(psychicInterrogationContent.phases);
const phasesWithSharedSources = materializeSharedSources(psychicInterrogationContent.phases, sharedSources);
const sharedQuestions = syncSharedQuestionPhases(
  phasesWithSharedSources,
  sharedSources,
  deriveSharedQuestions(phasesWithSharedSources),
);
const psychicScenario = createInterrogationScenario(
  "psychic",
  { ...psychicInterrogationContent, phases: materializeSharedQuestions(phasesWithSharedSources, sharedQuestions) },
);

export default function PsychicScenario() {
  return <InInterrogationGame scenario={psychicScenario} />;
}
