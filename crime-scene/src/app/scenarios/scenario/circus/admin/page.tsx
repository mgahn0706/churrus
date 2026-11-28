import { notFound } from "next/navigation";
import { circusClues } from "@/fixtures/circus/clues";
import CircusClueAdmin from "./CircusClueAdmin";

export default function CircusAdminPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  return <CircusClueAdmin clues={circusClues.filter((clue) => clue.type === "basic")} />;
}
