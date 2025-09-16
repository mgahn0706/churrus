import { SPELLING_BEES } from "@/features/spelling-bee/fixtures";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import GlobalHeader from "@/components/Navigation/GlobalHeader";
import Hive from "@/features/spelling-bee/components/Hive";
import { useMemo, useState } from "react";
import hangul from "hangul-js";
import ScoreSection from "@/features/spelling-bee/components/ScoreSection";
import useLocalStorage from "@/hooks/useLocalStorage";
import AnswersSection from "@/features/spelling-bee/components/AnswersSection";
import { HelpOutline, Lightbulb, LockOpen } from "@mui/icons-material";
import { KOREAN_NOUNS } from "@/fixtures/koreanNounList";
import { useResponsiveValue } from "@/hooks/useResponsiveValue";

dayjs.extend(weekOfYear);

const today = dayjs();
const spellingBeeDate = today.diff("2024-02-09", "day");
const TODAY_SPELLING_BEE = SPELLING_BEES[spellingBeeDate];

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

export default function SpellingBee() {
  if (!TODAY_SPELLING_BEE) {
    return <h1>Spelling Bee is not available for today {":("}</h1>;
  }

  const [validationMessage, setValidationMessage] = useState<{
    message: string;
    severity: "warning" | "success" | "error";
  } | null>(null);
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);

  // Answers persistence (backward compatible)
  const [answerData, setCurrentAnswers] = useLocalStorage<{
    day: number;
    answers: string[];
  }>("spelling-bee-answers", {
    day: spellingBeeDate,
    answers: [],
  });
  const currentAnswers =
    answerData.day === spellingBeeDate ? answerData.answers : [];

  // Pangram reveal persistence (separate key)
  const [revealData, setRevealData] = useLocalStorage<{
    day: number;
    words?: string[]; // revealed pangrams for the day
  }>("spelling-bee-pangram-reveal", { day: spellingBeeDate });

  const isMobileWidth = useResponsiveValue([true, true, false]);

  // Allowed letters for today
  const allowedLetters = useMemo(
    () =>
      new Set([
        ...TODAY_SPELLING_BEE.outerLetters,
        TODAY_SPELLING_BEE.centerLetter,
      ]),
    [TODAY_SPELLING_BEE]
  );

  // Compute pangram candidates from dictionary (명사만)
  const pangrams = useMemo(() => {
    const list: string[] = [];
    const iter: string[] = Array.isArray(KOREAN_NOUNS)
      ? (KOREAN_NOUNS as string[])
      : Array.from(KOREAN_NOUNS as Set<string>);

    for (const w of iter) {
      const j = hangul.disassemble(w);
      if (j.length < 4) continue;
      if (!j.includes(TODAY_SPELLING_BEE.centerLetter)) continue;
      if (j.some((ch) => !allowedLetters.has(ch))) continue;
      if (new Set(j).size !== 7) continue;
      list.push(w);
    }
    return Array.from(new Set(list)).sort((a, b) => a.length - b.length);
  }, [allowedLetters, TODAY_SPELLING_BEE.centerLetter]);

  // UI state for pangram reveal
  const [isRevealDialogOpen, setIsRevealDialogOpen] = useState(false);
  const alreadyRevealedToday =
    revealData.day === spellingBeeDate && !!revealData.words?.length;

  const handleReveal = () => {
    if (!pangrams.length) return;

    // persist reveal (all pangrams)
    setRevealData({ day: spellingBeeDate, words: pangrams });

    // add to answers if not present
    const newAnswers = [...currentAnswers];
    pangrams.forEach((p) => {
      if (!newAnswers.includes(p)) newAnswers.push(p);
    });
    setCurrentAnswers({ day: spellingBeeDate, answers: newAnswers });
    setValidationMessage({ message: "모든 팬그램 공개!", severity: "warning" });

    setIsRevealDialogOpen(false);
  };

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
          if (!isMobileWidth) {
            document.getElementById("spelling-bee-input")?.focus();
          }
        }}
        py="84px"
      >
        {/* Actions: top-right on desktop, inline on mobile */}
        {!isMobileWidth ? (
          <Stack
            position="fixed"
            top={84}
            right={10}
            direction="row"
            spacing={1}
          >
            <Tooltip title="게임 방법">
              <IconButton onClick={() => setIsRuleModalOpen(true)}>
                <HelpOutline fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={
                pangrams.length
                  ? `오늘의 팬그램 ${pangrams.length}개 모두 공개`
                  : "오늘 퍼즐에는 사전에 등록된 팬그램이 없어요"
              }
            >
              <span>
                <IconButton
                  size="small"
                  disabled={!pangrams.length || alreadyRevealedToday}
                  onClick={() => setIsRevealDialogOpen(true)}
                  sx={{ opacity: 0.7 }}
                >
                  <LockOpen fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
          </Stack>
        ) : (
          <Stack
            direction="row"
            spacing={1}
            position="absolute"
            top={70}
            right={16}
          >
            <IconButton onClick={() => setIsRuleModalOpen(true)} size="small">
              <HelpOutline fontSize="small" />
            </IconButton>
            <IconButton
              onClick={() => setIsRevealDialogOpen(true)}
              disabled={!pangrams.length || alreadyRevealedToday}
              size="small"
              sx={{
                opacity: !pangrams.length || alreadyRevealedToday ? 0.4 : 0.7,
              }}
            >
              <LockOpen fontSize="small" />
            </IconButton>
          </Stack>
        )}

        {/* Header */}
        <Box display="flex" gap={1} alignItems="center" mt={-1}>
          <Typography color="GrayText" variant="h6">
            {spellingBeeDate + 1}일째
          </Typography>
          <Typography fontSize="1.5rem" fontWeight="bold">
            스펠링 비
          </Typography>
          {alreadyRevealedToday && (
            <Stack direction="row" alignItems="center" gap={0.5} ml={1}>
              <Lightbulb fontSize="small" />
              <Typography color="GrayText" variant="body2">
                팬그램 공개됨
              </Typography>
            </Stack>
          )}
        </Box>

        {/* Score */}
        <ScoreSection
          fullScore={TODAY_SPELLING_BEE.fullScore}
          currentAnswers={currentAnswers}
        />

        {/* Found answers */}
        <AnswersSection
          currentAnswers={currentAnswers.map((answer) => {
            return {
              word: answer,
              isPangram: new Set(hangul.disassemble(answer)).size === 7,
            };
          })}
        />

        {/* Main hive */}
        <Box position="relative" width="100%">
          {validationMessage && (
            <Snackbar
              open={!!validationMessage}
              anchorOrigin={{
                vertical: isMobileWidth ? "bottom" : "top",
                horizontal: "center",
              }}
              autoHideDuration={2000}
              onClose={() => setValidationMessage(null)}
            >
              <Alert
                icon={false}
                severity={validationMessage.severity}
                variant={
                  validationMessage.message.includes("팬그램")
                    ? "filled"
                    : "standard"
                }
                sx={{ width: "fit-content", mt: 12 }}
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
              if (!KOREAN_NOUNS.has(hangul.assemble(input))) {
                setValidationMessage({
                  severity: "error",
                  message: "표준어사전에 없는 단어입니다. 명사만 가능합니다.",
                });
                return;
              }

              const assembled = hangul.assemble(input);
              setValidationMessage(answerMessage(assembled));
              setCurrentAnswers({
                day: spellingBeeDate,
                answers: [...currentAnswers, assembled],
              });
            }}
          />
        </Box>

        {isMobileWidth && <Box height={72} />}
      </Box>

      {/* Pangram reveal confirm dialog */}
      <Dialog
        open={isRevealDialogOpen}
        onClose={() => setIsRevealDialogOpen(false)}
      >
        <DialogTitle>팬그램 공개</DialogTitle>
        <DialogContent>
          {pangrams.length ? (
            <DialogContentText sx={{ whiteSpace: "pre-line" }}>
              오늘 퍼즐의 팬그램은 총 {pangrams.length}개 입니다.\n 공개를
              선택하면 <strong>모든 팬그램</strong>이 정답 목록에 자동으로
              추가됩니다.\n정답을 스스로 찾고 싶다면 취소하세요.
            </DialogContentText>
          ) : (
            <DialogContentText>
              오늘 퍼즐에는 사전에 등록된 팬그램이 없습니다.
            </DialogContentText>
          )}
          {revealData.words && revealData.day === spellingBeeDate && (
            <Box mt={2} p={1.5} borderRadius={1} sx={{ bgcolor: "#fff7e6" }}>
              <Typography variant="body2" fontWeight={700} gutterBottom>
                공개된 팬그램들
              </Typography>
              {revealData.words.map((w) => (
                <Typography key={w} variant="h6" color="#de9f0d">
                  {w}
                </Typography>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsRevealDialogOpen(false)}>취소</Button>
          <Button
            onClick={handleReveal}
            variant="contained"
            disabled={!pangrams.length}
            startIcon={<LockOpen />}
            size="small"
            sx={{ opacity: 0.8 }}
          >
            공개하기
          </Button>
        </DialogActions>
      </Dialog>
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
          <Typography component="span" color="#de9f0d" fontWeight="bold">
            팬그램!
          </Typography>
          입니다. 각 퍼즐에는 최소 하나의 팬그램이 있습니다.
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
