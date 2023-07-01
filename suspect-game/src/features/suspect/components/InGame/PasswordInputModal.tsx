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
  Snackbar,
  TextField,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";
import { ClueType } from "@/features/suspect/types";

interface PasswordInputModalProps {
  targetClue: ClueType | null;
  isOpen: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

export default function PasswordInputModal({
  isOpen,
  targetClue,
  onClose,
  onSuccess,
}: PasswordInputModalProps) {
  const [password, setPassword] = useState("");
  const [isInputButtonClicked, setInputButtonClicked] = useState(false);
  if (targetClue === null) {
    return null;
  }

  const resetPassword = () => {
    setPassword("");
    setInputButtonClicked(false);
  };

  const isPasswordCorrect = password === targetClue.password;

  return (
    <>
      <Dialog open={isOpen}>
        <DialogTitle>
          {targetClue.id}. {targetClue.title} - 잠김
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{targetClue.passwordHint}</DialogContentText>
          <Box mt={6}>
            <TextField
              error={
                (password !== "" && password.length !== 4) ||
                (isInputButtonClicked && !isPasswordCorrect)
              }
              helperText="비밀번호는 4자입니다."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
              label="비밀번호"
              fullWidth
              value={password}
              onChange={(e) => {
                setPassword(e.target.value.slice(0, 4));
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button disabled={isInputButtonClicked} onClick={onClose}>
            닫기
          </Button>

          <Button
            disabled={isInputButtonClicked}
            onClick={() => {
              setInputButtonClicked(true);
              if (isPasswordCorrect) {
                resetPassword();
                onSuccess();
                return;
              }
            }}
          >
            입력
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={isInputButtonClicked}
        autoHideDuration={2000}
        sx={{
          zIndex: 9999,
        }}
        onClose={() => {
          resetPassword();
          onClose();
        }}
      >
        <Alert
          severity={isPasswordCorrect ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {isPasswordCorrect
            ? "잠금 해제에 성공하였습니다."
            : "비밀번호가 틀렸습니다."}
        </Alert>
      </Snackbar>
    </>
  );
}
