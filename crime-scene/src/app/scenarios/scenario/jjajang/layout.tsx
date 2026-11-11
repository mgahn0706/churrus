import { createScenarioMetadata } from "@/libs/scenarioMetadata";

export const metadata = createScenarioMetadata("jjajang");

export default function JjajangLayout({ children }: LayoutProps<"/scenarios/scenario/jjajang">) {
  return children;
}
