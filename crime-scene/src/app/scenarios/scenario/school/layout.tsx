import { createScenarioMetadata } from "@/libs/scenarioMetadata";

export const metadata = createScenarioMetadata("school");

export default function SchoolLayout({ children }: LayoutProps<"/scenarios/scenario/school">) {
  return children;
}
