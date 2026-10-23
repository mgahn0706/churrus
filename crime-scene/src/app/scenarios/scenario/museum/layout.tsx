import { createScenarioMetadata } from "@/libs/scenarioMetadata";

export const metadata = createScenarioMetadata("museum");

export default function MuseumLayout({ children }: LayoutProps<"/scenarios/scenario/museum">) {
  return children;
}
