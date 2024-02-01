import { useMobileWidth } from "@/hooks/useMobileWIdth";
import { PlayArrowSharp } from "@mui/icons-material";
import {
  Box,
  Typography,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import router from "next/router";

const BANNER_COLOR = "#f96556";

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

  return (
    <Box display="flex" justifyContent="center">
      <Box
        display="flex"
        justifyContent="center"
        width="60vw"
        height="40vh"
        borderRadius="16px"
        alignItems="center"
        sx={{
          bgcolor: BANNER_COLOR,
        }}
      >
        <Card sx={{ maxWidth: 600, maxHeight: 350 }}>
          <CardActionArea>
            <CardContent>
              <CardMedia
                width="50px"
                height="50px"
                component="img"
                image={BANNER_IMAGE}
                alt="banner"
              />
              <Typography gutterBottom variant="h5" component="div">
                2024년 1월 정기모임
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {BANNER_TEXT.title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Box>
  );
}
