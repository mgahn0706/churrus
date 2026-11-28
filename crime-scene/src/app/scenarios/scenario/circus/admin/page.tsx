import { circusClues } from "@/fixtures/circus/clues";
import CircusClueAdmin from "./CircusClueAdmin";

export default function CircusAdminPage() {
  return (
    <CircusClueAdmin
      clues={circusClues.filter((clue) => clue.type === "basic")}
      allClues={circusClues}
      canSaveToSource={process.env.NODE_ENV === "development"}
    />
  );
}
