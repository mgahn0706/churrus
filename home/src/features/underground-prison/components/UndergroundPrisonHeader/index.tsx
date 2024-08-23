import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { CardSubmission, Player } from "../../types/player";
import { useState } from "react";

interface UndergroundPrisonHeaderProps {
  round: number;
  players: Player[];
  hasGameEnded: boolean;
  onCardSubmit: (submission: CardSubmission[]) => void;
  onGameStart: () => void;
}

export default function UndergroundPrisonHeader({
  round,
  players,
  hasGameEnded,
  onCardSubmit,
  onGameStart,
}: UndergroundPrisonHeaderProps) {
  const [isCardSubmitModalOpen, setIsCardSubmitModalOpen] = useState(false);

  return (
    <>
      <Box
        display="flex"
        zIndex={2}
        justifyContent="space-between"
        position="absolute"
        top={0}
        bgcolor="rgba(31,31,42,0.5)"
        left={0}
        px={2}
        width="calc(100% - 32px)"
        alignItems={"center"}
        height="52px"
        sx={{
          backdropFilter: "blur(20px)",
        }}
      >
        <Typography color="#FFFFFF" fontSize="18px" fontWeight="bold">
          지하감옥
        </Typography>
        {hasGameEnded ? (
          <Typography color="#FFFFFF" fontSize="18px" fontWeight="bold">
            게임 결과
          </Typography>
        ) : (
          <Typography color="#FFFFFF" fontSize="18px" fontWeight="bold">
            {round ? `${round} 라운드` : "게임 준비"}
          </Typography>
        )}
        {round > 0 && (
          <Button
            variant="contained"
            disabled={hasGameEnded}
            onClick={() => setIsCardSubmitModalOpen(true)}
          >
            카드 제시
          </Button>
        )}
        {round === 0 && (
          <Button
            variant="contained"
            onClick={onGameStart}
            disabled={players.length < 2 || hasGameEnded}
          >
            게임 시작
          </Button>
        )}
      </Box>
      <CardSubmitModal
        round={round}
        isOpen={isCardSubmitModalOpen}
        onClose={() => setIsCardSubmitModalOpen(false)}
        players={players}
        onSubmit={(submission) => {
          onCardSubmit(submission);
        }}
      />
    </>
  );
}

interface CardSubmitModalProps {
  isOpen: boolean;
  round: number;
  onClose: () => void;
  players: Player[];
  onSubmit: (submission: CardSubmission[]) => void;
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const CardSubmitModal = ({
  players,
  round,
  onSubmit,
  isOpen,
  onClose,
}: CardSubmitModalProps) => {
  const [submission, setSubmission] = useState<CardSubmission[]>([]);
  return (
    <ThemeProvider theme={darkTheme}>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>
          카드 제출
          <Typography color="#E4E4E5" fontSize="12px">
            {round} 라운드
          </Typography>
        </DialogTitle>
        <DialogContent>
          {players.map((player) => (
            <Box key={player.id} display="flex" flexDirection="column" mt={2}>
              <Typography color="#E4E4E5" fontSize="18px">
                {player.name}
              </Typography>
              <Box display="flex" gap={1} width={1}>
                {Array.from({ length: round === 1 ? 4 : 3 }).map((_, index) => (
                  <Button
                    key={index}
                    variant={
                      submission.find(
                        (s) => s.id === player.id && s.card === index + 1
                      )
                        ? "contained"
                        : "outlined"
                    }
                    onClick={() => {
                      const selectedCard = submission.find(
                        (s) => s.id === player.id
                      );
                      if (selectedCard) {
                        selectedCard.card === index + 1
                          ? setSubmission(
                              submission.filter((s) => s.id !== player.id)
                            )
                          : setSubmission([
                              ...submission.filter((s) => s.id !== player.id),
                              { id: player.id, card: index + 1 },
                            ]);
                        return;
                      }
                      setSubmission([
                        ...submission,
                        { id: player.id, card: index + 1 },
                      ]);
                    }}
                  >
                    {index + 1}
                  </Button>
                ))}
              </Box>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>취소</Button>
          <Button
            disabled={submission.length !== players.length}
            onClick={() => {
              onSubmit(submission);
              onClose();
            }}
          >
            제출
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};
