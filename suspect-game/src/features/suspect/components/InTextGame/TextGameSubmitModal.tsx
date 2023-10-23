import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export default function TextGameSubmitModal({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}) {
  return (
    <Dialog open={isOpen}>
      <DialogTitle>추리 제출</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button onClick={onClose}>닫기</Button>
        <Button onClick={onSubmit} variant="contained">
          제출
        </Button>
      </DialogActions>
    </Dialog>
  );
}
