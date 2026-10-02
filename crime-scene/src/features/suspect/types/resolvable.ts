import { DetectiveNoteType } from "./index";

export type SubmittedAnswerResolver<T> = (
  submittedAnswer: DetectiveNoteType
) => T;

export type ResolvableWithSubmittedAnswer<T> = T | SubmittedAnswerResolver<T>;

export function isSubmittedAnswerResolver<T>(
  value: ResolvableWithSubmittedAnswer<T>
): value is SubmittedAnswerResolver<T> {
  return typeof value === "function";
}

export function resolveWithSubmittedAnswer<T>(
  value: ResolvableWithSubmittedAnswer<T>,
  submittedAnswer: DetectiveNoteType
): T {
  return isSubmittedAnswerResolver(value) ? value(submittedAnswer) : value;
}
