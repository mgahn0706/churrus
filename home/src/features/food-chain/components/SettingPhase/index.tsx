import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Input,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import useFoodChainPlayerContext from "../../context";
import { useState } from "react";
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
  const [selectedAnimals, setSelectedAnimals] = useState<AnimalId[]>([]);

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
            placeholder="추가할 플레이어 이름을 입력하세요."
            onChange={(e) => setNewPlayerName(e.target.value)}
            value={newPlayerName}
          />
        </form>

        <Card
          sx={{
            mt: 2,
            p: 2,
            width: "100%",
            height: "200px",
            overflow: "scroll",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "8px",
          }}
        >
          {playerStatus.map((player) => (
            <Chip
              size="medium"
              variant="outlined"
              key={player.id}
              label={player.name}
              avatar={<Avatar>{player.id}</Avatar>}
              onDelete={() => {
                deletePlayer(player.id);
              }}
            />
          ))}
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
          <List dense>
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
          </List>
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
  <ListItem
    key={animal.id}
    onClick={onClick}
    sx={{
      width: "100%",
      "&:hover": {
        cursor: "pointer",
        backgroundColor: "#f3f3f3",
      },
    }}
  >
    <Box
      display="flex"
      width={1}
      justifyContent="space-between"
      alignItems="center"
    >
      <Box display="flex" alignItems="center">
        <ListItemIcon>
          <Avatar src={`/image/icon/food-chain/${animal.id}.png`} />
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
  </ListItem>
);
