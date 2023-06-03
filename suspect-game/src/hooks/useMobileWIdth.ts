import { useEffect, useState } from "react";

export const useMobileWidth = () => {
  const [isMobileWidth, setIsWindowMobileWidth] = useState<boolean>(false);

  useEffect(() => {
    setIsWindowMobileWidth(window.outerWidth < 768);
  }, []);
  return { isMobileWidth };
};
