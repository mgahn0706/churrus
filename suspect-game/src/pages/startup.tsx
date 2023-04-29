import { ClueButton } from "@/components/ClueButton";
import { ClueDetailView } from "@/components/ClueDetailView";
import { ClueType, startUpClues } from "@/fixtures/clues/startup";
import Image from "next/image";
import { useState } from "react";

export default function Startup() {
  const [openedClueId, setOpenedClueId] = useState<number | null>(null);

  const openedClue: ClueType | null =
    startUpClues.find((clue) => clue.id === openedClueId) ?? null;

  return (
    <>
      {openedClue !== null && (
        <ClueDetailView
          clueData={openedClue}
          id={openedClueId}
          onClose={() => {
            setOpenedClueId(null);
          }}
        />
      )}
      <Image
        src="/lounge.png"
        alt="스타트업 라운지 이미지"
        fill
        style={{
          zIndex: -1,
        }}
        onClick={() => {
          document.onclick = (e) => {
            console.log(
              ((100 * e.pageX) / screen.width).toFixed(2),
              ((100 * e.pageY) / screen.height).toFixed(2)
            );
          };
        }}
      />
      {startUpClues.map((clue, index) => {
        return (
          <ClueButton
            key={clue.id}
            label={clue.title}
            index={clue.id}
            x={clue.x}
            y={clue.y}
            onClick={() => {
              setOpenedClueId(clue.id);
            }}
          />
        );
      })}
    </>
  );
}
