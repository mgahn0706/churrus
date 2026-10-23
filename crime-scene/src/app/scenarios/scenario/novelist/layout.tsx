import { createScenarioMetadata } from "@/libs/scenarioMetadata";

export const metadata = createScenarioMetadata("novelist");

export default function NovelistLayout({ children }: LayoutProps<"/scenarios/scenario/novelist">) {
  return children;
}
