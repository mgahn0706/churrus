export const scenarios: ScenarioType[] = [
  {
    title: "스타트업 살인사건",
    difficulty: 2,
    numberOfSuspects: 3,
    playTime: 90,
    backgroundImage: "/image/scenario/startup-main.png",
    cardImage: "/Suspect_Logo.png",
    keyword: "startup",
    isInDevelopment: false,
    bgmURL: "https://www.youtube.com/watch?v=qMwzWk81tVM",
  },
  {
    title: "자하연 살인사건",
    difficulty: 3,
    numberOfSuspects: 4,
    playTime: 120,
    backgroundImage: "/image/scenario/jahayeon-main.png",
    cardImage: "/Suspect_Logo.png",
    keyword: "jahayeon",
    isInDevelopment: true,
  },
  {
    title: "추러스 MT 살인사건",
    difficulty: 1,
    numberOfSuspects: 3,
    playTime: 120,
    backgroundImage: "/image/scenario/mt-main.png",
    cardImage: "/Suspect_Logo.png",
    keyword: "mt",
    isInDevelopment: true,
  },
  {
    title: "와부고 살인사건",
    difficulty: 4,
    numberOfSuspects: 4,
    playTime: 150,
    backgroundImage: "/image/scenario/highschool-main.png",
    cardImage: "/Suspect_Logo.png",
    keyword: "highschool",
    isInDevelopment: true,
  },
];

export interface ScenarioType {
  title: string;
  difficulty: number;
  numberOfSuspects: number;
  playTime: number;
  backgroundImage: string;
  cardImage: string;
  keyword: string;
  isInDevelopment: boolean;
  bgmURL?: string;
}
