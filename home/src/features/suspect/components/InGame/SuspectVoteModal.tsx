import CloseIcon from "@mui/icons-material/Close";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

interface SuspectVoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuspectVoteModal({
  isOpen,
  onClose,
}: SuspectVoteModalProps) {
  return (
    <Dialog fullScreen open={isOpen} onClose={onClose}>
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          <HowToVoteIcon color="primary" />
          <Typography variant="h6" fontWeight={700} sx={{ flexGrow: 1 }}>
            용의자 투표
          </Typography>
          <IconButton edge="end" onClick={onClose} aria-label="닫기">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          minHeight: "100%",
          px: { xs: 2, md: 4 },
          py: { xs: 3, md: 5 },
          background:
            "linear-gradient(180deg, rgba(245,247,250,1) 0%, rgba(233,238,244,1) 100%)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 960,
            mx: "auto",
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            backgroundColor: "rgba(255,255,255,0.9)",
            boxShadow: "0 24px 60px rgba(15, 23, 42, 0.12)",
          }}
        >
          <Typography variant="overline" color="primary.main" fontWeight={700}>
            FULL SCREEN MODAL
          </Typography>
          <Typography variant="h4" fontWeight={800} mt={0.8}>
            용의자 투표 콘텐츠 자리
          </Typography>
          <Typography color="text.secondary" mt={1.5} sx={{ lineHeight: 1.8 }}>
            이 영역은 추후 프롬프트에 맞춰 투표 UI, 후보 정보, 진행 단계, 결과
            표시 등의 콘텐츠로 교체할 수 있도록 비워둔 상태입니다.
          </Typography>

          <Box
            sx={{
              mt: 4,
              minHeight: 320,
              borderRadius: 3,
              border: "1px dashed",
              borderColor: "divider",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(148, 163, 184, 0.06)",
              textAlign: "center",
              px: 3,
            }}
          >
            <Box>
              <HowToVoteIcon color="primary" sx={{ fontSize: 44, mb: 1.5 }} />
              <Typography variant="h6" fontWeight={700}>
                용의자 투표 UI Placeholder
              </Typography>
              <Typography color="text.secondary" mt={1}>
                다음 요청에서 원하는 레이아웃과 문구를 주면 이 화면에 바로
                반영하겠습니다.
              </Typography>
            </Box>
          </Box>

          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button variant="outlined" onClick={onClose}>
              닫기
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}
