import { createScenarioMetadata } from "@/libs/scenarioMetadata";

export const metadata = createScenarioMetadata("mountain");

export default function MountainLayout({ children }: LayoutProps<"/scenarios/scenario/mountain">) {
  return children;
}
