import { PlayArrowSharp } from "@mui/icons-material";
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
} from "@mui/material";
import router from "next/router";

const BANNER_COLOR = "#4b89da";

const BANNER_TEXT = {
  subtitle: "장편 추리 문제",
  title: "과자나라의 역사를 찾아서",
  ctaURL: "/quiz",
};

const handleClickBannerButton = () => {
  router.push(BANNER_TEXT.ctaURL, undefined, {
    scroll: true,
  });
};

export default function MainBanner() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt="64px">
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        height="40vh"
        alignItems="center"
        sx={{
          bgcolor: BANNER_COLOR,
        }}
      >
        <Card
          elevation={4}
          sx={{
            width: "470px",
            minHeight: "290px",
          }}
        >
          <CardActionArea>
            <CardHeader subheader="2024" />
            <CardContent>
              <Box
                flexDirection="column"
                display="flex"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
              >
                <Typography
                  gutterBottom
                  component="div"
                  fontWeight="bolder"
                  fontSize="36px"
                >
                  1월 정기모임
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {BANNER_TEXT.title}
                </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Box>
  );
}
