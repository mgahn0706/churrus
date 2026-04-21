import { josa } from "es-hangul";

import { SuspectType } from "@/features/suspect/types";

interface VoteSummaryItem {
  suspect: SuspectType;
  count: number;
}

interface BuildFinalRevealStepsParams {
  episodeNumber: number;
  scenarioTitle: string;
  voteSummary: VoteSummaryItem[];
}

const sortVoteSummary = (voteSummary: VoteSummaryItem[]) => {
  return [...voteSummary].sort((left, right) => {
    if (right.count !== left.count) {
      return right.count - left.count;
    }

    return left.suspect.name.localeCompare(right.suspect.name, "ko");
  });
};

export const shouldDisableFinalReveal = (voteSummary: VoteSummaryItem[]) => {
  const sortedVoteSummary = sortVoteSummary(voteSummary);
  const topVoteCount = sortedVoteSummary[0]?.count ?? 0;
  const topTiedCandidates = sortedVoteSummary.filter(
    ({ count }) => count === topVoteCount && count > 0
  );

  return topTiedCandidates.length >= 3;
};

export const buildFinalRevealSteps = ({
  episodeNumber,
  scenarioTitle,
  voteSummary,
}: BuildFinalRevealStepsParams) => {
  const sortedVoteSummary = sortVoteSummary(voteSummary);
  const distinctVoteCounts = Array.from(
    new Set(sortedVoteSummary.map(({ count }) => count).filter((count) => count > 0))
  );

  const topVoteCount = sortedVoteSummary[0]?.count ?? 0;
  const topTiedCandidates = sortedVoteSummary
    .filter(({ count }) => count === topVoteCount && count > 0)
    .map(({ suspect }) => suspect.name);
  const secondDistinctVoteCount = distinctVoteCounts[1] ?? 0;
  const secondTiedCandidates = sortedVoteSummary
    .filter(({ count }) => count === secondDistinctVoteCount && count > 0)
    .map(({ suspect }) => suspect.name);
  const isRunnerUpTied =
    topTiedCandidates.length === 1 && secondDistinctVoteCount > 0 && secondTiedCandidates.length > 1;
  const suspenseCutoffVoteCount =
    secondDistinctVoteCount > 0 ? secondDistinctVoteCount : topVoteCount;
  const finalCandidates = isRunnerUpTied
    ? []
    : sortedVoteSummary
        .filter(({ count }) => count >= suspenseCutoffVoteCount && count > 0)
        .map(({ suspect }) => suspect.name);
  const excludedCandidates = isRunnerUpTied
    ? ""
    : sortedVoteSummary
        .filter(({ count }) => count < suspenseCutoffVoteCount)
        .map(({ suspect }) => `${suspect.name}.`)
        .join(" ");

  const finalCandidateLine =
    finalCandidates.length > 0
      ? finalCandidates.join(" 그리고 ")
      : "지목된 후보가 없습니다";
  const excludedLine =
    excludedCandidates.length > 0
      ? excludedCandidates
      : "제외된 후보가 없습니다.";
  const winnerName = sortedVoteSummary[0]?.suspect.name ?? "지목된 인물이 없습니다";
  const runnerUpCount = sortedVoteSummary[1]?.count ?? 0;
  const winnerCount = topVoteCount > 0 ? topVoteCount : 0;
  const isTopVoteTied = topTiedCandidates.length > 1;
  const eliminationVoteCount =
    sortedVoteSummary.find(({ count }) => count < suspenseCutoffVoteCount)?.count ??
    0;
  const winnerScoreLine = winnerCount > 0 ? `${winnerCount}:${runnerUpCount}` : "0:0";
  const exclusionSteps = isRunnerUpTied
    ? [
        "최종 범인 지목 투표 결과",
        `${secondDistinctVoteCount}표를 받은 사람이 동률입니다.`,
        `${secondTiedCandidates.join(", ")} 중 한 명을 바로 제외할 수 없습니다.`,
        "최종 후보 선정을 위해 재투표를 실시합니다",
      ]
    : excludedCandidates.length > 0
      ? [
          "최종 범인 지목 투표 결과",
          `${eliminationVoteCount}표를 받은 사람은`,
          excludedLine,
          "범인 후보 제외",
        ]
      : ["최종 범인 지목 투표 결과", "아직 제외된 후보가 없습니다"];
  const finalCandidateSteps = isRunnerUpTied
    ? [
        "현재 1위 후보는 확정되었지만",
        "2위 후보가 동률이기 때문에",
        "최종 범인 후보 2명을 아직 확정할 수 없습니다",
      ]
    : finalCandidates.length > 0
      ? [
          "이렇게 해서",
          "최종 범인 후보로",
          josa(finalCandidateLine, "이/가"),
          "지목되었습니다",
        ]
      : ["이렇게 해서", "최종 범인 후보는 아직 정해지지 않았습니다"];
  const winnerRevealSteps =
    isRunnerUpTied
      ? [
          "본격 추리게임 크라임씬",
          `<${scenarioTitle}> 최종 후보 선정 결과`,
          `${secondTiedCandidates.join(", ")}가 ${secondDistinctVoteCount}표로 동률입니다.`,
          "최종 후보 선정을 위해 재투표를 실시합니다!",
        ]
      : isTopVoteTied
      ? [
          "본격 추리게임 크라임씬",
          `<${scenarioTitle}> 최종 투표 결과`,
          `${topTiedCandidates.join(", ")}가 ${winnerCount}표로 동률입니다.`,
          "재투표를 실시합니다!",
        ]
      : winnerCount > 0
        ? [
            "본격 추리게임 크라임씬",
            `<${scenarioTitle}> 최종 투표 결과`,
            "최종 범인으로 지목된 사람은",
            `${josa(winnerScoreLine, "으로/로")} ${winnerCount}표를 획득한`,
            winnerName,
          ]
        : [
            "본격 추리게임 크라임씬",
            `<${scenarioTitle}> 최종 투표 결과`,
            "아직 최종 범인이 정해지지 않았습니다",
          ];

  return [
    `추리게임 협동 크라임씬의 ${episodeNumber}번째 에피소드`,
    `<${scenarioTitle}>의 범인을 찾기 위한`,
    "숨막히는 추리게임의 결과",
    "범인으로 가장 많은 지목을 받은 사람은 누구인지",
    "지금부터 투표 결과를 공개합니다.",
    "본격 추리 게임 크라임씬",
    "최종 범인 후보에서 제외된 사람을 말씀드리겠습니다",
    ...exclusionSteps,
    ...finalCandidateSteps,
    ...winnerRevealSteps,
    ...(!isRunnerUpTied && !isTopVoteTied && winnerCount > 0
      ? [`최종 범인 후보로 지목된 ${josa(winnerName, "은/는")} 감옥으로 이동해주십시오.`]
      : []),
  ] as const;
};
