import { LocalFloristRounded } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

import { useResponsiveValue } from "@/hooks/useResponsiveValue";

const BANNER_COLOR = `linear-gradient(180deg, rgba(49,138,225,1) 0%, rgba(27,75,123,1) 100%)`;

const BANNER_TEXT = {
  title: "4월 정기모임",
  subtitle: "4/27(토) 오후 3시",
};

export default function MainBanner() {
  const isMobileWidth = useResponsiveValue([true, true, false]);

  if (isMobileWidth) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          p={4}
          borderRadius="20px"
          minHeight="100px"
          sx={{
            background: BANNER_COLOR,
          }}
          justifyContent="flex-end"
        >
          <Typography color="white" fontSize={24} fontWeight="bold" zIndex={2}>
            {BANNER_TEXT.title}
          </Typography>
          <Typography color="white" fontSize={18} zIndex={2}>
            {BANNER_TEXT.subtitle}
          </Typography>
          <Box
            position="absolute"
            color="#11283D"
            sx={{
              width: 100,
              filter: "blur(3px)",
              transform: "rotate(-12deg)",
              right: "10%",
            }}
          >
            <LocalFloristRounded
              sx={{
                fontSize: 100,
              }}
            />
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        p={4}
        sx={{
          background: BANNER_COLOR,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-around"
          width="100%"
          height="270px"
          alignItems="center"
        >
          <Box display="flex" flexDirection="column" width="300px">
            <Typography color="white" fontSize={48} fontWeight="bold">
              {BANNER_TEXT.title}
            </Typography>
            <Typography color="white" fontSize={24}>
              {BANNER_TEXT.subtitle}
            </Typography>
          </Box>
          <Box
            color="#11283D"
            sx={{
              width: 100,
              filter: "blur(3px)",
              transform: "rotate(-12deg)",
            }}
          >
            <LocalFloristRounded
              sx={{
                fontSize: 200,
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
