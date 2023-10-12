import GlobalHeader from "@/components/GlobalHeader";
import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";

export default function ChurrusMain() {
  const responsiveFontSize = useResponsiveValue([2, 2, 3]);

  const responsiveTitle = useResponsiveValue([

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
        gap="250px"
        flexDirection="column"
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box maxWidth="50vw">
            <Typography
              variant="h6"
              component="div"
              fontWeight={700}
              fontFamily="NanumSquareEB"
            >
              정기모임
            </Typography>
            <Typography
              mt={2}
              variant="h2"
              component="div"
              fontWeight={600}
              fontFamily="NanumSquareB"
              sx={{
                wordBreak: "keep-all",
              }}
              lineHeight={1.5}
            >
              매월 넷째 주 토요일, <br />
              추러스를 위해 준비된 고퀄리티 문제들.
            </Typography>
            <Typography
              mt={2}
              variant="h6"
              component="div"
              fontWeight={600}
              fontFamily="NanumSquareB"
              sx={{
                wordBreak: "keep-all",
              }}
              lineHeight={1.5}
            >
              매월 넷째 주 토요일에 열리는 정기모임에서는
              다양한 문제들은 물론, 더 지니어스나 크라임씬 같은
              재미있는 활동을 즐길 수 있어요. 
            </Typography>
          </Box>
        </Box>

        <Box display="flex" justifyContent="center" alignItems="center">
          <Box maxWidth="50vw">
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
              variant="h2"
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
              variant="h6"
              component="div"
              fontWeight={600}
              fontFamily="NanumSquareB"
              sx={{
                wordBreak: "keep-all",
              }}
              lineHeight={1.5}
            >
              추러스는 엠티 장소를 알려드리지 않습니다! 서울 곳곳에 숨겨진
              추리 퀴즈를 풀어가면서 직접 찾아오셔야 합니다!
            </Typography>
          </Box>
        </Box>

        <Box display="flex" justifyContent="center" alignItems="center">
          <Box maxWidth="50vw">
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
              variant="h2"
              component="div"
              fontWeight={600}
              fontFamily="NanumSquareB"
              sx={{
                wordBreak: "keep-all",
              }}
              lineHeight={1.5}
            >
              진짜 추리를 좋아하는 사람과 읽는 <br />
              진짜 추리소설
            </Typography>
            <Typography
              mt={2}
              variant="h6"
              component="div"
              fontWeight={600}
              fontFamily="NanumSquareB"
              sx={{
                wordBreak: "keep-all",
              }}
              lineHeight={1.5}
            >
              평소에 추리소설을 좋아하지만 시간이 없어서, 귀찮아서 읽지 못했던
              분들, 이참에 같이 읽어보는거 어떨까요? 다같이 토론하며 범인을 직접 맞춰봐요!
            </Typography>
          </Box>
        </Box>

        <Box display="flex" justifyContent="center" alignItems="center">
          <Box maxWidth="50vw">
            <Typography
              variant="h6"
              component="div"
              fontWeight={700}
              fontFamily="NanumSquareEB"
            >
              방탈출/보드게임 번개
            </Typography>
            <Typography
              mt={2}
              variant="h2"
              component="div"
              fontWeight={600}
              fontFamily="NanumSquareB"
              sx={{
                wordBreak: "keep-all",
              }}
              lineHeight={1.5}
            >
              더이상 방탈출, 보드게임 <br />
              영업 안해도 됩니다.
            </Typography>
            <Typography
              mt={2}
              variant="h6"
              component="div"
              fontWeight={600}
              fontFamily="NanumSquareB"
              sx={{
                wordBreak: "keep-all",
              }}
              lineHeight={1.5}
            >
           방탈출을 하고 싶었지만 예약하기 힘들었던 분들, 혹은 방탈출이나 보드게임을
              하고 싶지만 사람 모으기 분들, 추러스에서 같이 플레이해 보아요!
            </Typography>
          </Box>
        </Box>

        <Box display="flex" justifyContent="center" alignItems="center">
          <Box maxWidth="50vw">
            <Typography
              mt={2}
              variant="h2"
              component="div"
              fontWeight={600}
              fontFamily="NanumSquareB"
              sx={{
                wordBreak: "keep-all",
              }}
              lineHeight={1.5}
            >
              당신이 좋아할 소모임은?
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
