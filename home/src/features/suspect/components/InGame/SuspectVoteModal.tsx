import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, Button, Dialog, IconButton, Stack, Typography } from "@mui/material";
import QRCode from "react-qr-code";

import { ShakeTextSection } from "@/features/suspect/components/ShakeTextSection";
import SuspectVoteResultsGrid from "@/features/suspect/components/InGame/SuspectVoteResultsGrid";
import { useSuspectVoteModal } from "@/features/suspect/hooks/useSuspectVoteModal";
import { SuspectType } from "@/features/suspect/types";

interface SuspectVoteModalProps {
  isOpen: boolean;
  suspects: SuspectType[];
  scenarioTitle: string;
  episodeNumber: number;
  onClose: () => void;
}

export default function SuspectVoteModal({
  isOpen,
  suspects,
  scenarioTitle,
  episodeNumber,
  onClose,
}: SuspectVoteModalProps) {
  const {
    currentFinalRevealText,
    finalRevealStepIndex,
    handleCopyLink,
    handleFinishFinalReveal,
    handleOpenRoom,
    handleReopenRoom,
    handleStartFinalReveal,
    isCopied,
    isFinalRevealDisabled,
    isFinalRevealMode,
    isFinalRevealReVote,
    isLastFinalRevealStep,
    isOpeningRoom,
    isResultVisible,
    joinUrl,
    leadingSuspectNames,
    roomCode,
    roomError,
    setFinalRevealStepIndex,
    setIsFinalRevealMode,
    setIsResultVisible,
    totalVotes,
    voteSummary,
    voterCount,
  } = useSuspectVoteModal({
    episodeNumber,
    isOpen,
    scenarioTitle,
    suspects,
  });

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
          overflow: "hidden",
        },
      }}
    >
      <Box
        sx={{
          height: "100vh",
          overflow: "hidden",
          px: { xs: 2, md: 4 },
          py: { xs: 3, md: 5 },
          background:
            "radial-gradient(circle at 20% 0%, rgba(56, 189, 248, 0.2) 0%, rgba(8, 11, 18, 0) 30%), radial-gradient(circle at 80% 10%, rgba(59, 130, 246, 0.18) 0%, rgba(8, 11, 18, 0) 26%), linear-gradient(180deg, rgba(12, 17, 28, 0.96) 0%, rgba(4, 6, 12, 1) 100%)",
        }}
      >
        <IconButton
          onClick={onClose}
          aria-label="닫기"
          sx={{
            position: "fixed",
            top: 20,
            right: 20,
            zIndex: 20,
            color: "common.white",
            border: "1px solid rgba(255,255,255,0.14)",
            backgroundColor: "rgba(15, 23, 42, 0.48)",
            backdropFilter: "blur(10px)",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.08)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        {isFinalRevealMode ? (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              px: { xs: 2, md: 6 },
              py: { xs: 8, md: 10 },
            }}
          >
            <Box
              sx={{
                flex: 1,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShakeTextSection>
                <Typography
                  sx={{
                    fontSize: { xs: 38, md: 68 },
                    fontWeight: 800,
                    letterSpacing: "-0.05em",
                    lineHeight: 1.28,
                    wordBreak: "keep-all",
                    textAlign: "center",
                  }}
                >
                  {currentFinalRevealText}
                </Typography>
              </ShakeTextSection>
            </Box>

            <Button
              variant="text"
              endIcon={<KeyboardArrowRightIcon />}
              onClick={() => {
                if (isLastFinalRevealStep) {
                  if (isFinalRevealReVote) {
                    handleFinishFinalReveal();
                  }
                  return;
                }
                setFinalRevealStepIndex((prev) => prev + 1);
              }}
              disabled={isLastFinalRevealStep && !isFinalRevealReVote}
              sx={{
                color: "rgba(226,232,240,0.72)",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.04)",
                },
              }}
            >
              {isLastFinalRevealStep
                ? isFinalRevealReVote
                  ? "재투표 시작"
                  : "다음 단계 준비 중"
                : "다음"}
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              width: "100%",
              maxWidth: 920,
              mx: "auto",
              p: { xs: 2.5, md: 3.5 },
              borderRadius: 4,
              color: "common.white",
              position: "relative",
              overflow: "hidden",
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.06) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.16)",
              boxShadow:
                "0 24px 60px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.18)",
              backdropFilter: "blur(28px) saturate(150%)",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background:
                  "radial-gradient(circle at top left, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 32%), radial-gradient(circle at bottom right, rgba(59,130,246,0.12) 0%, rgba(59,130,246,0) 28%)",
              }}
            />

            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1.8,
              }}
            >
              <Box display="flex" alignItems="center" gap={1.2}>
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  <HowToVoteIcon />
                </Box>
                <Box>
                  <Typography fontWeight={800} fontSize={{ xs: 22, md: 28 }}>
                    실시간 범인지목
                  </Typography>
                  <Typography
                    fontSize={12}
                    sx={{ color: "rgba(226,232,240,0.72)" }}
                  >
                    범인은 누구?
                  </Typography>
                </Box>
              </Box>
              <Typography
                fontSize={13}
                sx={{
                  color: "rgba(226,232,240,0.84)",
                  px: 1.2,
                  py: 0.55,
                  borderRadius: 999,
                  backgroundColor: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                총 {totalVotes}표
              </Typography>
            </Box>

            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                minHeight: 220,
                borderRadius: 4,
                border: "1px solid rgba(255, 255, 255, 0.16)",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 100%)",
                boxShadow:
                  "0 24px 48px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
                backdropFilter: "blur(16px)",
                px: { xs: 2, md: 2.6 },
                py: { xs: 2, md: 2.3 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 1.6,
                }}
              >
                <Typography fontWeight={800} fontSize={{ xs: 17, md: 19 }}>
                  실시간 투표
                </Typography>
                <Typography
                  fontSize={13}
                  sx={{
                    color: "rgba(226,232,240,0.82)",
                    px: 1.2,
                    py: 0.5,
                    borderRadius: 999,
                    backgroundColor: "rgba(15,23,42,0.34)",
                  }}
                >
                  {roomCode ? `${voterCount}명 참여` : "대기 중"}
                </Typography>
              </Box>

              {!roomCode ? (
                <Box
                  sx={{
                    minHeight: 220,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1.2,
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => void handleOpenRoom()}
                    disabled={isOpeningRoom}
                    sx={{
                      minWidth: 176,
                      borderRadius: 999,
                      textTransform: "none",
                      fontWeight: 700,
                    }}
                    >
                      {isOpeningRoom ? "투표 방 생성 중" : "투표 방 열기"}
                    </Button>
                  {roomError && (
                    <Box textAlign="center">
                      <Typography fontSize={13} color="#fca5a5">
                        {roomError}
                      </Typography>
                      <Button
                        size="small"
                        variant="text"
                        onClick={() => {
                          void handleOpenRoom();
                        }}
                        sx={{ mt: 0.6, textTransform: "none" }}
                      >
                        다시 시도
                      </Button>
                    </Box>
                  )}
                </Box>
              ) : (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mb: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        p: 1.4,
                        borderRadius: 3,
                        backgroundColor: "#ffffff",
                        border: "1px solid rgba(255,255,255,0.32)",
                        boxShadow: "0 14px 34px rgba(0,0,0,0.24)",
                      }}
                    >
                      <QRCode
                        value={joinUrl}
                        size={112}
                        bgColor="#ffffff"
                        fgColor="#05070c"
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 2,
                      mb: 1.7,
                      p: 0.9,
                      borderRadius: 3,
                      backgroundColor: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      opacity: 0.74,
                    }}
                  >
                    <Box sx={{ minWidth: 0 }}>
                      <Typography fontSize={11} sx={{ opacity: 0.56 }}>
                        투표 링크
                      </Typography>
                      <Typography
                        sx={{
                          mt: 0.4,
                          fontSize: 11,
                          color: "rgba(226,232,240,0.7)",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: { xs: 180, md: 520 },
                        }}
                      >
                        {joinUrl}
                      </Typography>
                    </Box>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<ContentCopyIcon />}
                      onClick={() => void handleCopyLink()}
                      sx={{
                        flexShrink: 0,
                        textTransform: "none",
                        borderRadius: 999,
                        minWidth: 68,
                        color: "rgba(226,232,240,0.78)",
                        borderColor: "rgba(255,255,255,0.1)",
                        backgroundColor: "rgba(255,255,255,0.02)",
                      }}
                    >
                      {isCopied ? "복사됨" : "복사"}
                    </Button>
                  </Box>

                  <SuspectVoteResultsGrid
                    isResultVisible={isResultVisible}
                    leadingSuspectNames={leadingSuspectNames}
                    totalVotes={totalVotes}
                    voteSummary={voteSummary}
                  />
                </>
              )}
            </Box>

            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={1.2}
              sx={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                justifyContent: "center",
                mt: 1.1,
              }}
            >
              {roomCode && (
                <Button
                  variant="outlined"
                  size="medium"
                  onClick={() => void handleReopenRoom()}
                  disabled={isOpeningRoom}
                  sx={{
                    minWidth: 160,
                    borderRadius: 999,
                    textTransform: "none",
                    fontWeight: 700,
                    px: 2,
                    color: "common.white",
                    borderColor: "rgba(255,255,255,0.18)",
                    backgroundColor: "rgba(15, 23, 42, 0.72)",
                    "&:hover": {
                      borderColor: "rgba(255,255,255,0.32)",
                      backgroundColor: "rgba(255,255,255,0.07)",
                    },
                  }}
                >
                  {isOpeningRoom ? "다시 여는 중" : "투표방 다시 열기"}
                </Button>
              )}

              {roomCode && (
                <Button
                  variant="outlined"
                  size="medium"
                  startIcon={
                    isResultVisible ? <VisibilityOffIcon /> : <VisibilityIcon />
                  }
                  onClick={() => setIsResultVisible((prev) => !prev)}
                  sx={{
                    minWidth: 148,
                    borderRadius: 999,
                    textTransform: "none",
                    fontWeight: 700,
                    px: 2,
                    color: "common.white",
                    borderColor: "rgba(255,255,255,0.18)",
                    backgroundColor: "rgba(15, 23, 42, 0.72)",
                    "&:hover": {
                      borderColor: "rgba(255,255,255,0.32)",
                      backgroundColor: "rgba(255,255,255,0.07)",
                    },
                  }}
                >
                  {isResultVisible ? "결과 숨기기" : "결과 보기"}
                </Button>
              )}

              {roomCode && (
                <Button
                  variant="outlined"
                  size="medium"
                  onClick={handleStartFinalReveal}
                  disabled={isFinalRevealDisabled}
                  sx={{
                    minWidth: 186,
                    borderRadius: 999,
                    textTransform: "none",
                    fontWeight: 700,
                    px: 2.2,
                    color: "common.white",
                    borderColor: "rgba(255,255,255,0.18)",
                    backgroundColor: "rgba(15, 23, 42, 0.72)",
                    "&:hover": {
                      borderColor: "rgba(255,255,255,0.32)",
                      backgroundColor: "rgba(255,255,255,0.07)",
                    },
                    "&.Mui-disabled": {
                      color: "rgba(226,232,240,0.34)",
                      borderColor: "rgba(255,255,255,0.08)",
                      backgroundColor: "rgba(15, 23, 42, 0.36)",
                    },
                  }}
                >
                  최종 투표 결과 공개
                </Button>
              )}
            </Stack>
          </Box>
        )}
      </Box>
    </Dialog>
  );
}
