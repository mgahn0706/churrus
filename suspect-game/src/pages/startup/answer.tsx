import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import {
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

function FadeInSection(props: { children: ReactNode }, marginBottom?: string) {
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
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{
        marginBottom: marginBottom,
        padding: "16px",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : "translate(0, 50%)",
        visibility: isVisible ? "visible" : "hidden",
        transition: "opacity 1000ms ease-out, transform 300ms ease-out",
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
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  if (
    typeof window === "undefined" ||
    localStorage.getItem("startup") == null
  ) {
    return (
      <Dialog open>
        <DialogTitle>
          <Typography variant="h6" component="h2">
            이용 안내
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            아직 스타트업 살인사건의 진범이 지목되지 않았습니다. <br />
            게임을 진행해서 진범을 찾아주세요.
          </Typography>
        </DialogContent>
        <DialogActions>
          {isLoading ? (
            <CircularProgress color="inherit" />
          ) : (
            <Button
              disabled={isLoading}
              onClick={() => {
                setIsLoading(true);
                router.push("/startup");
              }}
            >
              확인
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  }
  return (
    <Box sx={{ backgroundColor: "black" }}>
      {new Array(10).fill(0).map((_, i) => (
        <FadeInSection>
          <Typography variant="h1" color="white">
            {localStorage.getItem("startup")}은...
          </Typography>
        </FadeInSection>
      ))}
    </Box>
  );
}
