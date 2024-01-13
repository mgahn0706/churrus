import { Box, TextField, Button, Popover } from "@mui/material";
import { useState } from "react";

export default function ClueForm({
  clueWordCount,
  onSubmit,
}: {
  clueWordCount: 1 | 2;
  onSubmit: (clue: string) => void;
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [clue, setClue] = useState("");
  const [secondaryClue, setSecondaryClue] = useState("");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setClue("");
    setSecondaryClue("");
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
            label={clueWordCount === 1 ? "힌트" : "힌트의 첫 단어"}
            value={clue}
            onChange={(e) => {
              setClue(e.target.value.trim());
            }}
          />
          <Box display="flex" gap={2} mt={1}>
            <Button variant="outlined" onClick={handleClose}>
              취소
            </Button>
            <Button
              disabled={
                clue.length === 0 ||
                (clueWordCount === 2 && secondaryClue.length === 0)
              }
              variant="contained"
              color="primary"
              onClick={() => {
                if (clueWordCount === 1) {
                  onSubmit(clue);
                  handleClose();
                  return;
                }
                onSubmit(`${clue} ${secondaryClue}`);
                handleClose();
              }}
            >
              제시
            </Button>
          </Box>
        </Box>
      </Popover>
      <Button variant="contained" color="primary" onClick={handleClick}>
        힌트 제시
      </Button>
    </Box>
  );
}
