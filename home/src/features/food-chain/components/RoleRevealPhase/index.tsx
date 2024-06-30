import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";
import useFoodChainPlayerContext from "../../context";
import Image from "next/image";
import { ANIMALS } from "../../fixtures/animal";
import { AnimalId } from "../../types";

export default function RoleRevealPhase({
  onNextPhase,
}: {
  onNextPhase: () => void;
}) {
  const [currentPlayerId, setCurrentPlayerId] = useState(1);

  const [camouflageTarget, setCamouflageTarget] = useState<AnimalId | null>(
    null
  );

  const [predictTarget, setPredictTarget] = useState<AnimalId | null>(null);

  const { playerStatus } = useFoodChainPlayerContext();

  const currentPlayer = playerStatus.find(
    (player) => player.id === currentPlayerId
  );

  if (!currentPlayer || !currentPlayer.role) {
    return null;
  }

  const hasNotPredicted = currentPlayer.role === "CROW" && !predictTarget;
  const hasNotCamouflaged =
    currentPlayer.role === "CHAMELEON" && !camouflageTarget;

  return (
    <Box width={1}>
      <Box display="flex" flexDirection="column">
        <Typography color="#121212" fontSize="18px">
          동물 공개
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          mt="8px"
          mb="4px"
        >
          <Image
            width={180}
            height={180}
            style={{
              borderRadius: "24px",
            }}
            src={`/image/icon/food-chain/${currentPlayer.role}.png`}
            alt={currentPlayer.role ?? "animal role"}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          mt="8px"
          flexDirection="column"
          alignItems="center"
        >
          <Typography color="#121212" fontSize="18px">
            {currentPlayer.id}번 {currentPlayer.name}님의 동물은
          </Typography>

          <Typography fontSize="24px" fontWeight="bold" color="#318AE1">
            {ANIMALS[currentPlayer.role].name}
          </Typography>
        </Box>
      </Box>
      {currentPlayer.role === "CHAMELEON" && (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          mt={6}
        >
          <Typography color="#121212" fontSize="14px">
            위장할 동물을 선택해주세요
          </Typography>
          <Select
            value={camouflageTarget}
            onChange={(e) => setCamouflageTarget(e.target.value as AnimalId)}
            sx={{
              width: "100%",
              borderRadius: "50px",
            }}
          >
            {Object.entries(ANIMALS).map(([animalId, animal]) => (
              <MenuItem key={animalId} value={animalId}>
                {animal.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}

      {currentPlayer.role === "CROW" && (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          mt={6}
        >
          <Typography color="#121212" fontSize="14px">
            우승할 것으로 예상하는 동물을 선택해주세요
          </Typography>
          <Select
            value={predictTarget}
            onChange={(e) => setPredictTarget(e.target.value as AnimalId)}
            sx={{
              width: "100%",
              borderRadius: "50px",
            }}
          >
            {Object.entries(ANIMALS)
              .filter(([animalId]) => animalId !== "CROW")
              .map(([animalId, animal]) => (
                <MenuItem key={animalId} value={animalId}>
                  {animal.name}
                </MenuItem>
              ))}
          </Select>
        </Box>
      )}
      <Box display="flex" flexDirection="column" justifyContent="center" mt={6}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            borderRadius: "50px",
          }}
          disabled={hasNotPredicted || hasNotCamouflaged}
          onClick={() => {
            if (currentPlayerId === playerStatus.length) {
              moveToNextPhase();
              return;
            }
            setCurrentPlayerId((prev) => prev + 1);
          }}
        >
          {currentPlayer.name}님이 확인했어요
        </Button>
        {currentPlayerId !== 1 && (
          <Button
            onClick={() => setCurrentPlayerId((prev) => prev - 1)}
            sx={{
              borderRadius: "50px",
              mt: 2,
            }}
          >
            이전 플레이어 확인
          </Button>
        )}
      </Box>
    </Box>
  );
}
