import { createScenarioMetadata } from "@/libs/scenarioMetadata";

export const metadata = createScenarioMetadata("dure");

export default function DureLayout({ children }: LayoutProps<"/scenarios/scenario/dure">) {
  return children;
}
