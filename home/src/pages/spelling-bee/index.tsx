import { SPELLING_BEES } from "@/features/spelling-bee/fixtures";
import {
  Alert,
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import GlobalHeader from "@/components/Navigation/GlobalHeader";
import Hive from "@/features/spelling-bee/components/Hive";
import { useState } from "react";
import hangul from "hangul-js";
import ScoreSection from "@/features/spelling-bee/components/ScoreSection";
import useLocalStorage from "@/hooks/useLocalStorage";
import AnswersSection from "@/features/spelling-bee/components/AnswersSection";
import HomeButton from "@/components/HomeButton";
import { HelpOutline } from "@mui/icons-material";

dayjs.extend(weekOfYear);

const today = dayjs();

const spellingBeeDate = {
  year: today.get("year"),
  week: today.week(),
};

const TODAY_SPELLING_BEE = SPELLING_BEES[spellingBeeDate.year].find(
  (spellingBee) => spellingBee.week === spellingBeeDate.week
);

const answerMessage = (
  answer: string
): {
  message: string;
  severity: "warning" | "success" | "error";
} => {
  const score = hangul.disassemble(answer).length;
  const isPangram = new Set(hangul.disassemble(answer)).size === 7;
  if (score === 4 || score === 5) {
    return { message: "좋아요!", severity: "success" };
  }
  if (score === 6) {
    return { message: "잘했어요!", severity: "success" };
  }
  if (isPangram) {
    return { message: "팬그램!", severity: "warning" };
  }
  return { message: "놀라워요!", severity: "success" };
};

const fullScore =
  (TODAY_SPELLING_BEE?.answers.common.reduce(
    (acc, answer) => acc + hangul.disassemble(answer).length,
    0
  ) ?? 0) + (TODAY_SPELLING_BEE?.answers.uncommon.length ?? 0);

export default function SpellingBee() {
  if (!TODAY_SPELLING_BEE) {
    return <h1>Spelling Bee is not available for today {":("}</h1>;
  }

  const [validationMessage, setValidationMessage] = useState<{
    message: string;
    severity: "warning" | "success" | "error";
  } | null>(null);
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
  const [currentAnswers, setCurrentAnswers] = useLocalStorage<string[]>(
    "spelling-bee-answers",
    []
  );

  return (
    <>
      <GlobalHeader />
      <RuleModal
        isOpen={isRuleModalOpen}
        onClose={() => setIsRuleModalOpen(false)}
      />
      <Box
        overflow="hidden"
        display="flex"
        alignItems="center"
        flexDirection="column"
        px="30px"
        minHeight="80dvh"
        onClick={() => {
          document.getElementById("spelling-bee-input")?.focus();
        }}
        py="84px"
      >
        <Box position="fixed" top="84px" right={10}>
          <IconButton
            onClick={() => {
              setIsRuleModalOpen(true);
            }}
          >
            <HelpOutline />
          </IconButton>
        </Box>
        <Box display="flex" gap={1} alignItems="center">
          <Typography fontSize="1.5rem" fontWeight="bold">
            스펠링 비
          </Typography>
        </Box>
        <Typography color="GrayText" variant="h6">
          {TODAY_SPELLING_BEE.week}주차
        </Typography>

        <ScoreSection fullScore={fullScore} currentAnswers={currentAnswers} />
        <AnswersSection
          currentAnswers={currentAnswers.map((answer) => {
            return {
              word: answer,
              isPangram: new Set(hangul.disassemble(answer)).size === 7,
            };
          })}
        />

        <Box position="relative" width="100%">
          {validationMessage && (
            <Snackbar
              open={!!validationMessage}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              autoHideDuration={2000}
              onClose={() => setValidationMessage(null)}
            >
              <Alert
                icon={false}
                severity={validationMessage.severity}
                variant={
                  validationMessage.message === "팬그램!"
                    ? "filled"
                    : "standard"
                }
                sx={{
                  width: "fit-content",
                  mt: 12,
                }}
              >
                {validationMessage.message}
              </Alert>
            </Snackbar>
          )}
          <Hive
            centerLetter={TODAY_SPELLING_BEE.centerLetter}
            outerLetters={TODAY_SPELLING_BEE.outerLetters}
            onSubmit={(input) => {
              if (input.length < 4) {
                setValidationMessage({
                  severity: "error",
                  message: "4개 미만의 글자로 이루어진 단어입니다.",
                });
                return;
              }
              if (currentAnswers.includes(hangul.assemble(input))) {
                setValidationMessage({
                  severity: "error",
                  message: "이미 찾은 단어입니다.",
                });
                return;
              }
              if (!input.includes(TODAY_SPELLING_BEE.centerLetter)) {
                setValidationMessage({
                  severity: "error",
                  message: "가운데 글자를 포함하지 않은 단어입니다.",
                });
                return;
              }
              if (
                input.some(
                  (char) =>
                    !TODAY_SPELLING_BEE.outerLetters.includes(char) &&
                    char !== TODAY_SPELLING_BEE.centerLetter
                )
              ) {
                setValidationMessage({
                  severity: "error",
                  message: "주어지지 않은 글자가 포함된 단어입니다.",
                });
                return;
              }
              if (
                !TODAY_SPELLING_BEE.answers.common.includes(
                  hangul.assemble(input)
                ) &&
                !TODAY_SPELLING_BEE.answers.uncommon.includes(
                  hangul.assemble(input)
                )
              ) {
                setValidationMessage({
                  severity: "error",
                  message: "표준어사전에 없는 단어입니다. 명사만 가능합니다.",
                });
                return;
              }

              setValidationMessage(answerMessage(hangul.assemble(input)));
              setCurrentAnswers([...currentAnswers, hangul.assemble(input)]);
            }}
          />
        </Box>
      </Box>
    </>
  );
}

const RuleModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>게임 방법</DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{ whiteSpace: "pre-line" }}
          color="black"
          fontWeight="bold"
        >
          벌집 모양 퍼즐에 주어진 글자를 4개 이상 사용하여 단어를 만들어보세요.
        </DialogContentText>
        <DialogContentText mb={2}>
          단어는 가운데 글자를 포함해야 하며, 주어진 글자만을 사용해야 합니다.
        </DialogContentText>
        <DialogContentText mb={2}>
          표준어대사전에 실린 단어만 입력 가능하며, 명사만 입력이 가능합니다.
        </DialogContentText>
        <DialogContentText mb={2}>
          단어를 입력하면 단어에 사용된 글자 수에 따라 점수가 부여됩니다. <br />
          4글자 : 4점 <br />
          5글자 : 5점 <br />
          6글자 : 6점 ...
        </DialogContentText>
        <DialogContentText mb={2}>
          모든 글자를 사용하여 단어를 만들면{" "}
          <Typography color="#de9f0d" fontWeight="bold">
            팬그램!
          </Typography>
          입니다. 각 퍼즐에는 최소 하나의 팬그램이 있습니다.
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
