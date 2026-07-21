// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  schoolClues,
  schoolKeywordIds,
} from "@/features/suspect/fixtures/school/clues";

import {
  dureClues,
  dureKeywordIds,
} from "@/features/suspect/fixtures/dure/clues";
import {
  bluemoonClues,
  bluemoonKeywordIds,
} from "@/features/suspect/fixtures/bluemoon/clues";
import {
  hotelClues,
  hotelKeywordIds,
} from "@/features/suspect/fixtures/hotel/clues";
import type { NextApiRequest, NextApiResponse } from "next";

interface BaseClueData {
  id: number;
  text: string;
  from: string;
}

export type ClueData = BaseClueData &
  (
    | {
        image: string;
        physicalClueId: number;
      }
    | {
        image?: string;
        physicalClueId?: never;
      }
  );

type Scenario = {
  keywordIds: Record<string, number[]>;
  clues: ClueData[];
};
const scenarios: Record<string, Scenario> = {
  school: { keywordIds: schoolKeywordIds, clues: schoolClues },
  dure: { keywordIds: dureKeywordIds, clues: dureClues },
  bluemoon: { keywordIds: bluemoonKeywordIds, clues: bluemoonClues },
  hotel: { keywordIds: hotelKeywordIds, clues: hotelClues },
};

interface ClueApiRequest extends NextApiRequest {
  query: {
    keyword: string;
    scenarioId?: string;
  };
}

export default function handler(
  req: ClueApiRequest,
  res: NextApiResponse<ClueData[] | null>
) {
  const { keyword, scenarioId } = req.query;

  // scenarioId가 없으면 기존과 동일하게 school 사용
  const scenarioKey = scenarioId ?? "school";
  const scenario = scenarios[scenarioKey];

  if (!scenario) {
    res.status(200).json(null);
    return;
  }

  const normalizedKeyword = keyword.toUpperCase();
  const ids =
    scenario.keywordIds[normalizedKeyword] ??
    Object.entries(scenario.keywordIds).find(
      ([keyword]) => keyword.toUpperCase() === normalizedKeyword
    )?.[1];
  if (!ids || ids.length === 0) {
    res.status(200).json(null);
    return;
  }

  // 방어적으로 인덱스 체크
  const result = ids
    .map((id) => scenario.clues[id - 1])
    .filter((c): c is ClueData => Boolean(c));

  res.status(200).json(result.length ? result : null);
}
