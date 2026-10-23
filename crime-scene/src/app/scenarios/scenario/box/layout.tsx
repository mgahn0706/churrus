import { createScenarioMetadata } from "@/libs/scenarioMetadata";

export const metadata = createScenarioMetadata("box");

export default function BoxLayout({ children }: LayoutProps<"/scenarios/scenario/box">) {
  return children;
}
