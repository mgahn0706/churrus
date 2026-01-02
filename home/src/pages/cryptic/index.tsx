"use client";

import { useState, useMemo } from "react";
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
} from "@mui/material";
import { Check, HelpOutline } from "@mui/icons-material";
import HomeButton from "@/components/HomeButton";
import { getChoseong } from "es-hangul";

/* ===================== Problem ===================== */

const problem = {
  problem: "꼿꼿한 도장 식물",
  answer: "선인장",
  definitionPart: "식물",
  wordplayPart: "꼿꼿한 도장",
};

/* ===================== Constants ===================== */

const ANSWER_LENGTH = problem.answer.length;

/* ===================== Hint Messages ===================== */

const HINT_MESSAGES: Record<number, string> = {
  1: "초성이 공개되었습니다.",
  2: "정의 부분(노랑)과 말장난 부분(하늘)이 표시되었습니다.",
  3: "랜덤한 한 글자가 공개되었습니다.",
  4: "정답이 모두 공개되었습니다.",
};

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

  if (defIndex === -1 || wpIndex === -1) {
    return [{ text: full, type: "normal" }];
  }

  const parts = [
    { text: definition, type: "definition" as const, index: defIndex },
    { text: wordplay, type: "wordplay" as const, index: wpIndex },
  ].sort((a, b) => a.index - b.index);

  const segments: HighlightSegment[] = [];
  let cursor = 0;

  for (const part of parts) {
    if (cursor < part.index) {
      segments.push({
        text: full.slice(cursor, part.index),
        type: "normal",
      });
    }

    segments.push({
      text: part.text,
      type: part.type,
    });

    cursor = part.index + part.text.length;
  }

  if (cursor < full.length) {
    segments.push({
      text: full.slice(cursor),
      type: "normal",
    });
  }

  return segments;
}

/* ===================== Page ===================== */

export default function CrypticPage() {
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

  /* ===================== Random Hint Index ===================== */
  // 퍼즐마다 1회만 결정되는 랜덤 인덱스
  const randomHintIndex = useMemo(() => {
    return Math.floor(Math.random() * ANSWER_LENGTH);
  }, []);

  const clueSegments = splitWithHighlights(
    problem.problem,
    problem.definitionPart,
    problem.wordplayPart
  );

  const displayChar = (index: number) => {
    if (hintStep >= 4 || isSolved) return problem.answer[index] ?? "";
    if (hintStep >= 3 && index === randomHintIndex)
      return problem.answer[index];
    return answer[index] ?? "";
  };

  const handleSubmit = () => {
    if (answer.length !== ANSWER_LENGTH || isSolved) return;

    if (answer === problem.answer) {
      setIsSolved(true);
      setHintStep(4);
      setToastMessage("정답입니다!");
      setToastSeverity("success");
      setToastOpen(true);
    } else {
      setToastMessage("정답이 아닙니다");
      setToastSeverity("error");
      setToastOpen(true);

      setShake(true);
      setTimeout(() => setShake(false), 300);
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      px={2}
      bgcolor="#ffffff"
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

      {/* Header */}
      <Box mt={8} mb={3}>
        <Chip
          label={`1주차 추러스 크립틱`}
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
            bgcolor={
              isSolved
                ? "#bbf7d0"
                : hintStep >= 3 && i === randomHintIndex
                ? "#dcfce7"
                : "#ffffff"
            }
          >
            <Typography fontSize={20} fontWeight={700}>
              {displayChar(i)}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Clue */}
      <Typography textAlign="center" fontSize={18} lineHeight={1.6} mb={4}>
        {hintStep >= 2
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
          : problem.problem}
        <Box component="span" color="text.secondary">
          {" "}
          ({ANSWER_LENGTH})
        </Box>
      </Typography>

      {/* Hint box */}
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

        <Typography>{HINT_MESSAGES[hintStep]}</Typography>

        {hintStep === 1 && (
          <Typography mt={0.5} fontSize={14} color="text.secondary">
            초성: {getChoseong(problem.answer)}
          </Typography>
        )}
      </Box>

      {/* Bottom Bar */}
      <Box
        width="100%"
        maxWidth={420}
        position="sticky"
        bottom={0}
        bgcolor="#ffffff"
        pt={2}
        pb="calc(16px + env(safe-area-inset-bottom))"
      >
        <Box mb={2}>
          <Chip
            label={`💡 힌트 ${hintStep}/4`}
            variant="outlined"
            clickable
            disabled={isSolved}
            onClick={() => setHintStep((prev) => (prev < 4 ? prev + 1 : prev))}
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
            inputProps={{
              inputMode: "text",
              enterKeyHint: "done",
            }}
            sx={{
              height: 44,
              px: 2,
              borderRadius: "12px",
              fontSize: 16,
            }}
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
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToastOpen(false)}
          severity={toastSeverity}
          variant="filled"
          sx={{ borderRadius: "12px", fontWeight: 500 }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
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
          mb={2}
        >
          크립틱 퍼즐의 단서는 두 부분으로 이루어져 있습니다.
        </DialogContentText>

        <DialogContentText mb={2}>
          각 단서에는 반드시
          <br />• <b>정의</b> (정답의 뜻)
          <br />• <b>말장난</b> (글자를 만드는 규칙)
          <br />이 모두 포함되어 있습니다.
        </DialogContentText>

        <DialogContentText mb={2}>
          단서는 문장처럼 보이지만,
          <br />
          그대로 읽으면 안 되고 퍼즐처럼 해석해야 합니다.
        </DialogContentText>

        <DialogContentText mb={2}>
          예시:
          <br />
          <b>꼿꼿한 도장 식물 (3)</b>
          <br />
          → 정의: 식물
          <br />→ 말장난: 꼿꼿한 도장
        </DialogContentText>

        <DialogContentText mb={2}>
          이 두 힌트를 조합해
          <br />
          글자 수에 맞는 하나의 단어를 만들어 보세요.
        </DialogContentText>

        <DialogContentText mb={2}>
          힌트는 단계별로 점점 더 직접적으로 공개됩니다.
          <br />
          💡 초성 → 구조 → 글자 → 정답
        </DialogContentText>

        <DialogContentText mb={2}>
          크립틱 퍼즐은 감으로 맞히는 게임이 아닙니다.
          <br />
          단서 안에는 항상 정답을 만들 수 있는 정보가 모두 들어 있습니다.
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
