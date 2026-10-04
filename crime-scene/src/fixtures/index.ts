import type {
  ClueData,
  ClueScenarioType,
  ClueType,
  ScenarioSummary,
  TextScenarioType,
} from "@/types";
import { startUpSuspects, startUpVictim } from "./startup/suspects";
import { schoolSuspects, schoolVictim } from "./school/suspects";
import { jahayeonSuspects, jahayeonVictim } from "./jahayeon/suspects";
import { dureSuspects, dureVictim } from "./dure/suspects";
import { museumSuspects, museumVictim } from "./museum/suspects";
import { serialSuspects, serialVictims } from "./serial/suspects";
import { bluemoonSuspects, bluemoonVictim } from "./bluemoon/suspects";
import { mountainSuspects, mountainVictim } from "./mountain/suspects";
import { kpopSuspects, kpopVictim } from "./kpop/suspects";
import { novelistSuspects, novelistVictim } from "./novelist/suspects";
import { subwaySuspects, subwayVictim } from "./subway/suspects";
import { clubroomSuspects, clubroomVictim } from "./clubroom/suspects";
import { hotelSuspects, hotelVictim } from "./hotel/suspects";
import { ghostSuspect, ghostVictim } from "./ghost/suspects";
import { boxSuspects, boxVictim } from "./box/suspects";
import { paradeSuspects, paradeVictims } from "./parade/suspects";

