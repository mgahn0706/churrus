import GlobalHeader from "@/components/Navigation/GlobalHeader";
import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const DETECTIVE_NOVEL_TEXT =
  "요즘 현직에서 물러난 워그레이브 판사는 일등 흡연차 구석에 앉아 담배를 피우며 타임즈의 정치 기사를 열심히 읽고 있었다. 이윽고 그는 신문을 내려놓고 창 밖을 바라보았다. 기차는 서머셋을 달리고 있었다. 그는 시계를 보았다――앞으로 두 시간이다. 판사는 인디언 섬에 대해 신문에 난 모든 기사를 마음속으로 되새겼다. 요트를 좋아하는 미국인 부호가 섬을 사들여  이곳 데븐셔 바닷가 가까운 섬에 사치스러운 근대적인 저택을 세웠다는 게 첫번째 기사였다. 그런데 미국인 부호의 세번째 아내가 뱃멀미를  심하게 해서 섬과 저택을 팔려고 내놓았다. 사람의 눈길을 끄는 광고가  몇차례 났다. 그리고 오윈이라는 사람이 사들였다는 짤막한  기사가 실렸다. 그로부터 여러 가지  소문이 일기 시작했다.  인디언 섬을 산 사람은 헐리우드 영화배우 게이브리얼 털 양이다! 그녀는 1년 가운데  몇 달 동안 사람들의 눈을 피해  이 섬에서 살려고 한다!  <소문난 참새>난  필자는 어떤 고귀한 사람의  별장으로 팔렸다고 했다.  <기상대>난은 신혼여행  때문이라고 썼다. 젊은 L경이  마침내 큐피트의 화살을 맞았기 때문이라고. 그리고 <조너스>는 확실한 정보라고 하며 해군 본부가 샀다고  전했다. 극비에 속하는 실험을 하기 위해서라고. 확실히 인디언 섬은 큰 뉴스거리였다. 워그레이브 판사는 주머니에서 한 통의 편지를 꺼냈다. 거의 글자를 알아보기 어려운 필적이었으나, 군데군데  뜻밖으로 여겨질 만큼 명확히 알 수 있는 글귀가 있었다. 그리운 로런스님……당신의 소식을 듣지 못한  때로부터 오랜 세월…… 꼭 인디언 섬에……참으로  아름다운 곳에서……이야기 하고 싶은 게 잔뜩……아쉬웠던 옛날  일을……자연과 벗하여……햇빛을  받으면서……패딩턴 역을  12시 40분 ……오크브리지에서 기다렸다가…… 그리고 보낸  이는 <당신의  콘스턴스 캘민턴>이라고 아름다운 필적으로  서명되어 있었다.  워그레이브 판사는 콘스턴스  캘민턴 부인과 마지막으로 만난  게 언제 였던가 회상했다.";

const ImageMarqueeRow = ({
  items,
  reverse = false,
  duration = "26s",
}: {
  items: string[];
  reverse?: boolean;
  duration?: string;
}) => (
  <Box
    sx={{
      overflow: "hidden",
      maskImage:
        "linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)",
      WebkitMaskImage:
        "linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)",
    }}
  >
    <Box
      sx={{
        display: "flex",
        gap: 2,
        width: "max-content",
        animation: `marquee-${
          reverse ? "rev" : "fwd"
        } ${duration} linear infinite`,
        "@keyframes marquee-fwd": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "@keyframes marquee-rev": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      }}
    >
      {[...items, ...items].map((item, index) => (
        <Box
          key={`${item}-${index}`}
          sx={{
            width: { xs: 200, md: 240 },
            aspectRatio: "16 / 9",
            borderRadius: "22px",
            overflow: "hidden",
            boxShadow: "0 18px 40px rgba(15, 23, 42, 0.16)",
            flexShrink: 0,
          }}
        >
          <Image
            src={item}
            alt="문제 이미지"
            width={480}
            height={270}
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              objectFit: "cover",
            }}
          />
        </Box>
      ))}
    </Box>
  </Box>
);

