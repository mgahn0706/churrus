import { Typography } from "@mui/material";
import { FruitMarketGame } from "@/features/fruit-market/hooks/useFruitMarketGame";
import { useState } from "react";
import FruitMarketStage from "./FruitMarketStage";
import FruitPriceRoulette from "./FruitPriceRoulette";

interface RoundResultPhaseProps {
  game: FruitMarketGame;
}

export default function RoundResultPhase({ game }: RoundResultPhaseProps) {
  const { round, results, nextRound } = game;
  const [currentResultIndex, setCurrentResultIndex] = useState(0);
  const currentResult = results[currentResultIndex];

  const continueResult = () => {
    if (currentResultIndex < results.length - 1) {
      setCurrentResultIndex((previous) => previous + 1);
      return;
    }

    nextRound();
  };

  return (
    <FruitMarketStage
      eyebrow={`ROUND ${round} CLOSED · ${currentResultIndex + 1}/${results.length}`}
      title="과일별 판매가 공개"
    >
      {currentResult ? (
        <FruitPriceRoulette
          key={currentResult.fruit}
          result={currentResult}
          currentIndex={currentResultIndex}
          resultCount={results.length}
          round={round}
          onContinue={continueResult}
        />
      ) : (
        <Typography color="text.secondary">
          공개할 판매 결과가 없습니다.
        </Typography>
      )}
    </FruitMarketStage>
  );
}
