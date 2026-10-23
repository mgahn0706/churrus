import type { Metadata } from "next";
import { scenarioCatalog, type ScenarioId } from "@/fixtures";

export const createScenarioMetadata = (id: ScenarioId): Metadata => {
  const scenario = scenarioCatalog.find((candidate) => candidate.id === id);

  if (!scenario) {
    throw new Error(`Scenario not found: ${id}`);
  }

  return {
    title: {
      absolute: `${scenario.title} | 협동 크라임씬`,
    },
  };
};
