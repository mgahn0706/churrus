import { createScenarioMetadata } from "@/libs/scenarioMetadata";

export const metadata = createScenarioMetadata("jahayeon");

export default function JahayeonLayout({ children }: LayoutProps<"/scenarios/scenario/jahayeon">) {
  return children;
}
