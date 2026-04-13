import PlayButtonIcon from "@mui/icons-material/PlayCircleFilled";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { FadeInSection } from "./FadeInSection";
import { ShakeTextSection } from "./ShakeTextSection";

type AnswerRevealSequenceProps = {
  accusedText: string;
  culpritText: string;
  imageAlt?: string;
  imageSrc: string;
  methodText: string;
  motiveText: string;
  myMethodText: string;
  myMotiveText: string;
  resultText: string;
  showYouText?: boolean;
  targetText: string;
};

export function AnswerRevealSequence({
  accusedText,
  culpritText,
  imageAlt = "범인 공개 이미지",
  imageSrc,
  methodText,
  motiveText,
  myMethodText,
  myMotiveText,
  resultText,
  showYouText = true,
  targetText,
}: AnswerRevealSequenceProps) {
  return (
    <>
      <ShakeTextSection>
        <Typography variant="h1" color="white" mt={40} mb={20}>
          {accusedText}
        </Typography>
      </ShakeTextSection>

      <FadeInSection>
        <Box display="flex" justifyContent="center" mb={40}>
          <PlayButtonIcon
            sx={{
              opacity: 0.2,
              width: "50px",
              height: "50px",
              transform: "rotate(90deg)",
            }}
          />
        </Box>
      </FadeInSection>

      {showYouText && (
        <ShakeTextSection>
          <Typography variant="h1" color="white" mt={40} mb={20}>
            당신은
          </Typography>
        </ShakeTextSection>
      )}

      <ShakeTextSection>
        <Typography variant="h1" color="white" mt={70} mb={100}>
          {targetText}
        </Typography>
      </ShakeTextSection>

      <ShakeTextSection>
        <Typography variant="h1" color="white" fontWeight="bold" mt={50} mb={20}>
          {resultText}
        </Typography>
      </ShakeTextSection>

      <FadeInSection>
        <Box display="flex" justifyContent="center">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={800}
            height={400}
            style={{ objectFit: "contain" }}
          />
        </Box>
      </FadeInSection>

      <FadeInSection>
        <Box display="flex" justifyContent="center">
          <Typography variant="h2" color="white">
            진범: {culpritText}
          </Typography>
        </Box>
      </FadeInSection>

      <FadeInSection>
        <Box textAlign="center">
          <Typography variant="h5" color="white" mt={1}>
            {methodText}
          </Typography>
          <Typography variant="body2" color="gray">
            내 답변: {myMethodText}
          </Typography>
        </Box>
      </FadeInSection>

      <FadeInSection>
        <Box textAlign="center">
          <Typography variant="h5" color="white">
            {motiveText}
          </Typography>
          <Typography variant="body2" color="gray">
            내 답변: {myMotiveText}
          </Typography>
        </Box>
      </FadeInSection>
    </>
  );
}
