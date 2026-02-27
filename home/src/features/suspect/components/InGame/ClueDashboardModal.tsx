import { ClueType } from "@/features/suspect/types";
import {
  Box,
  Button,
  Tooltip,
  Typography,
  Modal,
  LinearProgress,
} from "@mui/material";

interface ClueDashboardModalProps {
  clues: ClueType[];
  isOpen: boolean;
  checkedClueList: number[];
  onClose: () => void;
}

export default function ClueDashboardModal({
  clues,
  isOpen,
  checkedClueList,
  onClose,
}: ClueDashboardModalProps) {
  const checkedCount = checkedClueList.length;
  const totalCount = clues.length;
  const progressPercent =
    totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

  return (
    <Modal
      open={isOpen}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(12, 14, 24, 0.45)",
            backdropFilter: "blur(2px)",
          },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 460,
          maxWidth: "92vw",
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: "0 20px 60px rgba(0,0,0,0.28)",
          p: 3,
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          단서 현황
        </Typography>

        <Typography mt={0.6} color="text.secondary">
          확인한 단서: {checkedCount} / {totalCount} ({progressPercent}%)
        </Typography>

        <LinearProgress
          variant="determinate"
          value={progressPercent}
          sx={{ mt: 1.3, height: 8, borderRadius: 999 }}
        />

        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(44px, 1fr))"
          mt={2.4}
          gap={1.2}
        >
          {clues.map((clue) => {
            const isChecked = checkedClueList.includes(clue.id);
            return (
              <Tooltip arrow key={clue.id} title={clue.title}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 14,
                    color: isChecked ? "primary.contrastText" : "text.secondary",
                    backgroundColor: isChecked ? "primary.main" : "grey.200",
                    border: "1px solid",
                    borderColor: isChecked ? "primary.main" : "grey.300",
                    transition: "all 0.15s ease",
                  }}
                >
                  {clue.id}
                </Box>
              </Tooltip>
            );
          })}
        </Box>

        <Box display="flex" justifyContent="flex-end" mt={2.5}>
          <Button variant="outlined" onClick={onClose}>
            닫기
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
