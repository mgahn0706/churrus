import { Delete } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
  ListItemText,
  DialogActions,
} from "@mui/material";
import { PlayerType } from "../types";
import { useState } from "react";

export default function PlayerSetModal({
  isOpen,
  onClose,
  onEnterPlayer,
  players,
}: {
  isOpen: boolean;
  onClose: () => void;
  onEnterPlayer: (player: PlayerType[]) => void;
  players: PlayerType[];
}) {
  const [playerNameInput, setPlayerNameInput] = useState("");
  return (
    <Dialog open={isOpen} maxWidth="lg">
      <DialogTitle>플레이어 등록</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <Box display="flex" mt={2}>
          <TextField
            label="플레이어 이름"
            variant="outlined"
            value={playerNameInput}
            onChange={(e) => {
              setPlayerNameInput(e.target.value);
            }}
          />
          <Button
            onClick={() => {
              if (playerNameInput.length === 0) {
                return;
              }
              onEnterPlayer([
                ...players,
                {
                  name: playerNameInput,
                  cubes: [],
                  chips: 10,
                  order: 0,
                },
              ]);
              setPlayerNameInput("");
            }}
          >
            등록
          </Button>
        </Box>
        <DialogContent>
          <List>
            {players.map((player) => {
              return (
                <ListItem
                  disablePadding
                  secondaryAction={
                    <IconButton
                      size="small"
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        onEnterPlayer(
                          players.filter((p) => p.name !== player.name)
                        );
                      }}
                    >
                      <Delete />
                    </IconButton>
                  }
                >
                  <ListItemText primary={player.name} />
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>경매 순서 결정</Button>
      </DialogActions>
    </Dialog>
  );
}
