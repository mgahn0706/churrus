import { circusClues } from "@/fixtures/circus/clues";
import CircusClueAdmin from "./CircusClueAdmin";

export default function CircusAdminPage() {
  return (
    <CircusClueAdmin
      clues={circusClues}
      canSaveToSource={process.env.NODE_ENV === "development"}
    />
  );
}
