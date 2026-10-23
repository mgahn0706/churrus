import { createScenarioMetadata } from "@/libs/scenarioMetadata";

export const metadata = createScenarioMetadata("startup");

export default function StartupLayout({ children }: LayoutProps<"/scenarios/scenario/startup">) {
  return children;
}
