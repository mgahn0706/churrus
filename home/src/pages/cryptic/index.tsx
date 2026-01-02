"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Input,
  Chip,
  Snackbar,
  Alert,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Check,
  HelpOutline,
  NavigateBefore,
  NavigateNext,
} from "@mui/icons-material";
import HomeButton from "@/components/HomeButton";
import { getChoseong } from "es-hangul";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { CRYPTIC_PROBLEMS } from "@/features/cryptic/fixtures";

dayjs.extend(weekOfYear);

/* ===================== Data (예시) ===================== */
/**
 * ✅ 너는 여기만 네 데이터로 바꿔 끼우면 됨.
 * 구조는 Connections랑 동일하게:
 * CRYPTIC_PROBLEMS[year] = [{ week: 1, problem, answer, definitionPart, wordplayPart }, ...]
 */

/* ===================== Types ===================== */

type HighlightSegment = {
  text: string;
  type: "definition" | "wordplay" | "normal";
};

/* ===================== Utils ===================== */

function splitWithHighlights(
  full: string,
  definition: string,
  wordplay: string
): HighlightSegment[] {
  const defIndex = full.indexOf(definition);
  const wpIndex = full.indexOf(wordplay);

  if (defIndex === -1 || wpIndex === -1)
    return [{ text: full, type: "normal" }];

  const parts = [
    { text: definition, type: "definition" as const, index: defIndex },
    { text: wordplay, type: "wordplay" as const, index: wpIndex },
  ].sort((a, b) => a.index - b.index);

  const segments: HighlightSegment[] = [];
  let cursor = 0;

  for (const part of parts) {
    if (cursor < part.index) {
      segments.push({ text: full.slice(cursor, part.index), type: "normal" });
    }
    segments.push({ text: part.text, type: part.type });
    cursor = part.index + part.text.length;
  }

  if (cursor < full.length) {
    segments.push({ text: full.slice(cursor), type: "normal" });
  }

  return segments;
}

/* ===================== Page ===================== */

