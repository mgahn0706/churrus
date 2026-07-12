import { Box, Button, IconButton, Typography } from "@mui/material";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import {
  BAR_CONVERSATION,
  CAFE_CONVERSATION,
} from "@/features/rhythm-heaven-puzzlehunt/fixtures/conversation";

const CLICK_SOUND_SOURCE = "/audio/click.wav";
const TYPING_INTERVAL = 32;

const SCENES = {
  cafe: {
    backgroundImage: "/image/rhythm-heaven-puzzlehunt/cafe-background.png",
    bgmSource: "/audio/cafe.mp3",
    conversation: CAFE_CONVERSATION,
  },
  bar: {
    backgroundImage: "/image/rhythm-heaven-puzzlehunt/bar-background.png",
    bgmSource: "/audio/bar.mp3",
    conversation: BAR_CONVERSATION,
  },
} as const;

type SceneName = keyof typeof SCENES;

export default function RhythmHeavenPuzzleHuntPage() {
  const [sceneName, setSceneName] = useState<SceneName>("cafe");
  const [conversationIndex, setConversationIndex] = useState(0);
  const [isDownloadVisible, setIsDownloadVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isBgmMuted, setIsBgmMuted] = useState(false);
  const bgmAudioRef = useRef<HTMLAudioElement>(null);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  const isBgmMutedRef = useRef(false);
  const currentScene = SCENES[sceneName];
  const currentConversation = currentScene.conversation[conversationIndex];
  const isLastConversation =
    conversationIndex === currentScene.conversation.length - 1;

  useEffect(() => {
    const characters = Array.from(currentConversation.text);
    let characterIndex = 0;

    setDisplayedText("");
    setIsTyping(true);

    const typingTimer = window.setInterval(() => {
      characterIndex += 1;
      setDisplayedText(characters.slice(0, characterIndex).join(""));

      if (characterIndex === characters.length) {
        window.clearInterval(typingTimer);
        setIsTyping(false);
      }
    }, TYPING_INTERVAL);

    return () => window.clearInterval(typingTimer);
  }, [currentConversation.text]);

  useEffect(() => {
    const clickAudio = new Audio(CLICK_SOUND_SOURCE);
    clickAudio.volume = 0.6;
    clickAudioRef.current = clickAudio;
    const bgmAudio = bgmAudioRef.current;

    return () => {
      clickAudio.pause();
      clickAudioRef.current = null;
      if (bgmAudio) {
        bgmAudio.pause();
        bgmAudio.currentTime = 0;
      }
    };
  }, []);

  useEffect(() => {
    const bgmAudio = bgmAudioRef.current;
    if (!bgmAudio) return;

    bgmAudio.volume = 0.4;
    bgmAudio.muted = isBgmMutedRef.current;
    bgmAudio.load();
    void bgmAudio.play().catch(() => undefined);
  }, [currentScene.bgmSource]);

  const handleNext = () => {
    const clickAudio = clickAudioRef.current;
    if (clickAudio) {
      clickAudio.currentTime = 0;
      void clickAudio.play().catch(() => undefined);
    }

    void bgmAudioRef.current?.play().catch(() => undefined);
    if (isTyping) {
      setDisplayedText(currentConversation.text);
      setIsTyping(false);
      return;
    }

    if (isLastConversation) {
      if (sceneName === "bar") {
        setIsDownloadVisible(true);
        return;
      }

      setSceneName((currentSceneName) =>
        currentSceneName === "cafe" ? "bar" : "cafe"
      );
      setConversationIndex(0);
      return;
    }

    setConversationIndex((currentIndex) => currentIndex + 1);
  };

  const handleBgmToggle = () => {
    const bgmAudio = bgmAudioRef.current;
    if (!bgmAudio) return;

    const nextIsBgmMuted = !isBgmMuted;
    bgmAudio.muted = nextIsBgmMuted;
    isBgmMutedRef.current = nextIsBgmMuted;
    setIsBgmMuted(nextIsBgmMuted);
  };

  return (
    <>
      <Head>
        <title>리듬 천국 퍼즐 헌트 | 추러스</title>
      </Head>
      <style jsx global>{`
        @font-face {
          font-family: "Galmuri11";
          src: url("/fonts/Galmuri11.ttf") format("truetype");
          font-display: swap;
        }
      `}</style>
      <Box
        sx={{
          position: "relative",
          minHeight: "100dvh",
          boxSizing: "border-box",
          overflow: "hidden",
          display: "flex",
          alignItems: isDownloadVisible ? "center" : "flex-end",
          justifyContent: "center",
          fontFamily: '"Galmuri11", monospace',
          px: { xs: 2, md: 5 },
          py: { xs: 3, md: 5 },
          "&::before": {
            content: '\"\"',
            position: "absolute",
            inset: 0,
            zIndex: 0,
            background:
              "linear-gradient(180deg, rgba(9, 13, 14, 0.04) 35%, rgba(9, 13, 14, 0.58) 100%)",
          },
        }}
      >
        <Box
          key={sceneName}
          aria-hidden="true"
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${currentScene.backgroundImage})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            imageRendering: "pixelated",
            animation: "sceneChange 900ms ease-out",
            "@keyframes sceneChange": {
              from: { opacity: 0, transform: "scale(1.03)" },
              to: { opacity: 1, transform: "scale(1)" },
            },
          }}
        />
        <audio ref={bgmAudioRef} src={currentScene.bgmSource} autoPlay loop />
        <IconButton
          aria-label={isBgmMuted ? "배경 음악 켜기" : "배경 음악 끄기"}
          onClick={handleBgmToggle}
          sx={{
            position: "absolute",
            top: { xs: 16, md: 28 },
            right: { xs: 16, md: 28 },
            zIndex: 1,
            color: "#fff8e7",
            border: "2px solid rgba(255, 248, 231, 0.75)",
            borderRadius: 1,
            fontFamily: '"Galmuri11", monospace',
            fontSize: 14,
            "&:hover": { backgroundColor: "rgba(255, 248, 231, 0.16)" },
          }}
        >
          {isBgmMuted ? "BGM OFF" : "BGM ON"}
        </IconButton>
        {isDownloadVisible ? (
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              width: "min(100%, 760px)",
              animation: "downloadButtonEnter 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              "@keyframes downloadButtonEnter": {
                from: { opacity: 0, transform: "scale(0.75) translateY(20px)" },
                to: { opacity: 1, transform: "scale(1) translateY(0)" },
              },
            }}
          >
            <Button
              aria-label="리듬천국 퍼즐헌트 2 다운로드"
              sx={{
                position: "relative",
                display: "block",
                width: "100%",
              overflow: "hidden",
              p: 0,
              border: "4px solid #ffdfdf",
              borderRadius: 3,
              boxShadow: "0 18px 48px rgba(0, 0, 0, 0.55)",
              animation: "downloadButtonBeat 450ms ease-in-out 500ms infinite",
              "@keyframes downloadButtonBeat": {
                "0%, 100%": {
                  transform: "scale(1)",
                  boxShadow: "0 18px 48px rgba(0, 0, 0, 0.55)",
                },
                "14%": {
                  transform: "scale(1.03) translateY(-2px)",
                  boxShadow: "0 22px 54px rgba(255, 51, 51, 0.42)",
                },
                "28%": { transform: "scale(0.992) translateY(1px)" },
                "44%": {
                  transform: "scale(1.018) translateY(-1px)",
                  boxShadow: "0 21px 52px rgba(255, 51, 51, 0.3)",
                },
                "60%": { transform: "scale(1) translateY(0)" },
              },
              "&:hover": {
                animationPlayState: "paused",
                transform: "translateY(-4px) scale(1.03)",
                boxShadow: "0 24px 56px rgba(0, 0, 0, 0.65)",
              },
              }}
            >
              <Box
                component="img"
                src="/image/rhythm-heaven-puzzlehunt/puzzlehunt-2.png"
                alt="리듬천국 퍼즐헌트 2"
                sx={{ display: "block", width: "100%", height: "auto" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                  left: 0,
                  py: { xs: 1.5, md: 2 },
                  background:
                    "linear-gradient(90deg, rgba(41, 0, 0, 0.96), rgba(176, 0, 0, 0.94))",
                  color: "#fff",
                  fontFamily: '"Galmuri11", monospace',
                  fontSize: { xs: 16, md: 24 },
                  fontWeight: 800,
                  letterSpacing: { xs: "0.02em", md: "0.06em" },
                }}
              >
                리듬천국 퍼즐헌트 2 다운로드
              </Box>
            </Button>
          </Box>
        ) : (
          <Box
            key={`${sceneName}-${conversationIndex}`}
            sx={{
              position: "relative",
              zIndex: 1,
              width: "min(100%, 940px)",
              height: { xs: 260, md: 210 },
              display: "flex",
              flexDirection: "column",
              border: "4px solid #f5ddaf",
              borderRadius: 1,
              boxShadow: "0 0 0 4px #473627, 0 16px 32px rgba(0, 0, 0, 0.45)",
              backgroundColor: "rgba(28, 29, 29, 0.94)",
              color: "#fff8e7",
              px: { xs: 2.5, md: 4 },
              py: { xs: 2.5, md: 3 },
              animation: "conversationEnter 260ms ease-out",
              "@keyframes conversationEnter": {
                from: { opacity: 0, transform: "translateY(12px)" },
                to: { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            <Typography
              component="p"
              sx={{
                color: "#f4b758",
                fontFamily: '"Galmuri11", monospace',
                fontWeight: 700,
                fontSize: { xs: 15, md: 18 },
                letterSpacing: "0.06em",
                mb: 1.25,
              }}
            >
              {currentConversation.speaker}
            </Typography>
            <Typography
              component="p"
              sx={{
                minHeight: { xs: 76, md: 58 },
                pr: { xs: 0, md: 16 },
                fontFamily: '"Galmuri11", monospace',
                fontSize: { xs: 16, md: 20 },
                fontWeight: 700,
                lineHeight: 1.7,
                wordBreak: "keep-all",
                flexGrow: 1,
              }}
            >
              {displayedText}
            </Typography>
            <Box display="flex" justifyContent="flex-end" mt={1}>
              <Button
                onClick={handleNext}
                variant="contained"
                sx={{
                  minWidth: 116,
                  border: "2px solid #fff1c9",
                  borderRadius: 0,
                  backgroundColor: "#bf7131",
                  color: "#fff8e7",
                  fontFamily: '"Galmuri11", monospace',
                  fontWeight: 700,
                  "&:hover": { backgroundColor: "#dc8f45" },
                }}
              >
                {isLastConversation ? "바로 가기" : "다음"}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}
