import { FadeInSection } from "@/components/FadeInSection";
import Header from "@/components/Header";
import { Box, Typography } from "@mui/material";

export default function Certification() {
  return (
    <>
      {" "}
      <Header />
      <Box sx={{ backgroundColor: "black" }} width="100%" height="100%">
        <FadeInSection>
          <Box width="100%" pt="100px">
            <Typography
              color="white"
              fontWeight="bold"
              fontSize="24px"
              textAlign="center"
            >
              크라임씬 플레이를 끝까지 완료하면
              <br />
              인증카드를 드려요
            </Typography>
          </Box>
        </FadeInSection>
        <FadeInSection>
          <Box width="100%" height="100px">
            <Typography color="lightgray" fontSize="16px" textAlign="center">
              인증카드로도 추러스 활동점수를 받을 수 있어요.
            </Typography>
          </Box>
        </FadeInSection>
        <FadeInSection>
          <Box
            width="100%"
            height="1000px"
            display="flex"
            justifyContent="center"
          >
            <Box
              width="60%"
              height="500px"
              border="1px lightgray dashed"
              borderRadius="10px"
              textAlign="center"
              fontWeight="bold"
              color="lightGray"
              lineHeight="500px"
            >
              아직 준비중인 기능이에요. 빠르게 준비해서 찾아뵐게요!
            </Box>
          </Box>
        </FadeInSection>
      </Box>
    </>
  );
}
