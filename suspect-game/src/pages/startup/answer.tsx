import { Box, Typography } from "@mui/material";
import {
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

function FadeInSection(props: { children: ReactNode }) {
  const [isVisible, setVisible] = useState(true);
  const domRef = useRef() as MutableRefObject<HTMLDivElement>;
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });
    observer.observe(domRef.current);
    return () => observer.unobserve(domRef.current);
  }, []);
  return (
    <Box
      height="700px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{
        padding: "16px",
        margin: "16px",
        boxShadow: "0 0 8px rgba(0, 0, 0, .125)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : "translate(0, 50%)",
        visibility: isVisible ? "visible" : "hidden",
        transition: "opacity 300ms ease-out, transform 300ms ease-out",
        willChange: "opacity, visibility",
        display: "flex",
      }}
      ref={domRef}
    >
      {props.children}
    </Box>
  );
}

export default function StartUpAnswer() {
  return (
    <Box sx={{ backgroundColor: "black" }}>
      <FadeInSection>
        <Typography color="white">진범이 맞습니다!</Typography>
      </FadeInSection>
      <FadeInSection>
        <Typography color="white">진범이 맞습니다!</Typography>
      </FadeInSection>
      <FadeInSection>
        <Typography color="white">진범이 맞습니다!</Typography>
      </FadeInSection>
      <FadeInSection>
        <Typography color="white">진범이 맞습니다!</Typography>
      </FadeInSection>
      <FadeInSection>
        <Typography color="white">진범이 맞습니다!</Typography>
      </FadeInSection>
      <FadeInSection>
        <Typography color="white">진범이 맞습니다!</Typography>
      </FadeInSection>
      <FadeInSection>
        <Typography color="white">진범이 맞습니다!</Typography>
      </FadeInSection>
      <FadeInSection>
        <Typography color="white">진범이 맞습니다!</Typography>
      </FadeInSection>
      <FadeInSection>
        <Typography color="white">진범이 맞습니다!</Typography>
      </FadeInSection>

      <FadeInSection>
        <Typography color="white">진범이 맞습니다!</Typography>
      </FadeInSection>
      <FadeInSection>
        <Typography color="white">진범이 맞습니다!</Typography>
      </FadeInSection>
    </Box>
  );
}
