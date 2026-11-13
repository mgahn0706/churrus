"use client";

import InInterrogationGame from "@/components/InInterrogationGame";
import { createInterrogationScenario } from "@/fixtures";
import { psychicInterrogationContent } from "@/fixtures/psychic/interrogation";

const psychicScenario = createInterrogationScenario(
  "psychic",
  psychicInterrogationContent,
);

export default function PsychicScenario() {
  return <InInterrogationGame scenario={psychicScenario} />;
}
