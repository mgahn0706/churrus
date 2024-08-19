import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Grid,
  Input,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import useFoodChainPlayerContext from "../../context";
import { useEffect, useState } from "react";
import { Animal, AnimalId } from "../../types";
import { ANIMALS } from "../../fixtures/animal";
import {
  CheckCircleOutlineRounded,
  CheckCircleRounded,
} from "@mui/icons-material";

export default function SettingPhase({
  onNextPhase,
}: {
  onNextPhase: () => void;
}) {
  const { addPlayer, playerStatus, deletePlayer, submitSelectedAnimals } =
    useFoodChainPlayerContext();

  const [newPlayerName, setNewPlayerName] = useState("");
  const [selectedAnimals, setSelectedAnimals] = useState<AnimalId[]>(
    Object.values(ANIMALS).map((animal) => animal.id)
  );

  return (
    <Box width={1}>
      <Box display="flex">
        <Typography color="#121212" fontSize="18px">
          플레이어 설정
        </Typography>
        <Chip
          size="small"
          sx={{
            ml: 1,
          }}
          label={playerStatus.length}
        />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        mt="8px"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (!newPlayerName) {
              return;
            }
            addPlayer(newPlayerName);
            setNewPlayerName("");
          }}
        >
          <Input
            size="medium"
            name="newPlayerName"
            autoFocus
            sx={{
              width: "250px",
            }}
            placeholder="추가할 플레이어 이름을 입력하세요."
            onChange={(e) => setNewPlayerName(e.target.value)}
            value={newPlayerName}
          />
        </form>

        <Card
          elevation={0}
          sx={{
            mt: 2,
            borderRadius: "12px",
            p: 2,
            minHeight: "150px",
            overflow: "scroll",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "8px",
          }}
        >
          <Grid container spacing={2}>
            {playerStatus.map((player) => (
              <Grid item xs={4} key={player.id} spacing={2}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bgcolor="#f5f5f5"
                  flexDirection="column"
                  px={1}
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                      backgroundColor: "#e0e0e0",
                    },
                  }}
                  borderRadius="12px"
                  onClick={() => {
                    deletePlayer(player.id);
                  }}
                >
                  <Typography color="#121212" fontSize="12px">
                    {player.id}번
                  </Typography>
                  <Typography color="#121212" fontSize="16px" fontWeight={500}>
                    {player.name}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Card>
      </Box>
      <Box mt={5} display="flex" justifyContent="center" flexDirection="column">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Typography color="#121212" fontSize="18px">
              동물 설정
            </Typography>
            <Chip
              size="small"
              sx={{
                ml: 1,
              }}
              label={selectedAnimals.length}
            />
          </Box>
          {selectedAnimals.length > 0 ? (
            <Button variant="text" onClick={() => setSelectedAnimals([])}>
              선택 취소
            </Button>
          ) : (
            <Button
              variant="text"
              onClick={() =>
                setSelectedAnimals(
                  Object.values(ANIMALS).map((animal) => animal.id)
                )
              }
            >
              전체 선택
            </Button>
          )}
        </Box>
        <Box display="flex" mt={2} gap={2} flexDirection="column">
          <Grid container spacing={2}>
            {Object.entries(ANIMALS).map(([key, value]) => (
              <AnimalSelectListItem
                key={key}
                animal={value}
                isSelected={selectedAnimals.includes(value.id)}
                onClick={() => {
                  setSelectedAnimals((prev) =>
                    prev.includes(value.id)
                      ? prev.filter((id) => id !== value.id)
                      : [...prev, value.id]
                  );
                }}
              />
            ))}
          </Grid>
        </Box>
      </Box>
      <Box mt={5} display="flex" justifyContent="center">
        <Button
          fullWidth
          sx={{
            borderRadius: "50px",
          }}
          disabled={
            selectedAnimals.length !== playerStatus.length ||
            playerStatus.length < 2
          }
          variant="contained"
          onClick={() => {
            submitSelectedAnimals(selectedAnimals);
            onNextPhase();
          }}
        >
          게임 시작
        </Button>
      </Box>
    </Box>
  );
}

interface AnimalSelectListItemProps {
  animal: Animal;
  isSelected: boolean;
  onClick: () => void;
}

const AnimalSelectListItem = ({
  animal,
  isSelected,
  onClick,
}: AnimalSelectListItemProps) => (
  <Grid
    item
    xs={6}
    key={animal.id}
    onClick={onClick}
    sx={{
      width: "100%",
    }}
  >
    <Box
      display="flex"
      width={1}
      justifyContent="space-between"
      alignItems="center"
      borderRadius="12px"
      sx={{
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "#f3f3f3",
        },
      }}
    >
      <Box display="flex" alignItems="center">
        <ListItemIcon>
          <Avatar src={`/image/icon/food-chain/${animal.id}.svg`} />
        </ListItemIcon>
        <ListItemText primary={animal.name} />
      </Box>
      {isSelected ? (
        <CheckCircleRounded
          sx={{
            color: "#318AE1",
          }}
        />
      ) : (
        <CheckCircleOutlineRounded
          sx={{
            color: "#D3D3D3",
          }}
        />
      )}
    </Box>
  </Grid>
);
