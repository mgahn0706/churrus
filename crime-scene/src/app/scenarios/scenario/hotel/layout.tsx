import { createScenarioMetadata } from "@/libs/scenarioMetadata";

export const metadata = createScenarioMetadata("hotel");

export default function HotelLayout({ children }: LayoutProps<"/scenarios/scenario/hotel">) {
  return children;
}