export const scenarioCatalog = [
  {
    title: "스타트업 살인사건",
    creators: ["안민규"],
    backgroundImage: "/image/scenario/startup/startup-main.png",
    id: "startup",
    isInDevelopment: false,
    histories: ["2023년 7월 정기모임", "2025년 4월 정기모임"],
    places: ["lounge", "office"],
    description: "IT 스타트업 '추러스'에서 발생한 살인사건",
    gameType: "CLUE",
    suspects: startUpSuspects,
    victims: [startUpVictim],
    color: "#3B4CCA",
  },
  {
    title: "와부고 살인사건",
    creators: ["안민규"],
    gameType: "TEXT",
    histories: ["2023년 10월 정기모임", "2024년 3월 OT", "2026년 9월 OT"],
    backgroundImage: "/image/scenario/school/school-main.png",
    id: "school",
    isInDevelopment: false,
    places: ["2F", "3F"],
    description: "와부고등학교 교실에서 한 학생이 사망한 사건",
    suspects: schoolSuspects,
    victims: [schoolVictim],
    color: "#ef4444",
  },
  {
    title: "자하연 살인사건",
    creators: ["안민규"],
    gameType: "CLUE",
    backgroundImage: "/image/scenario/jahayeon/jahayeon-main.png",
    id: "jahayeon",
    isInDevelopment: false,
    histories: ["2023년 1월 2차 정기모임", "2025년 10월 정기모임"],
    description: "한겨울 자하연에서 시체가 발견되었다",
    places: ["pond", "dorm", "house"],
    suspects: jahayeonSuspects,
    victims: [jahayeonVictim],
    color: "#0891b2",
  },
  {
    title: "두레문예관 살인사건",
    creators: ["강재호", "고재준", "김지훈", "김현준", "안민규"],
    gameType: "TEXT",
    backgroundImage: "/image/scenario/dure/dure-main.png",
    id: "dure",
    isInDevelopment: false,
    histories: ["2023년 5월 추러스 문화행사", "2025년 12월 정기모임"],
    description: "추리연극 당일 두레문예관에서 발생한 살인사건",
    places: ["3F", "4F"],
    suspects: dureSuspects,
    victims: [dureVictim],
    color: "#ffcc00",
  },
  {
    title: "추러스 박물관 살인사건",
    creators: ["김지훈", "안민규"],
    gameType: "CLUE",
    backgroundImage: "/image/scenario/museum/museum-main.png",
    id: "museum",
    isInDevelopment: true,
    histories: ["2023년 9월 OT"],
    description: "추러스 박물관에서 발생한 기괴한 살인사건",
    places: ["A", "B"],
    suspects: museumSuspects,
    victims: [museumVictim],
    color: "#d97706",
  },
  {
    id: "serial",
    title: "28동-301동 연쇄 살인사건",
    creators: ["안민규"],
    gameType: "CLUE",
    backgroundImage: "/image/scenario/serial/serial-main.png",
    isInDevelopment: false,
    description: "서울대학교 28동과 301동에서 동시에 사람이 추락사했다.",
    places: ["28", "301"],
    suspects: serialSuspects,
    victims: serialVictims,
    color: "#9333ea",
    histories: ["2026년 5월 정기모임"],
  },
  {
    id: "mountain",
    title: "청룡산 살인사건",
    creators: ["조경아", "김태연", "안민규"],
    gameType: "CLUE",
    backgroundImage: "/image/scenario/mountain/mountain-main.png",
    isInDevelopment: false,
    description: "청룡산 등산로에서 발생한 의문의 추락사건",
    places: ["intersection", "cafe", "entrance"],
    histories: ["2026년 6월 정기모임"],
    suspects: mountainSuspects,
    victims: [mountainVictim],
    color: "#34c759",
  },
  {
    title: "추리소설가 살인사건",
    creators: ["김지훈", "안민규"],
    gameType: "CLUE",
    histories: [],
    backgroundImage: "/image/scenario/novelist/novelist-main.png",
    id: "novelist",
    isInDevelopment: true,
    places: ["room", "lounge"],
    description: "추리소설계의 거장과 함께한 신년회에서 발생한 의문의 살인사건",
    suspects: novelistSuspects,
    victims: [novelistVictim],
    color: "#ac7f5e",
  },

  {
    id: "subway",
    title: "서울대입구역 살인사건",
    creators: ["안민규"],
    gameType: "CLUE",
    histories: [],
    backgroundImage: "/image/scenario/subway/subway-main.png",
    isInDevelopment: true,
    description: "2020년 4월, 서울대입구역에서 일어난 사망 사건",
    places: ["1F", "B1", "B2"],
    suspects: subwaySuspects,
    victims: [subwayVictim],
    color: "#00A84D",
  },
  {
    id: "clubroom",
    title: "동아리방 살인사건",
    creators: ["허정", "강재호", "오수진", "안민규"],
    gameType: "CLUE",
    histories: [],
    backgroundImage: "/image/scenario/clubroom/clubroom-main.png",
    isInDevelopment: true,
    description: "동아리방에서 자고 있는 줄 알았던 회장이 살해된 사건",
    places: ["room", "recycling", "homes"],
    suspects: clubroomSuspects,
    victims: [clubroomVictim],
    color: "#f59e0b",
  },
  {
    id: "bluemoon",
    title: "푸른 달 살인사건",
    creators: ["김시영", "김태연", "조준호"],
    gameType: "TEXT",
    histories: ["2026년 겨울 대이동"],
    backgroundImage: "/image/scenario/bluemoon/bluemoon-main.png",
    isInDevelopment: false,
    description: "푸른 달이 뜨는 밤, 한 조선시대 마을에서 벌어진 살인사건",
    places: ["village"],
    suspects: bluemoonSuspects,
    victims: [bluemoonVictim],
    color: "#1e6df4",
  },
  {
    title: "케이팝 데몬 헌터스 살인사건",
    creators: ["김수인", "김태연", "정해찬", "조경아"],
    gameType: "CLUE",
    backgroundImage: "/image/scenario/kpop/kpop-main.png",
    id: "kpop",
    histories: ["2025년 여름 대이동"],
    isInDevelopment: true,
    description: "케이팝 아이돌 그룹 내에서 발생한 살인사건",
    places: ["lounge", "outdoor"],
    suspects: kpopSuspects,
    victims: [kpopVictim],
    color: "#e91e63",
  },
  {
    title: "호텔 살인사건",
    creators: ["안민규"],
    gameType: "TEXT",
    backgroundImage: "/image/scenario/hotel/hotel-main.png",
    id: "hotel",
    histories: [],
    isInDevelopment: true,
    description: "한 겨울, 눈 내린 호텔에서 발생한 실종 사건",
    places: [],
    suspects: hotelSuspects,
    victims: [hotelVictim],
    color: "#8e8e93",
  },
  {
    title: "귀신의 집 살인사건",
    creators: ["정해찬", "손주영", "안민규"],
    gameType: "CLUE",
    backgroundImage: "/image/scenario/ghost/ghost-main.png",
    id: "ghost",
    histories: [],
    isInDevelopment: false,
    description: "귀신의 집에서 발생한 살인사건",
    places: ["haunted-house", "staff", "theme-park"],
    suspects: ghostSuspect,
    victims: [ghostVictim],
    color: "#6b7280",
  },
  {
    id: "box",
    title: "뒤주 살인사건",
    creators: ["강재호", "고민우", "김태연", "김혜린", "오수진", "안민규"],
    gameType: "CLUE",
    histories: [],
    backgroundImage: "/image/scenario/box/box-main.png",
    isInDevelopment: false,
    description: "1762년 7월 13일, 뒤주 안에서 시체가 발견되었다.",
    places: ["palace", "market", "abandoned-palace"],
    suspects: boxSuspects,
    victims: [boxVictim],
    color: "#a16a02",
  },
  {
    id: "parade",
    title: "퍼레이드 살인사건",
    creators: ["안민규"],
    gameType: "CLUE",
    histories: [],
    backgroundImage: "/image/scenario/parade/parade-main.png",
    isInDevelopment: true,
    description: "또 다른 추추어드벤처에서 펼쳐지는 신비하고 기묘한 살인사건",
    places: [],
    suspects: paradeSuspects,
    victims: paradeVictims,
    color: "#BF5AF2",
  },
] satisfies ScenarioSummary[];

export type ScenarioId = (typeof scenarioCatalog)[number]["id"];

const getScenarioSummary = (id: ScenarioId): ScenarioSummary => {
  const scenario = scenarioCatalog.find((candidate) => candidate.id === id);

  if (!scenario) {
    throw new Error(`Scenario not found: ${id}`);
  }

  return scenario;
};

export const createClueScenario = (
  id: ScenarioId,
  content: Pick<
    ClueScenarioType,
    "clues" | "prologue" | "movePlaceButtons" | "additionalQuestions"
  >
): ClueScenarioType => {
  const scenario = getScenarioSummary(id);

  if (scenario.gameType !== "CLUE") {
    throw new Error(`Scenario is not a clue game: ${id}`);
  }

  return { ...scenario, gameType: "CLUE", ...content };
};

export const createTextScenario = (
  id: ScenarioId,
  clues: ClueData[],
  prologue: string[]
): TextScenarioType => {
  const scenario = getScenarioSummary(id);

  if (scenario.gameType !== "TEXT") {
    throw new Error(`Scenario is not a text game: ${id}`);
  }

  return { ...scenario, gameType: "TEXT", clues, prologue };
};
