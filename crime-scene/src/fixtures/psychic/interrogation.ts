import type { InterrogationScenarioType } from "@/types";
import { psychicSuspects } from "./suspects";
import { psychicPrologue } from "./prologue";

// Fill in each phase's sources, combinations, and questions here.
// IDs stay unique across phases so saved progress remains stable.
// requiredCombinationIds and requiredQuestionIds decide when a phase can end.
export const psychicInterrogationContent: Pick<
  InterrogationScenarioType,
  "prologue" | "phases"
> = {
  prologue: psychicPrologue.slice(0, 3),
  phases: [
    {
      id: "phase-1",
      title: "첫 번째 조사",
      intro: "",
      mapImage: "/image/scenario/psychic/map/lab-map.svg",
      locations: [
        { id: "entrance", title: "연구소 입구", x: 18, y: 69 },
        { id: "main-hall", title: "메인홀", x: 51, y: 42 },
        { id: "observation", title: "관찰실", x: 80, y: 67 },
      ],
      sources: [],
      combinations: [],
      interrogations: psychicSuspects.map((suspect) => ({
        suspectName: suspect.name,
        questions: [],
      })),
      requiredCombinationIds: [],
      requiredQuestionIds: [],
    },
  ],
};
