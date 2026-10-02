import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  TextField,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useEffect, useState } from "react";
import { ClueType } from "@/features/suspect/types";

interface ClueUnlockModalProps {
  targetClue: ClueType | null;
  isOpen: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

export default function ClueUnlockModal({
  isOpen,
  targetClue,
  onClose,
  onSuccess,
}: ClueUnlockModalProps) {
  const [password, setPassword] = useState("");
  const [isPasswordIncorrect, setIsPasswordIncorrect] = useState(false);

  useEffect(() => {
    setPassword("");
    setIsPasswordIncorrect(false);
  }, [isOpen, targetClue?.id]);

  if (targetClue === null || !targetClue.lock) {
    return null;
  }

  const { lock } = targetClue;

  if (lock.method === "clue") {
    return (
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>
          {targetClue.id}. {targetClue.title} - 잠김
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {lock.hint ??
              `먼저 ${lock.clueId}번 단서를 확인해야 이 단서를 열 수 있습니다.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>닫기</Button>
        </DialogActions>
      </Dialog>
    );
  }

  const isPasswordCorrect = password === lock.password;
  const passwordLength = lock.password.length;

  const handleSubmit = () => {
    if (!isPasswordCorrect) {
      setIsPasswordIncorrect(true);
      return;
    }

    setPassword("");
    setIsPasswordIncorrect(false);
    onSuccess();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        {targetClue.id}. {targetClue.title} - 잠김
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{lock.hint}</DialogContentText>
        <Box mt={6}>
          <TextField
            autoFocus
            error={isPasswordIncorrect}
            helperText={
              isPasswordIncorrect
                ? "비밀번호가 틀렸습니다."
                : `비밀번호는 ${passwordLength}자입니다.`
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            inputProps={{ maxLength: passwordLength }}
            label="비밀번호"
            fullWidth
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setIsPasswordIncorrect(false);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleSubmit();
              }
            }}
          />
        </Box>
        {isPasswordIncorrect && (
          <Alert severity="error" sx={{ mt: 2 }}>
            입력한 비밀번호를 다시 확인해주세요.
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>닫기</Button>
        <Button onClick={handleSubmit}>입력</Button>
      </DialogActions>
    </Dialog>
  );
}
