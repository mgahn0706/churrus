import { createScenarioMetadata } from "@/libs/scenarioMetadata";

export const metadata = createScenarioMetadata("psychic");

export default function PsychicLayout({ children }: LayoutProps<"/scenarios/scenario/psychic">) {
  return children;
}
