import {
  Box,
  Drawer,
  Grid,
  Icon,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";
import useFoodChainPlayerContext from "../../context";
import { ANIMALS } from "../../fixtures/animal";
import { ArrowDownwardOutlined, ExpandMoreRounded } from "@mui/icons-material";

export default function PeekingPhase() {
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
        <Typography color="#121212" fontSize="24px" fontWeight="bold">
          엿보기
        </Typography>
        <Typography color="#121212" fontSize="16px" mt="8px">
          {currentPlayer.id}번 플레이어 {currentPlayer.name}님이 엿보는
          중입니다.
        </Typography>
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

  console.log(selectedPlayer);

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
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mt={2}
          >
            <Typography color="#121212" fontSize="18px">
              {selectedPlayer.id}번 {selectedPlayer.name}님은
            </Typography>
            <Typography color="#121212" fontSize="18px">
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
