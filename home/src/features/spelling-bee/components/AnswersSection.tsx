import { ArrowDownward, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function AnswersSection({
  currentAnswers,
}: {
  currentAnswers: { word: string; isPangram: boolean }[];
}) {
  const [isAnswerAccordionOpen, setIsAnswerAccordionOpen] = useState(false);
  return (
    <Box
      display="flex"
      justifyContent="center"
      mt={2}
      width={1}
      maxWidth="500px"
    >
      <Accordion
        expanded={isAnswerAccordionOpen}
        onChange={() => {
          setIsAnswerAccordionOpen(!isAnswerAccordionOpen);
        }}
        sx={{
          width: "100%",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          sx={{
            width: "100%",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            width="100%"
            overflow="hidden"
          >
            {isAnswerAccordionOpen
              ? `${currentAnswers.length}개의 단어를 찾았습니다.`
              : [...currentAnswers]
                  .map((answer) => (
                    <Typography
                      sx={{
                        mr: 1,
                      }}
                      key={answer.word}
                      fontWeight={answer.isPangram ? "bold" : "normal"}
                    >
                      {answer.word}
                    </Typography>
                  ))
                  .reverse()
                  .slice(0, 9)}
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            display="flex"
            maxHeight="calc(100vh - 350px)"
            flexWrap="wrap"
            sx={{
              flexFlow: "column wrap",
            }}
          >
            {[...currentAnswers]
              .sort((a, b) => a.word.localeCompare(b.word))
              .map((answer) => (
                <Box py="1px" px="12px">
                  <Typography
                    fontWeight={answer.isPangram ? "bold" : "normal"}
                    key={answer.word}
                  >
                    {answer.word}
                  </Typography>
                  <Divider />
                </Box>
              ))}
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
