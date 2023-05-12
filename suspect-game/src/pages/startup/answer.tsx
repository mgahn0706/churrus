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

function FadeInSection(props: { children: ReactNode }) {
  const [isVisible, setVisible] = useState(false);
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

export default function StartUpAnswer() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuspectAccused, setIsSuspectAccused] = useState(false);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      localStorage.getItem("startup") == null
    ) {
      setIsSuspectAccused(false);
      return;
    }
    setIsSuspectAccused(true);
  }, []);

  if (!isSuspectAccused) {
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

  const accusedSuspect = localStorage.getItem("startup");

  return (
    <Box sx={{ backgroundColor: "black" }}>
      <FadeInSection>
        <Typography variant="h1" color="white" mt={50} mb={70}>
          {accusedSuspect}
          {accusedSuspect === "강지혜" ? "는" : "은"}
        </Typography>
      </FadeInSection>
      <FadeInSection>
        <Typography variant="h1" color="white" mt={70} mb={100}>
          한채원을 살해한 범인이
        </Typography>
      </FadeInSection>
      <FadeInSection>
        <Typography
          variant="h1"
          color="white"
          mt={10}
          mb={50}
          fontWeight="bold"
        >
          {accusedSuspect === "김성균" ? "맞습니다!" : "아닙니다!"}
        </Typography>
      </FadeInSection>
      <FadeInSection>
        <Box display="flex" justifyContent="center">
          <Typography variant="h2" color="white">
            진범: 김성균
          </Typography>
        </Box>
      </FadeInSection>

      <FadeInSection>
        <Typography
          variant="body1"
          color="white"
          sx={{ wordSpacing: 2, lineHeight: 2 }}
        >
          확실히 제가 죽였습니다. 하지만 충분히 이유가 있었어요. <br />
          추러스는 2017년 설립된 이후로 승승장구해나가고 있었고, 조만간 정부에서
          투자도 받을 예정이었어요. 올해 3월, 그 폭로가 나기 전에는 말이에요.
          <br />
          2023년 3월에 경쟁사 와플러브에서 저희 앱에 사용된 인공지능이 잘못
          설계된 것임을 폭로했어요. 저희 회사 이미지는 추락할대로 추락했죠.
          채원이는 어떻게해서든 저희 회사를 살리고 싶었나봐요. 채원이는 저에게
          사용자 데이터를 불법으로 이용해 성능을 올리자고 했죠. 저는 말이 안되는
          불법행위라고 생걱했지만, 그냥 승인했습니다. 저는 채원이를 좋아하고
          있었거든요. 채원이가 곤란해하는 걸 보기가 힘들었어요.
          <br />
          하지만, 이 사건도 왠지 모르게 와플러브에게 넘어갔고, 저희 회사는 몰락
          위기에 쳐했습니다.
        </Typography>
      </FadeInSection>
    </Box>
  );
}
