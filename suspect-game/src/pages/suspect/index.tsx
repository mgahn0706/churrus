import {
  Circle,
  PeopleAlt,
  Schedule,
  VolumeUpRounded,
} from "@mui/icons-material";
import { Box, IconButton, Rating, Typography, keyframes } from "@mui/material";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { ScenarioType } from "@/features/suspect/types";
import Header from "@/features/suspect/components/Header";
import MobileWidthAlertModal from "@/features/suspect/components/MobileWidthAlertModal";
import ScenarioCard from "@/features/suspect/components/ScenarioSelect/ScenarioCard";
import { scenarios } from "@/features/suspect/fixtures";
import { useMobileWidth } from "@/hooks/useMobileWIdth";

export default function Suspect() {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioType | null>(
    null
  );

  const { isMobileWidth } = useMobileWidth();

  const glitch = keyframes`
  2%,64%{
    transform: translate(2px,0) skew(0deg);
  }
  4%,60%{
    transform: translate(-2px,0) skew(0deg);
  }
  62%{
    transform: translate(0,0) skew(5deg); 
  }
`;

  const glitchTop = keyframes`
  2%,64%{
    transform: translate(2px,-2px);
  }
  4%,60%{
    transform: translate(-2px,2px);
  }
  62%{
    transform: translate(13px,-1px) skew(-13deg); 
  }
`;

  const glitchBotom = keyframes`
    2%,64%{
      transform: translate(-2px,0);
    }
    4%,60%{
      transform: translate(-2px,0);
    }
    62%{
      transform: translate(-22px,5px) skew(21deg); 
    }
  `;

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100vw"
      height="100vh"
      sx={{ backgroundColor: !!selectedScenario ? "inherit" : "black" }}
    >
      <Header />
      {!selectedScenario && (
        <Box position="absolute" display="flex" width="100vw" height="100vh">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              backgroundColor: "black",
              width: "100%",
            }}
          >
            <Box
              display="flex"
              alignContent="center"
              fontFamily="Gill Sans"
              sx={{
                animation: `${glitch} 1s linear infinite`,
                "&:after, &:before": {
                  content: '"SELECT YOUR CRIME SCENE"',
                  position: "absolute",
                  left: 0,
                },
                "&:after": {
                  animation: `${glitchBotom} 1.5s linear infinite`,
                  clipPath: "polygon(0 66%, 100% 66%, 100% 100%, 0 100%)",
                  WebkitClipPath: "polygon(0 66%, 100% 66%, 100% 100%, 0 100%)",
                },
                "&:before": {
                  animation: `${glitchTop} 1s linear infinite`,
                  clipPath: `polygon(0 0, 100% 0, 100% 33%, 0 33%)`,
                  WebkitClipPath: `polygon(0 0, 100% 0, 100% 33%, 0 33%)`,
                },
              }}
              fontSize={100}
              color="white"
            >
              SELECT YOUR CRIME SCENE
            </Box>
          </Box>
        </Box>
      )}
      {selectedScenario && (
        <Box height="100vh" display="flex" justifyContent="space-between">
          <Box
            p={5}
            sx={{
              color: "white",
              position: "absolute",
              top: "10%",
              left: "5%",
            }}
          >
            <Typography variant="h3">{selectedScenario.title}</Typography>
            <Rating
              icon={<Circle />}
              emptyIcon={<Circle />}
              name="read-only"
              value={selectedScenario.difficulty}
              readOnly
            />
            <Box display="flex">
              <PeopleAlt sx={{ mr: 2 }} />
              <Typography>{selectedScenario.numberOfSuspects}</Typography>
            </Box>
            <Box display="flex">
              <Schedule sx={{ mr: 2 }} />
              <Typography>약 {selectedScenario.playTime}분</Typography>
            </Box>
            {selectedScenario.history && (
              <Box display="flex" mt={1} color="gray">
                <Typography fontSize="15px">
                  {selectedScenario.history}에서 진행됨
                </Typography>
              </Box>
            )}
          </Box>
          {selectedScenario.bgmURL && (
            <a
              href={selectedScenario.bgmURL}
              target="_blank"
              rel="noreferrer noopener"
            >
              <IconButton
                size="large"
                edge="start"
                sx={{
                  backgroundColor: "white",
                  position: "absolute",
                  right: "5%",
                  top: "15%",
                }}
              >
                <VolumeUpRounded />
              </IconButton>
            </a>
          )}
          <Box
            sx={{
              position: "absolute",
              margin: 0,
              width: "100%",
              height: "100%",
              backgroundSize: "cover",
              zIndex: -1,
              backgroundImage: `linear-gradient(to left, rgba(255, 255, 255, 0) 3%, rgba(0, 0, 0, 0.25) 30%, rgba(0, 0, 0, 0.5) 40%, rgba(0, 0, 0, 0.55) 50%, #000000 85%), url("${selectedScenario.backgroundImage}")`,
              backgroundRepeat: "no-repeat",
            }}
          />
        </Box>
      )}
      <Box display="flex" justifyContent="center">
        <Box
          display="flex"
          alignItems="center"
          height="250px"
          mb={5}
          mx={4}
          width="70vw"
          position="absolute"
          sx={{ bottom: 3 }}
        >
          <Swiper
            effect={"coverflow"}
            preventClicks
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            spaceBetween={50}
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            slideToClickedSlide
            modules={[Autoplay, EffectCoverflow]}
          >
            {scenarios.map((scenario) => (
              <SwiperSlide key={scenario.title}>
                <ScenarioCard
                  key={scenario.title}
                  scenario={scenario}
                  isSelected={selectedScenario === scenario}
                  onDeslect={() => setSelectedScenario(null)}
                  onClick={() => {
                    setSelectedScenario(scenario);
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>
    </Box>
  );
}
