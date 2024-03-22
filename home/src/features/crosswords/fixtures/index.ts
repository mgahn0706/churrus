import { CrosswordType } from "../types";

export const monthFormatter: Record<number, string> = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

export const CROSSWORDS: CrosswordType[] = [
  {
    id: "1",
    title: "Trapped!",
    author: "Mingyu An",
    date: {
      year: 2024,
      month: 2,
    },
    crosswordSrc:
      "https://amuselabs.com/pmm/crossword?id=b2c6f071&set=9d98b33f6ba8991256d7072c699f4da37cb5bea6aa82d61339343fb2110b7854&embed=1",
  },
  {
    id: "2",
    title: "You can't win in the same way",
    author: "Mingyu An",
    date: {
      year: 2024,
      month: 3,
    },
    crosswordSrc:
      "https://amuselabs.com/pmm/crossword?id=ee7f889e&set=9d98b33f6ba8991256d7072c699f4da37cb5bea6aa82d61339343fb2110b7854&embed=1",
  },
  {
    id: "3",
    title: "Independent School",
    author: "Mingyu An",
    date: {
      year: 2024,
      month: 4,
    },
    crosswordSrc:
      "https://amuselabs.com/pmm/crossword?id=cf0ce60f&set=9d98b33f6ba8991256d7072c699f4da37cb5bea6aa82d61339343fb2110b7854&embed=1",
  },
];
