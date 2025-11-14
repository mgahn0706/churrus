// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  schoolClues,
  schoolKeywordIds,
} from "@/features/suspect/fixtures/school/clues";

import {
  dureClues,
  dureKeywordIds,
} from "@/features/suspect/fixtures/dure/clues";

import type { NextApiRequest, NextApiResponse } from "next";

export interface ClueData {
  id: number;
  text: string;
  from: string;
  image?: string;
}

type Scenario = {
  keywordIds: Record<string, number[]>;
  clues: ClueData[];
};
const scenarios: Record<string, Scenario> = {
  school: { keywordIds: schoolKeywordIds, clues: schoolClues },
  dure: { keywordIds: dureKeywordIds, clues: dureClues },
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

  const ids = scenario.keywordIds[keyword];
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
