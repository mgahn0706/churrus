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
  prolougeContent: React.ReactNode;
}

export default function PrologueModal({
  isOpen,
  prolougeContent,
  onClose,
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
        >
          {prolougeContent}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
}
