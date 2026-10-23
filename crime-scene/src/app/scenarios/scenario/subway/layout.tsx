import { createScenarioMetadata } from "@/libs/scenarioMetadata";

export const metadata = createScenarioMetadata("subway");

export default function SubwayLayout({ children }: LayoutProps<"/scenarios/scenario/subway">) {
  return children;
}
