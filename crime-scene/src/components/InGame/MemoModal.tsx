import type {
  AdditionalQuestionType,
  DetectiveNoteType,
  SuspectType,
} from "@/types";
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FinalConfirmModal from "./FinalConfirmModal";

const INIT_NOTE: DetectiveNoteType = {
  accusedSuspect: "",
  howDunnit: "",
  whyDunnit: "",
  additionalQuestionAnswers: ["", "", "", ""],
  memo: "",
};

interface MemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  suspects: SuspectType[];
  questions: AdditionalQuestionType[];
  isAllClueSearched: boolean;
  scenarioKeyword: string;
}

export default function MemoModal({
  isOpen,
  onClose,
  suspects,
  questions,
  isAllClueSearched,
  scenarioKeyword,
}: MemoModalProps) {
  const router = useRouter();
  const [note, setNote] = useState<DetectiveNoteType>(INIT_NOTE);
  const [section, setSection] = useState<"main" | "additional">("main");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isFinalConfirmModalOpen, setIsFinalConfirmModalOpen] = useState(false);
  const [isUnsaveAlertModalOpen, setIsUnsaveAlertModalOpen] = useState(false);

  useEffect(() => {
    const savedNote = localStorage.getItem(scenarioKeyword);
    setNote(savedNote ? JSON.parse(savedNote) : INIT_NOTE);
  }, [scenarioKeyword]);

  const currentQuestion = questions[questionIndex];
  const isAllRequiredFilled = [
    note.accusedSuspect,
    note.howDunnit,
    note.whyDunnit,
  ].every((answer) => answer.trim().length > 0);

  const handleNoteSave = () => {
    localStorage.setItem(scenarioKeyword, JSON.stringify(note));
  };

  const isNoteChanged = () => {
    const savedNote = localStorage.getItem(scenarioKeyword);
    return (
      (!!savedNote && savedNote !== JSON.stringify(note)) ||
      (!savedNote && JSON.stringify(note) !== JSON.stringify(INIT_NOTE))
    );
  };

  return (
    <>
      <Dialog
        open={isOpen}
        fullWidth
        maxWidth="lg"
        slotProps={{
          paper: {
            sx: {
              height: "min(760px, calc(100dvh - 32px))",
              maxHeight: "calc(100dvh - 32px)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            },
          },
        }}
      >
        <DialogTitle
          sx={{ flexShrink: 0, borderBottom: 1, borderColor: "divider" }}
        >
          추리 노트
          <IconButton
            aria-label="추리 노트 닫기"
            onClick={() => {
              if (isNoteChanged()) {
                setIsUnsaveAlertModalOpen(true);
                return;
              }
              onClose();
            }}
            sx={{ position: "absolute", top: 5, right: 5 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              p: 3,
              minWidth: 0,
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Tabs
              value={section}
              onChange={(_event, value: "main" | "additional") =>
                setSection(value)
              }
              aria-label="추리 노트 항목"
              variant="fullWidth"
            >
              <Tab value="main" label="최종 추리" />
              <Tab
                value="additional"
                label={`추가 질문 (${questions.length})`}
                disabled={questions.length === 0}
              />
            </Tabs>

            <Box sx={{ pt: 3, flex: 1, minHeight: 0, overflow: "hidden" }}>
              {section === "main" ? (
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                >
                  <Box>
                    <Typography
                      component="label"
                      htmlFor="accused-suspect"
                      sx={{ display: "block", fontWeight: 700, mb: 1 }}
                    >
                      범인은 누구인가요?
                    </Typography>
                    <TextField
                      id="accused-suspect"
                      select
                      fullWidth
                      size="small"
                      required
                      value={note.accusedSuspect}
                      onChange={(event) =>
                        setNote({ ...note, accusedSuspect: event.target.value })
                      }
                    >
                      <MenuItem value="">
                        <em>용의자를 선택하세요</em>
                      </MenuItem>
                      {suspects.map((suspect) => (
                        <MenuItem key={suspect.name} value={suspect.name}>
                          {suspect.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                  <Box>
                    <Typography
                      component="label"
                      htmlFor="murder-method"
                      sx={{ display: "block", fontWeight: 700, mb: 1 }}
                    >
                      살해 방법은 무엇인가요?
                    </Typography>
                    <TextField
                      id="murder-method"
                      fullWidth
                      required
                      multiline
                      minRows={2}
                      maxRows={3}
                      value={note.howDunnit}
                      onChange={(event) =>
                        setNote({ ...note, howDunnit: event.target.value })
                      }
                    />
                  </Box>
                  <Box>
                    <Typography
                      component="label"
                      htmlFor="murder-motive"
                      sx={{ display: "block", fontWeight: 700, mb: 1 }}
                    >
                      살해 동기는 무엇인가요?
                    </Typography>
                    <TextField
                      id="murder-motive"
                      fullWidth
                      required
                      multiline
                      minRows={2}
                      maxRows={3}
                      value={note.whyDunnit}
                      onChange={(event) =>
                        setNote({ ...note, whyDunnit: event.target.value })
                      }
                    />
                  </Box>
                </Box>
              ) : currentQuestion ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    minHeight: 0,
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {questionIndex + 1} / {questions.length}
                  </Typography>
                  <Typography
                    sx={{ fontWeight: 700, mb: 2, wordBreak: "keep-all" }}
                  >
                    {currentQuestion.question}
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    aria-label={`${questionIndex + 1}번 추가 질문 답변`}
                    placeholder="답변"
                    value={note.additionalQuestionAnswers[questionIndex] ?? ""}
                    onChange={(event) => {
                      const answers = [...note.additionalQuestionAnswers];
                      answers[questionIndex] = event.target.value;
                      setNote({ ...note, additionalQuestionAnswers: answers });
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: "auto",
                      pt: 2,
                    }}
                  >
                    <Button
                      disabled={questionIndex === 0}
                      onClick={() => setQuestionIndex((index) => index - 1)}
                    >
                      이전 질문
                    </Button>
                    <Button
                      disabled={questionIndex === questions.length - 1}
                      onClick={() => setQuestionIndex((index) => index + 1)}
                    >
                      다음 질문
                    </Button>
                  </Box>
                </Box>
              ) : null}
            </Box>
          </Box>

          <Box
            sx={{
              p: 3,
              minWidth: 0,
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
              borderLeft: 1,
              borderColor: "divider",
            }}
          >
            <Typography
              component="label"
              htmlFor="detective-memo"
              sx={{ fontWeight: 700, mb: 2 }}
            >
              메모
            </Typography>
            <Box
              component="textarea"
              id="detective-memo"
              aria-label="추리 메모"
              placeholder="잊기 쉬운 용의자들의 알리바이, 증거 등을 메모해보세요."
              value={note.memo}
              onChange={(event) =>
                setNote({ ...note, memo: event.target.value })
              }
              sx={{
                flex: 1,
                minHeight: 0,
                width: "100%",
                boxSizing: "border-box",
                p: 2,
                resize: "none",
                overflowY: "auto",
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                bgcolor: "transparent",
                color: "text.primary",
                font: "inherit",
                lineHeight: 1.6,
                "&:focus-visible": {
                  outline: "2px solid",
                  outlineColor: "primary.main",
                },
              }}
            />
          </Box>
        </Box>

        <DialogActions
          sx={{
            flexShrink: 0,
            borderTop: 1,
            borderColor: "divider",
            px: 3,
            py: 2,
          }}
        >
          <Button
            size="large"
            onClick={() => {
              handleNoteSave();
              onClose();
            }}
          >
            저장하고 닫기
          </Button>
          <Button
            size="large"
            disabled={!isAllRequiredFilled}
            onClick={() => setIsFinalConfirmModalOpen(true)}
          >
            최종 제출
          </Button>
        </DialogActions>
      </Dialog>

      <FinalConfirmModal
        isOpen={isFinalConfirmModalOpen}
        isAllClueSearched={isAllClueSearched}
        suspect={suspects.find(
          (suspect) => suspect.name === note.accusedSuspect,
        )}
        onConfirm={() => {
          handleNoteSave();
          router.push(`/scenarios/scenario/${scenarioKeyword}/answer`);
        }}
        onClose={() => setIsFinalConfirmModalOpen(false)}
      />
      <Dialog open={isUnsaveAlertModalOpen}>
        <DialogTitle>저장되지 않은 변경 사항이 있습니다.</DialogTitle>
        <DialogContent>
          <DialogContentText>저장하고 닫으시겠습니까?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            onClick={() => {
              setIsUnsaveAlertModalOpen(false);
              onClose();
            }}
          >
            저장하지 않고 닫기
          </Button>
          <Button
            onClick={() => {
              handleNoteSave();
              setIsUnsaveAlertModalOpen(false);
              onClose();
            }}
          >
            저장하고 닫기
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
