import { Box, Modal, Typography } from "@mui/material";

export default function MobileWidthAlertModal({ open }: { open: boolean }) {
  return (
    <Box>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            이용 안내
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            화면 크기가 작아 게임을 진행할 수 없습니다. 더 큰 화면의 PC에서
            진행하시길 권장합니다.
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}
