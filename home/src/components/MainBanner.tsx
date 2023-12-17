import { useMobileWidth } from "@/hooks/useMobileWIdth";
import { PlayArrowSharp } from "@mui/icons-material";
import { Box, Typography, Button } from "@mui/material";
import router from "next/router";

const BANNER_COLOR = "white";

const BANNER_IMAGE = "/image/banner/2023-11.png";

const BANNER_TEXT = {
  subtitle: "장편 추리 문제",
  title: "일찍 온 크리스마스",
  ctaURL: "/quiz",
};

const handleClickBannerButton = () => {
  router.push(BANNER_TEXT.ctaURL, undefined, {
    scroll: true,
  });
};

export default function MainBanner() {
  const { isMobileWidth } = useMobileWidth();

  if (isMobileWidth)
    return (
      <Box display="flex" justifyContent="center">
        <Box
          display="flex"
          justifyContent="flex-start"
          width="90vw"
          height="350px"
          borderRadius="16px"
          sx={{
            bgcolor: BANNER_COLOR,
          }}
        >
          <Box
            width="100vw"
            display="flex"
            flexDirection="column"
            pl={4}
            py={5}
            justifyContent="flex-start"
            gap={3}
          >
            <Typography color="black" variant="body1" mb={-2}>
              2023년 11월 정기모임
            </Typography>
            <Typography color="black" fontWeight="bold" variant="h4">
              {BANNER_TEXT.subtitle} &
            </Typography>
            <Typography color="#f96556" fontWeight="bold" variant="h4" mt={-3}>
              {BANNER_TEXT.title}
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Button
                variant="contained"
                sx={{
                  width: "fit-content",
                  height: "fit-content",
                  backgroundColor: "#f96556",
                  color: "white",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#da5142",
                  },
                }}
                size="small"
                onClick={handleClickBannerButton}
              >
                시작
                <PlayArrowSharp />
              </Button>
              <Box
                mt={-2}
                width="75%"
                height="200px"
                sx={{
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundImage: `linear-gradient(to bottom, ${BANNER_COLOR} 3%, transparent 20%, transparent 70%, ${BANNER_COLOR} 98%), linear-gradient(to left, ${BANNER_COLOR} 3%, transparent 20%, transparent 80%, ${BANNER_COLOR} 98%), url("${BANNER_IMAGE}") `,
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    );

  return (
    <Box display="flex" justifyContent="center">
      <Box
        display="flex"
        justifyContent="flex-start"
        width="60vw"
        height="40vh"
        borderRadius="16px"
        sx={{
          bgcolor: BANNER_COLOR,
        }}
      >
        <Box
          width="25vw"
          display="flex"
          flexDirection="column"
          px={5}
          py={5}
          justifyContent="flex-start"
          gap={3}
        >
          <Typography color="black" variant="h6" mb={-2}>
            2023년 11월 정기모임
          </Typography>
          <Typography color="black" fontWeight="bold" variant="h3">
            {BANNER_TEXT.subtitle} &
          </Typography>
          <Typography color="#f96556" fontWeight="bold" variant="h3" mt={-3}>
            {BANNER_TEXT.title}
          </Typography>
          <Button
            variant="contained"
            sx={{
              width: "fit-content",
              backgroundColor: "#f96556",
              color: "white",
              fontWeight: "bold",
              fontSize: "1.2rem",
              "&:hover": {
                backgroundColor: "#da5142",
              },
            }}
            size="large"
            onClick={handleClickBannerButton}
          >
            시작
            <PlayArrowSharp />
          </Button>
        </Box>

        <Box
          width="30vw"
          height="100%"
          sx={{
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `linear-gradient(to bottom, ${BANNER_COLOR} 3%, transparent 20%, transparent 70%, ${BANNER_COLOR} 98%), linear-gradient(to left, ${BANNER_COLOR} 3%, transparent 20%, transparent 80%, ${BANNER_COLOR} 98%), url("${BANNER_IMAGE}") `,
          }}
        />
      </Box>
    </Box>
  );
}
