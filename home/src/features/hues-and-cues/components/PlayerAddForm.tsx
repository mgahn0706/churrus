import { Box, TextField, Button, Popover } from "@mui/material";
import { useState } from "react";

export default function PlayerAddForm({
  isExceededRecommendedPlayerCount,
  onAddPlayer,
}: {
  isExceededRecommendedPlayerCount: boolean;
  onAddPlayer: (name: string) => void;
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [newPlayerName, setNewPlayerName] = useState("");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNewPlayerName("");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      color="white"
      bgcolor="#313131"
      alignItems="center"
      width="180px"
      px={2}
      justifyContent="center"
      borderRadius="5px"
      height="70px"
    >
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Box p={2} display="flex" flexDirection="column">
          <TextField
            color="primary"
            label="플레이어 이름"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
          />
          <Box display="flex" gap={2} mt={1}>
            <Button variant="outlined" onClick={handleClose}>
              취소
            </Button>
            <Button
              disabled={newPlayerName.length === 0}
              variant="contained"
              color="primary"
              onClick={() => {
                onAddPlayer(newPlayerName);
                handleClose();
              }}
            >
              추가
            </Button>
          </Box>
        </Box>
      </Popover>
      <Button
        variant="contained"
        color={isExceededRecommendedPlayerCount ? "warning" : "primary"}
        onClick={handleClick}
      >
        플레이어 추가
      </Button>
    </Box>
  );
}
