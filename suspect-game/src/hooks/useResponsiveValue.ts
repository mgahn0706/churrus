import { useWindowSize } from "./useWindowSize";

export function useResponsiveValue(
  values: [number, number, number] | [boolean, boolean, boolean]
) {
  const [width, height] = useWindowSize();
  if (width > 768) {
    return values[2];
  }
  if (width > 576) {
    return values[1];
  }
  return values[0];
}
