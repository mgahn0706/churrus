import { createScenarioMetadata } from "@/libs/scenarioMetadata";

export const metadata = createScenarioMetadata("circus");

export default function CircusLayout({ children }: LayoutProps<"/scenarios/scenario/circus">) {
  return children;
}
