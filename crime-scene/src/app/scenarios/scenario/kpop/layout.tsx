import { createScenarioMetadata } from "@/libs/scenarioMetadata";

export const metadata = createScenarioMetadata("kpop");

export default function KpopLayout({ children }: LayoutProps<"/scenarios/scenario/kpop">) {
  return children;
}
