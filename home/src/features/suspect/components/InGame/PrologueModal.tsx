import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
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
    <Dialog open={isOpen} maxWidth="md" fullWidth>
      <DialogTitle sx={{ pb: 1.2 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" fontWeight={700}>
            공개된 정보
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent dividers sx={{ pt: 2 }}>
        <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
          sx={{
            whiteSpace: "pre-line",
            wordSpacing: "0.5px",
            lineHeight: "1.8",
            wordBreak: "keep-all",
            color: "text.primary",
            fontSize: "1rem",
          }}
        >
          {prolougeContent}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 1.5 }}>
        <Button variant="contained" onClick={onClickSuspects}>
          용의자 확인
        </Button>
        <Button onClick={onClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
}
