import { MiddleRacePageContent } from "@/features/middle-race/components/MiddleRacePageContent";
import { useMiddleRaceGame } from "@/features/middle-race/hooks/useMiddleRaceGame";
import Head from "next/head";

export default function MiddleRacePage() {
  const game = useMiddleRaceGame();

  return (
    <>
      <Head>
        <title>중간 달리기</title>
      </Head>
      <MiddleRacePageContent game={game} />
    </>
  );
}
