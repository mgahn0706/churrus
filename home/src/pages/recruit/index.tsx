import GlobalHeader from "@/components/Navigation/GlobalHeader";
import { useMobileWidth } from "@/hooks/useMobileWIdth";
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import Head from "next/head";

const FAQList: Record<string, string> = {
  "추러스는 교내 동아리인가요?":
    "네, 서울대학교 교내동아리입니다. 2018년 개설되어 현재 중앙동아리로 등록되어있습니다.",
  "가입비가 있나요?":
    "네, 있습니다. 신규 회원 30,000원, 기존 회원 20,000원을 받고 있습니다. 정기모임 준비 비용, 뒷풀이 및 번개 지원, 엠티 경품 등등으로 사용되며 매 사용 시마다 투명하게 공개됩니다. 또한 번개에 적극적으로 참여 시 회기 당 최대 1만원이 환급됩니다.",
  "고학번 화석인데 들어가도 괜찮나요?":
    "저번 회기 기준 학번 중앙값이 24학번이었고, 17학번부터 25학번까지 다양하게 분포되어 있습니다. 대학원생도 상당수 분포되어 있으니 부담없이 지원하셔도 됩니다!",
  "동아리방이 있나요?":
    "네, 동아리방이 있습니다! 관악캠퍼스 학생회관(63동) 411호에 위치해있습니다.",
  "추리를 못해도 괜찮나요?":
    "괜찮습니다! 저희 동아리에 들어오자마자 추리를 잘 하는 사람은 지금까지 본 적이 없습니다. 하다 보면 문제에 익숙해지면서 추리 실력은 점차 늘게 됩니다. 그리고 추리 문제에 자신이 없더라도 보드게임, 방탈출, 추리소설, 크라임씬 등 추리를 즐길 수 있는 여러 가지 활동이 준비되어 있으니 전혀 걱정하지 않으셔도 됩니다.",
  "동아리 규모가 얼마나 되나요?":
    "저의 동아리는 원활한 정기모임 진행을 위해 정원을 100명 내외로 제한하고 있습니다.",
  "OT는 필수 참석인가요?":
    "아니요, 필수 참석은 아닙니다. 다만 OT에서 동아리 활동에 대한 전반적인 설명과 간단한 아이스브레이킹 게임이 진행되니 가능하면 참석하시는 것을 추천드립니다.",
};
export default function RecruitPage() {
  const { isMobileWidth } = useMobileWidth();
  return (
    <>
      <Head>
        <title>지원하기</title>
      </Head>
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
        }}
      >
        <GlobalHeader />
        <Box
          sx={{
            py: { xs: "90px", md: "130px" },
            px: { xs: "6vw", md: "10vw" },
            background:
              "linear-gradient(180deg, rgba(248,250,252,0.95) 0%, rgba(236,242,247,0.95) 100%)",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 700,
              letterSpacing: "-0.02em",
              fontFamily:
                "'SF Pro Display', 'Apple SD Gothic Neo', 'Pretendard', sans-serif",
              wordBreak: "keep-all",
            }}
          >
            추러스 26-1기 신입 회원 모집
          </Typography>
          <Typography
            mt={2}
            fontSize={isMobileWidth ? "1rem" : "1.4rem"}
            sx={{
              wordBreak: "keep-all",
              color: "rgba(15, 23, 42, 0.7)",
              fontFamily:
                "'SF Pro Text', 'Apple SD Gothic Neo', 'Pretendard', sans-serif",
            }}
          >
            추러스 26-1기 신입 회원 모집을 시작합니다! (3/2 ~ 3/7)
          </Typography>
        </Box>
        <Box textAlign="center" py={{ xs: "90px", md: "130px" }} px="10vw">
          <Typography
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 700,
              letterSpacing: "-0.02em",
              fontFamily:
                "'SF Pro Display', 'Apple SD Gothic Neo', 'Pretendard', sans-serif",
            }}
            mb="20px"
          >
            지원 방법
          </Typography>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Typography
              sx={{
                fontSize: { xs: "1.1rem", md: "1.6rem" },
                fontWeight: 500,
                color: "rgba(15, 23, 42, 0.75)",
                fontFamily:
                  "'SF Pro Text', 'Apple SD Gothic Neo', 'Pretendard', sans-serif",
              }}
            >
              아래의 버튼을 눌러 지원서를 작성할 수 있어요. 서울대 계정 로그인이
              필요해요.
            </Typography>
            <Button
              sx={{
                color: "white",
                borderRadius: "999px",
                mt: 4,
                bgcolor: "#111827",
                textAlign: "center",
                px: 5,
                py: 1.8,
                fontWeight: 700,
                boxShadow:
                  "0 24px 50px rgba(15, 23, 42, 0.22), inset 0 1px 0 rgba(255,255,255,0.2)",
                transition: "transform 0.4s ease, box-shadow 0.4s ease",
                "&:hover": {
                  bgcolor: "#0f172a",
                  transform: "translateY(-4px)",
                  boxShadow:
                    "0 30px 60px rgba(15, 23, 42, 0.28), inset 0 1px 0 rgba(255,255,255,0.35)",
                },
              }}
              onClick={() => {
                window.open(
                  "https://forms.gle/RStmfPBFiDthbGoYA",
                  "_blank",
                  "noopener noreferrer"
                );
              }}
            >
              지원하기
            </Button>
          </Box>
        </Box>
        <Divider sx={{ opacity: 0.4 }} />
        <Box
          textAlign="center"
          py={{ xs: "90px", md: "130px" }}
          px="10vw"
          sx={{
            background:
              "linear-gradient(180deg, rgba(248,250,252,0.95) 0%, rgba(236,242,247,0.95) 100%)",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "1.6rem", md: "2rem" },
              fontWeight: 700,
              letterSpacing: "-0.02em",
              fontFamily:
                "'SF Pro Display', 'Apple SD Gothic Neo', 'Pretendard', sans-serif",
            }}
            mb="20px"
          >
            자주 묻는 질문
          </Typography>
          <Box display="flex" flexDirection="column">
            {Object.entries(FAQList).map(([question, answer]) => {
              return (
                <Accordion
                  key={question}
                  sx={{
                    width: "min(840px, 90vw)",
                    textAlign: "left",
                    mx: "auto",
                    mb: 1.5,
                    borderRadius: "16px",
                    boxShadow: "0 16px 36px rgba(15, 23, 42, 0.08)",
                    background: "rgba(255,255,255,0.8)",
                    backdropFilter: "blur(12px)",
                    "::before": { display: "none" },
                    "&.Mui-expanded": {
                      margin: "0 auto 12px",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{
                      py: 2,
                      px: 3,
                    }}
                  >
                    <Typography
                      fontSize={isMobileWidth ? "1.1rem" : "1.4rem"}
                      fontWeight={500}
                      textAlign={"left"}
                    >
                      {question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      wordBreak: "keep-all",
                      px: 3,
                    }}
                  >
                    <Typography
                      fontSize={isMobileWidth ? "0.98rem" : "1.1rem"}
                      fontWeight={400}
                    >
                      {answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
}
