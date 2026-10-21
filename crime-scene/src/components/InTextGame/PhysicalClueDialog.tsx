import { Close } from "@mui/icons-material";
import { Box, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";

import type { PhysicalClue } from "@/types";

interface PhysicalClueDialogProps {
  clue: PhysicalClue | null;
  onClose: () => void;
}

export default function PhysicalClueDialog({
  clue,
  onClose,
}: PhysicalClueDialogProps) {
  return (
    <Dialog open={clue !== null} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>
        {clue && `${clue.id}번 실물단서`}
        <IconButton
          aria-label="닫기"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {clue && (
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: "1fr",
              md:
                clue.images.length > 1
                  ? "repeat(2, minmax(0, 1fr))"
                  : "1fr",
            }}
            gap={2}
            sx={{ justifyItems: "center" }}
          >
            {clue.images.map((image, index) => (
              <Box
                key={`${image}-${index}`}
                component="img"
                src={image}
                alt={`${clue.id}번 실물단서 ${index + 1}`}
                sx={{
                  display: "block",
                  maxWidth: "100%",
                  maxHeight: "75vh",
                  width: "auto",
                  height: "auto",
                }}
              />
            ))}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
