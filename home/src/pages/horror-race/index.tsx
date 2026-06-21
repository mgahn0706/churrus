import { HorrorRacePageContent } from "@/features/horror-race/components/HorrorRacePageContent";
import { useHorrorRaceGame } from "@/features/horror-race/hooks/useHorrorRaceGame";
import Head from "next/head";

export default function HorrorRacePage() {
  const game = useHorrorRaceGame();

  return (
    <>
      <Head>
        <title>호러 레이스</title>
      </Head>
      <HorrorRacePageContent game={game} />
    </>
  );
}
