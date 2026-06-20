import type { Dayjs } from "dayjs";

export const WEEKS_PER_YEAR = 52;

export function getCalendarYearWeek(date: Dayjs): number {
  const dayIndex = date.startOf("day").diff(date.startOf("year"), "day");

  return Math.min(Math.floor(dayIndex / 7) + 1, WEEKS_PER_YEAR);
}
