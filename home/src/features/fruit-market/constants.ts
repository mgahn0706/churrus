import { Fruit } from "./types";

export const FRUITS: Fruit[] = [
  "사과",
  "딸기",
  "수박",
  "멜론",
  "감귤",
  "레몬",
  "포도",
  "블루베리",
];

export const FRUIT_META: Record<
  Fruit,
  { emoji: string; color: string; soft: string }
> = {
  사과: { emoji: "🍎", color: "#D94C45", soft: "#FCEAE8" },
  딸기: { emoji: "🍓", color: "#E44768", soft: "#FDE8EE" },
  수박: { emoji: "🍉", color: "#378B59", soft: "#E4F4EA" },
  멜론: { emoji: "🍈", color: "#C79D16", soft: "#FFF7D8" },
  감귤: { emoji: "🍊", color: "#E77D21", soft: "#FFF0DE" },
  레몬: { emoji: "🍋", color: "#B89A00", soft: "#FFF9D8" },
  포도: { emoji: "🍇", color: "#7450A8", soft: "#F1EAF9" },
  블루베리: { emoji: "🫐", color: "#4056A1", soft: "#E9EDFA" },
};

export const PRICE_OPTIONS = [1000, 2000, 3000, 4000, 5000];

export const formatFruitMarketMoney = (value: number) =>
  `${value.toLocaleString("ko-KR")}원`;

export const uniqueFruits = (fruits: Fruit[]) => Array.from(new Set(fruits));
