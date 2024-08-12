import {
  Avatar,
  Box,
  Button,
  Chip,
  Drawer,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import useFoodChainPlayerContext from "../../context";
import { ANIMALS } from "../../fixtures/animal";
import { ExpandMoreRounded } from "@mui/icons-material";

interface PeekingPhaseProps {
  onNextPhase: () => void;
}

export default function PeekingPhase({ onNextPhase }: PeekingPhaseProps) {
  const [peekingPlayerId, setPeekingPlayerId] = useState(1);

  const { playerStatus } = useFoodChainPlayerContext();

  const currentPlayer = playerStatus.find(
    (player) => player.id === peekingPlayerId
  );

  if (!currentPlayer || !currentPlayer.role) {
    return null;
  }

  const peekingCount = ANIMALS[currentPlayer.role].peekingCount;

  return (
    <Box width={1}>
      <Box display="flex" flexDirection="column">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" flexDirection="column">
            <Typography color="#121212" fontSize="24px" fontWeight="bold">
              엿보기
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <Chip
                avatar={
                  <Avatar
                    src={`/image/icon/food-chain/${currentPlayer.role}.svg`}
                  />
                }
                label={`${currentPlayer.name}`}
              />
              <Typography color="#121212" fontSize="16px">
                님이 엿보는 중입니다.
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          mt="8px"
          mb="4px"
        >
          {Array.from({ length: peekingCount }).map((_, index) => (
            <Box
              key={index}
              mt={2}
              bgcolor="white"
              borderRadius="12px"
              p={3}
              width={1}
              display="flex"
              gap={1}
              flexDirection="column"
              justifyContent="space-between"
            >
              <Typography color="#121212" fontSize="16px">
                {index + 1}번째 엿보기
              </Typography>
              <PeekingInput playerId={peekingPlayerId} />
            </Box>
          ))}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt={6}
            width={1}
            gap={2}
          >
            {peekingPlayerId < playerStatus.length && (
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                sx={{
                  borderRadius: "50px",
                }}
                onClick={() => {
                  setPeekingPlayerId((prev) => prev + 1);
                }}
              >
                다음 플레이어
              </Button>
            )}
            {peekingPlayerId === playerStatus.length && (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: "50px",
                }}
                onClick={onNextPhase}
              >
                장소 이동 단계 시작하기
              </Button>
            )}
            <Button
              fullWidth
              color="primary"
              variant="text"
              sx={{
                borderRadius: "50px",
              }}
              disabled={peekingPlayerId === 1}
              onClick={() => {
                setPeekingPlayerId((prev) => prev - 1);
              }}
            >
              이전 플레이어
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const PeekingInput = ({ playerId }: { playerId: number }) => {
  const { playerStatus } = useFoodChainPlayerContext();

  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const selectedPlayer =
    playerStatus.find((player) => player.id === selectedPlayerId) || null;

  useEffect(() => {
    setSelectedPlayerId(null);
  }, [playerId]);

  return (
    <>
      <Box display="flex" flexDirection="column" maxWidth="300px">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          onClick={() => setIsDrawerOpen(true)}
          sx={{
            borderBottom: "1px solid #e0e0e0",
            "&:hover": {
              cursor: "pointer",
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            sx={{
              width: "100%",
            }}
          >
            {selectedPlayer ? (
              <Typography color="#121212" fontSize="18px">
                {selectedPlayer.id}번 {selectedPlayer.name}
              </Typography>
            ) : (
              <Typography color="#909090" fontSize="18px">
                엿보고 싶은 플레이어를 선택하세요.
              </Typography>
            )}
          </Box>
          <ExpandMoreRounded />
        </Box>
        {selectedPlayer && selectedPlayer.role && (
          <Box display="flex" alignItems="center" gap={1} mt={2}>
            <Typography color="#121212" fontSize="18px">
              {selectedPlayer.id}번 {selectedPlayer.name}님은
            </Typography>
            <Typography fontSize="18px" fontWeight="bold" color="#318AE1">
              {
                ANIMALS[selectedPlayer.camouflagedTo || selectedPlayer.role]
                  .name
              }
            </Typography>
            <Typography color="#121212" fontSize="18px">
              입니다.
            </Typography>
          </Box>
        )}
      </Box>
      <Drawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Grid container p={2} spacing={2}>
          {playerStatus.map((player) => (
            <Grid item xs={4} key={player.id}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                bgcolor="#f5f5f5"
                flexDirection="column"
                py={2}
                sx={{
                  width: "100%",
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: "#e0e0e0",
                  },
                }}
                borderRadius="12px"
                onClick={() => {
                  setSelectedPlayerId(player.id);
                  setIsDrawerOpen(false);
                }}
              >
                <Typography color="#121212" fontSize="14px">
                  {player.id}번
                </Typography>
                <Typography color="#121212" fontSize="18px" fontWeight={500}>
                  {player.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Drawer>
    </>
  );
};
