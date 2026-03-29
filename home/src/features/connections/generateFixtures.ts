import { promises as fs } from "fs";
import * as path from "path";

type WordTuple = [string, string, string, string];

interface ConnectionQuizType {
  words: WordTuple;
  description: string;
}

interface ConnectionsType {
  week: number;
  quiz: [
    ConnectionQuizType,
    ConnectionQuizType,
    ConnectionQuizType,
    ConnectionQuizType
  ];
}

const MIN_GENERATED_YEAR = 2026;
const FIXTURES_DIR = path.join(__dirname, "fixtures");
const RAW_DIR = path.join(FIXTURES_DIR, "raw");

const parseError = (year: number, lineNumber: number, message: string) =>
  new Error(`[${year}.txt:${lineNumber}] ${message}`);

const isYear = (value: string) =>
  /^\d{4}$/.test(value) && Number(value) >= MIN_GENERATED_YEAR;

const formatString = (value: string) => JSON.stringify(value);

async function listRawYears() {
  try {
    const entries = await fs.readdir(RAW_DIR, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => name.endsWith(".txt"))
      .map((name) => name.replace(/\.txt$/, ""))
      .filter(isYear)
      .map(Number)
      .sort((a, b) => a - b);
  } catch (error) {
    const nodeError = error as NodeJS.ErrnoException;

    if (nodeError.code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

function parseRequestedYears(args: string[], rawYears: number[]) {
  if (args.length === 0) {
    return rawYears;
  }

  const requestedYears = Array.from(
    new Set(
      args.map((value) => {
        if (!isYear(value)) {
          throw new Error(
            `Year must be a 4-digit number greater than or equal to ${MIN_GENERATED_YEAR}: ${value}`
          );
        }

        return Number(value);
      })
    )
  ).sort((a, b) => a - b);

  requestedYears.forEach((year) => {
    if (!rawYears.includes(year)) {
      throw new Error(
        `Missing raw input file: ${path.join(RAW_DIR, `${year}.txt`)}`
      );
    }
  });

  return requestedYears;
}

function finalizeWeek(
  year: number,
  week: { week: number; quiz: ConnectionQuizType[] } | null,
  lineNumber: number,
  seenWeeks: Set<number>,
  result: ConnectionsType[]
) {
  if (!week) {
    return;
  }

  if (seenWeeks.has(week.week)) {
    throw parseError(year, lineNumber, `Duplicate week: ${week.week}`);
  }

  if (week.quiz.length !== 4) {
    throw parseError(
      year,
      lineNumber,
      `Week ${week.week} must contain exactly 4 quiz lines. Received ${week.quiz.length}.`
    );
  }

  seenWeeks.add(week.week);
  result.push({
    week: week.week,
    quiz: week.quiz as ConnectionsType["quiz"],
  });
}

function parseRawText(year: number, source: string) {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const result: ConnectionsType[] = [];
  const seenWeeks = new Set<number>();
  let currentWeek: { week: number; quiz: ConnectionQuizType[] } | null = null;

  lines.forEach((rawLine, index) => {
    const lineNumber = index + 1;
    const line = rawLine.trim();

    if (line === "" || line.startsWith("#")) {
      return;
    }

    const weekMatch = line.match(/^week:\s*(\d+)$/i);

    if (weekMatch) {
      finalizeWeek(year, currentWeek, lineNumber, seenWeeks, result);
      currentWeek = { week: Number(weekMatch[1]), quiz: [] };
      return;
    }

    if (!currentWeek) {
      throw parseError(
        year,
        lineNumber,
        "Quiz lines must appear after a `week: {number}` header."
      );
    }

    const separatorIndex = line.indexOf("|");

    if (separatorIndex === -1) {
      throw parseError(
        year,
        lineNumber,
        "Quiz line must use `description | word1, word2, word3, word4`."
      );
    }

    const description = line.slice(0, separatorIndex).trim();
    const words = line
      .slice(separatorIndex + 1)
      .split(",")
      .map((word) => word.trim())
      .filter(Boolean);

    if (!description) {
      throw parseError(year, lineNumber, "Description cannot be empty.");
    }

    if (words.length !== 4) {
      throw parseError(
        year,
        lineNumber,
        `Each quiz line must contain exactly 4 words. Received ${words.length}.`
      );
    }

    currentWeek.quiz.push({
      description,
      words: words as WordTuple,
    });

    if (currentWeek.quiz.length > 4) {
      throw parseError(
        year,
        lineNumber,
        `Week ${currentWeek.week} cannot contain more than 4 quiz lines.`
      );
    }
  });

  finalizeWeek(year, currentWeek, lines.length, seenWeeks, result);

  if (result.length === 0) {
    throw new Error(`[${year}.txt] No week data found.`);
  }

  return result;
}

function buildYearFixture(year: number, quizzes: ConnectionsType[]) {
  const lines: string[] = ['import { ConnectionsType } from "..";', ""];

  lines.push(`export const CONNECTIONS${year}: ConnectionsType[] = [`);

  quizzes.forEach((week) => {
    lines.push("  {");
    lines.push(`    week: ${week.week},`);
    lines.push("    quiz: [");

    week.quiz.forEach((quiz) => {
      lines.push("      {");
      lines.push(
        `        words: [${quiz.words.map(formatString).join(", ")}],`
      );
      lines.push(`        description: ${formatString(quiz.description)},`);
      lines.push("      },");
    });

    lines.push("    ],");
    lines.push("  },");
  });

  lines.push("];");

  return `${lines.join("\n")}\n`;
}

async function generateYear(year: number) {
  const rawPath = path.join(RAW_DIR, `${year}.txt`);
  const source = await fs.readFile(rawPath, "utf8");
  const parsed = parseRawText(year, source);
  const yearDir = path.join(FIXTURES_DIR, String(year));
  const fixturePath = path.join(yearDir, "index.ts");

  await fs.mkdir(yearDir, { recursive: true });
  await fs.writeFile(fixturePath, buildYearFixture(year, parsed), "utf8");

  return { year, fixturePath, weekCount: parsed.length };
}

async function main() {
  const rawYears = await listRawYears();
  const yearsToGenerate = parseRequestedYears(process.argv.slice(2), rawYears);

  if (yearsToGenerate.length === 0) {
    throw new Error(
      `No raw input files found in ${RAW_DIR}. Add files like ${MIN_GENERATED_YEAR}.txt first.`
    );
  }

  const results = [];

  for (const year of yearsToGenerate) {
    results.push(await generateYear(year));
  }

  results.forEach(({ year, weekCount, fixturePath }) => {
    console.log(
      `Generated ${year} fixture with ${weekCount} week(s): ${fixturePath}`
    );
  });
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
});
