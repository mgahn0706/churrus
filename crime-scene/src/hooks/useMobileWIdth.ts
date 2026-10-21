import { useMediaQuery } from "@mui/material";

export const useMobileWidth = () => {
  const isMobileWidth = useMediaQuery("(max-width:767px)", { noSsr: true });
  return { isMobileWidth };
};
