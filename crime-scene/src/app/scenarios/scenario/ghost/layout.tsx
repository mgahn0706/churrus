import { createScenarioMetadata } from "@/libs/scenarioMetadata";

export const metadata = createScenarioMetadata("ghost");

export default function GhostLayout({ children }: LayoutProps<"/scenarios/scenario/ghost">) {
  return children;
}
