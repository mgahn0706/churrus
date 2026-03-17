import { buildCertificationCard } from "@/features/suspect/fixtures/certification";
import { CertificationCardType } from "@/features/suspect/types";

const CERTIFICATION_STORAGE_KEY = "cert-cards";

function getStoredScenarioIds(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawValue = localStorage.getItem(CERTIFICATION_STORAGE_KEY);
    const parsedValue = JSON.parse(rawValue ?? "[]");

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(
      (value): value is string => typeof value === "string" && value.length > 0
    );
  } catch {
    return [];
  }
}

export function getAllCertificationCards(): CertificationCardType[] {
  return [
    "startup",
    "school",
    "jahayeon",
    "dure",
    "museum",
    "serial",
  ]
    .map((scenarioId) => buildCertificationCard(scenarioId))
    .filter((card): card is CertificationCardType => card != null);
}

export function getCertificationCards(): CertificationCardType[] {
  return getStoredScenarioIds()
    .map((scenarioId) => buildCertificationCard(scenarioId))
    .filter((card): card is CertificationCardType => card != null);
}

export function saveScenarioCertification(
  scenarioId: string,
  accusedSuspect: string
): CertificationCardType | null {
  if (typeof window === "undefined") {
    return null;
  }

  const certificationCard = buildCertificationCard(scenarioId, accusedSuspect);

  if (!certificationCard) {
    return null;
  }

  const previousScenarioIds = getStoredScenarioIds();
  const nextScenarioIds = [
    scenarioId,
    ...previousScenarioIds.filter((storedScenarioId) => storedScenarioId !== scenarioId),
  ];

  localStorage.setItem(
    CERTIFICATION_STORAGE_KEY,
    JSON.stringify(nextScenarioIds)
  );

  return certificationCard;
}
