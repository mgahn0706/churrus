import {
  Avatar,
  Box,
  Card,
  Chip,
  Input,
  Stack,
  Typography,
} from "@mui/material";
import useFoodChainPlayerContext from "../../context";
import { useState } from "react";

export default function SettingPhase() {
  const { addPlayer, playerStatus, deletePlayer } = useFoodChainPlayerContext();

  const [newPlayerName, setNewPlayerName] = useState("");

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
    </Box>
  );
}
