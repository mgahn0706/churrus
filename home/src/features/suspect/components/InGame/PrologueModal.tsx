import { DoneAll } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useEffect, useRef } from "react";

interface PrologueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClickSuspects: () => void;
  prolougeContent: React.ReactNode;
}

export default function PrologueModal({
  isOpen,
  prolougeContent,
  onClose,
  onClickSuspects,
}: PrologueModalProps) {
  const descriptionElementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [isOpen]);
  return (
    <Dialog open={isOpen}>
      <DialogTitle>공개된 정보</DialogTitle>
      <DialogContent>
        <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
          sx={{
            whiteSpace: "pre-line",
            wordSpacing: "1px",
            lineHeight: "1.6",
            wordBreak: "keep-all",
          }}
        >
          {prolougeContent}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClickSuspects}>용의자 확인</Button>
        <Button onClick={onClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
}
