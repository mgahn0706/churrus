import InTextGame from "@/components/InTextGame";
import { createTextScenario } from "@/fixtures";
import { hotelClues } from "@/fixtures/hotel/clues";
import { hotelPrologue } from "@/fixtures/hotel/prologue";

const hotelScenario = createTextScenario("hotel", hotelClues, hotelPrologue);

export default function Hotel() {
  return <InTextGame scenario={hotelScenario} />;
}
