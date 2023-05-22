import { startUpClues } from "@/fixtures/startup/clues";
import { Box, Button, Tooltip, Typography, Modal } from "@mui/material";

interface ClueDashboardModalProps {
  isOpen: boolean;
  checkedClueList: number[];
  onClose: () => void;
}

export default function ClueDashboardModal({
  isOpen,
  checkedClueList,
  onClose,
}: ClueDashboardModalProps) {
  return (
    <Modal open={isOpen}>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h4">단서 현황</Typography>

        <Typography mt={1}>
          확인한 단서: {checkedClueList.length} / {startUpClues.length}
        </Typography>
        <Box display="flex" flexWrap='wrap' mt={3} gap={3} maxWidth={400}>
          {startUpClues.map((clue) => {
            return (
              <Tooltip arrow key={clue.id} title={clue.title}>
                <Typography
                  color={checkedClueList.includes(clue.id) ? "green" : "gray"}
                  fontWeight="bold"
                  variant="body1"
                >
                  {clue.id}
                </Typography>
              </Tooltip>
            );
          })}
        </Box>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button sx={{ mt: 5 }} variant="outlined" onClick={onClose}>
            닫기
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
