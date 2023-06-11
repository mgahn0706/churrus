import { Box } from "@mui/material";
import {
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

export function FadeInSection(props: { children: ReactNode }) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef() as MutableRefObject<HTMLDivElement>;
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });
    observer.observe(domRef.current);
    return;
  }, []);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{
        color: "white",
        padding: "16px",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : "translate(0, 50%)",
        visibility: isVisible ? "visible" : "hidden",
        transition: "opacity 2000ms ease-out, transform 1000ms ease-out",
        willChange: "opacity, visibility",
        display: "flex",
      }}
      ref={domRef}
    >
      {props.children}
    </Box>
  );
}
