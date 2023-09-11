import GlobalHeader from "@/components/GlobalHeader";
import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";

export default function ChurrusMain() {
  const responsiveFontSize = useResponsiveValue([2, 2, 3]);

  return (
    <Box>
      <GlobalHeader />
      <Box
        width="100vw"
        height="40vw"
        position="relative"
        minHeight="300px"
        overflow="hidden"
      >
        <Image
          src="/image/churrus_main.png"
          fill
          alt="추러스_메인"
          style={{
            filter: "brightness(0.5)",
            overflow: "hidden",
          }}
        />
        <TypeAnimation
          preRenderFirstString
          sequence={[
            "추러스에서는 추리소설을 읽어요",
            1000,
            "추러스에서는 방탈출을 해요",
            1000,
            "추러스에서는 보드게임을 하러가요",
            1000,
            "추러스에서는 정기모임을 해요",
            1000,
            "추러스에서는 더 지니어스의 게임을 해요",
            1000,
            "추러스에서는 MT 장소를 추리해서 가요",
            1000,
            "추러스에서는 홀덤을 해요",
            1000,
            "추러스에서는 크라임씬을 즐겨요",
            1000,
            "추러스에서는 문제를 직접 만들어요",
            1000,
            "추러스에서는 바다거북스프 문제를 풀어요",
            1000,
            "추러스에서는 서스펙트 게임을 해요",
            1000,
          ]}
          speed={10}
          style={{
            fontSize: `${responsiveFontSize}em`,
            fontWeight: 700,
            position: "absolute",
            top: "50%",
            left: "50%",
            color: "white",
            transform: "translate(-50%, -50%)",
          }}
          repeat={Infinity}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        py="150px"
        flexDirection="column"
        bgcolor={"#eeeeee"}
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
        py="150px"
        flexDirection="column"
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box>
            <Typography
              variant="h6"
              component="div"
              fontWeight={700}
              fontFamily="NanumSquareEB"
              px={2}
            >
              정기모임
            </Typography>
            <Typography
              mt={2}
              variant="h4"
              component="div"
              fontWeight={600}
              fontFamily="NanumSquareB"
              sx={{
                wordBreak: "keep-all",
              }}
              px="20px"
              lineHeight={1.5}
            >
              매주 금요일 7시에 정기모임을 진행합니다. <br />
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
