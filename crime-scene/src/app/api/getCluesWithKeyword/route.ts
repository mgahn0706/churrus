import {
  schoolClues,
  schoolKeywordIds,
} from "@/fixtures/school/clues";
import { dureClues, dureKeywordIds } from "@/fixtures/dure/clues";
import {
  bluemoonClues,
  bluemoonKeywordIds,
} from "@/fixtures/bluemoon/clues";
import { hotelClues, hotelKeywordIds } from "@/fixtures/hotel/clues";
import type { ClueData } from "@/types";
import { NextResponse } from "next/server";

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

export function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const keyword = searchParams.get("keyword");
  const scenarioKey = searchParams.get("scenarioId") ?? "school";
  const scenario = scenarios[scenarioKey];

  if (!keyword || !scenario) {
    return NextResponse.json(null);
  }

  const normalizedKeyword = keyword.toUpperCase();
  const ids =
    scenario.keywordIds[normalizedKeyword] ??
    Object.entries(scenario.keywordIds).find(
      ([candidate]) => candidate.toUpperCase() === normalizedKeyword
    )?.[1];

  if (!ids?.length) {
    return NextResponse.json(null);
  }

  const result = ids
    .map((id) => scenario.clues[id - 1])
    .filter((clue): clue is ClueData => Boolean(clue));

  return NextResponse.json(result.length ? result : null);
}
