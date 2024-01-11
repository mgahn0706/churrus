import { Box, Button, TextField } from "@mui/material";
import { PlayerType } from "../types";
import { useState } from "react";

export default function PlayerScoreSection({
  currentCluerId,
}: {
  currentCluerId: number;
}) {
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [isAddingPlayer, setIsAddingPlayer] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState("");

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="10dvw"
      color="white"
      alignItems="center"
      justifyContent="center"
      gap={2}
      mt={6}
    >
      {players.length > 0 ? (
        players.map((player) => (
          <Box
            height="50px"
            key={player.id}
            width="90%"
            borderRadius="5px"
            bgcolor={player.id === currentCluerId ? "#bebcbc" : "#494949"}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              px={2}
              mr={2}
              borderRadius="50%"
            >
              {player.score}
            </Box>
            {player.name}
          </Box>
        ))
      ) : (
        <Box width="15vdw" color="white" mt={6}>
          플레이어가 없습니다.
        </Box>
      )}
      {isAddingPlayer ? (
        <Box display="flex" flexDirection="column" width="100%">
          <TextField
            label="플레이어 이름"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
          />
          <Box display="flex">
            <Button
              variant="outlined"
              onClick={() => {
                setIsAddingPlayer(false);
                setNewPlayerName("");
              }}
            >
              취소
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                setPlayers([
                  ...players,
                  {
                    id: players[players.length - 1].id + 1,
                    name: newPlayerName,
                    score: 0,
                  },
                ])
              }
            >
              추가
            </Button>
          </Box>
        </Box>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsAddingPlayer(true)}
        >
          플레이어 추가
        </Button>
      )}
    </Box>
  );
}
