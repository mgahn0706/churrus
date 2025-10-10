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
    "네, 서울대학교 교내동아리입니다. 현재 중앙동아리로 등록되어있습니다.",
  "가입비가 있나요?":
    "네, 있습니다. 신규 회원 30,000원, 기존 회원 20,000원을 받고 있습니다. 정기모임 준비 비용, 뒷풀이 및 번개 지원, 엠티 경품 등등으로 사용되며 매 사용 시마다 투명하게 공개됩니다.",
  "고학번 화석인데 들어가도 괜찮나요?":
    "저번 회기 기준 학번 중앙값이 24학번이었고, 15학번부터 25학번까지 다양하게 분포되어 있습니다. 대학원생도 상당수 분포되어 있으니 부담없이 지원하셔도 됩니다!",
  "동아리방이 있나요?":
    "네, 동아리방이 있습니다! 관악캠퍼스 학생회관(63동) 411호에 위치해있습니다. (25-2 ~ )",
  "추리를 못해도 괜찮나요?":
    "괜찮습니다! 저희 동아리에 들어오자마자 추리를 잘 하는 사람은 지금까지 본 적이 없습니다. 하다 보면 문제에 익숙해지면서 추리 실력은 점차 늘게 됩니다. 그리고 추리 문제에 자신이 없더라도 보드게임, 방탈출, 추리소설 등 추리를 즐길 수 있는 여러 가지 활동이 준비되어 있으니 전혀 걱정하지 않으셔도 됩니다.",
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
      <Box>
        <GlobalHeader />
        <Box bgcolor="#d9efed" py={["100px", "120px", "150px"]} px="10vw">
          <Box
            sx={{
              fontSize: ["2em", "3rem", "3rem"],
              fontWeight: 700,
              wordBreak: "keep-all",
            }}
          >
            추러스 25-2기 추가 모집
          </Box>
          <Box
            fontSize={isMobileWidth ? "1rem" : "1.5rem"}
            sx={{
              wordBreak: "keep-all",
            }}
          >
            추러스 25-2기 신입 회원 추가 모집을 시작합니다! ( ~ 10/14)
          </Box>
        </Box>
        <Box textAlign="center" py={["100px", "120px", "150px"]} px="10vw">
          <Box
            sx={{
              fontSize: ["2em", "3rem", "3rem"],
              fontWeight: 700,
            }}
            mb="20px"
          >
            지원 방법
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Box
              sx={{
                fontSize: ["1.5rem", "2rem", "2rem"],
                fontWeight: 400,
              }}
            >
              아래의 버튼을 눌러 지원서를 작성할 수 있어요. 서울대 계정 로그인이
              필요해요.
            </Box>
            <Button
              sx={{
                color: "white",
                borderRadius: "10px",
                mt: 4,
                bgcolor: "#009688",
                textAlign: "center",
                px: 4,
                py: 2,
                fontWeight: 700,
                "&:hover": {
                  bgcolor: "#00796b",
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
        <Divider />
        <Box textAlign="center" py="150px" px="10vw" bgcolor="#d9efed">
          <Box
            display="flex"
            sx={{
              fontSize: "2rem",
              fontWeight: 700,
            }}
            mb="20px"
          >
            자주 묻는 질문
          </Box>
          <Box display="flex" flexDirection="column">
            {Object.entries(FAQList).map(([question, answer]) => {
              return (
                <Accordion
                  key={question}
                  sx={{
                    width: "80vw",
                    textAlign: "left",
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
                      fontSize={isMobileWidth ? "1.2rem" : "1.5rem"}
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
                      fontSize={isMobileWidth ? "1rem" : "1.2rem"}
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
