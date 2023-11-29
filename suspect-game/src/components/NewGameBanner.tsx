import { useMobileWidth } from "@/hooks/useMobileWIdth";
import { useResponsiveValue } from "@/hooks/useResponsiveValue";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";

export default function NewGameBanner() {
  const isMobile = useResponsiveValue([true, false, false]);
  if (isMobile) {
    return (
      <Box
        display="flex"
        position="relative"
        justifyContent="center"
        height={200}
        borderRadius={2}
        sx={{ bgcolor: "white", backdropFilter: "blur(10px)" }}
      >
        <Image
          src="/image/banner/martian-dice-img.png"
          fill
          alt="마션 다이스"
        />

        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(5px)",
          }}
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Box
            mt={2}
            sx={{
              as: "span",
              wordBreak: "keep-all",
            }}
          >
            <Typography color="#f96656" fontSize="24px" fontWeight="bold">
              주사위를 굴려
            </Typography>
            <Typography color="black" fontSize="24px" fontWeight="bold">
              최대한 많은 지구 생명체를 납치하라
            </Typography>
          </Box>

          <Button
            variant="contained"
            size="small"
            sx={{
              width: "fit-content",
              backgroundColor: "#f96656",
              "&:hover": {
                backgroundColor: "#d75749",
              },
            }}
          >
            시작
          </Button>
        </Box>
      </Box>
    );
  }
  return (
    <Box
      display="flex"
      height={100}
      position="relative"
      justifyContent="center"
      p={6}
      borderRadius={2}
      sx={{ bgcolor: "white", color: "primary.contrastText" }}
    >
      <Box position="absolute" left={3}>
        <Image
          src="/image/banner/martian-dice-logo.png"
          width={200}
          height={80}
          alt="마션 다이스"
        />
      </Box>
      <Image
        src="/image/banner/martian-dice-img.png"
        width={150}
        height={100}
        alt="마션 다이스 이미지"
      />

      <Box
        position="absolute"
        top={0}
        right={0}
        height="100%"
        width="50%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        px={4}
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(5px)",
        }}
      >
        <Box
          mb={1}
          sx={{
            as: "span",
            wordBreak: "keep-all",
          }}
        >
          <Typography color="#f96656" fontSize="20px" fontWeight="bold">
            주사위를 굴려
          </Typography>
          <Typography color="black" fontSize="20px" fontWeight="bold">
            최대한 많은 지구 생명체를 납치하라
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="small"
          sx={{
            width: "fit-content",
            backgroundColor: "#f96656",
            "&:hover": {
              backgroundColor: "#d75749",
            },
          }}
        >
          시작
        </Button>
      </Box>
    </Box>
  );
}