export default function ChurrusMain() {
  const responsiveFontSize = useResponsiveValue([2, 2, 3]);
  const heroSubtitleSize = useResponsiveValue([16, 18, 20]);
  const [mtProgress, setMtProgress] = useState(0);
  const mtProgressRef = useRef(0);
  const mtStops = [
    "용산구",
    "서울대입구역",
    "관악구",
    "동대문구",
    "광진구",
    "마포구",
    "성수동",
    "홍대입구역",
    "망원동",
    "이태원",
    "강남역",
    "잠실",
  ];
  const [mtStopIndex, setMtStopIndex] = useState(0);
  const crimeSceneBackdrops = [
    "/image/suspect/scenario/museum/museum-main.png",
    "/image/suspect/scenario/bluemoon/bluemoon-main.png",
    "/image/suspect/scenario/school/school-main.png",
    "/image/suspect/scenario/serial/serial-main.png",
  ];
  const crimeSceneProfiles = [
    {
      src: "/image/suspect/scenario/bluemoon/profile/sm_kim.png",
      name: "SM KIM",
      scenario: "BLUE MOON",
    },
    {
      src: "/image/suspect/scenario/bluemoon/profile/bn_yeon.png",
      name: "BN YEON",
      scenario: "BLUE MOON",
    },
    {
      src: "/image/suspect/scenario/dure/profile/baek_jh.png",
      name: "BAEK JH",
      scenario: "DURE",
    },
    {
      src: "/image/suspect/scenario/dure/profile/park_sj.png",
      name: "PARK SJ",
      scenario: "DURE",
    },
    {
      src: "/image/suspect/scenario/jahayeon/profile/kim_hy.png",
      name: "KIM HY",
      scenario: "JAHAYEON",
    },
    {
      src: "/image/suspect/scenario/jahayeon/profile/seo_yc.png",
      name: "SEO YC",
      scenario: "JAHAYEON",
    },
    {
      src: "/image/suspect/scenario/kpop/profile/eden.png",
      name: "EDEN",
      scenario: "K-POP",
    },
    {
      src: "/image/suspect/scenario/kpop/profile/seok_pd.png",
      name: "SEOK PD",
      scenario: "K-POP",
    },
    {
      src: "/image/suspect/scenario/mountain/profile/rs_cha.png",
      name: "RS CHA",
      scenario: "MOUNTAIN",
    },
    {
      src: "/image/suspect/scenario/mountain/profile/rs_choi.png",
      name: "RS CHOI",
      scenario: "MOUNTAIN",
    },
    {
      src: "/image/suspect/scenario/museum/profile/kim_kr.png",
      name: "KIM KR",
      scenario: "MUSEUM",
    },
    {
      src: "/image/suspect/scenario/museum/profile/shin_sj.png",
      name: "SHIN SJ",
      scenario: "MUSEUM",
    },
    {
      src: "/image/suspect/scenario/school/profile/park_hs.png",
      name: "PARK HS",
      scenario: "SCHOOL",
    },
    {
      src: "/image/suspect/scenario/school/profile/yu_jh.png",
      name: "YU JH",
      scenario: "SCHOOL",
    },
    {
      src: "/image/suspect/scenario/serial/profile/an_cg.png",
      name: "AN CG",
      scenario: "SERIAL",
    },
    {
      src: "/image/suspect/scenario/serial/profile/nam_nc.png",
      name: "NAM NC",
      scenario: "SERIAL",
    },
    {
      src: "/image/suspect/scenario/startup/profile/han_cw.png",
      name: "HAN CW",
      scenario: "STARTUP",
    },
    {
      src: "/image/suspect/scenario/startup/profile/kim_sg.png",
      name: "KIM SG",
      scenario: "STARTUP",
    },
  ];
  const [typedText, setTypedText] = useState("");
  const problemImagesRowA = [
    "/image/quiz/2025-7-5.png",
    "/image/quiz/2024-5-2.png",
    "/image/quiz/2023-8-7.png",
    "/image/quiz/2025-5-7.png",
    "/image/quiz/2022-8-2.png",
    "/image/quiz/2019-11-7.png",
    "/image/quiz/2025-3-1.png",
    "/image/quiz/2020-MT-4.png",
    "/image/quiz/2024-1-3.png",
    "/image/quiz/2024-2-6.png",
    "/image/quiz/2024-4-5.png",
    "/image/quiz/2024-6-7.png",
    "/image/quiz/2023-11-5.png",
    "/image/quiz/2023-3-6.png",
    "/image/quiz/2023-9-4.png",
  ];
  const problemImagesRowB = [
    "/image/quiz/2022-8-3.png",
    "/image/quiz/2024-11-1.png",
    "/image/quiz/2025-5-6.png",
    "/image/quiz/2023-8-6.png",
    "/image/quiz/2024-3-2.png",
    "/image/quiz/2024-5-6.png",
    "/image/quiz/2024-7-4.png",
    "/image/quiz/2024-10-3.png",
    "/image/quiz/2023-2-4.png",
    "/image/quiz/2023-4-7.png",
    "/image/quiz/2023-6-2.png",
    "/image/quiz/2025-7-1.png",
    "/image/quiz/2022-11-4.png",
  ];
  const problemImagesRowC = [
    "/image/quiz/2020-MT-5.png",
    "/image/quiz/2025-8-5.png",
    "/image/quiz/2023-1-1.png",
    "/image/quiz/2024-2-7.png",
    "/image/quiz/2019-11-1.png",
    "/image/quiz/2020-1-1.png",
    "/image/quiz/2020-MT-1.png",
    "/image/quiz/2024-12-8.png",
    "/image/quiz/2024-6-3.png",
    "/image/quiz/2024-9-1.png",
    "/image/quiz/2023-11-9.png",
    "/image/quiz/2023-8-3.png",
    "/image/quiz/2023-4-3.png",
    "/image/quiz/2022-9-5.png",
    "/image/quiz/2022-6-3.png",
  ];
  const marqueeItems = [
    "추리소설",
    "데블스플랜",
    "방탈출",
    "보드게임",
    "크라임씬",
    "퍼즐 제작",
    "MT 대이동",
    "홀덤",
    "바다거북스프",
    "더 지니어스",
  ];

  useEffect(() => {
    let animId = 0;
    const startTime = performance.now();
    const duration = 26000;
    const tick = () => {
      const now = performance.now();
      const phase = ((now - startTime) % duration) / duration;
      const pingPong = phase < 0.5 ? phase * 2 : 2 - phase * 2;
      const current = mtProgressRef.current;
      const next = current + (pingPong - current) * 0.2;
      mtProgressRef.current = next;
      setMtProgress(next);
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  useEffect(() => {
    const nextIndex = Math.min(
      mtStops.length - 1,
      Math.floor(mtProgress * mtStops.length)
    );
    setMtStopIndex(nextIndex);
  }, [mtProgress, mtStops.length]);

  useEffect(() => {
    let index = 0;
    let timeoutId: number;
    const typeNext = () => {
      index += 1;
      setTypedText(DETECTIVE_NOVEL_TEXT.slice(0, index));
      if (index >= DETECTIVE_NOVEL_TEXT.length) {
        timeoutId = window.setTimeout(() => {
          index = 0;
          setTypedText("");
          typeNext();
        }, 1400);
        return;
      }
      const char = DETECTIVE_NOVEL_TEXT[index] ?? "";
      const baseDelay = char === " " ? 45 : 70;
      const jitter = Math.floor(Math.random() * 45);
      const pause =
        char === "." || char === "!" || char === "?" || char === "…"
          ? 520
          : char === ","
          ? 260
          : 0;
      timeoutId = window.setTimeout(typeNext, baseDelay + pause + jitter);
    };
    timeoutId = window.setTimeout(typeNext, 400);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <Box
      sx={{
        background:
          "radial-gradient(1200px 700px at 10% -10%, #f8fafc 0%, #eef2f7 45%, #ffffff 100%)",
        position: "relative",
        overflow: "hidden",
        "::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(500px 300px at 85% 10%, rgba(217, 226, 255, 0.35), transparent 70%), radial-gradient(420px 240px at 5% 60%, rgba(255, 241, 230, 0.45), transparent 70%)",
          animation: "pulseGlow 14s ease-in-out infinite",
          pointerEvents: "none",
        },
        "@keyframes pulseGlow": {
          "0%, 100%": { opacity: 0.75 },
          "50%": { opacity: 1 },
        },
        "@keyframes pulseRing": {
          "0%": { transform: "scale(0.6)", opacity: 0.9 },
          "70%": { transform: "scale(1.6)", opacity: 0 },
          "100%": { transform: "scale(1.6)", opacity: 0 },
        },
        "@keyframes bgFade": {
          "0%, 10%": { opacity: 1 },
          "20%, 60%": { opacity: 1 },
          "80%, 100%": { opacity: 0 },
        },
      }}
    >
      <GlobalHeader />
      <Box
        position="relative"
        sx={{
          width: "100%",
          height: { xs: "70vh", md: "60vh" },
          minHeight: { xs: 420, md: 520 },
          maxHeight: { xs: 720, md: 780 },
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src="/image/churrus_main.png"
          fill
          alt="추러스_메인"
          priority
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center",
            filter: "brightness(0.6) saturate(1.05)",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            textAlign: "center",
            width: "100%",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: { xs: 3, md: 6 },
          }}
        >
          <Box sx={{ width: "min(900px, 100%)" }}>
            <Typography
              component="h1"
              sx={{
                fontSize: `${responsiveFontSize}em`,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                fontFamily:
                  "'SF Pro Display', 'SF Pro Text', 'Apple SD Gothic Neo', 'Pretendard', sans-serif",
                textShadow: "0 20px 50px rgba(0, 0, 0, 0.35)",
              }}
            >
              추러스에서는 추리를 즐겨요
            </Typography>
            <Typography
              sx={{
                mt: 1.5,
                fontSize: `${heroSubtitleSize}px`,
                fontWeight: 500,
                color: "rgba(255, 255, 255, 0.82)",
                fontFamily:
                  "'SF Pro Text', 'Apple SD Gothic Neo', 'Pretendard', sans-serif",
                lineHeight: 1.6,
              }}
            >
              추리소설, 방탈출, 보드게임, 정기모임, 크라임씬, 직접 만든
              문제까지.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        py={{ xs: "80px", md: "120px" }}
        flexDirection="column"
        sx={{
          background:
            "linear-gradient(180deg, rgba(248,250,252,0.9) 0%, rgba(238,242,247,0.9) 100%)",
        }}
      >
        <Typography
          variant="h3"
          component="div"
          fontWeight={700}
          fontFamily="NanumSquareEB"
        >
          추러스
        </Typography>

        <Typography
          mt={2}
          variant="h5"
          component="div"
          fontWeight={600}
          fontFamily="NanumSquareB"
          sx={{
            wordBreak: "keep-all",
          }}
          px="20px"
          lineHeight={1.5}
          textAlign="center"
        >
          추리소설, 추리문제, 방탈출 등등 추리를 사랑하는 서울대생들의
          모임입니다. <br />
          생각보다 퀄리티 높은 활동들이 많이 준비되어 있어요. 한 번 살펴볼까요?
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        py={{ xs: "90px", md: "150px" }}
        gap={{ xs: "120px", md: "250px" }}
        flexDirection="column"
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box
            maxWidth={{ xs: "92vw", md: "50vw" }}
            sx={{
              position: "relative",
              px: { xs: 2, md: 0 },
            }}
          >
            <Typography
              variant="h6"
              component="div"
              fontWeight={700}
              fontFamily="NanumSquareEB"
            >
              문제적 추러스
            </Typography>
            <Typography
              mt={2}
              fontSize={{ xs: "32px", sm: "40px", md: "52px" }}
              component="div"
              fontWeight={600}
              fontFamily="NanumSquareB"
              sx={{
                wordBreak: "keep-all",
              }}
              lineHeight={1.5}
            >
              매월 넷째 주 토요일, <br />
              추러스가 직접 만드는 고퀄리티 문제들.
            </Typography>
            <Typography
              mt={2}
              fontSize="18px"
              component="div"
              fontWeight={600}
              fontFamily="NanumSquareB"
              sx={{
                wordBreak: "keep-all",
              }}
              lineHeight={1.5}
            >
              매월 넷째 주 토요일에 열리는 정기모임에서는 추러스에서 만든 다양한
              문제와 퍼즐들을 풀 수 있어요.
            </Typography>

            <Box mt={3} display="grid" gap={2}>
              <ImageMarqueeRow items={problemImagesRowA} duration="40s" />
              <ImageMarqueeRow
                items={problemImagesRowB}
                reverse
                duration="46s"
              />
              <ImageMarqueeRow items={problemImagesRowC} duration="42s" />
            </Box>
          </Box>
        </Box>

        <Box display="flex" justifyContent="center" alignItems="center">
          <Box
            maxWidth={{ xs: "92vw", md: "50vw" }}
            sx={{
              position: "relative",
              px: { xs: 2, md: 0 },
            }}
          >
            <Typography
              variant="h6"
              component="div"
              fontWeight={700}
              fontFamily="NanumSquareEB"
            >
              MT 대이동
            </Typography>
            <Typography
              mt={2}
              fontSize={{ xs: "32px", sm: "40px", md: "52px" }}
              component="div"
              fontWeight={600}
              fontFamily="NanumSquareB"
              sx={{
                wordBreak: "keep-all",
              }}
              lineHeight={1.5}
            >
              내일은 MT 날입니다. <br />
              장소는 추리해서 오세요.
            </Typography>
            <Typography
              mt={2}
              fontSize="18px"
              component="div"
              fontWeight={600}
              fontFamily="NanumSquareB"
              sx={{
                wordBreak: "keep-all",
              }}
              lineHeight={1.5}
            >
              추러스는 엠티 장소를 알려드리지 않습니다! 서울 곳곳에 숨겨진 추리
              퀴즈를 풀어가면서 직접 찾아오셔야 합니다!
            </Typography>

            <Box mt={3}>
              <Box
                sx={{
                  position: "relative",
                  height: { xs: 220, md: 260 },
                  borderRadius: "28px",
                  overflow: "hidden",
                  boxShadow: "0 25px 60px rgba(15, 23, 42, 0.15)",
                }}
              >
                <Image
                  src="/image/seoul-map.png"
                  alt="서울 지도"
                  fill
                  sizes="(max-width: 900px) 90vw, 50vw"
                  style={{ objectFit: "cover", filter: "saturate(0.85)" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.4) 100%)",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    left: `calc(12% + ${mtProgress * 76}%)`,
                    top: `calc(72% - ${mtProgress * 48}% + ${
                      Math.sin(mtProgress * Math.PI * 2) * 6
                    }%)`,
                    transform: "translate(-50%, -100%)",
                  }}
                >
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: "#ff3b30",
                      boxShadow: "0 10px 18px rgba(255, 59, 48, 0.35)",
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        inset: -6,
                        borderRadius: "50%",
                        border: "1px solid rgba(255, 59, 48, 0.45)",
                        animation: "pulseRing 2.8s ease-in-out infinite",
                      }}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    right: { xs: 16, md: 24 },
                    bottom: { xs: 16, md: 20 },
                    px: 2.5,
                    py: 1.5,
                    borderRadius: "18px",
                    background: "rgba(255, 255, 255, 0.82)",
                    boxShadow: "0 18px 40px rgba(15, 23, 42, 0.12)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 12,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#6b7280",
                      fontWeight: 700,
                    }}
                  >
                    현재 위치
                  </Typography>
                  <Typography
                    sx={{ fontWeight: 600, fontSize: { xs: 14, md: 16 } }}
                  >
                    {mtStops[mtStopIndex]}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box display="flex" justifyContent="center" alignItems="center">
          <Box
            maxWidth={{ xs: "92vw", md: "50vw" }}
            sx={{
              position: "relative",
              px: { xs: 2, md: 0 },
            }}
          >
            <Typography
              variant="h6"
              component="div"
              fontWeight={700}
              fontFamily="NanumSquareEB"
            >
              추리소설
            </Typography>
            <Typography
              mt={2}
              fontSize={{ xs: "32px", sm: "40px", md: "52px" }}
              component="div"
              fontWeight={600}
              fontFamily="NanumSquareB"
              sx={{
                wordBreak: "keep-all",
              }}
              lineHeight={1.5}
            >
              진짜 추리를 좋아하는 사람과 읽는 <br />
              진짜 추리소설.
            </Typography>
            <Typography
              mt={2}
              fontSize="18px"
              component="div"
              fontWeight={600}
              fontFamily="NanumSquareB"
              sx={{
                wordBreak: "keep-all",
              }}
              lineHeight={1.5}
            >
              평소에 추리소설을 좋아하지만 시간이 없어서, 귀찮아서 읽지 못했던
              분들, 이참에 같이 읽어보는거 어떨까요? 다같이 토론하며 범인을 직접
              맞춰봐요!
            </Typography>

            <Box mt={3}>
              <Box
                sx={{
                  position: "relative",
                  padding: { xs: "20px", md: "28px" },
                  borderRadius: "26px",
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(242,244,248,0.9) 50%, rgba(236,238,243,0.9) 100%)",
                  boxShadow: "0 25px 60px rgba(15, 23, 42, 0.12)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: 13, md: 14 },
                    lineHeight: 1.8,
                    color: "#1f2937",
                    fontFamily:
                      "'SF Pro Text', 'Apple SD Gothic Neo', 'Pretendard', sans-serif",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {typedText.trim()}
                  <Box
                    component="span"
                    sx={{
                      display: "inline-block",
                      width: "8px",
                      height: "1em",
                      marginLeft: "4px",
                      background: "rgba(31, 41, 55, 0.6)",
                      borderRadius: "2px",
                      animation: "caretBlink 1.1s steps(1) infinite",
                      verticalAlign: "text-bottom",
                      "@keyframes caretBlink": {
                        "0%, 50%": { opacity: 1 },
                        "50.01%, 100%": { opacity: 0 },
                      },
                    }}
                  />
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box display="flex" justifyContent="center" alignItems="center">
          <Box
            maxWidth={{ xs: "92vw", md: "50vw" }}
            sx={{
              position: "relative",
              px: { xs: 2, md: 0 },
            }}
          >
            <Typography
              variant="h6"
              component="div"
              fontWeight={700}
              fontFamily="NanumSquareEB"
            >
              협동 크라임씬
            </Typography>
            <Typography
              mt={2}
              fontSize={{ xs: "32px", sm: "40px", md: "52px" }}
              component="div"
              fontWeight={600}
              fontFamily="NanumSquareB"
              sx={{
                wordBreak: "keep-all",
              }}
              lineHeight={1.5}
            >
              단서와 단서를 조합해 <br />
              추리를 완성하라.
            </Typography>
            <Typography
              mt={2}
              fontSize="18px"
              component="div"
              fontWeight={600}
              fontFamily="NanumSquareB"
              sx={{
                wordBreak: "keep-all",
              }}
              lineHeight={1.5}
            >
              TV/넷플릭스에서만 봤던 크라임씬을 직접 체험해보는 건 어떨까요?{" "}
              <br />
              여러 명이 함께 협력해서 단서를 모으고, 용의자들을 심문해서 범인을
              찾아 사건의 진상을 밝혀주세요.
            </Typography>
            <Box
              mt={4}
              sx={{
                position: "relative",
                borderRadius: "26px",
                overflow: "hidden",
                minHeight: { xs: 260, md: 320 },
                boxShadow: "0 25px 60px rgba(15, 23, 42, 0.16)",
                background:
                  "radial-gradient(320px 200px at 20% 20%, rgba(255,255,255,0.9), rgba(235,238,244,0.92) 55%, rgba(220,224,234,0.9) 100%)",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 0,
                }}
              >
                {crimeSceneBackdrops.map((src, index) => (
                  <Image
                    key={src}
                    src={src}
                    alt="크라임씬 배경"
                    fill
                    sizes="(max-width: 900px) 90vw, 50vw"
                    style={{
                      objectFit: "cover",
                      filter: "saturate(0.7) brightness(0.7)",
                      opacity: index === 0 ? 1 : 0,
                      animation: `bgFade 28s ease-in-out ${
                        index * 7
                      }s infinite`,
                    }}
                  />
                ))}
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(500px 260px at 30% 20%, rgba(255,255,255,0.15), transparent 70%), linear-gradient(180deg, rgba(5,7,12,0.35) 0%, rgba(5,7,12,0.75) 100%)",
                  zIndex: 1,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  zIndex: 2,
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    overflow: "hidden",
                    maskImage:
                      "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      width: "max-content",
                      alignItems: "center",
                      animation: "profileMarquee 44s linear infinite",
                      "@keyframes profileMarquee": {
                        "0%": { transform: "translateX(0)" },
                        "100%": { transform: "translateX(-50%)" },
                      },
                    }}
                  >
                    {[...crimeSceneProfiles, ...crimeSceneProfiles].map(
                      (profile, index) => {
                        const sizes = [52, 58, 64, 70, 60, 54];
                        const offsets = [-8, 6, -4, 10, -6, 4];
                        const size = sizes[index % sizes.length];
                        const offset = offsets[index % offsets.length];
                        return (
                          <Box
                            key={`${profile.src}-${index}`}
                            sx={{
                              width: { xs: size - 6, md: size },
                              height: { xs: size - 6, md: size },
                              borderRadius: "50%",
                              overflow: "hidden",
                              boxShadow: "0 10px 22px rgba(0,0,0,0.35)",
                              background: "rgba(255,255,255,0.9)",
                              flexShrink: 0,
                              transform: `translateY(${offset}px)`,
                              transition:
                                "transform 0.35s ease, box-shadow 0.35s ease",
                              ":hover": {
                                transform: `translateY(${offset}px)`,
                                boxShadow: "0 16px 32px rgba(0,0,0,0.45)",
                              },
                            }}
                          >
                            <Image
                              src={profile.src}
                              alt="용의자 프로필"
                              width={160}
                              height={160}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                              }}
                            />
                          </Box>
                        );
                      }
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box display="flex" justifyContent="center" alignItems="center">
          <Box
            maxWidth={{ xs: "92vw", md: "50vw" }}
            sx={{
              position: "relative",
              px: { xs: 2, md: 0 },
              textAlign: "center",
              marginBottom: { xs: 4, md: 4 },
            }}
          >
            <Typography
              sx={{
                mb: 2,
                fontSize: { xs: 16, md: 18 },
                color: "rgba(15, 23, 42, 0.72)",
                fontWeight: 600,
                fontFamily: "NanumSquareB",
              }}
            >
              지금까지 본 추리 활동 중 하나라도 마음에 들었다면?
            </Typography>
            <Link href="/recruit" style={{ textDecoration: "none" }}>
              <Box
                component="span"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  px: { xs: 4, md: 5 },
                  py: { xs: 1.6, md: 1.8 },
                  borderRadius: "999px",
                  background:
                    "linear-gradient(135deg, rgba(17,24,39,0.98) 0%, rgba(31,41,55,0.92) 55%, rgba(17,24,39,0.98) 100%)",
                  color: "white",
                  fontWeight: 700,
                  fontSize: { xs: 16, md: 18 },
                  letterSpacing: "-0.01em",
                  boxShadow:
                    "0 24px 50px rgba(15, 23, 42, 0.22), inset 0 1px 0 rgba(255,255,255,0.2)",
                  transition: "transform 0.4s ease, box-shadow 0.4s ease",
                  ":hover": {
                    transform: "translateY(-4px)",
                    boxShadow:
                      "0 30px 60px rgba(15, 23, 42, 0.28), inset 0 1px 0 rgba(255,255,255,0.35)",
                  },
                }}
              >
                지금 바로 지원
              </Box>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
