import { createScenarioMetadata } from "@/libs/scenarioMetadata";

export const metadata = createScenarioMetadata("parade");

export default function ParadeLayout({ children }: LayoutProps<"/scenarios/scenario/parade">) {
  return children;
}
