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
      color="white"
      justifyContent="space-between"
      bgcolor="#313131"
      alignItems="center"
      width="180px"
      px={2}
      borderRadius="5px"
      minHeight="760px"
    >
      <Box
        display="flex"
        p={2}
        gap={2}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        borderRadius="5px"
        bgcolor="#313131"
        width="100%"
      >
        {players.length > 0 ? (
          players.map((player) => (
            <Box
              height="50px"
              display="flex"
              mx={2}
              px={2}
              alignItems="center"
              key={player.id}
              width="100%"
              borderRadius="5px"
              bgcolor={player.id === currentCluerId ? "#bcbcbc" : "#494949"}
            >
              <Box
                display="flex"
                alignItems="center"
                p={1}
                width="20px"
                height="20px"
                textAlign="center"
                justifyContent="center"
                fontWeight="bold"
                bgcolor="#313131"
                mr={2}
                borderRadius="50%"
              >
                {player.score}
              </Box>
              {player.name}
            </Box>
          ))
        ) : (
          <Box width="15vdw" color="white" my={6}>
            플레이어가 없습니다.
          </Box>
        )}
      </Box>
      <Box
        height="100px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        my={3}
        borderRadius="5px"
        bgcolor="#313131"
      >
        {isAddingPlayer ? (
          <Box
            display="flex"
            flexDirection="column"
            width="100%"
            gap={1}
            bgcolor="white"
            borderRadius="5px"
            p={2}
          >
            <TextField
              color="primary"
              label="플레이어 이름"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
            />
            <Box display="flex" gap={2}>
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
                disabled={newPlayerName.length === 0}
                variant="contained"
                color="primary"
                onClick={() => {
                  setPlayers([
                    ...players,
                    {
                      id: players[players.length - 1]?.id ?? 0 + 1,
                      name: newPlayerName,
                      score: 0,
                    },
                  ]);
                  setIsAddingPlayer(false);
                  setNewPlayerName("");
                }}
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
    </Box>
  );
}
