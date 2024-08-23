import {
  Box,
  Typography,
  TextField,
  Button,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useState } from "react";

interface PlayerInputProps {
  onAddPlayer: (name: string) => void;
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export function PlayerInput({ onAddPlayer }: PlayerInputProps) {
  const [playerName, setPlayerName] = useState("");
  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        display="flex"
        justifyContent="flex-start"
        flexDirection="column"
        width="50vw"
      >
        <Typography fontSize="24px" fontWeight="bold" mb={3} color="white">
          플레이어 추가
        </Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (!playerName) return;
            onAddPlayer(playerName);
            setPlayerName("");
          }}
        >
          <Box display="flex" gap={1} width="100%">
            <TextField
              placeholder="이름을 입력하세요."
              value={playerName}
              onChange={(e) => {
                setPlayerName(e.target.value);
              }}
              sx={{
                color: "white",
                width: "90%",
              }}
            />
            <Button disabled={!playerName} variant="outlined" type="submit">
              추가
            </Button>
          </Box>
        </form>
      </Box>
    </ThemeProvider>
  );
}
