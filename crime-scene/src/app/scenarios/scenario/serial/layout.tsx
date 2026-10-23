import { createScenarioMetadata } from "@/libs/scenarioMetadata";

export const metadata = createScenarioMetadata("serial");

export default function SerialLayout({ children }: LayoutProps<"/scenarios/scenario/serial">) {
  return children;
}
