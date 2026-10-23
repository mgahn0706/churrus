import { createScenarioMetadata } from "@/libs/scenarioMetadata";

export const metadata = createScenarioMetadata("bluemoon");

export default function BluemoonLayout({ children }: LayoutProps<"/scenarios/scenario/bluemoon">) {
  return children;
}
