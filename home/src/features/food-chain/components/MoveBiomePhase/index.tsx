import { useState } from "react";
import useFoodChainPlayerContext from "../../context";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Drawer,
  Grid,
  Typography,
} from "@mui/material";
import { BIOMES } from "../../fixtures/biome";
import { AnimalId, BiomeId } from "../../types";
import { ChevronRightRounded } from "@mui/icons-material";

interface MoveBiomePhaseProps {
  round: number;
  onNextPhase: () => void;
}

export default function MoveBiomePhase({
  round,
  onNextPhase,
}: MoveBiomePhaseProps) {
  const { playerStatus } = useFoodChainPlayerContext();

  const alivePlayers = playerStatus.filter(
    (player) => player.status === "ALIVE"
  );

  const unselectedAlivePlayers = alivePlayers.filter(
    (player) => !player.biomeHistory[round - 1]
  );

  const [selectedBiomeId, setSelectedBiomeId] = useState<BiomeId | null>(null);

  return (
    <Box width={1}>
      <Box display="flex" flexDirection="column">
        <Typography color="#121212" fontSize="12px">
          {round} 라운드
        </Typography>
        <Typography color="#121212" fontSize="24px" fontWeight="bold">
          장소 이동
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          mt="8px"
          mb="4px"
        >
          {Object.values(BIOMES).map((biome) => {
            const selectedPlayers = alivePlayers.filter(
              (player) => player.biomeHistory[round - 1] === biome.id
            );
            return (
              <Box
                onClick={() => {
                  setSelectedBiomeId(biome.id);
                }}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: "#f5f5f5",
                  },
                }}
                mt={2}
                key={biome.id}
                bgcolor="white"
                borderRadius="12px"
                p={3}
                width={1}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box display="flex" gap={1} flexDirection="column">
                    <Box display="flex" gap={1}>
                      <Typography color="#121212" fontSize="16px">
                        {biome.name}
                      </Typography>
                      <Typography color="#318AE1">
                        {selectedPlayers.length}
                      </Typography>
                    </Box>
                    <Box gap={1} display="flex" flexWrap="wrap" mt={1}>
                      {selectedPlayers.map((player) => (
                        <PlayerChip {...player} />
                      ))}
                    </Box>
                  </Box>
                  <ChevronRightRounded />
                </Box>
              </Box>
            );
          })}
          <Box
            mt={2}
            bgcolor="white"
            borderRadius="12px"
            p={3}
            width={1}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box display="flex" gap={1}>
              <Typography color="#121212" fontSize="16px">
                선택 안 됨
              </Typography>
              <Typography color="#318AE1">
                {unselectedAlivePlayers.length}
              </Typography>
            </Box>
            <Box gap={1} display="flex" flexWrap="wrap" mt={1}>
              {unselectedAlivePlayers.map((player) => (
                <PlayerChip {...player} />
              ))}
            </Box>
          </Box>
        </Box>
        <Box width={1} mt={6}>
          <Button
            sx={{
              borderRadius: "50px",
            }}
            fullWidth
            disabled={alivePlayers.some(
              (player) => !player.biomeHistory[round - 1]
            )}
          >
            장소 이동 종료
          </Button>
        </Box>
      </Box>
      <MoveBiomeInputDrawer
        round={round}
        biomeId={selectedBiomeId}
        onClose={() => {
          setSelectedBiomeId(null);
        }}
      />
    </Box>
  );
}

const PlayerChip = ({
  id,
  name,
  role,
}: {
  id: number;
  name: string;
  role: AnimalId | null;
}) => {
  if (!role) {
    return null;
  }
  return (
    <Chip
      avatar={<Avatar src={`/image/icon/food-chain/${role}.svg`} />}
      label={name}
    />
  );
};

const MoveBiomeInputDrawer = ({
  biomeId,
  round,
  onClose,
}: {
  biomeId: BiomeId | null;
  round: number;
  onClose: () => void;
}) => {
  const { playerStatus, moveBiome } = useFoodChainPlayerContext();

  if (!biomeId) {
    return null;
  }

  return (
    <Drawer anchor="bottom" open={!!biomeId} onClose={onClose}>
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
                moveBiome({
                  playerId: player.id,
                  biomeId,
                  round,
                });
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
  );
};
