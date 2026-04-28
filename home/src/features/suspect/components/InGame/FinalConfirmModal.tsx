import { SuspectType } from "@/features/suspect/types";
import {
  Alert,
  Avatar,
  Box,
  Button,
  DialogContentText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Typography,
} from "@mui/material";

interface FinalConfirmModalProps {
  isAllClueSearched: boolean;
  isOpen: boolean;
  suspect?: SuspectType;
  onClose: () => void;
  onConfirm: () => void;
}

export default function FinalConfirmModal({
  isAllClueSearched,
  isOpen,
  suspect,
  onClose,
  onConfirm,
}: FinalConfirmModalProps) {
  if (!suspect) {
    return null;
  }
  return (
    <Dialog open={isOpen} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h6" fontWeight={700}>
          최종 결정
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
          제출 전에 선택한 용의자와 최종 진술을 한 번 더 확인하세요.
        </Typography>
      </DialogTitle>
      <DialogContent dividers sx={{ px: 3, py: 2.5 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.75,
            px: 2,
            py: 1.75,
            borderRadius: 2,
            backgroundColor: "rgba(15, 23, 42, 0.04)",
            border: "1px solid rgba(15, 23, 42, 0.08)",
          }}
        >
          <Box>
            <Typography variant="caption" color="text.secondary">
              진범 지목
            </Typography>
            <Typography variant="h6" color="text.primary" fontWeight={700}>
              {suspect.name}
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Avatar src={suspect.image} alt={suspect.name} sx={{ width: 56, height: 56 }} />
        </Box>

        <Box
          sx={{
            pt: 2.5,
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          <Typography variant="subtitle2" color="text.primary" fontWeight={600}>
            최종 진술
          </Typography>

          <Paper
            sx={{
              px: 3,
              py: 2.5,
              borderRadius: 2,
              backgroundColor: "background.default",
              border: "1px solid rgba(15, 23, 42, 0.08)",
              boxShadow: "none",
            }}
          >
            <DialogContentText
              sx={{
                m: 0,
                color: "text.primary",
                whiteSpace: "pre-line",
                wordBreak: "keep-all",
                lineHeight: 1.75,
                fontSize: "0.98rem",
              }}
            >
              {suspect.finalArgument}
            </DialogContentText>
          </Paper>

          {!isAllClueSearched && (
            <Alert variant="filled" severity="warning" sx={{ borderRadius: 2 }}>
              주의 - 아직 모든 단서를 찾지 않았습니다.
            </Alert>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button variant="text" color="inherit" onClick={onClose}>
          다시 보기
        </Button>
        <Button variant="contained" color="error" onClick={onConfirm}>
          이대로 제출
        </Button>
      </DialogActions>
    </Dialog>
  );
}
