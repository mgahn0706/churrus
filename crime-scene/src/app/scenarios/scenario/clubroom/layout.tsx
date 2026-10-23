import { createScenarioMetadata } from "@/libs/scenarioMetadata";

export const metadata = createScenarioMetadata("clubroom");

export default function ClubroomLayout({ children }: LayoutProps<"/scenarios/scenario/clubroom">) {
  return children;
}
