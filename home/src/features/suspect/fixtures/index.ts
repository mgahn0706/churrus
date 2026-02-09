import { ScenarioType } from "@/features/suspect/types";
import { startUpSuspects, startUpVictim } from "./startup/suspects";
import { schoolSuspects, schoolVictim } from "./school/suspects";
import { jahayeonSuspects, jahayeonVictim } from "./jahayeon/suspects";
import { dureSuspects, dureVictim } from "./dure/suspects";
import { durePrologue } from "./dure/prologue";
import { schoolPrologue } from "./school/prologue";
import { startUpClues } from "./startup/clues";
import { jahayeonClues } from "./jahayeon/clues";
import { schoolClues } from "./school/clues";
import { dureClues } from "./dure/clues";
import { museumSuspects, museumVictim } from "./museum/suspects";
import { museumClues } from "./museum/clues";
import { serialSuspects, serialVictims } from "./serial/suspects";
import { serialClues } from "./serial/clues";

export const scenarios: ScenarioType[] = [
  {
    title: "스타트업 살인사건",
    numberOfSuspects: 3,
    backgroundImage: "/image/suspect/scenario/startup/startup-main.png",
    id: "startup",
    isInDevelopment: false,
    history: "2023년 7월 정기모임",
    places: ["lounge", "office"],
    description: "IT 스타트업 '추러스'에서 발생한 살인사건",
    gameType: "CLUE",
    suspects: startUpSuspects,
    victims: [startUpVictim],
    clues: startUpClues,
  },
  {
    title: "와부고 살인사건",
    gameType: "TEXT",
    numberOfSuspects: 3,
    history: "2023년 10월 정기모임",
    backgroundImage: "/image/suspect/scenario/school/school-main.png",
    id: "school",
    isInDevelopment: false,
    places: ["2F", "3F"],
    description: "와부고등학교 교실에서 한 학생이 사망한 사건",
    suspects: schoolSuspects,
    victims: [schoolVictim],
    prologue: schoolPrologue,
    clues: schoolClues,
  },
  {
    title: "자하연 살인사건",
    gameType: "CLUE",
    numberOfSuspects: 4,
    backgroundImage: "/image/suspect/scenario/jahayeon/jahayeon-main.png",
    id: "jahayeon",
    isInDevelopment: false,
    history: "2023년 1월 2차 정기모임",
    description: "한겨울 자하연에서 시체가 발견되었다",
    places: ["pond", "dorm", "house"],
    suspects: jahayeonSuspects,
    victims: [jahayeonVictim],
    clues: jahayeonClues,
  },
  {
    title: "두레문예관 살인사건",
    gameType: "TEXT",
    numberOfSuspects: 4,
    backgroundImage: "/image/suspect/scenario/dure/dure-main.png",
    id: "dure",
    isInDevelopment: false,
    history: "2023년 5월 추러스 문화행사",
    description: "추리연극 당일 두레문예관에서 발생한 살인사건",
    places: ["3F", "4F"],
    suspects: dureSuspects,
    victims: [dureVictim],
    prologue: durePrologue,
    clues: dureClues,
  },
  {
    title: "추러스 박물관 살인사건",
    gameType: "CLUE",
    numberOfSuspects: 3,
    backgroundImage: "/image/suspect/scenario/museum/museum-main.png",
    id: "museum",
    isInDevelopment: true,
    description: "추러스 박물관에서 발생한 기괴한 살인사건",
    places: ["A", "B"],
    suspects: museumSuspects,
    victims: [museumVictim],
    clues: museumClues,
  },
  {
    id: "serial",
    title: "28동-301동 연쇄 살인사건",
    gameType: "CLUE",
    numberOfSuspects: 3,
    backgroundImage: "/image/suspect/scenario/serial/serial-main.png",
    isInDevelopment: true,
    description: "서울대학교 28동과 301동에서 동시에 사람이 추락사했다.",
    places: ["28", "301"],
    suspects: serialSuspects,
    victims: serialVictims,
    clues: serialClues,
  },
  {
    title: "케이팝 데몬 헌터스 살인사건",
    gameType: "CLUE",
    numberOfSuspects: 5,
    backgroundImage: "/image/suspect/scenario/kpop/kpop-main.png",
    id: "kpop",
    isInDevelopment: true,
    description: "케이팝 아이돌 그룹 내에서 발생한 살인사건",
    places: [],
    suspects: [],
    victims: [],
    clues: [],
  },
  {
    id: "bluemoon",
    title: "푸른 달 살인사건",
    gameType: "CLUE",
    numberOfSuspects: 6,
    backgroundImage: "/image/suspect/scenario/bluemoon/bluemoon-main.png",
    isInDevelopment: true,
    description: "푸른 달이 뜨는 밤, 한 조선시대 마을에서 벌어진 살인사건",
    places: [],
    suspects: [],
    victims: [],
    clues: [],
  },

  {
    id: "mountain",
    title: "청룡산 살인사건",
    gameType: "CLUE",
    numberOfSuspects: 4,
    backgroundImage: "/image/suspect/scenario/mountain/mountain-main.png",
    isInDevelopment: true,
    description: "청룡산 등산로에서 발생한 의문의 추락사건",
    places: [],
    suspects: [],
    victims: [],
    clues: [],
  },
];
