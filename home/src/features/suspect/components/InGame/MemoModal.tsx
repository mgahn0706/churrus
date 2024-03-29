import {
  AdditionalQuestionType,
  DetectiveNoteType,
  SuspectType,
} from "@/features/suspect/types";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import FinalConfirmModal from "./FinalConfirmModal";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Close } from "@mui/icons-material";

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
  const [isFinalConfirmModalOpen, setIsFinalConfirmModalOpen] = useState(false);
  const [isUnsaveAlertModalOpen, setIsUnsaveAlertModalOpen] = useState(false);
  const handleNoteSave = () => {
    localStorage.setItem(scenarioKeyword, JSON.stringify(note));
  };
  const handleSetNote = () => {
    const savedNote = localStorage.getItem(scenarioKeyword);
    if (savedNote) {
      setNote({
        ...JSON.parse(savedNote),
      });
    }
  };

  const INIT_NOTE: DetectiveNoteType = {
    accusedSuspect: "",
    howDunnit: "",
    whyDunnit: "",
    additionalQuestionAnswers: ["", "", "", ""],
    memo: "",
  };

  const [note, setNote] = useState<DetectiveNoteType>(INIT_NOTE);

  const router = useRouter();

  useEffect(() => {
    handleSetNote();
  }, []);

  const isAllRequiredFilled =
    note.accusedSuspect && note.howDunnit && note.whyDunnit;

  const isNoteChanged = () => {
    const savedNote = localStorage.getItem(scenarioKeyword);
    return (
      (!!savedNote && savedNote !== JSON.stringify(note)) ||
      (!savedNote && JSON.stringify(note) !== JSON.stringify(INIT_NOTE))
    );
  };

  const requiredInputBadge = (
    <Typography color="error" ml={1}>
      *
    </Typography>
  );

  return (
    <>
      <Dialog open={isOpen} fullWidth maxWidth="lg">
        <DialogTitle>
          추리 노트
          <IconButton
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
        <Box display="flex" width="100%" justifyContent="space-around">
          <Box width={550}>
            <DialogContent>
              <Box mb={2}>
                <InputLabel
                  id="whodunnit"
                  sx={{ fontWeight: "bold", display: "flex" }}
                >
                  범인은 누구인가요? {requiredInputBadge}
                </InputLabel>
                <Select
                  id="whodunnit"
                  autoWidth={false}
                  required
                  sx={{
                    width: 100,
                  }}
                  value={note.accusedSuspect}
                  onChange={(e) =>
                    setNote({ ...note, accusedSuspect: e.target.value })
                  }
                >
                  <MenuItem value="">
                    {" "}
                    <em>선택 안됨</em>
                  </MenuItem>
                  {suspects.map((suspect) => (
                    <MenuItem key={suspect.name} value={suspect.name}>
                      {suspect.name ?? "선택 안됨"}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box mb={2}>
                {" "}
                <InputLabel
                  id="howdunnit"
                  sx={{ fontWeight: "bold", display: "flex" }}
                >
                  살해 방법은 무엇인가요? {requiredInputBadge}
                </InputLabel>
                <TextField
                  fullWidth
                  id="howdunnit"
                  required
                  placeholder="살해 방법"
                  value={note.howDunnit}
                  onChange={(e) =>
                    setNote({ ...note, howDunnit: e.target.value })
                  }
                />
              </Box>
              <InputLabel
                id="whydunnit"
                sx={{ fontWeight: "bold", display: "flex" }}
              >
                살해 동기는 무엇인가요? {requiredInputBadge}
              </InputLabel>{" "}
              <TextField
                id="whydunnit"
                fullWidth
                required
                placeholder="살해 동기"
                value={note.whyDunnit}
                onChange={(e) =>
                  setNote({ ...note, whyDunnit: e.target.value })
                }
              />
            </DialogContent>
            <DialogContent>
              <DialogContentText sx={{ fontWeight: "bold" }} mb={1}>
                추가 질문
              </DialogContentText>
              {questions.map((question, idx) => (
                <Box mb={1} key={question.no}>
                  <InputLabel id={`additionalQuestion-${idx}`}>
                    {question.question}
                  </InputLabel>
                  <TextField
                    id={`additionalQuestion-${idx}`}
                    placeholder="답변"
                    fullWidth
                    value={note.additionalQuestionAnswers[idx]}
                    onChange={(e) =>
                      setNote({
                        ...note,
                        additionalQuestionAnswers: [
                          ...note.additionalQuestionAnswers.slice(0, idx),
                          e.target.value,
                          ...note.additionalQuestionAnswers.slice(idx + 1),
                        ],
                      })
                    }
                  />
                </Box>
              ))}
            </DialogContent>
          </Box>
          <Divider flexItem orientation="vertical" />
          <Box width={550}>
            <DialogContent>
              <InputLabel id="memo" sx={{ fontWeight: "bold" }}>
                메모
              </InputLabel>
              <TextField
                id="memo"
                fullWidth
                placeholder="잊기 쉬운 용의자들의 알리바이, 증거 등을 메모해보세요."
                multiline
                rows={27}
                value={note.memo}
                onChange={(e) => setNote({ ...note, memo: e.target.value })}
              />
            </DialogContent>
          </Box>
        </Box>
        <DialogActions>
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
            onClick={() => {
              setIsFinalConfirmModalOpen(true);
            }}
          >
            최종 제출
          </Button>
        </DialogActions>
      </Dialog>
      <FinalConfirmModal
        isOpen={isFinalConfirmModalOpen}
        isAllClueSearched={isAllClueSearched}
        suspect={suspects.find((suspects) => {
          return suspects.name === note.accusedSuspect;
        })}
        onConfirm={() => {
          localStorage.setItem(scenarioKeyword, JSON.stringify(note));
          router.push(`/suspect/${scenarioKeyword}/answer`);
        }}
        onClose={() => {
          setIsFinalConfirmModalOpen(false);
        }}
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
              handleSetNote();
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