export default function CrypticPage() {
  const today = dayjs();

  /** ✅ Stepper state */
  const [crypticDate, setCrypticDate] = useState(() => {
    const y = today.year();
    const w = today.week();
    // 기본: 해당 연도 데이터 없으면 가장 첫 연도로
    const years = Object.keys(CRYPTIC_PROBLEMS)
      .map(Number)
      .sort((a, b) => a - b);
    const defaultYear = CRYPTIC_PROBLEMS[y] ? y : years[years.length - 1] ?? y;
    const defaultWeek = Math.min(
      w,
      (CRYPTIC_PROBLEMS[defaultYear]?.length ?? 1) || 1
    );
    return { year: defaultYear, week: defaultWeek };
  });

  const selectedCryptic = useMemo(() => {
    const list = CRYPTIC_PROBLEMS[crypticDate.year] ?? [];
    const idx = Math.min(crypticDate.week - 1, Math.max(list.length - 1, 0));
    return list[idx];
  }, [crypticDate]);

  /** ✅ 퍼즐이 바뀌면 상태 리셋 */
  const resetCryptic = () => {
    setAnswer("");
    setHintStep(0);
    setIsSolved(false);
    setShake(false);
  };

  useEffect(() => {
    resetCryptic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crypticDate.year, crypticDate.week]);

  if (!selectedCryptic) return null;

  const ANSWER_LENGTH = selectedCryptic.answer.length;
  const CHOSEONGS = getChoseong(selectedCryptic.answer);
  const MAX_HINT_STEP = ANSWER_LENGTH + 1;

  const clueSegments = splitWithHighlights(
    selectedCryptic.problem,
    selectedCryptic.definitionPart,
    selectedCryptic.wordplayPart
  );

  function getHintMessage(hintStep: number) {
    if (hintStep <= 0) return "";
    if (hintStep <= ANSWER_LENGTH)
      return `초성이 ${hintStep}개 공개되었습니다.`;
    return "정의(노랑)와 말장난(하늘)이 표시되었습니다.";
  }

  /* ===================== Local UI state ===================== */

  const [answer, setAnswer] = useState("");
  const [hintStep, setHintStep] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [shake, setShake] = useState(false);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
    "success"
  );
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);

  /* ===================== Slot Display ===================== */

  const displaySlotChar = (index: number) => {
    if (isSolved) return selectedCryptic.answer[index];
    if (answer[index]) return answer[index];
    if (hintStep >= index + 1) return CHOSEONGS[index];
    return "";
  };

  const getSlotColor = (index: number) => {
    if (isSolved) return "#000";
    if (!answer[index] && hintStep >= index + 1) return "#9ca3af";
    return "#000";
  };

  /* ===================== Submit ===================== */

  const handleSubmit = () => {
    if (answer.length !== ANSWER_LENGTH || isSolved) return;

    if (answer === selectedCryptic.answer) {
      setIsSolved(true);
      setToastMessage("정답입니다!");
      setToastSeverity("success");
      setToastOpen(true);
      setHintStep(MAX_HINT_STEP);
    } else {
      setToastMessage("정답이 아닙니다");
      setToastSeverity("error");
      setToastOpen(true);

      setShake(true);
      setTimeout(() => setShake(false), 300);
    }
  };

  const isHighlightOn = hintStep === MAX_HINT_STEP;

  /* ===================== Stepper ===================== */

  const CrypticStepper = () => {
    const years = Object.keys(CRYPTIC_PROBLEMS)
      .map(Number)
      .sort((a, b) => a - b);
    const yearList = CRYPTIC_PROBLEMS[crypticDate.year] ?? [];

    const disablePrev =
      selectedCryptic.week === 1 && crypticDate.year === years[0];

    const disableNext =
      crypticDate.year === today.year() && crypticDate.week === today.week();

    return (
      <Box
        display="flex"
        gap={2}
        mt={8}
        mb={2}
        justifyContent="center"
        alignItems="center"
      >
        <IconButton
          disabled={disablePrev}
          color="primary"
          onClick={() => {
            setCrypticDate((prev) => {
              if (selectedCryptic.week === 1) {
                const prevYear = prev.year - 1;
                const prevLen = CRYPTIC_PROBLEMS[prevYear]?.length ?? 1;
                return { year: prevYear, week: prevLen };
              }
              return { year: prev.year, week: prev.week - 1 };
            });
          }}
        >
          <NavigateBefore />
        </IconButton>

        <Box display="flex" flexDirection="column" alignItems="center">
          {/* Year */}
          <FormControl variant="standard" sx={{ minWidth: 90 }} size="small">
            <Select
              key={crypticDate.year}
              value={crypticDate.year}
              disableUnderline
              onChange={(e) => {
                setCrypticDate({ year: Number(e.target.value), week: 1 });
              }}
              inputProps={{
                IconComponent: () => null,
                sx: {
                  padding: "0 !important",
                  border: "0 !important",
                  textAlign: "center", // ✅ 핵심 1
                },
              }}
              sx={{
                fontSize: "1rem",
                textAlign: "center", // ✅ 핵심 2
                "& .MuiSelect-select": {
                  textAlign: "center", // ✅ 핵심 3 (실제 표시 텍스트)
                },
              }}
            >
              {years.map((y) => (
                <MenuItem
                  key={y}
                  value={y}
                  sx={{ justifyContent: "center" }} // 드롭다운도 가운데
                >
                  {y}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Week (이미 bold라 OK) */}
          <FormControl variant="standard" sx={{ mt: "2px" }}>
            <Select
              value={crypticDate.week}
              disableUnderline
              onChange={(e) => {
                setCrypticDate({
                  year: crypticDate.year,
                  week: Number(e.target.value),
                });
              }}
              inputProps={{
                IconComponent: () => null,
                sx: {
                  padding: "0 !important",
                  border: "0 !important",
                  textAlign: "center",
                },
              }}
              sx={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                textAlign: "center",
                "& .MuiSelect-select": {
                  textAlign: "center",
                },
              }}
            >
              {yearList
                .slice(0, today.year() === crypticDate.year ? today.week() : 53)
                .map((w) => (
                  <MenuItem
                    key={w.week}
                    value={w.week}
                    sx={{ justifyContent: "center" }}
                  >
                    Week {w.week}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>

        <IconButton
          disabled={disableNext}
          color="primary"
          onClick={() => {
            setCrypticDate((prev) => {
              const len = CRYPTIC_PROBLEMS[prev.year]?.length ?? 1;
              if (selectedCryptic.week === len) {
                return { year: prev.year + 1, week: 1 };
              }
              return { year: prev.year, week: prev.week + 1 };
            });
          }}
        >
          <NavigateNext />
        </IconButton>
      </Box>
    );
  };

  /* ===================== Render ===================== */

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      px={2}
    >
      <HomeButton />

      {/* Help */}
      <Box position="fixed" right={0} top={0} p={2}>
        <IconButton onClick={() => setIsRuleModalOpen(true)}>
          <HelpOutline />
        </IconButton>
      </Box>

      <RuleModal
        isOpen={isRuleModalOpen}
        onClose={() => setIsRuleModalOpen(false)}
      />

      <Box
        width="100%"
        display="flex"
        justifyContent={{
          xs: "center", // mobile
          md: "flex-start", // pc
        }}
      >
        <Box ml={{ xs: 0, md: 4 }} mt={{ xs: 0, md: 2 }}>
          <CrypticStepper />
        </Box>
      </Box>

      {/* Header */}
      <Box mb={2}>
        <Chip
          label={`${selectedCryptic.week}주차 추러스 말장난`}
          variant="outlined"
          sx={{
            borderRadius: "999px",
            fontSize: 13,
            fontWeight: 500,
            bgcolor: "#f3f3f3",
          }}
        />
      </Box>

      {/* Answer Slots */}
      <Box
        display="flex"
        border="2px solid #000"
        borderRadius="6px"
        overflow="hidden"
        mb={4}
        sx={{
          ...(shake && { animation: "shake 0.3s" }),
          "@keyframes shake": {
            "0%": { transform: "translateX(0)" },
            "20%": { transform: "translateX(-6px)" },
            "40%": { transform: "translateX(6px)" },
            "60%": { transform: "translateX(-6px)" },
            "80%": { transform: "translateX(6px)" },
            "100%": { transform: "translateX(0)" },
          },
        }}
      >
        {Array.from({ length: ANSWER_LENGTH }).map((_, i) => (
          <Box
            key={i}
            width={48}
            height={52}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRight={i === ANSWER_LENGTH - 1 ? "none" : "1px solid #000"}
          >
            <Typography fontSize={20} fontWeight={700} color={getSlotColor(i)}>
              {displaySlotChar(i)}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Clue */}
      <Typography textAlign="center" fontSize={18} lineHeight={1.6} mb={4}>
        {isHighlightOn
          ? clueSegments.map((seg, i) => (
              <Box
                key={i}
                component="span"
                px={seg.type === "normal" ? 0 : 0.5}
                borderRadius={1}
                fontWeight={seg.type === "normal" ? 400 : 500}
                bgcolor={
                  seg.type === "definition"
                    ? "#fff3a0"
                    : seg.type === "wordplay"
                    ? "#dbeafe"
                    : "transparent"
                }
              >
                {seg.text}
              </Box>
            ))
          : selectedCryptic.problem}
        <Box component="span" color="text.secondary">
          {" "}
          ({ANSWER_LENGTH})
        </Box>
      </Typography>

      {/* Hint Box */}
      <Box
        bgcolor="#eaf2ff"
        borderRadius="14px"
        px={3}
        py={2}
        maxWidth={420}
        textAlign="center"
        mb={4}
        minHeight={80}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        sx={{ visibility: hintStep > 0 ? "visible" : "hidden" }}
      >
        <Typography fontWeight={600} mb={0.5}>
          힌트
        </Typography>

        <Typography>{getHintMessage(hintStep)}</Typography>

        {hintStep >= 1 && hintStep <= ANSWER_LENGTH && (
          <Typography mt={0.5} fontSize={14} color="text.secondary">
            초성: {CHOSEONGS.slice(0, hintStep)}
          </Typography>
        )}
      </Box>

      {/* Bottom Bar */}
      <Box
        width="100%"
        maxWidth={420}
        position="sticky"
        bottom={0}
        pt={2}
        pb="calc(16px + env(safe-area-inset-bottom))"
      >
        <Box mb={2}>
          <Chip
            label={`💡 힌트 ${hintStep}/${MAX_HINT_STEP}`}
            variant="outlined"
            clickable
            disabled={isSolved}
            onClick={() => setHintStep((p) => (p < MAX_HINT_STEP ? p + 1 : p))}
            sx={{ borderRadius: "999px", fontWeight: 500 }}
          />
        </Box>

        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          display="flex"
          gap={1}
        >
          <Input
            fullWidth
            disabled={isSolved}
            placeholder="여기에 답을 입력하세요"
            value={answer}
            onChange={(e) => setAnswer(e.target.value.slice(0, ANSWER_LENGTH))}
            sx={{ height: 44, px: 2, borderRadius: "12px", fontSize: 16 }}
          />
          <IconButton
            type="submit"
            disabled={isSolved}
            sx={{
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              width: 44,
              height: 44,
              color: "#16a34a",
            }}
          >
            <Check />
          </IconButton>
        </Box>
      </Box>

      {/* Toast */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={2000}
        onClose={() => setToastOpen(false)}
      >
        <Alert severity={toastSeverity} variant="filled">
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

/* ===================== Rule Modal ===================== */

const RuleModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => (
  <Dialog open={isOpen} onClose={onClose}>
    <DialogTitle>게임 방법</DialogTitle>
    <DialogContent>
      <DialogContentText fontWeight="bold" mb={2}>
        크립틱 퍼즐의 단서는 두 부분으로 이루어져 있습니다.
      </DialogContentText>
      <DialogContentText mb={2}>
        • <b>정의</b>: 정답의 뜻<br />• <b>말장난</b>: 글자를 만드는 규칙
      </DialogContentText>
      <DialogContentText>
        힌트는 초성 → 전부 → 정의/말장난 순서로 공개됩니다.
      </DialogContentText>
    </DialogContent>
  </Dialog>
);
